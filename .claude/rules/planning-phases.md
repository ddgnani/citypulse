---
description: Phase-by-phase instructions for Phases 1-4 (Vision, Requirements, Architecture, Work Plan) including tech stack research and requirements coverage subagents
---

# Planning Phases (1-4)

### Phase 1: Project Vision (`docs/project.md`)
- Ask the user questions to understand the high-level intent, goals, and vision
- Questions should cover: what problem this solves, who the users are, key outcomes, constraints, timeline
- Use `.claude/rules/doc-templates/project.md` as the document structure
- Create `docs/project.md` capturing the answers
- Update `docs/STATE.md` → Phase 1 complete
- **Do NOT proceed until user approves project.md**

### Phase 2: Requirements (`docs/requirements.md`)
- Ask the user questions to define detailed requirements
- Organize into versions (v1: MVP, v2, v3, etc.)
- Each version should list: functional requirements, non-functional requirements, acceptance criteria
- Use `.claude/rules/doc-templates/requirements.md` as the document structure
- Create `docs/requirements.md`
- Update `docs/STATE.md` → Phase 2 complete
- **Do NOT proceed until user approves requirements.md**

### Phase 3: Architecture (`docs/architecture.md`)
- Ask the user questions about technology preferences, infrastructure, integrations
- Document: system architecture, tech stack, data models, API design, component diagram, key design decisions
- For every significant design decision (tech stack choices, library selections, architectural patterns, build vs buy), include an **Architecture Decision Record (ADR)** section with:
  - **Decision**: What was decided
  - **Context**: Why this decision was needed
  - **Options Considered**: Alternatives that were evaluated
  - **Rationale**: Why this option was chosen over others
  - **Consequences**: Tradeoffs, risks, or follow-up actions

#### Tech Stack Research Subagent (Phase 3)
When evaluating technology options for significant stack decisions (framework, database, infrastructure provider), spawn a research subagent **before** writing the ADR:
- Read `.claude/rules/agent-prompts/tech-stack-research.md`
- Replace `{{PROJECT_CONTEXT}}` with the problem statement and constraints from `docs/project.md`
- Replace `{{DECISION_CONTEXT}}` with a short label (e.g. "web framework selection", "database engine")
- Replace `{{OPTION_A}}`, `{{OPTION_B}}`, `{{OPTION_C}}` with the candidate technology names (omit the Option C block if only two options)
- Pass the resulting prompt to Task tool with `subagent_type: general-purpose`

Present the subagent's DETAILS to the user before asking for their preference. Then document the chosen option as an ADR.

Do NOT skip the research subagent for decisions affecting the primary runtime, database engine, or deployment model.

#### UI/Frontend Detection (Phase 3)
After completing the Tech Stack table and Component Diagram in `docs/architecture.md`, determine whether the project has a UI or frontend component.

**Criteria for `has_ui: true`** (any one is sufficient):
- The Tech Stack table has a non-empty "Frontend" row, OR
- The system description mentions a web, mobile, or desktop UI layer, OR
- Any component in the Component Diagram is labelled as: client, browser, app, dashboard, or UI

**If any criterion is met:**
1. Set `has_ui: true` in the "Project Flags" section of `docs/STATE.md`
2. Add to `docs/architecture.md` under System Overview: *"This project has a UI layer. UI testing subagent will be activated in Phase 5 for units that touch UI files."*

**If no criterion is met:**
- Set `has_ui: false` in `docs/STATE.md` Project Flags. No further action needed.

- During Phase 5 execution, if new architectural decisions arise, append them as ADRs to `docs/architecture.md` and commit
- Use `.claude/rules/doc-templates/architecture.md` as the document structure
- Create `docs/architecture.md`
- Update `docs/STATE.md` → Phase 3 complete
- **Do NOT proceed until user approves architecture.md**

### Phase 4: Work Plan (`docs/workplan.md`)
- Break each version into modular, independently developable and testable units of work
- Each unit should specify: description, inputs/outputs, dependencies, files to create/modify, test plan
- Each unit must include an **Addresses** field listing the requirement IDs (e.g. FR-1, NFR-2) it satisfies
- Use `.claude/rules/doc-templates/workplan.md` as the document structure
- Before finalising, populate the **Requirements Coverage Matrix** and verify every requirement from `docs/requirements.md` has at least one unit — flag any gaps to the user

#### Requirements Coverage Validation Subagent (Phase 4)
Before presenting `docs/workplan.md` to the user for approval, spawn a validation subagent:
- Read `.claude/rules/agent-prompts/requirements-coverage.md`
- Replace `{{REQUIREMENTS_LIST}}` with the full requirements section from `docs/requirements.md`
- Replace `{{COVERAGE_MATRIX}}` with the full Requirements Coverage Matrix table from `docs/workplan.md`
- Pass the resulting prompt to Task tool with `subagent_type: general-purpose`

- If STATUS: FAIL → present gaps to user, update workplan to address them, then re-run the subagent before seeking user approval
- If STATUS: PASS → proceed to present workplan.md for user approval

- Create `docs/workplan.md`
- Update `docs/STATE.md` → Phase 4 complete
- **Do NOT proceed until user approves workplan.md**
