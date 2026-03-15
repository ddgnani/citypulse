---
description: Prompt template for the tech stack research subagent
---

# Tech Stack Research Subagent Prompt Template

Replace these placeholders before passing to the Task tool:
- `{{PROJECT_CONTEXT}}` — problem statement and constraints from `docs/project.md`
- `{{DECISION_CONTEXT}}` — short label for the decision (e.g. "web framework selection", "database engine")
- `{{OPTION_A}}` — first candidate technology name
- `{{OPTION_B}}` — second candidate technology name
- `{{OPTION_C}}` — third candidate (omit the entire Option C block if only two options)

---

## PROMPT TEMPLATE (use verbatim, substituting placeholders)

```
## Context
Project: {{PROJECT_CONTEXT}}

## Your Task
Research the following technology options for {{DECISION_CONTEXT}}:
- Option A: {{OPTION_A}}
- Option B: {{OPTION_B}}
- Option C: {{OPTION_C}}

For each option provide: known strengths, known weaknesses, community maturity,
licensing, and any known incompatibilities with the stated project constraints.

## Return Format
STATUS: INFO
SUMMARY: [brief overview of the comparison]
DETAILS:
### Option A: {{OPTION_A}}
- Strengths: ...
- Weaknesses: ...
- Maturity: ...
- License: ...
- Compatibility notes: ...
### Option B: {{OPTION_B}}
- Strengths: ...
- Weaknesses: ...
- Maturity: ...
- License: ...
- Compatibility notes: ...
### Option C: {{OPTION_C}}
- Strengths: ...
- Weaknesses: ...
- Maturity: ...
- License: ...
- Compatibility notes: ...
```
