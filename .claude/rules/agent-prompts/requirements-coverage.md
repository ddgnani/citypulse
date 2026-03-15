---
description: Prompt template for the requirements coverage validation subagent
---

# Requirements Coverage Subagent Prompt Template

Replace these placeholders before passing to the Task tool:
- `{{REQUIREMENTS_LIST}}` — full requirements section from `docs/requirements.md` (all FR-* and NFR-* IDs and text)
- `{{COVERAGE_MATRIX}}` — full Requirements Coverage Matrix table from `docs/workplan.md`

---

## PROMPT TEMPLATE (use verbatim, substituting placeholders)

```
## Context
Requirements list:
{{REQUIREMENTS_LIST}}

Requirements Coverage Matrix (from docs/workplan.md):
{{COVERAGE_MATRIX}}

## Your Task
Identify any requirement ID that:
(a) has no unit listed in the "Unit(s)" column, OR
(b) is missing entirely from the matrix

## Return Format
STATUS: PASS (all requirements covered) | FAIL (gaps found)
SUMMARY: [N requirements checked, M gaps found]
DETAILS:
- [REQ-ID]: [requirement text] — [covered by Unit X | NOT COVERED]
```
