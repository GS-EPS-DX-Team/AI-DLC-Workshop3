---
name: aidlc-code
description: AIDLC Code Generation -- generates actual implementation code for a specific unit by delegating to the aidlc-developer agent. Verifies all design stages are complete, spawns the developer with full design context, produces source files and tests. Trigger for "generate code for [unit]", "implement [unit]", "write the code", "start coding", "build [unit]", or after all design stages for the unit are approved. This is NOT gate (code writes new code; gate reviews existing code). NOT test (code produces files; test runs the full project test suite). Takes a unit name argument.
argument-hint: [unit-name]
user-invocable: true
context: fork
agent: aidlc-developer
---

# AIDLC Code Generation (Per Unit)

You are executing the **Code Generation** stage of AIDLC Construction for unit **$ARGUMENTS**.

## Prerequisites

Before starting, verify:
1. Read `aidlc-docs/aidlc-state.md` -- confirm ALL design stages for unit **$ARGUMENTS** are approved:
   - Functional Design: approved
   - NFR Requirements + Design: approved (or explicitly skipped in execution plan)
   - Infrastructure Design: approved (or explicitly skipped in execution plan)
2. If any required design stage is incomplete, stop and explain which stage needs to be completed first

## Procedure

### Step 1 -- Verify Readiness and Load Design Artifacts

Read `aidlc-docs/aidlc-state.md` and confirm design completion status for this unit.

Load all design artifacts that feed into code generation:
- `aidlc-docs/construction/$ARGUMENTS/functional-design/` -- business logic, domain model, rules
- `aidlc-docs/construction/$ARGUMENTS/nfr-requirements/` -- NFR targets, tech stack (if exists)
- `aidlc-docs/construction/$ARGUMENTS/nfr-design/` -- design patterns (if exists)
- `aidlc-docs/construction/$ARGUMENTS/infrastructure-design/` -- service mapping, deployment (if exists)

Present a summary of what will be built.

### Step 2 -- Create Implementation Plan

Create a detailed checkbox-based code generation plan following the two-part process defined in your agent instructions:

1. Analyze all design artifacts
2. Create the plan with sections: Project Structure, Business Logic, API Layer, Repository/Data Layer, Frontend (if applicable), Database Migrations (if applicable), Deployment Artifacts (if applicable)
3. Save to `aidlc-docs/construction/plans/$ARGUMENTS-code-generation-plan.md`

### Step 3 -- GATE: Plan Approval

Present the plan to the team:
> "Code generation plan is ready. Please review and choose:
> 1. **Approve & Continue** -- begin code generation
> 2. **Request Changes** -- let us know what needs to be modified"

Do NOT write any code before approval.

### Step 4 -- Execute Code Generation

Upon approval:
1. Load the approved plan
2. Find the first unchecked `[ ]` item
3. Generate the code for that item
4. Immediately update the checkbox to `[x]`
5. Update `aidlc-docs/aidlc-state.md` with progress
6. Repeat until all items are complete

### Step 5 -- Report Results and Suggest Next Step

After all checkboxes are complete:
1. Summarize what was generated:
   - Files created/modified
   - Test coverage
   - Any deviations from the design (with justification)
2. Update `aidlc-state.md` to reflect code generation completion for this unit
3. Log to `aidlc-docs/audit.md`
4. Suggest:
   > "Code generation is complete. Run the Quality Gate to perform code review and testing:
   > `/aidlc-gate $ARGUMENTS`"
