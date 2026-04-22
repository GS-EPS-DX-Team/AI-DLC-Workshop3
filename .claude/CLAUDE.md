# AIDLC Enhanced for Claude Code

A native Claude Code implementation of AIDLC (AI-Driven Development Life Cycle) using agents, skills, and hooks.
Delivers systematic, verifiable software development through a three-phase adaptive workflow.

## Workflow State

- **State file**: `aidlc-docs/aidlc-state.md` (current Phase, Stage, progress)
- **Audit log**: `aidlc-docs/audit.md` (all gate approvals, agent activity records)

## Phase Model

| Phase | Description |
|-------|-------------|
| **INCEPTION** | Project discovery, requirements analysis, user stories, application design, unit decomposition, workflow planning |
| **CONSTRUCTION** | Functional design, NFR design, infrastructure design, code generation, code review, build/test |
| **OPERATIONS** | Deployment, monitoring, maintenance (future expansion) |

## Workflow Routing (Automatic Progression)

When a development-related request comes in, the AIDLC workflow is followed automatically. Natural language works -- no slash commands required.

### New Project or Feature Request
When the user says "build me X", "I want to create Y", "let's develop Z", etc.:
1. Check if `aidlc-docs/aidlc-state.md` exists
2. If not found → run Workspace Detection automatically → enter Requirements Analysis
3. If found → read current state and continue from the next pending stage

### Automatic Stage Transitions
When a stage receives team approval ("Approve & Continue"), the next stage is automatically recommended and initiated:
- Workspace Detection → Requirements Analysis → User Stories → Application Design → Units Generation → Workflow Planning
- Construction follows execution-plan.md, running only stages marked EXECUTE in order

### Slash Commands = Direct Control
`/aidlc-*` commands are used to directly target or re-run a specific stage:
- Re-run a specific stage: `/aidlc-requirements`
- Add a skipped stage: `/aidlc-stories`
- Check status: `/aidlc-status`
- Manually run quality gate: `/aidlc-gate [unit]`

## Gate Rules

- Each stage requires explicit team approval ("Approve") before proceeding
- All questions are written in dedicated .md files (never asked in chat)
- Cannot proceed if any `[Answer]:` tag is empty or contains vague answers
- Cannot advance to the next stage while ambiguity remains unresolved
- "When in doubt, ask the question" -- over-clarification is always better than wrong assumptions

## File Conventions

| Type | Location |
|------|----------|
| Application code | Workspace root (`./`) |
| All documents/artifacts | `aidlc-docs/` |
| Phase plans | `aidlc-docs/{phase}/plans/` |
| Question files | Same directory as related artifacts |

## Agent Delegation

| Agent | Purpose |
|-------|---------|
| **aidlc-analyst** | All Inception stages + Construction functional/NFR design. Question generation, ambiguity analysis, design document creation. No Bash access |
| **aidlc-architect** | Infrastructure design. Maps logical components to AWS services with Bash + MCP tool access for AWS CLI, documentation, pricing, and IaC validation |
| **aidlc-developer** | Construction code generation. Plan creation and code writing based on approved designs. Full tool access |
| **aidlc-reviewer** | Construction verification. Code review (GO/NO-GO), build/test (PASS/FAIL). Read-only -- cannot modify code |

## Available Slash Commands

| Command | Description |
|---------|-------------|
| `/aidlc-detect` | Workspace detection and AIDLC initialization |
| `/aidlc-reverse` | Reverse engineering analysis of existing codebase |
| `/aidlc-requirements` | Requirements analysis and question generation |
| `/aidlc-stories` | User story development |
| `/aidlc-app-design` | Application architecture design |
| `/aidlc-units` | Development unit decomposition |
| `/aidlc-plan` | Workflow execution plan creation |
| `/aidlc-functional` | Functional design (Construction) |
| `/aidlc-nfr` | Non-functional requirements analysis and design |
| `/aidlc-infra` | Infrastructure design |
| `/aidlc-code` | Code generation execution |
| `/aidlc-test` | Build and test execution |
| `/aidlc-gate` | Quality gate review and approval |
| `/aidlc-status` | Current workflow status dashboard |

## Extensions

Optional rule sets that can be enabled during Requirements Analysis via opt-in questions:
- **Security Baseline**: Blocking security constraints (encryption, logging, auth, input validation, secrets management)
- **Property-Based Testing**: PBT rules for round-trip, invariant, and idempotence testing

Extensions are activated by creating marker files in `aidlc-docs/extensions/`. Corresponding rules in `.claude/rules/aidlc-ext-*.md` use `paths` frontmatter for conditional loading.

## Adaptive Depth

The list of artifacts stays the same, but the depth of each artifact adjusts based on project complexity.
A simple bug fix gets concise artifacts; a system migration gets comprehensive ones with full traceability.

## Session Resumption

On session start or resumption, always:
1. Read `aidlc-docs/aidlc-state.md` to determine current Phase/Stage
2. Check `*-questions.md` files for unanswered items
3. Continue from where work was interrupted
