---
name: aidlc-status
description: AIDLC Status Dashboard -- displays the current AIDLC project state including phase, stage, unit progress, pending questions, risk level, and next steps in a comprehensive dashboard. Trigger whenever the user asks "where are we", "current status", "what's pending", "which phase/stage", "how far along", "what's next", "show progress", or returns after being away and wants to resume. Also trigger for any general inquiry about AIDLC workflow position or outstanding items. Do NOT trigger for building features, running requirements analysis, workspace detection, architecture design, code generation, quality gates, or git/repo status commands.
user-invocable: true
---

# AIDLC Status Dashboard

Display the current AIDLC project status as a comprehensive dashboard.

## Procedure

### Step 1 -- Load State

Read `aidlc-docs/aidlc-state.md`.

If the file does not exist, respond:
> "No AIDLC project detected. Run `/aidlc-detect` to initialize a project."

Then stop.

### Step 2 -- Check for Pending Questions

Search for unanswered question files:
1. Glob for all `*-questions.md` files under `aidlc-docs/`
2. For each file found, scan for `[Answer]:` tags that are empty or contain only whitespace
3. Build a list of files with unanswered questions and the count per file

### Step 3 -- Display Dashboard

Present the status in the following format:

```
========================================
  AIDLC Project Status Dashboard
========================================

Project: [project name]
Type: [greenfield / brownfield]
Current Phase: [Inception / Construction / Operations]
Current Stage: [specific stage name]

----------------------------------------
  Phase Progress
----------------------------------------
[x] Inception
  [x] Detection & Initialization
  [x] Requirements Gathering
  [x] Story Mapping
  [x] Unit of Work Decomposition
  [x] Execution Planning
[ ] Construction
  [x] Unit: auth -- Functional Design
  [~] Unit: auth -- NFR Design (in progress)
  [ ] Unit: auth -- Infrastructure Design
  [ ] Unit: auth -- Code Generation
  [ ] Unit: auth -- Quality Gate
  [ ] Unit: api -- Functional Design
  ...
[ ] Operations

----------------------------------------
  Unit Status (Construction)
----------------------------------------
| Unit       | Functional | NFR Req | NFR Design | Infra | Code | Gate |
|------------|------------|---------|------------|-------|------|------|
| auth       | done       | done    | ~progress  | -     | -    | -    |
| api        | -          | -       | -          | -     | -    | -    |
| frontend   | done       | -       | -          | -     | -    | -    |

Legend: done = approved, ~progress = in progress, - = not started, skip = skipped per plan

----------------------------------------
  Pending Items
----------------------------------------
[list any unanswered question files with count]

----------------------------------------
  Risk Level
----------------------------------------
[from execution-plan.md if exists]
```

Adapt the dashboard to the actual project state:
- If still in Inception, show only Inception stage progress (no unit table)
- If in Construction, show the full unit status table
- If in Operations, show deployment and monitoring status
- Only show sections that have relevant data

### Step 4 -- Alert on Pending Questions

If any unanswered questions were found in Step 2, display a prominent alert:

> "There are N unanswered questions:
> - `aidlc-docs/construction/auth/nfr-questions.md` (3 unanswered)
> - `aidlc-docs/construction/api/functional-design-questions.md` (5 unanswered)"
