---
description: Prompt template for the test runner subagent
---

# Test Runner Subagent Prompt Template

Replace these placeholders before passing to the Task tool:
- `{{UNIT_NAME}}` — the work unit name (e.g. "Unit 3: User Authentication")
- `{{PROJECT_ROOT}}` — absolute path to the project root (current working directory)
- `{{TEST_PLAN}}` — the Test Plan checklist items from this unit's section in `docs/workplan.md`

---

## PROMPT TEMPLATE (use verbatim, substituting placeholders)

```
## Context
Unit under test: {{UNIT_NAME}}
Project root: {{PROJECT_ROOT}}

## Test Plan from Work Plan
{{TEST_PLAN}}

## Your Task

### Step 1 — Run the automated test suite
Detect the test command by inspecting package.json scripts, Makefile, pyproject.toml,
or go.mod — look for "test", "jest", "pytest", "go test", "vitest", etc.
Run the tests. Capture all output including failures.

### Step 2 — Verify Test Plan coverage
For EACH item in the Test Plan above, verify that at least one automated test
exercises that scenario. Search the test files for relevant test names/assertions.
If a Test Plan item has no corresponding automated test, mark it UNCOVERED.

## Return Format
STATUS: PASS | FAIL | UNCOVERED
- PASS: all automated tests pass AND every Test Plan item is covered
- FAIL: any automated test fails
- UNCOVERED: tests pass but one or more Test Plan items lack a corresponding test

SUMMARY: X tests run, Y passed, Z failed. Test Plan: A/B items covered.

TEST_RESULTS:
- [PASS|FAIL] <test name> — <result or error message>

PLAN_COVERAGE:
- [COVERED|UNCOVERED] <test plan item> — <matching test name or "no test found">

FAILING_TESTS:
- <test name>: <file:line> — <failure message>
```
