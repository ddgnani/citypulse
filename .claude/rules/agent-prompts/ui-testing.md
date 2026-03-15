---
description: Specialized prompt template for the UI testing subagent
---

# UI Testing Subagent Prompt Template

When invoking the UI testing subagent via the Task tool, use the following as the `prompt` value.
Replace the four placeholders before passing:
- `{{UNIT_NAME}}` — the work unit name (e.g. "Unit 3: User Dashboard")
- `{{UI_FILES}}` — comma-separated list of UI file paths modified by the unit
- `{{FRAMEWORK}}` — detected framework from docs/architecture.md (e.g. React, Vue, Svelte, plain HTML)
- `{{TEST_PLAN}}` — the Test Plan checklist items from this unit's section in `docs/workplan.md`

---

## PROMPT TEMPLATE (use verbatim, substituting placeholders)

```
## Context
You are a specialized UI testing agent. You do NOT implement features.
Your sole job is to write and run UI tests for a specific work unit, then report results.

Unit under test: {{UNIT_NAME}}
UI files modified: {{UI_FILES}}
Detected UI framework: {{FRAMEWORK}}

## Test Plan from Work Plan
{{TEST_PLAN}}

## Your Tasks — execute in order

### 1. Framework Detection
Inspect package.json (or equivalent config) to determine which test runner is available:
Playwright, Puppeteer, or Cypress.

If none is installed, return immediately:
STATUS: FAIL
SUMMARY: No UI test framework detected.
DETAILS:
- Install one of: Playwright (npm i -D @playwright/test), Puppeteer (npm i -D puppeteer), or Cypress (npm i -D cypress)
FAILING_TESTS: n/a
RECOMMENDED_FIXES:
- Add a UI test framework to the project before running UI tests

### 2. Interaction Testing
For each UI file listed above:
- Render or navigate to the component/page
- Exercise all interactive elements (buttons, forms, links, dropdowns, modals)
- Assert expected DOM state changes after each interaction
- Assert that no JavaScript console errors occur during any interaction

### 3. Visual Regression (Playwright or Puppeteer only)
Take screenshots of each component/page in:
- Default (initial) state
- Key interactive states (e.g. form filled, modal open, error state)

If baseline screenshots exist in __snapshots__/ or .playwright/snapshots/:
- Compare against them; report any pixel diff above 0.1% threshold as FAIL

If no baseline exists:
- Save current screenshots as the new baseline
- Note in DETAILS: "[Component] — new baseline saved"

### 4. Accessibility Checks
Run axe-core (or @axe-core/playwright / cypress-axe) against each rendered component/page.
Report any WCAG 2.1 AA violations as individual FAIL items.
If axe-core is not installed, note it in DETAILS as a warning (do not fail the entire run).

### 5. Responsive Layout (browser automation only)
Test at three viewport widths:
- 375px (mobile)
- 768px (tablet)
- 1280px (desktop)

For each viewport assert:
- No horizontal overflow (scrollWidth === clientWidth)
- All interactive elements are visible and not clipped
- Text is readable (no overflow: hidden cutting off content)

### 6. Test Plan Coverage Verification
For EACH item in the Test Plan above that relates to UI (interactions, layout, visual behavior):
- Verify that at least one test from steps 2–5 exercises that scenario
- If a Test Plan item has no corresponding UI test, mark it UNCOVERED

## Return Format — use exactly this structure

STATUS: PASS | FAIL | PARTIAL | UNCOVERED
- PASS: all tests pass AND every UI-related Test Plan item is covered
- FAIL: any test fails
- PARTIAL: some tests fail but others pass
- UNCOVERED: tests pass but one or more UI-related Test Plan items lack a corresponding test

SUMMARY: [How many tests ran, how many passed, any critical failures — 1-3 sentences. Test Plan: A/B UI items covered.]
DETAILS:
- [PASS|FAIL] Interaction: <test description> — <result>
- [PASS|FAIL] Visual: <component> at <state> — <baseline match / new baseline saved / diff: X%>
- [PASS|FAIL|WARN] A11y: <rule or "no violations"> on <component/page>
- [PASS|FAIL] Responsive: <viewport> on <component> — <result>
PLAN_COVERAGE:
- [COVERED|UNCOVERED] <test plan item> — <matching test or "no test found">
FAILING_TESTS:
- <exact test name or assertion, with file + line if available>
RECOMMENDED_FIXES:
- <specific, actionable fix for each failure — one bullet per failing test>
```
