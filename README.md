# 🖥️ hyuptree devlog

레트로 터미널 스타일의 개발 블로그입니다. Jekyll로 구축되어 GitHub Pages에서 정적 사이트로 호스팅됩니다.

## ✨ 특징

- 🖥️ **레트로 터미널 UI**: CRT 모니터 스타일의 디자인
- ⚡ **Jekyll 기반**: 정적 사이트 생성기로 빠른 로딩
- 📱 **반응형 디자인**: 모든 기기에서 최적화된 사용 경험
- 🔍 **SEO 최적화**: 검색 엔진 친화적인 구조
- 📝 **마크다운 지원**: 쉬운 포스트 작성

## 🚀 로컬 개발

### 필요 조건
- Ruby (2.5.0 이상)
- Bundler

### 설치 및 실행
```bash
# 저장소 클론
git clone https://github.com/HyupTree/HyupTree.github.io.git
cd HyupTree.github.io

# 종속성 설치
bundle install

# 로컬 서버 실행
bundle exec jekyll serve --livereload

# 브라우저에서 확인
open http://localhost:4000
```

## 📁 디렉토리 구조

```
├── _config.yml          # Jekyll 설정
├── _layouts/            # 페이지 템플릿
│   ├── default.html     # 기본 레이아웃
│   ├── post.html        # 블로그 포스트 레이아웃
│   └── til.html         # TIL 레이아웃
├── _posts/              # 블로그 포스트
├── _til/                # TIL (Today I Learned)
├── assets/              # 정적 자산
│   ├── css/
│   └── js/
├── about.md             # About 페이지
├── posts.html           # 포스트 목록
├── til.html             # TIL 목록
├── projects.md          # 프로젝트 페이지
└── contact.md           # 연락처 페이지
```

## ✍️ 콘텐츠 작성

### 새 블로그 포스트 작성
`_posts/` 디렉토리에 `YYYY-MM-DD-title.md` 형식으로 파일 생성:

```yaml
---
layout: post
title: "포스트 제목"
date: 2024-12-18 10:00:00 +0900
author: "hyuptree"
categories: [카테고리1, 카테고리2]
tags: [태그1, 태그2]
excerpt: "포스트 요약 설명"
---

포스트 내용을 마크다운으로 작성하세요.
```

### 새 TIL 작성
`_til/` 디렉토리에 `YYYY-MM-DD-title.md` 형식으로 파일 생성:

```yaml
---
layout: til
title: "TIL 제목"
date: 2024-12-18 09:00:00 +0900
subject: "주제"
tags: [태그1, 태그2]
excerpt: "TIL 요약"
---

TIL 내용을 마크다운으로 작성하세요.
```

## 🛠️ 기술 스택

- **Jekyll**: 정적 사이트 생성기
- **GitHub Pages**: 호스팅
- **HTML5 + CSS3**: 터미널 UI 구현
- **JavaScript**: 기본 인터랙션
- **Source Code Pro**: 프로그래밍 폰트

## 📄 라이선스

MIT License

## 📧 연락처

- Email: hyuptree@gmail.com
- GitHub: [@hyuptree](https://github.com/hyuptree) 