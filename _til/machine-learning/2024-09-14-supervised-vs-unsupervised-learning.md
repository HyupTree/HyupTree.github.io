---
layout: til
title: "지도학습 vs 비지도학습 - 머신러닝의 두 가지 접근법"
date: 2024-09-14
category: machine-learning
tags: [supervised-learning, unsupervised-learning, machine-learning, classification, clustering]
---

## 🎯 머신러닝의 두 가지 학습 방법

머신러닝 알고리즘은 크게 **지도 학습(Supervised Learning)**과 **비지도 학습(Unsupervised Learning)**으로 나눌 수 있습니다. 지도 학습 알고리즘은 훈련하기 위한 데이터와 정답이 필요하지만, 비지도 학습은 정답 없이도 데이터의 패턴을 찾아낼 수 있습니다.

## 📚 지도 학습 (Supervised Learning)

### 정의
지도 학습은 **입력 데이터와 정답(레이블)이 함께 제공**되는 학습 방법입니다. 마치 선생님이 정답을 알려주며 가르치는 것과 같습니다.

### 특징
- **훈련 데이터**: 입력값(X)과 정답(y)이 쌍으로 구성
- **목표**: 새로운 입력에 대해 정확한 출력을 예측
- **평가**: 실제 정답과 예측값을 비교하여 성능 측정

### 주요 유형

#### 1. 분류(Classification) 🏷️
- **목적**: 데이터를 미리 정의된 카테고리로 분류
- **출력**: 이산적인 클래스 레이블
- **예시**: 
  - 이메일 스팸 분류 (스팸/정상)
  - 이미지 분류 (고양이/개/새)
  - 질병 진단 (양성/음성)

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# 아이리스 분류 예시
iris = load_iris()
X, y = iris.data, iris.target

# 훈련/테스트 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)  # 훈련 데이터와 정답으로 학습

# 예측 및 결과
predictions = clf.predict(X_test)
accuracy = clf.score(X_test, y_test)

print("예측 결과:", predictions[:10])
print("실제 정답:", y_test[:10])
print(f"정확도: {accuracy:.3f}")
```

**출력 결과:**
```
예측 결과: [1 0 2 1 1 0 1 2 1 1]
실제 정답: [1 0 2 1 1 0 1 2 1 1]
정확도: 1.000
```

#### 2. 회귀(Regression) 📈
- **목적**: 연속적인 수치값 예측
- **출력**: 실수값
- **예시**:
  - 주택 가격 예측
  - 주식 가격 예측
  - 온도 예측

```python
from sklearn.linear_model import LinearRegression
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
import numpy as np

# 캘리포니아 주택 가격 예측 예시
housing = fetch_california_housing()
X, y = housing.data, housing.target

# 훈련/테스트 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

reg = LinearRegression()
reg.fit(X_train, y_train)  # 집 특성과 가격으로 학습

# 예측 및 결과
predictions = reg.predict(X_test[:5])
actual_prices = y_test[:5]

print("예측 가격:", np.round(predictions, 2))
print("실제 가격:", np.round(actual_prices, 2))
print(f"R² 점수: {reg.score(X_test, y_test):.3f}")
```

**출력 결과:**
```
예측 가격: [0.48 0.46 5.77 2.17 2.36]
실제 가격: [0.48 0.46 5.00 2.18 2.78]
R² 점수: 0.576
```

## 🔍 비지도 학습 (Unsupervised Learning)

### 정의
비지도 학습은 **정답 없이 데이터의 숨겨진 패턴이나 구조를 찾아내는** 학습 방법입니다. 데이터 자체에서 의미있는 정보를 추출합니다.

### 특징
- **훈련 데이터**: 입력값(X)만 제공, 정답 없음
- **목표**: 데이터의 숨겨진 구조나 패턴 발견
- **평가**: 명확한 정답이 없어 평가가 어려움

### 주요 유형

#### 1. 군집화(Clustering) 🎯
- **목적**: 유사한 데이터끼리 그룹으로 묶기
- **특징**: 그룹의 개수나 기준을 미리 정하지 않음
- **예시**:
  - 고객 세분화
  - 유전자 분석
  - 이미지 분할

```python
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
import numpy as np

# 고객 세분화 예시 (가상 데이터)
# 나이, 소득, 구매횟수 데이터 생성
customer_data, _ = make_blobs(n_samples=100, centers=3, n_features=2, 
                             random_state=42, cluster_std=1.5)

kmeans = KMeans(n_clusters=3, random_state=42)
customer_groups = kmeans.fit_predict(customer_data)

# 각 그룹의 중심점
centers = kmeans.cluster_centers_

print("고객 그룹 분류 결과:", customer_groups[:10])
print("그룹별 고객 수:")
unique, counts = np.unique(customer_groups, return_counts=True)
for group, count in zip(unique, counts):
    print(f"  그룹 {group}: {count}명")
print("그룹 중심점:")
for i, center in enumerate(centers):
    print(f"  그룹 {i}: [{center[0]:.2f}, {center[1]:.2f}]")
```

**출력 결과:**
```
고객 그룹 분류 결과: [1 0 1 2 0 1 1 0 2 2]
그룹별 고객 수:
  그룹 0: 34명
  그룹 1: 32명
  그룹 2: 34명
그룹 중심점:
  그룹 0: [-8.79, -8.52]
  그룹 1: [-1.38, 4.37]
  그룹 2: [3.71, -4.15]
```

#### 2. 차원 축소(Dimensionality Reduction) 📊
- **목적**: 고차원 데이터를 저차원으로 변환하면서 중요한 정보 보존
- **장점**: 시각화, 노이즈 제거, 계산 효율성 향상
- **예시**:
  - 주성분 분석(PCA)
  - t-SNE
  - 데이터 시각화

```python
from sklearn.decomposition import PCA
from sklearn.datasets import load_digits
import numpy as np

# 손글씨 숫자 데이터 차원 축소 예시
digits = load_digits()
X = digits.data  # 64차원 데이터 (8x8 픽셀)

print("원본 데이터 형태:", X.shape)

# 2차원으로 축소
pca = PCA(n_components=2)
reduced_data = pca.fit_transform(X)

print("축소된 데이터 형태:", reduced_data.shape)
print("설명된 분산 비율:", np.round(pca.explained_variance_ratio_, 3))
print("총 설명된 분산:", np.round(pca.explained_variance_ratio_.sum(), 3))

# 첫 5개 샘플의 축소된 데이터
print("축소된 데이터 (첫 5개):")
for i in range(5):
    print(f"  샘플 {i}: [{reduced_data[i][0]:.2f}, {reduced_data[i][1]:.2f}]")
```

**출력 결과:**
```
원본 데이터 형태: (1797, 64)
축소된 데이터 형태: (1797, 2)
설명된 분산 비율: [0.149 0.134]
총 설명된 분산: 0.283
축소된 데이터 (첫 5개):
  샘플 0: [-1.26, 21.27]
  샘플 1: [7.95, 20.76]
  샘플 2: [6.99, 9.95]
  샘플 3: [16.94, 4.04]
  샘플 4: [-4.87, 8.41]
```

#### 3. 연관 규칙 학습(Association Rule Learning) 🛒
- **목적**: 데이터 간의 연관성이나 규칙 발견
- **예시**:
  - 장바구니 분석 ("맥주를 사는 사람은 기저귀도 산다")
  - 추천 시스템
  - 웹 사용 패턴 분석

## 🔄 지도학습 vs 비지도학습 비교

<div class="comparison-table-wrapper">
  <table class="terminal-comparison-table">
    <thead>
      <tr>
        <th class="table-header-category">구분</th>
        <th class="table-header-supervised">🎓 지도학습 (Supervised Learning)</th>
        <th class="table-header-unsupervised">🔍 비지도학습 (Unsupervised Learning)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table-category">목표</td>
        <td class="table-supervised">정확한 예측/분류 수행</td>
        <td class="table-unsupervised">숨겨진 패턴/구조 발견</td>
      </tr>
      <tr>
        <td class="table-category">데이터</td>
        <td class="table-supervised">입력 데이터 + 정답 레이블</td>
        <td class="table-unsupervised">입력 데이터만 (레이블 없음)</td>
      </tr>
      <tr>
        <td class="table-category">학습 방식</td>
        <td class="table-supervised">정답을 보고 학습</td>
        <td class="table-unsupervised">데이터 자체에서 패턴 학습</td>
      </tr>
      <tr>
        <td class="table-category">평가 방법</td>
        <td class="table-supervised">정답과 예측값 비교<br/><span class="table-detail">(정확도, F1-score 등)</span></td>
        <td class="table-unsupervised">내재적 평가<br/><span class="table-detail">(실루엣 점수, 엘보우 방법 등)</span></td>
      </tr>
      <tr>
        <td class="table-category">주요 기법</td>
        <td class="table-supervised">• 분류 (Classification)<br/>• 회귀 (Regression)</td>
        <td class="table-unsupervised">• 군집화 (Clustering)<br/>• 차원 축소 (Dimensionality Reduction)<br/>• 연관 규칙 (Association Rules)</td>
      </tr>
      <tr>
        <td class="table-category">알고리즘 예시</td>
        <td class="table-supervised"><span class="algorithm-tag">Random Forest</span><br/><span class="algorithm-tag">SVM</span><br/><span class="algorithm-tag">Linear Regression</span><br/><span class="algorithm-tag">KNN</span></td>
        <td class="table-unsupervised"><span class="algorithm-tag">K-Means</span><br/><span class="algorithm-tag">PCA</span><br/><span class="algorithm-tag">DBSCAN</span><br/><span class="algorithm-tag">Apriori</span></td>
      </tr>
      <tr>
        <td class="table-category">실무 활용</td>
        <td class="table-supervised">• 이메일 스팸 분류<br/>• 주택 가격 예측<br/>• 질병 진단<br/>• 이미지 인식</td>
        <td class="table-unsupervised">• 고객 세분화<br/>• 추천 시스템<br/>• 이상 탐지<br/>• 데이터 시각화</td>
      </tr>
      <tr>
        <td class="table-category">⏱학습 시간</td>
        <td class="table-supervised"><span class="status-fast">상대적으로 빠름</span></td>
        <td class="table-unsupervised"><span class="status-slow">상대적으로 느림</span></td>
      </tr>
      <tr>
        <td class="table-category">데이터 요구사항</td>
        <td class="table-supervised">고품질 레이블 데이터 필수</td>
        <td class="table-unsupervised">레이블 불필요, 대용량 데이터 선호</td>
      </tr>
      <tr>
        <td class="table-category">결과 해석</td>
        <td class="table-supervised"><span class="status-easy">명확하고 직관적</span></td>
        <td class="table-unsupervised"><span class="status-hard">도메인 지식 필요, 해석 어려움</span></td>
      </tr>
      <tr>
        <td class="table-category">평가 난이도</td>
        <td class="table-supervised"><span class="status-easy">쉬움 (명확한 기준)</span></td>
        <td class="table-unsupervised"><span class="status-hard">어려움 (주관적 판단)</span></td>
      </tr>
    </tbody>
  </table>
</div>

## 🛠️ 실제 데이터셋 예시

### 지도학습 데이터셋
```python
import numpy as np

# 입력 데이터와 정답이 함께 제공
input_arr = np.array([[5.1, 3.5, 1.4, 0.2],  # 꽃잎 길이, 너비 등
                      [4.9, 3.0, 1.4, 0.2],
                      [6.2, 3.4, 5.4, 2.3]])

labels = np.array([0, 0, 2])  # 아이리스 종류 (setosa, versicolor, virginica)

print("입력 데이터 형태:", input_arr.shape)
print("입력 데이터:")
print(input_arr)
print("정답 레이블:", labels)
print("레이블 종류:", np.unique(labels))
```

**출력 결과:**
```
입력 데이터 형태: (3, 4)
입력 데이터:
[[5.1 3.5 1.4 0.2]
 [4.9 3.  1.4 0.2]
 [6.2 3.4 5.4 2.3]]
정답 레이블: [0 0 2]
레이블 종류: [0 2]
```

### 비지도학습 데이터셋
```python
import numpy as np

# 입력 데이터만 제공, 정답 없음
customer_data = np.array([[25, 50000, 3],    # 나이, 소득, 구매횟수
                          [35, 75000, 5],
                          [45, 60000, 2],
                          [28, 45000, 4],
                          [52, 80000, 1]])

print("고객 데이터 형태:", customer_data.shape)
print("고객 데이터:")
print(customer_data)
print("데이터 통계:")
print("  평균 나이:", np.mean(customer_data[:, 0]))
print("  평균 소득:", np.mean(customer_data[:, 1]))
print("  평균 구매횟수:", np.mean(customer_data[:, 2]))

# 정답 없이 패턴을 찾아 고객을 그룹화
# 알고리즘이 스스로 유사한 고객들을 묶어줌
```

**출력 결과:**
```
고객 데이터 형태: (5, 3)
고객 데이터:
[[   25 50000     3]
 [   35 75000     5]
 [   45 60000     2]
 [   28 45000     4]
 [   52 80000     1]]
데이터 통계:
  평균 나이: 37.0
  평균 소득: 62000.0
  평균 구매횟수: 3.0
```

## 🎯 언제 어떤 방법을 사용할까?

### 지도학습을 선택하는 경우
- **명확한 목표**가 있을 때 (분류, 예측)
- **충분한 레이블 데이터**가 있을 때
- **성능 측정**이 중요할 때

### 비지도학습을 선택하는 경우
- **데이터 탐색**이 목적일 때
- **레이블 데이터가 없거나 부족**할 때
- **숨겨진 패턴 발견**이 목표일 때

## 💡 실무 팁

1. **데이터 준비**: 지도학습은 고품질의 레이블 데이터가 핵심
2. **문제 정의**: 목표가 예측인지 탐색인지 명확히 하기
3. **하이브리드 접근**: 비지도학습으로 데이터 탐색 후 지도학습 적용
4. **평가 방법**: 각 학습 방법에 적합한 평가 지표 선택

## 📚 마무리

지도학습과 비지도학습은 각각 다른 상황에서 유용한 도구입니다. **정답이 있는 문제**는 지도학습으로, **데이터의 숨겨진 구조를 찾는 문제**는 비지도학습으로 접근하는 것이 효과적입니다. 실제 프로젝트에서는 두 방법을 조합하여 사용하는 경우가 많습니다. 