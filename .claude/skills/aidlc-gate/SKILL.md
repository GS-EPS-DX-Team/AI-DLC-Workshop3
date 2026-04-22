---
name: aidlc-gate
description: AIDLC Quality Gate -- runs a TWO-PHASE per-unit verification pipeline. Phase 1 is code review (GO/NO-GO), Phase 2 is unit build and test (PASS/FAIL, only if Phase 1 passes). Trigger for "quality gate for [unit]", "review [unit]", "check [unit] code", "gate [unit]", "verify [unit]", or after code generation completes for a specific unit. This is NOT test (gate verifies ONE unit after code generation; test runs the FULL project suite after all gates pass). NOT code (code writes implementation; gate reviews and validates it). Takes a unit name argument. Delegates to aidlc-reviewer agent.
argument-hint: [unit-name]
user-invocable: true
context: fork
agent: aidlc-reviewer
---

# AIDLC Quality Gate Pipeline

You are executing the **Quality Gate** for unit **$ARGUMENTS**.

The Quality Gate is a two-phase pipeline: Code Review (GO/NO-GO) followed by Build & Test (PASS/FAIL). Phase 2 only runs if Phase 1 passes.

## Prerequisites

Before starting, verify:
1. Read `aidlc-docs/aidlc-state.md` -- confirm code generation is complete for unit **$ARGUMENTS**
2. If code generation is not complete, stop: "Code Generation must be completed first. Run `/aidlc-code $ARGUMENTS`."

## Phase 1 -- Code Review (GO / NO-GO)

Perform a comprehensive code review for unit **$ARGUMENTS**:

1. Load design artifacts from `aidlc-docs/construction/$ARGUMENTS/` -- verify code implements the approved design
2. Check code quality: naming, structure, separation of concerns, error handling
3. Check test quality: coverage, edge cases, meaningful assertions
4. Check security: no hardcoded secrets, input validation, auth checks
5. Check for design deviations -- any code that does not match the approved design must be flagged

Produce a review report following the Code Review output format defined in your agent instructions.

**Verdict**:
- **GO**: Zero HIGH severity issues, all required categories PASS → proceed to Phase 2
- **NO-GO**: Present all required changes and suggest:
  > "The review found issues that need to be fixed. Please resolve them and run `/aidlc-gate $ARGUMENTS` again."
  Stop -- do NOT proceed to Phase 2.

## Phase 2 -- Build & Test (PASS / FAIL) -- Only If Phase 1 = GO

1. Build the project -- verify compilation/transpilation succeeds
2. Run unit tests for this unit
3. Run integration tests if applicable
4. Run any additional tests defined in the design artifacts
5. Collect coverage metrics

Produce a test report following the Build & Test output format defined in your agent instructions.

**Verdict**:
- **PASS** → proceed to Phase 3
- **FAIL**: Present all failures and suggest:
  > "Test failures were found. Please fix the issues and run `/aidlc-gate $ARGUMENTS` again."
  Stop.

## Phase 3 -- Gate Passed (Both Phases Successful)

If both Code Review = GO and Build & Test = PASS:

1. Update `aidlc-state.md`:
   - Mark unit **$ARGUMENTS** as verified
   - Record code review result: GO
   - Record build & test result: PASS
2. Log to `aidlc-docs/audit.md`:
   - Timestamp, unit name, code review verdict, test results summary, gate outcome: PASSED

3. Present the final summary:

```
========================================
  Quality Gate Passed: $ARGUMENTS
========================================

Code Review:   GO
Build & Test:  PASS
Unit Status:   Verified

Review Summary:
- [key findings, all resolved]

Test Summary:
- Unit Tests:  N passed / N total
- Integration:  N passed / N total
- Coverage:    N%
========================================
```

4. Suggest next action:
   - If other units still need quality gates: "Run the Quality Gate for the next unit: `/aidlc-gate [next-unit]`"
   - If all units are verified: "All units are verified. Run the full build and test suite: `/aidlc-test`"
