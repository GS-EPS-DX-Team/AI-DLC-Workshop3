# Technology Stack

## Languages

| Language | Version | Usage Scope |
|----------|---------|-------------|
| JavaScript (JSX) | ES2015+ (ESM modules) | Frontend SPA |

## Frameworks

| Framework | Version | Purpose |
|-----------|---------|---------|
| React | ^18.3.1 | Frontend UI 라이브러리 |
| React DOM | ^18.3.1 | React 브라우저 렌더링 |

## Runtime & Build

| Tool | Version | Purpose |
|------|---------|---------|
| Vite | ^6.0.0 | 프론트엔드 개발 서버 및 빌드 도구 |
| @vitejs/plugin-react | ^4.3.4 | React JSX 변환 및 Fast Refresh |

## Data Storage

| Technology | Purpose |
|------------|---------|
| localStorage | 브라우저 로컬 데이터 영속화 (5MB 제한) |

## Infrastructure

인프라 기술 없음:
- Docker / 컨테이너 없음
- CI/CD 파이프라인 없음
- 배포 스크립트 없음

## Build & Package Management

| Tool | Config File | Purpose |
|------|------------|---------|
| npm | `frontend/package.json` | Node.js 의존성 관리 |
| Vite | `frontend/vite.config.js` | 프론트엔드 번들링 및 개발 서버 |

## Testing

테스트 도구 미설정:
- Jest, Vitest, React Testing Library 등 미구성
- 테스트 디렉토리 및 파일 없음

## Code Quality & Development Tools

코드 품질 도구 미설정:
- 린터 (ESLint) 없음
- 포맷터 (Prettier) 없음
- 타입 체커 없음
- pre-commit 훅 없음
