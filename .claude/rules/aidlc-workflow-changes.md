# AIDLC Mid-Workflow Changes

Handle team requests to modify the execution plan during the workflow.

## Adding a Skipped Stage

When the team wants to add a stage that was originally SKIP:

1. **Confirm**: "You want to add [Stage]. This will [describe impact]. Confirm?"
2. **Check dependencies**: Verify all prerequisite stages are complete
3. **Update execution plan**: Change SKIP to EXECUTE in `aidlc-docs/inception/plans/execution-plan.md`
4. **Update state**: Add the stage to `aidlc-state.md` as pending
5. **Execute**: Run the stage normally
6. **Log**: Record the change in `audit.md` with timestamp and reason

## Skipping a Planned Stage

When the team wants to skip a stage that was EXECUTE:

1. **Confirm**: "You want to skip [Stage]. This means [describe what will be missing]. Confirm?"
2. **Warn about impact**: Explain downstream consequences (e.g., "Infrastructure Design won't have NFR patterns to reference")
3. **Get explicit confirmation**: Team must acknowledge the impact
4. **Update execution plan**: Change EXECUTE to SKIPPED in execution-plan.md
5. **Update state**: Mark as SKIPPED in `aidlc-state.md`
6. **Log**: Record in `audit.md`

## Re-running a Completed Stage

When the team wants to redo a stage that already passed its gate:

1. **Confirm**: "You want to re-run [Stage]. Existing artifacts will be regenerated. Confirm?"
2. **Backup**: Note existing artifact file paths in the audit log
3. **Reset state**: Mark stage as in-progress in `aidlc-state.md`
4. **Re-execute**: Run the stage from the beginning
5. **Cascade check**: Warn if later stages may need to be re-run due to changed artifacts
6. **Log**: Record in `audit.md`

## Changing Scope Mid-Construction

When the team wants to add features or change requirements during Construction:

1. **Assess impact**: Determine which units and stages are affected
2. **Recommend**: Suggest going back to the appropriate Inception stage (usually Requirements Analysis)
3. **Do not silently modify**: Never change requirements or design artifacts without going through the proper stage and gate process
4. **Log**: Record the scope change request in `audit.md`
