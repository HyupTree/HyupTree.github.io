# 🌲 hyuptree devlog

레트로 터미널 스타일의 개인 개발 블로그입니다.

## 🚀 Features

- 🖥️ 레트로 CRT 모니터 스타일 UI
- ⚡ 스캔라인 효과 및 깜빡이는 커서 애니메이션
- 📱 반응형 디자인
- 🎮 터미널 명령어 시뮬레이션
- 📝 블로그 포스트 관리
- 🛠️ 프로젝트 포트폴리오
- 📧 연락처 정보

## 🛠️ Tech Stack

- HTML5
- CSS3 (애니메이션 및 그라디언트)
- Vanilla JavaScript
- Google Fonts (Source Code Pro)

## 📦 GitHub Pages 배포 방법

### 1. 리포지토리 생성
```bash
# GitHub에서 새 리포지토리 생성
# 리포지토리 이름: hyuptree.github.io (또는 원하는 이름)
```

### 2. 코드 업로드
```bash
git init
git add .
git commit -m "Initial commit: hyuptree devlog"
git branch -M main
git remote add origin https://github.com/hyuptree/hyuptree.github.io.git
git push -u origin main
```

### 3. GitHub Pages 활성화
1. GitHub 리포지토리 → Settings
2. 왼쪽 메뉴에서 "Pages" 클릭
3. Source를 "Deploy from a branch" 선택
4. Branch를 "main" 선택, 폴더는 "/ (root)" 선택
5. Save 클릭

### 4. 접속
- 몇 분 후 `https://hyuptree.github.io` 에서 확인 가능
- (리포지토리 이름이 다르면 `https://hyuptree.github.io/리포지토리명`)

## 🎨 커스터마이징

### 개인 정보 수정
`script.js` 파일에서 다음 정보를 수정할 수 있습니다:

```javascript
// Contact 정보 수정
<p>📧 Email: your-email@example.com</p>
<p>🐙 GitHub: <a href="https://github.com/hyuptree">github.com/hyuptree</a></p>
<p>💼 LinkedIn: <a href="https://linkedin.com/in/hyuptree">linkedin.com/in/hyuptree</a></p>
```

### 블로그 포스트 추가
`script.js`의 `posts` 객체에 새로운 포스트를 추가:

```javascript
const posts = {
    // 기존 포스트들...
    newPost: {
        title: '새로운 포스트 제목',
        date: '2024-11-15',
        content: `
            <h3>포스트 내용</h3>
            <p>여기에 내용을 작성하세요.</p>
        `
    }
};
```

### 프로젝트 추가
`projects` 섹션의 content에 새로운 프로젝트 추가:

```javascript
<div class="project-item">
    <div class="project-title">프로젝트 이름</div>
    <div class="project-tech">Tech Stack: React, Node.js</div>
    <div class="project-description">프로젝트 설명</div>
    <a href="#" class="project-link">View on GitHub</a>
</div>
```

## 🎮 사용법

- **파일 클릭**: about/, posts/, projects/, contact.txt 파일을 클릭하여 각 섹션 탐색
- **터미널 버튼**: 좌상단의 빨간색(닫기), 노란색(최소화), 초록색(최대화) 버튼 사용
- **키보드**: Enter 키를 눌러 새로운 프롬프트 라인 생성
- **포스트 읽기**: posts 섹션에서 포스트 클릭하여 상세 내용 확인

## 🌟 특별한 기능

### 매트릭스 효과
`script.js` 파일 맨 아래 주석을 해제하면 배경에 매트릭스 효과 활성화:
```javascript
// 매트릭스 효과 활성화 (원하는 경우 주석 해제)
createMatrixEffect();
```

### 커스텀 색상
`styles.css`에서 터미널 색상을 변경할 수 있습니다:
- `#00ff00`: 메인 초록색 (프롬프트, 테두리)
- `#00ffff`: 시안색 (제목, ASCII 아트)
- `#ffff00`: 노란색 (크기, 강조 텍스트)
- `#ff00ff`: 마젤타색 (날짜, 기술 스택)

## 📁 파일 구조

```
hyuptree-devlog/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 로직
└── README.md          # 이 파일
```

## 🤝 기여하기

개선사항이나 버그 발견 시 이슈를 생성하거나 풀 리퀘스트를 보내주세요!

## 📄 라이선스

MIT License

---

Made with ❤️ by hyuptree 