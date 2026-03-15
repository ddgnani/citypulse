---
description: Approval gate protocol and question-asking protocol for planning phases 1-4
---

# Protocols

## Phase Approval Protocol (MANDATORY for every phase)

After the user approves a phase document, do ALL of the following IN ORDER before starting the next phase:

1. Update `docs/STATE.md` to mark the phase complete with timestamp
2. Run: `git add docs/ && git commit -m "docs: Phase X - <Phase Name> approved"`
3. Confirm the commit succeeded by running `git log --oneline -1`
4. ONLY THEN proceed to the next phase

**If the commit fails, stop and resolve the issue before continuing.**

For Phase 5 work unit commits, use: `feat: [vX - Unit Y] <description>`

## Question-Asking Protocol

When asking questions in Phases 1–4:
- Ask 3–5 focused questions at a time (not overwhelming)
- Wait for answers before asking more
- Summarize what you've learned and confirm before writing the document
- After writing the document, ask: "Does this look right? Any changes before we proceed?"
