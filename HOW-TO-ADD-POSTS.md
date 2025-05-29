# 📝 새로운 글 추가하는 방법

## 방법 1: 마크다운 파일로 글 추가 (추천)

### 1단계: 새 마크다운 파일 생성
`posts/` 폴더에 새 파일을 만듭니다.
파일명 형식: `YYYY-MM-DD-제목.md`

예시: `posts/2024-11-16-my-new-post.md`

### 2단계: 파일 내용 작성
```markdown
---
title: "내 새로운 포스트 제목"
date: "2024-11-16"
author: "hyuptree"
tags: ["태그1", "태그2", "태그3"]
---

# 포스트 제목

여기에 내용을 마크다운으로 작성합니다.

## 섹션 제목

- 리스트 아이템 1
- 리스트 아이템 2

**볼드 텍스트**와 *이탤릭 텍스트*를 사용할 수 있습니다.

`코드`도 사용 가능합니다.
```

### 3단계: 블로그 매니저에 파일 추가
`blog-manager.js` 파일을 열고 `postFiles` 배열에 새 파일을 추가:

```javascript
const postFiles = [
    'posts/2024-11-15-retro-terminal-blog.md',
    'posts/2024-11-10-css-animations.md',
    'posts/2024-11-16-my-new-post.md',  // 새 파일 추가
    // 여기에 새로운 포스트 파일을 추가하세요
];
```

### 4단계: GitHub에 푸시
```bash
git add .
git commit -m "새 포스트 추가: 제목"
git push
```

## 방법 2: script.js에서 직접 추가

`script.js` 파일의 `posts` 객체에 직접 추가:

```javascript
const posts = {
    // 기존 포스트들...
    newPost: {
        title: '새로운 포스트 제목',
        date: '2024-11-16',
        content: `
            <h3>포스트 내용</h3>
            <p>여기에 HTML로 내용을 작성하세요.</p>
        `
    }
};
```

그리고 `posts` 섹션의 HTML에 새 포스트 아이템 추가:

```javascript
<div class="post-item" onclick="openPost('newPost')">
    <div class="post-title">[2024.11.16] 새로운 포스트 제목</div>
    <div class="post-date">-rw-r--r-- 1 hyuptree hyuptree 1024 Nov 16 10:30</div>
    <div class="post-excerpt">포스트 요약...</div>
</div>
```

## 🎯 추천 방법

**마크다운 방식(방법 1)**을 추천합니다. 이유:
- 글쓰기에 집중할 수 있음
- 마크다운 문법이 간단하고 직관적
- 파일별로 관리되어 체계적
- GitHub에서 바로 편집 가능

## 📁 파일 구조 예시

```
hyuptree-devlog/
├── posts/
│   ├── 2024-11-15-retro-terminal-blog.md
│   ├── 2024-11-10-css-animations.md
│   └── 2024-11-16-my-new-post.md
├── index.html
├── script.js
├── blog-manager.js
└── styles.css
```

## 🚀 GitHub에서 바로 편집하기

1. GitHub 웹사이트에서 리포지토리로 이동
2. `posts/` 폴더로 이동
3. "Add file" → "Create new file" 클릭
4. 파일명과 내용 입력
5. 맨 아래 "Commit new file" 클릭
6. `blog-manager.js`에서 파일 목록에 추가
7. Commit changes

이제 언제든지 새로운 글을 쉽게 추가할 수 있습니다! 🎉 