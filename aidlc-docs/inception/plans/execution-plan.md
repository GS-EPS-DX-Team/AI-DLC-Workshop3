# Execution Plan -- "말해 뭐해"

> Version: v1.0
> Date: 2026-04-22
> Stage: INCEPTION / Workflow Planning
> Source: units.md (5 units), application-design.md, user-stories.md, business-rules.md

---

## 1. CONSTRUCTION Phase Stage Plan per Unit

### Stage Decision Matrix

| Stage | UNIT-01 (M) | UNIT-02 (L) | UNIT-03 (S) | UNIT-04 (M) | UNIT-05 (S) | Rationale |
|-------|-------------|-------------|-------------|-------------|-------------|-----------|
| Functional Design | EXECUTE | EXECUTE | SKIP | EXECUTE | SKIP | M/L units need detailed component/hook specs; S units have clear, narrow scope from application-design.md |
| NFR Requirements | SKIP | SKIP | SKIP | SKIP | SKIP | Workshop prototype -- no security, performance, or compliance requirements |
| NFR Design | SKIP | SKIP | SKIP | SKIP | SKIP | Workshop prototype -- no NFR patterns needed |
| Infrastructure Design | SKIP | SKIP | SKIP | SKIP | SKIP | Local development only -- no deployment infrastructure |
| Code Generation | EXECUTE | EXECUTE | EXECUTE | EXECUTE | EXECUTE | All units require implementation |
| Code Review | EXECUTE | EXECUTE | EXECUTE | EXECUTE | EXECUTE | All generated code must be reviewed for correctness |
| Build & Test | EXECUTE | EXECUTE | EXECUTE | EXECUTE | EXECUTE | All units must pass build verification |

### Decision Justifications

**Functional Design -- EXECUTE for UNIT-01, UNIT-02, UNIT-04:**
- UNIT-01 (Foundation, M): 21 files including routing, context, hooks, and common components. Needs detailed specs for useStorage, idGenerator, dateFormatter, and the AppProvider skeleton to establish patterns all other units depend on.
- UNIT-02 (User Input & AI, L): 11 files with the most complex logic -- AI API integration, conversation management, message rendering, voice input. The AI service interface, system prompts, and data flow between hooks require precise specification.
- UNIT-04 (Admin List & Analysis, M): 9 files with filtering logic, modal management, file upload, and a second AI call (system support analysis). Interactions between ThemeFilter, StoryList selection state, and StoryDetailModal need detailed specs.

**Functional Design -- SKIP for UNIT-03, UNIT-05:**
- UNIT-03 (Verification Flow, S): 7 files (1 new + 6 enhance). Scope is narrowly defined: add approve/reject buttons and wire status updates into existing hooks. The business rules (BR-001, BR-002) and application design already specify the exact behavior.
- UNIT-05 (Export & Preview, S): 7 files (4 new + 3 enhance). Scope is clear: add checkboxes, markdown generation, and download. BR-006 fully specifies the export format.

**NFR Requirements, NFR Design, Infrastructure Design -- SKIP for ALL:**
- This is a workshop prototype with no production deployment target. No security hardening, performance SLAs, or infrastructure provisioning is needed.

---

## 2. Execution Sequence

The units follow a strictly sequential dependency chain. Each unit completes all its stages before the next unit begins.

```
 #  | Unit    | Stage              | Agent
----|---------|--------------------|-----------------
 1  | UNIT-01 | Functional Design  | aidlc-analyst
 2  | UNIT-01 | Code Generation    | aidlc-developer
 3  | UNIT-01 | Code Review        | aidlc-reviewer
 4  | UNIT-01 | Build & Test       | aidlc-reviewer
----|---------|--------------------|-----------------
 5  | UNIT-02 | Functional Design  | aidlc-analyst
 6  | UNIT-02 | Code Generation    | aidlc-developer
 7  | UNIT-02 | Code Review        | aidlc-reviewer
 8  | UNIT-02 | Build & Test       | aidlc-reviewer
----|---------|--------------------|-----------------
 9  | UNIT-03 | Code Generation    | aidlc-developer
10  | UNIT-03 | Code Review        | aidlc-reviewer
11  | UNIT-03 | Build & Test       | aidlc-reviewer
----|---------|--------------------|-----------------
12  | UNIT-04 | Functional Design  | aidlc-analyst
13  | UNIT-04 | Code Generation    | aidlc-developer
14  | UNIT-04 | Code Review        | aidlc-reviewer
15  | UNIT-04 | Build & Test       | aidlc-reviewer
----|---------|--------------------|-----------------
16  | UNIT-05 | Code Generation    | aidlc-developer
17  | UNIT-05 | Code Review        | aidlc-reviewer
18  | UNIT-05 | Build & Test       | aidlc-reviewer
```

**Text alternative**: UNIT-01 runs Functional Design, Code Generation, Code Review, Build & Test (steps 1-4). UNIT-02 runs Functional Design, Code Generation, Code Review, Build & Test (steps 5-8). UNIT-03 skips Functional Design and runs Code Generation, Code Review, Build & Test (steps 9-11). UNIT-04 runs Functional Design, Code Generation, Code Review, Build & Test (steps 12-15). UNIT-05 skips Functional Design and runs Code Generation, Code Review, Build & Test (steps 16-18).

---

## 3. Stage Configuration per Unit

### UNIT-01: Foundation

#### Step 1 -- Functional Design (aidlc-analyst)

| Item | Detail |
|------|--------|
| **Focus** | Detailed specs for: Tailwind/Vite configuration, React Router setup, AppProvider skeleton with context shape, useStorage hook API, idGenerator and dateFormatter utility functions, common components (ConfirmDialog, LoadingIndicator, EmptyState), Header with active NavLink, NotFoundPage. Establish coding patterns (file structure, export conventions, naming) that all subsequent units will follow. |
| **Key Inputs** | `aidlc-docs/inception/application-design.md` (Sections 1-4, 6.1, 8, 10), `aidlc-docs/inception/units.md` (UNIT-01 file list and DoD), `aidlc-docs/inception/user-stories.md` (US-021 through US-027), `aidlc-docs/inception/business-rules.md` (BR-008), `.claude/CLAUDE.md` (tech stack and conventions) |
| **Expected Outputs** | `aidlc-docs/construction/unit-01/functional-design.md` -- Component specs with props/behavior, hook signatures with return types, utility function signatures, Tailwind config details, route configuration, DoD checklist refined |
| **Gate Criteria** | All 21 files have clear implementation specs. useStorage hook interface is fully defined. All common component props and behaviors are specified. No ambiguous implementation details remain. Team approves. |

#### Step 2 -- Code Generation (aidlc-developer)

| Item | Detail |
|------|--------|
| **Focus** | Implement all 21 files: .env, tailwind.config.js, postcss.config.js, vite.config.js modifications, package.json dependency additions, index.css, main.jsx, App.jsx, AppContext.js, AppProvider.jsx, Layout.jsx, Header.jsx, stub pages (UserPage, AdminPage), NotFoundPage, useStorage.js, idGenerator.js, dateFormatter.js, ConfirmDialog.jsx, LoadingIndicator.jsx, EmptyState.jsx. |
| **Key Inputs** | `aidlc-docs/construction/unit-01/functional-design.md`, `aidlc-docs/inception/application-design.md`, `aidlc-docs/inception/units.md` (UNIT-01) |
| **Expected Outputs** | All 21 source files implemented under `frontend/`. Package.json updated with dependencies (react-router-dom, tailwindcss, @tailwindcss/vite). |
| **Gate Criteria** | All files created/modified per the file list. Code follows functional design specs. No placeholder or TODO code. All UI text in Korean. |

#### Step 3 -- Code Review (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Review all 21 files for: correctness against functional design, consistent patterns (naming, exports, file structure), proper Tailwind usage, complete Korean text, useStorage correctness (JSON parse error handling, quota handling), proper React Router configuration. |
| **Key Inputs** | Generated source files, `aidlc-docs/construction/unit-01/functional-design.md`, `aidlc-docs/inception/units.md` (UNIT-01 DoD) |
| **Expected Outputs** | GO or NO-GO decision. If NO-GO: list of issues for aidlc-developer to fix. |
| **Gate Criteria** | GO decision from reviewer. All DoD items can be verified. No critical issues. |

#### Step 4 -- Build & Test (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Run `npm install` and `npm run build`. Verify the application starts without errors. Verify routes work: `/` redirects to `/user`, `/admin` loads, invalid paths show 404. Verify Tailwind classes render. Verify useStorage reads/writes to localStorage. |
| **Key Inputs** | Built application, UNIT-01 DoD checklist |
| **Expected Outputs** | PASS or FAIL. If FAIL: error log and diagnosis. |
| **Gate Criteria** | `npm run build` succeeds with zero errors. All UNIT-01 DoD items pass. Application runs on http://localhost:3000. |

---

### UNIT-02: User Input & AI

#### Step 5 -- Functional Design (aidlc-analyst)

| Item | Detail |
|------|--------|
| **Focus** | Detailed specs for: UserPage full implementation replacing stub, ChatInput with multi-line and send logic, VoiceInput with Web Speech API lifecycle, MessageList with auto-scroll, MessageBubble with user/AI styling and extracted item cards, WelcomeMessage, useConversation hook (conversation CRUD, message append, current conversation tracking), useAIService hook (extractRequirements API call, system prompt, request/response format, error handling, timeout), useRequirements hook (addRequirement, updateStatus), useThemes hook (addTheme with dedup), useUserStories hook (addUserStory). |
| **Key Inputs** | `aidlc-docs/inception/application-design.md` (Sections 3.2, 4, 5, 6.2-6.6, 7), `aidlc-docs/inception/units.md` (UNIT-02), `aidlc-docs/inception/user-stories.md` (US-001 through US-008, US-012), `aidlc-docs/inception/business-rules.md` (BR-003, BR-004, BR-007, BR-008, BR-009), UNIT-01 functional design (established patterns) |
| **Expected Outputs** | `aidlc-docs/construction/unit-02/functional-design.md` -- Detailed component specs, hook implementations, AI prompt text, data flow sequences, error handling matrix, voice input state machine |
| **Gate Criteria** | AI service integration is fully specified (prompts, request format, response parsing). Voice input lifecycle is clear. Conversation persistence flow has no gaps. All 11 files have clear specs. Team approves. |

#### Step 6 -- Code Generation (aidlc-developer)

| Item | Detail |
|------|--------|
| **Focus** | Implement all 11 files: UserPage.jsx (full implementation), WelcomeMessage.jsx, MessageList.jsx, MessageBubble.jsx, ChatInput.jsx, VoiceInput.jsx, useConversation.js, useAIService.js, useRequirements.js, useThemes.js, useUserStories.js. Wire hooks into AppProvider as needed. |
| **Key Inputs** | `aidlc-docs/construction/unit-02/functional-design.md`, UNIT-01 source code (established patterns, AppProvider, useStorage) |
| **Expected Outputs** | All 11 source files implemented. UserPage functional with chat interface. AI API calls working with configured environment variables. |
| **Gate Criteria** | All files created per the file list. Code follows functional design specs. AI service properly configured. Error handling covers all cases from BR-008. |

#### Step 7 -- Code Review (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Review all 11 files. Key areas: AI API call security (no key exposure in client logs), proper error handling for all API failure modes, voice input browser compatibility handling, conversation persistence correctness, message rendering performance with long conversations, proper state management via context. |
| **Key Inputs** | Generated source files, `aidlc-docs/construction/unit-02/functional-design.md`, UNIT-02 DoD |
| **Expected Outputs** | GO or NO-GO decision. |
| **Gate Criteria** | GO decision. AI integration is correct. Error paths are handled. Voice fallback works. |

#### Step 8 -- Build & Test (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Build verification. Verify: chat interface renders, message bubbles display correctly, AI API call goes out (may need mock if no key), voice input button appears, loading indicator shows during AI processing, empty submission prevented, conversation persists across refresh, "새 대화" starts fresh. |
| **Key Inputs** | Built application, UNIT-02 DoD checklist |
| **Expected Outputs** | PASS or FAIL. |
| **Gate Criteria** | `npm run build` succeeds. All UNIT-02 DoD items pass. User page is fully functional (with AI API key configured). |

---

### UNIT-03: Verification Flow

**Functional Design: SKIP** -- Scope is narrow (1 new component + 6 enhancements). BR-001 and BR-002 fully specify the approve/reject behavior. Application design Section 3.2 defines VerificationControls props.

#### Step 9 -- Code Generation (aidlc-developer)

| Item | Detail |
|------|--------|
| **Focus** | Implement all 7 files: VerificationControls.jsx (new), enhance AppProvider.jsx (wire CRUD), enhance useRequirements.js (updateStatus for verified), enhance useThemes.js (dedup by name), enhance useUserStories.js (addUserStory full fields), enhance useConversation.js (updateExtractedItemStatus), enhance MessageBubble.jsx (render VerificationControls). |
| **Key Inputs** | `aidlc-docs/inception/application-design.md` (Section 3.2, 4, 6.2-6.5), `aidlc-docs/inception/units.md` (UNIT-03), `aidlc-docs/inception/business-rules.md` (BR-001, BR-002), UNIT-02 source code |
| **Expected Outputs** | All 7 files created/enhanced. Approve and reject flows functional end-to-end. |
| **Gate Criteria** | All files modified per the file list. Verification flow matches BR-001 and BR-002 exactly. Approve saves to localStorage. Reject shows ConfirmDialog. Status badges render correctly. |

#### Step 10 -- Code Review (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Review all 7 files. Key areas: status transition correctness (submitted -> processed -> verified), theme deduplication logic, conversation extracted_items status sync, ConfirmDialog integration for reject, irreversibility of approve/reject, updated_at timestamps set correctly. |
| **Key Inputs** | Generated/enhanced source files, UNIT-03 DoD, BR-001, BR-002 |
| **Expected Outputs** | GO or NO-GO decision. |
| **Gate Criteria** | GO decision. Status transitions are correct. Data persistence is correct. |

#### Step 11 -- Build & Test (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Build verification. Verify: approve button saves data to localStorage, reject shows dialog and dims card, verification status persists after refresh, multiple items independently verifiable, approved data appears in mhm_requirements / mhm_themes / mhm_user_stories keys. |
| **Key Inputs** | Built application, UNIT-03 DoD checklist |
| **Expected Outputs** | PASS or FAIL. |
| **Gate Criteria** | `npm run build` succeeds. All UNIT-03 DoD items pass. User page verification flow is complete. |

---

### UNIT-04: Admin List & Analysis

#### Step 12 -- Functional Design (aidlc-analyst)

| Item | Detail |
|------|--------|
| **Focus** | Detailed specs for: AdminPage full implementation replacing stub, ThemeFilter (dynamic theme list, "전체" option, active indicator), StoryList (table/card layout, select-all checkbox), StoryRow (truncation, badges, date), SystemSupportBadge (3 states with colors), StoryDetailModal (full detail layout, close behavior), ReferenceFileUpload (file type validation, read as text, store in localStorage), useAIService.analyzeSystemSupport extension (system prompt, request/response format), useUserStories extensions (getStoriesByTheme, updateSystemSupport, bulkUpdateSystemSupport). AdminPage local state management (selectedIds, selectedTheme, modal visibility). |
| **Key Inputs** | `aidlc-docs/inception/application-design.md` (Sections 3.3, 4, 5, 6.4, 6.6, 7.3), `aidlc-docs/inception/units.md` (UNIT-04), `aidlc-docs/inception/user-stories.md` (US-013 through US-017), `aidlc-docs/inception/business-rules.md` (BR-005, BR-008), established patterns from UNIT-01/02 |
| **Expected Outputs** | `aidlc-docs/construction/unit-04/functional-design.md` -- Component specs, admin page state diagram, filter/selection interaction matrix, modal behavior specs, AI system support analysis prompt and response handling |
| **Gate Criteria** | All 9 files have clear specs. Filter and selection interaction is unambiguous. System support analysis flow is fully specified. Modal open/close behavior is defined. Team approves. |

#### Step 13 -- Code Generation (aidlc-developer)

| Item | Detail |
|------|--------|
| **Focus** | Implement all 9 files: AdminPage.jsx (full implementation), ThemeFilter.jsx, StoryList.jsx, StoryRow.jsx, SystemSupportBadge.jsx, StoryDetailModal.jsx, ReferenceFileUpload.jsx, enhance useUserStories.js, enhance useAIService.js. |
| **Key Inputs** | `aidlc-docs/construction/unit-04/functional-design.md`, existing source code from UNIT-01/02/03 |
| **Expected Outputs** | All 9 source files implemented/enhanced. Admin page fully functional with list, filter, detail modal, file upload, and system support analysis. |
| **Gate Criteria** | All files created/enhanced per the file list. Admin page reads from same localStorage keys as user page. Filter, modal, and analysis features work correctly. |

#### Step 14 -- Code Review (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Review all 9 files. Key areas: data reads correctly from localStorage (cross-page consistency), ThemeFilter interaction with StoryList, modal accessibility (close on Escape, backdrop click), file upload validation (.txt/.md/.json only), AI system support analysis prompt correctness, responsive layout. |
| **Key Inputs** | Generated/enhanced source files, `aidlc-docs/construction/unit-04/functional-design.md`, UNIT-04 DoD |
| **Expected Outputs** | GO or NO-GO decision. |
| **Gate Criteria** | GO decision. Admin page correctly displays data from user page. All interactions work as specified. |

#### Step 15 -- Build & Test (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Build verification. Verify: admin page shows verified stories sorted newest-first, empty state when no stories, theme filter works, story detail modal opens/closes correctly, reference file upload accepts valid formats and rejects invalid, system support analysis updates badges, responsive layout adapts. |
| **Key Inputs** | Built application, UNIT-04 DoD checklist |
| **Expected Outputs** | PASS or FAIL. |
| **Gate Criteria** | `npm run build` succeeds. All UNIT-04 DoD items pass. Admin page is fully functional (list, filter, detail, analysis). |

---

### UNIT-05: Export & Preview

**Functional Design: SKIP** -- Scope is narrow (4 new + 3 enhance). BR-006 fully specifies the export format. Application design defines ExportControls, PreviewModal, and useExport specs.

#### Step 16 -- Code Generation (aidlc-developer)

| Item | Detail |
|------|--------|
| **Focus** | Implement all 7 files: ExportControls.jsx (new), PreviewModal.jsx (new), useExport.js (new), markdownGenerator.js (new), enhance StoryList.jsx (checkbox column, select-all), enhance StoryRow.jsx (checkbox), enhance AdminPage.jsx (wire selection state, export/preview). |
| **Key Inputs** | `aidlc-docs/inception/application-design.md` (Sections 3.3, 6.7), `aidlc-docs/inception/units.md` (UNIT-05), `aidlc-docs/inception/business-rules.md` (BR-006), UNIT-04 source code |
| **Expected Outputs** | All 7 files created/enhanced. Selection, preview, and export features fully functional. |
| **Gate Criteria** | All files created/enhanced per the file list. Markdown export matches BR-006 format exactly. Preview shows same content as export. Download mechanism works (Blob + createObjectURL). |

#### Step 17 -- Code Review (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Review all 7 files. Key areas: checkbox selection state management (select-all with filter interaction), markdown generation correctness (grouping by theme, ordering, all fields included), download mechanism (Blob creation, cleanup), preview modal matches export content exactly, export button disabled when 0 selected. |
| **Key Inputs** | Generated/enhanced source files, UNIT-05 DoD, BR-006 |
| **Expected Outputs** | GO or NO-GO decision. |
| **Gate Criteria** | GO decision. Export format matches BR-006. Selection interaction is correct. |

#### Step 18 -- Build & Test (aidlc-reviewer)

| Item | Detail |
|------|--------|
| **Focus** | Build verification. Verify: checkboxes work on each row, select-all toggles visible rows, selection counter shows correct count, preview modal renders markdown, download produces correct .md file, filter + selection interaction is correct (selected items outside filter preserved). Final integration: end-to-end flow from user input through AI extraction, verification, admin review, to export. |
| **Key Inputs** | Built application, UNIT-05 DoD checklist |
| **Expected Outputs** | PASS or FAIL. |
| **Gate Criteria** | `npm run build` succeeds. All UNIT-05 DoD items pass. Full application is complete and functional. End-to-end flow works. |

---

## 4. Overall Execution Summary

### Stage Counts

| Metric | Count |
|--------|-------|
| Total EXECUTE stages | 18 |
| Total SKIP stages | 17 (Functional Design x2, NFR Requirements x5, NFR Design x5, Infrastructure Design x5) |
| Functional Design stages | 3 (UNIT-01, UNIT-02, UNIT-04) |
| Code Generation stages | 5 (all units) |
| Code Review stages | 5 (all units) |
| Build & Test stages | 5 (all units) |

### Construction Iterations

| Iteration | Unit | Stages | Files | Stories | Milestone |
|-----------|------|--------|-------|---------|-----------|
| 1 | UNIT-01: Foundation | 4 (FD + CG + CR + BT) | 21 | 7 | App runs, routing works, common components ready |
| 2 | UNIT-02: User Input & AI | 4 (FD + CG + CR + BT) | 11 | 9 | Chat interface + AI integration functional |
| 3 | UNIT-03: Verification Flow | 3 (CG + CR + BT) | 7 | 3 | User page complete with approve/reject |
| 4 | UNIT-04: Admin List & Analysis | 4 (FD + CG + CR + BT) | 9 | 5 | Admin page with list, filter, analysis |
| 5 | UNIT-05: Export & Preview | 3 (CG + CR + BT) | 7 | 3 | Full application complete |
| **Total** | | **18 stages** | **55 files** | **27 stories** | |

### Demo Milestones

- **After Iteration 3 (UNIT-03 complete)**: User page fully functional -- field staff can input requirements via text/voice, AI extracts and classifies, staff approves/rejects items
- **After Iteration 5 (UNIT-05 complete)**: Entire application complete -- PO can review, filter, analyze system support, preview, and export user stories

### Risk Notes

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| AI API key not available during Build & Test | Medium | Medium | Test with mock responses or use a free-tier API key in .env. Build verification can pass without live AI calls. |
| Web Speech API not available in test environment | Low | Low | VoiceInput component renders fallback message. Core text input flow is unaffected. |
| localStorage size limits with large test datasets | Very Low | Low | Workshop prototype with small data volumes. useStorage hook handles quota errors gracefully. |
| UNIT-02 complexity causes Code Review iterations | Medium | Medium | Thorough Functional Design in Step 5 mitigates. AI service interface is fully specified in application-design.md Section 7. |
| Cross-unit integration issues at UNIT-04 | Low | Medium | UNIT-04 reads from the same localStorage keys UNIT-02/03 write to. Data model is well-defined in application-design.md Section 5. |

---

## 5. CONSTRUCTION Phase State Template

This template will be inserted into `aidlc-state.md` when CONSTRUCTION begins.

```markdown
### CONSTRUCTION

#### Iteration 1: UNIT-01 -- Foundation (M)
- [ ] Functional Design
- [ ] Code Generation
- [ ] Code Review
- [ ] Build & Test

#### Iteration 2: UNIT-02 -- User Input & AI (L)
- [ ] Functional Design
- [ ] Code Generation
- [ ] Code Review
- [ ] Build & Test

#### Iteration 3: UNIT-03 -- Verification Flow (S)
- [ ] Code Generation
- [ ] Code Review
- [ ] Build & Test

#### Iteration 4: UNIT-04 -- Admin List & Analysis (M)
- [ ] Functional Design
- [ ] Code Generation
- [ ] Code Review
- [ ] Build & Test

#### Iteration 5: UNIT-05 -- Export & Preview (S)
- [ ] Code Generation
- [ ] Code Review
- [ ] Build & Test
```

---

## 6. Agent Assignment Summary

| Agent | Stages Assigned | Total Invocations |
|-------|----------------|-------------------|
| aidlc-analyst | Functional Design (UNIT-01, UNIT-02, UNIT-04) | 3 |
| aidlc-developer | Code Generation (all 5 units) | 5 |
| aidlc-reviewer | Code Review (all 5 units) + Build & Test (all 5 units) | 10 |
| aidlc-architect | (none -- no Infrastructure Design) | 0 |
| **Total** | | **18** |
