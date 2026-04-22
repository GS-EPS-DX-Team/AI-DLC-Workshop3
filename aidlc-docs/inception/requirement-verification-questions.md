# Requirement Verification Questions

> Please review each question and write your answer after the [Answer]: tag.
> Choose from the provided options or write your own under X) Other.
> Take your time -- thorough answers here prevent costly changes later.
>
> Context: The current codebase is an empty scaffold (React 18 + Vite frontend, localStorage for data).
> The backend has been removed. We need to understand what application to build on top of this scaffold.

---

## Functional Requirements

### Question 1: What is the primary purpose of this application?
What kind of product are we building?
A) Task/Todo management application
B) Note-taking / personal knowledge management
C) Personal finance / budget tracker
D) Habit or goal tracker
E) Inventory / item management
F) Scheduling / calendar / event planner
G) Contact / address book
X) Other: ___

[Answer]:

### Question 2: Who are the target users?
A) Single user only (personal tool, no multi-user concept)
B) Small team (2-10 people, shared access via one browser)
C) Multiple independent users (each with their own separate data)
D) Both single-user and team modes supported
X) Other: ___

[Answer]:

### Question 3: What are the core entities/objects the application manages?
List the main "things" users create, read, update, and delete. For example: tasks, notes, projects, contacts, expenses.
A) Single entity type (e.g., only tasks, only notes)
B) Two entity types with a relationship (e.g., projects contain tasks)
C) Three or more entity types with relationships
D) Not yet decided -- let the design team propose
X) Other (describe the entities): ___

[Answer]:

### Question 4: What CRUD operations are required for the primary entity?
A) Full CRUD: Create, Read (list + detail), Update, Delete
B) Create, Read, Update only (no delete)
C) Create and Read only (append-only log)
D) Read-only display with import/export capability
X) Other: ___

[Answer]:

### Question 5: Is there a concept of categorization, tagging, or grouping?
A) Yes -- items belong to categories/folders/lists (hierarchical)
B) Yes -- items have free-form tags (flat, multi-tag)
C) Both categories and tags
D) No grouping needed
X) Other: ___

[Answer]:

### Question 6: Is search/filter functionality required?
A) Full-text search across all fields
B) Filter by specific fields only (e.g., status, category, date)
C) Both full-text search and field filtering
D) No search needed -- browse/scroll is sufficient
X) Other: ___

[Answer]:

### Question 7: Is sorting functionality required?
A) Yes -- user can sort by multiple fields (date, name, priority, etc.)
B) Yes -- fixed sort order only (e.g., newest first)
C) Drag-and-drop manual reordering
D) No sorting needed
X) Other: ___

[Answer]:

### Question 8: Is there a concept of item status or lifecycle?
For example: todo -> in-progress -> done, or draft -> published -> archived.
A) Yes -- simple two-state toggle (e.g., active/done, active/inactive)
B) Yes -- multi-step status workflow (3+ statuses)
C) No status concept -- items are just present or deleted
X) Other (describe states): ___

[Answer]:

### Question 9: Is there a concept of priority or importance?
A) Yes -- numeric priority levels (1-5 or High/Medium/Low)
B) Yes -- starred/favorited items
C) Both priority levels and favorites
D) No priority concept
X) Other: ___

[Answer]:

### Question 10: Are dates or deadlines part of the domain?
A) Yes -- items have a due date / deadline
B) Yes -- items have both a start date and end date
C) Yes -- items are date-stamped (created/updated timestamps only)
D) No dates needed
X) Other: ___

[Answer]:

### Question 11: Is there a dashboard or summary view?
A) Yes -- a home screen showing counts, progress, stats
B) Yes -- charts or graphs (e.g., completion rate over time)
C) Yes -- a simple list/overview only (no charts)
D) No dashboard -- go straight to the data list
X) Other: ___

[Answer]:

### Question 12: Is data import/export functionality required?
A) Yes -- export to CSV
B) Yes -- export to JSON
C) Yes -- import from CSV/JSON
D) Both import and export (CSV and/or JSON)
E) No import/export needed
X) Other: ___

[Answer]:

### Question 13: Is there a notification or reminder system?
A) Yes -- browser notifications for upcoming deadlines
B) Yes -- in-app alerts/banners for overdue items
C) Both browser notifications and in-app alerts
D) No notifications needed
X) Other: ___

[Answer]:

---

## Non-Functional Requirements

### Question 14: What is the expected data volume per user?
A) Small: under 100 records total (personal/lightweight use)
B) Medium: 100-1000 records (regular daily use)
C) Large: 1000+ records (power user, archival use)
D) Unknown -- optimize for medium as default
X) Other: ___

[Answer]:

### Question 15: What browsers and devices must be supported?
A) Desktop browsers only (Chrome, Firefox, Safari, Edge -- latest 2 versions)
B) Desktop + mobile browsers (responsive layout required)
C) Mobile-first design (primary use on phones/tablets)
D) Desktop only, one browser (Chrome only)
X) Other: ___

[Answer]:

### Question 16: What are the performance expectations for page load and interaction?
A) Fast: initial load under 2 seconds, interactions under 100ms
B) Standard: initial load under 5 seconds, interactions under 500ms
C) No specific performance requirements
X) Other: ___

[Answer]:

### Question 17: Is offline functionality required?
A) Yes -- full offline support (works without internet after first load)
B) Partial -- works offline but some features degrade gracefully
C) No -- online-only is acceptable (data is only in localStorage anyway)
X) Other: ___

[Answer]:

### Question 18: What are the data persistence and durability requirements?
Since data is stored in localStorage (browser-local, no server backup):
A) Acceptable -- users understand data is local/ephemeral
B) Export-based backup is sufficient (user manually exports)
C) Automatic periodic export/download as backup
D) This is a concern -- consider adding cloud sync in the future
X) Other: ___

[Answer]:

### Question 19: Are there accessibility requirements?
A) WCAG 2.1 AA compliance required (full keyboard navigation, screen reader support)
B) Basic accessibility (semantic HTML, alt text, focus indicators)
C) No specific accessibility requirements
X) Other: ___

[Answer]:

### Question 20: What is the internationalization (i18n) requirement?
The scaffold already has `lang="ko"` (Korean) in HTML.
A) Korean only
B) Korean primary, English secondary
C) English only
D) Multi-language support with i18n framework
X) Other: ___

[Answer]:

---

## User Scenarios

### Question 21: Describe the most important user journey (happy path).
What does a new user do first when they open the app?
A) See an empty state with a "Get Started" prompt, create their first item immediately
B) See a dashboard/summary first, then navigate to create items
C) See an onboarding wizard that explains the app
D) See a list view directly (assumes existing data or demo data)
X) Other: ___

[Answer]:

### Question 22: What happens when there is no data yet (empty state)?
A) Show a friendly empty state illustration with a call-to-action button
B) Show a simple text message with a create button
C) Auto-populate with sample/demo data on first load
D) No special empty state -- just show an empty list
X) Other: ___

[Answer]:

### Question 23: How should the app handle accidental deletion?
A) Soft delete with undo capability (trash/recycle bin concept)
B) Confirmation dialog before delete, no undo
C) No confirmation -- delete immediately
D) Archive instead of delete (items never truly deleted)
X) Other: ___

[Answer]:

### Question 24: Is bulk operations support needed?
A) Yes -- select multiple items, bulk delete/status change
B) Yes -- select all, bulk export
C) Both bulk edit and bulk export
D) No bulk operations -- one item at a time
X) Other: ___

[Answer]:

---

## Business Context

### Question 25: What is the business goal or problem this app solves?
A) Personal productivity improvement (solo user tool)
B) Team coordination and transparency
C) Process automation / reducing manual work
D) Data tracking and reporting
E) This is a learning/demo project -- no specific business goal
X) Other: ___

[Answer]:

### Question 26: What does success look like for this application?
A) User returns daily and completes tasks/actions
B) Data is reliably captured and retrievable
C) User saves measurable time compared to their current tool
D) Project demonstration or workshop completion
X) Other: ___

[Answer]:

### Question 27: Is there a timeline or deadline for the first working version?
A) By end of this workshop session
B) Within 1 week
C) Within 1 month
D) No specific deadline
X) Other: ___

[Answer]:

### Question 28: Are there competing tools the team wants to outperform or reference?
A) Yes -- a specific tool (describe in X)
B) No specific competitor, but inspired by common tools (Notion, Todoist, etc.)
C) Completely original concept
X) Other (name the reference tool): ___

[Answer]:

---

## Technical Context

### Question 29: Should the application be a Single Page Application with client-side routing?
A) Yes -- full SPA with React Router (multiple pages/routes)
B) Yes -- SPA but single-page (no routing, everything on one screen)
C) Yes -- SPA with tab-based navigation (no URL routing)
D) Not decided -- recommend what is appropriate
X) Other: ___

[Answer]:

### Question 30: What UI component approach is preferred?
A) Custom CSS only (no UI library)
B) Tailwind CSS utility classes
C) A component library (Material UI, Shadcn/ui, Ant Design, etc.)
D) Minimal CSS Modules
X) Other: ___

[Answer]:

### Question 31: What is the state management approach?
Given localStorage as the data store:
A) React useState + useContext (simple, no external library)
B) Zustand (lightweight external state manager)
C) React Query + custom localStorage adapter
D) Redux Toolkit
E) Not decided -- recommend what is appropriate for the complexity
X) Other: ___

[Answer]:

### Question 32: Should the codebase use TypeScript?
The scaffold currently uses plain JavaScript (JSX). The devDependencies include `@types/react` but no tsconfig exists.
A) Yes -- migrate to TypeScript (add tsconfig, rename files to .tsx)
B) No -- stay with JavaScript (JSX)
C) Partial -- new files in TypeScript, existing files unchanged
X) Other: ___

[Answer]:

### Question 33: Are there any specific third-party libraries already decided on?
A) No -- open to recommendations
B) Yes -- specific charting library (name in X)
C) Yes -- specific date handling library (dayjs, date-fns, etc.)
D) Multiple specific libraries (list in X)
X) Other: ___

[Answer]:

### Question 34: What is the deployment target?
A) Local development only (no deployment needed)
B) GitHub Pages (static hosting)
C) Netlify or Vercel (static hosting with CI/CD)
D) AWS S3 + CloudFront
E) Not decided
X) Other: ___

[Answer]:

---

## Extensions

### Question 35: Security Baseline Extension
Should security extension rules be enforced for this project?
A) Yes -- enforce all SECURITY rules as blocking constraints (recommended for production-grade applications)
B) No -- skip all SECURITY rules (suitable for PoCs, prototypes, and experimental projects)
X) Other: ___

[Answer]:

### Question 36: Property-Based Testing Extension
Should property-based testing (PBT) rules be enforced for this project?
A) Yes -- enforce all PBT rules as blocking constraints (recommended for projects with business logic, data transformations, or stateful components)
B) Partial -- enforce PBT rules only for pure functions and serialization round-trips
C) No -- skip all PBT rules (suitable for simple CRUD applications or UI-only projects)
X) Other: ___

[Answer]:
