// 현재 날짜 표시
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdateElement = document.getElementById('last-update');
    const now = new Date();
    const formattedDate = now.toLocaleDateString('ko-KR') + ' ' + now.toLocaleTimeString('ko-KR');
    lastUpdateElement.textContent = formattedDate;
});

// 섹션 데이터
const sections = {
    about: {
        title: 'cat about/profile.txt',
        content: `
            <h2>📋 About Me</h2>
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~/about$</span>
                <span class="command">whoami</span>
            </div>
            <div class="output">
                <p>안녕하세요! hyuptree입니다.</p>
                <p>레트로 터미널 스타일을 좋아하는 개발자로, 새로운 기술을 배우고 공유하는 것을 즐깁니다.</p>
            </div>
            
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~/about$</span>
                <span class="command">cat skills.txt</span>
            </div>
            <div class="output">
                <h3>🛠 Skills</h3>
                <ul>
                    <li>Frontend: HTML, CSS, JavaScript, React, Vue.js</li>
                    <li>Backend: Node.js, Python, Java</li>
                    <li>Database: MySQL, MongoDB</li>
                    <li>Tools: Git, Docker, AWS</li>
                </ul>
            </div>
            
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~/about$</span>
                <span class="command">history | tail -5</span>
            </div>
            <div class="output">
                <p>2025(현재) - 끊임없이 학습 중...</p>
                <p>2024.12 - 엘리스 입사</p>
                <p>메타버스 성과공유회 - 최우수상()
                <p>2024 관데이터 활용 공모전 - 장려상</p>
                <p>2023.12 - 첫 프로그래밍 경험</p>
                
            </div>
        `
    },
    posts: {
        title: 'ls -la posts/',
        content: `
            <h2>📝 Blog Posts</h2>
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~/posts$</span>
                <span class="command">find . -name "*.md" -exec ls -la {} \\;</span>
            </div>
            <div class="output">
                <div class="post-item" onclick="openPost('post1')">
                    <div class="post-title">[2024.11.15] 레트로 터미널 UI 블로그 만들기</div>
                    <div class="post-date">-rw-r--r-- 1 user user 2048 Nov 15 10:30</div>
                    <div class="post-excerpt">GitHub Pages와 순수 HTML/CSS/JS로 레트로 터미널 느낌의 블로그를 만들어보았습니다...</div>
                </div>
                
                <div class="post-item" onclick="openPost('post2')">
                    <div class="post-title">[2024.11.10] CSS 애니메이션으로 터미널 효과 구현하기</div>
                    <div class="post-date">-rw-r--r-- 1 user user 1536 Nov 10 14:20</div>
                    <div class="post-excerpt">스캔라인 효과와 깜빡이는 커서로 진짜 터미널 같은 느낌을 만들어보겠습니다...</div>
                </div>
                
                <div class="post-item" onclick="openPost('post3')">
                    <div class="post-title">[2024.11.05] JavaScript로 타이핑 효과 만들기</div>
                    <div class="post-date">-rw-r--r-- 1 user user 1024 Nov 05 16:45</div>
                    <div class="post-excerpt">터미널에서 명령어가 타이핑되는 것처럼 보이는 효과를 구현해보겠습니다...</div>
                </div>
            </div>
        `
    },
    projects: {
        title: 'ls -la projects/',
        content: `
            <h2>🚀 Projects</h2>
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~/projects$</span>
                <span class="command">tree -L 2</span>
            </div>
            <div class="output">
                <div class="project-item">
                    <div class="project-title">Retro Terminal Blog</div>
                    <div class="project-tech">Tech Stack: HTML, CSS, JavaScript</div>
                    <div class="project-description">
                        GitHub Pages를 이용한 레트로 터미널 스타일의 개인 블로그입니다.
                        진짜 터미널처럼 보이는 UI와 타이핑 효과, 스캔라인 애니메이션을 구현했습니다.
                    </div>
                    <a href="#" class="project-link">View on GitHub</a>
                </div>
                
                <div class="project-item">
                    <div class="project-title">Todo App with Terminal UI</div>
                    <div class="project-tech">Tech Stack: React, TypeScript</div>
                    <div class="project-description">
                        터미널 명령어로 조작하는 투두리스트 앱입니다.
                        add, list, remove 등의 명령어로 할 일을 관리할 수 있습니다.
                    </div>
                    <a href="#" class="project-link">View Demo</a>
                </div>
                
                <div class="project-item">
                    <div class="project-title">ASCII Art Generator</div>
                    <div class="project-tech">Tech Stack: Python, Flask</div>
                    <div class="project-description">
                        이미지를 ASCII 아트로 변환해주는 웹 애플리케이션입니다.
                        레트로 터미널 환경에서 이미지를 표현할 때 유용합니다.
                    </div>
                    <a href="#" class="project-link">Try it out</a>
                </div>
            </div>
        `
    },
    contact: {
        title: 'cat contact.txt',
        content: `
            <h2>📧 Contact Information</h2>
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~$</span>
                <span class="command">cat contact.txt</span>
            </div>
            <div class="output">
                <p>📧 Email: hyuptree@gmail.com</p>
                <p>🐙 GitHub: <a href="https://github.com/hyuptree" target="_blank">github.com/hyuptree</a></p>
                <p>💼 LinkedIn: <a href="https://linkedin.com/in/hyuptree" target="_blank">linkedin.com/in/hyuptree</a></p>
                <p>🐦 Twitter: <a href="https://twitter.com/hyuptree" target="_blank">@hyuptree</a></p>
            </div>
            
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~$</span>
                <span class="command">echo "메시지를 보내주세요!"</span>
            </div>
            <div class="output">
                <p>언제든지 연락 주세요! 개발 관련 이야기나 협업 제안 환영합니다.</p>
            </div>
        `
    }
};

// 섹션 열기 함수
function openSection(sectionName, event) {
    const contentSection = document.getElementById('content-section');
    const section = sections[sectionName];
    
    if (section) {
        // 기존 파일 아이템 하이라이트 제거
        document.querySelectorAll('.file-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // 클릭된 파일 아이템 하이라이트
        const clickedItem = event.target.closest('.file-item');
        if (clickedItem) {
            clickedItem.classList.add('selected');
        }
        
        // 오른쪽 패널에 내용 표시
        contentSection.innerHTML = section.content;
        contentSection.className = 'content-section active';
        
        // 패널 제목 업데이트
        const panelTitle = document.querySelector('.panel-title');
        panelTitle.textContent = `📄 ${getSectionDisplayName(sectionName)}`;
    }
}

// 섹션 표시 이름 가져오기
function getSectionDisplayName(sectionName) {
    const displayNames = {
        'about': 'About Me',
        'posts': 'Blog Posts',
        'projects': 'Projects',
        'contact': 'Contact Info'
    };
    return displayNames[sectionName] || 'Content';
}

// 오른쪽 패널 닫기
function closeRightPanel() {
    const contentSection = document.getElementById('content-section');
    const panelTitle = document.querySelector('.panel-title');
    
    contentSection.innerHTML = `
        <div class="welcome-message">
            <h3>👈 왼쪽 메뉴를 클릭하여 내용을 확인하세요</h3>
            <p>about/, posts/, projects/, contact.txt 중 하나를 선택해주세요.</p>
        </div>
    `;
    panelTitle.textContent = '📄 Content Viewer';
}

// 포스트 열기 함수
function openPost(postId) {
    const posts = {
        post1: {
            title: '레트로 터미널 UI 블로그 만들기',
            date: '2024-11-15',
            content: `
                <h3>GitHub Pages로 터미널 스타일 블로그 만들기</h3>
                <p>안녕하세요! 오늘은 GitHub Pages를 이용해서 레트로 터미널 느낌의 블로그를 만드는 방법을 소개하겠습니다.</p>
                
                <h3>사용한 기술</h3>
                <ul>
                    <li>HTML5 - 기본 구조</li>
                    <li>CSS3 - 터미널 스타일링 및 애니메이션</li>
                    <li>JavaScript - 인터랙션</li>
                    <li>Google Fonts - Source Code Pro 폰트</li>
                </ul>
                
                <h3>주요 특징</h3>
                <ul>
                    <li>스캔라인 효과로 진짜 CRT 모니터 같은 느낌</li>
                    <li>깜빡이는 커서 애니메이션</li>
                    <li>터미널 명령어 시뮬레이션</li>
                    <li>반응형 디자인</li>
                </ul>
                
                <p>이런 스타일의 블로그는 개발자들에게 특히 매력적으로 다가갈 수 있고, 포트폴리오 사이트로도 훌륭하게 활용할 수 있습니다.</p>
            `
        },
        post2: {
            title: 'CSS 애니메이션으로 터미널 효과 구현하기',
            date: '2024-11-10',
            content: `
                <h3>CSS로 터미널 효과 만들기</h3>
                <p>이번 포스트에서는 CSS 애니메이션을 활용해서 진짜 터미널 같은 효과를 구현하는 방법을 알아보겠습니다.</p>
                
                <h3>1. 스캔라인 효과</h3>
                <p>CRT 모니터의 주사선을 표현하기 위해 linear-gradient와 animation을 사용했습니다.</p>
                
                <h3>2. 깜빡이는 커서</h3>
                <p>opacity를 이용한 blink 애니메이션으로 터미널의 커서를 재현했습니다.</p>
                
                <h3>3. 글로우 효과</h3>
                <p>text-shadow와 box-shadow를 활용해서 형광등 같은 글로우 효과를 추가했습니다.</p>
                
                <p>이런 작은 디테일들이 모여서 사용자에게 몰입감 있는 경험을 제공할 수 있습니다.</p>
            `
        },
        post3: {
            title: 'JavaScript로 타이핑 효과 만들기',
            date: '2024-11-05',
            content: `
                <h3>타이핑 효과 구현하기</h3>
                <p>터미널에서 명령어가 한 글자씩 타이핑되는 효과를 JavaScript로 구현해보겠습니다.</p>
                
                <h3>기본 원리</h3>
                <p>setTimeout이나 setInterval을 사용해서 문자열을 한 글자씩 추가하는 방식입니다.</p>
                
                <h3>고급 기법</h3>
                <ul>
                    <li>타이핑 속도 조절</li>
                    <li>백스페이스 효과</li>
                    <li>여러 문장 연속 타이핑</li>
                    <li>사용자 입력 시뮬레이션</li>
                </ul>
                
                <p>이런 효과들을 조합하면 정말 사용자가 직접 터미널을 조작하는 것 같은 느낌을 줄 수 있습니다.</p>
            `
        }
    };
    
    const post = posts[postId];
    if (post) {
        const contentSection = document.getElementById('content-section');
        const panelTitle = document.querySelector('.panel-title');
        
        contentSection.innerHTML = `
            <h2>${post.title}</h2>
            <div class="post-date">작성일: ${post.date}</div>
            ${post.content}
        `;
        contentSection.className = 'content-section active';
        
        // 패널 제목 업데이트
        panelTitle.textContent = `📝 ${post.title}`;
        
        // 오른쪽 패널 스크롤을 위로
        setTimeout(() => {
            contentSection.scrollTop = 0;
        }, 100);
    }
}

// 터미널 버튼 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.btn.close');
    const minimizeBtn = document.querySelector('.btn.minimize');
    const maximizeBtn = document.querySelector('.btn.maximize');
    
    closeBtn.addEventListener('click', function() {
        if (confirm('터미널을 종료하시겠습니까?')) {
            window.close();
        }
    });
    
    minimizeBtn.addEventListener('click', function() {
        document.querySelector('.terminal').style.transform = 'scale(0.1)';
        setTimeout(() => {
            document.querySelector('.terminal').style.transform = 'scale(1)';
        }, 1000);
    });
    
    maximizeBtn.addEventListener('click', function() {
        const terminal = document.querySelector('.terminal');
        terminal.style.width = terminal.style.width === '100vw' ? '90vw' : '100vw';
        terminal.style.height = terminal.style.height === '100vh' ? '90vh' : '100vh';
    });
});

// 키보드 이벤트로 터미널 명령어 시뮬레이션
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Enter 키를 누르면 새로운 프롬프트 라인 추가
        const terminalContent = document.querySelector('.terminal-content');
        const newPromptLine = document.createElement('div');
        newPromptLine.className = 'prompt-line';
        newPromptLine.innerHTML = `
            <span class="prompt">hyuptree@devlog:~$</span>
            <span class="cursor">_</span>
        `;
        
        const lastPromptLine = terminalContent.lastElementChild;
        terminalContent.insertBefore(newPromptLine, lastPromptLine);
        lastPromptLine.remove();
        
        // 스크롤을 아래로
        newPromptLine.scrollIntoView({ behavior: 'smooth' });
    }
});

// 매트릭스 효과 (선택사항)
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px Source Code Pro';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// 메뉴로 스크롤
function scrollToMenu() {
    const fileList = document.querySelector('.file-list');
    if (fileList) {
        fileList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 매트릭스 효과 활성화 (원하는 경우 주석 해제)
// createMatrixEffect(); 