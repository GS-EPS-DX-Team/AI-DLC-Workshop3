# Component Inventory

## Component Classification

### Core (Business Logic, Domain Models)
**No components.** No business logic or domain models have been implemented.

### API (Controllers, Handlers, Routes)

| Component | File | Description |
|-----------|------|-------------|
| FastAPI App | `backend/main.py` | Application instance with a single health check handler |

### Data (Repositories, Data Access, Migrations)

| Component | File | Description |
|-----------|------|-------------|
| Database Connection Manager | `backend/database.py` | SQLite connection factory with context manager for transaction safety |

**Notes**: No repositories, no ORM models, no migration scripts, no seed data.

### Infrastructure (CDK, Terraform, Deployment)
**No components.** No infrastructure-as-code, no Dockerfiles, no deployment scripts, no CI/CD pipelines.

### Integration (External Service Clients)
**No components.** No external service integrations.

### Shared (Utilities, Common Libraries)
**No components.** No shared utility modules.

### Test (Test Suites, Fixtures, Mocks)
**No components.** No test files, no test configuration, no test dependencies.

### Presentation (Frontend UI)

| Component | File | Description |
|-----------|------|-------------|
| HTML Shell | `frontend/index.html` | Entry HTML document with root div and module script loader |
| React Bootstrap | `frontend/src/main.jsx` | Creates React root, renders App in StrictMode |
| App Component | `frontend/src/App.jsx` | Root component rendering a plain `<div>App</div>` placeholder |

### Build & Configuration

| Component | File | Description |
|-----------|------|-------------|
| Python Dependencies | `backend/requirements.txt` | Lists FastAPI, uvicorn, pydantic |
| Node Package Config | `frontend/package.json` | Lists React, React DOM, Vite, type definitions |
| Vite Config | `frontend/vite.config.js` | Dev server port, API proxy, React plugin |
| Git Ignore | `.gitignore` | Patterns for Python, Node, IDE, OS artifacts |

## Summary by Category

| Category | Count | Status |
|----------|-------|--------|
| Core | 0 | Empty |
| API | 1 | Minimal (health check only) |
| Data | 1 | Scaffold only (no models/tables) |
| Infrastructure | 0 | Empty |
| Integration | 0 | Empty |
| Shared | 0 | Empty |
| Test | 0 | Empty |
| Presentation | 3 | Scaffold only (no UI) |
| Build & Config | 4 | Functional |
| **Total** | **9** | **Scaffold** |
