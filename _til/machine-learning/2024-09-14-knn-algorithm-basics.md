---
layout: til
title: "KNN(K-Nearest Neighbors) 알고리즘 기초"
date: 2024-09-14
category: machine-learning
tags: [knn, machine-learning, classification, scikit-learn, python]
---

## 🤖 KNN 알고리즘이란?

**K-Nearest Neighbors(KNN)**는 머신러닝의 지도학습 알고리즘 중 하나로, 새로운 데이터 포인트를 분류하거나 예측할 때 가장 가까운 K개의 이웃 데이터를 참고하는 방식입니다.

### 핵심 아이디어 💡
- **거리 기반 분류**: 새로운 데이터와 기존 데이터 간의 거리를 계산
- **다수결 원칙**: K개의 가장 가까운 이웃들의 라벨 중 가장 많은 것으로 분류
- **게으른 학습(Lazy Learning)**: 훈련 단계에서 모델을 만들지 않고, 예측 시점에 계산

## 📊 KNN의 작동 원리

1. **거리 계산**: 새로운 데이터 포인트와 모든 훈련 데이터 간의 거리 계산
2. **이웃 선택**: 가장 가까운 K개의 데이터 포인트 선택
3. **분류/예측**: 
   - **분류**: K개 이웃의 라벨 중 가장 빈번한 것 선택
   - **회귀**: K개 이웃의 값들의 평균 계산

## 🔧 scikit-learn으로 KNN 구현

### 기본 사용법

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# 데이터 로드
iris = load_iris()
X, y = iris.data, iris.target

# 훈련/테스트 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# KNN 모델 생성 및 훈련
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# 예측
predictions = knn.predict(X_test)
```

### 모델 정보 확인

```python
# 훈련 데이터 확인
print("훈련 데이터 형태:", knn.fit_X.shape)
print("훈련 라벨:", knn.fit_y)

# 예측 결과 예시
# [[25.4 242.]
#  [26.3 290.]
#  ...
#  [15. 19.9]]
```

## ⚙️ 주요 매개변수

### n_neighbors (K값)
- **의미**: 참고할 이웃의 개수
- **영향**: 
  - K가 작을수록: 복잡한 결정 경계, 과적합 위험
  - K가 클수록: 단순한 결정 경계, 과소적합 위험

```python
# 다양한 K값 테스트
for k in [1, 3, 5, 7, 9]:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train, y_train)
    accuracy = knn.score(X_test, y_test)
    print(f"K={k}: 정확도 = {accuracy:.3f}")
```

### 거리 측정 방법

```python
# 유클리드 거리 (기본값)
knn_euclidean = KNeighborsClassifier(n_neighbors=3, metric='euclidean')

# 맨하탄 거리
knn_manhattan = KNeighborsClassifier(n_neighbors=3, metric='manhattan')

# 민코프스키 거리
knn_minkowski = KNeighborsClassifier(n_neighbors=3, metric='minkowski', p=2)
```

## 📈 KNN의 장단점

### 장점 ✅
- **직관적이고 이해하기 쉬움**
- **훈련 시간이 빠름** (모델 학습 과정이 없음)
- **다중 클래스 분류에 자연스럽게 적용**
- **비선형 데이터에도 잘 작동**

### 단점 ❌
- **예측 시간이 느림** (모든 훈련 데이터와 거리 계산)
- **메모리 사용량이 큼** (모든 훈련 데이터 저장)
- **차원의 저주에 민감** (고차원에서 성능 저하)
- **데이터 스케일에 민감** (정규화 필요)

## 🎯 실전 팁

### 1. 데이터 전처리
```python
from sklearn.preprocessing import StandardScaler

# 데이터 정규화
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train_scaled, y_train)
```

### 2. 최적의 K값 찾기
```python
from sklearn.model_selection import cross_val_score

k_range = range(1, 21)
k_scores = []

for k in k_range:
    knn = KNeighborsClassifier(n_neighbors=k)
    scores = cross_val_score(knn, X_train_scaled, y_train, cv=5)
    k_scores.append(scores.mean())

optimal_k = k_range[k_scores.index(max(k_scores))]
print(f"최적의 K값: {optimal_k}")
```

## 🔍 언제 KNN을 사용할까?

- **소규모 데이터셋**
- **비선형 패턴이 있는 데이터**
- **빠른 프로토타이핑이 필요할 때**
- **해석 가능한 모델이 필요할 때**

## 📚 참고사항

KNN은 **인스턴스 기반 학습(Instance-based Learning)**의 대표적인 예시로, 새로운 데이터가 들어올 때마다 기존 데이터와의 유사성을 계산하여 예측을 수행합니다. 단순하지만 강력한 알고리즘으로, 머신러닝 입문자들이 이해하기 좋은 알고리즘입니다. 