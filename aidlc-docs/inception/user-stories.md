# User Stories -- "말해 뭐해"

> Version: v1.0
> Date: 2026-04-22
> Stage: INCEPTION / User Stories
> Source: raw-prd.md, requirement-verification-questions.md (36 verified answers)

---

## Roles

| Role ID | Role Name | Korean | Description |
|---------|-----------|--------|-------------|
| R-01 | Field Staff | 현업 담당자 | Submits requirements via text/voice and verifies AI extraction results |
| R-02 | Product Owner | PO (관리자) | Reviews requirements and user stories, determines system support, exports selected stories |

---

## Epic 1: 요구사항 입력 (Requirement Input)

Covers the field staff's ability to submit requirements through a ChatGPT-style conversational interface using text and voice input.

### US-001: ChatGPT-style Conversational Interface

**As a** field staff member,
**I want** a ChatGPT-style conversational interface on the user page,
**so that** I can submit requirements naturally without worrying about format or structure.

**Acceptance Criteria:**

- **AC-1**: Given the user navigates to `/user`, When the page loads, Then a chat-style interface is displayed with a message input area at the bottom and a conversation area above it.
- **AC-2**: Given the conversation area is empty (no prior messages), When the page loads, Then a welcome/guidance message is displayed (e.g., "요구사항을 자유롭게 입력해주세요").
- **AC-3**: Given the user is on the user page, When the user types text and presses Enter or clicks the send button, Then the message appears in the conversation area as a user message bubble.
- **AC-4**: Given the interface is displayed, When the user interacts with it, Then the layout follows the ChatGPT (chatgpt.com) conversational pattern: user messages on the right, AI responses on the left.

**Priority:** Must
**Related Requirements:** Q1, Q11, Q21, Q22, Q28

---

### US-002: Text-based Requirement Input

**As a** field staff member,
**I want** to type my requirements as free-form text in the chat input,
**so that** I can quickly describe my needs, problems, or improvement suggestions.

**Acceptance Criteria:**

- **AC-1**: Given the user page is displayed, When the user types text into the input field, Then the input field accepts multi-line free-form text.
- **AC-2**: Given the user has typed a requirement, When the user presses Enter (or clicks send), Then the text is submitted and displayed as a user message in the conversation.
- **AC-3**: Given the user submits text, When the submission is successful, Then a new requirement record is created with status "submitted" and a created_at timestamp.
- **AC-4**: Given the input field is empty, When the user attempts to submit, Then the submit action is prevented (no empty submissions).

**Priority:** Must
**Related Requirements:** Q1, Q3, Q4, Q8, Q10, PRD Section 5 (In Scope)

---

### US-003: Voice-based Requirement Input

**As a** field staff member,
**I want** to input requirements using my voice via a microphone button,
**so that** I can conveniently describe requirements hands-free, especially when typing is inconvenient.

**Acceptance Criteria:**

- **AC-1**: Given the user page is displayed, When the user views the input area, Then a microphone/voice input button is visible alongside the text input.
- **AC-2**: Given the user clicks the microphone button, When the browser supports the Web Speech API, Then voice recording starts and a visual indicator shows that recording is active.
- **AC-3**: Given voice recording is active, When the user speaks, Then the speech is transcribed to text in real-time (or upon completion) and displayed in the input field.
- **AC-4**: Given the transcription is complete, When the user reviews the transcribed text, Then the user can edit the text before submitting or submit it directly.
- **AC-5**: Given the browser does not support the Web Speech API, When the user attempts voice input, Then a friendly message is displayed explaining that voice input is not supported in this browser.

**Priority:** Must
**Related Requirements:** Q1, Q33, PRD Section 5 (In Scope: voice recording)

---

### US-004: Responsive Input Interface

**As a** field staff member,
**I want** the conversational input interface to work well on both desktop and mobile devices,
**so that** I can submit requirements from any device.

**Acceptance Criteria:**

- **AC-1**: Given the user accesses `/user` on a desktop browser, When the page loads, Then the chat interface is displayed with an appropriately sized layout.
- **AC-2**: Given the user accesses `/user` on a mobile browser, When the page loads, Then the chat interface adapts to the smaller screen with touch-friendly controls.
- **AC-3**: Given a mobile device, When the user taps the input area, Then the on-screen keyboard appears and the conversation area scrolls to remain visible.

**Priority:** Should
**Related Requirements:** Q15

---

## Epic 2: AI 요구사항 추출 및 분류 (AI Extraction & Classification)

Covers the AI processing that extracts structured information from raw input and classifies it into themes, then generates user story drafts.

### US-005: AI Requirement Extraction

**As a** field staff member,
**I want** the AI to analyze my free-form input and extract structured requirements from it,
**so that** my loosely described needs are turned into clear, actionable requirement items.

**Acceptance Criteria:**

- **AC-1**: Given the user has submitted a requirement via text or voice, When the AI processes the input, Then the AI extracts one or more distinct requirement items from the input.
- **AC-2**: Given the AI is processing, When the response is being generated, Then a loading indicator is displayed in the conversation area (e.g., typing animation).
- **AC-3**: Given the AI extraction is complete, When the results are ready, Then each extracted requirement is displayed as an AI response message in the conversation with clear structure.
- **AC-4**: Given the AI extraction is complete, When the results are displayed, Then each extracted requirement includes at minimum: a summary/title and the original context from which it was derived.

**Priority:** Must
**Related Requirements:** Q1, Q3, Q4, Q8, PRD Section 1

---

### US-006: AI Theme Classification

**As a** field staff member,
**I want** the AI to automatically classify each extracted requirement into a topic theme,
**so that** my requirements are organized by subject matter without manual categorization effort.

**Acceptance Criteria:**

- **AC-1**: Given the AI has extracted requirements, When the extraction results are displayed, Then each requirement is tagged with a theme (topic category).
- **AC-2**: Given the themes are assigned, When displayed in the conversation, Then the theme label is clearly visible next to each requirement item.
- **AC-3**: Given multiple requirements are extracted from one input, When they belong to different topics, Then each requirement is independently classified into its appropriate theme.

**Priority:** Must
**Related Requirements:** Q3, Q5, PRD Section 5 (In Scope: AI theme auto-classification)

---

### US-007: AI User Story Generation

**As a** field staff member,
**I want** the AI to generate structured user story drafts from the extracted requirements,
**so that** the raw requirements are transformed into a standardized user story format with purpose and acceptance criteria.

**Acceptance Criteria:**

- **AC-1**: Given the AI has extracted and classified requirements, When user story generation is triggered, Then the AI generates a user story draft for each requirement.
- **AC-2**: Given a user story is generated, When it is displayed, Then it includes: (a) a user story sentence ("As a [role], I want [action], so that [benefit]"), (b) a purpose/goal statement, and (c) acceptance criteria.
- **AC-3**: Given user stories are generated, When they are displayed in the conversation, Then each story is associated with its source requirement and assigned theme.
- **AC-4**: Given the generation is complete, When the results are shown, Then the requirement status transitions from "submitted" to "processed".

**Priority:** Must
**Related Requirements:** Q1, Q3, Q8, PRD Section 1, PRD Section 5 (In Scope)

---

### US-008: AI Processing Error Handling

**As a** field staff member,
**I want** clear feedback when the AI processing fails or encounters an error,
**so that** I understand what happened and can retry my input.

**Acceptance Criteria:**

- **AC-1**: Given the user has submitted a requirement, When the AI API call fails (network error, timeout, etc.), Then an error message is displayed in the conversation area in Korean.
- **AC-2**: Given an AI processing error has occurred, When the error message is displayed, Then a retry option is provided.
- **AC-3**: Given the AI API is unreachable, When the user attempts to submit, Then the original input text is preserved so the user does not have to re-type it.

**Priority:** Must
**Related Requirements:** Q16, Q17 (online-only)

---

## Epic 3: 요구사항 검증 (Requirement Verification)

Covers the field staff's ability to review, approve, or reject AI extraction results before they are finalized.

### US-009: Review AI Extraction Results

**As a** field staff member,
**I want** to see the AI's extraction and classification results clearly in the conversation,
**so that** I can assess whether the AI correctly understood my requirements.

**Acceptance Criteria:**

- **AC-1**: Given the AI has generated extraction results, When they are displayed in the conversation, Then each extracted requirement shows: summary, theme classification, and generated user story draft.
- **AC-2**: Given multiple items were extracted, When the results are displayed, Then each item is individually identifiable and separated visually.
- **AC-3**: Given the results are displayed, When the user reviews them, Then approve and reject controls are visible for each extracted item.

**Priority:** Must
**Related Requirements:** Q1, Q4, Q8, Q21

---

### US-010: Approve AI Extraction Result

**As a** field staff member,
**I want** to approve individual AI extraction results that are correct,
**so that** the verified requirements and user stories are saved and made available to the PO.

**Acceptance Criteria:**

- **AC-1**: Given the user sees an extracted requirement with its user story, When the user clicks the approve button, Then the item's status changes from "processed" to "verified".
- **AC-2**: Given an item is approved, When the approval is confirmed, Then the verified requirement, its theme, and the user story are saved to localStorage.
- **AC-3**: Given an item is approved, When the status changes, Then the UI visually indicates the item has been verified (e.g., checkmark, green highlight, or status badge).
- **AC-4**: Given an item is approved, When saved to localStorage, Then the record includes an updated_at timestamp reflecting the verification time.

**Priority:** Must
**Related Requirements:** Q4, Q8, Q10, Q18, Q21

---

### US-011: Reject AI Extraction Result

**As a** field staff member,
**I want** to reject an AI extraction result that is incorrect or irrelevant,
**so that** inaccurate extractions do not proceed to the PO's review.

**Acceptance Criteria:**

- **AC-1**: Given the user sees an extracted requirement, When the user clicks the reject button, Then a confirmation dialog is displayed before the rejection is finalized.
- **AC-2**: Given the user confirms the rejection, When the rejection is processed, Then the item is removed from the active results (not saved as "verified").
- **AC-3**: Given a rejection is confirmed, When the conversation is updated, Then the rejected item is visually marked or removed, and the user can continue with remaining items.

**Priority:** Must
**Related Requirements:** Q4, Q8, Q23

---

### US-012: Conversation History Display

**As a** field staff member,
**I want** to see the full conversation history within the current session,
**so that** I can review all my inputs and the AI's responses in context.

**Acceptance Criteria:**

- **AC-1**: Given the user has submitted multiple requirements, When the conversation area is viewed, Then all messages (user inputs and AI responses) are displayed in chronological order.
- **AC-2**: Given there are many messages, When the conversation grows long, Then the conversation area is scrollable with the newest message visible.
- **AC-3**: Given each AI response block, When it is displayed, Then the verification status (pending / verified / rejected) of each extracted item is visible.

**Priority:** Should
**Related Requirements:** Q7, Q11, Q21

---

## Epic 4: 관리자 조회 및 분석 (Admin Review & Analysis)

Covers the PO's ability to view submitted requirements and user stories, filter by theme, and check system support status.

### US-013: Admin Page -- User Story List View

**As a** PO (product owner),
**I want** to view a list of all user stories generated from field staff requirements,
**so that** I can review and manage the collected user stories.

**Acceptance Criteria:**

- **AC-1**: Given the PO navigates to `/admin`, When the page loads, Then a list of all verified user stories is displayed.
- **AC-2**: Given user stories exist, When the list is displayed, Then each row shows: user story title/summary, theme, status, and created_at date.
- **AC-3**: Given the list is displayed, When there are multiple stories, Then they are sorted by newest first (fixed sort order).
- **AC-4**: Given no verified user stories exist, When the page loads, Then an appropriate empty state message is displayed in Korean (e.g., "등록된 유저스토리가 없습니다").

**Priority:** Must
**Related Requirements:** Q4, Q6, Q7, Q11, Q22

---

### US-014: Theme-based Filtering

**As a** PO,
**I want** to filter the user story list by theme,
**so that** I can focus on specific topic areas when reviewing requirements.

**Acceptance Criteria:**

- **AC-1**: Given the admin page is displayed, When the PO views the filter controls, Then a theme filter (dropdown or button group) listing all available themes is visible.
- **AC-2**: Given themes are available, When the PO selects a specific theme, Then only user stories belonging to that theme are displayed.
- **AC-3**: Given a filter is active, When the PO selects "All" or clears the filter, Then all user stories are displayed again.
- **AC-4**: Given a theme filter is applied, When the results are shown, Then the currently active filter is visually indicated.

**Priority:** Must
**Related Requirements:** Q5, Q6

---

### US-015: User Story Detail View

**As a** PO,
**I want** to view the full detail of a user story including its purpose and acceptance criteria,
**so that** I can thoroughly evaluate the quality and completeness of each story.

**Acceptance Criteria:**

- **AC-1**: Given the user story list is displayed, When the PO clicks on a user story, Then the detail view is displayed showing: user story sentence, purpose, acceptance criteria, source requirement text, theme, and timestamps.
- **AC-2**: Given the detail view is open, When the PO reviews it, Then the original requirement (raw input from field staff) is also visible for reference.
- **AC-3**: Given the detail view is open, When the PO wants to return to the list, Then a back/close action is available.

**Priority:** Must
**Related Requirements:** Q4, Q12, PRD Section 5 (In Scope)

---

### US-016: System Support Analysis

**As a** PO,
**I want** to see whether each requirement/user story corresponds to an existing system feature or requires new development,
**so that** I can prioritize and plan development efforts accurately.

**Acceptance Criteria:**

- **AC-1**: Given the admin page displays user stories, When the PO views a story, Then it is indicated whether the requirement is "system-supported" (existing feature) or "needs development" (new feature).
- **AC-2**: Given a specific reference file is loaded, When the system analyzes stories against it, Then the match/no-match determination is displayed for each story.
- **AC-3**: Given the analysis results are displayed, When the PO views the list, Then a visual badge or icon clearly distinguishes "system-supported" from "needs development" items.

**Priority:** Must
**Related Requirements:** Q4, Q11, Q21

---

### US-017: Admin Page Responsive Layout

**As a** PO,
**I want** the admin page to work well on both desktop and mobile browsers,
**so that** I can review user stories from any device.

**Acceptance Criteria:**

- **AC-1**: Given the PO accesses `/admin` on a desktop browser, When the page loads, Then the list and detail views are displayed with an appropriately sized layout.
- **AC-2**: Given the PO accesses `/admin` on a mobile browser, When the page loads, Then the layout adapts to the smaller screen with readable text and touch-friendly controls.

**Priority:** Should
**Related Requirements:** Q15

---

## Epic 5: 유저스토리 출력 (User Story Export)

Covers the PO's ability to select and export/download user stories.

### US-018: Checkbox Multi-select for User Stories

**As a** PO,
**I want** to select multiple user stories using checkboxes,
**so that** I can choose specific stories for bulk export.

**Acceptance Criteria:**

- **AC-1**: Given the admin user story list is displayed, When the PO views the list, Then each row has a checkbox for selection.
- **AC-2**: Given checkboxes are available, When the PO checks multiple items, Then the selected count is displayed (e.g., "3건 선택됨").
- **AC-3**: Given multiple items are selected, When the PO wants to select/deselect all, Then a "select all" / "deselect all" checkbox or button is available.
- **AC-4**: Given items are selected, When a theme filter is applied, Then only visible (filtered) items are affected by "select all"; previously selected items outside the filter remain selected.

**Priority:** Must
**Related Requirements:** Q24, PRD Section 5 (In Scope)

---

### US-019: Bulk Export with Purpose and AC

**As a** PO,
**I want** to export/download the selected user stories with their purpose and acceptance criteria,
**so that** I can use the generated stories as deliverables or share them with the team.

**Acceptance Criteria:**

- **AC-1**: Given one or more user stories are selected, When the PO clicks the export/download button, Then a file containing the selected stories is downloaded.
- **AC-2**: Given the export is triggered, When the file is generated, Then each exported story includes: user story sentence, purpose, acceptance criteria, theme, and source requirement summary.
- **AC-3**: Given no items are selected, When the PO attempts to export, Then the export button is disabled or a message indicates that items must be selected first.
- **AC-4**: Given the export is complete, When the file is downloaded, Then the file is in a readable format (e.g., Markdown, text, or structured document).

**Priority:** Must
**Related Requirements:** Q12, Q24, PRD Section 5 (In Scope)

---

### US-020: On-screen Preview of Selected Stories

**As a** PO,
**I want** to preview the selected user stories on screen before downloading,
**so that** I can verify the export content without downloading a file.

**Acceptance Criteria:**

- **AC-1**: Given one or more user stories are selected, When the PO clicks a preview/view button, Then the full content of selected stories (story sentence, purpose, AC) is displayed on screen.
- **AC-2**: Given the preview is displayed, When the PO reviews it, Then a download button is also available to save the previewed content as a file.
- **AC-3**: Given the preview is displayed, When the PO wants to modify the selection, Then the PO can close the preview and adjust the checkboxes.

**Priority:** Should
**Related Requirements:** Q12, PRD Section 5 (In Scope: screen output and file download)

---

## Epic 6: 공통 (Common)

Covers cross-cutting concerns including routing, layout, localStorage management, and accessibility.

### US-021: SPA Routing Setup

**As a** user (field staff or PO),
**I want** to navigate between the user page and admin page via URL routes,
**so that** I can directly access the relevant page for my role.

**Acceptance Criteria:**

- **AC-1**: Given the application is loaded, When the user navigates to `/user`, Then the user page (ChatGPT-style conversational interface) is displayed.
- **AC-2**: Given the application is loaded, When the user navigates to `/admin`, Then the admin page (user story list and management) is displayed.
- **AC-3**: Given the application is loaded, When the user navigates to the root path `/`, Then the user is redirected to `/user` (or a landing page with navigation to both pages).
- **AC-4**: Given the user is on any page, When the user enters an invalid URL, Then a 404 / not-found page is displayed with navigation back to valid routes.

**Priority:** Must
**Related Requirements:** Q29

---

### US-022: Page Navigation

**As a** user (field staff or PO),
**I want** a navigation element that lets me switch between the user page and admin page,
**so that** I can move between roles without manually editing the URL.

**Acceptance Criteria:**

- **AC-1**: Given any page is loaded, When the user views the interface, Then a navigation element (header, sidebar, or menu) with links to "사용자" (/user) and "관리자" (/admin) is visible.
- **AC-2**: Given the navigation is displayed, When the user clicks a link, Then the corresponding page loads without a full page refresh (client-side routing).
- **AC-3**: Given the user is on a page, When viewing the navigation, Then the current page's link is visually highlighted as active.

**Priority:** Must
**Related Requirements:** Q2, Q29

---

### US-023: localStorage Data Persistence

**As a** user (field staff or PO),
**I want** all verified requirements and user stories to be persisted in localStorage,
**so that** data survives page refreshes within the same browser.

**Acceptance Criteria:**

- **AC-1**: Given a requirement is verified (approved) by the field staff, When the approval is confirmed, Then the requirement, its theme, and user story are saved to localStorage.
- **AC-2**: Given data exists in localStorage, When the user refreshes the page or revisits the app, Then previously saved data is loaded and displayed correctly.
- **AC-3**: Given data is stored in localStorage, When it is accessed by different pages (/user and /admin), Then both pages read from the same localStorage keys and see consistent data.
- **AC-4**: Given data is stored, When the storage format is inspected, Then entity names use snake_case and follow the schema defined in the term dictionary.

**Priority:** Must
**Related Requirements:** Q18, Q31, CLAUDE.md (data access via custom hooks)

---

### US-024: localStorage Data Access Abstraction

**As a** developer,
**I want** localStorage access to be abstracted through custom hooks (e.g., useStorage),
**so that** future migration to a backend API requires minimal code changes.

**Acceptance Criteria:**

- **AC-1**: Given the codebase, When localStorage operations are performed, Then all read/write operations go through custom hook(s) rather than direct `localStorage.getItem/setItem` calls in components.
- **AC-2**: Given the custom hook is used, When data is stored, Then it handles JSON serialization/deserialization automatically.
- **AC-3**: Given the custom hook is used, When a storage error occurs (e.g., quota exceeded), Then a graceful error is returned rather than a crash.

**Priority:** Should
**Related Requirements:** Q31, CLAUDE.md (architecture: custom hooks for data access)

---

### US-025: Basic Accessibility

**As a** user,
**I want** the application to follow basic accessibility practices,
**so that** the interface is usable with keyboard navigation and assistive technologies.

**Acceptance Criteria:**

- **AC-1**: Given any page, When the HTML is rendered, Then semantic HTML elements are used appropriately (e.g., `<button>`, `<nav>`, `<main>`, `<header>`).
- **AC-2**: Given interactive elements, When the user navigates with keyboard (Tab/Enter/Escape), Then all interactive elements are reachable and operable.
- **AC-3**: Given form inputs, When the input fields are rendered, Then each has an associated label or aria-label.
- **AC-4**: Given focus moves between elements, When an element receives focus, Then a visible focus indicator is displayed.

**Priority:** Should
**Related Requirements:** Q19

---

### US-026: Korean-only UI Language

**As a** user,
**I want** all UI text, labels, messages, and prompts to be in Korean,
**so that** the interface is consistent with the target audience's language.

**Acceptance Criteria:**

- **AC-1**: Given any page, When the user views the interface, Then all labels, buttons, messages, headings, and placeholder text are in Korean.
- **AC-2**: Given an error or empty state, When a message is displayed, Then it is written in Korean.
- **AC-3**: Given the HTML document, When the lang attribute is checked, Then it is set to `ko`.

**Priority:** Must
**Related Requirements:** Q20

---

### US-027: Delete Confirmation Dialog

**As a** user (field staff or PO),
**I want** a confirmation dialog before any destructive action,
**so that** I do not accidentally delete or lose data.

**Acceptance Criteria:**

- **AC-1**: Given any destructive action is triggered (e.g., rejection of AI result, clearing data), When the action is initiated, Then a confirmation dialog appears in Korean asking the user to confirm.
- **AC-2**: Given the confirmation dialog is displayed, When the user clicks "취소" (cancel), Then the action is aborted and no data is changed.
- **AC-3**: Given the confirmation dialog is displayed, When the user clicks "확인" (confirm), Then the destructive action proceeds.

**Priority:** Must
**Related Requirements:** Q23

---

## Story Map Summary

| Epic | Story IDs | Must | Should | Could |
|------|-----------|------|--------|-------|
| Epic 1: 요구사항 입력 | US-001 ~ US-004 | US-001, US-002, US-003 | US-004 | -- |
| Epic 2: AI 추출 및 분류 | US-005 ~ US-008 | US-005, US-006, US-007, US-008 | -- | -- |
| Epic 3: 요구사항 검증 | US-009 ~ US-012 | US-009, US-010, US-011 | US-012 | -- |
| Epic 4: 관리자 조회 및 분석 | US-013 ~ US-017 | US-013, US-014, US-015, US-016 | US-017 | -- |
| Epic 5: 유저스토리 출력 | US-018 ~ US-020 | US-018, US-019 | US-020 | -- |
| Epic 6: 공통 | US-021 ~ US-027 | US-021, US-022, US-023, US-026, US-027 | US-024, US-025 | -- |

**Total: 27 user stories (20 Must, 7 Should, 0 Could)**

---

## Status Lifecycle Reference

```
submitted --> processed --> verified
(입력됨)     (AI 분류/변환  (사용자 검증
              완료)         완료)
```

**Text alternative**: Requirement starts as "submitted" when field staff inputs it, transitions to "processed" when AI completes extraction/classification/story generation, and transitions to "verified" when the field staff approves the result.

---

## Entity-Story Traceability

| Entity | Created By | Stories |
|--------|-----------|---------|
| requirements | Field staff input (US-002, US-003) | US-002, US-003, US-005, US-009, US-010, US-011 |
| themes | AI classification (US-006) | US-006, US-014 |
| user_stories | AI generation (US-007) | US-007, US-013, US-014, US-015, US-016, US-018, US-019, US-020 |
