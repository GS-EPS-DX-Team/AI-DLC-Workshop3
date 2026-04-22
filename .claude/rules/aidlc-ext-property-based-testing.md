---
paths:
  - "aidlc-docs/extensions/property-based-testing-enabled"
---

# Property-Based Testing Extension (AIDLC)

These rules are BLOCKING constraints that apply during Functional Design, Code Generation, and Quality Gate stages when this extension is enabled.

## PBT-01: Property Identification During Design
Every unit with business logic, data transformations, or algorithmic operations MUST be analyzed for testable properties during Functional Design. Document identified properties in a "Testable Properties" section.

Property categories to evaluate:
| Category | Description | Example |
|----------|------------|---------|
| Round-trip | Operation + inverse = identity | serialize/deserialize |
| Invariant | Transformation preserves a characteristic | sort preserves size |
| Idempotence | Applying twice = applying once | dedup(dedup(x)) = dedup(x) |
| Commutativity | Order doesn't matter | add(a,b) = add(b,a) |
| Oracle | Reference impl can verify | optimized vs brute-force |
| Easy verification | Hard to compute, easy to check | maze solver output |

## PBT-02: Round-Trip Properties
Any operation with a logical inverse MUST have a PBT round-trip test. Includes: serialization/deserialization, encoding/decoding, parsing/formatting, encryption/decryption.

## PBT-03: Invariant Properties
Functions with provable invariants (e.g., sort preserves elements, filter reduces size) MUST have PBT invariant tests.

## PBT-04: Framework Selection
Use a property-based testing framework appropriate for the tech stack (e.g., Hypothesis for Python, fast-check for TypeScript, jqwik for Java). The framework MUST support shrinking.

## PBT-05: Generator Quality
Random input generators MUST produce valid domain objects. Use custom generators constrained to business rules rather than unconstrained random data.

## PBT-06: Stateful Testing
Components with mutable state (state machines, caches, sessions) MUST have stateful PBT tests that verify invariants across sequences of operations.

## Enforcement

At each applicable stage:
1. Verify compliance with each applicable rule
2. Mark non-applicable rules as N/A (e.g., PBT-06 when no stateful components)
3. List blocking findings under "PBT Findings" in stage completion
4. Do NOT present "Approve & Continue" until resolved
5. Log to `aidlc-docs/audit.md`

## Partial Enforcement Mode
If user selected "Partial" during opt-in, only PBT-02, PBT-03, PBT-04, and PBT-05 are blocking. Others are advisory.
