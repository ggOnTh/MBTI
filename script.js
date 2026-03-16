const questions = [
    {
        q: "주말에 약속이 없다면?",
        options: [
            { text: "집에 있는다", target: null },
            { text: "밖에 나가서 사람들과 만나다", target: "E" }
        ]
    },
    {
        q: "새로운 사람을 만나는 것은?",
        options: [
            { text: "피곤하고 기가 빨린다", target: null },
            { text: "즐겁다", target: "E" }
        ]
    },
    {
        q: "나무와 숲을 본다면?",
        options: [
            { text: "숲보다 나무를 먼저본다", target: "S" },
            { text: "나무보다 숲을 먼저본다", target: null }
        ]
    },
    {
        q: "미래와 현재 중?",
        options: [
            { text: "미래의 가능성보다 현재의 사실이 중요하다", target: "S" },
            { text: "현재의 사실보다 미래의 가능성이 중요하다", target: null }
        ]
    },
    {
        q: "친구가 슬퍼할 때는?",
        options: [
            { text: "해결책을 제시한다", target: "T" },
            { text: "먼저 공감하고 위로한다", target: null }
        ]
    },
    {
        q: "결정을 해야 할 때?",
        options: [
            { text: "사실과 논리가 중요하다", target: "T" },
            { text: "다른 사람의 감정을 고려하는 것이 중요하다", target: null }
        ]
    },
    {
        q: "여행을 갈 때?",
        options: [
            { text: "계획을 철저히 세운다", target: "J" },
            { text: "즉흥적으로 발길 닿는 대로 다닌다", target: null }
        ]
    },
    {
        q: "일을 할 때?",
        options: [
            { text: "마감일이 정해져 있어야 일이 잘된다", target: "J" },
            { text: "마감일은 나에게 스트레스일 뿐이다", target: null }
        ]
    }
];

/**
 * 점수 규칙 정의:
 * - E 점수: 1, 2번 질문에서 외향적 선택 시 +1
 * - S 점수: 3, 4번 질문에서 감각적 선택 시 +1
 * - T 점수: 5, 6번 질문에서 사고적 선택 시 +1
 * - J 점수: 7, 8번 질문에서 판단적 선택 시 +1
 */
const resultData = {
    "ENFP": { nickname: "재기발랄한 활동가", desc: "자유롭고 열정적이며, 언제나 웃음이 가득한 스타일입니다.", quote: "계획은 안 세웠지만, 일단 재미있을 것 같으니까 갑시다!" },
    "ENFJ": { nickname: "정의로운 사회운동가", desc: "사람들을 이끄는 온화하고 넘치는 카리스마의 리더입니다.", quote: "너희의 성장이 곧 나의 행복이야. 같이 해내자!" },
    "ENTP": { nickname: "뜨거운 논쟁을 즐기는 변론가", desc: "지적인 도전과 새로운 아이디어를 끊임없이 찾아다닙니다.", quote: "근데 그게 왜 안 된다고 생각해요? 혹시 이런 방법은요?" },
    "ENTJ": { nickname: "대담한 통솔자", desc: "미래를 계획하고 효율적인 전략을 세우는 선척적 리더입니다.", quote: "자, 10분 안에 결론 냅시다. 시간은 금이라고요." },
    "ESFP": { nickname: "자유로운 영혼의 연예인", desc: "주변 사람들을 즐겁게 하는 에너지가 넘치는 사교가입니다.", quote: "인생은 한 번뿐이야! 오늘 밤 주인공은 나야 나!" },
    "ESFJ": { nickname: "사교적인 외교관", desc: "주변 사람들을 잘 챙기며 조화를 중시하는 다정한 사람입니다.", quote: "다들 밥은 먹었어? 내가 오늘 맛집 알아왔는데!" },
    "ESTP": { nickname: "모험을 즐기는 사업가", desc: "직관력과 판단력이 뛰어나며 에너지가 넘치는 활동가입니다.", quote: "일단 해보고 생각하자고. 안 죽어!" },
    "ESTJ": { nickname: "엄격한 관리자", desc: "규율을 중시하고 현실적인 문제를 해결하는 능력이 탁월합니다.", quote: "자, 매뉴얼대로 합시다. 예외는 없어야 합니다." },
    "INFP": { nickname: "열정적인 중재자", desc: "차분하고 창의적이며, 소외된 사람들에게 따뜻한 관심을 가집니다.", quote: "그럴 수도 있죠... 각자의 마음이 중요한 거니까요." },
    "INFJ": { nickname: "선의의 옹호자", desc: "조용하고 신비롭지만, 사람들에게 영감을 주는 이상주의자입니다.", quote: "당신의 눈빛 속에 담긴 그 깊은 의미를 이해해요." },
    "INTP": { nickname: "논리적인 사색가", desc: "끊임없이 원리를 탐구하고 지적 호기심이 넘치는 전략가입니다.", quote: "과연 그게 효율적일까요? 제 이론에 따르면..." },
    "INTJ": { nickname: "용의주도한 전략가", desc: "모든 일을 계획하고 실행에 옮기는 완벽주의자 스타일입니다.", quote: "이건 이미 3년 전부터 제가 계산해둔 시나리오입니다." },
    "ISFP": { nickname: "호기심 많은 예술가", desc: "온화하고 겸손하며, 매 순간을 소중히 여기는 낭만주의자입니다.", quote: "그냥 누워있는 게 제일 좋아... 저녁 메뉴는 이따 생각할래." },
    "ISFJ": { nickname: "용감한 수호자", desc: "사랑하는 사람들을 헌신적으로 보호하고 챙기는 수호자입니다.", quote: "도움이 필요하면 언제든 불러주세요. 전 여기에 있을게요." },
    "ISTP": { nickname: "만능 재주꾼", desc: "과묵하면서도 상황 판단력이 뛰어난 현실적인 해결사입니다.", quote: "말보다는 기계 고치는 게 더 편하네요. 완성." },
    "ISTJ": { nickname: "청렴결백한 논리주의자", desc: "책임감이 강하며 원칙을 고수하는 믿음직한 사람입니다.", quote: "정해진 규칙은 지키라고 있는 겁니다. 확인 부탁드립니다." }
};

let scoreE = 0;
let scoreS = 0;
let scoreT = 0;
let scoreJ = 0;
let currentQuestionIndex = 0;

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
    
    // Result elements
    const mbtiTypeLabel = document.getElementById('mbti-type');
    const nicknameLabel = document.getElementById('mbti-nickname');
    const descLabel = document.getElementById('mbti-description');
    const quoteLabel = document.getElementById('mbti-quote');

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
            btn.onclick = () => selectOption(qData.options[idx].target);
        });

        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Select Option
    function selectOption(target) {
        if (target === "E") scoreE++;
        if (target === "S") scoreS++;
        if (target === "T") scoreT++;
        if (target === "J") scoreJ++;

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
            (scoreE >= 1 ? 'E' : 'I') +
            (scoreS >= 1 ? 'S' : 'N') +
            (scoreT >= 1 ? 'T' : 'F') +
            (scoreJ >= 1 ? 'J' : 'P');
        
        const data = resultData[mbti];
        mbtiTypeLabel.innerText = mbti;
        nicknameLabel.innerText = data.nickname;
        descLabel.innerText = data.desc;
        quoteLabel.innerText = data.quote;
    }

    // Restart Test
    restartBtn.addEventListener('click', () => {
        scoreE = 0;
        scoreS = 0;
        scoreT = 0;
        scoreJ = 0;
        currentQuestionIndex = 0;
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    });
});
