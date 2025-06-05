# TIL 포스트 작성 가이드

## 📁 디렉토리 구조

TIL 포스트는 카테고리별로 디렉토리가 분리되어 있습니다:

```
_til/
├── data-engineering/    # 데이터 엔지니어링 관련
├── python/             # 파이썬 관련  
├── database/           # 데이터베이스 관련
└── java/               # 자바 관련
```

## 🔗 URL 구조

카테고리별 디렉토리 구조에 따라 URL이 생성됩니다:

- **데이터 엔지니어링**: `/til/data-engineering/파일명/`
- **파이썬**: `/til/python/파일명/`
- **데이터베이스**: `/til/database/파일명/`
- **자바**: `/til/java/파일명/`

### URL 예시:
- `_til/data-engineering/2024-12-18-data-engineering-fundamentals.md` 
  → `/til/data-engineering/2024-12-18-data-engineering-fundamentals/`
- `_til/python/2024-12-20-python-syntax-essentials.md`
  → `/til/python/2024-12-20-python-syntax-essentials/`

## 📝 새 TIL 포스트 작성하기

### 1. 파일 생성 위치
카테고리에 맞는 디렉토리에 파일을 생성하세요:

```bash
# 데이터 엔지니어링 포스트
_til/data-engineering/YYYY-MM-DD-제목.md

# 파이썬 포스트  
_til/python/YYYY-MM-DD-제목.md

# 데이터베이스 포스트
_til/database/YYYY-MM-DD-제목.md

# 자바 포스트
_til/java/YYYY-MM-DD-제목.md
```

### 2. 파일명 규칙
- 형식: `YYYY-MM-DD-제목.md`
- 예시: `2024-12-22-python-decorators.md`
- 제목은 영어로, 단어 사이는 하이픈(-) 사용

### 3. Front Matter 설정

#### 데이터 엔지니어링 포스트
```yaml
---
layout: til
title: "포스트 제목"
date: 2024-12-22
category: data-engineering
tags: [data-engineering, etl, pipeline, spark, airflow]
---
```

#### 파이썬 포스트
```yaml
---
layout: til
title: "포스트 제목"
date: 2024-12-22
category: python
tags: [python, programming, syntax, basics]
---
```

#### 데이터베이스 포스트
```yaml
---
layout: til
title: "포스트 제목"
date: 2024-12-22
category: database
tags: [database, sql, rdbms, nosql]
---
```

#### 자바 포스트
```yaml
---
layout: til
title: "포스트 제목"
date: 2024-12-22
category: java
tags: [java, programming, oop, spring]
---
```

## 📋 포스트 템플릿

```markdown
---
layout: til
title: "오늘 배운 내용"
date: 2024-12-22
category: python  # data-engineering, python, database, java 중 선택
tags: [python, programming]
---

# 오늘 배운 내용

## 배운 내용
오늘 학습한 주요 내용을 요약해주세요.

## 상세 내용

### 개념 설명
학습한 개념에 대한 자세한 설명

### 코드 예시
```python
# 예시 코드
def example():
    print("Hello, TIL!")
```

## 핵심 포인트
- 중요한 학습 포인트 1
- 중요한 학습 포인트 2
- 중요한 학습 포인트 3

## 느낀 점
학습하면서 느낀 점이나 어려웠던 부분

## 다음 학습 계획
- 다음에 공부할 내용 1
- 다음에 공부할 내용 2

## 참고 자료
- [참고 링크 1](https://example.com)
- [참고 링크 2](https://example.com)
```

## 🎯 작성 팁

1. **제목**: 구체적이고 명확하게 작성
2. **태그**: 관련 키워드 3-5개 정도 선택
3. **코드**: 코드 블록 활용하여 가독성 향상
4. **구조화**: 제목과 소제목으로 내용 구조화
5. **개인적 의견**: 느낀 점과 다음 계획 포함

## 📁 새 카테고리 추가하기

새로운 카테고리가 필요한 경우:

1. `_til/` 하위에 새 디렉토리 생성
2. `pages/til.html`에 새 카테고리 카드 추가
3. `assets/css/styles.css`에 필요시 스타일 추가

예시:
```bash
mkdir _til/react
```

그 후 `pages/til.html`에 React 카테고리 카드를 추가하면 됩니다.

### 새 카테고리 추가 시 URL:
- `_til/react/2024-12-22-react-hooks.md` 
  → `/til/react/2024-12-22-react-hooks/`

## 🔍 카테고리별 TIL 링크

현재 사용 가능한 카테고리들:

- **데이터 엔지니어링**: [/til/data-engineering/](/til/data-engineering/)
- **파이썬**: [/til/python/](/til/python/) 
- **데이터베이스**: [/til/database/](/til/database/)
- **자바**: [/til/java/](/til/java/)

각 카테고리별로 개별 페이지는 없지만, 메인 TIL 페이지에서 필터링 기능을 통해 카테고리별로 볼 수 있습니다. 