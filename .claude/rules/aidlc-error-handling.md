# AIDLC Error Handling and Recovery

These rules apply when errors occur during any AIDLC stage.

## Error Severity Levels

| Severity | Description | Action |
|----------|-------------|--------|
| **Critical** | Workflow cannot continue (missing required files, invalid state) | Stop, inform team, suggest recovery |
| **High** | Stage cannot complete (incomplete answers, contradictions) | Pause stage, create clarification file |
| **Medium** | Stage can continue with workarounds (optional artifacts missing) | Warn team, continue with documented assumptions |
| **Low** | Minor issues (formatting, non-blocking warnings) | Log and proceed |

## Common Error Scenarios

### Missing Prerequisites
If a required artifact from a prior stage is missing:
1. Check `aidlc-docs/aidlc-state.md` to confirm the prior stage was completed
2. If completed but artifact missing: inform team, suggest re-running the prior stage
3. If not completed: stop and recommend the correct prior stage skill

### Corrupted State File
If `aidlc-docs/aidlc-state.md` exists but is malformed:
1. Attempt to parse what is readable
2. Ask the team whether to reconstruct from existing artifacts or start fresh
3. Log the corruption and resolution to `audit.md`

### Empty or Partial Answers
If the team signals answers are complete but some `[Answer]:` tags are empty:
1. List all empty answers by question number
2. Ask the team to complete them before proceeding
3. Never guess or fill in answers on behalf of the team

### Contradictory Answers
If answers conflict with each other or with prior stage decisions:
1. Create a clarification file referencing both conflicting items
2. Explain the conflict clearly
3. Wait for resolution before proceeding

## Recovery Protocol

For any error at Critical or High severity:
1. **Log** the error to `aidlc-docs/audit.md` with timestamp, stage, error description
2. **Preserve** all work done so far (do not delete partial artifacts)
3. **Inform** the team with a clear description of what happened and options
4. **Wait** for team decision before taking corrective action
