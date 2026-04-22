# Technology Stack

## Languages

| Language | Version | Usage Scope |
|----------|---------|-------------|
| Python | Not specified (implied 3.8+) | Backend API server |
| JavaScript (JSX) | ES2015+ (ESM modules) | Frontend SPA |

**Notes**:
- No Python version pin (no `pyproject.toml`, no `.python-version`, no `runtime.txt`)
- TypeScript type definitions are installed (`@types/react`, `@types/react-dom`) but TypeScript is **not configured or used**

## Frameworks

| Framework | Version | Purpose |
|-----------|---------|---------|
| FastAPI | 0.115.12 | Backend REST API framework |
| Pydantic | 2.11.3 | Data validation and serialization (installed, not yet used) |
| React | ^18.3.1 | Frontend UI library |
| React DOM | ^18.3.1 | React browser rendering |

## Runtime & Servers

| Tool | Version | Purpose |
|------|---------|---------|
| Uvicorn | 0.34.2 (with `standard` extras) | ASGI server for FastAPI |
| Vite | ^6.0.0 | Frontend dev server and build tool |
| @vitejs/plugin-react | ^4.3.4 | React JSX transform and Fast Refresh for Vite |

## Data Storage

| Technology | Version | Purpose |
|------------|---------|---------|
| SQLite | Built into Python stdlib | Local file-based relational database |

**Configuration**: WAL journal mode, foreign keys enabled, `sqlite3.Row` row factory.

## Infrastructure

No infrastructure technologies are in use:
- No Docker / container definitions
- No CDK / Terraform / CloudFormation
- No CI/CD pipeline definitions
- No deployment scripts
- No cloud service configurations

## Build & Package Management

| Tool | Config File | Purpose |
|------|------------|---------|
| pip | `backend/requirements.txt` | Python dependency management |
| npm | `frontend/package.json` | Node.js dependency management |
| Vite | `frontend/vite.config.js` | Frontend bundling and dev server |

## Testing

No testing tools are configured:
- No pytest, unittest, or any Python test framework
- No Jest, Vitest, React Testing Library, or any JavaScript test framework
- No test directories or test files exist

## Code Quality & Development Tools

No code quality tools are configured:
- No linter (ESLint, ruff, flake8, pylint)
- No formatter (Prettier, black, isort)
- No type checker (mypy, TypeScript)
- No pre-commit hooks
- No editor configuration (.editorconfig)

## Version Summary

| Component | Pinning Strategy | Notes |
|-----------|-----------------|-------|
| FastAPI | Exact (`==0.115.12`) | Pinned |
| Uvicorn | Exact (`==0.34.2`) | Pinned |
| Pydantic | Exact (`==2.11.3`) | Pinned |
| React | Caret (`^18.3.1`) | Minor/patch updates allowed |
| React DOM | Caret (`^18.3.1`) | Minor/patch updates allowed |
| Vite | Caret (`^6.0.0`) | Minor/patch updates allowed |

Python dependencies use exact pinning; JavaScript dependencies use caret ranges. No lockfile exists for either (no `package-lock.json`, no `pip.lock`).
