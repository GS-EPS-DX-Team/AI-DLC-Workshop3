---
paths:
  - "aidlc-docs/extensions/security-baseline-enabled"
---

# Security Baseline Extension (AIDLC)

These rules are BLOCKING constraints that apply across all AIDLC stages when this extension is enabled. Non-compliance is a blocking finding -- do NOT present stage completion until resolved.

## SECURITY-01: Encryption at Rest and in Transit
Every data store (databases, object storage, caches) MUST have encryption at rest enabled and encryption in transit enforced (TLS 1.2+).
- No storage resource without encryption configuration
- No unencrypted database connection strings
- Object storage must reject non-TLS requests via policy

## SECURITY-02: Access Logging on Network Intermediaries
Every network-facing intermediary (load balancers, API gateways, CDN distributions) MUST have access logging enabled to a persistent store.

## SECURITY-03: Application-Level Logging
Every deployed component MUST include structured logging with: timestamp, correlation/request ID, log level, message. Sensitive data (passwords, tokens, PII) MUST NOT appear in logs.

## SECURITY-04: HTTP Security Headers
Web-serving endpoints MUST set: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options (nosniff), X-Frame-Options, Referrer-Policy.

## SECURITY-05: Authentication and Authorization
Every API endpoint MUST require authentication (except explicitly public endpoints). Authorization checks MUST be enforced at the handler/controller level, not just middleware.

## SECURITY-06: Input Validation
All external inputs MUST be validated against defined schemas. Reject invalid input at the boundary before processing.

## SECURITY-07: Secrets Management
No hardcoded secrets, API keys, or credentials in source code. All secrets MUST be loaded from a managed secrets service (AWS Secrets Manager, SSM Parameter Store, etc.).

## SECURITY-08: Dependency Security
No known critical/high CVE vulnerabilities in production dependencies. Dependency audit must pass before code generation completion.

## Enforcement

At each stage where these rules apply:
1. Verify compliance with each applicable rule
2. Mark non-applicable rules as N/A with brief rationale
3. List any blocking findings in the stage completion message under "Security Findings"
4. Do NOT present "Approve & Continue" until all blocking findings are resolved
5. Log findings to `aidlc-docs/audit.md`
