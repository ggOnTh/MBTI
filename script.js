document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    
    startBtn.addEventListener('click', () => {
        // 이 부분은 나중에 질문 화면으로 전환하는 로직으로 대체될 예정입니다.
        console.log('테스트가 시작되었습니다!');
        
        // 간단한 클릭 피드백
        startBtn.innerText = '준비 중...';
        startBtn.style.opacity = '0.7';
        startBtn.disabled = true;
        
        // 0.5초 후 알림 (데모용)
        setTimeout(() => {
            alert('질문 데이터가 준비되면 다음 단계로 넘어갑니다.');
            startBtn.innerText = '테스트 시작하기';
            startBtn.style.opacity = '1';
            startBtn.disabled = false;
        }, 500);
    });
});
