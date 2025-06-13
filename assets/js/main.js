// ========================================
// hyuptree devlog - Terminal UI JavaScript
// ========================================

class TerminalUI {
    constructor() {
        this.contentSection = null;
        this.panelTitle = null;
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.contentSection = document.getElementById("content-section");
            this.panelTitle = document.querySelector(".panel-title");
            
            this.updateLastUpdateTime();
            this.setupTerminalButtons();
            this.setupKeyboardEvents();
            this.setupMenuNavigation();
            this.highlightCurrentPage();
        });
    }

    // 메뉴 네비게이션 설정
    setupMenuNavigation() {
        const fileItems = document.querySelectorAll(".file-item[data-url]");
        
        fileItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const url = item.dataset.url;
                const title = item.dataset.title;
                
                // 메뉴 아이템 선택 표시
                this.updateSelectedMenuItem(item);
                
                // 콘텐츠 로드
                this.loadContent(url, title);
            });
        });

        // 홈 버튼 처리
        const homeButton = document.querySelector(".home-button[data-home]");
        if (homeButton) {
            homeButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.goHome();
            });
        }
    }

    // 선택된 메뉴 아이템 업데이트
    updateSelectedMenuItem(selectedItem) {
        // 기존 선택 제거
        document.querySelectorAll(".file-item.selected").forEach(item => {
            item.classList.remove("selected");
        });
        
        // 새 아이템 선택
        selectedItem.classList.add("selected");
    }

    // 현재 페이지에 맞는 메뉴 아이템 하이라이트
    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const fileItems = document.querySelectorAll(".file-item[data-url]");
        
        fileItems.forEach(item => {
            const itemUrl = item.dataset.url;
            if (itemUrl === currentPath) {
                item.classList.add("selected");
            }
        });
    }

    // 콘텐츠 동적 로드
    async loadContent(url, title) {
        if (!this.contentSection) return;
        
        try {
            // 로딩 표시
            this.showLoading();
            
            // 콘텐츠 fetch
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load content');
            
            const html = await response.text();
            
            // HTML에서 content-section 부분만 추출
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // content-section의 내용만 추출 (default.html 구조는 유지)
            const newContent = doc.querySelector('#content-section .content-section, #content-section');
            
            if (newContent) {
                // 기존 default.html의 터미널 구조는 그대로 유지하고, 
                // 오른쪽 패널의 콘텐츠만 교체
                const contentToInsert = newContent.innerHTML || newContent.textContent;
                this.contentSection.innerHTML = contentToInsert;
                
                // til 페이지라면 til-filter.js를 동적으로 로드
                if (url.includes('/til')) {
                    const oldScript = document.getElementById('til-filter-script');
                    if (oldScript) oldScript.remove();
                    const script = document.createElement('script');
                    script.src = '/assets/js/til-filter.js';
                    script.id = 'til-filter-script';
                    document.body.appendChild(script);
                }
                
                // 패널 제목 업데이트
                this.updatePanelTitle(title);
                
                // URL 업데이트 (브라우저 히스토리)
                if (url !== window.location.pathname) {
                    history.pushState({url, title}, title, url);
                }
                
                // 페이지 제목 업데이트
                document.title = title === '메인' ? 'hyuptree devlog' : `${title} - hyuptree devlog`;
                
                // 애니메이션 효과
                this.contentSection.classList.remove('active');
                setTimeout(() => {
                    this.contentSection.classList.add('active');
                }, 10);
                
                // 스크롤을 맨 위로
                this.contentSection.scrollTop = 0;
                
                // 새로 로드된 콘텐츠의 내부 링크 처리
                this.setupInternalLinks();
                
                // Syntax highlighting 재적용
                if (typeof hljs !== 'undefined') {
                    hljs.highlightAll();
                }
            } else {
                throw new Error('Content section not found');
            }
            
        } catch (error) {
            console.error('Error loading content:', error);
            this.showError();
        }
    }

    // 패널 제목 업데이트
    updatePanelTitle(title) {
        if (this.panelTitle) {
            const icon = this.getIconForTitle(title);
            this.panelTitle.textContent = `${icon} ${title}`;
        }
    }

    // 제목에 맞는 아이콘 반환
    getIconForTitle(title) {
        const icons = {
            'About': '📁',
            'Posts': '📝',
            'TIL': '📚',
            'Projects': '🚀',
            'Contact': '📧'
        };
        return icons[title] || '📄';
    }

    // 로딩 표시
    showLoading() {
        if (this.contentSection) {
            this.contentSection.innerHTML = `
                <div class="loading-message">
                    <div class="prompt-line">
                        <span class="prompt">hyuptree@devlog:~$</span>
                        <span class="command">loading content...</span>
                    </div>
                    <div class="output">
                        <p>⏳ 콘텐츠를 로드하는 중입니다...</p>
                    </div>
                </div>
            `;
        }
    }

    // 에러 표시
    showError() {
        if (this.contentSection) {
            this.contentSection.innerHTML = `
                <div class="error-message">
                    <div class="prompt-line">
                        <span class="prompt">hyuptree@devlog:~$</span>
                        <span class="command">cat error.log</span>
                    </div>
                    <div class="output">
                        <p style="color: #ff5f5f;">❌ 콘텐츠를 로드할 수 없습니다.</p>
                        <p style="color: var(--text-gray);">페이지를 새로고침하거나 다시 시도해주세요.</p>
                    </div>
                </div>
            `;
        }
    }

    // 홈으로 돌아가기
    async goHome() {
        // 모든 메뉴 아이템 선택 해제
        document.querySelectorAll(".file-item.selected").forEach(item => {
            item.classList.remove("selected");
        });
        
        // 패널 제목 복원
        if (this.panelTitle) {
            this.panelTitle.textContent = "📄 메인";
        }
        
        // URL 업데이트
        history.pushState({url: '/', title: '메인'}, '메인', '/');
        
        // 페이지 제목 복원
        document.title = "hyuptree devlog";
        
        try {
            // 메인 페이지 콘텐츠 로드
            const response = await fetch('/');
            if (response.ok) {
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // 메인 페이지의 실제 콘텐츠 섹션 찾기
                const mainContent = doc.querySelector('#content-section');
                
                if (mainContent && this.contentSection) {
                    // ASCII 아트 + 최근 포스트/TIL 포함된 전체 콘텐츠 로드
                    this.contentSection.innerHTML = mainContent.innerHTML;
                    
                    // 내부 링크 처리
                    this.setupInternalLinks();
                } else {
                    this.showDefaultHome();
                }
            } else {
                this.showDefaultHome();
            }
        } catch (error) {
            console.error('Error loading home content:', error);
            this.showDefaultHome();
        }
        
        // 애니메이션 효과
        if (this.contentSection) {
            this.contentSection.classList.remove('active');
            setTimeout(() => {
                this.contentSection.classList.add('active');
            }, 10);
        }
    }

    // 기본 홈 콘텐츠 표시
    showDefaultHome() {
        if (this.contentSection) {
            this.contentSection.innerHTML = `
                <div class="terminal-content">
                    <div class="prompt-line">
                        <span class="prompt">hyuptree@devlog:~$</span>
                        <span class="command">cat welcome.txt</span>
                    </div>
                    <div class="output">
                        <pre class="ascii-art">${String.raw`
 _                     _                     
| |__  _   _ _   _ _ __| |_ _ __ ___  ___ 
| '_ \| | | | | | | '_ \ __| '__/ _ \/ _ \
| | | | |_| | |_| | |_) | |_| | |  __/  __/
|_| |_|\__, |\__,_| .__/ \__|_|  \___|\___|
       |___/      |_|                     

     _            _             
  __| | _____   _| | ___   __ _ 
 / _\` |/ _ \ \ / / |/ _ \ / _\` |
| (_| |  __/\ V /| | (_) | (_| |
 \__,_|\___| \_/ |_|\___/ \__, |
                          |___/ `}
                        </pre>
                        <p class="welcome-text">hyuptree의 개발 로그에 오신 것을 환영합니다!</p>
                    </div>
                    
                    <div class="welcome-message">
                        <h3>👈 왼쪽 메뉴를 클릭하여 내용을 확인하세요</h3>
                        <p>about, posts, til, projects, contact 중 하나를 선택해주세요.</p>
                        
                        <div class="recent-content">
                            <h4>📝 최근 포스트</h4>
                            <div class="recent-item">
                                <span style="color: var(--text-gray);">최근 포스트를 로딩 중...</span>
                            </div>
                            
                            <h4>📚 최근 TIL</h4>
                            <div class="recent-item">
                                <span style="color: var(--text-gray);">최근 TIL을 로딩 중...</span>
                            </div>
                        </div>
                        
                        <div class="prompt-line" style="margin-top: 30px;">
                            <span class="prompt">hyuptree@devlog:~$</span>
                            <span class="command">echo "환영합니다! 🚀"</span>
                        </div>
                        <div class="output">
                            <p>터미널 스타일 개발 블로그에 오신 것을 환영합니다!</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // 날짜 업데이트
    updateLastUpdateTime() {
        const element = document.getElementById("last-update");
        if (!element) return;
        
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit'
        };
        element.textContent = now.toLocaleDateString("ko-KR", options);
    }

    // 터미널 버튼 설정
    setupTerminalButtons() {
        const buttons = {
            '.btn.close': () => this.handleClose(),
            '.btn.minimize': () => this.handleMinimize(),
            '.btn.maximize': () => this.handleMaximize()
        };

        Object.entries(buttons).forEach(([selector, handler]) => {
            const button = document.querySelector(selector);
            if (button) {
                button.addEventListener('click', handler);
            }
        });
    }

    handleClose() {
        if (confirm("터미널을 종료하시겠습니까?")) {
            window.close();
        }
    }

    handleMinimize() {
        const terminal = document.querySelector(".terminal");
        if (!terminal) return;
        
        terminal.style.transform = "scale(0.1)";
        setTimeout(() => {
            terminal.style.transform = "scale(1)";
        }, 1000);
    }

    handleMaximize() {
        const terminal = document.querySelector(".terminal");
        if (!terminal) return;
        
        const isMaximized = terminal.style.width === "100vw";
        terminal.style.width = isMaximized ? "90vw" : "100vw";
        terminal.style.height = isMaximized ? "90vh" : "100vh";
    }

    // 키보드 이벤트 설정
    setupKeyboardEvents() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && window.location.pathname === "/") {
                this.addNewPromptLine();
            }
        });

        // 브라우저 뒤로가기/앞으로가기 처리
        window.addEventListener('popstate', (event) => {
            if (event.state) {
                // 히스토리 상태가 있을 때 - 동적 로딩으로 처리
                this.loadContent(event.state.url, event.state.title);
                
                // 해당 메뉴 아이템 선택
                const fileItems = document.querySelectorAll(".file-item[data-url]");
                fileItems.forEach(item => {
                    item.classList.remove("selected");
                    if (item.dataset.url === event.state.url) {
                        item.classList.add("selected");
                    }
                });
            } else {
                // 히스토리 상태가 없을 때 - 메인 페이지
                this.goHome();
            }
        });
    }

    // 새 프롬프트 라인 추가
    addNewPromptLine() {
        const terminalContent = document.querySelector(".terminal-content");
        if (!terminalContent) return;

        const newPromptLine = this.createPromptLine();
        const lastPromptLine = terminalContent.lastElementChild;
        
        if (lastPromptLine?.classList.contains("prompt-line")) {
            terminalContent.insertBefore(newPromptLine, lastPromptLine);
            lastPromptLine.remove();
            this.scrollToElement(newPromptLine);
        }
    }

    createPromptLine() {
        const promptLine = document.createElement("div");
        promptLine.className = "prompt-line";
        promptLine.innerHTML = `
            <span class="prompt">hyuptree@devlog:~$</span>
            <span class="cursor">_</span>
        `;
        return promptLine;
    }

    scrollToElement(element) {
        element.scrollIntoView({ behavior: "smooth" });
    }

    // 메뉴로 스크롤 (필요시)
    scrollToMenu() {
        const fileList = document.querySelector(".file-list");
        if (fileList) {
            this.scrollToElement(fileList);
        }
    }

    // 내부 링크 동적 처리
    setupInternalLinks() {
        if (!this.contentSection) return;
        
        const links = this.contentSection.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
            // 기존 이벤트 리스너 제거 방지
            if (!link.hasAttribute('data-dynamic-handled')) {
                link.setAttribute('data-dynamic-handled', 'true');
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    const title = link.textContent || link.getAttribute('title') || 'Content';
                    
                    // 메뉴 아이템 선택 업데이트
                    this.updateMenuSelection(href);
                    
                    // 콘텐츠 로드
                    this.loadContent(href, title);
                });
            }
        });
    }

    // 메뉴 선택 상태 업데이트
    updateMenuSelection(url) {
        const fileItems = document.querySelectorAll(".file-item[data-url]");
        fileItems.forEach(item => {
            item.classList.remove("selected");
            if (item.dataset.url === url) {
                item.classList.add("selected");
            }
        });
    }
}

// 인스턴스 생성
new TerminalUI();