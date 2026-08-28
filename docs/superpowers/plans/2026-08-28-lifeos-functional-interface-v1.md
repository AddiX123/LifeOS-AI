# LifeOS AI Functional Interface V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a GitHub-inspired, premium LifeOS workspace shell with functional Today, Goals, Health & Care, Agents and Create routes while preserving existing working modules.

**Architecture:** Keep `LifeOSExpanded.tsx` as the composition boundary and add focused local-state workspace components plus a shared shell stylesheet. Existing Ask LifeOS, DayMastery, Research, Library, Privacy, Settings and Create Studio components remain reusable. No new backend APIs are invented for V1-only surfaces.

**Tech Stack:** React 19, TypeScript 5.7, Vite 6, Lucide React, existing AppDeploy client/API.

**Spec:** `docs/superpowers/specs/2026-08-28-lifeos-functional-interface-v1-design.md`

## Global Constraints

- Preserve the existing React 19 + TypeScript + Vite stack.
- Do not add a state-management library for V1.
- Do not expose secrets or hidden model reasoning.
- Health & Care remains assistive/non-diagnostic.
- Consequential agent actions require explicit user approval.
- V1-only demo/local state must not be represented as persisted backend data.

---

### Task 1: Add test infrastructure and core workspace-state tests

**Files:**
- Modify: `package.json`
- Create: `src/lifeos-workspace.test.ts`
- Create: `src/lifeos-workspace.ts`

**Interfaces:**
- Produces `Section` and `LifeGoal` types plus pure goal/today helpers used by workspace components.

- [ ] Add Vitest test scripts/dependency.
- [ ] Write failing tests for goal creation/completion and next-best-action selection.
- [ ] Verify the tests fail before implementation.
- [ ] Implement the minimal pure helpers.
- [ ] Run tests and verify green.
- [ ] Commit.

### Task 2: Build reusable LifeOS workspace cards

**Files:**
- Create: `src/LifeOSWorkspaceCards.tsx`
- Modify: `src/v23.css`
- Test: `src/lifeos-workspace.test.ts`

**Interfaces:**
- `QuickAction`, `ActivityItem`, `GoalSummary`, and compact card props.

- [ ] Add failing component/state tests for quick-action activation and goal completion callbacks.
- [ ] Implement cards and accessible buttons.
- [ ] Verify tests pass.
- [ ] Commit.

### Task 3: Build Today, Life Goals, Health & Care and Agents workspaces

**Files:**
- Create: `src/LifeOSWorkspaces.tsx`
- Modify: `src/v23.css`
- Test: `src/lifeos-workspace.test.ts`

**Interfaces:**
- Today receives goals/activity and navigation callbacks.
- Goals owns V1 local goal state.
- Health receives user-entered/demo care data only.
- Agents exposes approval-gated mock workflows.

- [ ] Add failing tests for goal add/complete, health task completion, and agent approval state.
- [ ] Implement the four workspace surfaces.
- [ ] Verify tests pass.
- [ ] Commit.

### Task 4: Upgrade the main LifeOS shell and route all existing modules

**Files:**
- Modify: `src/LifeOSExpanded.tsx`
- Modify: `src/v23.css`
- Test: `src/lifeos-workspace.test.ts`

**Interfaces:**
- Expand `Section` to include `agents` and `create`.
- Keep existing `AskLifeOSV2`, `DayMastery`, `ResearchV23`, `LibraryV23`, `PrivacyV23`, `SettingsV23`, and `CreateStudio` mounted through the shell.

- [ ] Add failing navigation tests for every primary route and mobile drawer close behavior.
- [ ] Implement the navigation/sidebar/contextual layout.
- [ ] Add theme state and active breadcrumbs without changing existing module APIs.
- [ ] Verify tests pass.
- [ ] Commit.

### Task 5: Verify production build and final integration

**Files:**
- Modify: `package.json` only if build/test scripts need correction.

- [ ] Run the complete test suite.
- [ ] Run `npm run build`.
- [ ] Fix only verified failures.
- [ ] Re-run tests and build.
- [ ] Review the final repository diff and document any V1 persistence limitations.
- [ ] Commit final integration.
