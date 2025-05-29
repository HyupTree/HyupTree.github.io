// 컨텐츠 관리 시스템
class ContentManager {
    constructor() {
        this.cache = {};
        this.contentFiles = {
            'about': 'content/about.md',
            'projects': 'content/projects.md', 
            'contact': 'content/contact.md'
        };
        
        // 블로그 포스트 파일들
        this.postFiles = [
            'posts/2024-11-15-retro-terminal-blog.md',
            'posts/2024-11-10-css-animations.md'
        ];
        
        // CORS 오류를 위한 fallback 데이터
        this.fallbackContent = {
            'about': `---
title: "About Me"
icon: "📋"
---

# About Me

## whoami

안녕하세요! hyuptree입니다.

레트로 스타일을 좋아하는 개발자로, 새로운 기술을 배우고 공유하는 것을 즐깁니다.

## Skills

- **Backend**: Node.js, Python, Java
- **Frontend**: HTML, CSS, JavaScript, React, Vue.js
- **Database**: MySQL, MongoDB
- **Tools**: Git, Docker, AWS

## History
- **2025(현재)** - 끊임없이 학습 중...
- **2024.12** - 엘리스 입사(Technical Operator)
- **2024.11** - 메타버스 성과공유회(과기부) - 최우수상
- **2024.10** - 2024 관광데이터 활용 공모전(한국관광공사, 카카오) - 장려상
- **2023.12** - 첫 프로그래밍 경험`,
            
            'projects': `---
title: "Projects"
icon: "🚀"
---

# Projects

## Retro Terminal Blog

**Tech Stack**: HTML, CSS, JavaScript

GitHub Pages를 이용한 레트로 터미널 스타일의 개인 블로그입니다.
진짜 터미널처럼 보이는 UI와 타이핑 효과, 스캔라인 애니메이션을 구현했습니다.

[View on GitHub](https://github.com/hyuptree)

---

## Todo App with Terminal UI

**Tech Stack**: React, TypeScript

터미널 명령어로 조작하는 투두리스트 앱입니다.
add, list, remove 등의 명령어로 할 일을 관리할 수 있습니다.

[View Demo](#)

---

## ASCII Art Generator

**Tech Stack**: Python, Flask

이미지를 ASCII 아트로 변환해주는 웹 애플리케이션입니다.
레트로 터미널 환경에서 이미지를 표현할 때 유용합니다.

[Try it out](#)`,
            
            'contact': `---
title: "Contact Information"
icon: "📧"
---

# Contact Information

## 연락처

- **📧 Email**: hyuptree@gmail.com
- **🐙 GitHub**: [github.com/hyuptree](https://github.com/hyuptree)
- **💼 LinkedIn**: [linkedin.com/in/hyuptree](https://linkedin.com/in/hyuptree)
- **🐦 Twitter**: [@hyuptree](https://twitter.com/hyuptree)

## 메시지

언제든지 연락 주세요! 개발 관련 이야기나 협업 제안 환영합니다.

---

*"좋은 코드는 대화와 같다"*`
        };
        
        // 포스트를 위한 fallback 데이터
        this.fallbackPosts = [
            {
                filename: 'posts/2024-11-15-retro-terminal-blog.md',
                title: '레트로 터미널 UI 블로그 만들기',
                date: '2024-11-15',
                excerpt: 'GitHub Pages를 이용해서 레트로 터미널 느낌의 블로그를 만드는 방법을 소개합니다...',
                content: `# GitHub Pages로 터미널 스타일 블로그 만들기

안녕하세요! 오늘은 GitHub Pages를 이용해서 레트로 터미널 느낌의 블로그를 만드는 방법을 소개하겠습니다.

## 사용한 기술

- HTML5 - 기본 구조
- CSS3 - 터미널 스타일링 및 애니메이션  
- JavaScript - 인터랙션
- Google Fonts - Source Code Pro 폰트`,
                metadata: {
                    title: '레트로 터미널 UI 블로그 만들기',
                    date: '2024-11-15',
                    author: 'hyuptree'
                }
            },
            {
                filename: 'posts/2024-11-10-css-animations.md',
                title: 'CSS 애니메이션으로 터미널 효과 구현하기',
                date: '2024-11-10',
                excerpt: 'CSS 애니메이션을 활용해서 진짜 터미널 같은 효과를 구현하는 방법을 알아봅니다...',
                content: `# CSS로 터미널 효과 만들기

이번 포스트에서는 CSS 애니메이션을 활용해서 진짜 터미널 같은 효과를 구현하는 방법을 알아보겠습니다.

## 1. 스캔라인 효과

CRT 모니터의 주사선을 표현하기 위해 linear-gradient와 animation을 사용했습니다.`,
                metadata: {
                    title: 'CSS 애니메이션으로 터미널 효과 구현하기',
                    date: '2024-11-10',
                    author: 'hyuptree'
                }
            }
        ];
    }

    // 마크다운을 HTML로 변환하는 간단한 함수
    markdownToHtml(markdown) {
        return markdown
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h3>$1</h3>')
            .replace(/^# (.*$)/gim, '<h2>$1</h2>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')
            .replace(/\`(.*?)\`/gim, '<code>$1</code>')
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
            .replace(/^---$/gim, '<hr>')
            .replace(/\n\n/gim, '</p><p>')
            .replace(/^(?!<[h|u|l|hr])/gim, '<p>')
            .replace(/(?<![>])$/gim, '</p>')
            .replace(/<p><\/p>/gim, '')
            .replace(/<p>(<[hl])/gim, '$1')
            .replace(/(<\/[hl][^>]*>)<\/p>/gim, '$1');
    }

    // 메타데이터 파싱
    parseMetadata(content) {
        const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(frontMatterRegex);
        
        if (!match) return { metadata: {}, content };
        
        const frontMatter = match[1];
        const postContent = match[2];
        const metadata = {};
        
        frontMatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
                let value = valueParts.join(':').trim();
                value = value.replace(/^["']|["']$/g, ''); // 따옴표 제거
                metadata[key.trim()] = value;
            }
        });
        
        return { metadata, content: postContent };
    }

    // 컨텐츠 로드
    async loadContent(sectionName) {
        // 캐시 확인
        if (this.cache[sectionName]) {
            return this.cache[sectionName];
        }

        const filePath = this.contentFiles[sectionName];
        if (!filePath) {
            console.error(`섹션 '${sectionName}'을 찾을 수 없습니다.`);
            return null;
        }

        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('파일을 찾을 수 없습니다');
            
            const content = await response.text();
            const { metadata, content: markdownContent } = this.parseMetadata(content);
            
            const htmlContent = this.markdownToHtml(markdownContent);
            
            const result = {
                title: metadata.title || sectionName,
                icon: metadata.icon || '📄',
                content: htmlContent,
                metadata
            };

            // 캐시에 저장
            this.cache[sectionName] = result;
            return result;
            
        } catch (error) {
            console.warn(`파일 로드 실패, fallback 사용 (${sectionName}):`, error.message);
            
            // fallback 데이터 사용
            const fallbackData = this.fallbackContent[sectionName];
            if (fallbackData) {
                const { metadata, content: markdownContent } = this.parseMetadata(fallbackData);
                const htmlContent = this.markdownToHtml(markdownContent);
                
                const result = {
                    title: metadata.title || sectionName,
                    icon: metadata.icon || '📄',
                    content: htmlContent,
                    metadata
                };

                // 캐시에 저장
                this.cache[sectionName] = result;
                return result;
            }
            
            console.error(`fallback 데이터도 없음 (${sectionName})`);
            return null;
        }
    }

    // 터미널 스타일로 컨텐츠 래핑
    wrapInTerminalStyle(sectionName, content) {
        const commands = {
            'about': 'cat about/profile.txt',
            'projects': 'ls -la projects/',
            'contact': 'cat contact.txt'
        };

        return `
            <h2>${content.icon} ${content.title}</h2>
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~/${sectionName}$</span>
                <span class="command">${commands[sectionName] || 'cat ' + sectionName + '.txt'}</span>
            </div>
            <div class="output">
                ${content.content}
            </div>
        `;
    }

    // 블로그 포스트 목록 로드
    async loadPosts() {
        if (this.cache['posts']) {
            return this.cache['posts'];
        }

        const posts = [];
        
        for (const postFile of this.postFiles) {
            try {
                const response = await fetch(postFile);
                if (response.ok) {
                    const content = await response.text();
                    const { metadata, content: markdownContent } = this.parseMetadata(content);
                    
                    posts.push({
                        filename: postFile,
                        title: metadata.title || 'Untitled',
                        date: metadata.date || '2024-01-01',
                        excerpt: metadata.excerpt || markdownContent.substring(0, 150) + '...',
                        content: markdownContent,
                        metadata
                    });
                }
            } catch (error) {
                console.warn(`포스트 로드 실패, fallback 사용: ${postFile}`, error.message);
            }
        }
        
        // 로드된 포스트가 없으면 fallback 사용
        if (posts.length === 0) {
            console.log('fallback 포스트 데이터 사용');
            posts.push(...this.fallbackPosts);
        }
        
        // 날짜 순으로 정렬 (최신순)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 캐시에 저장
        this.cache['posts'] = posts;
        return posts;
    }

    // 포스트 목록을 HTML로 변환
    renderPostList(posts) {
        if (posts.length === 0) {
            return '<p>아직 작성된 포스트가 없습니다.</p>';
        }

        return posts.map(post => `
            <div class="post-item" onclick="openPost('${post.filename}')">
                <div class="post-title">${post.title}</div>
                <div class="post-date">-rw-r--r-- 1 user user 2048 ${post.date}</div>
                <div class="post-excerpt">${post.excerpt}</div>
            </div>
        `).join('');
    }

    // 개별 포스트 로드
    async loadSinglePost(filename) {
        try {
            const response = await fetch(filename);
            if (response.ok) {
                const content = await response.text();
                const { metadata, content: markdownContent } = this.parseMetadata(content);
                
                return {
                    filename,
                    title: metadata.title || 'Untitled',
                    date: metadata.date || '2024-01-01',
                    author: metadata.author || 'hyuptree',
                    content: markdownContent,
                    metadata
                };
            }
        } catch (error) {
            console.warn(`포스트 로드 실패, fallback 사용: ${filename}`, error.message);
            
            // fallback에서 찾기
            const fallbackPost = this.fallbackPosts.find(post => post.filename === filename);
            if (fallbackPost) {
                return fallbackPost;
            }
        }
        
        return null;
    }

    // 캐시 클리어
    clearCache() {
        this.cache = {};
    }
}

// 전역 컨텐츠 매니저 인스턴스
const contentManager = new ContentManager();

// 섹션 열기 함수 (새 버전)
async function openSectionFromFile(sectionName, event) {
    const contentSection = document.getElementById('content-section');
    
    // 기존 파일 아이템 하이라이트 제거
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 클릭된 파일 아이템 하이라이트
    const clickedItem = event.target.closest('.file-item');
    if (clickedItem) {
        clickedItem.classList.add('selected');
    }

    // 로딩 표시
    contentSection.innerHTML = `
        <div class="welcome-message">
            <h3>⏳ 로딩 중...</h3>
            <p>컨텐츠를 불러오고 있습니다.</p>
        </div>
    `;

    try {
        const content = await contentManager.loadContent(sectionName);
        if (content) {
            const wrappedContent = contentManager.wrapInTerminalStyle(sectionName, content);
            contentSection.innerHTML = wrappedContent;
            contentSection.className = 'content-section active';
            
            // 패널 제목 업데이트
            const panelTitle = document.querySelector('.panel-title');
            panelTitle.textContent = `${content.icon} ${content.title}`;
        } else {
            contentSection.innerHTML = `
                <div class="welcome-message">
                    <h3>❌ 오류</h3>
                    <p>컨텐츠를 불러올 수 없습니다.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('컨텐츠 로드 오류:', error);
        contentSection.innerHTML = `
            <div class="welcome-message">
                <h3>❌ 오류</h3>
                <p>컨텐츠를 불러오는 중 오류가 발생했습니다.</p>
            </div>
        `;
    }
}

// 포스트 섹션을 여는 새로운 함수
async function openPostsSection(event) {
    const contentSection = document.getElementById('content-section');
    
    // 기존 파일 아이템 하이라이트 제거
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 클릭된 파일 아이템 하이라이트 (event가 있을 때만)
    if (event) {
        const clickedItem = event.target.closest('.file-item');
        if (clickedItem) {
            clickedItem.classList.add('selected');
        }
    } else {
        // 돌아가기 버튼에서 호출된 경우 posts 메뉴 하이라이트
        const fileItems = document.querySelectorAll('.file-item');
        fileItems.forEach(item => {
            const nameSpan = item.querySelector('.name');
            if (nameSpan && nameSpan.textContent === 'posts') {
                item.classList.add('selected');
            }
        });
    }

    // 로딩 표시
    contentSection.innerHTML = `
        <div class="welcome-message">
            <h3>⏳ 포스트를 불러오는 중...</h3>
            <p>블로그 포스트 목록을 로드하고 있습니다.</p>
        </div>
    `;

    try {
        const posts = await contentManager.loadPosts();
        const postListHtml = contentManager.renderPostList(posts);
        
        const wrappedContent = `
            <h2>📝 Blog Posts</h2>
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~/posts$</span>
                <span class="command">find . -name "*.md" -exec ls -la {} \\;</span>
            </div>
            <div class="output">
                ${postListHtml}
            </div>
        `;
        
        contentSection.innerHTML = wrappedContent;
        contentSection.className = 'content-section active';
        
        // 패널 제목 업데이트
        const panelTitle = document.querySelector('.panel-title');
        panelTitle.textContent = '📝 Blog Posts';
        
    } catch (error) {
        console.error('포스트 로드 오류:', error);
        contentSection.innerHTML = `
            <div class="welcome-message">
                <h3>❌ 오류</h3>
                <p>포스트를 불러오는 중 오류가 발생했습니다.</p>
            </div>
        `;
    }
}

// 개별 포스트를 여는 함수
async function openPost(filename) {
    const contentSection = document.getElementById('content-section');
    
    // 로딩 표시
    contentSection.innerHTML = `
        <div class="welcome-message">
            <h3>⏳ 포스트를 불러오는 중...</h3>
            <p>${filename}을 로드하고 있습니다.</p>
        </div>
    `;

    try {
        const post = await contentManager.loadSinglePost(filename);
        if (post) {
            const htmlContent = contentManager.markdownToHtml(post.content);
            
            const wrappedContent = `
                <h2>📝 ${post.title}</h2>
                <div class="prompt-line">
                    <span class="prompt">hyuptree@devlog:~/posts$</span>
                    <span class="command">cat ${filename.split('/').pop()}</span>
                </div>
                <div class="output">
                    <div class="post-meta">
                        <p><strong>작성일:</strong> ${post.date}</p>
                        <p><strong>작성자:</strong> ${post.author}</p>
                        ${post.metadata.tags ? `<p><strong>태그:</strong> ${Array.isArray(post.metadata.tags) ? post.metadata.tags.join(', ') : post.metadata.tags}</p>` : ''}
                    </div>
                    <hr>
                    ${htmlContent}
                    <hr>
                    <div class="post-navigation">
                        <button onclick="openPostsSection(null)" class="back-to-posts">← 포스트 목록으로 돌아가기</button>
                    </div>
                </div>
            `;
            
            contentSection.innerHTML = wrappedContent;
            contentSection.className = 'content-section active';
            
            // 패널 제목 업데이트
            const panelTitle = document.querySelector('.panel-title');
            panelTitle.textContent = `📝 ${post.title}`;
            
            // 스크롤을 위로
            setTimeout(() => {
                contentSection.scrollTop = 0;
            }, 100);
            
        } else {
            contentSection.innerHTML = `
                <div class="welcome-message">
                    <h3>❌ 오류</h3>
                    <p>포스트를 불러올 수 없습니다.</p>
                    <button onclick="openPostsSection(null)" class="back-to-posts">← 포스트 목록으로 돌아가기</button>
                </div>
            `;
        }
    } catch (error) {
        console.error('포스트 로드 오류:', error);
        contentSection.innerHTML = `
            <div class="welcome-message">
                <h3>❌ 오류</h3>
                <p>포스트를 불러오는 중 오류가 발생했습니다.</p>
                <button onclick="openPostsSection(null)" class="back-to-posts">← 포스트 목록으로 돌아가기</button>
            </div>
        `;
    }
} 