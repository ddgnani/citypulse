---
description: Parallel execution protocol for Phase 5 — eligibility check, git worktrees, concurrent subagent invocation, sequential merge
---

# Subagent Orchestration

## Task Tool Invocation Pattern

When spawning any subagent, use the Task tool with `subagent_type: general-purpose`.

Every subagent prompt **must** begin with a "Context" block that embeds the relevant content (unit definition, diff, file list, etc.) so the subagent is not context-blind. Subagents do not share the main conversation context.

Example structure:
```
## Context
[Paste relevant excerpts here — unit text, git diff, requirements list, etc.]

## Your Task
[Specific instructions]

## Return Format
[Required structure — see below]
```

## Structured Return Format

All subagents must be instructed to return exactly this structure:

```
STATUS: PASS | FAIL | PARTIAL | INFO
SUMMARY: One to three sentences.
DETAILS:
- [item 1]
- [item 2]
```

`PASS` — task completed, no issues found
`FAIL` — blocking issues found, do not proceed
`PARTIAL` — completed with non-blocking issues; present to user
`INFO` — research/informational result (no pass/fail judgment)

Parse results by checking `STATUS:` first. If `FAIL`, do not proceed to the next workflow step.

---

## Parallel Eligibility Check

Run this at the start of Phase 5 **before picking the first unit**, and again after each unit completes.

```
PARALLEL ELIGIBILITY CHECK:

1. Read docs/workplan.md. Build the list of PENDING units for the current version.

2. For each PENDING unit, extract:
   - "Dependencies:" — list of unit names/numbers it requires to be complete
   - "Files to Create/Modify:" — list of file paths

3. A unit is "dependency-satisfied" if ALL units in its Dependencies list have
   status "complete" in docs/STATE.md.

4. From the dependency-satisfied pool, find "file-safe pairs":
   two units whose Files to Create/Modify lists share zero paths.

5. If one or more file-safe pairs exist, offer the user:

   "I found [N] units eligible to run in parallel:
    - Unit X: [name]
    - Unit Y: [name]
   Running them in parallel uses git worktrees for isolation — each unit gets
   its own branch. Results are merged sequentially after both complete.
   Run in parallel or sequentially? (parallel / sequential)"

6. If the user selects "sequential" (or no eligible pairs exist): proceed with
   the standard single-unit loop in execution-phase.md.

7. If the user selects "parallel": follow the Parallel Execution Protocol below.
```

---

## Parallel Execution Protocol

Pre-conditions: user approved parallel mode, eligible pair confirmed.

```
1. For each unit in the parallel set (Unit X and Unit Y):

   a. Create a git worktree:
      git worktree add .worktrees/unit-X origin/$(git branch --show-current) -b feat/unit-X
      (use unit number and a short slug, e.g. unit-3-auth)

   b. Spawn a subagent via Task tool:
      - subagent_type: general-purpose
      - prompt:
        "## Context
         Working directory (worktree): [absolute path to .worktrees/unit-X]
         Unit definition:
         [paste full unit block from docs/workplan.md]

         Architecture reference:
         [paste relevant sections from docs/architecture.md]

         ## Your Task
         Implement this work unit inside the worktree directory above.
         After implementation:
         1. Write and run the unit's test plan.
         2. Apply the self-review checklist:
            - No hardcoded values (use config/env)
            - No debug code, console.logs, or TODO/FIXME
            - Error handling present — no silent failures
            - Edge cases handled (null, empty, boundary values)
            - Naming clear and consistent
            - No duplicated logic
            - Types/interfaces complete (no 'any' unless justified)
            - Code matches docs/architecture.md
         3. If tests pass and review is clean, commit inside the worktree:
            cd [worktree path] && git add . && git commit -m 'feat: [vX - Unit Y] description'
         4. If tests fail: fix and re-test. Do NOT commit a failing unit.

         ## Return Format
         STATUS: PASS (committed and tests pass) | FAIL (tests failed or review issues)
         SUMMARY: What was implemented and test outcome.
         DETAILS:
         - [test results]
         - [any review issues found and how they were resolved]
         COMMIT_HASH: [output of git log --oneline -1 inside the worktree, or 'none' if not committed]"

2. Await both subagents to return (they run concurrently).

3. For each subagent result, in order (Unit X first, then Unit Y):
   - If STATUS: PASS:
     git merge --no-ff feat/unit-X -m "merge: [vX - Unit X] via parallel execution"
     git worktree remove .worktrees/unit-X
     Check off all Test Plan items for this unit in docs/workplan.md (change `- [ ]` to `- [x]`)
     Mark unit complete in docs/STATE.md
     Commit the doc updates: git add docs/ && git commit -m "docs: [vX - Unit X] mark test plan complete"
   - If STATUS: FAIL:
     Present DETAILS to user.
     Ask: "Fix now (I'll handle it sequentially) or skip this unit for now?"
     Do NOT merge. Run: git worktree remove .worktrees/unit-X --force
     Mark unit as "blocked" in docs/STATE.md with the failure reason

4. After processing all results, update the Phase 5 banner to reflect current state.
```

**Constraints:**
- Never parallelize more than 2 units at once without explicit user confirmation
- Never parallelize units that share any file path
- Merges are always sequential (Unit X merged first, then Unit Y) to allow conflict detection
