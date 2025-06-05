---
title: "레트로 터미널 UI 블로그 만들기"
date: 2024-11-15 10:30:00 +0900
author: "hyuptree"
categories: [웹개발, 프론트엔드]
tags: [HTML, CSS, JavaScript, GitHub-Pages, 터미널-UI]
excerpt: "GitHub Pages와 순수 HTML/CSS/JS로 레트로 터미널 느낌의 블로그를 만들어보았습니다. CRT 모니터의 스캔라인 효과와 깜빡이는 커서로 진짜 터미널 같은 느낌을 구현했습니다."
---

# GitHub Pages로 터미널 스타일 블로그 만들기

안녕하세요! 오늘은 GitHub Pages를 이용해서 레트로 터미널 느낌의 블로그를 만드는 방법을 소개하겠습니다.

## 사용한 기술

- **HTML5** - 기본 구조
- **CSS3** - 터미널 스타일링 및 애니메이션  
- **JavaScript** - 인터랙션
- **Google Fonts** - Source Code Pro 폰트

## 주요 특징

- 🖥️ 스캔라인 효과로 진짜 CRT 모니터 같은 느낌
- ⌨️ 깜빡이는 커서 애니메이션
- 💻 터미널 명령어 시뮬레이션
- 📱 반응형 디자인

## 구현 과정

### 1. HTML 구조 설계
터미널 창의 기본 구조를 만들고, 헤더와 바디 영역을 분리했습니다.

### 2. CSS 스타일링
```css
/* 스캔라인 효과 */
.terminal::before {
    background: linear-gradient(transparent 50%, #00ff0008 50%);
    animation: scanlines 0.1s linear infinite;
}
```

### 3. JavaScript 인터랙션
터미널의 실시간 명령어 시뮬레이션과 파일 탐색 기능을 구현했습니다.

## 결과물

이런 스타일의 블로그는 개발자들에게 특히 매력적으로 다가갈 수 있고, 포트폴리오 사이트로도 훌륭하게 활용할 수 있습니다.

## 향후 계획

- Jekyll 적용으로 정적 사이트 생성기 활용
- SEO 최적화
- 더 많은 터미널 명령어 추가

GitHub에서 전체 소스코드를 확인하실 수 있습니다! 