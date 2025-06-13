// TIL 카테고리 필터 스크립트
function selectCategory(category) {
    // ... 기존 selectCategory 함수 코드 ...
    console.log('카테고리 선택:', category);
    const allContainers = document.querySelectorAll('.posts-container');
    allContainers.forEach(container => {
        container.classList.remove('active');
    });
    const allCards = document.querySelectorAll('.til-category-card');
    allCards.forEach(card => {
        card.classList.remove('active');
    });
    let targetId;
    if (category === 'all') {
        targetId = 'all-posts';
        document.getElementById('current-category-cmd').textContent = 'cat README.md';
    } else {
        targetId = category + '-posts';
        document.getElementById('current-category-cmd').textContent = `cd ${category} && ls -la`;
        const activeCard = document.querySelector(`[data-category="${category}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
    }
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
        targetContainer.classList.add('active');
        console.log(category + ' 카테고리 표시됨');
    } else {
        console.error('컨테이너를 찾을 수 없음:', targetId);
    }
}

function setupTilCategoryFilter() {
    // 카테고리 카드들에 클릭 이벤트 추가
    const categoryCards = document.querySelectorAll('.til-category-card');
    categoryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        card.addEventListener('click', function() {
            selectCategory(category);
        });
    });
    // 전체 보기 버튼 이벤트
    const showAllBtn = document.getElementById('show-all-btn');
    if (showAllBtn) {
        showAllBtn.addEventListener('click', function() {
            selectCategory('all');
        });
    }
    // 초기에 전체 보기로 설정
    selectCategory('all');
}

// 동적으로 import될 때 자동 실행
if (document.getElementById('category-posts')) {
    setupTilCategoryFilter();
} 