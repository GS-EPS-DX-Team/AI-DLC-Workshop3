# 용어 사전 (Glossary)

**프로젝트 전체 용어의 기준(Single Source of Truth)** 역할을 합니다.

## 파일 구조

- `schema.md` — 용어 매핑 테이블, 엔티티 관계도, 엔티티 정의

## 작성 규칙

- 엔티티명: snake_case 복수형 (예: `orders`, `order_items`)
- 필드명: snake_case (예: `created_at`, `total_price`)
- 모든 엔티티에 `id`, `created_at`, `updated_at` 포함
- 참조 필드: `{참조엔티티_단수}_id` 형식 (예: `order_id`)

## 용어 통일 원칙

다른 문서(PRD, SCR)에서 사용하는 용어는 이 명세의 엔티티명·필드명을 기준으로 합니다.

| 엔티티/필드 | 화면/문서 표기 예시 |
|------------|-------------------|
| `order` | 주문 |
| `order_item` | 주문 항목 |

이 매핑 테이블은 `schema.md`에서 관리합니다.
