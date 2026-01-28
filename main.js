const QUESTIONS = [
  { id: 1, dimension: 'EI', direction: 'E', question: '처음 보는 사람들과 함께 있는 모임에서 자연스럽게 먼저 말을 건다.' },
  { id: 2, dimension: 'EI', direction: 'I', question: '여럿이 함께한 뒤에는 혼자 있는 시간이 꼭 필요하다고 느낀다.' },
  { id: 3, dimension: 'EI', direction: 'E', question: '과제나 프로젝트를 시작할 때 주변 사람과 아이디어를 주고받는 편이 편하다.' },
  { id: 4, dimension: 'EI', direction: 'I', question: '회의나 수업에서 의견이 떠올라도 말하기 전 한 번 더 정리한다.' },
  { id: 5, dimension: 'EI', direction: 'E', question: '주말에 특별한 약속이 없으면 누군가를 만나고 싶어진다.' },
  { id: 6, dimension: 'EI', direction: 'I', question: '중요한 결정을 앞두면 혼자 조용히 생각하는 시간이 가장 도움이 된다.' },
  { id: 7, dimension: 'EI', direction: 'E', question: '새로운 동아리나 모임에 가면 금세 분위기에 적응한다.' },
  { id: 8, dimension: 'EI', direction: 'I', question: '점심을 혼자 먹는 날이 있어도 불편함이 없다.' },
  { id: 9, dimension: 'EI', direction: 'E', question: '친구가 새로운 사람을 소개하면 반갑게 대화를 이어간다.' },
  { id: 10, dimension: 'EI', direction: 'I', question: '복잡한 이야기를 들을 때는 말로 하기보다 글로 정리하는 게 편하다.' },
  { id: 11, dimension: 'EI', direction: 'E', question: '행사나 파티에 가면 에너지가 오히려 채워지는 느낌이 든다.' },
  { id: 12, dimension: 'EI', direction: 'I', question: '사람들과 오래 함께 있으면 피로가 빠르게 쌓인다.' },
  { id: 13, dimension: 'EI', direction: 'E', question: '팀 과제에서 발표 역할을 맡는 것에 큰 부담이 없다.' },
  { id: 14, dimension: 'EI', direction: 'I', question: '처음 가는 모임에서는 주로 분위기를 관찰하며 시간을 보낸다.' },
  { id: 15, dimension: 'EI', direction: 'E', question: '사소한 일도 대화로 풀어내는 편이 마음이 편하다.' },
  { id: 16, dimension: 'SN', direction: 'S', question: '설명을 들을 때 구체적인 예시가 있어야 이해가 잘 된다.' },
  { id: 17, dimension: 'SN', direction: 'N', question: '대화 중에 앞으로 어떻게 될지 상상하는 일이 자주 있다.' },
  { id: 18, dimension: 'SN', direction: 'S', question: '새로운 일을 배울 때 단계별로 따라 하는 게 가장 편하다.' },
  { id: 19, dimension: 'SN', direction: 'N', question: '책이나 영화에서 숨은 의미를 찾아보는 편이다.' },
  { id: 20, dimension: 'SN', direction: 'S', question: '여행을 계획할 때 이동 시간과 예산 같은 현실적인 정보가 우선이다.' },
  { id: 21, dimension: 'SN', direction: 'N', question: '새로운 아이디어가 떠오르면 바로 다른 가능성으로 이어서 생각한다.' },
  { id: 22, dimension: 'SN', direction: 'S', question: '업무나 과제는 검증된 방법을 따르는 것이 더 효율적이라고 느낀다.' },
  { id: 23, dimension: 'SN', direction: 'N', question: '한 가지 주제에서 연관된 여러 주제를 자연스럽게 떠올린다.' },
  { id: 24, dimension: 'SN', direction: 'S', question: '결정을 내릴 때 지금 당장 필요한 사실을 중심으로 판단한다.' },
  { id: 25, dimension: 'SN', direction: 'N', question: '일상적인 일에서도 색다른 해석이나 관점을 떠올리는 편이다.' },
  { id: 26, dimension: 'SN', direction: 'S', question: '설명서나 규칙을 먼저 읽고 시작하는 편이다.' },
  { id: 27, dimension: 'SN', direction: 'N', question: '지금의 경험이 앞으로 어떤 의미가 될지 생각해 본다.' },
  { id: 28, dimension: 'SN', direction: 'S', question: '친구가 문제를 말하면 구체적인 해결책부터 떠올린다.' },
  { id: 29, dimension: 'SN', direction: 'N', question: '새로운 장소에 가면 전체적인 분위기나 느낌을 먼저 본다.' },
  { id: 30, dimension: 'SN', direction: 'S', question: '정보를 정리할 때 실제로 확인한 내용만 넣으려 한다.' },
  { id: 31, dimension: 'TF', direction: 'T', question: '갈등 상황에서 감정보다 사실과 논리를 먼저 따진다.' },
  { id: 32, dimension: 'TF', direction: 'F', question: '결정을 내릴 때 주변 사람이 느낄 감정을 먼저 생각한다.' },
  { id: 33, dimension: 'TF', direction: 'T', question: '토론에서 의견이 다르면 근거를 중심으로 이야기하려 한다.' },
  { id: 34, dimension: 'TF', direction: 'F', question: '친구가 속상해하면 해결책보다 공감부터 하게 된다.' },
  { id: 35, dimension: 'TF', direction: 'T', question: '피드백을 줄 때 핵심 문제를 직접적으로 말하는 편이다.' },
  { id: 36, dimension: 'TF', direction: 'F', question: '단체 결정에서 관계가 불편해질 가능성을 고려한다.' },
  { id: 37, dimension: 'TF', direction: 'T', question: '규칙이 비효율적이면 이유를 따져보고 바꾸고 싶다.' },
  { id: 38, dimension: 'TF', direction: 'F', question: '결정이 옳더라도 누군가 상처받을 수 있으면 망설인다.' },
  { id: 39, dimension: 'TF', direction: 'T', question: '팀 과제에서 역할 분담은 능력과 효율을 기준으로 정하는 게 맞다.' },
  { id: 40, dimension: 'TF', direction: 'F', question: '의견이 다를 때 상대의 입장을 먼저 이해하려 한다.' },
  { id: 41, dimension: 'TF', direction: 'T', question: '문제가 생기면 감정보다 원인을 분석하는 데 집중한다.' },
  { id: 42, dimension: 'TF', direction: 'F', question: '결정을 내린 뒤에도 누군가 불편하지 않았는지 신경 쓰인다.' },
  { id: 43, dimension: 'TF', direction: 'T', question: '불필요한 감정 표현보다는 핵심만 말하는 것이 편하다.' },
  { id: 44, dimension: 'TF', direction: 'F', question: '친구의 부탁을 거절할 때 미안함이 크게 느껴진다.' },
  { id: 45, dimension: 'TF', direction: 'T', question: '판단을 내릴 때 개인적 호감보다 기준과 원칙이 중요하다.' },
  { id: 46, dimension: 'JP', direction: 'J', question: '여행 일정은 미리 세부적으로 짜두는 편이다.' },
  { id: 47, dimension: 'JP', direction: 'P', question: '마감이 있어도 막판에 집중해서 해내는 일이 많다.' },
  { id: 48, dimension: 'JP', direction: 'J', question: '해야 할 일을 목록으로 정리하면 마음이 안정된다.' },
  { id: 49, dimension: 'JP', direction: 'P', question: '계획을 세워도 상황에 따라 바꾸는 편이 편하다.' },
  { id: 50, dimension: 'JP', direction: 'J', question: '약속 시간에는 여유 있게 도착하려고 한다.' },
  { id: 51, dimension: 'JP', direction: 'P', question: '일이 생기면 즉흥적으로 처리하는 것이 더 잘 맞는다.' },
  { id: 52, dimension: 'JP', direction: 'J', question: '과제를 시작하기 전에 전체 흐름을 먼저 정리한다.' },
  { id: 53, dimension: 'JP', direction: 'P', question: '작은 선택들은 그때그때 기분에 따라 결정한다.' },
  { id: 54, dimension: 'JP', direction: 'J', question: '방이나 책상 정리를 규칙적으로 하는 편이다.' },
  { id: 55, dimension: 'JP', direction: 'P', question: '여러 가능성을 열어둔 채로 일을 진행하는 편이다.' },
  { id: 56, dimension: 'JP', direction: 'J', question: '일정이 비어 있으면 미리 채워두는 편이 편하다.' },
  { id: 57, dimension: 'JP', direction: 'P', question: '갑작스러운 제안이 들어오면 흥미롭게 받아들이는 편이다.' },
  { id: 58, dimension: 'JP', direction: 'J', question: '준비해야 할 일이 있으면 여유를 두고 시작한다.' },
  { id: 59, dimension: 'JP', direction: 'P', question: '계획이 정해져 있으면 오히려 답답하게 느껴진다.' },
  { id: 60, dimension: 'JP', direction: 'J', question: '일과를 대략이라도 정해두면 하루가 더 편하다.' }
];

const ANSWERS = [
  { label: '매우 그렇다', value: 2 },
  { label: '그렇다', value: 1 },
  { label: '보통이다', value: 0 },
  { label: '그렇지 않다', value: -1 },
  { label: '매우 그렇지 않다', value: -2 }
];

const PAGE_SIZE = 10;
const TOTAL_PAGES = Math.ceil(QUESTIONS.length / PAGE_SIZE);

const form = document.getElementById('mbtiForm');
const startButton = document.getElementById('startTest');
const submitButton = document.getElementById('submitTest');
const resetButton = document.getElementById('resetTest');
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

  const strengthCopy = breakdown
    .map((item) => `${item.left}/${item.right} ${item.letter} ${item.strength}%`)
    .join(' · ');

  resultBox.innerHTML = `
    <div>
      <p class="tag">나의 결과</p>
      <h3>${type}</h3>
      <p>${strengthCopy}</p>
      <p>각 축의 점수는 질문에 대한 선호 경향을 보여주며, 결과는 참고용입니다.</p>
    </div>
    <div class="score-grid">
      ${breakdown
        .map(
          (item) => `
        <div class="score-card">
          <div class="label">${item.label}</div>
          <div>${item.left} ${item.leftScore}점 · ${item.right} ${item.rightScore}점</div>
          <div class="score-bar">
            <div class="score-fill" style="width: ${item.strength}%"></div>
          </div>
        </div>
      `
        )
        .join('')}
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

resetButton.addEventListener('click', () => {
  Object.keys(responses).forEach((key) => {
    delete responses[Number(key)];
  });
  formMessage.textContent = '';
  resultBox.classList.remove('active');
  resultBox.innerHTML = '';
  currentPage = 1;
  renderQuestions(currentPage);
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
