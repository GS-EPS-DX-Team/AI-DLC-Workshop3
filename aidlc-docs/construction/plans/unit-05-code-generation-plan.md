# Code Generation Plan: UNIT-05 -- Export & Preview

> Date: 2026-04-22
> Unit: UNIT-05 (Export & Preview)
> Complexity: S (Small)
> Dependencies: UNIT-04 (complete)
> Stories: US-018, US-019, US-020

---

## Project Structure
- [x] Verify target directories exist (components/admin, hooks, utils)
- [x] Verify existing files to enhance exist

## Utility Layer
- [x] Generate `frontend/src/utils/markdownGenerator.js` -- markdown content formatting per BR-006
- [x] Summary: Created generateExportMarkdown() that groups stories by theme (alphabetical), sorts within each group by created_at ascending, and formats per BR-006 (H1 title, export timestamp, total count, per-theme H2 with numbered stories including story sentence, purpose, ACs, system support label, and raw requirement text).

## Hook Layer
- [x] Generate `frontend/src/hooks/useExport.js` -- markdown generation + file download
- [x] Summary: Created useExport hook returning generateMarkdown(stories, themes, requirements) and downloadMarkdown(content, filename). Uses Blob + URL.createObjectURL + programmatic click for download. Default filename is user-stories-YYYY-MM-DD.md.

## Component Layer -- New Components
- [x] Generate `frontend/src/components/admin/ExportControls.jsx` -- selection counter, preview/export buttons
- [x] Generate `frontend/src/components/admin/PreviewModal.jsx` -- full-screen markdown preview with download
- [x] Summary: ExportControls shows "N/total건 선택됨" counter with preview (eye icon) and export (download icon) buttons, both disabled when 0 selected. PreviewModal is full-screen with createPortal, lightweight markdown-to-JSX renderer (H1-H3, bold, blockquotes, lists), download button in header, Escape key close, and focus trap.

## Component Layer -- Enhance Existing
- [x] Enhance `frontend/src/components/admin/StoryRow.jsx` -- add checkbox
- [x] Enhance `frontend/src/components/admin/StoryList.jsx` -- add checkbox column, select-all
- [x] Summary: StoryRow now has checkbox column (stopPropagation to prevent row click), isSelected/onToggle props. StoryList header has select-all checkbox with indeterminate state support, both desktop and mobile variants. Grid template updated to 5-column with 40px checkbox column.

## Page Layer -- Wire Everything
- [x] Enhance `frontend/src/pages/AdminPage.jsx` -- wire selection state, export/preview controls
- [x] Summary: AdminPage now manages selectedIds (Set), showPreviewModal, and previewMarkdown state. Wired ExportControls with selection count, preview, and export handlers. Wired PreviewModal with markdown generation and download. handleToggleSelect/handleToggleAll use useCallback. Theme filter change preserves selections of hidden items. getSelectedStories filters from full userStories array by selectedIds.

## Build Verification
- [x] Run `npm run build` and verify no errors
- [x] Summary: `npm run build` completed successfully. 65 modules transformed, no errors or warnings. Output: dist/index.html (0.40 kB), dist/assets/index-BWXfmLnT.css (19.37 kB), dist/assets/index-lBo0kK1L.js (218.71 kB). Built in 3.28s.
