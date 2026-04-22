# Code Generation Plan: UNIT-04 (Admin List & Analysis)

## Project Structure
- [x] Create `frontend/src/components/admin/` directory

## Components
- [x] Generate `frontend/src/components/admin/SystemSupportBadge.jsx` (3-state badge)
- [x] Generate `frontend/src/components/admin/ThemeFilter.jsx` (pill buttons)
- [x] Generate `frontend/src/components/admin/StoryRow.jsx` (individual row)
- [x] Generate `frontend/src/components/admin/StoryList.jsx` (story table/cards)
- [x] Generate `frontend/src/components/admin/ReferenceFileUpload.jsx` (file upload)
- [x] Generate `frontend/src/components/admin/StoryDetailModal.jsx` (detail modal with portal)
- Summary: All 6 admin components created: SystemSupportBadge (3-state badge), ThemeFilter (pill buttons with horizontal scroll), StoryRow (responsive row with truncation), StoryList (table header + row container with themeMap), ReferenceFileUpload (file picker with validation and analysis trigger), StoryDetailModal (portal-based modal with focus trap, Escape close, backdrop close)

## Hook Enhancement
- [x] Verify `frontend/src/hooks/useUserStories.js` (no changes needed)
- [x] Enhance `frontend/src/hooks/useAIService.js` (implement analyzeSystemSupport)
- Summary: useUserStories verified (all 5 functions present, no changes needed). useAIService.analyzeSystemSupport stub replaced with full implementation: system prompt for comparison analysis, temperature 0.2, validates results array with supported/needs_development values, filters invalid items with console.warn

## Page Implementation
- [x] Implement `frontend/src/pages/AdminPage.jsx` (replace stub with full orchestration)
- Summary: AdminPage stub replaced with full implementation. Orchestrates: theme filtering (selectedTheme state), story sorting (created_at descending), detail modal (selectedDetailStoryId + showDetailModal), reference file upload (stored to AppContext), AI analysis (local isAnalyzing flag, bulkUpdateSystemSupport on success), empty state with navigation to user page, auto-clearing analysisError

## Build Verification
- [x] Run `npm run build` and verify no errors
- Summary: Vite production build succeeded. 61 modules transformed, no errors or warnings. Output: dist/index.html (0.40 kB), index.css (18.52 kB), index.js (207.82 kB). Built in 3.40s.
