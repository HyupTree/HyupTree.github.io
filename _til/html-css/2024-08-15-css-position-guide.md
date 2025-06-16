---
layout: til
title: "CSS Position 완벽 가이드: Relative, Absolute, Fixed"
date: 2024-08-15
category: html-css
tags: [css, position, absolute, relative, fixed, layout]
---

# CSS Position 완벽 가이드: Relative, Absolute, Fixed

## 오늘 배운 내용
CSS의 `position: relative`, `absolute`, `fixed`의 차이점과 실제 동작 방식을 시각적 예시를 통해 완벽히 이해했습니다.

## 핵심 개념

### Position Relative
- **기준점**: 자기 자신의 원래 위치
- **문서 흐름**: 유지됨 (다른 요소들이 영향받지 않음)
- **사용 목적**: 약간의 위치 조정 + absolute 요소의 기준점 역할

### Position Absolute  
- **기준점**: 가장 가까운 `position: relative` 부모 요소
- **문서 흐름**: 벗어남 (다른 요소들이 이 요소를 무시)
- **사용 목적**: 정확한 위치 배치

### Position Fixed
- **기준점**: 브라우저 뷰포트 (화면 전체)
- **문서 흐름**: 벗어남 (absolute와 동일)
- **특징**: 스크롤해도 위치가 고정됨
- **사용 목적**: 네비게이션 바, 플로팅 버튼, 팝업 등

## 시각적 예시

### 1️⃣ 기본 상황 (Relative 부모 + Absolute 자식)

![CSS Position 예시 1 - 오른쪽 아래 배치](/assets/images/til/position-example-1.png)

```css
.parent {
  position: relative;
  width: 200px;
  height: 150px;
  background-color: #f4d03f;
}

.child {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: #138d75;
}
```
**결과**: 부모 박스 오른쪽 아래 모서리에 자식 요소가 정확히 배치됩니다.

### 2️⃣ 다른 위치로 배치

![CSS Position 예시 2 - 왼쪽 위 배치](/assets/images/til/position-example-2.png)

```css
.parent {
  position: relative;
  width: 200px;
  height: 150px;
  background-color: #f4d03f;
}

.child {
  position: absolute;
  top: -10px;
  left: 0;
  width: 50px;
  height: 50px;
  background-color: #138d75;
}
```
**결과**: 부모 박스 왼쪽에서 위로 10px 올라간 위치에 자식 요소가 배치됩니다.

### 3️⃣ 부모에 relative가 없는 경우 (body 기준 배치)

![CSS Position 예시 3 - 부모 영역 밖 배치](/assets/images/til/position-example-3.png)

```css
.parent {
  /* position: relative; 없음! */
  width: 200px;
  height: 150px;
  background-color: #f4d03f;
}

.child {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-color: #138d75;
}
```
**결과**: 부모 div에 `position: relative`가 없으므로, absolute 요소가 **body를 기준으로 배치**됩니다. 그래서 화면 왼쪽 위 모서리에 위치하게 됩니다.

### 4️⃣ Position Fixed (뷰포트 기준 고정)

**실시간 데모 - 아래 박스 안에서 스크롤해보세요!**

<div style="border: 2px solid #3498db; border-radius: 8px; overflow: hidden; margin: 20px 0;">
<iframe src="/assets/examples/position-fixed-demo.html" 
        width="100%" 
        height="500px" 
        frameborder="0"
        style="display: block;">
</iframe>
</div>

*↑ 데모 박스 안에서 스크롤하면서 Fixed 요소들이 어떻게 동작하는지 확인해보세요!*

```css
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #2c3e50;
  color: white;
  z-index: 1000;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #e74c3c;
  border-radius: 50%;
  z-index: 999;
}
```
**결과**: 
- **상단 헤더**: 화면 맨 위에 고정되어 스크롤해도 항상 보임
- **플로팅 버튼**: 화면 오른쪽 아래에 고정되어 스크롤과 무관하게 항상 그 자리에 있음

## 핵심 포인트

### 꼭 기억할 것
- **Absolute는 항상 Relative 부모가 필요**
- **Relative 부모가 없으면 body 기준으로 배치됨** ⚠️ **가장 흔한 실수!**
- **Fixed는 뷰포트(브라우저 창) 기준으로 배치**
- **Fixed는 스크롤과 무관하게 항상 같은 위치에 고정**
- **top, left, bottom, right로 정확한 위치 지정 가능**
- **음수 값으로 부모 영역 밖으로도 배치 가능**

### 주의사항
- `position: absolute`와 `fixed`는 문서 흐름에서 완전히 벗어남
- 다른 요소들이 absolute/fixed 요소를 "없는 것"처럼 취급
- **부모의 `position: relative` 설정을 깜빡하기 쉬움** (세 번째 예시 참고)
- Relative 부모가 없으면 예상과 다른 위치에 배치될 수 있음
- **Fixed 요소는 z-index 관리가 중요** (다른 요소들과 겹칠 수 있음)

## 실무 활용 사례

### Relative + Absolute 조합
1. **툴팁, 드롭다운**: 버튼 기준으로 정확한 위치에 배치
2. **배지, 알림**: 아이콘 위에 작은 숫자 표시
3. **이미지 캡션**: 이미지 위에 텍스트 오버레이
4. **카드 내 액션 버튼**: 카드 모서리에 편집/삭제 버튼

### Fixed 활용
1. **상단 네비게이션**: 스크롤해도 항상 보이는 메뉴
2. **플로팅 액션 버튼**: 채팅, 위로가기 등
3. **사이드바**: 고정된 메뉴나 광고
4. **모달/팝업**: 화면 전체를 덮는 오버레이
5. **알림 바**: 상단이나 하단 고정 메시지

## 느낀 점
처음에는 absolute와 relative의 차이가 헷갈렸지만, 시각적 예시를 통해 확실히 이해했습니다. 특히 "부모는 relative, 자식은 absolute"라는 패턴이 핵심이라는 것을 깨달았습니다. Fixed는 네비게이션이나 플로팅 버튼에 자주 사용되는데, 뷰포트 기준이라는 점이 absolute와의 가장 큰 차이점이었습니다.

## 참고 자료
- [MDN - CSS Position](https://developer.mozilla.org/ko/docs/Web/CSS/position)
- [CSS-Tricks - Absolute Positioning](https://css-tricks.com/absolute-positioning-inside-relative-positioning/) 