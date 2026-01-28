import QUESTIONS from './data/questions.js';
import ANSWERS from './data/answers.js';
import { TYPE_INFO, COMPATIBILITY, CAREERS } from './data/results.js';

// Ensure the custom elements are defined
import '../components/QuestionCard.js';
import '../components/ResultChart.js';
import '../components/TypeBadge.js';

const TOTAL_QUESTIONS = QUESTIONS.length;
const cardStack = document.getElementById('cardStack');
const resetButton = document.getElementById('resetTest');
const resultBox = document.getElementById('result');
const progressCount = document.getElementById('progressCount');
const swipeIndicators = document.querySelector('.swipe-indicators');
const leftIndicator = document.querySelector('.indicator.left');
const rightIndicator = document.querySelector('.indicator.right');

let currentQuestionIndex = 0;
const responses = {};
let isSwiping = false;
let startX = 0;
let currentX = 0;

function renderCards() {
  cardStack.innerHTML = ''; // Clear existing cards
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const questionData = QUESTIONS[i];
    const questionCard = document.createElement('question-card');
    questionCard.setAttribute('question-id', questionData.id);
    questionCard.setAttribute('question', questionData.question);
    questionCard.style.zIndex = TOTAL_QUESTIONS - i; // Stack cards
    questionCard.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.05})`; // Visual stacking
    questionCard.setAttribute('data-dimension', questionData.dimension);
    questionCard.setAttribute('data-direction', questionData.direction);
    cardStack.appendChild(questionCard);
  }
  attachSwipeListeners();
  updateProgress();
}

function attachSwipeListeners() {
  const cards = cardStack.querySelectorAll('question-card');
  if (cards.length === 0) return;

  const topCard = cards[cards.length - 1]; // The card on top

  topCard.addEventListener('pointerdown', (e) => {
    isSwiping = true;
    startX = e.clientX || e.touches[0].clientX;
    topCard.style.transition = 'none'; // Disable transition for smooth dragging
    swipeIndicators.classList.add('active');
  });

  topCard.addEventListener('pointermove', (e) => {
    if (!isSwiping) return;
    currentX = e.clientX || e.touches[0].clientX;
    const diffX = currentX - startX;

    topCard.style.transform = `translateX(${diffX}px) rotate(${diffX / 20}deg)`;

    // Update indicator opacity based on swipe distance
    const opacity = Math.min(1, Math.abs(diffX) / 100);
    if (diffX < 0) { // Swiping left (No)
      leftIndicator.style.opacity = opacity;
      rightIndicator.style.opacity = 0;
    } else { // Swiping right (Yes)
      rightIndicator.style.opacity = opacity;
      leftIndicator.style.opacity = 0;
    }
  });

  topCard.addEventListener('pointerup', (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    topCard.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    swipeIndicators.classList.remove('active');
    leftIndicator.style.opacity = 0;
    rightIndicator.style.opacity = 0;

    const diffX = currentX - startX;
    if (Math.abs(diffX) > 100) { // Threshold for a successful swipe
      const questionId = parseInt(topCard.getAttribute('question-id'));
      const dimension = topCard.getAttribute('data-dimension');
      const direction = topCard.getAttribute('data-direction');

      const answerValue = diffX < 0 ? -2 : 2; // -2 for No, 2 for Yes (simplified)
      responses[questionId] = { value: answerValue, dimension, direction };
      
      topCard.style.transform = `translateX(${diffX * 3}px) rotate(${diffX / 10}deg)`;
      topCard.style.opacity = 0;
      topCard.addEventListener('transitionend', () => {
        topCard.remove();
        currentQuestionIndex++;
        updateProgress();
        if (currentQuestionIndex < TOTAL_QUESTIONS) {
          attachSwipeListeners(); // Attach listeners to the new top card
        } else {
          // All questions answered, show result
          showResult();
        }
      }, { once: true });
    } else {
      // Snap back if not swiped far enough
      topCard.style.transform = '';
    }
  });

  topCard.addEventListener('pointercancel', () => {
    isSwiping = false;
    topCard.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    topCard.style.transform = '';
    swipeIndicators.classList.remove('active');
    leftIndicator.style.opacity = 0;
    rightIndicator.style.opacity = 0;
  });
}

function updateProgress() {
  progressCount.textContent = String(currentQuestionIndex);
}

function calculateScores() {
  const scores = {
    EI: { E: 0, I: 0 },
    SN: { S: 0, N: 0 },
    TF: { T: 0, F: 0 },
    JP: { J: 0, P: 0 }
  };

  Object.values(responses).forEach(response => {
    scores[response.dimension][response.direction] += response.value;
  });

  return scores;
}

function determineType(scores) {
  const maxDiff = 30; // Max possible difference for a dimension

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

function showResult() {
  const scores = calculateScores();
  renderResult(scores);
}

resetButton.addEventListener('click', () => {
  currentQuestionIndex = 0;
  for (const key in responses) {
    delete responses[key];
  }
  resultBox.classList.remove('active');
  resultBox.innerHTML = '';
  renderCards();
});

window.addEventListener('DOMContentLoaded', () => {
  window.customElements.whenDefined('question-card').then(() => {
    try {
      renderCards();
    } catch (e) {
      console.error("Error during initial renderCards():", e);
    }
  });
});
