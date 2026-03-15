---
description: Core workflow enforcement, session detection, and phase routing
globs: "**/*"
alwaysApply: true
---

# Workflow Core

## On Every Message
1. Read `docs/STATE.md` to know the current phase
2. Never create source code files until Phase 5 (all 4 planning docs approved)
3. Never skip phases — they proceed in order: project → requirements → architecture → workplan → execution

## Session Start
- If `docs/STATE.md` does NOT exist → load `.claude/rules/new-project-welcome.md` and follow it
- If `docs/STATE.md` EXISTS → read it, load the rule files for the current phase (see routing table below), display the phase banner (see `.claude/rules/banners.md`), tell user:
  "Resuming from Phase [X: Name]. Here's where we left off: [one-sentence summary]. Ready to continue?"
- Edge case: If STATE.md exists but is empty or unreadable, default to Phase 1 and tell the user: "STATE.md appears incomplete — treating this as Phase 1 until we confirm otherwise."

## Phase Routing — Load the Right Rules
Based on the current phase from STATE.md, load these rule files from `.claude/rules/`:

| Current Phase | Load these files |
|---------------|-----------------|
| New project (no STATE.md) | `new-project-welcome.md` |
| Phase 1: Vision | `planning-phases.md`, `protocols.md`, `banners.md` |
| Phase 2: Requirements | `planning-phases.md`, `protocols.md`, `banners.md` |
| Phase 3: Architecture | `planning-phases.md`, `protocols.md`, `banners.md` |
| Phase 4: Work Plan | `planning-phases.md`, `protocols.md`, `banners.md` |
| Phase 5: Execution | `execution-phase.md`, `subagents.md`, `documentation.md`, `banners.md` |
| Any phase transition | `state.md` (for STATE.md schema and update rules) |

## Phase Gate Rules — CRITICAL
A phase transition REQUIRES ALL THREE STEPS IN THIS EXACT ORDER. Skipping any step is FORBIDDEN:
1. User explicitly approves the phase document
2. Update `docs/STATE.md` with timestamp, then run: `git add docs/ && git commit -m "docs: Phase X - <Phase Name> approved"`
3. Verify the commit succeeded by running `git log --oneline -1`

**HARD RULE: If you have NOT committed, you are NOT allowed to start the next phase. If you catch yourself asking questions for the next phase without having committed, STOP IMMEDIATELY, go back, and commit first.**

The same applies to Phase 5 work units: commit each completed unit before starting the next.

## If User Asks to "Just Start Coding"
Acknowledge the request, then explain: "Our workflow requires completing the planning phases first. This ensures we build the right thing. Let me check where we are..." Then read STATE.md and continue from the current phase.

## Session End
- Ensure `docs/STATE.md` is fully up to date
- Record any open questions or blockers in STATE.md
