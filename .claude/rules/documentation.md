---
description: Inline and project documentation standards — when and how to update README, API docs, and architecture docs during Phase 5
---

# Documentation Requirements

## Inline Documentation
- All public functions/methods must have doc comments explaining purpose, parameters, and return values
- Complex logic must have inline comments explaining *why*, not *what*
- Module/file-level comments at the top of each file describing its responsibility

## Project Documentation (updated during Phase 5)
After completing each work unit, check if any of the following need updating:

### README.md (project root)
- Keep in sync with implemented features
- Include: project description, setup instructions, how to run, how to test, environment variables needed
- Update after completing each version's final unit

### API Documentation
- If the unit adds/modifies an API endpoint, document it in `docs/api.md`
- Include: method, path, request/response format, auth requirements, example

### Architecture Updates
- If a work unit required a new architectural decision during implementation, append an ADR to `docs/architecture.md`
- Commit architecture updates alongside the code change

## When to Update Docs
- New API endpoint or change → update `docs/api.md`
- New environment variable or config → update README.md
- New architectural decision during execution → append ADR to `docs/architecture.md`
- Version complete (all units done) → full README.md review and update
