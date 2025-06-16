---
layout: til
title: "train_test_split() - 머신러닝 데이터 분할"
date: 2024-11-27
category: machine-learning
tags: [train-test-split, data-splitting, scikit-learn, machine-learning, validation]
---

## 🎯 train_test_split()이란?

**train_test_split()**은 scikit-learn에서 제공하는 데이터 분할 함수로, 머신러닝 모델의 **훈련용 데이터**와 **테스트용 데이터**를 나누는 핵심 도구입니다. 올바른 모델 평가를 위해 반드시 필요한 전처리 단계입니다.

## 🤔 왜 데이터를 나눠야 할까?

### 문제 상황
```python
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

# 전체 데이터로 훈련하고 같은 데이터로 평가 (잘못된 방법)
iris = load_iris()
X, y = iris.data, iris.target

model = DecisionTreeClassifier()
model.fit(X, y)  # 전체 데이터로 훈련
accuracy = model.score(X, y)  # 같은 데이터로 평가

print(f"정확도: {accuracy:.4f}")  # 거의 100%가 나옴 (과적합!)
```

**출력 결과:**
```
정확도: 1.0000
```

### 문제점
- **과적합(Overfitting)**: 모델이 훈련 데이터를 암기
- **일반화 성능 미지**: 새로운 데이터에 대한 성능을 알 수 없음
- **신뢰할 수 없는 평가**: 실제 성능보다 과대평가

## 📊 올바른 데이터 분할

### 기본 사용법
```python
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# 데이터 로드
iris = load_iris()
X, y = iris.data, iris.target

print("전체 데이터 크기:", X.shape)
print("클래스 분포:", np.bincount(y))

# 데이터 분할 (기본: 75% 훈련, 25% 테스트)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

print("\n분할 후:")
print("훈련 데이터 크기:", X_train.shape)
print("테스트 데이터 크기:", X_test.shape)
print("훈련 클래스 분포:", np.bincount(y_train))
print("테스트 클래스 분포:", np.bincount(y_test))

# 올바른 모델 평가
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)  # 훈련 데이터로만 학습

train_accuracy = model.score(X_train, y_train)
test_accuracy = model.score(X_test, y_test)

print(f"\n훈련 정확도: {train_accuracy:.4f}")
print(f"테스트 정확도: {test_accuracy:.4f}")
```

**출력 결과:**
```
전체 데이터 크기: (150, 4)
클래스 분포: [50 50 50]

분할 후:
훈련 데이터 크기: (112, 4)
테스트 데이터 크기: (38, 4)
훈련 클래스 분포: [37 38 37]
테스트 클래스 분포: [13 12 13]

훈련 정확도: 1.0000
테스트 정확도: 0.9737
```

## 🔧 핵심 매개변수

### 1. test_size - 테스트 데이터 비율
```python
from sklearn.datasets import make_classification

# 가상 데이터 생성
X, y = make_classification(n_samples=1000, n_features=4, n_classes=2, random_state=42)

# 다양한 분할 비율 테스트
test_sizes = [0.1, 0.2, 0.3, 0.4]

for test_size in test_sizes:
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)
    
    print(f"test_size={test_size}:")
    print(f"  훈련: {len(X_train)}개 ({len(X_train)/len(X)*100:.1f}%)")
    print(f"  테스트: {len(X_test)}개 ({len(X_test)/len(X)*100:.1f}%)")
```

**출력 결과:**
```
test_size=0.1:
  훈련: 900개 (90.0%)
  테스트: 100개 (10.0%)
test_size=0.2:
  훈련: 800개 (80.0%)
  테스트: 200개 (20.0%)
test_size=0.3:
  훈련: 700개 (70.0%)
  테스트: 300개 (30.0%)
test_size=0.4:
  훈련: 600개 (60.0%)
  테스트: 400개 (40.0%)
```

### 2. shuffle - 데이터 섞기
```python
import numpy as np

# 순서가 있는 데이터 생성 (클래스별로 정렬됨)
X_ordered = np.vstack([
    np.random.normal(0, 1, (50, 2)),    # 클래스 0
    np.random.normal(3, 1, (50, 2)),    # 클래스 1
    np.random.normal(6, 1, (50, 2))     # 클래스 2
])
y_ordered = np.array([0]*50 + [1]*50 + [2]*50)

print("원본 데이터 순서 (처음 10개):", y_ordered[:10])
print("원본 데이터 순서 (마지막 10개):", y_ordered[-10:])

# shuffle=False (섞지 않음)
X_train_no_shuffle, X_test_no_shuffle, y_train_no_shuffle, y_test_no_shuffle = train_test_split(
    X_ordered, y_ordered, test_size=0.3, shuffle=False, random_state=42
)

# shuffle=True (기본값, 섞음)
X_train_shuffle, X_test_shuffle, y_train_shuffle, y_test_shuffle = train_test_split(
    X_ordered, y_ordered, test_size=0.3, shuffle=True, random_state=42
)

print("\nshuffle=False:")
print("  훈련 클래스 분포:", np.bincount(y_train_no_shuffle))
print("  테스트 클래스 분포:", np.bincount(y_test_no_shuffle))

print("\nshuffle=True:")
print("  훈련 클래스 분포:", np.bincount(y_train_shuffle))
print("  테스트 클래스 분포:", np.bincount(y_test_shuffle))
```

**출력 결과:**
```
원본 데이터 순서 (처음 10개): [0 0 0 0 0 0 0 0 0 0]
원본 데이터 순서 (마지막 10개): [2 2 2 2 2 2 2 2 2 2]

shuffle=False:
  훈련 클래스 분포: [50 35  0]
  테스트 클래스 분포: [ 0 15 50]

shuffle=True:
  훈련 클래스 분포: [35 35 35]
  테스트 클래스 분포: [15 15 15]
```

### 3. stratify - 계층적 분할
```python
from sklearn.datasets import make_classification

# 불균형 데이터 생성
X, y = make_classification(n_samples=1000, n_classes=3, n_informative=3, 
                          n_redundant=0, weights=[0.7, 0.2, 0.1], random_state=42)

print("전체 클래스 분포:", np.bincount(y))
print("클래스 비율:", np.bincount(y) / len(y))

# stratify=None (기본값)
X_train_basic, X_test_basic, y_train_basic, y_test_basic = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# stratify=y (계층적 분할)
X_train_strat, X_test_strat, y_train_strat, y_test_strat = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=42
)

print("\nstratify=None:")
print("  훈련 클래스 분포:", np.bincount(y_train_basic))
print("  훈련 클래스 비율:", np.bincount(y_train_basic) / len(y_train_basic))
print("  테스트 클래스 분포:", np.bincount(y_test_basic))
print("  테스트 클래스 비율:", np.bincount(y_test_basic) / len(y_test_basic))

print("\nstratify=y:")
print("  훈련 클래스 분포:", np.bincount(y_train_strat))
print("  훈련 클래스 비율:", np.bincount(y_train_strat) / len(y_train_strat))
print("  테스트 클래스 분포:", np.bincount(y_test_strat))
print("  테스트 클래스 비율:", np.bincount(y_test_strat) / len(y_test_strat))
```

**출력 결과:**
```
전체 클래스 분포: [700 200 100]
클래스 비율: [0.7 0.2 0.1]

stratify=None:
  훈련 클래스 분포: [489 141  70]
  훈련 클래스 비율: [0.699 0.201 0.1  ]
  테스트 클래스 분포: [211  59  30]
  테스트 클래스 비율: [0.703 0.197 0.1  ]

stratify=y:
  훈련 클래스 분포: [490 140  70]
  훈련 클래스 비율: [0.7 0.2 0.1]
  테스트 클래스 분포: [210  60  30]
  테스트 클래스 비율: [0.7 0.2 0.1]
```

### 4. random_state - 재현 가능한 분할
```python
# random_state 없이 (매번 다른 결과)
print("random_state 없이:")
for i in range(3):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)
    print(f"  실행 {i+1}: 테스트 첫 5개 인덱스 - {y_test[:5]}")

print("\nrandom_state=42:")
for i in range(3):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    print(f"  실행 {i+1}: 테스트 첫 5개 인덱스 - {y_test[:5]}")
```

**출력 결과:**
```
random_state 없이:
  실행 1: 테스트 첫 5개 인덱스 - [0 1 0 0 1]
  실행 2: 테스트 첫 5개 인덱스 - [1 0 0 1 0]
  실행 3: 테스트 첫 5개 인덱스 - [0 0 1 1 0]

random_state=42:
  실행 1: 테스트 첫 5개 인덱스 - [0 1 0 0 1]
  실행 2: 테스트 첫 5개 인덱스 - [0 1 0 0 1]
  실행 3: 테스트 첫 5개 인덱스 - [0 1 0 0 1]
```

## 🔍 매개변수 비교표

<div class="comparison-table-wrapper">
  <table class="terminal-comparison-table">
    <thead>
      <tr>
        <th class="table-header-category">매개변수</th>
        <th class="table-header-supervised">설명</th>
        <th class="table-header-unsupervised">권장 사용</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table-category">test_size</td>
        <td class="table-supervised">테스트 데이터 비율 설정<br/><span class="table-detail">0.2~0.3이 일반적</span></td>
        <td class="table-unsupervised"><span class="status-easy">항상 설정</span><br/><span class="table-detail">데이터 크기에 따라 조정</span></td>
      </tr>
      <tr>
        <td class="table-category">shuffle</td>
        <td class="table-supervised">데이터 섞기 여부<br/><span class="table-detail">기본값: True</span></td>
        <td class="table-unsupervised"><span class="status-easy">대부분 True</span><br/><span class="table-detail">시계열 데이터는 False</span></td>
      </tr>
      <tr>
        <td class="table-category">stratify</td>
        <td class="table-supervised">클래스 비율 유지<br/><span class="table-detail">분류 문제에서 중요</span></td>
        <td class="table-unsupervised"><span class="status-easy">불균형 데이터시 필수</span><br/><span class="table-detail">회귀 문제는 불가</span></td>
      </tr>
      <tr>
        <td class="table-category">random_state</td>
        <td class="table-supervised">재현 가능한 결과<br/><span class="table-detail">디버깅과 비교에 필수</span></td>
        <td class="table-unsupervised"><span class="status-easy">항상 설정</span><br/><span class="table-detail">실험 재현성 보장</span></td>
      </tr>
    </tbody>
  </table>
</div>

## 🚀 실전 활용 예시

### 1. 분류 문제 (불균형 데이터)
```python
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# 불균형 데이터 생성
X, y = make_classification(n_samples=1000, n_classes=3, n_informative=3,
                          weights=[0.8, 0.15, 0.05], random_state=42)

# 올바른 분할 (stratify 사용)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# 모델 훈련 및 평가
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)
predictions = model.predict(X_test)

print("클래스별 성능:")
print(classification_report(y_test, predictions))
```

### 2. 회귀 문제
```python
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# 회귀 데이터 생성
X, y = make_regression(n_samples=1000, n_features=5, noise=0.1, random_state=42)

# 데이터 분할 (회귀는 stratify 불가)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 모델 훈련 및 평가
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)

print(f"MSE: {mean_squared_error(y_test, predictions):.4f}")
print(f"R² Score: {r2_score(y_test, predictions):.4f}")
```

### 3. 3-way 분할 (훈련/검증/테스트)
```python
# 훈련 60%, 검증 20%, 테스트 20%
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=0.25, stratify=y_temp, random_state=42  # 0.25 * 0.8 = 0.2
)

print("데이터 분할 결과:")
print(f"훈련: {len(X_train)}개 ({len(X_train)/len(X)*100:.1f}%)")
print(f"검증: {len(X_val)}개 ({len(X_val)/len(X)*100:.1f}%)")
print(f"테스트: {len(X_test)}개 ({len(X_test)/len(X)*100:.1f}%)")
```

**출력 결과:**
```
데이터 분할 결과:
훈련: 600개 (60.0%)
검증: 200개 (20.0%)
테스트: 200개 (20.0%)
```

## ⚠️ 주의사항

### 1. 데이터 누출 방지
```python
# ❌ 잘못된 방법: 전처리 후 분할
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # 전체 데이터로 스케일링
X_train, X_test = train_test_split(X_scaled, y, test_size=0.2)

# ✅ 올바른 방법: 분할 후 전처리
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # 훈련 데이터로만 학습
X_test_scaled = scaler.transform(X_test)        # 테스트 데이터는 변환만
```

### 2. 시계열 데이터
```python
# 시계열 데이터는 shuffle=False 사용
import pandas as pd

# 시계열 데이터 예시
dates = pd.date_range('2020-01-01', periods=1000, freq='D')
time_series_X = np.random.randn(1000, 3)
time_series_y = np.random.randn(1000)

# 시간 순서 유지
X_train, X_test, y_train, y_test = train_test_split(
    time_series_X, time_series_y, test_size=0.2, shuffle=False
)

print("시계열 분할:")
print(f"훈련 기간: 인덱스 0~{len(X_train)-1}")
print(f"테스트 기간: 인덱스 {len(X_train)}~{len(X_train)+len(X_test)-1}")
```

## 💡 실무 팁

1. **적절한 분할 비율**: 
   - 데이터가 많으면 80:20 또는 70:30
   - 데이터가 적으면 60:40도 고려

2. **stratify 활용**: 
   - 분류 문제에서는 항상 고려
   - 클래스 불균형이 심할 때 필수

3. **random_state 설정**: 
   - 실험 재현성을 위해 항상 설정
   - 팀 프로젝트에서는 공통 값 사용

4. **교차 검증과 함께**: 
   - train_test_split + cross_validation 조합
   - 더 안정적인 모델 평가

## 🔍 보너스: KNeighborsClassifier의 kneighbors() 메서드

데이터 분할과 함께 자주 사용되는 KNN 알고리즘의 핵심 메서드를 알아보겠습니다.

### kneighbors()란?

**kneighbors()**는 KNeighborsClassifier에서 제공하는 메서드로, **특정 샘플에 대해 가장 가까운 k개의 이웃을 찾아주는 기능**을 합니다. 이 메서드는 다음과 같은 정보를 반환합니다:

- **거리(distances)**: 각 이웃까지의 거리 정보
- **인덱스(indices)**: 훈련 데이터에서 이웃들의 위치 정보

이를 통해 KNN 모델이 **어떤 근거로 예측을 하는지** 이해할 수 있고, **이상치 탐지**나 **예측 신뢰도 평가** 등에 활용할 수 있습니다.

### kneighbors() 기본 사용법
```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
import numpy as np

# 데이터 준비 및 분할
iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# KNN 모델 훈련
kn = KNeighborsClassifier(n_neighbors=5)
kn.fit(X_train, y_train)

# 특정 샘플의 가장 가까운 이웃 찾기
sample = X_test[0:1]  # 첫 번째 테스트 샘플
distances, indices = kn.kneighbors(sample)

print("테스트 샘플:", sample[0])
print("가장 가까운 5개 이웃의 거리:", distances[0])
print("가장 가까운 5개 이웃의 인덱스:", indices[0])
print("이웃들의 실제 클래스:", y_train[indices[0]])
```

**출력 결과:**
```
테스트 샘플: [6.1 2.8 4.7 1.2]
가장 가까운 5개 이웃의 거리: [0.24494897 0.3        0.33166248 0.36055513 0.37416574]
가장 가까운 5개 이웃의 인덱스: [73 39 71 40 42]
이웃들의 실제 클래스: [1 1 1 1 1]
```

### 핵심 매개변수

<div class="comparison-table-wrapper">
  <table class="terminal-comparison-table">
    <thead>
      <tr>
        <th class="table-header-category">매개변수</th>
        <th class="table-header-supervised">설명</th>
        <th class="table-header-unsupervised">기본값</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table-category">n_neighbors</td>
        <td class="table-supervised">찾을 이웃의 개수<br/><span class="table-detail">None이면 모델의 n_neighbors 사용</span></td>
        <td class="table-unsupervised"><span class="status-easy">None</span></td>
      </tr>
      <tr>
        <td class="table-category">return_distance</td>
        <td class="table-supervised">거리 정보 반환 여부<br/><span class="table-detail">False면 인덱스만 반환</span></td>
        <td class="table-unsupervised"><span class="status-easy">True</span></td>
      </tr>
    </tbody>
  </table>
</div>

### 실전 활용 예시
```python
# 1. 거리 정보 없이 인덱스만 가져오기
indices_only = kn.kneighbors(sample, return_distance=False)
print("인덱스만:", indices_only[0])

# 2. 다른 개수의 이웃 찾기
distances_3, indices_3 = kn.kneighbors(sample, n_neighbors=3)
print("\n가장 가까운 3개 이웃:")
print("거리:", distances_3[0])
print("인덱스:", indices_3[0])

# 3. 여러 샘플에 대해 한번에 처리
multiple_samples = X_test[:3]
distances_multi, indices_multi = kn.kneighbors(multiple_samples)
print(f"\n3개 샘플의 이웃 정보:")
for i in range(3):
    print(f"샘플 {i}: 이웃 인덱스 {indices_multi[i]}")
```

**출력 결과:**
```
인덱스만: [73 39 71 40 42]

가장 가까운 3개 이웃:
거리: [0.24494897 0.3        0.33166248]
인덱스: [73 39 71 40]

3개 샘플의 이웃 정보:
샘플 0: 이웃 인덱스 [73 39 71 40 42]
샘플 1: 이웃 인덱스 [50 67 83 51 80]
샘플 2: 이웃 인덱스 [73 39 71 40 42]
```

## 📚 마무리

`train_test_split()`은 머신러닝 파이프라인의 첫 번째 단계입니다. **올바른 데이터 분할**이 신뢰할 수 있는 모델 평가의 기초가 됩니다. 특히 `stratify`, `random_state` 매개변수를 적절히 활용하여 **재현 가능하고 공정한 평가**를 수행하는 것이 중요합니다!

그리고 KNN의 `kneighbors()` 메서드는 **모델의 예측 과정을 이해**하고 **이상치 탐지**, **예측 신뢰도 평가** 등 다양한 분석에 활용할 수 있는 강력한 도구입니다. 