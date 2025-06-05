// ========================================
// hyuptree devlog - Terminal UI JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // 현재 날짜 표시
    updateLastUpdateTime();
    
    // 터미널 버튼 이벤트 설정
    setupTerminalButtons();
    
    // 키보드 이벤트 설정
    setupKeyboardEvents();
});

// 날짜 업데이트 함수
function updateLastUpdateTime() {
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('ko-KR') + ' ' + now.toLocaleTimeString('ko-KR');
        lastUpdateElement.textContent = formattedDate;
    }
}

// 터미널 버튼 이벤트 설정
function setupTerminalButtons() {
    const closeBtn = document.querySelector('.btn.close');
    const minimizeBtn = document.querySelector('.btn.minimize');
    const maximizeBtn = document.querySelector('.btn.maximize');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (confirm('터미널을 종료하시겠습니까?')) {
                window.close();
            }
        });
    }
    
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function() {
            const terminal = document.querySelector('.terminal');
            terminal.style.transform = 'scale(0.1)';
            setTimeout(() => {
                terminal.style.transform = 'scale(1)';
            }, 1000);
        });
    }
    
    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', function() {
            const terminal = document.querySelector('.terminal');
            terminal.style.width = terminal.style.width === '100vw' ? '90vw' : '100vw';
            terminal.style.height = terminal.style.height === '100vh' ? '90vh' : '100vh';
        });
    }
}

// 키보드 이벤트 설정
function setupKeyboardEvents() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Enter 키를 누르면 새로운 프롬프트 라인 추가 (메인 페이지에서만)
            if (window.location.pathname === '/') {
                addNewPromptLine();
            }
        }
    });
}

// 새 프롬프트 라인 추가
function addNewPromptLine() {
    const terminalContent = document.querySelector('.terminal-content');
    if (!terminalContent) return;
    
    const newPromptLine = document.createElement('div');
    newPromptLine.className = 'prompt-line';
    newPromptLine.innerHTML = `
        <span class="prompt">hyuptree@devlog:~$</span>
        <span class="cursor">_</span>
    `;
    
    const lastPromptLine = terminalContent.lastElementChild;
    if (lastPromptLine && lastPromptLine.classList.contains('prompt-line')) {
        terminalContent.insertBefore(newPromptLine, lastPromptLine);
        lastPromptLine.remove();
        
        // 스크롤을 아래로
        newPromptLine.scrollIntoView({ behavior: 'smooth' });
    }
}

// 메뉴로 스크롤 함수 (필요시)
function scrollToMenu() {
    const fileList = document.querySelector('.file-list');
    if (fileList) {
        fileList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
} 