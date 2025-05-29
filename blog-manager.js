// 블로그 관리 시스템
class BlogManager {
    constructor() {
        this.posts = [];
        this.isMarkdownEnabled = true;
    }

    // 마크다운을 HTML로 변환하는 간단한 함수
    markdownToHtml(markdown) {
        return markdown
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h3>$1</h3>')
            .replace(/^# (.*$)/gim, '<h2>$1</h2>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\`(.*?)\`/gim, '<code>$1</code>')
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n\n/gim, '</p><p>')
            .replace(/^(?!<[h|u|l])/gim, '<p>')
            .replace(/(?<![>])$/gim, '</p>');
    }

    // 포스트 메타데이터 파싱
    parsePostMetadata(content) {
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

    // 포스트 목록 생성
    async generatePostsList() {
        const postFiles = [
            'posts/2024-11-15-retro-terminal-blog.md',
            'posts/2024-11-10-css-animations.md',
            // 여기에 새로운 포스트 파일을 추가하세요
        ];

        const postsHtml = [];
        
        for (const file of postFiles) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const content = await response.text();
                    const { metadata, content: postContent } = this.parsePostMetadata(content);
                    
                    const postId = file.replace('posts/', '').replace('.md', '');
                    
                    postsHtml.push(`
                        <div class="post-item" onclick="loadMarkdownPost('${file}')">
                            <div class="post-title">[${metadata.date}] ${metadata.title}</div>
                            <div class="post-date">-rw-r--r-- 1 hyuptree hyuptree 2048 ${new Date(metadata.date).toLocaleDateString()}</div>
                            <div class="post-excerpt">${postContent.substring(0, 100)}...</div>
                        </div>
                    `);
                }
            } catch (error) {
                console.log(`포스트 파일을 찾을 수 없습니다: ${file}`);
            }
        }
        
        return postsHtml.join('');
    }

    // 마크다운 포스트 로드
    async loadPost(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('파일을 찾을 수 없습니다');
            
            const content = await response.text();
            const { metadata, content: postContent } = this.parsePostMetadata(content);
            
            const htmlContent = this.markdownToHtml(postContent);
            
            return {
                title: metadata.title,
                date: metadata.date,
                author: metadata.author,
                tags: metadata.tags,
                content: htmlContent
            };
        } catch (error) {
            console.error('포스트 로드 실패:', error);
            return null;
        }
    }
}

// 전역 블로그 매니저 인스턴스
const blogManager = new BlogManager();

// 마크다운 포스트 로드 함수
async function loadMarkdownPost(filePath) {
    const post = await blogManager.loadPost(filePath);
    if (post) {
        const contentSection = document.getElementById('content-section');
        const panelTitle = document.querySelector('.panel-title');
        
        contentSection.innerHTML = `
            <h2>${post.title}</h2>
            <div class="post-date">작성일: ${post.date} | 작성자: ${post.author}</div>
            ${post.content}
        `;
        contentSection.className = 'content-section active';
        
        panelTitle.textContent = `📝 ${post.title}`;
        
        setTimeout(() => {
            contentSection.scrollTop = 0;
        }, 100);
    }
}

// posts 섹션을 동적으로 업데이트
async function updatePostsSection() {
    const postsHtml = await blogManager.generatePostsList();
    
    // 기존 sections 객체의 posts 업데이트
    if (typeof sections !== 'undefined') {
        sections.posts.content = `
            <h2>📝 Blog Posts</h2>
            <div class="prompt-line">
                <span class="prompt">hyuptree@devlog:~/posts$</span>
                <span class="command">find . -name "*.md" -exec ls -la {} \\;</span>
            </div>
            <div class="output">
                ${postsHtml}
            </div>
        `;
    }
}

// 페이지 로드 시 포스트 목록 업데이트
document.addEventListener('DOMContentLoaded', function() {
    updatePostsSection();
}); 