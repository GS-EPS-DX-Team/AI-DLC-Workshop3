# DB (Database Specification)

데이터베이스 명세를 관리합니다. **프로젝트 전체 용어의 기준(Single Source of Truth)** 역할을 합니다.

## 파일 구조

- `schema.md` — 전체 테이블 정의 및 관계도
- `tables/` — 테이블별 상세 명세 (선택)

## 작성 규칙

- 테이블명: snake_case 복수형 (예: `orders`, `order_items`)
- 컬럼명: snake_case (예: `created_at`, `total_price`)
- 모든 테이블에 `id` (PK), `created_at`, `updated_at` 포함
- 외래키: `{참조테이블_단수}_id` 형식 (예: `order_id`)

## 용어 통일 원칙

다른 문서(PRD, SCR, API)에서 사용하는 용어는 이 DB 명세의 테이블명·컬럼명을 기준으로 합니다.

| DB 용어 | 화면/문서 표기 예시 |
|---------|-------------------|
| `order` | 주문 |
| `order_item` | 주문 항목 |

이 매핑 테이블은 `schema.md`에서 관리합니다.
