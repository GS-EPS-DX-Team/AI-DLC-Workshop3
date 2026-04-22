# Requirement Verification Questions

> Please review each question and write your answer after the [Answer]: tag.
> Choose from the provided options or write your own under X) Other.
> Take your time -- thorough answers here prevent costly changes later.
>
> Context: The current codebase is an empty scaffold (React 18 + Vite frontend, localStorage for data).
> The backend has been removed. We need to understand what application to build on top of this scaffold.

---

## Functional Requirements

### Question 1: What is the primary purpose of this application?
What kind of product are we building?
A) Task/Todo management application
B) Note-taking / personal knowledge management
C) Personal finance / budget tracker
D) Habit or goal tracker
E) Inventory / item management
F) Scheduling / calendar / event planner
G) Contact / address book
X) Other: ___

[Answer]: X) 현업 담당자가 텍스트·음성·파일로 요구사항을 제출하면, AI가 주제 테마별로 자동 분류하고 구조화된 유저스토리(문장+목적+AC)로 변환하는 "AI 기반 요구사항 수집·유저스토리 자동 생성 도구"

### Question 2: Who are the target users?
A) Single user only (personal tool, no multi-user concept)
B) Small team (2-10 people, shared access via one browser)
C) Multiple independent users (each with their own separate data)
D) Both single-user and team modes supported
X) Other: ___

[Answer]: X) 두 역할이 존재. (1) 현업 담당자(운전원, 정비원, 관리자 등) — 요구사항을 제출하는 실무자. (2) PO(관리자) — 생성된 유저스토리를 검토·선택·출력하는 담당자. 인증/권한 관리는 Out of Scope이므로 역할 전환은 화면 단위로 구분.

### Question 3: What are the core entities/objects the application manages?
List the main "things" users create, read, update, and delete. For example: tasks, notes, projects, contacts, expenses.
A) Single entity type (e.g., only tasks, only notes)
B) Two entity types with a relationship (e.g., projects contain tasks)
C) Three or more entity types with relationships
D) Not yet decided -- let the design team propose
X) Other (describe the entities): ___

[Answer]: C) 세 가지 이상 엔티티. (1) 요구사항 입력(requirement_input) — 현업이 제출한 원본 텍스트/음성/파일. (2) 테마(theme) — AI가 분류한 주제 카테고리. (3) 유저스토리(user_story) — AI가 생성한 유저스토리 문장+목적+AC. 관계: requirement_input → (AI 분류) → theme → (AI 생성) → user_story

### Question 4: What CRUD operations are required for the primary entity?
A) Full CRUD: Create, Read (list + detail), Update, Delete
B) Create, Read, Update only (no delete)
C) Create and Read only (append-only log)
D) Read-only display with import/export capability
X) Other: ___

[Answer]: X) 엔티티별로 다름. requirement_input: Create + Read (현업이 입력, 수정 불가). theme/user_story: AI가 자동 생성 + PO가 Read + 체크 선택(select/deselect). PO의 유저스토리 직접 수정은 Out of Scope.

### Question 5: Is there a concept of categorization, tagging, or grouping?
A) Yes -- items belong to categories/folders/lists (hierarchical)
B) Yes -- items have free-form tags (flat, multi-tag)
C) Both categories and tags
D) No grouping needed
X) Other: ___

[Answer]: A) 유저스토리가 AI가 분류한 "테마(theme)"에 속하는 구조. 테마는 AI가 입력 내용 기반으로 자동 생성하며, 사전 정의 목록 없음. PO 검토 화면에서 테마별 필터/탭으로 그룹핑하여 조회.

### Question 6: Is search/filter functionality required?
A) Full-text search across all fields
B) Filter by specific fields only (e.g., status, category, date)
C) Both full-text search and field filtering
D) No search needed -- browse/scroll is sufficient
X) Other: ___

[Answer]: B) 테마별 필터링이 핵심. PO 검토 화면에서 테마 기준으로 유저스토리 목록을 필터링하여 조회.

### Question 7: Is sorting functionality required?
A) Yes -- user can sort by multiple fields (date, name, priority, etc.)
B) Yes -- fixed sort order only (e.g., newest first)
C) Drag-and-drop manual reordering
D) No sorting needed
X) Other: ___

[Answer]: B) 테마별 그룹 내에서 생성 순서(newest first)로 고정 정렬. PRD에 별도 정렬 요구사항 없음.

### Question 8: Is there a concept of item status or lifecycle?
For example: todo -> in-progress -> done, or draft -> published -> archived.
A) Yes -- simple two-state toggle (e.g., active/done, active/inactive)
B) Yes -- multi-step status workflow (3+ statuses)
C) No status concept -- items are just present or deleted
X) Other (describe states): ___

[Answer]: A) 유저스토리에 선택/미선택(selected/unselected) 토글. PO가 체크박스로 선택하면 산출물 출력 대상에 포함됨.

### Question 9: Is there a concept of priority or importance?
A) Yes -- numeric priority levels (1-5 or High/Medium/Low)
B) Yes -- starred/favorited items
C) Both priority levels and favorites
D) No priority concept
X) Other: ___

[Answer]: D) PRD에 우선순위 개념 없음. 유저스토리는 테마별 그룹핑만 존재.

### Question 10: Are dates or deadlines part of the domain?
A) Yes -- items have a due date / deadline
B) Yes -- items have both a start date and end date
C) Yes -- items are date-stamped (created/updated timestamps only)
D) No dates needed
X) Other: ___

[Answer]: C) 요구사항 입력 및 유저스토리 생성 시 created_at 타임스탬프만 필요. 마감일/기한 개념 없음.

### Question 11: Is there a dashboard or summary view?
A) Yes -- a home screen showing counts, progress, stats
B) Yes -- charts or graphs (e.g., completion rate over time)
C) Yes -- a simple list/overview only (no charts)
D) No dashboard -- go straight to the data list
X) Other: ___

[Answer]: D) 대시보드 없음. 현업 담당자는 입력 화면, PO는 유저스토리 검토 화면으로 바로 진입.

### Question 12: Is data import/export functionality required?
A) Yes -- export to CSV
B) Yes -- export to JSON
C) Yes -- import from CSV/JSON
D) Both import and export (CSV and/or JSON)
E) No import/export needed
X) Other: ___

[Answer]: X) 선택된 유저스토리의 목적·AC를 파일로 다운로드하는 기능 필요. 형식은 미정(CSV, PDF 등). 외부 데이터 임포트는 불필요.

### Question 13: Is there a notification or reminder system?
A) Yes -- browser notifications for upcoming deadlines
B) Yes -- in-app alerts/banners for overdue items
C) Both browser notifications and in-app alerts
D) No notifications needed
X) Other: ___

[Answer]: D) 알림/리마인더 불필요. 워크샵용 프로토타입으로 마감일 개념 없음.

---

## Non-Functional Requirements

### Question 14: What is the expected data volume per user?
A) Small: under 100 records total (personal/lightweight use)
B) Medium: 100-1000 records (regular daily use)
C) Large: 1000+ records (power user, archival use)
D) Unknown -- optimize for medium as default
X) Other: ___

[Answer]: A) 워크샵 실습용 프로토타입. 요구사항 입력 수십 건, 생성 유저스토리 수십~100건 이내.

### Question 15: What browsers and devices must be supported?
A) Desktop browsers only (Chrome, Firefox, Safari, Edge -- latest 2 versions)
B) Desktop + mobile browsers (responsive layout required)
C) Mobile-first design (primary use on phones/tablets)
D) Desktop only, one browser (Chrome only)
X) Other: ___

[Answer]: B) 현업 담당자는 현장에서 모바일로 음성/사진 입력 가능해야 하고, PO는 데스크톱에서 검토. 반응형 레이아웃 필요.

### Question 16: What are the performance expectations for page load and interaction?
A) Fast: initial load under 2 seconds, interactions under 100ms
B) Standard: initial load under 5 seconds, interactions under 500ms
C) No specific performance requirements
X) Other: ___

[Answer]: B) 워크샵용 프로토타입. AI 처리(분류·생성)는 LLM 호출 특성상 수 초 소요 허용, UI 인터랙션은 500ms 이내.

### Question 17: Is offline functionality required?
A) Yes -- full offline support (works without internet after first load)
B) Partial -- works offline but some features degrade gracefully
C) No -- online-only is acceptable (data is only in localStorage anyway)
X) Other: ___

[Answer]: C) AI(LLM) 호출이 핵심 기능이므로 온라인 필수. 오프라인 지원 불필요.

### Question 18: What are the data persistence and durability requirements?
Since data is stored in localStorage (browser-local, no server backup):
A) Acceptable -- users understand data is local/ephemeral
B) Export-based backup is sufficient (user manually exports)
C) Automatic periodic export/download as backup
D) This is a concern -- consider adding cloud sync in the future
X) Other: ___

[Answer]: A) 워크샵용 프로토타입이며 배포 후 폐기 예정. localStorage 기반 임시 저장으로 충분. 선택된 유저스토리는 파일 다운로드로 산출물 확보 가능.

### Question 19: Are there accessibility requirements?
A) WCAG 2.1 AA compliance required (full keyboard navigation, screen reader support)
B) Basic accessibility (semantic HTML, alt text, focus indicators)
C) No specific accessibility requirements
X) Other: ___

[Answer]: B) 기본 접근성. 시맨틱 HTML, alt text 정도. 워크샵 프로토타입이므로 WCAG 전체 준수는 불필요.

### Question 20: What is the internationalization (i18n) requirement?
The scaffold already has `lang="ko"` (Korean) in HTML.
A) Korean only
B) Korean primary, English secondary
C) English only
D) Multi-language support with i18n framework
X) Other: ___

[Answer]: A) 한국어 전용. 현업 담당자·PO 모두 한국어 사용자. i18n 프레임워크 불필요.

---

## User Scenarios

### Question 21: Describe the most important user journey (happy path).
What does a new user do first when they open the app?
A) See an empty state with a "Get Started" prompt, create their first item immediately
B) See a dashboard/summary first, then navigate to create items
C) See an onboarding wizard that explains the app
D) See a list view directly (assumes existing data or demo data)
X) Other: ___

[Answer]: X) 두 사용자 여정이 존재. (1) 현업 담당자: 입력 화면 진입 → 텍스트/음성/파일로 요구사항 제출 → 완료 메시지. (2) PO: 검토 화면 진입 → 테마별 유저스토리 목록 조회 → 항목 체크 선택 → 선택 항목 출력/다운로드.

### Question 22: What happens when there is no data yet (empty state)?
A) Show a friendly empty state illustration with a call-to-action button
B) Show a simple text message with a create button
C) Auto-populate with sample/demo data on first load
D) No special empty state -- just show an empty list
X) Other: ___

[Answer]: B) 현업 입력 화면: "요구사항을 입력해주세요" 안내 문구. PO 검토 화면: "아직 생성된 유저스토리가 없습니다" 메시지.

### Question 23: How should the app handle accidental deletion?
A) Soft delete with undo capability (trash/recycle bin concept)
B) Confirmation dialog before delete, no undo
C) No confirmation -- delete immediately
D) Archive instead of delete (items never truly deleted)
X) Other: ___

[Answer]: X) 삭제 기능 자체가 없음. 현업은 입력만 가능(수정/삭제 불가), PO는 선택/해제만 가능(삭제 불가). 이력/버전 관리도 Out of Scope.

### Question 24: Is bulk operations support needed?
A) Yes -- select multiple items, bulk delete/status change
B) Yes -- select all, bulk export
C) Both bulk edit and bulk export
D) No bulk operations -- one item at a time
X) Other: ___

[Answer]: B) PO가 테마 단위로 전체 선택/해제 후 일괄 출력·다운로드 가능해야 함.

---

## Business Context

### Question 25: What is the business goal or problem this app solves?
A) Personal productivity improvement (solo user tool)
B) Team coordination and transparency
C) Process automation / reducing manual work
D) Data tracking and reporting
E) This is a learning/demo project -- no specific business goal
X) Other: ___

[Answer]: C) PO가 현업 의견을 수작업으로 유저스토리로 변환하는 병목을 AI 자동화로 해소. 현업 의견 수집 파편화·맥락 손실·형식 불일치 문제를 해결.

### Question 26: What does success look like for this application?
A) User returns daily and completes tasks/actions
B) Data is reliably captured and retrievable
C) User saves measurable time compared to their current tool
D) Project demonstration or workshop completion
X) Other: ___

[Answer]: D) 워크샵 실습용 초안이며 배포 후 폐기 예정. 워크샵에서 AI 기반 요구사항→유저스토리 변환 플로우를 성공적으로 시연하는 것이 목표.

### Question 27: Is there a timeline or deadline for the first working version?
A) By end of this workshop session
B) Within 1 week
C) Within 1 month
D) No specific deadline
X) Other: ___

[Answer]: A) 워크샵 세션 내 완성 목표.

### Question 28: Are there competing tools the team wants to outperform or reference?
A) Yes -- a specific tool (describe in X)
B) No specific competitor, but inspired by common tools (Notion, Todoist, etc.)
C) Completely original concept
X) Other (name the reference tool): ___

[Answer]: C) 독자적 컨셉. 현업 멀티모달 입력 → AI 테마 분류 → 유저스토리 자동 생성이라는 고유 워크플로우.

---

## Technical Context

### Question 29: Should the application be a Single Page Application with client-side routing?
A) Yes -- full SPA with React Router (multiple pages/routes)
B) Yes -- SPA but single-page (no routing, everything on one screen)
C) Yes -- SPA with tab-based navigation (no URL routing)
D) Not decided -- recommend what is appropriate
X) Other: ___

[Answer]: C) 탭 기반 네비게이션. "요구사항 입력" 탭(현업용)과 "유저스토리 검토" 탭(PO용)으로 전환. URL 라우팅 불필요.

### Question 30: What UI component approach is preferred?
A) Custom CSS only (no UI library)
B) Tailwind CSS utility classes
C) A component library (Material UI, Shadcn/ui, Ant Design, etc.)
D) Minimal CSS Modules
X) Other: ___

[Answer]: B) Tailwind CSS. 빠른 프로토타이핑에 적합하고 반응형 레이아웃 구현 용이.

### Question 31: What is the state management approach?
Given localStorage as the data store:
A) React useState + useContext (simple, no external library)
B) Zustand (lightweight external state manager)
C) React Query + custom localStorage adapter
D) Redux Toolkit
E) Not decided -- recommend what is appropriate for the complexity
X) Other: ___

[Answer]: A) React useState + useContext. 엔티티 수가 적고 복잡한 상태 관리 불필요. localStorage로 데이터 영속화.

### Question 32: Should the codebase use TypeScript?
The scaffold currently uses plain JavaScript (JSX). The devDependencies include `@types/react` but no tsconfig exists.
A) Yes -- migrate to TypeScript (add tsconfig, rename files to .tsx)
B) No -- stay with JavaScript (JSX)
C) Partial -- new files in TypeScript, existing files unchanged
X) Other: ___

[Answer]: B) JavaScript(JSX) 유지. 워크샵 세션 내 완성 목표이므로 마이그레이션 비용 불필요.

### Question 33: Are there any specific third-party libraries already decided on?
A) No -- open to recommendations
B) Yes -- specific charting library (name in X)
C) Yes -- specific date handling library (dayjs, date-fns, etc.)
D) Multiple specific libraries (list in X)
X) Other: ___

[Answer]: A) 특별히 정해진 라이브러리 없음. AI 호출을 위한 LLM API 클라이언트(예: OpenAI SDK 또는 Anthropic SDK)가 필요할 수 있으나, 구현 시 결정.

### Question 34: What is the deployment target?
A) Local development only (no deployment needed)
B) GitHub Pages (static hosting)
C) Netlify or Vercel (static hosting with CI/CD)
D) AWS S3 + CloudFront
E) Not decided
X) Other: ___

[Answer]: A) 로컬 개발 환경에서만 실행. 워크샵 실습용이므로 별도 배포 불필요.

---

## Extensions

### Question 35: Security Baseline Extension
Should security extension rules be enforced for this project?
A) Yes -- enforce all SECURITY rules as blocking constraints (recommended for production-grade applications)
B) No -- skip all SECURITY rules (suitable for PoCs, prototypes, and experimental projects)
X) Other: ___

[Answer]: B) 워크샵 실습용 프로토타입이며 배포 후 폐기 예정. 보안 규칙 스킵.

### Question 36: Property-Based Testing Extension
Should property-based testing (PBT) rules be enforced for this project?
A) Yes -- enforce all PBT rules as blocking constraints (recommended for projects with business logic, data transformations, or stateful components)
B) Partial -- enforce PBT rules only for pure functions and serialization round-trips
C) No -- skip all PBT rules (suitable for simple CRUD applications or UI-only projects)
X) Other: ___

[Answer]: C) 워크샵 프로토타입이며 핵심 로직은 AI(LLM) 호출. PBT 규칙 스킵.
