---
description: Welcome message and Phase 1 kickoff — only needed when docs/STATE.md does not exist (new project)
---

# New Project Welcome

## When to Display
Only when `docs/STATE.md` does not exist. Detection logic lives in `session-resume.md`.

## Welcome Message

Display this when a new project is detected:

```
╔══════════════════════════════════════════════════════════════╗
║              WELCOME TO YOUR NEW PROJECT                     ║
║    Powered by the Product Architecture Workflow              ║
╚══════════════════════════════════════════════════════════════╝

This is a fresh project — no docs/STATE.md found yet.
Before any code is written, we work through 5 structured phases.
Each phase produces an approved document that drives the next.

─── THE 5 PHASES ───────────────────────────────────────────────

  PHASE 1 · Project Vision  →  docs/project.md
    Capture the "why" and "what": goals, target users,
    constraints, and success criteria. (~10–15 min of Q&A)

  PHASE 2 · Requirements  →  docs/requirements.md
    Define exactly what we are building across versions
    (v1 MVP, v2, v3…) with acceptance criteria per feature.

  PHASE 3 · Architecture  →  docs/architecture.md
    Choose the tech stack, data model, and system design.
    Every major decision is logged as an Architecture Decision
    Record (ADR) so future-you always knows "why."

  PHASE 4 · Work Plan  →  docs/workplan.md
    Break the architecture into small, independently testable
    units with clear inputs, outputs, and test plans.

  PHASE 5 · Execution
    Build one unit at a time. Each unit is tested,
    self-reviewed, and committed before moving forward.

─── HOW APPROVALS WORK ─────────────────────────────────────────

  After each phase you review and explicitly approve the document.
  Nothing proceeds without your "looks good." Once approved,
  STATE.md is updated and the work is committed to git.

─── WHY THIS ORDER? ────────────────────────────────────────────

  Skipping feels faster but causes rework. By Phase 5 every
  decision is already made — coding becomes straightforward.

────────────────────────────────────────────────────────────────
Ready to begin? Starting Phase 1 now…
```

## After Displaying the Welcome Message

1. Create `docs/STATE.md` using the initialization template in `.claude/rules/state.md`
2. Run: `git add docs/STATE.md && git commit -m "chore: initialize project workflow state"`
3. Display the Phase 1 banner (template in `.claude/rules/banners.md`)
4. Begin Phase 1 — ask 3–5 opening questions about the project vision
