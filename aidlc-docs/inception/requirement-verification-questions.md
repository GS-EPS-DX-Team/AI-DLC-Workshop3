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

[Answer]: X) AI 기반 요구사항 수집 및 유저스토리 자동 생성 도구. 현업 담당자가 텍스트/음성으로 요구사항을 자유롭게 입력하면, AI가 주제 테마별로 분류하고 유저스토리 초안을 자동 생성한다. PO(관리자)는 생성된 유저스토리를 검토/선택/출력한다.

### Question 2: Who are the target users?
A) Single user only (personal tool, no multi-user concept)
B) Small team (2-10 people, shared access via one browser)
C) Multiple independent users (each with their own separate data)
D) Both single-user and team modes supported
X) Other: ___

[Answer]: X) 두 역할: (1) 현업 담당자 — 요구사항을 텍스트/음성으로 입력하고 AI 추출 결과를 검증하는 사용자 페이지 이용, (2) PO(관리자) — 사용자가 입력한 요구사항과 유저스토리를 조회/검토하는 관리자 페이지 이용. 동일 브라우저에서 페이지 전환으로 역할 구분.

### Question 3: What are the core entities/objects the application manages?
List the main "things" users create, read, update, and delete. For example: tasks, notes, projects, contacts, expenses.
A) Single entity type (e.g., only tasks, only notes)
B) Two entity types with a relationship (e.g., projects contain tasks)
C) Three or more entity types with relationships
D) Not yet decided -- let the design team propose
X) Other (describe the entities): ___

[Answer]: X) 3개 엔티티: (1) 요구사항(requirements) — 현업 담당자의 원문 입력(텍스트/음성), (2) 테마(themes) — AI가 자동 분류한 주제 카테고리, (3) 유저스토리(user_stories) — AI가 생성한 구조화된 초안(유저스토리 문장 + 목적 + AC). 관계: 요구사항 → 테마별 분류 → 유저스토리 생성.

### Question 4: What CRUD operations are required for the primary entity?
A) Full CRUD: Create, Read (list + detail), Update, Delete
B) Create, Read, Update only (no delete)
C) Create and Read only (append-only log)
D) Read-only display with import/export capability
X) Other: ___

[Answer]: X) 현업 담당자: 요구사항 Create(입력) + Read(AI 추출 결과 확인) + Update(검증 승인/거부). PO(관리자): 유저스토리 Read(목록 조회) + 체크 선택 + 출력/다운로드. 또한 관리자는 요구사항을 특정 파일과 대조하여 시스템 지원 여부/개발 필요 여부를 판단한다.

### Question 5: Is there a concept of categorization, tagging, or grouping?
A) Yes -- items belong to categories/folders/lists (hierarchical)
B) Yes -- items have free-form tags (flat, multi-tag)
C) Both categories and tags
D) No grouping needed
X) Other: ___

[Answer]: A) 예 — AI가 요구사항을 주제 테마별로 자동 분류. 유저스토리는 테마(카테고리) 하위에 그룹핑된다.

### Question 6: Is search/filter functionality required?
A) Full-text search across all fields
B) Filter by specific fields only (e.g., status, category, date)
C) Both full-text search and field filtering
D) No search needed -- browse/scroll is sufficient
X) Other: ___

[Answer]: B) 관리자 페이지에서 테마별 필터링으로 유저스토리 목록 조회.

### Question 7: Is sorting functionality required?
A) Yes -- user can sort by multiple fields (date, name, priority, etc.)
B) Yes -- fixed sort order only (e.g., newest first)
C) Drag-and-drop manual reordering
D) No sorting needed
X) Other: ___

[Answer]: B) 최신 입력순 고정 정렬.

### Question 8: Is there a concept of item status or lifecycle?
For example: todo -> in-progress -> done, or draft -> published -> archived.
A) Yes -- simple two-state toggle (e.g., active/done, active/inactive)
B) Yes -- multi-step status workflow (3+ statuses)
C) No status concept -- items are just present or deleted
X) Other (describe states): ___

[Answer]: B) 3단계: 입력됨(submitted) → AI 분류/변환 완료(processed) → 사용자 검증 완료(verified). 사용자가 AI 추출 결과를 확인하고 검증해야 다음 단계로 진행.

### Question 9: Is there a concept of priority or importance?
A) Yes -- numeric priority levels (1-5 or High/Medium/Low)
B) Yes -- starred/favorited items
C) Both priority levels and favorites
D) No priority concept
X) Other: ___

[Answer]: D) 우선순위 개념 없음.

### Question 10: Are dates or deadlines part of the domain?
A) Yes -- items have a due date / deadline
B) Yes -- items have both a start date and end date
C) Yes -- items are date-stamped (created/updated timestamps only)
D) No dates needed
X) Other: ___

[Answer]: C) 생성/수정 타임스탬프만 기록.

### Question 11: Is there a dashboard or summary view?
A) Yes -- a home screen showing counts, progress, stats
B) Yes -- charts or graphs (e.g., completion rate over time)
C) Yes -- a simple list/overview only (no charts)
D) No dashboard -- go straight to the data list
X) Other: ___

[Answer]: X) 사용자 페이지: ChatGPT 스타일 대화형 인터페이스 (입력 → AI 응답 → 검증 흐름). 관리자 페이지: 테마별 유저스토리 목록 조회 + 시스템 지원/개발 필요 여부 표시.

### Question 12: Is data import/export functionality required?
A) Yes -- export to CSV
B) Yes -- export to JSON
C) Yes -- import from CSV/JSON
D) Both import and export (CSV and/or JSON)
E) No import/export needed
X) Other: ___

[Answer]: X) PO가 선택한 유저스토리의 목적 및 AC를 화면 출력 및 파일 다운로드 가능 (PRD에 명시된 기능).

### Question 13: Is there a notification or reminder system?
A) Yes -- browser notifications for upcoming deadlines
B) Yes -- in-app alerts/banners for overdue items
C) Both browser notifications and in-app alerts
D) No notifications needed
X) Other: ___

[Answer]: D) 알림 불필요.

---

## Non-Functional Requirements

### Question 14: What is the expected data volume per user?
A) Small: under 100 records total (personal/lightweight use)
B) Medium: 100-1000 records (regular daily use)
C) Large: 1000+ records (power user, archival use)
D) Unknown -- optimize for medium as default
X) Other: ___

[Answer]: A) Small — 워크샵 실습용으로 100건 이하 예상.

### Question 15: What browsers and devices must be supported?
A) Desktop browsers only (Chrome, Firefox, Safari, Edge -- latest 2 versions)
B) Desktop + mobile browsers (responsive layout required)
C) Mobile-first design (primary use on phones/tablets)
D) Desktop only, one browser (Chrome only)
X) Other: ___

[Answer]: B) Desktop + mobile browsers (반응형 레이아웃). ChatGPT 스타일 UI이므로 모바일에서도 자연스러운 사용 필요.

### Question 16: What are the performance expectations for page load and interaction?
A) Fast: initial load under 2 seconds, interactions under 100ms
B) Standard: initial load under 5 seconds, interactions under 500ms
C) No specific performance requirements
X) Other: ___

[Answer]: B) Standard — AI 응답 시간은 별도 (네트워크 의존).

### Question 17: Is offline functionality required?
A) Yes -- full offline support (works without internet after first load)
B) Partial -- works offline but some features degrade gracefully
C) No -- online-only is acceptable (data is only in localStorage anyway)
X) Other: ___

[Answer]: C) 온라인 전용 — AI 요구사항 추출 기능에 외부 API 호출 필요.

### Question 18: What are the data persistence and durability requirements?
Since data is stored in localStorage (browser-local, no server backup):
A) Acceptable -- users understand data is local/ephemeral
B) Export-based backup is sufficient (user manually exports)
C) Automatic periodic export/download as backup
D) This is a concern -- consider adding cloud sync in the future
X) Other: ___

[Answer]: A) Acceptable — 워크샵 실습용이므로 로컬 저장 수준이면 충분. 검증된 요구사항은 localStorage에 저장.

### Question 19: Are there accessibility requirements?
A) WCAG 2.1 AA compliance required (full keyboard navigation, screen reader support)
B) Basic accessibility (semantic HTML, alt text, focus indicators)
C) No specific accessibility requirements
X) Other: ___

[Answer]: B) 기본 접근성 (시맨틱 HTML, 포커스 인디케이터).

### Question 20: What is the internationalization (i18n) requirement?
The scaffold already has `lang="ko"` (Korean) in HTML.
A) Korean only
B) Korean primary, English secondary
C) English only
D) Multi-language support with i18n framework
X) Other: ___

[Answer]: A) Korean only.

---

## User Scenarios

### Question 21: Describe the most important user journey (happy path).
What does a new user do first when they open the app?
A) See an empty state with a "Get Started" prompt, create their first item immediately
B) See a dashboard/summary first, then navigate to create items
C) See an onboarding wizard that explains the app
D) See a list view directly (assumes existing data or demo data)
X) Other: ___

[Answer]: X) 사용자 페이지: ChatGPT 스타일 대화 인터페이스 진입 → 텍스트 또는 음성으로 요구사항 입력 → AI가 요구사항 추출/분류 결과 표시 → 사용자가 결과 검증(승인/수정) → 검증된 요구사항이 localStorage에 저장. 관리자 페이지: 저장된 요구사항/유저스토리 목록 조회 → 특정 파일 기반 시스템 지원 여부 확인 → 선택 후 출력/다운로드.

### Question 22: What happens when there is no data yet (empty state)?
A) Show a friendly empty state illustration with a call-to-action button
B) Show a simple text message with a create button
C) Auto-populate with sample/demo data on first load
D) No special empty state -- just show an empty list
X) Other: ___

[Answer]: X) ChatGPT 스타일 — 빈 대화 화면에 안내 메시지와 입력 프롬프트 표시 ("요구사항을 입력해주세요" 등).

### Question 23: How should the app handle accidental deletion?
A) Soft delete with undo capability (trash/recycle bin concept)
B) Confirmation dialog before delete, no undo
C) No confirmation -- delete immediately
D) Archive instead of delete (items never truly deleted)
X) Other: ___

[Answer]: B) 삭제 전 확인 다이얼로그.

### Question 24: Is bulk operations support needed?
A) Yes -- select multiple items, bulk delete/status change
B) Yes -- select all, bulk export
C) Both bulk edit and bulk export
D) No bulk operations -- one item at a time
X) Other: ___

[Answer]: X) PO(관리자)가 유저스토리를 체크박스로 다건 선택 후 일괄 출력/다운로드 (PRD에 명시).

---

## Business Context

### Question 25: What is the business goal or problem this app solves?
A) Personal productivity improvement (solo user tool)
B) Team coordination and transparency
C) Process automation / reducing manual work
D) Data tracking and reporting
E) This is a learning/demo project -- no specific business goal
X) Other: ___

[Answer]: C) 프로세스 자동화 — 현업 의견 수집의 파편화 해소 및 PO의 유저스토리 작성 병목 제거.

### Question 26: What does success look like for this application?
A) User returns daily and completes tasks/actions
B) Data is reliably captured and retrievable
C) User saves measurable time compared to their current tool
D) Project demonstration or workshop completion
X) Other: ___

[Answer]: D) 워크샵 실습 완료 및 데모 시연. 현업 담당자가 요구사항을 입력하고 PO가 유저스토리를 확인/출력하는 흐름이 동작하면 성공.

### Question 27: Is there a timeline or deadline for the first working version?
A) By end of this workshop session
B) Within 1 week
C) Within 1 month
D) No specific deadline
X) Other: ___

[Answer]: A) 이번 워크샵 세션 내 완료.

### Question 28: Are there competing tools the team wants to outperform or reference?
A) Yes -- a specific tool (describe in X)
B) No specific competitor, but inspired by common tools (Notion, Todoist, etc.)
C) Completely original concept
X) Other (name the reference tool): ___

[Answer]: X) 사용자 페이지 UI는 ChatGPT(https://chatgpt.com/) 스타일을 참고. 대화형 입력 인터페이스.

---

## Technical Context

### Question 29: Should the application be a Single Page Application with client-side routing?
A) Yes -- full SPA with React Router (multiple pages/routes)
B) Yes -- SPA but single-page (no routing, everything on one screen)
C) Yes -- SPA with tab-based navigation (no URL routing)
D) Not decided -- recommend what is appropriate
X) Other: ___

[Answer]: A) React Router 기반 SPA — 사용자 페이지(/user)와 관리자 페이지(/admin) 최소 2개 라우트 필요.

### Question 30: What UI component approach is preferred?
A) Custom CSS only (no UI library)
B) Tailwind CSS utility classes
C) A component library (Material UI, Shadcn/ui, Ant Design, etc.)
D) Minimal CSS Modules
X) Other: ___

[Answer]: B) Tailwind CSS — ChatGPT 스타일 UI를 빠르게 구현하기에 적합.

### Question 31: What is the state management approach?
Given localStorage as the data store:
A) React useState + useContext (simple, no external library)
B) Zustand (lightweight external state manager)
C) React Query + custom localStorage adapter
D) Redux Toolkit
E) Not decided -- recommend what is appropriate for the complexity
X) Other: ___

[Answer]: A) React useState + useContext — 워크샵 실습 규모에 적합하며 외부 의존성 최소화.

### Question 32: Should the codebase use TypeScript?
The scaffold currently uses plain JavaScript (JSX). The devDependencies include `@types/react` but no tsconfig exists.
A) Yes -- migrate to TypeScript (add tsconfig, rename files to .tsx)
B) No -- stay with JavaScript (JSX)
C) Partial -- new files in TypeScript, existing files unchanged
X) Other: ___

[Answer]: B) JavaScript(JSX) 유지 — 워크샵 실습 시간 내 완료 우선.

### Question 33: Are there any specific third-party libraries already decided on?
A) No -- open to recommendations
B) Yes -- specific charting library (name in X)
C) Yes -- specific date handling library (dayjs, date-fns, etc.)
D) Multiple specific libraries (list in X)
X) Other: ___

[Answer]: X) Web Speech API(브라우저 내장, 음성 입력용), react-router-dom(라우팅), tailwindcss(스타일링). AI 요구사항 추출을 위한 외부 API 연동 필요 (구체적 서비스 미정).

### Question 34: What is the deployment target?
A) Local development only (no deployment needed)
B) GitHub Pages (static hosting)
C) Netlify or Vercel (static hosting with CI/CD)
D) AWS S3 + CloudFront
E) Not decided
X) Other: ___

[Answer]: A) 로컬 개발 환경에서만 실행 (워크샵 실습용).

---

## Extensions

### Question 35: Security Baseline Extension
Should security extension rules be enforced for this project?
A) Yes -- enforce all SECURITY rules as blocking constraints (recommended for production-grade applications)
B) No -- skip all SECURITY rules (suitable for PoCs, prototypes, and experimental projects)
X) Other: ___

[Answer]: B) No — 워크샵 실습용 프로토타입.

### Question 36: Property-Based Testing Extension
Should property-based testing (PBT) rules be enforced for this project?
A) Yes -- enforce all PBT rules as blocking constraints (recommended for projects with business logic, data transformations, or stateful components)
B) Partial -- enforce PBT rules only for pure functions and serialization round-trips
C) No -- skip all PBT rules (suitable for simple CRUD applications or UI-only projects)
X) Other: ___

[Answer]: C) No — 워크샵 실습용, UI 중심 프로젝트.
