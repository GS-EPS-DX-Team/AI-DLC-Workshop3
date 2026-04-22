# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 기술 스택

- **프론트엔드**: React 18 + Vite (포트 3000)
- **데이터 저장**: localStorage (브라우저 로컬, 백엔드 없음)

## 개발 명령어

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드 → dist/
```

## 아키텍처

- `frontend/` — React SPA (Vite), 데이터는 localStorage로 관리
- 데이터 접근은 커스텀 훅(`useStorage` 등)으로 추상화하여 향후 백엔드 전환에 대비

## 문서 규칙

모든 명세는 `aidlc-docs/` 하위에서 관리합니다:

| 디렉토리 | 용도 |
|---------|------|
| `aidlc-docs/prd/` | 전체 제품 요구사항 명세 (PRD-001~) |
| `aidlc-docs/scr/` | 화면 명세 (SCR-001~) |
| `aidlc-docs/db/` | 용어 사전 — **프로젝트 전체 용어의 기준(Single Source of Truth)** |

- **용어 통일**: 모든 문서의 엔티티·필드명은 `aidlc-docs/db/schema.md`의 용어 매핑 기준
- **네이밍**: 엔티티 snake_case 복수형, 필드 snake_case

## AIDLC 워크플로우

AIDLC(AI-Driven Development Life Cycle) 3단계 적응형 개발 프레임워크입니다.

- **상태 파일**: `aidlc-docs/aidlc-state.md` (현재 Phase/Stage 진행 상황)
- **감사 로그**: `aidlc-docs/audit.md`

| Phase | 설명 |
|-------|------|
| **INCEPTION** | 요구사항 분석 → 유저 스토리 → 설계 → 유닛 분해 → 워크플로우 계획 |
| **CONSTRUCTION** | 기능 설계, NFR, 인프라, 코드 생성, 리뷰, 빌드/테스트 (유닛별) |
| **OPERATIONS** | 배포, 모니터링 (향후 확장) |

개발 요청 시 자동으로 워크플로우가 시작됩니다. `/aidlc-*` 명령으로 특정 단계를 직접 실행할 수도 있습니다.

### 주요 규칙

- 각 단계는 팀 승인("Approve") 후 다음 단계로 진행
- 질문은 전용 `.md` 파일에 작성 (채팅에서 직접 묻지 않음)
- `[Answer]:` 태그가 비어있거나 모호하면 다음 단계 진행 불가

### 에이전트 역할

| 에이전트 | 역할 |
|---------|------|
| `aidlc-analyst` | Inception 전 단계 + Construction 설계. Bash 접근 불가 |
| `aidlc-architect` | 인프라 설계. AWS 서비스 매핑, Bash/MCP 접근 가능 |
| `aidlc-developer` | 코드 생성. 승인된 설계 기반 구현. 전체 도구 접근 |
| `aidlc-reviewer` | 코드 리뷰(GO/NO-GO), 빌드/테스트(PASS/FAIL). 읽기 전용 |

### 세션 재개

1. `aidlc-docs/aidlc-state.md` 읽어 현재 Phase/Stage 확인
2. `*-questions.md` 파일에서 미답변 항목 확인
3. 중단된 지점부터 계속 진행
