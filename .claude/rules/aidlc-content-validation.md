# AIDLC Content Validation Rules

These rules apply to ALL agents and ALL stages when generating content for files.

## Mermaid Diagram Validation

Before creating any file with Mermaid diagrams:

1. **Syntax check**: Use alphanumeric + underscore only for node IDs
2. **Character escaping**: Escape special characters in labels (`"` → `\"`, `'` → `\'`)
3. **Connection validation**: Verify all node connections reference valid node IDs
4. **Always include a text alternative**: After every Mermaid block, add a plain-text description of the workflow for fallback

Example pattern:
```markdown
## Workflow Visualization

```mermaid
[validated diagram]
```

**Text alternative**: Stage A → Stage B → Stage C (conditional on X)
```

## ASCII Diagram Standards

When creating ASCII diagrams (avoid when Mermaid is available):

1. **Allowed characters only**: `+` `-` `|` `^` `v` `<` `>` and alphanumeric text with spaces
2. **No Unicode box-drawing**: Never use `┌` `─` `│` `└` `┐` `┘` or similar Unicode characters -- they render inconsistently across platforms
3. **Consistent width**: Every line within a box MUST have exactly the same character count (pad with spaces)
4. **Spaces only**: No tabs in diagrams

## File Content Rules

Before writing any artifact file:

1. **No orphan references**: If you reference another file, verify it exists or will be created in the same step
2. **Valid markdown**: Ensure headers, lists, and code blocks are properly formatted
3. **No placeholder content**: Do not write `[TBD]` or `[TODO]` in final artifacts -- if information is missing, ask for it
4. **Consistent IDs**: Requirement IDs (FR-001), decision IDs (D-001), and story IDs (US-001) must be unique and sequential within a document
