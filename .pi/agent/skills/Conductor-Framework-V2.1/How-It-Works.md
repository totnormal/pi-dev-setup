# How Conductor Framework V2 Works

An overview of how the system is structured, how things flow through it, and key workflows.

---

## Folder Structure

```
Conductor-Framework-V2/
├── How-It-Works.md               # This file - system overview
├── 0-Compass/                    # Direction & goals
├── 1-Workbench/                  # Active work area
├── 2-Backlog/                    # Queue for ready work
│   ├── Task-Backlog.md           # Small tasks
│   ├── Project-Backlog/          # Projects (contain multiple implementations)
│   └── Implementation-Backlog/   # Ready-to-build implementations
├── 3-Product-Areas/              # Inventory of features & future epics
├── 4-AI-Brain/                   # LLM instructions, personas, workflows, context
│   ├── AI-Personas/              # Judgment partners (CTO, Architect, PM, Tech Lead, etc.)
│   ├── Workflows/                # Step-by-step guides (Genesis, Blueprint, Carve, etc.)
│   ├── Skills/                   # Atomic capabilities
│   └── Context/                  # Global documentation (Identity, Design, Technical, etc.)
├── 5-Templates/                  # Document templates
└── 6-Archive/                    # Completed work
```

---

## What Each Folder Is For

### 0-Compass
Your North Star. The "where are we going?" layer.
- **North Star** — The one metric that defines success
- **Ship-Log** — A chronological victory log of everything you've shipped.

### 1-Workbench
The daily workspace. Where focus happens.
- **Inbox** — Dump everything here. Process later.
- **Scratchpad** — Temporary notes.
- **Active Implementation** — When you start building a big project, you move its folder here from the Backlog.

### 2-Backlog
The "To Do" queue. It has three tiers:
- **Project-Backlog/** — Projects containing Genesis, Storyboard, Grand PRD, and multiple Implementations.
- **Implementation-Backlog/** — Individual Implementations (Feature Spec + Implementation Plan) ready to be built.
- **Task-Backlog.md** — Small stuff (bugs, tweaks) that doesn't need a full plan.

### 3-Product-Areas
The "Product Map." Organized by domain (e.g., `Auth/`, `Billing/`).
Each Area contains three standard files:
1. **[Area]-Features.md** — Functional documentation (What user can do).
2. **[Area]-Technical.md** — Technical documentation (How it works).
3. **[Area]-Epics.md** — Future ideas and big problems to solve (Inventory).

### 4-AI-Brain
The AI's home. Contains instructions, protocols, and context for AI/LLM partnership.
- **AI-init.md** — The main onboarding prompt for the LLM.
- **AI-Personas/** — Judgment partners that embody ways of thinking (CTO, Architect, Product Manager, Conductor Assistant, Tech Lead). Invoke these when you need help *thinking*, not following steps.
- **Workflows/** — Step-by-step guides (Genesis, Storyboard, Blueprint, Carve, Spec-It). Invoke these when you need to *produce* artifacts through a defined process.
- **Skills/** — Atomic capabilities for specific tasks. Invoke these when you need to *execute* a discrete action.
- **Context/** — Your product's "tribal knowledge." These are starter files with prompts to help you document your product. Fill them in as you go - the more context you provide, the better your AI partners can help.
  - **Identity/** — Problem, Vision, Target User, Brand Voice.
  - **Design/** — Design System, UI Components, Brand Assets.
  - **Technical/** — Tech Stack, Architecture, Coding Patterns.
  - **Product/** — Growth Strategy, Future Plans.
  - **Meta/** — Decision Log, Glossary.

### 5-Templates
Standard structures for creating artifacts:
- **Individual Files:** PRD, Agentic-Flow, Persona, Skill.
- **Genesis-Workflow/**: Templates for Genesis outputs (Problem-Solar-System, World-Transformation, Functional-Animator).
- **Storyboard-Workflow/**: Templates for Storyboard outputs (Main-Character, Storyboard).
- **Blueprint-Workflows/**: Templates for Blueprint outputs (Grand-PRD, UX-UI-Design-Brief, Technical-Vision).
- **Carve-Workflow/**: Templates for Carve outputs (Implementation-Overview, Project-Documentation, Feature-Spec, Implementation-Plan).
- **Folders:** New-Product-Area (Starter Kit).

### 6-Archive
Where completed work goes.
- **Completed-Projects/** — Full projects moved here after all implementations ship.
- **Completed-Implementations/** — Standalone implementations moved here after shipping.

---

## System Flow (The Kanban)

We move **folders** to indicate state changes.

```
     QUEUE                          DOING               DONE
  [2-Backlog]  →  [1-Workbench]  →  [6-Archive]
```

**For Projects (full pipeline):**
1. **Plan:** Create Project in `2-Backlog/Project-Backlog/`. Run Genesis → Storyboard → Blueprint → Carve → Spec-It.
2. **Build:** Move one implementation at a time to `1-Workbench/`. Execute the plan.
3. **Ship:** Move completed implementation to `6-Archive/Completed-Implementations/`.
4. **Repeat:** Build and ship each implementation until all are done.
5. **Close:** Move the full Project folder to `6-Archive/Completed-Projects/`.

**For Standalone Implementations:**
1. **Queue:** Create folder directly in `2-Backlog/Implementation-Backlog/` with PRD & Plan.
2. **Build:** Move to `1-Workbench/`. Execute.
3. **Ship:** Move to `6-Archive/Completed-Implementations/`.

---

## The Three Backlogs

| Project Backlog | Implementation Backlog | Task Backlog |
|-----------------|------------------------|--------------|
| `2-Backlog/Project-Backlog/` | `2-Backlog/Implementation-Backlog/` | `2-Backlog/Task-Backlog.md` |
| Big multi-implementation efforts | Discrete buildable chunks | Small stuff |
| Genesis, Storyboard, Grand PRD, Implementations | Feature Spec + Implementation Plan | Bugs, tweaks |
| Months of work | Weeks of work | Hours of work |
| Created by Genesis workflow | Carved from Projects | Quick fixes |

---

## Progressive Disclosure (Levels)

Not everyone needs the full system. Start simple.

### Level 1: Survival
**Use:** Inbox, Workbench, Task-Backlog, Archive, Compass.
**Good for:** Solo devs shipping small updates.

### Level 2: Structure
**Add:** Product-Areas, Implementation-Backlog.
**Good for:** Building complex features that need PRDs and Architecture planning.

### Level 3: Scale
**Add:** Full Skills, Workflows, Agentic Flows.
**Good for:** High-velocity shipping with heavy AI assistance.

---

## Key Workflows

### Workflow: Genesis (The Origin Story)

**Trigger:** "Start a new app", "I have an idea", "Genesis Mode"

**Creates:** A new Project folder in `2-Backlog/Project-Backlog/[ProjectName]/`

**Steps:**

0. **Phase 0: Setup** — Ask if this is a new product or new feature. Create a Project folder in `2-Backlog/Project-Backlog/`. If a feature, run a Context Scan to review existing Product Areas and codebase.
1. **Phase 1: The Rant** — Capture the friction and map the "Problem Solar System." Includes a Gaps Check where AI suggests potential blind spots before drafting.
2. **Phase 2: World Transformation** — Define the "Before" vs. "After" states and the North Star.
3. **Phase 3: Functional Animator** — AI synthesizes functional jobs based on Phases 1-2, then refines with user. Includes Non-Goals to define scope boundaries.
4. **Result:** Produces the three Genesis documents in `Project/Genesis/` using templates from `5-Templates/Genesis-Workflow/`. Next step is Storyboard.

**Communication Style:** AI announces each phase clearly, stays conversational while following the structure, and asks before moving on (Advancement Gates).

### Workflow: Storyboard (Shaping the Experience)

**Trigger:** "Storyboard", "Shape the experience", "Who's the main character?"

**Adds to:** Existing Project folder in `2-Backlog/Project-Backlog/[ProjectName]/Storyboard/`

**Relationship to Genesis:** Storyboard adds to an existing Project. If no Project exists, Genesis should be run first.

**Steps:**

0. **Phase 0: Setup** — Explain the workflow, check for existing Project with Genesis, create Storyboard folder within the Project.
1. **Phase 1: The Main Character** — Define who they are (situation, not demographics), when they show up, and the outcomes they want. AI can propose a draft based on Genesis, or ask questions if conductor leads.
2. **Phase 2: The Scenes** — Walk through the key scenes they experience. Check existing functionality first. AI proposes scenes, runs Gaps Check against outcomes, then explores each scene (trigger, what they see, what they do, what happens next). Includes simplicity checks to avoid overcomplicating.
3. **Completion** — Review both documents, summarize, validate against Genesis transformation, suggest next steps (Blueprint).

**Output:** Produces two documents in `Project/Storyboard/` using templates from `5-Templates/Storyboard-Workflow/`:
- `Main-Character.md` — Who they are, their situation, their outcomes
- `Storyboard.md` — The scenes, the views, how they connect, outcomes delivered

**Communication Style:** AI announces each phase clearly, wraps up each phase before transitioning to the next, offers AI-proposes-first options to overcome blank canvas, and asks before moving on (Advancement Gates).

### Blueprint Workflows (Grand PRD → UX/UI → Technical Vision)

Blueprint is a family of three sequential workflows that produce the complete project specification:

**Workflow 1: Grand PRD**
- **Trigger:** "Grand PRD", "Blueprint PRD", "Create PRD"
- **Prerequisites:** Genesis (required), Storyboard (recommended)
- **Output:** `Project/Blueprint/Grand-PRD.md` — Organizes problem space into Epics
- **Next:** UX/UI Design Brief

**Workflow 2: UX/UI Design Brief**
- **Trigger:** "UX/UI Design Brief", "Design the interface"
- **Prerequisites:** Grand PRD
- **Output:** `Project/Blueprint/UX-UI-Design-Brief.md` — Screens, navigation, interactions
- **Next:** Technical Vision

**Workflow 3: Technical Vision**
- **Trigger:** "Technical Vision", "Architecture"
- **Prerequisites:** Grand PRD + UX/UI Design Brief
- **Output:** `Project/Blueprint/Technical-Vision.md` — Architecture, data model, tech stack
- **Next:** Carve to break into Implementations

Each workflow is self-contained and can be run independently (as long as prerequisites exist).

### Workflow: Carve (Breaking Blueprint into Implementations)

**Trigger:** "Carve", "Break it down", "Split into implementations"

**Adds to:** Existing Project folder in `2-Backlog/Project-Backlog/[ProjectName]/`

**Prerequisites:** Grand PRD (required), UX/UI Design Brief (required), Technical Vision (required)

**Goal:** Break the Blueprint into discrete, buildable Implementations that each deliver testable value.

**Steps:**

0. **Phase 0: Setup** — Explain the workflow, ask which project, verify all three Blueprint documents exist.
1. **Phase 1: Identify Implementations** — Apply Product Hat (what delivers user value?) and Technical Hat (what are dependencies?). Propose implementations with justifications, iterate until confirmed.
2. **Phase 2: Sequence & Dependencies** — Map dependencies, propose build order with reasoning, iterate until confirmed.
3. **Phase 3: Define Each Implementation** — For each implementation, define product problem, acceptance criteria, technical direction, and dependencies. Go one at a time, confirm each before moving on.
4. **Phase 4: Assembly & Output** — Create the three deliverables after user approval.

**Output:** Produces three artifacts:
- `Blueprint/Implementation-Overview.md` — Master plan with sequence and dependencies
- `[ProjectName]-Documentation/Project-Documentation.md` — Living documentation with details for each implementation
- `Implementations/` folder with numbered subfolders, each containing `Feature-Spec.md` and `Implementation-Plan.md` templates

**Communication Style:** Conversational with justifications, succinct bullet points, iterate until confirmed, explicit advancement gates before each phase transition.

**Next Workflow:** Spec-It (for each implementation)

### Workflow: Spec-It (Detailed Specifications)

**Trigger:** "Spec it", "Spec this implementation", "Write the spec"

**Works on:** One implementation at a time from `Implementations/` folder

**Prerequisites:** Carve workflow completed (Implementation folders exist)

**Goal:** Create detailed Feature Spec and Implementation Plan for a specific implementation.

**Steps:**

0. **Phase 0: Setup** — Identify which implementation, load context from Blueprint and Project-Documentation, explain intent with a succinct summary (including acceptance criteria).
1. **Phase 1: Feature Spec** — Draft the "what" (user stories with acceptance criteria attached, UI/UX details, edge cases). Present summary, then full document. Iterate until signed off. **Create file immediately after lock.**
2. **Phase 2: Implementation Plan** — Draft the "how" (technical approach, files affected, data model, phases with verification). Present summary, then full document. Iterate until signed off. **Create file immediately after lock.**
3. **Completion** — Update Project-Documentation.md status to "Specced".

**Output:** Produces two documents in `Implementations/[NN-Name]/`:
- `Feature-Spec.md` — The detailed "what" (product perspective)
- `Implementation-Plan.md` — The detailed "how" (engineering perspective)

**Communication Style:** Present summaries first (3-5 bullet points), then full documents. Two sign-off gates: Feature Spec locked, then Implementation Plan locked.

**Next Workflow:** Build (execute the implementation phases)

---

## Key Concepts

### Product Areas vs. Implementations
- **Product Areas (`3-Product-Areas`)** are the *Library*. They hold the long-term knowledge and the list of future ideas (Epics).
- **Implementations** are the *Work*. They are temporary vehicles to deliver a specific set of changes. They live in Projects (carved from Blueprint) or standalone in `Implementation-Backlog/`.

### Folder = State
In Conductor V2, we don't update a "Status" field in a spreadsheet. We move the folder.
- If it's in `Backlog`, it's queued.
- If it's in `Workbench`, it's active.
- If it's in `Archive`, it's done.

### The "Conductor" Identity
You are not just a coder. You are the orchestrator. You define the "What" (PRD) and the "How" (Plan) so that your AI partners can execute with precision.