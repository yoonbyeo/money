import QUESTIONS from './data/questions.js';
import ANSWERS from './data/answers.js';
import { TYPE_INFO, COMPATIBILITY, CAREERS } from './data/results.js';

import './components/ResultChart.js';
import './components/TypeBadge.js';

const PAGE_SIZE = 10;
const TOTAL_PAGES = Math.ceil(QUESTIONS.length / PAGE_SIZE);

const form = document.getElementById('mbtiForm');
const startButton = document.getElementById('startTest');
const submitButton = document.getElementById('submitTest');
const resetButton = document.getElementById('resetTest');
const resetButtonBottom = document.getElementById('resetTestBottom');
const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');
const resultBox = document.getElementById('result');
const progressCount = document.getElementById('progressCount');
const pageIndex = document.getElementById('pageIndex');
const formMessage = document.getElementById('formMessage');

let rendered = false;
let currentPage = 1;
const responses = {};

function pageSlice(page) {
  const start = (page - 1) * PAGE_SIZE;
  return QUESTIONS.slice(start, start + PAGE_SIZE);
}

function renderQuestions(page) {
  if (!rendered) rendered = true;
  form.innerHTML = '';
  const fragment = document.createDocumentFragment();

  pageSlice(page).forEach((item) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'question';

    const header = document.createElement('div');
    header.className = 'question-header';

    const number = document.createElement('div');
    number.className = 'question-number';
    number.textContent = `Q${item.id}`;

    const text = document.createElement('div');
    text.className = 'question-text';
    text.textContent = item.question;

    header.append(number, text);

    const options = document.createElement('div');
    options.className = 'options';

    ANSWERS.forEach((answer) => {
      const label = document.createElement('label');
      label.className = 'option';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${item.id}`;
      input.value = answer.value;
      input.setAttribute('data-dimension', item.dimension);
      input.setAttribute('data-direction', item.direction);

      const saved = responses[item.id];
      if (saved === answer.value) {
        input.checked = true;
      }

      const span = document.createElement('span');
      span.textContent = answer.label;

      label.append(input, span);
      options.append(label);
    });

    wrapper.append(header, options);
    fragment.append(wrapper);
  });

  form.append(fragment);
  updateProgress();
  updatePager();
}

function updateProgress() {
  const answered = Object.keys(responses).length;
  progressCount.textContent = String(answered);
}

function updatePager() {
  pageIndex.textContent = String(currentPage);
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === TOTAL_PAGES;
}

function calculateScores() {
  const scores = {
    EI: { E: 0, I: 0 },
    SN: { S: 0, N: 0 },
    TF: { T: 0, F: 0 },
    JP: { J: 0, P: 0 }
  };

  QUESTIONS.forEach((item) => {
    const value = responses[item.id];
    if (value === undefined) return;
    scores[item.dimension][item.direction] += value;
  });

  return scores;
}

function determineType(scores) {
  const maxDiff = 30;

  const pairs = [
    { dimension: 'EI', left: 'E', right: 'I', label: '에너지 방향' },
    { dimension: 'SN', left: 'S', right: 'N', label: '정보 인식' },
    { dimension: 'TF', left: 'T', right: 'F', label: '판단 기준' },
    { dimension: 'JP', left: 'J', right: 'P', label: '생활 리듬' }
  ];

  const result = { type: '', breakdown: [] };

  pairs.forEach((pair) => {
    const leftScore = scores[pair.dimension][pair.left];
    const rightScore = scores[pair.dimension][pair.right];
    const preference = leftScore - rightScore;
    const letter = preference >= 0 ? pair.left : pair.right;
    const strength = Math.min(100, Math.round((Math.abs(preference) / maxDiff) * 100));

    result.type += letter;
    result.breakdown.push({
      label: pair.label,
      left: pair.left,
      right: pair.right,
      leftScore,
      rightScore,
      strength,
      letter
    });
  });

  return result;
}

function renderResult(scores) {
  const { type, breakdown } = determineType(scores);
  const info = TYPE_INFO[type] || {
    title: '나의 유형',
    summary: '현재 응답을 기반으로 유형 경향을 정리했어요.',
    strengths: [],
    tips: ''
  };
  const matches = COMPATIBILITY[type] || [];
  const careers = CAREERS[type] || [];

  resultBox.innerHTML = `
    <div class="result-hero">
      <div>
        <p class="tag">나의 유형</p>
        <type-badge type="${type}"></type-badge>
        <p class="result-title">${info.title}</p>
        <p class="result-summary">${info.summary}</p>
        <div class="chip-row">
          ${info.strengths.map((item) => `<span class="chip">${item}</span>`).join('')}
        </div>
      </div>
      <div class="result-highlight">
        <div class="highlight-label">성향 요약</div>
        <div class="highlight-body">${info.tips}</div>
      </div>
    </div>
    <div class="result-chart">
      <result-chart breakdown='${JSON.stringify(breakdown)}'></result-chart>
    </div>
    <div class="result-grid">
      <div class="result-panel">
        <h4>잘 맞는 유형</h4>
        <p class="panel-sub">협업이나 대화에서 부드럽게 맞춰질 가능성이 높은 유형입니다.</p>
        <div class="chip-row">${matches.map((item) => `<span class="chip">${item}</span>`).join('')}</div>
      </div>
      <div class="result-panel">
        <h4>추천 역할/직업</h4>
        <p class="panel-sub">현재 성향에서 강점이 잘 드러날 수 있는 분야입니다.</p>
        <ul class="panel-list">
          ${careers.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="result-panel">
        <h4>해석 안내</h4>
        <p class="panel-sub">결과는 참고용이며, 다양한 경험과 상황에 따라 달라질 수 있습니다.</p>
        <p class="panel-note">응답 흐름을 기반으로 현재의 선호 경향을 퍼센티지로 표시했습니다.</p>
      </div>
    </div>
  `;

  resultBox.classList.add('active');
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validateAnswers() {
  const missing = QUESTIONS.filter((item) => responses[item.id] === undefined);
  if (missing.length === 0) {
    formMessage.textContent = '';
    return true;
  }

  const firstMissing = missing[0];
  const targetPage = Math.ceil(firstMissing.id / PAGE_SIZE);
  formMessage.textContent = `응답하지 않은 문항이 ${missing.length}개 있어요. Q${firstMissing.id}부터 확인해 주세요.`;
  if (currentPage !== targetPage) {
    currentPage = targetPage;
    renderQuestions(currentPage);
  }
  const target = form.querySelector(`input[name="q${firstMissing.id}"]`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return false;
}

startButton.addEventListener('click', () => {
  currentPage = 1;
  renderQuestions(currentPage);
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

form.addEventListener('change', (event) => {
  if (!(event.target instanceof HTMLInputElement)) return;
  const id = Number(event.target.name.replace('q', ''));
  responses[id] = Number(event.target.value);
  updateProgress();
});

prevButton.addEventListener('click', () => {
  if (currentPage === 1) return;
  currentPage -= 1;
  renderQuestions(currentPage);
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

nextButton.addEventListener('click', () => {
  if (currentPage === TOTAL_PAGES) return;
  currentPage += 1;
  renderQuestions(currentPage);
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

submitButton.addEventListener('click', () => {
  if (!rendered) {
    currentPage = 1;
    renderQuestions(currentPage);
  }
  if (!validateAnswers()) return;

  const scores = calculateScores();
  renderResult(scores);
});

function resetTest() {
  Object.keys(responses).forEach((key) => {
    delete responses[Number(key)];
  });
  formMessage.textContent = '';
  resultBox.classList.remove('active');
  resultBox.innerHTML = '';
  currentPage = 1;
  renderQuestions(currentPage);
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

resetButton.addEventListener('click', resetTest);
resetButtonBottom.addEventListener('click', resetTest);

window.addEventListener('DOMContentLoaded', () => {
  renderQuestions(1);
});
