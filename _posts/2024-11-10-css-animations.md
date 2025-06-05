---
title: "CSS 애니메이션으로 터미널 효과 구현하기"
date: 2024-11-10 14:20:00 +0900
author: "hyuptree"
categories: [웹개발, CSS]
tags: [CSS, 애니메이션, 터미널, 스캔라인, 효과]
excerpt: "CSS 애니메이션을 활용해서 진짜 터미널 같은 효과를 구현하는 방법을 알아보겠습니다. 스캔라인, 글로우, 깜빡이는 커서까지!"
---

# CSS 애니메이션으로 터미널 효과 구현하기

이번 포스트에서는 CSS 애니메이션을 활용해서 진짜 터미널 같은 효과를 구현하는 방법을 알아보겠습니다.

## 1. 스캔라인 효과

CRT 모니터의 주사선을 표현하기 위해 `linear-gradient`와 `animation`을 사용했습니다.

```css
.terminal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        transparent 50%, 
        rgba(0, 255, 0, 0.03) 50%
    );
    background-size: 100% 4px;
    animation: scanlines 0.1s linear infinite;
    pointer-events: none;
    z-index: 1000;
}

@keyframes scanlines {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
}
```

## 2. 깜빡이는 커서

`opacity`를 이용한 `blink` 애니메이션으로 터미널의 커서를 재현했습니다.

```css
.cursor {
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
```

## 3. 글로우 효과

`text-shadow`와 `box-shadow`를 활용해서 형광등 같은 글로우 효과를 추가했습니다.

```css
.terminal {
    color: #00ff00;
    text-shadow: 
        0 0 5px #00ff00,
        0 0 10px #00ff00,
        0 0 15px #00ff00;
    box-shadow: 
        0 0 20px rgba(0, 255, 0, 0.5),
        inset 0 0 20px rgba(0, 255, 0, 0.1);
}
```

## 4. 타이핑 효과

JavaScript와 CSS를 조합해서 타이핑 효과도 만들 수 있습니다.

```css
.typing {
    border-right: 2px solid #00ff00;
    animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
    white-space: nowrap;
    overflow: hidden;
}

@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}
```

## 5. 화면 곡률 효과

CRT 모니터의 둥근 화면을 표현하기 위한 왜곡 효과입니다.

```css
.terminal {
    border-radius: 10px;
    transform: perspective(1000px) rotateX(2deg);
}
```

## 결론

이런 작은 디테일들이 모여서 사용자에게 몰입감 있는 경험을 제공할 수 있습니다. 

- **스캔라인**: CRT 모니터의 물리적 특성 재현
- **글로우**: 형광 터미널의 느낌
- **커서**: 실제 터미널과 같은 UX
- **타이핑**: 실시간 입력 시뮬레이션

CSS만으로도 이렇게 풍부한 표현이 가능하다는 것이 놀랍지 않나요? 🚀 