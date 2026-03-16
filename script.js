const questions = [
    {
        q: "주말에 약속이 없다면?",
        options: [
            { text: "집에 있는다", type: "I" },
            { text: "밖에 나가서 사람들과 만나다", type: "E" }
        ]
    },
    {
        q: "새로운 사람을 만나는 것은?",
        options: [
            { text: "피곤하고 기가 빨린다", type: "I" },
            { text: "즐겁다", type: "E" }
        ]
    },
    {
        q: "나무와 숲을 본다면?",
        options: [
            { text: "숲보다 나무를 먼저본다", type: "S" },
            { text: "나무보다 숲을 먼저본다", type: "N" }
        ]
    },
    {
        q: "미래와 현재 중?",
        options: [
            { text: "미래의 가능성보다 현재의 사실이 중요하다", type: "S" },
            { text: "현재의 사실보다 미래의 가능성이 중요하다", type: "N" }
        ]
    },
    {
        q: "친구가 슬퍼할 때는?",
        options: [
            { text: "해결책을 제시한다", type: "T" },
            { text: "먼저 공감하고 위로한다", type: "F" }
        ]
    },
    {
        q: "결정을 해야 할 때?",
        options: [
            { text: "사실과 논리가 중요하다", type: "T" },
            { text: "다른 사람의 감정을 고려하는 것이 중요하다", type: "F" }
        ]
    },
    {
        q: "여행을 갈 때?",
        options: [
            { text: "계획을 철저히 세운다", type: "J" },
            { text: "즉흥적으로 발길 닿는 대로 다닌다", type: "P" }
        ]
    },
    {
        q: "일을 할 때?",
        options: [
            { text: "마감일이 정해져 있어야 일이 잘된다", type: "J" },
            { text: "마감일은 나에게 스트레스일 뿐이다", type: "P" }
        ]
    }
];

let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const optionBtns = document.querySelectorAll('.option-btn');
    
    const qNumberLabel = document.getElementById('q-number');
    const qTextLabel = document.getElementById('q-text');
    const progressBar = document.getElementById('progress-bar');
    const resultLabel = document.getElementById('mbti-result');

    // Start Test
    startBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');
        loadQuestion();
    });

    // Load Question
    function loadQuestion() {
        const qData = questions[currentQuestionIndex];
        qNumberLabel.innerText = `Q${currentQuestionIndex + 1}`;
        qTextLabel.innerText = qData.q;
        
        optionBtns.forEach((btn, idx) => {
            btn.innerText = qData.options[idx].text;
            btn.onclick = () => selectOption(qData.options[idx].type);
        });

        // Update progress bar
        const progress = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Select Option
    function selectOption(type) {
        scores[type]++;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    // Show Result
    function showResult() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        progressBar.style.width = '100%';

        const mbti = 
            (scores.E >= scores.I ? 'E' : 'I') +
            (scores.S >= scores.N ? 'S' : 'N') +
            (scores.T >= scores.F ? 'T' : 'F') +
            (scores.J >= scores.P ? 'J' : 'P');
        
        resultLabel.innerText = `당신의 MBTI는 ${mbti} 입니다.`;
    }

    // Restart Test
    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    });
});
