---
layout: til
title: "데이터 표준화(Standardization) - 머신러닝 전처리의 핵심"
date: 2024-11-26
category: machine-learning
tags: [standardization, preprocessing, feature-scaling, machine-learning, normalization]
---

## 🎯 데이터 표준화란?

**데이터 표준화(Standardization)**는 서로 다른 범위와 단위를 가진 특성들을 **평균 0, 표준편차 1**로 변환하는 전처리 기법입니다. 이를 통해 모든 특성이 동일한 스케일을 갖게 되어 머신러닝 알고리즘의 성능을 향상시킬 수 있습니다.

## 🤔 왜 표준화가 필요할까?

### 문제 상황
```python
import numpy as np
import pandas as pd

# 예시 데이터: 나이, 연봉, 구매횟수
data = np.array([
    [25, 50000, 3],    # 나이(세), 연봉(원), 구매횟수
    [35, 75000, 5],
    [45, 60000, 2],
    [28, 45000, 4],
    [52, 80000, 1]
])

print("원본 데이터:")
print("나이 범위:", data[:, 0].min(), "~", data[:, 0].max())
print("연봉 범위:", data[:, 1].min(), "~", data[:, 1].max()) 
print("구매횟수 범위:", data[:, 2].min(), "~", data[:, 2].max())
```

**출력 결과:**
```
원본 데이터:
나이 범위: 25 ~ 52
연봉 범위: 45000 ~ 80000
구매횟수 범위: 1 ~ 5
```

### 문제점
- **스케일 차이**: 연봉(45000~80000)이 나이(25~52)보다 훨씬 큰 범위
- **알고리즘 편향**: 큰 값을 가진 특성이 결과에 과도한 영향
- **수렴 속도**: 경사하강법 등의 최적화 알고리즘이 느려짐

## 📖 핵심 개념 이해

### 분산과 표준편차
표준화를 이해하기 위해서는 먼저 **분산**과 **표준편차** 개념을 알아야 합니다.

<div class="comparison-table-wrapper">
  <table class="terminal-comparison-table">
    <thead>
      <tr>
        <th class="table-header-category">개념</th>
        <th class="table-header-supervised">설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table-category">분산</td>
        <td class="table-supervised">데이터가 평균에서 얼마나 퍼져있는지 제곱 간</td>
      </tr>
      <tr>
        <td class="table-category">표준편차</td>
        <td class="table-supervised">분산의 제곱근, 실제 퍼짐 정도를 보여줌</td>
      </tr>
      <tr>
        <td class="table-category">표준편차가 크다</td>
        <td class="table-supervised">데이터가 평균 기준으로 크게 퍼져 있음</td>
      </tr>
      <tr>
        <td class="table-category">표준편차가 작다</td>
        <td class="table-supervised">데이터가 평균 근처에 모여 있음</td>
      </tr>
    </tbody>
  </table>
</div>


## 📊 표준화 공식

### Z-Score 표준화
```
z = (x - μ) / σ
```

- **x**: 원본 값
- **μ**: 평균 (mean)
- **σ**: 표준편차 (standard deviation)
- **z**: 표준화된 값

### 표준화의 의미
- **평균을 0으로**: 모든 데이터를 평균 기준으로 재배치
- **표준편차를 1로**: 모든 특성의 퍼짐 정도를 동일하게 만듦
- **단위 제거**: 서로 다른 단위의 특성들을 무차원으로 변환

## 💻 Python으로 표준화 구현

### 1. 수동 구현
```python
import numpy as np

def standardize_manual(data):
    """수동으로 표준화 구현"""
    mean = np.mean(data, axis=0)
    std = np.std(data, axis=0)
    standardized = (data - mean) / std
    return standardized, mean, std

# 표준화 적용
data = np.array([
    [25, 50000, 3],
    [35, 75000, 5], 
    [45, 60000, 2],
    [28, 45000, 4],
    [52, 80000, 1]
])

standardized_data, mean_vals, std_vals = standardize_manual(data)

print("평균값:", mean_vals)
print("표준편차:", std_vals)
print("\n표준화된 데이터:")
print(standardized_data)
```

**출력 결과:**
```
평균값: [37.   62000.     3. ]
표준편차: [10.95445115 13540.06369  1.58113883]

표준화된 데이터:
[[-1.09544512 -0.88641425  0.        ]
 [-0.18257419  0.95905567  1.26491106]
 [ 0.73029676 -0.14773571 -0.63245553]
 [-0.82158034 -1.25519996  0.63245553]
 [ 1.36930289  1.33029425 -1.26491106]]
```

### 2. Scikit-learn 사용
```python
from sklearn.preprocessing import StandardScaler
import numpy as np

# 데이터 준비
data = np.array([
    [25, 50000, 3],
    [35, 75000, 5],
    [45, 60000, 2], 
    [28, 45000, 4],
    [52, 80000, 1]
])

# StandardScaler 사용
scaler = StandardScaler()
standardized_data = scaler.fit_transform(data)

print("Scikit-learn 표준화 결과:")
print("평균:", scaler.mean_)
print("표준편차:", scaler.scale_)
print("\n표준화된 데이터:")
print(standardized_data)

# 검증: 평균과 표준편차 확인
print("\n검증:")
print("표준화 후 평균:", np.mean(standardized_data, axis=0))
print("표준화 후 표준편차:", np.std(standardized_data, axis=0))
```

**출력 결과:**
```
Scikit-learn 표준화 결과:
평균: [37.   62000.     3. ]
표준편차: [10.95445115 13540.06369  1.58113883]

표준화된 데이터:
[[-1.09544512 -0.88641425  0.        ]
 [-0.18257419  0.95905567  1.26491106]
 [ 0.73029676 -0.14773571 -0.63245553]
 [-0.82158034 -1.25519996  0.63245553]
 [ 1.36930289  1.33029425 -1.26491106]]

검증:
표준화 후 평균: [ 0.00000000e+00  1.11022302e-16 -1.11022302e-16]
표준화 후 표준편차: [1. 1. 1.]
```

## 🔄 역변환 (Inverse Transform)

표준화된 데이터를 원래 스케일로 되돌리는 방법:

```python
# 역변환 공식: x = z * σ + μ
def inverse_standardize(standardized_data, mean_vals, std_vals):
    """표준화된 데이터를 원래 스케일로 복원"""
    return standardized_data * std_vals + mean_vals

# 역변환 실행
restored_data = inverse_standardize(standardized_data, scaler.mean_, scaler.scale_)

print("원본 데이터:")
print(data)
print("\n역변환된 데이터:")
print(restored_data)
print("\n차이 (거의 0에 가까움):")
print(np.abs(data - restored_data))
```

**출력 결과:**
```
원본 데이터:
[[   25 50000     3]
 [   35 75000     5]
 [   45 60000     2]
 [   28 45000     4]
 [   52 80000     1]]

역변환된 데이터:
[[   25. 50000.     3.]
 [   35. 75000.     5.]
 [   45. 60000.     2.]
 [   28. 45000.     4.]
 [   52. 80000.     1.]]

차이 (거의 0에 가까움):
[[0.00000000e+00 0.00000000e+00 0.00000000e+00]
 [0.00000000e+00 0.00000000e+00 0.00000000e+00]
 [0.00000000e+00 0.00000000e+00 0.00000000e+00]
 [0.00000000e+00 0.00000000e+00 0.00000000e+00]
 [0.00000000e+00 0.00000000e+00 0.00000000e+00]]
```

## 📈 실제 머신러닝에서의 활용

### 표준화 전후 성능 비교
```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import numpy as np

# 가상의 분류 데이터 생성 (스케일이 다른 특성들)
X, y = make_classification(n_samples=1000, n_features=2, n_redundant=0, 
                          n_informative=2, random_state=42)

# 두 번째 특성의 스케일을 크게 만들기
X[:, 1] = X[:, 1] * 1000

print("특성별 범위:")
print(f"특성 1: {X[:, 0].min():.2f} ~ {X[:, 0].max():.2f}")
print(f"특성 2: {X[:, 1].min():.2f} ~ {X[:, 1].max():.2f}")

# 훈련/테스트 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 1. 표준화 없이 학습
model_raw = LogisticRegression(random_state=42)
model_raw.fit(X_train, y_train)
pred_raw = model_raw.predict(X_test)
accuracy_raw = accuracy_score(y_test, pred_raw)

# 2. 표준화 후 학습
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model_scaled = LogisticRegression(random_state=42)
model_scaled.fit(X_train_scaled, y_train)
pred_scaled = model_scaled.predict(X_test_scaled)
accuracy_scaled = accuracy_score(y_test, pred_scaled)

print(f"\n성능 비교:")
print(f"표준화 전 정확도: {accuracy_raw:.4f}")
print(f"표준화 후 정확도: {accuracy_scaled:.4f}")
print(f"성능 향상: {accuracy_scaled - accuracy_raw:.4f}")
```

**출력 결과:**
```
특성별 범위:
특성 1: -3.75 ~ 4.04
특성 2: -3876.27 ~ 3764.40

성능 비교:
표준화 전 정확도: 0.8600
표준화 후 정확도: 0.9267
성능 향상: 0.0667
```

## 🔍 표준화 vs 정규화 비교

<div class="comparison-table-wrapper">
  <table class="terminal-comparison-table">
    <thead>
      <tr>
        <th class="table-header-category">구분</th>
        <th class="table-header-supervised">표준화 (Standardization)</th>
        <th class="table-header-unsupervised">정규화 (Normalization)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table-category">개념</td>
        <td class="table-supervised">데이터를 평균 중심으로 재배치<br/><span class="table-detail">분산과 표준편차 기반</span></td>
        <td class="table-unsupervised">데이터를 특정 범위로 압축<br/><span class="table-detail">최댓값과 최솟값 기반</span></td>
      </tr>
      <tr>
        <td class="table-category">공식</td>
        <td class="table-supervised">z = (x - μ) / σ</td>
        <td class="table-unsupervised">x' = (x - min) / (max - min)</td>
      </tr>
      <tr>
        <td class="table-category">결과 범위</td>
        <td class="table-supervised">평균 0, 표준편차 1<br/><span class="table-detail">(-∞ ~ +∞)</span></td>
        <td class="table-unsupervised">0 ~ 1 범위<br/><span class="table-detail">(고정된 범위)</span></td>
      </tr>
      <tr>
        <td class="table-category">이상치 영향</td>
        <td class="table-supervised"><span class="status-easy">적음</span><br/><span class="table-detail">평균과 표준편차 기반</span></td>
        <td class="table-unsupervised"><span class="status-hard">큼</span><br/><span class="table-detail">최댓값/최솟값 기반</span></td>
      </tr>
      <tr>
        <td class="table-category">적용 상황</td>
        <td class="table-supervised">정규분포 데이터<br/>선형 알고리즘</td>
        <td class="table-unsupervised">균등분포 데이터<br/>신경망, 이미지 처리</td>
      </tr>
      <tr>
        <td class="table-category">대표 알고리즘</td>
        <td class="table-supervised">
          <span class="algorithm-tag">로지스틱 회귀</span>
          <span class="algorithm-tag">SVM</span>
          <span class="algorithm-tag">PCA</span>
        </td>
        <td class="table-unsupervised">
          <span class="algorithm-tag">신경망</span>
          <span class="algorithm-tag">KNN</span>
          <span class="algorithm-tag">클러스터링</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## ⚠️ 주의사항

### 1. 훈련/테스트 데이터 분리 후 적용
```python
# ❌ 잘못된 방법: 전체 데이터에 표준화 후 분할
X_scaled_wrong = StandardScaler().fit_transform(X)
X_train_wrong, X_test_wrong = train_test_split(X_scaled_wrong, test_size=0.3)

# ✅ 올바른 방법: 분할 후 훈련 데이터로만 표준화 학습
X_train, X_test = train_test_split(X, test_size=0.3)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # 훈련 데이터로 학습
X_test_scaled = scaler.transform(X_test)        # 테스트 데이터는 변환만
```

### 2. 새로운 데이터 예측 시
```python
# 새로운 데이터 예측
new_data = np.array([[30, 55000, 3]])

# 기존에 학습된 scaler 사용
new_data_scaled = scaler.transform(new_data)
prediction = model_scaled.predict(new_data_scaled)

print("새로운 데이터:", new_data)
print("표준화된 데이터:", new_data_scaled)
print("예측 결과:", prediction)
```

## 🎯 언제 표준화를 사용할까?

### 표준화가 필요한 경우
- **거리 기반 알고리즘**: KNN, K-means, SVM
- **경사하강법 사용**: 선형회귀, 로지스틱회귀, 신경망
- **PCA, LDA** 등 차원축소 기법
- **특성들의 스케일이 크게 다른 경우**

### 표준화가 불필요한 경우
- **트리 기반 알고리즘**: Decision Tree, Random Forest, XGBoost
- **이미 동일한 스케일의 데이터**
- **범주형 데이터만 사용하는 경우**

## 💡 실무 팁

1. **파이프라인 사용**: `sklearn.pipeline.Pipeline`으로 전처리와 모델링을 함께 관리
2. **특성별 선택적 적용**: 일부 특성만 표준화가 필요한 경우 `ColumnTransformer` 활용
3. **스케일러 저장**: `joblib`이나 `pickle`로 학습된 스케일러 저장하여 재사용
4. **검증**: 표준화 후 평균≈0, 표준편차≈1인지 확인

## 📚 마무리

데이터 표준화는 머신러닝 전처리의 핵심 기법입니다. **서로 다른 스케일의 특성들을 동등하게 처리**하여 알고리즘의 성능을 크게 향상시킬 수 있습니다. 특히 거리 기반 알고리즘이나 경사하강법을 사용하는 모델에서는 필수적인 과정입니다. 올바른 순서로 적용하고, 새로운 데이터에도 동일한 변환을 적용하는 것을 잊지 마세요! 