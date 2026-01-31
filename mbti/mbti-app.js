document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const progressBar = document.getElementById('progress-bar');
    const mainElement = document.querySelector('main');

    let currentQuestionIndex = 0;
    const userAnswers = [];

    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function showScreen(screen) {
        // Hide all screens first
        startScreen.classList.add('hidden');
        questionScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');

        // Show the target screen with a fade-in animation
        screen.classList.remove('hidden');
        screen.classList.remove('fade-out');
        screen.classList.add('fade-in');
    }

    function displayQuestion(questionIndex) {
        updateProgressBar();
        const question = questions[questionIndex];
        const questionContent = `
            <h2 class="fade-in">${question.text}</h2>
            <div class="choices fade-in">
                ${question.choices.map(choice => `<button class="choice-btn" data-type="${choice.type}">${choice.text}</button>`).join('')}
            </div>
        `;
        // We need a stable element to add content to, so we clear and append to questionScreen
        questionScreen.innerHTML = ''; // Clear previous content
        // Re-add the progress bar since we're clearing the screen
        const progressContainer = document.createElement('div');
        progressContainer.id = 'progress-bar-container';
        progressContainer.innerHTML = '<div id="progress-bar"></div>';
        questionScreen.appendChild(progressContainer);
        // We need to re-select the progress bar element after recreating it
        const newProgressBar = document.getElementById('progress-bar');
        const progress = ((questionIndex) / questions.length) * 100;
        newProgressBar.style.width = `${progress}%`;
        
        const contentWrapper = document.createElement('div');
        contentWrapper.innerHTML = questionContent;
        questionScreen.appendChild(contentWrapper);

        const choiceBtns = document.querySelectorAll('.choice-btn');
        choiceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                userAnswers.push(e.target.dataset.type);
                currentQuestionIndex++;

                // Animate out the current question
                contentWrapper.classList.add('fade-out');
                
                setTimeout(() => {
                    if (currentQuestionIndex < questions.length) {
                        displayQuestion(currentQuestionIndex);
                    } else {
                        showResult();
                    }
                }, 400); // Wait for fade-out animation
            });
        });
    }

    function showResult() {
        const typeCounts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        userAnswers.forEach(answer => {
            if(typeCounts[answer] !== undefined) {
                typeCounts[answer]++;
            }
        });

        let resultType = "";
        resultType += typeCounts.E >= typeCounts.I ? "E" : "I";
        resultType += typeCounts.S >= typeCounts.N ? "S" : "N";
        resultType += typeCounts.T >= typeCounts.F ? "T" : "F";
        resultType += typeCounts.J >= typeCounts.P ? "J" : "P";
        
        const result = results[resultType] || { title: "결과를 찾을 수 없음", description: "죄송합니다. 결과 유형을 결정할 수 없습니다." };

        resultScreen.innerHTML = `
            <div class="fade-in">
                <p class="result-type">당신의 유형은...</p>
                <h2>${result.title} (${resultType})</h2>
                <p>${result.description}</p>
                <button id="restart-btn">다시 테스트하기</button>
            </div>
        `;
        
        showScreen(resultScreen);

        const restartBtn = document.getElementById('restart-btn');
        restartBtn.addEventListener('click', () => {
            resultScreen.classList.add('fade-out');
            setTimeout(() => {
                // Reset state
                currentQuestionIndex = 0;
                userAnswers.length = 0;
                showScreen(startScreen);
            }, 400);
        });
    }

    startBtn.addEventListener('click', () => {
        startScreen.classList.add('fade-out');
        setTimeout(() => {
            showScreen(questionScreen);
            displayQuestion(currentQuestionIndex);
        }, 400);
    });
});
