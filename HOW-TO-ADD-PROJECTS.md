# 프로젝트 포트폴리오 작성 가이드

## 📁 디렉토리 구조

프로젝트는 `_projects/` 디렉토리에 저장됩니다:

```
_projects/
├── retro-terminal-blog.md
├── todo-terminal-ui.md
├── ascii-art-generator.md
└── 새프로젝트명.md
```

## 📝 새 프로젝트 추가하기

### 1. 파일 생성 위치
모든 프로젝트는 `_projects/` 디렉토리에 생성합니다:

```bash
_projects/프로젝트명.md
```

### 2. 파일명 규칙
- **형식**: `프로젝트명.md`
- **예시**: `weather-app.md`, `blog-cms.md`, `data-dashboard.md`
- **규칙**: 
  - 영어로 작성, 소문자 사용
  - 단어 사이는 하이픈(-) 사용
  - 날짜는 포함하지 않음

### 3. Front Matter 설정

```yaml
---
title: "프로젝트 제목"
tech_stack: "사용한 기술스택"
github_url: "https://github.com/HyupTree/repository-name"
demo_url: "https://demo-site.com"
status: "진행중"  # 진행중, 완성, 중단
featured: true    # 메인 페이지 노출 여부
order: 1         # 정렬 순서 (낮을수록 먼저 표시)
---
```

#### Front Matter 필드 설명:
- **title**: 프로젝트 제목 (필수)
- **tech_stack**: 사용된 기술 스택 (필수)
- **github_url**: GitHub 레포지토리 URL (필수)
- **demo_url**: 데모/배포 URL (선택사항)
- **status**: 프로젝트 상태 (필수)
- **featured**: 메인 페이지 featured 프로젝트 여부 (선택사항)
- **order**: 표시 순서, 숫자가 낮을수록 먼저 표시 (선택사항)

### 4. 프로젝트 상태 가이드

#### 상태 옵션:
- `진행중` - 현재 개발 중인 프로젝트
- `완성` - 완료된 프로젝트
- `중단` - 중단된 프로젝트
- `계획` - 계획 단계의 프로젝트

#### Featured 프로젝트:
- `featured: true` - 메인 페이지에 하이라이트 표시
- 최대 3-4개 프로젝트만 featured로 설정 권장

## 📋 프로젝트 템플릿

```markdown
---
title: "날씨 대시보드 앱"
tech_stack: "React, TypeScript, OpenWeather API, Tailwind CSS"
github_url: "https://github.com/HyupTree/weather-dashboard"
demo_url: "https://weather-dashboard-demo.vercel.app"
status: "완성"
featured: true
order: 2
---

실시간 날씨 정보를 제공하는 반응형 웹 애플리케이션입니다.
OpenWeather API를 활용하여 현재 날씨, 5일 예보, 시간별 예보를 제공하며,
사용자의 위치 기반 날씨 정보와 즐겨찾기 도시 기능을 구현했습니다.

## 주요 기능
- 🌍 위치 기반 자동 날씨 조회
- 📊 시각화된 날씨 데이터 (차트)
- ⭐ 즐겨찾기 도시 관리
- 📱 완전 반응형 디자인
- 🌙 다크 모드 지원

## 기술적 도전
- TypeScript를 활용한 타입 안전성 확보
- API 응답 캐싱으로 성능 최적화
- PWA 기능으로 오프라인 지원
- Tailwind CSS 커스터마이징

## 성과
- 사용자 위치 기반 정확한 날씨 정보 제공
- 모바일 친화적 UI/UX 구현
- API 호출 최적화로 빠른 로딩 속도 달성
```

## 🎯 작성 팁

### 프로젝트 설명 가이드:
1. **첫 문단**: 프로젝트 개요와 핵심 기능을 간결하게
2. **주요 기능**: 사용자가 경험할 수 있는 기능들
3. **기술적 도전**: 개발 과정에서 해결한 기술적 문제들
4. **성과/결과**: 프로젝트의 성취와 결과물

### 기술 스택 작성법:
- **프론트엔드**: React, Vue.js, Angular, HTML/CSS/JS
- **백엔드**: Node.js, Python, Java, Spring Boot
- **데이터베이스**: MySQL, PostgreSQL, MongoDB, Redis
- **배포/인프라**: AWS, Vercel, Netlify, Docker
- **도구**: Git, Webpack, ESLint, Jest

### 설명 작성 방향:
- **문제점**: 어떤 문제를 해결하려고 했는지
- **해결방안**: 어떤 기술과 방법으로 해결했는지
- **결과**: 최종적으로 어떤 성과를 얻었는지

## 📱 이미지 및 미디어 추가

### 프로젝트 스크린샷 저장 위치:
```
assets/images/projects/프로젝트명/
├── thumbnail.png        # 썸네일 이미지
├── main-screenshot.png  # 메인 스크린샷
├── mobile-view.png      # 모바일 뷰
└── feature-demo.gif     # 기능 시연 GIF
```

### 마크다운에서 이미지 사용:
```markdown
![프로젝트 메인 화면](/assets/images/projects/weather-dashboard/main-screenshot.png)

![모바일 반응형 디자인](/assets/images/projects/weather-dashboard/mobile-view.png)
```

## 🔗 링크 관리

### GitHub 레포지토리:
- 레포지토리가 공개되어 있는지 확인
- README.md가 잘 작성되어 있는지 확인
- 코드에 주석이 적절히 포함되어 있는지 확인

### 데모 사이트:
- 배포된 사이트가 정상 작동하는지 확인
- 모바일에서도 제대로 표시되는지 확인
- HTTPS 적용 여부 확인

## 📊 프로젝트 카테고리별 예시

### 웹 애플리케이션
```yaml
title: "Todo List Manager"
tech_stack: "React, Node.js, MongoDB, Express"
status: "완성"
```

### 모바일 앱
```yaml
title: "날씨 앱"
tech_stack: "React Native, Expo, AsyncStorage"
status: "진행중"
```

### 데이터 프로젝트
```yaml
title: "주식 데이터 분석 대시보드"
tech_stack: "Python, Pandas, Dash, PostgreSQL"
status: "완성"
```

### 오픈소스 기여
```yaml
title: "React Hook Library"
tech_stack: "TypeScript, React, Jest, Rollup"
status: "진행중"
```

## 🎨 프로젝트 표시 순서

### Order 값 가이드:
- **1-3**: 최신이고 가장 중요한 프로젝트
- **4-6**: 완성도 높은 중요 프로젝트  
- **7-10**: 학습 목적 또는 실험적 프로젝트
- **11+**: 아카이브 성격의 이전 프로젝트

### Featured 프로젝트 선정 기준:
- 완성도가 높은 프로젝트
- 기술적 도전이 포함된 프로젝트
- 실제 사용 가능한 서비스
- 개인 브랜딩에 도움이 되는 프로젝트

## 📋 체크리스트

프로젝트 추가 전 확인사항:
- [ ] GitHub 레포지토리가 공개되어 있는가?
- [ ] README.md가 잘 작성되어 있는가?
- [ ] 데모 URL이 정상 작동하는가?
- [ ] 프로젝트 설명이 명확하고 간결한가?
- [ ] 기술 스택이 정확하게 명시되었는가?
- [ ] 스크린샷이나 데모 이미지가 포함되었는가?
- [ ] 프로젝트 상태가 현재 상황과 일치하는가?

## 🔄 프로젝트 업데이트

기존 프로젝트를 업데이트할 때:
1. 진행 상황에 따라 `status` 필드 업데이트
2. 새로운 기능 추가 시 설명 보완
3. 데모 URL 변경 시 링크 업데이트
4. 버전 업그레이드 시 기술 스택 정보 갱신 