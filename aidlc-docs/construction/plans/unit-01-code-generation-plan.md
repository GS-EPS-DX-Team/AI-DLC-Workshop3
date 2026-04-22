# Code Generation Plan: UNIT-01 (Foundation)

> Source: aidlc-docs/construction/unit-01/functional-design.md (v1.0)
> Date: 2026-04-22

---

## 1. Project Structure & Dependencies

- [x] 1.1 Create directory structure (context/, components/, components/common/, pages/, hooks/, utils/)
- [x] 1.2 Install new dependencies (react-router-dom, tailwindcss, @tailwindcss/vite) via npm
- [x] 1.3 Add `.env` to `.gitignore`
- [x] Summary: Created 6 directories under frontend/src/. Installed react-router-dom (dependencies), tailwindcss and @tailwindcss/vite (devDependencies). Added .env to root .gitignore.

## 2. Config / Setup Files

- [x] 2.1 Create `frontend/.env` (AI API env vars)
- [x] 2.2 Create `frontend/tailwind.config.js`
- [x] 2.3 Create `frontend/postcss.config.js`
- [x] 2.4 Modify `frontend/vite.config.js` (add @tailwindcss/vite plugin)
- [x] 2.5 Create `frontend/src/index.css` (Tailwind directives + body reset)
- [x] 2.6 Modify `frontend/index.html` (title -> "말해 뭐해")
- [x] Summary: Created .env with VITE_AI_* variables, tailwind.config.js with content paths, postcss.config.js placeholder, index.css with @import "tailwindcss" and body reset. Modified vite.config.js to add @tailwindcss/vite plugin. Updated index.html title to "말해 뭐해".

## 3. Core Files

- [x] 3.1 Modify `frontend/src/main.jsx` (add BrowserRouter, import index.css)
- [x] 3.2 Create `frontend/src/hooks/useStorage.js` (localStorage hook)
- [x] 3.3 Create `frontend/src/context/AppContext.js` (React context object)
- [x] 3.4 Create `frontend/src/context/AppProvider.jsx` (global state provider skeleton)
- [x] 3.5 Rewrite `frontend/src/App.jsx` (AppProvider + Layout + Routes)
- [x] Summary: main.jsx wrapped with BrowserRouter and imports index.css. useStorage hook provides localStorage read/write with JSON serialization and error handling. AppContext created with createContext(null). AppProvider wires 5 localStorage keys (mhm_requirements, mhm_themes, mhm_user_stories, mhm_conversations, mhm_reference_file). App.jsx defines routes: / -> /user redirect, /user, /admin, * -> 404.

## 4. Layout Components

- [x] 4.1 Create `frontend/src/components/Layout.jsx`
- [x] 4.2 Create `frontend/src/components/Header.jsx` (NavLink active state)
- [x] Summary: Layout renders full-viewport flex column with Header + main. Header renders "말해 뭐해" title and NavLink navigation with active state highlighting (blue bg/text for active, gray for inactive). Focus ring styles and data-testid attributes included on NavLinks.

## 5. Page Components

- [x] 5.1 Create `frontend/src/pages/UserPage.jsx` (stub)
- [x] 5.2 Create `frontend/src/pages/AdminPage.jsx` (stub)
- [x] 5.3 Create `frontend/src/pages/NotFoundPage.jsx` (404 with navigation links)
- [x] Summary: UserPage and AdminPage render centered Korean stub text. NotFoundPage displays 404 with Korean messages and two navigation Links (user/admin) with primary/secondary button styling. All pages have data-testid attributes.

## 6. Utility Functions

- [x] 6.1 Create `frontend/src/utils/idGenerator.js`
- [x] 6.2 Create `frontend/src/utils/dateFormatter.js` (formatDate, formatDateTime, nowISO)
- [x] Summary: idGenerator exports generateId(prefix) returning prefix + 8 random hex chars. dateFormatter exports formatDate (YYYY-MM-DD), formatDateTime (YYYY-MM-DD HH:mm), and nowISO(). All handle null/invalid input gracefully returning empty string.

## 7. Common Components

- [x] 7.1 Create `frontend/src/components/common/ConfirmDialog.jsx`
- [x] 7.2 Create `frontend/src/components/common/LoadingIndicator.jsx`
- [x] 7.3 Create `frontend/src/components/common/EmptyState.jsx`
- [x] Summary: ConfirmDialog is a modal with backdrop, Escape key handling, auto-focus on cancel button, and aria-modal/alertdialog roles. LoadingIndicator shows 3 staggered bouncing dots with optional message. EmptyState shows clipboard SVG icon, message, optional submessage, and optional action button. All have data-testid attributes.

## 8. Build Verification

- [ ] 8.1 Run `npm run build` and verify zero errors
- [ ] 8.2 Verify all 22 items (21 source files + index.html) created/modified
- [ ] Summary: [describe after completion]
