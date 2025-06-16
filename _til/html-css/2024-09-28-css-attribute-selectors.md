---
layout: til
title: "CSS 속성 선택자 완전 가이드"
date: 2024-09-28
category: html-css
tags: [CSS, 선택자, 속성선택자, 스타일링]
---

CSS 속성 선택자는 HTML 요소의 특정 속성(attribute)을 기준으로 요소를 선택할 수 있는 강력한 도구입니다. 이번 글에서는 7가지 속성 선택자를 상세히 알아보겠습니다.

## 1. [attr] - 특정 속성을 가진 요소 선택

특정 속성이 존재하는 모든 요소를 선택합니다.

```css
/* data-theme 속성을 가진 모든 요소 */
[data-theme] {
  transition: all 0.3s ease;
}

/* required 속성을 가진 모든 input 요소 */
input[required] {
  border-left: 3px solid #e74c3c;
}
```

```html
<div data-theme="dark">다크 테마</div>
<input type="text" required placeholder="필수 입력">
```

## 2. [attr=value] - 정확한 속성값 매칭

속성값이 정확히 일치하는 요소를 선택합니다.

```css
/* type이 정확히 "button"인 input 요소 */
input[type="button"] {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}

/* data-status가 정확히 "active"인 요소 */
[data-status="active"] {
  background-color: #2ecc71;
}
```

```html
<input type="button" value="클릭하세요">
<div data-status="active">활성 상태</div>
<div data-status="inactive">비활성 상태</div>
```

## 3. [attr~=value] - 공백으로 구분된 값 중 매칭

속성값이 공백으로 구분된 여러 값을 가질 때, 그 중 하나가 정확히 일치하는 요소를 선택합니다.

```css
/* class 속성에 "highlight"가 포함된 요소 */
[class~="highlight"] {
  background-color: #f39c12;
  padding: 5px;
}

/* data-tags에 "javascript"가 포함된 요소 */
[data-tags~="javascript"] {
  border-left: 4px solid #f7df1e;
}
```

```html
<p class="text highlight important">강조된 텍스트</p>
<div data-tags="javascript react frontend">JavaScript 관련 콘텐츠</div>
<div data-tags="python backend">Python 관련 콘텐츠</div>
```

## 4. [attr|=value] - 언어 코드 매칭

속성값이 정확히 value이거나 `value-`로 시작하는 요소를 선택합니다. 주로 언어 코드에 사용됩니다.

```css
/* lang 속성이 "en" 또는 "en-"로 시작하는 요소 */
[lang|="en"] {
  font-family: "Arial", sans-serif;
}

/* lang 속성이 "ko" 또는 "ko-"로 시작하는 요소 */
[lang|="ko"] {
  font-family: "Noto Sans KR", sans-serif;
}
```

```html
<p lang="en">English text</p>
<p lang="en-US">American English text</p>
<p lang="en-GB">British English text</p>
<p lang="ko">한국어 텍스트</p>
<p lang="ko-KR">한국어 텍스트</p>
```

## 5. [attr^=value] - 접두사 매칭

속성값이 특정 문자열로 시작하는 요소를 선택합니다.

```css
/* href가 "https://"로 시작하는 링크 */
a[href^="https://"] {
  color: #27ae60;
}

/* href가 "mailto:"로 시작하는 링크 */
a[href^="mailto:"] {
  color: #e74c3c;
}

/* class가 "btn-"로 시작하는 요소 */
[class^="btn-"] {
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
}
```

```html
<a href="https://example.com">외부 링크</a>
<a href="mailto:contact@example.com">이메일 링크</a>
<button class="btn-primary">Primary 버튼</button>
<button class="btn-secondary">Secondary 버튼</button>
```

## 6. [attr$=value] - 접미사 매칭

속성값이 특정 문자열로 끝나는 요소를 선택합니다.

```css
/* href가 ".pdf"로 끝나는 링크 */
a[href$=".pdf"] {
  background-image: url('pdf-icon.png');
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 20px;
}

/* src가 ".jpg"로 끝나는 이미지 */
img[src$=".jpg"] {
  border: 2px solid #95a5a6;
}

/* class가 "-icon"으로 끝나는 요소 */
[class$="-icon"] {
  display: inline-block;
  width: 16px;
  height: 16px;
}
```

```html
<a href="document.pdf">PDF 파일 다운로드</a>
<img src="photo.jpg" alt="JPEG 이미지">
<span class="download-icon"></span>
<span class="search-icon"></span>
```

## 7. [attr*=value] - 부분 문자열 매칭

속성값에 특정 문자열이 포함된 요소를 선택합니다.

```css
/* href에 "github"이 포함된 링크 */
a[href*="github"] {
  color: #333;
  font-weight: bold;
}

/* alt 텍스트에 "logo"가 포함된 이미지 */
img[alt*="logo"] {
  max-width: 200px;
}

/* class에 "card"가 포함된 요소 */
[class*="card"] {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 16px;
}
```

```html
<a href="https://github.com/username">GitHub 프로필</a>
<img src="company-logo.png" alt="회사 로고">
<div class="product-card">제품 카드</div>
<div class="user-card">사용자 카드</div>
```

## 실전 활용 예제

### 폼 요소 스타일링
```css
/* 필수 필드 표시 */
input[required], select[required], textarea[required] {
  border-left: 3px solid #e74c3c;
}

/* 읽기 전용 필드 */
input[readonly] {
  background-color: #ecf0f1;
  cursor: not-allowed;
}

/* 비활성화된 필드 */
input[disabled] {
  opacity: 0.6;
  background-color: #bdc3c7;
}
```

### 파일 타입별 아이콘
```css
/* 다양한 파일 타입에 대한 아이콘 */
a[href$=".pdf"]::before { content: "📄"; }
a[href$=".doc"]::before, 
a[href$=".docx"]::before { content: "📝"; }
a[href$=".xls"]::before, 
a[href$=".xlsx"]::before { content: "📊"; }
a[href$=".zip"]::before, 
a[href$=".rar"]::before { content: "🗜️"; }
```

### 외부 링크 표시
```css
/* 외부 링크에 아이콘 추가 */
a[href^="http"]:not([href*="mysite.com"])::after {
  content: " 🔗";
  font-size: 0.8em;
}
```


## 마무리

CSS 속성 선택자는 HTML의 정밀한 스타일링을 가능하게 합니다. 특히 JavaScript 없이도 상태에 따른 스타일링이나 콘텐츠 타입별 차별화된 디자인을 구현할 수 있어 매우 유용합니다.

클래스나 ID에 의존하지 않고도 HTML의 자연스러운 속성을 활용할 수 있어, 더 깔끔하고 유지보수하기 쉬운 CSS 코드를 작성할 수 있습니다. 