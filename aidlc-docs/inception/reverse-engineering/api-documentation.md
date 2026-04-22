# API Documentation

## REST Endpoints

| Method | Path | Description | Request Body | Response Body | Auth |
|--------|------|-------------|-------------|---------------|------|
| GET | `/health` | Health check | None | `{"status": "ok"}` | None |

### GET /health

**Purpose**: Verify the backend server is running and responsive.

**Request**: No parameters, no headers required.

**Response**:
```json
{
  "status": "ok"
}
```

**HTTP Status Codes**:
- `200 OK`: Server is healthy

**Notes**: This is the only endpoint in the application. No business endpoints exist.

## Frontend API Proxy

The Vite dev server proxies all requests matching `/api/*` to the backend:

| Frontend Request | Backend Request | Transformation |
|-----------------|-----------------|----------------|
| `GET /api/health` | `GET /health` | Strip `/api` prefix |
| `GET /api/anything` | `GET /anything` | Strip `/api` prefix |

**Configuration** (from `vite.config.js`):
- Proxy target: `http://localhost:8000`
- Path rewrite: `/api` prefix is removed
- `changeOrigin: true` is set

## Internal APIs

No service-to-service APIs exist. The backend is a single process.

## Data Models

### Database Layer (Prepared but Unused)

The `database.py` module provides connection management but defines no data models:

- **Connection type**: `sqlite3.Connection` with `sqlite3.Row` row factory
- **PRAGMA settings**: `journal_mode=WAL`, `foreign_keys=ON`
- **No table definitions**: No schema, no migrations, no ORM models
- **No Pydantic models**: Despite pydantic being a dependency, no request/response models are defined

### Implied Data Contract

The only data contract is the health check response:
```python
# Implicit schema (not formally defined)
{"status": str}  # Always returns "ok"
```

## API Versioning

No API versioning strategy is in place. There is no `/v1/` prefix or version headers.

## OpenAPI / Swagger

FastAPI automatically generates OpenAPI documentation at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

The API title is set to `"API Server"` (from `FastAPI(title="API Server")`).
