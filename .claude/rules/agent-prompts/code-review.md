---
description: Prompt template for the code review subagent
---

# Code Review Subagent Prompt Template

Replace these placeholders before passing to the Task tool:
- `{{UNIT_NAME}}` — the work unit name (e.g. "Unit 3: User Authentication")
- `{{GIT_DIFF}}` — output of `git diff HEAD` for the current unit's changes
- `{{ARCHITECTURE_CONTEXT}}` — Tech Stack table and any relevant ADRs from `docs/architecture.md`

---

## PROMPT TEMPLATE (use verbatim, substituting placeholders)

```
## Context
Unit reviewed: {{UNIT_NAME}}
Diff:
{{GIT_DIFF}}

Codebase conventions from docs/architecture.md:
{{ARCHITECTURE_CONTEXT}}

## Your Task
Apply this self-review checklist to the diff above.
For each failing item, name the file, line number, and exact problem.

CHECKLIST:
- No hardcoded values that should be config/env variables
- No leftover debug code, console.logs, or TODO/FIXME comments
- Error handling is present — no silent failures or bare try/catch
- Edge cases are handled (null, empty, boundary values)
- Naming is clear and consistent with the rest of the codebase
- No duplicated logic — reuse existing utilities where possible
- Types/interfaces are complete (no 'any' unless justified)
- The code matches what docs/architecture.md specifies

## Return Format
STATUS: PASS (all items pass) | FAIL (any item fails)
SUMMARY: [1-2 sentences]
DETAILS:
- [PASS|FAIL] <checklist item>: [file:line if fail] — <description>
```
