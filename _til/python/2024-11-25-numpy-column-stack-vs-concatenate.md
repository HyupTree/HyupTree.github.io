---
layout: til
title: "NumPy column_stack vs concatenate - 배열 결합 방법의 차이"
date: 2024-11-25
category: python
tags: [numpy, python, array, column_stack, concatenate, data-manipulation]
---

## 🔗 NumPy 배열 결합하기: column_stack vs concatenate

NumPy에서 배열을 결합하는 방법은 여러 가지가 있습니다. 그 중에서도 `column_stack()`과 `concatenate()`는 자주 사용되지만, 결과가 다르게 나타나는 경우가 있어 혼동하기 쉽습니다.

![NumPy column_stack vs concatenate 차이점](/assets/images/til/numpy-column-stack-vs-concatenate-diagram.png)

*▲ column_stack()과 concatenate()의 동작 방식 비교*

## 📊 기본 개념

### column_stack()
- **목적**: 1차원 배열들을 **열(column)로 쌓아서** 2차원 배열 생성
- **특징**: 1차원 배열을 자동으로 열 벡터로 변환

### concatenate()
- **목적**: 배열들을 **지정된 축(axis)을 따라** 연결
- **특징**: 배열의 차원을 그대로 유지하며 연결

## 🛠️ 실제 예시로 이해하기

```python
import numpy as np

# 두 개의 1차원 배열 생성
arr1 = np.array([1, 1, 1])
arr2 = np.array([0, 0, 0])

print("원본 배열들:")
print("arr1:", arr1, "- 형태:", arr1.shape)
print("arr2:", arr2, "- 형태:", arr2.shape)
```

**출력 결과:**
```
원본 배열들:
arr1: [1 1 1] - 형태: (3,)
arr2: [0 0 0] - 형태: (3,)
```

### column_stack() 사용

```python
# column_stack 사용
result_column = np.column_stack((arr1, arr2))

print("\ncolumn_stack 결과:")
print(result_column)
print("형태:", result_column.shape)
```

**출력 결과:**
```
column_stack 결과:
[[1 0]
 [1 0]
 [1 0]]
형태: (3, 2)
```

### concatenate() 사용

```python
# concatenate 사용 (기본 axis=0)
result_concat = np.concatenate((arr1, arr2))

print("\nconcatenate 결과:")
print(result_concat)
print("형태:", result_concat.shape)
```

**출력 결과:**
```
concatenate 결과:
[1 1 1 0 0 0]
형태: (6,)
```

## 🔍 핵심 차이점 분석

위의 다이어그램에서 볼 수 있듯이, 두 함수는 완전히 다른 방식으로 배열을 결합합니다:

<div class="comparison-table-wrapper">
  <table class="terminal-comparison-table">
    <thead>
      <tr>
        <th class="table-header-category">구분</th>
        <th class="table-header-supervised">column_stack()</th>
        <th class="table-header-unsupervised">concatenate()</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table-category">입력 처리</td>
        <td class="table-supervised">1D → 2D 자동 변환</td>
        <td class="table-unsupervised">원본 차원 유지</td>
      </tr>
      <tr>
        <td class="table-category">결합 방향</td>
        <td class="table-supervised">항상 열 방향</td>
        <td class="table-unsupervised">축 지정 가능</td>
      </tr>
      <tr>
        <td class="table-category">결과 형태</td>
        <td class="table-supervised">(n, m) 2D 배열</td>
        <td class="table-unsupervised">입력에 따라 다름</td>
      </tr>
      <tr>
        <td class="table-category">사용 목적</td>
        <td class="table-supervised">열 벡터 생성</td>
        <td class="table-unsupervised">일반적인 배열 연결</td>
      </tr>
    </tbody>
  </table>
</div>



## 💡 언제 어떤 것을 사용할까?

### column_stack() 사용 시기
```python
# 데이터 분석에서 특성(feature) 결합
ages = np.array([25, 30, 35])
salaries = np.array([50000, 60000, 70000])

# 각 특성을 열로 만들어 데이터셋 생성
dataset = np.column_stack((ages, salaries))
print("데이터셋:")
print(dataset)
print("형태:", dataset.shape)
```

**출력 결과:**
```
데이터셋:
[[   25 50000]
 [   30 60000]
 [   35 70000]]
형태: (3, 2)
```

### concatenate() 사용 시기
```python
# 같은 종류의 데이터를 이어붙이기
morning_temps = np.array([18, 19, 20])
afternoon_temps = np.array([25, 27, 26])

# 하루 전체 온도 데이터
daily_temps = np.concatenate((morning_temps, afternoon_temps))
print("하루 온도 데이터:")
print(daily_temps)
print("형태:", daily_temps.shape)
```

**출력 결과:**
```
하루 온도 데이터:
[18 19 20 25 27 26]
형태: (6,)
```

## 🎯 고급 활용법

### concatenate()의 axis 매개변수

```python
# 2차원 배열로 변환 후 concatenate 사용
arr1_2d = arr1.reshape(-1, 1)  # (3, 1) 형태로 변환
arr2_2d = arr2.reshape(-1, 1)  # (3, 1) 형태로 변환

print("2D 배열로 변환:")
print("arr1_2d 형태:", arr1_2d.shape)
print("arr2_2d 형태:", arr2_2d.shape)

# axis=1로 열 방향 연결 (column_stack과 동일한 결과)
result_concat_axis1 = np.concatenate((arr1_2d, arr2_2d), axis=1)
print("\nconcatenate(axis=1) 결과:")
print(result_concat_axis1)
print("형태:", result_concat_axis1.shape)

# column_stack과 결과 비교
print("\ncolumn_stack과 동일한가?", np.array_equal(result_column, result_concat_axis1))
```

**출력 결과:**
```
2D 배열로 변환:
arr1_2d 형태: (3, 1)
arr2_2d 형태: (3, 1)

concatenate(axis=1) 결과:
[[1 0]
 [1 0]
 [1 0]]
형태: (3, 2)

column_stack과 동일한가? True
```

## 🚀 실무 활용 예시

### 머신러닝 데이터 전처리
```python
# 여러 특성을 하나의 데이터셋으로 결합
height = np.array([170, 175, 180, 165])
weight = np.array([65, 70, 75, 60])
age = np.array([25, 30, 35, 28])

# column_stack으로 특성 행렬 생성
features = np.column_stack((height, weight, age))
print("특성 행렬:")
print(features)
print("형태:", features.shape)

# 각 특성의 이름
feature_names = ['키(cm)', '몸무게(kg)', '나이']
print("\n특성 설명:")
for i, name in enumerate(feature_names):
    print(f"열 {i}: {name}")
```

**출력 결과:**
```
특성 행렬:
[[170  65  25]
 [175  70  30]
 [180  75  35]
 [165  60  28]]
형태: (4, 3)

특성 설명:
열 0: 키(cm)
열 1: 몸무게(kg)
열 2: 나이
```

## 📝 핵심 정리

1. **column_stack()**: 1차원 배열들을 열로 쌓아 2차원 배열 생성
   - 데이터 분석에서 특성 결합 시 유용
   - 자동으로 차원 변환 수행

2. **concatenate()**: 배열을 지정된 축을 따라 연결
   - 더 일반적이고 유연한 배열 연결 방법
   - axis 매개변수로 연결 방향 제어

3. **선택 기준**:
   - 열 벡터 생성이 목적 → `column_stack()`
   - 일반적인 배열 연결 → `concatenate()`

## 🔗 관련 함수들
- `np.hstack()`: 수평(가로) 방향 연결
- `np.vstack()`: 수직(세로) 방향 연결  
- `np.row_stack()`: 행 방향으로 쌓기 (vstack과 동일)
- `np.dstack()`: 깊이(depth) 방향 연결

이제 NumPy에서 배열을 결합할 때 상황에 맞는 적절한 함수를 선택할 수 있을 것입니다! 🎉 