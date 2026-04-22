# Component Inventory

## Component Classification

### Core (Business Logic, Domain Models)
**없음.** 비즈니스 로직 및 도메인 모델 미구현.

### Data (Storage, Data Access)
**없음.** localStorage 추상화 계층 미구현. 향후 `storage/` 디렉토리에서 관리 예정.

### Infrastructure
**없음.** 인프라 코드, Docker, CI/CD 없음.

### Integration (External Services)
**없음.** 외부 서비스 연동 없음.

### Shared (Utilities)
**없음.** 공유 유틸리티 모듈 없음.

### Test
**없음.** 테스트 파일, 설정, 의존성 없음.

### Presentation (Frontend UI)

| Component | File | Description |
|-----------|------|-------------|
| HTML Shell | `frontend/index.html` | 진입 HTML, root div 및 모듈 스크립트 로더 |
| React Bootstrap | `frontend/src/main.jsx` | React root 생성, StrictMode로 App 렌더링 |
| App Component | `frontend/src/App.jsx` | 루트 컴포넌트 — `<div>App</div>` 플레이스홀더 |

### Build & Configuration

| Component | File | Description |
|-----------|------|-------------|
| Node Package Config | `frontend/package.json` | React, React DOM, Vite 의존성 |
| Vite Config | `frontend/vite.config.js` | 개발 서버 포트(3000), React 플러그인 |
| Git Ignore | `.gitignore` | Node, IDE, OS 아티팩트 패턴 |

## Summary

| Category | Count | Status |
|----------|-------|--------|
| Core | 0 | 비어있음 |
| Data | 0 | 비어있음 (localStorage 추상화 예정) |
| Infrastructure | 0 | 비어있음 |
| Integration | 0 | 비어있음 |
| Shared | 0 | 비어있음 |
| Test | 0 | 비어있음 |
| Presentation | 3 | 스캐폴드 (UI 없음) |
| Build & Config | 3 | 동작 중 |
| **Total** | **6** | **스캐폴드** |
