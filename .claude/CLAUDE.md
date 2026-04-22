# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

AIDLC (AI-Driven Development Life Cycle) framework for Claude Code. Uses agents, skills, and hooks to deliver systematic software development through a three-phase adaptive workflow. This workspace starts empty — application code is generated during the CONSTRUCTION phase.

## Workflow State

- **State file**: `aidlc-docs/aidlc-state.md` (current Phase, Stage, progress)
- **Audit log**: `aidlc-docs/audit.md` (all gate approvals, agent activity records)

## Phase Model

| Phase | Description |
|-------|-------------|
| **INCEPTION** | Project discovery, requirements analysis, user stories, application design, unit decomposition, workflow planning |
| **CONSTRUCTION** | Functional design, NFR design, infrastructure design, code generation, code review, build/test |
| **OPERATIONS** | Deployment, monitoring, maintenance (future expansion) |

## Workflow Routing (Automatic Progression)

When a development-related request comes in, the AIDLC workflow is followed automatically. Natural language works -- no slash commands required.

### New Project or Feature Request
When the user says "build me X", "I want to create Y", "let's develop Z", etc.:
1. Check if `aidlc-docs/aidlc-state.md` exists
2. If not found → run Workspace Detection automatically → enter Requirements Analysis
3. If found → read current state and continue from the next pending stage

### Automatic Stage Transitions
When a stage receives team approval ("Approve & Continue"), the next stage is automatically recommended and initiated:
- Workspace Detection → Requirements Analysis → User Stories → Application Design → Units Generation → Workflow Planning
- Construction follows execution-plan.md, running only stages marked EXECUTE in order

### Slash Commands = Direct Control
`/aidlc-*` commands are used to directly target or re-run a specific stage:
- Re-run a specific stage: `/aidlc-requirements`
- Add a skipped stage: `/aidlc-stories`
- Check status: `/aidlc-status`
- Manually run quality gate: `/aidlc-gate [unit]`

## Gate Rules

- Each stage requires explicit team approval ("Approve") before proceeding
- All questions are written in dedicated .md files (never asked in chat)
- Cannot proceed if any `[Answer]:` tag is empty or contains vague answers
- Cannot advance to the next stage while ambiguity remains unresolved
- "When in doubt, ask the question" -- over-clarification is always better than wrong assumptions

## File Conventions

| Type | Location |
|------|----------|
| Application code | Workspace root (`./`) |
| All documents/artifacts | `aidlc-docs/` |
| Phase plans | `aidlc-docs/{phase}/plans/` |
| Question files | Same directory as related artifacts |

## Agent Delegation

| Agent | Purpose |
|-------|---------|
| **aidlc-analyst** | All Inception stages + Construction functional/NFR design. Question generation, ambiguity analysis, design document creation. No Bash access |
| **aidlc-architect** | Infrastructure design. Maps logical components to AWS services with Bash + MCP tool access for AWS CLI, documentation, pricing, and IaC validation |
| **aidlc-developer** | Construction code generation. Plan creation and code writing based on approved designs. Full tool access |
| **aidlc-reviewer** | Construction verification. Code review (GO/NO-GO), build/test (PASS/FAIL). Read-only -- cannot modify code |

## Available Slash Commands

| Command | Description |
|---------|-------------|
| `/aidlc-detect` | Workspace detection and AIDLC initialization |
| `/aidlc-reverse` | Reverse engineering analysis of existing codebase |
| `/aidlc-requirements` | Requirements analysis and question generation |
| `/aidlc-stories` | User story development |
| `/aidlc-app-design` | Application architecture design |
| `/aidlc-units` | Development unit decomposition |
| `/aidlc-plan` | Workflow execution plan creation |
| `/aidlc-functional` | Functional design (Construction) |
| `/aidlc-nfr` | Non-functional requirements analysis and design |
| `/aidlc-infra` | Infrastructure design |
| `/aidlc-code` | Code generation execution |
| `/aidlc-test` | Build and test execution |
| `/aidlc-gate` | Quality gate review and approval |
| `/aidlc-status` | Current workflow status dashboard |

## Extensions

Optional rule sets that can be enabled during Requirements Analysis via opt-in questions:
- **Security Baseline**: Blocking security constraints (encryption, logging, auth, input validation, secrets management)
- **Property-Based Testing**: PBT rules for round-trip, invariant, and idempotence testing

Extensions are activated by creating marker files in `aidlc-docs/extensions/`. Corresponding rules in `.claude/rules/aidlc-ext-*.md` use `paths` frontmatter for conditional loading.

## Adaptive Depth

The list of artifacts stays the same, but the depth of each artifact adjusts based on project complexity.
A simple bug fix gets concise artifacts; a system migration gets comprehensive ones with full traceability.

## Session Resumption

On session start or resumption, always:
1. Read `aidlc-docs/aidlc-state.md` to determine current Phase/Stage
2. Check `*-questions.md` files for unanswered items
3. Continue from where work was interrupted

## 기술 스택

- **프론트엔드**: React 18 + Vite (포트 3000)
- **백엔드**: FastAPI + Uvicorn (포트 8000)
- **데이터베이스**: SQLite (파일: `db.sqlite3`)

## 프로젝트 구조

```
backend/           — FastAPI 백엔드
  main.py          — 앱 진입점, 라우터 등록
  database.py      — SQLite 연결, 트랜잭션 관리
frontend/          — React 프론트엔드 (Vite)
  src/App.jsx      — 루트 컴포넌트
aidlc-docs/        — 모든 문서·산출물 (AIDLC + 요구사항 명세)
  prd/             — 전체 제품 요구사항 명세
  scr/             — 화면 명세
  api/             — 백엔드 API 명세
  db/              — DB 명세 (용어 기준 문서, Single Source of Truth)
    schema.md      — 테이블 정의, ER 다이어그램, 용어 매핑
```

## 개발 명령어

```bash
# 백엔드
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# 프론트엔드
cd frontend
npm install
npm run dev          # http://localhost:3000
npm run build        # 프로덕션 빌드 → dist/
```

프론트엔드 개발 서버는 `/api/*` 요청을 백엔드(8000)로 프록시합니다.

## 문서 작성 규칙

- **용어 통일**: 모든 문서에서 사용하는 엔티티·필드명은 `aidlc-docs/db/schema.md`의 테이블명·컬럼명을 기준
- **ID 체계**: PRD-001, SCR-001, API-001 순번 부여
- **DB 네이밍**: 테이블 snake_case 복수형, 컬럼 snake_case, 외래키 `{참조테이블_단수}_id`

## Getting Started

1. Run `/aidlc-detect` (or describe what you want to build — the workflow starts automatically)
2. Follow the INCEPTION stages: Detection → Requirements → Stories → Design → Units → Planning
3. CONSTRUCTION stages execute per-unit based on the workflow plan
