# UNIT-01 Functional Design -- Foundation

> Version: v1.0
> Date: 2026-04-22
> Stage: CONSTRUCTION / UNIT-01 / Functional Design
> Source: application-design.md, units.md, user-stories.md (US-021~US-027), business-rules.md (BR-008), schema.md, SCR-001, SCR-002

---

## Table of Contents

1. [Established Patterns](#1-established-patterns)
2. [Config / Setup Files](#2-config--setup-files)
3. [Core Files](#3-core-files)
4. [Layout Components](#4-layout-components)
5. [Page Components](#5-page-components)
6. [Hooks](#6-hooks)
7. [Utility Functions](#7-utility-functions)
8. [Common Components](#8-common-components)
9. [File Checklist](#9-file-checklist)

---

## 1. Established Patterns

These patterns apply to every file in UNIT-01 and all subsequent units. The developer must follow them consistently.

### 1.1 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React component | PascalCase `.jsx` | `Header.jsx`, `ConfirmDialog.jsx` |
| Hook | camelCase with `use` prefix `.js` | `useStorage.js` |
| Context definition | PascalCase `.js` | `AppContext.js` |
| Context provider | PascalCase `.jsx` | `AppProvider.jsx` |
| Utility module | camelCase `.js` | `idGenerator.js`, `dateFormatter.js` |
| Config file | lowercase with dots | `tailwind.config.js`, `postcss.config.js` |
| Environment file | `.env` | `frontend/.env` |

### 1.2 Export Conventions

| Type | Export Style | Example |
|------|-------------|---------|
| React component | `export default function ComponentName` | `export default function Header() { ... }` |
| Hook | Named export | `export function useStorage(key, initialValue) { ... }` |
| Context object | Named export | `export const AppContext = createContext(null);` |
| Utility function | Named exports (one or more per file) | `export function generateId(prefix) { ... }` |

### 1.3 Component Structure Template

Every React component file follows this order:

```
1. Imports (React, hooks, components, utils -- grouped by type)
2. Component function definition (export default function)
3. JSX return (semantic HTML, Tailwind classes)
```

No prop destructuring in the function signature line when props exceed 3. Instead, destructure inside the function body for readability.

### 1.4 Tailwind Class Organization

Within a single element's `className`, order classes as:

```
layout (flex, grid, block) ->
sizing (w-, h-, min-, max-) ->
spacing (p-, m-, gap-) ->
typography (text-, font-, leading-) ->
colors (bg-, text-, border-) ->
borders (border, rounded-) ->
effects (shadow-, opacity-) ->
transitions (transition-, duration-) ->
responsive (sm:, md:, lg:)
```

### 1.5 Korean UI Text

All user-facing strings are hardcoded in Korean directly in JSX. No i18n framework. Error messages, labels, placeholders, button text, and headings are all in Korean.

### 1.6 Accessibility Baseline

Every component must include:
- Semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<header>`, `<h1>`-`<h6>`)
- `aria-label` on icon-only buttons and interactive elements without visible text labels
- Keyboard operability: all interactive elements reachable via Tab, activatable via Enter/Space
- Visible focus indicators (Tailwind `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`)

---

## 2. Config / Setup Files

### 2.1 `frontend/.env` (NEW)

**Purpose**: Environment variables for AI API configuration. This file is NOT committed to git.

**Exact content**:

```env
VITE_AI_API_URL=https://api.openai.com/v1
VITE_AI_API_KEY=
VITE_AI_MODEL=gpt-4o-mini
```

**Notes**:
- `VITE_AI_API_KEY` is intentionally left empty. The developer or user fills it in locally.
- All three variables are prefixed with `VITE_` so Vite exposes them to client code via `import.meta.env`.
- Add `.env` to `.gitignore` if not already present.

---

### 2.2 `frontend/tailwind.config.js` (NEW)

**Purpose**: Tailwind CSS v4 configuration.

**Exact content**:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Notes**:
- Tailwind v4 with `@tailwindcss/vite` plugin may not require this file if using CSS-first configuration. However, we include it for explicit `content` path configuration to ensure class scanning works.
- No custom theme extensions needed for UNIT-01. Future units may add custom colors if needed.

---

### 2.3 `frontend/postcss.config.js` (NEW)

**Purpose**: PostCSS configuration for Tailwind integration.

**Exact content**:

```js
export default {
  plugins: {},
};
```

**Notes**:
- With Tailwind v4 and the `@tailwindcss/vite` plugin, PostCSS is minimally configured. The Vite plugin handles Tailwind processing directly.
- This file exists as a placeholder to prevent build tool warnings.

---

### 2.4 `frontend/vite.config.js` (MODIFY)

**Purpose**: Add the Tailwind CSS Vite plugin.

**Current content**:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

**Modified content**:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
});
```

**Changes**:
1. Add `import tailwindcss from "@tailwindcss/vite";`
2. Add `tailwindcss()` to the `plugins` array

---

### 2.5 `frontend/package.json` (MODIFY)

**Purpose**: Add required dependencies.

**Dependencies to add**:

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.5.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.1.0",
    "vite": "^6.0.0"
  }
}
```

**Changes from current**:
1. Add `"react-router-dom": "^7.5.0"` to `dependencies`
2. Add `"tailwindcss": "^4.1.0"` to `devDependencies`
3. Add `"@tailwindcss/vite": "^4.1.0"` to `devDependencies`

---

### 2.6 `frontend/src/index.css` (NEW)

**Purpose**: Global styles with Tailwind CSS directives.

**Exact content**:

```css
@import "tailwindcss";

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Notes**:
- Tailwind v4 uses `@import "tailwindcss"` instead of the v3 `@tailwind base; @tailwind components; @tailwind utilities;` directives.
- `"Noto Sans KR"` is included in the font stack for Korean text rendering. No Google Fonts import is needed -- the system falls back naturally.
- The `body` reset removes default margin.

---

### 2.7 `frontend/index.html` (MODIFY -- minor)

**Purpose**: Update the page title.

**Change**: Update the `<title>` tag from `App` to `말해 뭐해`.

```html
<title>말해 뭐해</title>
```

The `lang="ko"` attribute is already correctly set. No other changes.

---

## 3. Core Files

### 3.1 `frontend/src/main.jsx` (MODIFY)

**Purpose**: Add BrowserRouter wrapper and import global CSS.

**Modified content**:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**Changes from current**:
1. Add `import { BrowserRouter } from "react-router-dom";`
2. Add `import "./index.css";`
3. Wrap `<App />` with `<BrowserRouter>`

---

### 3.2 `frontend/src/App.jsx` (REWRITE)

**Purpose**: Root component that composes AppProvider, Layout, and route definitions.

**Behavior**:
- Wraps everything in `AppProvider` for global state access
- Defines all application routes inside `Layout`
- Route `/` redirects to `/user`
- Route `/user` renders `UserPage`
- Route `/admin` renders `AdminPage`
- Route `*` renders `NotFoundPage`

**Full implementation specification**:

```jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import Layout from "./components/Layout";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/user" replace />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}
```

**Notes**:
- `<Navigate to="/user" replace />` performs a client-side redirect with history replacement (no back-button loop).
- Layout wraps Routes via `children` prop, not via `<Outlet>`. This keeps the routing configuration centralized in App.jsx.

**Related stories**: US-021 (SPA routing)

---

### 3.3 `frontend/src/context/AppContext.js` (NEW)

**Purpose**: Create the React Context object.

**Full implementation specification**:

```js
import { createContext } from "react";

export const AppContext = createContext(null);
```

**Notes**:
- Initial value is `null`. Components consuming the context must be wrapped in `AppProvider`.
- Named export, not default export.
- This file contains ONLY the context creation. All state logic is in `AppProvider.jsx`.

---

### 3.4 `frontend/src/context/AppProvider.jsx` (NEW -- skeleton)

**Purpose**: Global state provider. In UNIT-01, this is a skeleton that initializes localStorage data and provides read access. Full CRUD actions are wired in later units (UNIT-02, UNIT-03).

**Props Interface**:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | ReactNode | Yes | -- | Child components to wrap |

**Context shape (UNIT-01 skeleton)**:

```js
{
  // Read-only data loaded from localStorage
  requirements: [],         // Array of requirement records
  themes: [],              // Array of theme records
  userStories: [],         // Array of user story records
  conversations: [],       // Array of conversation records
  referenceFile: null,     // Reference file object or null

  // Setter functions (exposed for future unit wiring)
  setRequirements: Function,
  setThemes: Function,
  setUserStories: Function,
  setConversations: Function,
  setReferenceFile: Function,
}
```

**Behavior**:
1. On mount, read each localStorage key using the `useStorage` hook:
   - `mhm_requirements` (default: `[]`)
   - `mhm_themes` (default: `[]`)
   - `mhm_user_stories` (default: `[]`)
   - `mhm_conversations` (default: `[]`)
   - `mhm_reference_file` (default: `null`)
2. Provide both the stored values and their setter functions via context.
3. When any setter is called, the `useStorage` hook automatically writes to both React state and localStorage.

**Full implementation specification**:

```jsx
import { AppContext } from "./AppContext";
import { useStorage } from "../hooks/useStorage";

export function AppProvider({ children }) {
  const [requirements, setRequirements] = useStorage("mhm_requirements", []);
  const [themes, setThemes] = useStorage("mhm_themes", []);
  const [userStories, setUserStories] = useStorage("mhm_user_stories", []);
  const [conversations, setConversations] = useStorage("mhm_conversations", []);
  const [referenceFile, setReferenceFile] = useStorage("mhm_reference_file", null);

  const value = {
    requirements,
    themes,
    userStories,
    conversations,
    referenceFile,
    setRequirements,
    setThemes,
    setUserStories,
    setConversations,
    setReferenceFile,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
```

**Notes**:
- Named export `AppProvider` (not default). This is consistent with the convention of exporting providers as named exports.
- In UNIT-01, no action functions (addRequirement, updateStatus, etc.) are exposed. Those are added in UNIT-02 and UNIT-03.
- The skeleton is fully functional: data persists across refresh, and the admin page can read what the user page writes.

**Related stories**: US-023 (localStorage persistence), US-024 (data access abstraction)

---

## 4. Layout Components

### 4.1 `frontend/src/components/Layout.jsx` (NEW)

**Purpose**: Shared layout with Header at top and main content area below.

**Props Interface**:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | ReactNode | Yes | -- | Route content to render below Header |

**Component behavior**:
- Renders a full-viewport-height flex column
- Header at the top (fixed height)
- Main content area fills remaining space
- Main content area is a `<main>` element for semantic HTML

**JSX structure**:

```jsx
<div className="flex flex-col h-screen bg-gray-50">
  <Header />
  <main className="flex-1 overflow-hidden">
    {children}
  </main>
</div>
```

**Tailwind classes explained**:
- `flex flex-col`: Vertical flex layout
- `h-screen`: Full viewport height
- `bg-gray-50`: Light gray background for the entire app
- `flex-1`: Main content takes all remaining height
- `overflow-hidden`: Prevents double scrollbars (individual pages manage their own scroll)

**Accessibility**:
- `<main>` element provides the main landmark for assistive technologies
- No additional ARIA attributes needed on the layout wrapper

**Related stories**: US-022 (page navigation -- Layout provides the frame)

---

### 4.2 `frontend/src/components/Header.jsx` (NEW)

**Purpose**: Top navigation bar. Left side: app title "말해 뭐해". Right side: NavLink "사용자" (/user) and NavLink "관리자" (/admin). Active link visually highlighted.

**Props Interface**: None (no props).

**Component behavior**:
- Renders a `<header>` element with a `<nav>` inside
- Uses `NavLink` from react-router-dom for active state detection
- Active link has distinct styling (filled background, bold text)
- Inactive link has subtle styling (transparent background, normal text)
- Header has a bottom border/shadow to separate from content

**JSX structure**:

```jsx
<header className="flex items-center justify-between h-14 px-4 bg-white border-b border-gray-200 shrink-0">
  <h1 className="text-lg font-bold text-gray-900">
    말해 뭐해
  </h1>
  <nav className="flex items-center gap-1" aria-label="메인 내비게이션">
    <NavLink
      to="/user"
      className={({ isActive }) =>
        isActive
          ? "px-3 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg"
          : "px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      }
    >
      사용자
    </NavLink>
    <NavLink
      to="/admin"
      className={({ isActive }) =>
        isActive
          ? "px-3 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg"
          : "px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      }
    >
      관리자
    </NavLink>
  </nav>
</header>
```

**Tailwind classes explained**:
- Header: `flex items-center justify-between` (horizontal layout, vertically centered, spread apart), `h-14` (56px height), `px-4` (16px horizontal padding), `bg-white` (white background), `border-b border-gray-200` (bottom border), `shrink-0` (does not shrink in flex column)
- Title: `text-lg font-bold text-gray-900` (18px, bold, near-black)
- Active NavLink: `text-blue-700 bg-blue-50` (blue text on light blue background), `font-semibold` (600 weight)
- Inactive NavLink: `text-gray-600 hover:text-gray-900 hover:bg-gray-100` (gray text, darker on hover), `transition-colors` (smooth color transition)
- Both NavLinks: `px-3 py-1.5` (12px horizontal, 6px vertical padding), `text-sm` (14px), `rounded-lg` (8px border radius)

**Accessibility**:
- `<header>` provides the banner landmark
- `<nav>` with `aria-label="메인 내비게이션"` identifies the navigation purpose
- `NavLink` renders as `<a>` elements, which are keyboard-navigable by default
- Focus styles: Add `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2` to each NavLink's className (both active and inactive variants)

**Keyboard behavior**:
- Tab: cycles through NavLinks
- Enter: activates the focused NavLink (default `<a>` behavior)

**Related stories**: US-022 (page navigation with active highlight)

---

## 5. Page Components

### 5.1 `frontend/src/pages/UserPage.jsx` (NEW -- stub)

**Purpose**: Placeholder for the user page. Full implementation in UNIT-02.

**Props Interface**: None.

**JSX structure**:

```jsx
<div className="flex flex-col items-center justify-center h-full p-4">
  <h2 className="text-xl font-semibold text-gray-700 mb-2">
    사용자 페이지
  </h2>
  <p className="text-gray-500">
    이 페이지는 준비 중입니다.
  </p>
</div>
```

**Tailwind classes**:
- `flex flex-col items-center justify-center h-full`: Centered content filling the main area
- `text-xl font-semibold text-gray-700`: Heading style
- `text-gray-500`: Subtitle muted text

**Related stories**: US-021 (route exists and renders)

---

### 5.2 `frontend/src/pages/AdminPage.jsx` (NEW -- stub)

**Purpose**: Placeholder for the admin page. Full implementation in UNIT-04.

**Props Interface**: None.

**JSX structure**:

```jsx
<div className="flex flex-col items-center justify-center h-full p-4">
  <h2 className="text-xl font-semibold text-gray-700 mb-2">
    관리자 페이지
  </h2>
  <p className="text-gray-500">
    이 페이지는 준비 중입니다.
  </p>
</div>
```

**Related stories**: US-021 (route exists and renders)

---

### 5.3 `frontend/src/pages/NotFoundPage.jsx` (NEW)

**Purpose**: 404 page displayed for any unmatched route. Shows a Korean error message and navigation links.

**Props Interface**: None.

**Component behavior**:
- Displays a centered 404 message
- Provides links to `/user` and `/admin`
- Uses `Link` from react-router-dom for client-side navigation

**JSX structure**:

```jsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <p className="text-6xl font-bold text-gray-300 mb-4" aria-hidden="true">
        404
      </p>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-500 mb-6">
        요청하신 페이지가 존재하지 않습니다.
      </p>
      <div className="flex gap-3">
        <Link
          to="/user"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          사용자 페이지로 이동
        </Link>
        <Link
          to="/admin"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          관리자 페이지로 이동
        </Link>
      </div>
    </div>
  );
}
```

**Tailwind classes explained**:
- Container: `flex flex-col items-center justify-center h-full p-4 text-center` (centered both axes, fills parent height)
- 404 number: `text-6xl font-bold text-gray-300` (large decorative number), `aria-hidden="true"` (decorative, hidden from screen readers)
- Primary button (사용자): `bg-blue-600 text-white hover:bg-blue-700` (blue filled button)
- Secondary button (관리자): `bg-white text-gray-700 border border-gray-300 hover:bg-gray-50` (outlined button)
- Both buttons: `px-4 py-2 text-sm font-medium rounded-lg transition-colors` with focus ring

**Accessibility**:
- The `404` text is `aria-hidden="true"` because the `<h2>` provides the meaningful message
- Links are keyboard-navigable by default
- Focus rings on both links

**Related stories**: US-021 AC-4 (invalid URL shows 404 with navigation), US-026 (Korean text)

---

## 6. Hooks

### 6.1 `frontend/src/hooks/useStorage.js` (NEW)

**Purpose**: Generic hook for localStorage read/write with JSON serialization. This is the single abstraction layer between the application and localStorage. No component or hook should call `localStorage.getItem()` or `localStorage.setItem()` directly.

**Function signature**:

```js
export function useStorage(key, initialValue)
```

**Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | localStorage key (e.g., `"mhm_requirements"`) |
| `initialValue` | any | Yes | Default value if the key does not exist in localStorage. Can be any JSON-serializable value: array, object, string, number, or `null`. |

**Return value**:

```js
[storedValue, setValue]
```

| Return | Type | Description |
|--------|------|-------------|
| `storedValue` | any | The current value (parsed from localStorage, or `initialValue` if no stored data exists) |
| `setValue` | Function | Setter function. Accepts a new value or an updater function `(prev) => next`. Updates both React state and localStorage. |

**Detailed behavior**:

1. **Initialization (on mount)**:
   - Try `localStorage.getItem(key)`
   - If the result is `null` (key does not exist): use `initialValue` as the initial state
   - If the result is not `null`: try `JSON.parse(result)`
     - If parse succeeds: use the parsed value as the initial state
     - If parse fails (SyntaxError): log a warning to `console.warn` with the key name, and use `initialValue`
   - Use lazy initialization in `useState` to avoid reading localStorage on every render:
     ```js
     const [storedValue, setStoredValue] = useState(() => { /* read logic */ });
     ```

2. **setValue(newValue)**:
   - If `newValue` is a function, call it with the current `storedValue` to get the actual new value (updater pattern, same as `useState`)
   - Try `JSON.stringify(valueToStore)` and `localStorage.setItem(key, serialized)`
   - If serialization or storage succeeds: update React state via `setStoredValue`
   - If `localStorage.setItem` throws (QuotaExceededError): log `console.warn("저장 공간이 부족합니다: " + key)` and do NOT update React state (keep the old value consistent with what is in localStorage)

3. **No cross-tab sync**: This hook does not listen for `storage` events from other tabs. This is a workshop prototype and cross-tab sync is out of scope.

**Error handling summary**:

| Error | Handling | User impact |
|-------|---------|-------------|
| `JSON.parse` fails on read | `console.warn`, return `initialValue` | App starts with defaults; corrupted data is silently ignored |
| `JSON.stringify` fails on write | `console.warn`, state not updated | Write is silently dropped; old value preserved |
| `QuotaExceededError` on write | `console.warn("저장 공간이 부족합니다: " + key)`, state not updated | Write is silently dropped; old value preserved |
| `localStorage` not available (e.g., SSR) | `console.warn`, return `initialValue`, setValue is a no-op | App works with in-memory defaults but does not persist |

**Full implementation specification**:

```js
import { useState } from "react";

export function useStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`localStorage 읽기 오류 (${key}):`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`localStorage 쓰기 오류 (${key}):`, error);
    }
  };

  return [storedValue, setValue];
}
```

**Usage examples**:

```js
// Array data
const [requirements, setRequirements] = useStorage("mhm_requirements", []);

// Updater pattern
setRequirements(prev => [...prev, newRequirement]);

// Single object
const [referenceFile, setReferenceFile] = useStorage("mhm_reference_file", null);

// Replace entirely
setReferenceFile({ name: "file.md", content: "...", uploaded_at: "..." });
```

**Related stories**: US-023 (localStorage persistence), US-024 (data access abstraction)

---

## 7. Utility Functions

### 7.1 `frontend/src/utils/idGenerator.js` (NEW)

**Purpose**: Generate unique prefixed IDs for all entity types.

**Function signature**:

```js
export function generateId(prefix)
```

**Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prefix` | string | Yes | One of: `"req_"`, `"theme_"`, `"us_"`, `"conv_"`, `"msg_"` |

**Return value**: `string` -- The prefix followed by 8 random hexadecimal characters.

**Algorithm**:
1. Generate 8 random hex characters using `Math.random().toString(16).substring(2, 10)`
2. If the result is shorter than 8 characters (rare edge case when `Math.random()` produces a short hex), pad with leading zeros
3. Concatenate `prefix` + the 8-character hex string
4. Return the result

**Full implementation specification**:

```js
export function generateId(prefix) {
  const hex = Math.random().toString(16).substring(2, 10).padStart(8, "0");
  return `${prefix}${hex}`;
}
```

**Input/output examples**:

| Input | Output (example) |
|-------|-----------------|
| `"req_"` | `"req_a1b2c3d4"` |
| `"theme_"` | `"theme_e5f6a7b8"` |
| `"us_"` | `"us_c9d0e1f2"` |
| `"conv_"` | `"conv_g3h4i5j6"` |
| `"msg_"` | `"msg_k7l8m9n0"` |

**Edge cases**:
- If `prefix` is empty string: returns just the 8-char hex. This is valid but not recommended.
- If `prefix` is `undefined` or `null`: returns `"undefined..."` or `"null..."`. The caller is responsible for passing a correct prefix. No runtime validation is performed (workshop scope).

**Uniqueness guarantee**: `Math.random()` provides sufficient entropy for a workshop prototype. Collision probability over 1000 IDs is negligible (~0.0000015%).

**Related stories**: US-023 (data records need unique IDs per schema.md)

---

### 7.2 `frontend/src/utils/dateFormatter.js` (NEW)

**Purpose**: Format ISO 8601 date strings to Korean display formats.

**Exported functions**:

#### `formatDate(isoString)`

Formats an ISO date to `YYYY-MM-DD` format (used in admin list, detail views).

```js
export function formatDate(isoString)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isoString` | string | Yes | ISO 8601 date string (e.g., `"2026-04-22T09:00:00.000Z"`) |

**Return value**: `string` -- Formatted as `"YYYY-MM-DD"`.

**Implementation**:

```js
export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
```

**Input/output examples**:

| Input | Output |
|-------|--------|
| `"2026-04-22T09:00:00.000Z"` | `"2026-04-22"` |
| `"2026-01-05T23:59:59.999Z"` | `"2026-01-06"` (or `"2026-01-05"` depending on timezone -- uses local timezone) |
| `""` | `""` |
| `null` | `""` |
| `"invalid"` | `""` |

#### `formatDateTime(isoString)`

Formats an ISO date to `YYYY-MM-DD HH:mm` format (used in detail modals for precise timestamps).

```js
export function formatDateTime(isoString)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isoString` | string | Yes | ISO 8601 date string |

**Return value**: `string` -- Formatted as `"YYYY-MM-DD HH:mm"`.

**Implementation**:

```js
export function formatDateTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
```

**Input/output examples**:

| Input | Output |
|-------|--------|
| `"2026-04-22T09:00:00.000Z"` | `"2026-04-22 18:00"` (KST, UTC+9) |
| `""` | `""` |
| `null` | `""` |

#### `nowISO()`

Returns the current time as an ISO 8601 string. Used when creating `created_at` and `updated_at` timestamps.

```js
export function nowISO()
```

**Parameters**: None.

**Return value**: `string` -- ISO 8601 timestamp (e.g., `"2026-04-22T09:00:00.000Z"`).

**Implementation**:

```js
export function nowISO() {
  return new Date().toISOString();
}
```

**Input/output examples**:

| Call | Output (example) |
|------|-----------------|
| `nowISO()` | `"2026-04-22T09:00:00.000Z"` |

**Edge cases for all functions**:
- `null` or `undefined` input: returns empty string `""` (no crash)
- Invalid date string: returns empty string `""` (no crash)
- Timezone: `formatDate` and `formatDateTime` use local timezone (browser's timezone). For a Korean audience, this is typically KST (UTC+9).

**Related stories**: US-023 (timestamps on records), US-013 (date display in admin list)

---

## 8. Common Components

### 8.1 `frontend/src/components/common/ConfirmDialog.jsx` (NEW)

**Purpose**: Reusable Korean confirmation dialog. Displayed as a modal overlay. Used for all destructive actions (reject item, start new conversation, etc.).

**Props Interface**:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isOpen` | boolean | Yes | -- | Whether the dialog is visible |
| `title` | string | Yes | -- | Dialog title text (Korean) |
| `message` | string | Yes | -- | Dialog body text (Korean) |
| `onConfirm` | function | Yes | -- | Called when user clicks "확인" |
| `onCancel` | function | Yes | -- | Called when user clicks "취소" or presses Escape or clicks backdrop |

**Component behavior**:
1. When `isOpen` is `false`: renders nothing (`return null`)
2. When `isOpen` is `true`:
   - Renders a semi-transparent backdrop covering the entire viewport
   - Centers a dialog box on screen
   - Focus is trapped inside the dialog (Tab cycles between "취소" and "확인" buttons)
   - Pressing Escape calls `onCancel`
   - Clicking the backdrop calls `onCancel`
   - "확인" button calls `onConfirm`
   - "취소" button calls `onCancel`
3. On open, auto-focus the "취소" button (safe default -- user must intentionally tab to "확인" to proceed with destructive action)

**JSX structure**:

```jsx
{/* Backdrop */}
<div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  onClick={onCancel}
  role="presentation"
>
  {/* Dialog */}
  <div
    className="w-full max-w-sm mx-4 p-6 bg-white rounded-xl shadow-xl"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-message"
    onClick={(e) => e.stopPropagation()}
  >
    <h3
      id="confirm-dialog-title"
      className="text-lg font-semibold text-gray-900 mb-2"
    >
      {title}
    </h3>
    <p
      id="confirm-dialog-message"
      className="text-sm text-gray-600 mb-6"
    >
      {message}
    </p>
    <div className="flex justify-end gap-3">
      <button
        type="button"
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        onClick={onCancel}
        ref={cancelButtonRef}
      >
        취소
      </button>
      <button
        type="button"
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        onClick={onConfirm}
      >
        확인
      </button>
    </div>
  </div>
</div>
```

**Implementation details**:
- Use `useRef` to create `cancelButtonRef` and auto-focus on mount via `useEffect`
- Use `useEffect` with a keydown listener for Escape:
  ```js
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);
  ```
- Use `useEffect` to focus the cancel button when the dialog opens:
  ```js
  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [isOpen]);
  ```

**Tailwind classes explained**:
- Backdrop: `fixed inset-0 z-50` (covers viewport, high z-index), `bg-black/50` (50% opacity black)
- Dialog box: `w-full max-w-sm mx-4` (max 384px width, 16px margin on mobile), `p-6` (24px padding), `bg-white rounded-xl shadow-xl` (white card with large border radius and shadow)
- Cancel button: Outlined style -- `bg-white border border-gray-300 text-gray-700`
- Confirm button: Filled red -- `bg-red-600 text-white hover:bg-red-700` (red because it confirms a destructive action)

**Accessibility**:
- `role="alertdialog"` on the dialog container
- `aria-modal="true"` to indicate modality
- `aria-labelledby` and `aria-describedby` link to the title and message
- Focus management: auto-focus cancel button on open
- Escape key dismisses
- Backdrop click dismisses
- `e.stopPropagation()` on the dialog prevents backdrop click from firing when clicking inside the dialog

**Related stories**: US-027 (confirmation before destructive actions)

---

### 8.2 `frontend/src/components/common/LoadingIndicator.jsx` (NEW)

**Purpose**: Typing animation (three bouncing dots) displayed while waiting for AI response. Can optionally show a text message.

**Props Interface**:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `message` | string | No | `""` | Optional text to display below or alongside the dots |

**Component behavior**:
- Renders three small circles with a staggered bounce animation
- If `message` is provided, renders it as muted text below the dots
- Animation is CSS-only (Tailwind keyframes)

**JSX structure**:

```jsx
<div className="flex items-center gap-1.5 p-3" role="status" aria-label="처리 중">
  <div className="flex gap-1">
    <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
    <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
    <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
  {message && (
    <span className="text-xs text-gray-400 ml-2">{message}</span>
  )}
</div>
```

**Tailwind classes explained**:
- Dot: `w-2 h-2` (8px circle), `bg-gray-400` (medium gray), `rounded-full` (circular), `animate-bounce` (Tailwind bounce keyframe)
- Container: `flex items-center gap-1.5 p-3` (horizontal layout, small gap, padding)
- Message text: `text-xs text-gray-400 ml-2` (12px, gray, left margin)
- The `animationDelay` inline styles create the staggered wave effect

**Accessibility**:
- `role="status"` makes the element a live region (screen readers announce it)
- `aria-label="처리 중"` provides the accessible name

**Related stories**: US-005 AC-2 (loading indicator during AI processing)

---

### 8.3 `frontend/src/components/common/EmptyState.jsx` (NEW)

**Purpose**: Generic empty state component with a message and optional action button. Used when lists are empty (no user stories on admin page, etc.).

**Props Interface**:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `message` | string | Yes | -- | Primary empty state message (Korean) |
| `submessage` | string | No | `""` | Secondary descriptive text below the message |
| `actionLabel` | string | No | `""` | Button text. If empty, no button is rendered. |
| `onAction` | function | No | `undefined` | Called when the action button is clicked |

**Component behavior**:
- Displays centered content with a clipboard/document icon (using an SVG inline or Unicode character)
- Shows the primary message in semi-bold
- Optionally shows a submessage in muted text
- Optionally shows an action button

**JSX structure**:

```jsx
<div className="flex flex-col items-center justify-center py-16 px-4" role="status">
  {/* Icon placeholder -- simple SVG clipboard */}
  <svg
    className="w-16 h-16 text-gray-300 mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
  <p className="text-base font-medium text-gray-500 mb-1">
    {message}
  </p>
  {submessage && (
    <p className="text-sm text-gray-400 mb-4 text-center max-w-sm">
      {submessage}
    </p>
  )}
  {actionLabel && onAction && (
    <button
      type="button"
      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      onClick={onAction}
    >
      {actionLabel}
    </button>
  )}
</div>
```

**Tailwind classes explained**:
- Container: `flex flex-col items-center justify-center py-16 px-4` (centered, generous vertical padding for visual breathing room)
- Icon: `w-16 h-16 text-gray-300` (64px, light gray)
- Primary message: `text-base font-medium text-gray-500` (16px, medium weight, gray)
- Submessage: `text-sm text-gray-400 text-center max-w-sm` (14px, lighter gray, centered, max 384px width)
- Action button: `text-blue-600 bg-blue-50 hover:bg-blue-100` (blue tinted, soft button style)

**Accessibility**:
- `role="status"` on the container (announces to screen readers when content changes)
- SVG icon has `aria-hidden="true"` (decorative)
- Button is keyboard-accessible by default

**Usage examples**:

```jsx
// Admin page -- no stories
<EmptyState
  message="등록된 유저스토리가 없습니다"
  submessage="사용자 페이지에서 요구사항을 입력하고 승인하면 여기에 표시됩니다"
  actionLabel="사용자 페이지로 이동"
  onAction={() => navigate("/user")}
/>

// Simple empty state -- no action
<EmptyState message="데이터가 없습니다" />
```

**Related stories**: US-013 AC-4 (empty state on admin page), US-026 (Korean text)

---

## 9. File Checklist

Summary of all 21 files with their action, path, and primary specification section.

| # | Action | File Path | Spec Section |
|---|--------|-----------|--------------|
| 1 | NEW | `frontend/.env` | 2.1 |
| 2 | NEW | `frontend/tailwind.config.js` | 2.2 |
| 3 | NEW | `frontend/postcss.config.js` | 2.3 |
| 4 | MODIFY | `frontend/vite.config.js` | 2.4 |
| 5 | MODIFY | `frontend/package.json` | 2.5 |
| 6 | NEW | `frontend/src/index.css` | 2.6 |
| 7 | MODIFY | `frontend/index.html` | 2.7 |
| 8 | MODIFY | `frontend/src/main.jsx` | 3.1 |
| 9 | REWRITE | `frontend/src/App.jsx` | 3.2 |
| 10 | NEW | `frontend/src/context/AppContext.js` | 3.3 |
| 11 | NEW | `frontend/src/context/AppProvider.jsx` | 3.4 |
| 12 | NEW | `frontend/src/components/Layout.jsx` | 4.1 |
| 13 | NEW | `frontend/src/components/Header.jsx` | 4.2 |
| 14 | NEW | `frontend/src/pages/UserPage.jsx` | 5.1 |
| 15 | NEW | `frontend/src/pages/AdminPage.jsx` | 5.2 |
| 16 | NEW | `frontend/src/pages/NotFoundPage.jsx` | 5.3 |
| 17 | NEW | `frontend/src/hooks/useStorage.js` | 6.1 |
| 18 | NEW | `frontend/src/utils/idGenerator.js` | 7.1 |
| 19 | NEW | `frontend/src/utils/dateFormatter.js` | 7.2 |
| 20 | NEW | `frontend/src/components/common/ConfirmDialog.jsx` | 8.1 |
| 21 | NEW | `frontend/src/components/common/LoadingIndicator.jsx` | 8.2 |
| 22 | NEW | `frontend/src/components/common/EmptyState.jsx` | 8.3 |

**Note**: The original UNIT-01 file list had 21 files (not counting `index.html`). The `index.html` modification (Section 2.7) is a minor title change that is included for completeness, bringing the total to 22 items. This is consistent with the UNIT-01 scope: the `index.html` change is trivial (one-line title change) and naturally belongs in the foundation setup.

---

## Definition of Done -- Refined

Mapped to specific implementation specifications in this document:

| # | Criterion | Spec Reference | Verification Method |
|---|-----------|---------------|-------------------|
| 1 | `npm run dev` starts without errors on http://localhost:3000 | 2.4, 2.5, 2.6, 3.1 | Run dev server, observe no errors in terminal |
| 2 | `/` redirects to `/user` (stub page renders) | 3.2, 5.1 | Navigate to `http://localhost:3000/`, verify redirect to `/user` and stub content |
| 3 | `/admin` shows stub admin page | 3.2, 5.2 | Navigate to `/admin`, verify stub content |
| 4 | `/invalid-path` shows NotFoundPage with Korean text and navigation links | 3.2, 5.3 | Navigate to `/anything`, verify 404 message and links |
| 5 | Header shows "말해 뭐해" title with "사용자"/"관리자" nav links; active link highlighted | 4.2 | On `/user`: "사용자" link is blue/highlighted. Switch to `/admin`: "관리자" becomes highlighted. |
| 6 | useStorage hook reads/writes JSON to localStorage with `mhm_` prefix keys | 6.1 | Open browser DevTools > Application > localStorage. Write via context, verify key appears with correct JSON. Refresh page, verify data loads. |
| 7 | idGenerator generates unique prefixed IDs (req_, theme_, us_, conv_, msg_) | 7.1 | Call `generateId("req_")` in console or test, verify format `req_[8 hex chars]` |
| 8 | dateFormatter formats ISO dates to Korean display format | 7.2 | Call `formatDate("2026-04-22T09:00:00.000Z")`, verify `"2026-04-22"`. Call with null, verify `""`. |
| 9 | ConfirmDialog renders modal with "확인"/"취소" buttons | 8.1 | Trigger a ConfirmDialog (not directly testable in UNIT-01 unless a test harness is provided; can be verified in UNIT-03 integration). Visual review of code structure. |
| 10 | LoadingIndicator shows animated dots | 8.2 | Visual review: render LoadingIndicator, verify three bouncing dots appear |
| 11 | EmptyState shows message with optional action button | 8.3 | Visual review: render EmptyState with message, submessage, and action button |
| 12 | All UI text is in Korean; `html lang="ko"` is set | All sections | Review all JSX for Korean-only text. Check `index.html` for `lang="ko"`. |
| 13 | Tailwind CSS utility classes render correctly | 2.2, 2.4, 2.6 | Verify that styled components (Header, NotFoundPage) display correct colors, spacing, fonts |
