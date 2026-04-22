# AIDLC Terminology

Use these terms consistently across all stages, artifacts, and communication.

## Core Terms

| Term | Definition | Usage |
|------|-----------|-------|
| **Phase** | One of three high-level lifecycle divisions: INCEPTION, CONSTRUCTION, OPERATIONS | "The CONSTRUCTION phase" |
| **Stage** | An individual activity within a phase (e.g., Requirements Analysis, Functional Design) | "The Requirements Analysis stage" |
| **Unit** | A logical grouping of stories/components for development. Each microservice = one unit; monolith modules = units | "Unit: auth-service" |
| **Artifact** | A document produced by a stage (e.g., requirements.md, business-rules.md) | "The design artifacts" |
| **Gate** | An approval checkpoint where the team must explicitly approve before proceeding | "The approval gate" |
| **Extension** | An optional rule set (e.g., security, testing) that can be enabled via opt-in | "Security extension enabled" |

## Phase Definitions

- **INCEPTION**: Planning and architecture -- determines WHAT to build and WHY
- **CONSTRUCTION**: Design, implementation, and testing -- determines HOW to build it (per-unit)
- **OPERATIONS**: Deployment and monitoring (future expansion)

## Stage Execution Types

- **ALWAYS**: Stage runs for every project (e.g., Workspace Detection, Requirements Analysis)
- **CONDITIONAL**: Stage runs only when needed based on complexity/scope (e.g., User Stories, NFR Design)
- **EXECUTE**: Workflow Planning determined this stage should run
- **SKIP**: Workflow Planning determined this stage is not needed

## Common Mistakes to Avoid

- "Requirements phase" -- wrong. Say "Requirements Analysis stage" (it's a stage, not a phase)
- "Construction stage" -- wrong. Say "CONSTRUCTION phase" (it's a phase, not a stage)
- "Build the unit" -- ambiguous. Say "Generate code for the unit" or "Run build and test"
