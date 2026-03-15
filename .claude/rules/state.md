---
description: STATE.md schema, initialization template, and update rules — load during phase transitions
---

# State Management

All workflow state is tracked in `docs/STATE.md`. Always keep it up to date.

## What STATE.md Records
- Current workflow phase
- Approval status of each phase document
- For Phase 5: which work units are done, in-progress, or pending
- Timestamp of last update
- Any blockers or decisions needed
- Project flags set during planning (e.g. `has_ui`, `subagent_mode`)

## When to Update
- At the start of each phase
- When a phase document is approved
- After each Phase 5 work unit is completed
- At the end of every session
- When `has_ui` is determined during Phase 3 (set to `true` or `false`)
- When user chooses parallel mode in Phase 5 (set `subagent_mode: parallel`)

## STATE.md Initialization Template

Use this when creating `docs/STATE.md` for a new project (substitute today's date for `[TODAY'S DATE]`):

```markdown
# Project State

## Current Phase: 1 - Project Vision
## Last Updated: [TODAY'S DATE]

---

## Phase Status

| Phase | Document | Status | Approved |
|-------|----------|--------|----------|
| 1. Project Vision | `docs/project.md` | IN PROGRESS | ❌ |
| 2. Requirements | `docs/requirements.md` | NOT STARTED | ❌ |
| 3. Architecture | `docs/architecture.md` | NOT STARTED | ❌ |
| 4. Work Plan | `docs/workplan.md` | NOT STARTED | ❌ |
| 5. Execution | (units added after Phase 4) | NOT STARTED | — |

---

## Project Flags

| Flag | Value | Set During |
|------|-------|------------|
| `has_ui` | `false` | Phase 3 (updated after architecture is complete) |
| `subagent_mode` | `sequential` | Phase 5 (updated to `parallel` if user opts in) |

---

## Execution Progress (Phase 5)
<!-- Populated after workplan.md is approved -->

---

## Session Log
[TODAY'S DATE] - New project initialized. Starting Phase 1.
```
