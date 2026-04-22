# SCR-002: Admin Page (관리자 페이지)

> Version: v1.0
> Date: 2026-04-22
> Route: `/admin`
> Related Stories: US-013, US-014, US-016, US-017, US-018, US-019

---

## 1. Page Overview

Management page for the PO (Product Owner) to review all verified user stories, filter by theme, analyze system support status, select multiple stories, and export them as Markdown.

**Target Users**: PO (관리자)
**Primary Actions**: Browse stories, filter by theme, upload reference file, analyze system support, select stories, preview, export

---

## 2. Layout Structure

```
+---------------------------------------------------------------+
|  Header (shared -- see Layout)                                 |
|  [말해 뭐해]                        [사용자]  [관리자]           |
+---------------------------------------------------------------+
|                                                                 |
|  +-----------------------------------------------------------+ |
|  | Toolbar Area                                               | |
|  |                                                            | |
|  | [Theme Filter: 전체 v]   [참조 파일 업로드]                  | |
|  |                                                            | |
|  | [N건 선택됨]              [미리보기] [내보내기]               | |
|  +-----------------------------------------------------------+ |
|                                                                 |
|  +-----------------------------------------------------------+ |
|  | Story List                                                 | |
|  | +-------------------------------------------------------+  | |
|  | | [x] 전체 선택 | 유저스토리 | 테마 | 시스템 지원 | 날짜  |  | |
|  | +-------------------------------------------------------+  | |
|  | | [ ] 작업자 안전 장비 미착용 알림... | 안전 관리 |        |  | |
|  | |     [개발 필요]  2026-04-22                             |  | |
|  | +-------------------------------------------------------+  | |
|  | | [ ] 정비 이력 자동 기록...       | 정비 관리 |           |  | |
|  | |     [시스템 지원]  2026-04-22                           |  | |
|  | +-------------------------------------------------------+  | |
|  | | ...                                                    |  | |
|  +-----------------------------------------------------------+ |
|                                                                 |
|  [EmptyState -- shown when no stories exist]                   |
+---------------------------------------------------------------+
```

---

## 3. Component Specifications

### 3.1 Toolbar Area

The toolbar is a horizontal bar above the story list, divided into two rows (or a single responsive row on desktop).

**Row 1 (Filtering & Upload)**:
- ThemeFilter: left side
- ReferenceFileUpload: right side

**Row 2 (Selection & Actions)**:
- Selection counter: left side ("N건 선택됨")
- Action buttons: right side ("미리보기", "내보내기")

On mobile, these stack vertically.

### 3.2 ThemeFilter

**Appearance**: Dropdown select or pill-style button group.

**Options**:
- "전체" (all) -- default, shows all stories
- One option per distinct theme found in `mhm_themes`
- Dynamically populated from localStorage data

**Behavior**:
- Selecting a theme: filters StoryList to show only stories with matching `theme_id`
- Selecting "전체": removes filter, shows all stories
- Active filter visually indicated (e.g., selected pill is filled, dropdown shows selection)
- Filter state is local (not persisted to localStorage)

### 3.3 ReferenceFileUpload

**Appearance**: 
- Button with upload icon: "참조 파일 업로드"
- If a file is already uploaded: shows file name and a "변경" (change) button and "분석 시작" (start analysis) button

**Supported file types**: `.txt`, `.md`, `.json` (text-based files only)

**Behavior**:
1. PO clicks the upload button
2. Browser file picker opens (accept: .txt, .md, .json)
3. Selected file is read as text using FileReader API
4. File name and content stored in localStorage under `mhm_reference_file`
5. UI updates to show uploaded file name
6. "분석 시작" button becomes available

**Analysis trigger**:
1. PO clicks "분석 시작"
2. All verified user stories are sent to `useAIService().analyzeSystemSupport()` along with reference file content
3. Loading indicator shown on the button
4. Results update `system_support` field on each user story
5. SystemSupportBadge on each StoryRow updates accordingly

### 3.4 ExportControls

**Selection Counter**:
- Text: "N건 선택됨" (where N is the count of checked stories)
- When N = 0: "선택된 항목이 없습니다"

**Preview Button (미리보기)**:
- Text: "미리보기"
- Disabled state: when no items selected (grayed out, cursor not-allowed)
- Click: opens PreviewModal with selected stories

**Export Button (내보내기)**:
- Text: "내보내기"
- Disabled state: when no items selected
- Click: generates Markdown file and triggers browser download
- Downloaded file name: `user-stories-YYYY-MM-DD.md`

### 3.5 StoryList

**Layout**: Table-like list with header row and data rows.

**Header Row**:

| Column | Width | Content |
|--------|-------|---------|
| Checkbox | 40px | "전체 선택" checkbox |
| User Story | flex-grow | Column label: "유저스토리" |
| Theme | 120px | Column label: "테마" |
| System Support | 120px | Column label: "시스템 지원" |
| Date | 100px | Column label: "날짜" |

**Behavior**:
- "전체 선택" checkbox: toggles all currently visible (filtered) rows
- If theme filter is active, "전체 선택" only affects visible rows
- Previously selected items outside the current filter remain selected
- Sorted by `created_at` descending (newest first, fixed sort)
- On mobile: table collapses to card layout (see Responsive section)

### 3.6 StoryRow

**Desktop Layout**: Single table row.

| Element | Description |
|---------|-------------|
| Checkbox | Left-most, toggles selection of this story |
| Story summary | Truncated first line of the `story` field (max 60 chars + "...") |
| Theme badge | Pill badge with theme name (colored based on theme) |
| SystemSupportBadge | "시스템 지원" / "개발 필요" / "미분석" badge |
| Date | `created_at` formatted as "YYYY-MM-DD" |

**Mobile Layout**: Card format.

```
+---------------------------------------------------+
| [ ] [Theme Badge]  [SystemSupportBadge]            |
| Story summary text (2 lines max)...               |
| 2026-04-22                                         |
+---------------------------------------------------+
```

**Click Behavior**:
- Clicking anywhere on the row (except the checkbox) opens StoryDetailModal for that story
- Clicking the checkbox toggles selection without opening the modal

### 3.7 SystemSupportBadge

Three visual states:

| Status | Label | Color |
|--------|-------|-------|
| `"supported"` | 시스템 지원 | Green background, green text (e.g., `bg-green-100 text-green-800`) |
| `"needs_development"` | 개발 필요 | Orange background, orange text (e.g., `bg-orange-100 text-orange-800`) |
| `"not_analyzed"` | 미분석 | Gray background, gray text (e.g., `bg-gray-100 text-gray-500`) |

**Shape**: Rounded pill badge, small font size.

### 3.8 EmptyState

**Visibility**: Shown when no verified user stories exist in localStorage.

**Content**:
- Icon: clipboard or list icon placeholder
- Message: "등록된 유저스토리가 없습니다"
- Sub-message: "사용자 페이지에서 요구사항을 입력하고 승인하면 여기에 표시됩니다"
- Action button: "사용자 페이지로 이동" (navigates to /user)

---

## 4. Interaction Flows

### 4.1 Browse and Filter

1. PO navigates to /admin
2. All verified user stories are loaded from localStorage via context
3. Story list displays all stories sorted by newest first
4. PO selects a theme from ThemeFilter
5. List filters to show only stories of that theme
6. PO selects "전체" to clear the filter

### 4.2 System Support Analysis

1. PO clicks "참조 파일 업로드"
2. Selects a .txt/.md/.json file from the file picker
3. File name appears in the UI
4. PO clicks "분석 시작"
5. Loading indicator appears on the button
6. AI analyzes each story against the reference file
7. Results update SystemSupportBadge on each StoryRow
8. Badges change from "미분석" to "시스템 지원" or "개발 필요"

### 4.3 Select and Export

1. PO checks individual story checkboxes (or uses "전체 선택")
2. Selection counter updates: "N건 선택됨"
3. PO clicks "미리보기" to see the export content (opens PreviewModal)
4. PO reviews and closes the preview
5. PO clicks "내보내기" to download the Markdown file
6. Browser downloads `user-stories-2026-04-22.md`

### 4.4 View Story Detail

1. PO clicks on a StoryRow (not the checkbox)
2. StoryDetailModal opens with full story information
3. PO reviews the story, purpose, AC, source requirement, and system support status
4. PO clicks close button or presses Escape to dismiss

---

## 5. Responsive Behavior

### Desktop (width >= 1024px)
- Toolbar: single row, filters on left, actions on right
- Story list: table layout with all columns visible
- Max content width: 1200px, centered

### Tablet (768px <= width < 1024px)
- Toolbar: two rows (filters top, actions bottom)
- Story list: table layout, system support column may use icon-only badges
- Full width with 24px padding

### Mobile (width < 768px)
- Toolbar: stacked vertically (filter, upload, counter, buttons)
- Story list: card layout instead of table
- Each card shows all info in a compact vertical format
- Action buttons: full width, stacked

---

## 6. Accessibility

- ThemeFilter: `aria-label="테마 필터"`
- "전체 선택" checkbox: `aria-label="전체 선택"`
- Each StoryRow checkbox: `aria-label="[story summary] 선택"`
- Export button: `aria-label="선택된 유저스토리 내보내기"`
- Preview button: `aria-label="선택된 유저스토리 미리보기"`
- StoryList container: `role="table"` (desktop) or `role="list"` (mobile card view)
- Empty state: `role="status"`
- SystemSupportBadge: includes `aria-label` with full text (e.g., "시스템 지원 상태: 개발 필요")
- Reference file upload: `aria-label="참조 파일 업로드"` on the hidden file input
