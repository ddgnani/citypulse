<!-- workflow-managed -->
# Workflow Configuration

## Core Principle
**NEVER write implementation code until all planning phases are complete and approved.**
Follow phases in order. Each phase produces an approved markdown artifact before the next begins.

## The 5 Phases

| # | Phase | Output |
|---|-------|--------|
| 1 | Project Vision | `docs/project.md` |
| 2 | Requirements | `docs/requirements.md` |
| 3 | Architecture | `docs/architecture.md` |
| 4 | Work Plan | `docs/workplan.md` |
| 5 | Execution | `src/` (unit by unit) |

## File Structure

```
project-root/
├── CLAUDE.md
├── docs/
│   ├── STATE.md
│   ├── project.md
│   ├── requirements.md
│   ├── architecture.md
│   ├── workplan.md
│   └── api.md
└── src/
```

## Quick Start
1. Read `docs/STATE.md` to find your current phase
2. Load the rule file(s) for that phase — see the routing table in `.claude/rules/workflow-core.md`
3. Follow their instructions
