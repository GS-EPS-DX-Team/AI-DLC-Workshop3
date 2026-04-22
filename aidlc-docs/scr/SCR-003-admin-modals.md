# SCR-003: Admin Modals (관리자 모달)

> Version: v1.0
> Date: 2026-04-22
> Route: `/admin` (modals overlay the admin page)
> Related Stories: US-015, US-020

---

## 1. Overview

Two modals are used on the admin page:
1. **StoryDetailModal** -- Shows full detail of a single user story (triggered by clicking a row)
2. **PreviewModal** -- Full-screen modal showing the exact Markdown export content of selected stories (triggered by "미리보기" button)

Both follow the same base modal pattern: overlay background, centered content, close mechanism.

---

## 2. StoryDetailModal

### 2.1 Trigger

PO clicks on a StoryRow (anywhere except the checkbox) in the admin story list.

### 2.2 Layout

```
+---------------------------------------------------------------+
| Overlay (semi-transparent black backdrop)                      |
|                                                                 |
|  +-----------------------------------------------------------+ |
|  | StoryDetailModal                                [X 닫기]  | |
|  +-----------------------------------------------------------+ |
|  |                                                            | |
|  | 테마: [Theme Badge: 안전 관리]                              | |
|  | 시스템 지원: [SystemSupportBadge]                           | |
|  |                                                            | |
|  | ---------------------------------------------------------- | |
|  |                                                            | |
|  | 유저스토리:                                                 | |
|  | "안전 담당자로서, 작업자가 안전 장비를 미착용했을 때 자동      | |
|  |  알림을 받고 싶다. 왜냐하면 즉시 시정 조치를 할 수 있기       | |
|  |  때문이다."                                                 | |
|  |                                                            | |
|  | ---------------------------------------------------------- | |
|  |                                                            | |
|  | 목적:                                                      | |
|  | 안전 장비 미착용으로 인한 사고를 예방하고, 현장 안전 관리      | |
|  | 효율성을 높인다.                                            | |
|  |                                                            | |
|  | ---------------------------------------------------------- | |
|  |                                                            | |
|  | 인수 조건:                                                  | |
|  | 1. 작업자가 안전 장비 미착용 시 담당자에게 알림 전송          | |
|  | 2. 알림에 미착용 작업자 이름, 위치, 시간 포함                 | |
|  | 3. 알림 수신 후 확인 처리 가능                               | |
|  |                                                            | |
|  | ---------------------------------------------------------- | |
|  |                                                            | |
|  | 원본 요구사항:                                              | |
|  | "안전 장비 착용 알림이 있으면 좋겠어요"                       | |
|  |                                                            | |
|  | ---------------------------------------------------------- | |
|  |                                                            | |
|  | 생성일: 2026-04-22 09:01                                   | |
|  | 수정일: 2026-04-22 09:05                                   | |
|  |                                                            | |
|  +-----------------------------------------------------------+ |
+---------------------------------------------------------------+
```

### 2.3 Content Fields

| Section | Source Field | Display |
|---------|-------------|---------|
| 테마 | `themes[].name` (via `theme_id`) | Theme badge pill (same style as StoryRow) |
| 시스템 지원 | `user_stories[].system_support` | SystemSupportBadge component |
| 유저스토리 | `user_stories[].story` | Full user story sentence, displayed in quotation block or emphasized text |
| 목적 | `user_stories[].purpose` | Paragraph text |
| 인수 조건 | `user_stories[].acceptance_criteria` | Numbered list (1, 2, 3...) |
| 원본 요구사항 | `requirements[].raw_text` (via `requirement_id`) | Quoted block or lighter text to distinguish from the generated content |
| 생성일 | `user_stories[].created_at` | Formatted as "YYYY-MM-DD HH:mm" |
| 수정일 | `user_stories[].updated_at` | Formatted as "YYYY-MM-DD HH:mm" |

### 2.4 Behavior

- **Open animation**: Fade in overlay + scale-up modal content (200ms)
- **Close triggers**:
  - Click X button (top-right corner)
  - Click overlay backdrop (outside the modal)
  - Press Escape key
- **Close animation**: Fade out (150ms)
- **Scroll**: If content exceeds viewport height, modal body scrolls internally (modal header with close button stays fixed)
- **Body scroll lock**: Page behind the modal does not scroll while modal is open

### 2.5 Sizing

- Desktop: max-width 640px, centered horizontally and vertically
- Mobile: full width with 16px margin, max-height 90vh with internal scroll

---

## 3. PreviewModal

### 3.1 Trigger

PO clicks "미리보기" button in ExportControls when one or more stories are selected.

### 3.2 Layout

```
+---------------------------------------------------------------+
| PreviewModal (full-screen overlay)                             |
| +-----------------------------------------------------------+ |
| | Header Bar                                                 | |
| | [닫기]     미리보기 (N건)                     [다운로드]    | |
| +-----------------------------------------------------------+ |
| |                                                            | |
| | Rendered Markdown Content (scrollable)                     | |
| |                                                            | |
| | # 유저스토리 내보내기                                       | |
| | > 생성일: 2026-04-22                                       | |
| | > 총 N건                                                   | |
| |                                                            | |
| | ## 안전 관리                                               | |
| |                                                            | |
| | ### 1. 작업자 안전 장비 미착용 자동 알림                     | |
| |                                                            | |
| | **유저스토리**                                              | |
| | 안전 담당자로서, 작업자가 안전 장비를 미착용했을 때 자동      | |
| | 알림을 받고 싶다...                                        | |
| |                                                            | |
| | **목적**                                                   | |
| | 안전 장비 미착용으로 인한 사고를 예방하고...                 | |
| |                                                            | |
| | **인수 조건**                                              | |
| | - 작업자가 안전 장비 미착용 시 알림 전송                     | |
| | - 알림에 미착용 작업자 이름, 위치, 시간 포함                 | |
| | - 알림 수신 후 확인 처리 가능                               | |
| |                                                            | |
| | **원본 요구사항**                                          | |
| | > 안전 장비 착용 알림이 있으면 좋겠어요                     | |
| |                                                            | |
| | ---                                                        | |
| |                                                            | |
| | ### 2. (next story...)                                     | |
| |                                                            | |
| +-----------------------------------------------------------+ |
+---------------------------------------------------------------+
```

### 3.3 Content Format

The preview renders the **exact Markdown** that will be downloaded as a file. The content is rendered visually (not raw Markdown text) so the PO can read it comfortably.

**Markdown Structure**:

```markdown
# 유저스토리 내보내기

> 생성일: {YYYY-MM-DD}
> 총 {N}건

---

## {Theme Name 1}

### 1. {Story Summary}

**유저스토리**
{Full user story sentence}

**목적**
{Purpose statement}

**인수 조건**
- {AC 1}
- {AC 2}
- {AC 3}

**시스템 지원 상태**: {시스템 지원 | 개발 필요 | 미분석}

**원본 요구사항**
> {Original requirement text}

---

### 2. {Next Story Summary}

...

## {Theme Name 2}

### 1. {Story under theme 2}

...
```

**Grouping**: Stories are grouped by theme. Within each theme, stories are numbered sequentially (1, 2, 3...).

**Ordering**: Themes sorted alphabetically by name. Stories within each theme sorted by `created_at` ascending.

### 3.4 Behavior

- **Full-screen**: Modal covers the entire viewport
- **Header bar**: Fixed at top with "닫기" (left), title "미리보기 (N건)" (center), "다운로드" (right)
- **Content area**: Scrollable, renders the Markdown as formatted HTML
- **Download button**: Triggers the same export action as ExportControls "내보내기" -- generates and downloads the Markdown file
- **Close triggers**:
  - Click "닫기" button
  - Press Escape key
  - (Clicking outside is not applicable since the modal is full-screen)
- **Body scroll lock**: Page behind does not scroll

### 3.5 Sizing

- Desktop and mobile: full viewport width and height
- Content area: centered, max-width 800px for readability, with horizontal padding
- On mobile: max-width 100%, padding 16px

---

## 4. Shared Modal Patterns

Both modals share these implementation patterns:

### 4.1 Overlay

- Background: `rgba(0, 0, 0, 0.5)` (semi-transparent black)
- z-index: 50 (above all page content)
- Click behavior: StoryDetailModal closes on backdrop click; PreviewModal does not (full-screen)

### 4.2 Focus Management

- When modal opens: focus moves to the first focusable element (close button)
- Tab trapping: focus cycles within the modal (Tab from last element goes to first)
- When modal closes: focus returns to the element that triggered the modal
- Escape key: closes the modal

### 4.3 Scroll Lock

- When any modal is open: `document.body.style.overflow = "hidden"`
- When modal closes: restore original overflow value
- This prevents background page scrolling while the modal is active

### 4.4 Rendering to Portal

- Both modals render via React `createPortal` to `document.body`
- This ensures correct stacking context regardless of parent component nesting

---

## 5. Accessibility

### StoryDetailModal
- Modal container: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="story-detail-title"`
- Close button: `aria-label="모달 닫기"`
- Section headings use appropriate heading levels (h3, h4 within the modal)

### PreviewModal
- Modal container: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="preview-title"`
- Close button: `aria-label="미리보기 닫기"`
- Download button: `aria-label="선택된 유저스토리 다운로드"`
- Content area: `role="document"` for the rendered Markdown content
