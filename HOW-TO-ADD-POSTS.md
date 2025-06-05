# 블로그 포스트 작성 가이드

## 📁 디렉토리 구조

블로그 포스트는 `_posts/` 디렉토리에 저장됩니다:

```
_posts/
├── 2024-11-10-css-animations.md
├── 2024-11-15-retro-terminal-blog.md
└── YYYY-MM-DD-새포스트제목.md
```

## 📝 새 블로그 포스트 작성하기

### 1. 파일 생성 위치
모든 블로그 포스트는 `_posts/` 디렉토리에 생성합니다:

```bash
_posts/YYYY-MM-DD-포스트제목.md
```

### 2. 파일명 규칙
- **필수 형식**: `YYYY-MM-DD-제목.md`
- **예시**: `2024-12-22-javascript-async-await.md`
- **규칙**: 
  - 날짜는 반드시 YYYY-MM-DD 형식
  - 제목은 영어로, 단어 사이는 하이픈(-) 사용
  - 소문자 사용 권장

### 3. Front Matter 설정

```yaml
---
title: "포스트 제목"
date: 2024-12-22 14:30:00 +0900
author: "hyuptree"
categories: [category1, category2]
tags: [tag1, tag2, tag3, tag4]
excerpt: "포스트 요약문. 검색 결과와 카드에 표시될 짧은 설명을 작성하세요."
---
```

#### Front Matter 필드 설명:
- **title**: 포스트 제목 (필수)
- **date**: 작성 날짜와 시간 (필수)
- **author**: 작성자 (선택사항, 기본값: hyuptree)
- **categories**: 대분류 카테고리 (최대 2개 권장)
- **tags**: 세부 태그 (3-5개 권장)
- **excerpt**: 포스트 요약문 (검색과 카드에 표시)

### 4. 카테고리 가이드

#### 추천 카테고리:
- `web-development` - 웹 개발
- `frontend` - 프론트엔드
- `backend` - 백엔드
- `data-engineering` - 데이터 엔지니어링
- `programming` - 프로그래밍 일반
- `tutorial` - 튜토리얼
- `review` - 도구/기술 리뷰
- `project` - 프로젝트 소개

#### 태그 예시:
- **언어/기술**: HTML, CSS, JavaScript, Python, Java, React, Node.js
- **도구**: VSCode, Git, Docker, AWS
- **개념**: async-await, REST-API, database, algorithm

## 📋 포스트 템플릿

```markdown
---
title: "포스트 제목"
date: 2024-12-22 14:30:00 +0900
author: "hyuptree"
categories: [web-development, frontend]
tags: [JavaScript, React, frontend, tutorial]
excerpt: "React 컴포넌트의 생명주기와 useEffect 훅을 이용한 효율적인 상태 관리 방법을 알아봅시다."
---

# 포스트 제목

## 개요
포스트의 배경과 목적을 간단히 설명합니다.

## 사용한 기술
- **JavaScript** - 메인 언어
- **React** - UI 라이브러리
- **Node.js** - 런타임 환경

## 주요 내용

### 1. 첫 번째 섹션
내용을 단계별로 설명합니다.

```javascript
// 코드 예시
const example = () => {
    console.log("Hello, World!");
};
```

### 2. 두 번째 섹션
상세한 구현 과정을 설명합니다.

## 구현 과정

### 단계 1: 환경 설정
```bash
npm install react
```

### 단계 2: 컴포넌트 작성
```jsx
function MyComponent() {
    return <div>Hello React!</div>;
}
```

## 결과물
최종 결과와 스크린샷을 포함합니다.

## 트러블슈팅
개발 과정에서 마주친 문제들과 해결 방법:

- **문제 1**: 에러 메시지
  - **해결**: 해결 방법 설명

## 향후 계획
- 개선할 점 1
- 추가할 기능 2

## 참고 자료
- [공식 문서](https://reactjs.org/)
- [참고 블로그](https://example.com)
```

## 🎯 작성 팁

### 글쓰기 가이드:
1. **제목**: 구체적이고 검색 친화적으로 작성
2. **서론**: 포스트의 목적과 배경을 명확히
3. **구조화**: 소제목으로 내용을 체계적으로 구성
4. **코드**: 문법 하이라이팅을 위해 언어 명시
5. **이미지**: 필요시 `/assets/images/` 에 저장 후 사용
6. **링크**: 외부 링크는 새 창에서 열리도록 설정

### SEO 최적화:
- **키워드**: 제목과 내용에 검색 키워드 포함
- **메타 설명**: excerpt를 활용한 검색 결과 최적화
- **태그**: 관련성 높은 태그 선택
- **내부 링크**: 다른 포스트로의 연결 고려

### 코드 하이라이팅:
```markdown
```javascript
// JavaScript 코드
const variable = "value";
```

```python
# Python 코드
def function():
    return "Hello"
```

```bash
# 터미널 명령어
npm install package-name
```
```

## 📱 이미지 추가하기

### 이미지 저장 위치:
```
assets/images/posts/YYYY-MM-DD-포스트제목/
├── screenshot1.png
├── diagram.jpg
└── result.gif
```

### 마크다운에서 이미지 사용:
```markdown
![이미지 설명](/assets/images/posts/2024-12-22-javascript-tutorial/screenshot1.png)
```

## 🔄 포스트 업데이트

기존 포스트를 수정할 때:
1. 파일명은 변경하지 않음
2. Front Matter의 `date`를 업데이트
3. 내용 수정 후 커밋

## 📋 체크리스트

포스트 발행 전 확인사항:
- [ ] 파일명이 날짜 형식을 따르는가?
- [ ] Front Matter가 모두 작성되었는가?
- [ ] 코드 블록에 언어가 명시되었는가?
- [ ] 이미지가 올바르게 표시되는가?
- [ ] 링크가 정상 작동하는가?
- [ ] 맞춤법과 문법을 확인했는가? 