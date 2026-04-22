# Application Design Questions

> Please review each question and write your answer after the [Answer]: tag.
> Choose from the provided options or write your own under X) Other.
> These questions clarify design decisions needed before generating the application architecture, screen specs, and business rules.

---

## Question 1: Admin Detail View -- Modal or Separate Page?

When the PO clicks a user story in the admin list, how should the detail be displayed?
(US-015 requires a detail view with story sentence, purpose, AC, and source requirement.)

A) Modal/overlay dialog on top of the list -- PO stays on the same page, closes modal to return to list
B) Slide-in side panel -- detail appears on the right side while the list remains visible (master-detail layout)
C) Separate route/page (/admin/:id) -- full page navigation to the detail view with a back button
X) Other (describe your preference)

[Answer]: A) 모달/오버레이 — 목록에서 바로 확인하고 닫을 수 있어 빠르게 검토 가능.

---

## Question 2: Export File Format

What format should the exported user story file use? (US-019 requires a downloadable file with story, purpose, AC, theme, and source requirement.)

A) Markdown (.md) -- structured headings and lists, readable in any text editor
B) Plain text (.txt) -- simple formatted text
C) CSV (.csv) -- one row per story, columns for each field, openable in Excel
D) JSON (.json) -- structured data format, useful for integration
X) Other (describe your preference)

[Answer]: A) Markdown (.md) — 구조화된 형식으로 가독성 좋고 어디서든 열 수 있음.

---

## Question 3: System Support Analysis -- Reference File Source

The PO needs to compare requirements against a "reference file" to determine system support status (US-016). How does this reference file get into the system?

A) PO uploads a reference file (text/markdown/JSON) through the admin UI, and the app (or AI) compares each story against its content
B) Reference file is pre-loaded/hardcoded in the application as a static asset (e.g., a JSON file in the project)
C) PO manually tags each story as "system-supported" or "needs development" via toggle buttons (no file comparison, manual decision)
D) The AI determines system support status during the initial extraction/story generation phase (no separate reference file needed)
X) Other (describe your preference)

[Answer]: A) PO가 관리자 페이지에서 참조 파일(텍스트/마크다운/JSON)을 업로드하면, AI가 각 유저스토리와 비교하여 시스템 지원/개발 필요 여부를 판단.

---

## Question 4: AI API Integration Approach

The AI features (extraction, classification, story generation) need an external API. Since the specific AI service is undecided, how should the integration be designed?

A) Placeholder/mock implementation -- hardcoded sample responses for now, with a clearly defined service interface that can be swapped later
B) OpenAI-compatible API integration -- build against the OpenAI chat completions API format, configurable via environment variable for the API key
C) Generic adapter pattern -- define an abstract AI service interface with one concrete implementation (e.g., OpenAI) that can be replaced
X) Other (describe your preference)

[Answer]: B) OpenAI 호환 API — API 키를 환경변수로 설정하여 사용. 가장 범용적인 포맷.

---

## Question 5: Preview Modal Scope

When the PO previews selected stories before export (US-020), what should the preview look like?

A) Full-screen modal showing all selected stories in the export format (exactly what the downloaded file will contain)
B) Side panel preview showing a summary of selected stories with a download button
C) A new page/route (/admin/preview) that renders the export content
X) Other (describe your preference)

[Answer]: A) 풀스크린 모달 — 다운로드될 내용을 그대로 미리 확인 가능.

---

## Question 6: Navigation Style

What navigation pattern should be used to switch between /user and /admin? (US-022)

A) Top header navigation bar with "사용자" and "관리자" links on the right side, app title on the left
B) Side navigation (sidebar) with links, collapsible on mobile
C) Bottom tab bar (mobile-app style)
D) Minimal top-left logo/title that acts as home, with a simple toggle or dropdown for page switching
X) Other (describe your preference)

[Answer]: A) 상단 헤더 네비게이션 바 — 왼쪽에 앱 타이틀, 오른쪽에 "사용자"/"관리자" 링크.

---

## Question 7: Conversation Persistence Across Sessions

Should the user page conversation history persist across browser refreshes? (US-012 says "within the current session")

A) Session only -- conversation resets on page refresh; only verified/approved data persists in localStorage
B) Full persistence -- entire conversation history (including unverified items) is saved to localStorage and restored on refresh
C) Partial persistence -- conversation history is saved but cleared when the user starts a new conversation (via a "new chat" button)
X) Other (describe your preference)

[Answer]: C) 부분 저장 — 대화 히스토리는 localStorage에 저장되지만 "새 대화" 버튼으로 초기화 가능. ChatGPT 스타일과 일관성 유지.
