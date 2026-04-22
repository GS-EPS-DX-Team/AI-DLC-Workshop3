# API Documentation

## REST Endpoints

**없음.** 백엔드 서버가 없으므로 REST API 엔드포인트가 존재하지 않습니다.

## Data Access

데이터는 브라우저 localStorage를 통해 관리됩니다.
현재 localStorage 접근 코드는 구현되어 있지 않으며, 향후 storage 추상화 계층을 통해 구현 예정입니다.

### 예정된 localStorage 구조

| 항목 | 설명 |
|------|------|
| 키 네이밍 | `aidlc-docs/db/schema.md` 용어 사전 기준 |
| 데이터 형식 | JSON 직렬화 |
| 용량 제한 | 약 5MB (브라우저별 상이) |

## Internal APIs

서비스 간 API 없음. 프론트엔드 전용 애플리케이션입니다.
