# LifeOS AI Functional Interface V1 — Design Spec

## Goal

Turn the existing LifeOS application shell into a polished, functional workspace inspired by the information density and navigation patterns of modern GitHub-style project interfaces, while retaining LifeOS's own Human Intelligence & Care OS identity.

## Product direction

LifeOS is a contextual operating layer rather than a static chatbot. The interface should make the operating loop visible and usable: Context → Permissioned Memory → Understanding → Reasoning → Orchestration → Response → Next Best Action → Outcome → Learning.

## Existing baseline

The current application already has a single `LifeOSExpanded` shell with navigation for Today, Day Plan, Ask LifeOS, Life Goals, Health & Care, Research, Library, Privacy and Settings. Ask LifeOS has an API-backed chat flow with attachment handling; Research and Library already expose existing components. The V1 change should compose these capabilities instead of replacing them.

## Experience

### Shell
- Persistent left navigation on desktop.
- Mobile drawer navigation.
- Top bar with breadcrumb, theme toggle and authenticated profile state.
- Main workspace with responsive content width.
- Optional contextual right rail on workspace pages.
- LifeOS visual language: dark-first, subtle gradients, restrained glass surfaces, high readability and clear active states.

### Primary navigation
- Today
- Day Plan
- Ask LifeOS
- Life Goals
- Health & Care
- Research
- Library
- Agents
- Create Studio
- Privacy
- Settings

### Today workspace
- Next Best Action hero.
- Today's focus.
- Priority goals.
- Daily progress/consistency summary.
- Recent LifeOS activity.
- Quick actions into Ask LifeOS, goals, research and library.

### Ask LifeOS
- Preserve the existing API-backed chat behavior.
- Support text plus current image/audio attachments.
- Provide visible context/memory state without exposing hidden chain-of-thought.
- Provide action-oriented response affordances such as Save to Library, Turn into Goal, Add to Day Plan and Research Further where appropriate.

### Day Plan
- Preserve existing DayMastery component.
- Present today's focus and completion state prominently.
- Provide a clear route back to Ask LifeOS for adaptive planning.

### Life Goals
- V1 provides an interactive goal workspace using local UI state.
- Goals can be created, completed and converted into a day-plan item.
- The interface should clearly distinguish local/demo state from persisted backend state until a dedicated data API exists.

### Health & Care
- Create a safe, non-diagnostic dashboard surface.
- Show health context cards, care tasks, appointments and habits as user-entered/demo state.
- Include prominent safety language: LifeOS assists; it does not replace qualified clinicians or emergency services.
- Keep privacy controls visible.

### Research and Library
- Preserve existing components and entry points.
- Use the shell's workspace styling so these modules feel like one system.

### Agents
- V1 introduces an agent directory UI, not autonomous high-impact execution.
- Agents have purpose, capability, status and an explicit Run/Review action.
- Any consequential external action must remain approval-gated.

### Create Studio
- Preserve the existing Create Studio entry point.
- Expose it as a first-class workspace route.

### Privacy and Settings
- Preserve existing components.
- Surface memory/privacy status in relevant contexts.

## Technical architecture

- Keep React 19 + TypeScript + Vite.
- Continue using the existing AppDeploy client/API integration.
- Keep module components focused; use `LifeOSExpanded` as the shell/composition boundary.
- Add small reusable UI primitives only where they reduce duplication.
- Do not introduce a new state-management library for V1.
- Do not invent backend endpoints for features that do not currently exist.
- Use local React state for V1-only interactive demo surfaces and label persistence boundaries clearly.

## Safety and privacy

- Never display secrets.
- Do not expose hidden model reasoning or chain-of-thought.
- Health surfaces must remain assistive/non-diagnostic.
- Agent actions with external or consequential effects require user confirmation.
- Memory controls must be explicit and permission-oriented.

## Success criteria

1. Existing LifeOS modules remain reachable and functional.
2. The interface feels like one coherent LifeOS workspace rather than disconnected screens.
3. Today, Goals, Health & Care and Agents gain useful interactive V1 surfaces.
4. Ask LifeOS retains its working API-backed conversation flow.
5. Desktop and mobile navigation are usable.
6. `npm run build` succeeds.
7. No secrets or fabricated production integrations are added.
