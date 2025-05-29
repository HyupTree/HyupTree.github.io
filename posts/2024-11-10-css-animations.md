---
title: "CSS 애니메이션으로 터미널 효과 구현하기"
date: "2024-11-10"
author: "hyuptree"
tags: ["CSS", "Animation", "Terminal"]
---

# CSS로 터미널 효과 만들기

이번 포스트에서는 CSS 애니메이션을 활용해서 진짜 터미널 같은 효과를 구현하는 방법을 알아보겠습니다.

## 1. 스캔라인 효과

CRT 모니터의 주사선을 표현하기 위해 linear-gradient와 animation을 사용했습니다.

```css
@keyframes scanlines {
    0% { background-position: 0 0; }
    100% { background-position: 0 20px; }
}
```

## 2. 깜빡이는 커서

opacity를 이용한 blink 애니메이션으로 터미널의 커서를 재현했습니다.

```css
@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
```

## 3. 글로우 효과

text-shadow와 box-shadow를 활용해서 형광등 같은 글로우 효과를 추가했습니다.

이런 작은 디테일들이 모여서 사용자에게 몰입감 있는 경험을 제공할 수 있습니다. 