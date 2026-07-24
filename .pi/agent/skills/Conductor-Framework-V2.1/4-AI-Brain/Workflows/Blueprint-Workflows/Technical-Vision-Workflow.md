# Workflow: Technical Vision

> **System Instruction:** Upon triggering this workflow, you MUST read the entire content of this file again to load the latest protocols into your active context. Do not rely on previous memory.

**Trigger:** "Technical Vision", "Architecture", "How do we build this"
**Goal:** Figure out how to build the interface designed in the UX/UI Design Brief - architecture, data model, tech stack.
**Output:** `2-Backlog/Project-Backlog/[ProjectName]/Blueprint/Technical-Vision.md`

**Template:** Use `5-Templates/Blueprint-Workflows/Technical-Vision.md` for consistent output structure.

**Prerequisites:** Grand PRD (required), UX/UI Design Brief (required)
**Next Workflow:** Carve (to break into Implementations)

---

## The Prime Directive

**You are the Architect - designing the Solution.**

The Technical Vision is the third of three Blueprint documents:
1. **Grand PRD** (done) - Organized problem space into Epics
2. **UX/UI Design Brief** (done) - Translated Epics into interface
3. **Technical Vision** (this workflow) - Figure out how to build it

The Technical Vision answers: "How do we build this?" It takes the screens and interactions and figures out the architecture, data model, and technical approach.

**Communication Style:**
- Be conversational while following the structure
- At the start of each phase, clearly announce what we're doing
- Lead with proposals based on the UX/UI and existing system
- Ask before moving on (Advancement Gates)
- Balance ideal architecture with practical constraints

**Technical Principles:**
- **Don't over-engineer.** Simple solutions over clever ones. Only add complexity when it solves a real problem.
- **Follow existing patterns.** If there's an existing codebase, match its conventions. Don't introduce new patterns without reason.
- **Minimize new dependencies.** Every library is a liability. Only add what's truly needed.
- **This is a vision, not a spec.** Capture the key architectural decisions and structure. Implementation details come later in Spec-It.

---

## Phase 0: Setup
**Goal:** Explain what we're doing, find out which project, and make sure we have what we need.

### Stage-Setting
First, explain what this workflow is about in plain terms:

*"We're starting the Technical Vision - where we figure out how to actually build this thing.*

*Think of it this way: The Grand PRD told us WHAT and WHY. The UX/UI Design Brief showed us what the user will SEE and DO. Now we need to figure out the HOW - the architecture, the data model, the tech stack, what code goes where.*

*By the end, we'll have a technical blueprint that a developer could pick up and start building from. This is the last of the three Blueprint documents."*

### Steps

1. **Ask Which Project:**
   *   **Ask:** "Are we working on an existing project? If so, which one? Or are we starting fresh?"
   *   Wait for the user to answer.

2. **Check What Exists:**
   *   Look for the Grand PRD at `Blueprint/Grand-PRD.md`
   *   Look for the UX/UI Design Brief at `Blueprint/UX-UI-Design-Brief.md`
   *   **If both exist:** → Go to **Path A**
   *   **If either is missing:** → Go to **Path B**

---

### Path A: Prerequisites Exist
*Use this path when both the Grand PRD and UX/UI Design Brief are in place.*

1. **Confirm We're Ready:**
   *   "I found both the Grand PRD and the UX/UI Design Brief for `[ProjectName]`. I have the Epics and the interface design - now we can figure out how to build it."
   *   **Ask:** "Ready to proceed with the technical planning?"
   *   Wait for confirmation.

2. **Load the Context:**
   *   Read the Grand PRD - understand the Epics and scope
   *   Read the UX/UI Design Brief - understand screens, components, interactions, flows
   *   These define WHAT we need to build technically

3. **Summarize What You're Working With:**
   *   "Here's what I need to architect:"
       - The Epics (scope of functionality)
       - The screens and key interactions from UX/UI
       - Any complex interactions that will need special attention
   *   **Ask:** "Does this capture it? Anything technical I should know about before we dive in?"
   *   Wait for response.

4. **Ask About Existing System:**
   *   **Ask:** "Are we building on top of an existing codebase or app? Or is this greenfield (starting fresh)?"
   *   Wait for response. This determines how Phase 1 goes.

5. **Transition:**
   *   "Great. Let's figure out how to build this."
   *   → Proceed to **Phase 1: Existing System Analysis**

---

### Path B: Prerequisites Missing
*Use this path when the Grand PRD or UX/UI Design Brief doesn't exist.*

1. **Explain the Gap:**
   *   If Grand PRD missing: "I don't see a Grand PRD for `[ProjectName]`. I need the Epics before I can plan the architecture."
   *   If UX/UI missing: "I found the Grand PRD, but there's no UX/UI Design Brief. I need to know the screens and interactions before I can figure out how to build them."

2. **Offer the Path Forward:**
   *   **Ask:** "Would you like to run the [missing workflow] first? That will give us what we need for technical planning."
   *   Wait for response.

3. **If Yes:** Transition to the appropriate workflow.

4. **If No:** Ask what they'd like to do instead.

---

## Phase 1: Existing System Analysis
**Goal:** Understand what already exists to build on.

### Stage-Setting
Announce: *"Phase 1: Existing System Analysis. Let's understand what we're building on top of."*

### If Existing System

1. **Codebase Review:**
   - **Proactively explore the codebase** - don't wait to be shown around
   - Use tools to examine: folder structure, key modules, existing patterns
   - Look at how similar features are built (lists, detail views, forms, etc.)
   - **Ask only if stuck:** "I'm looking at the codebase. Is there a specific area I should focus on?"

2. **Current Tech Stack:**
   - Frontend framework
   - Backend/API approach
   - Database
   - Key libraries

3. **Current Data Model:**
   - What entities already exist?
   - What relationships?
   - How does this relate to what we need for the new features?

4. **What We Can Reuse:**
   - Components, modules, patterns that apply
   - Existing infrastructure

5. **What We Need to Build New:**
   - New entities, new screens, new capabilities
   - Gaps in the current system

6. **Present:** "Here's what I understand about the existing system..."
7. **Ask:** "Is this accurate? Anything else I should know?"

### If Starting Fresh

1. **Acknowledge:** "Starting fresh - no existing system to build on."
2. **Skip to Phase 2**

### Advancement Gate
- **Ask:** "Existing system analysis complete?"

### Transition
→ Proceed to **Phase 2: Tech Stack Decisions**

---

## Phase 2: Tech Stack Decisions
**Goal:** Decide on the technical foundation.

### Stage-Setting
Announce: *"Phase 2: Tech Stack Decisions. Let's nail down the technical foundation."*

### Steps

1. **Frontend:**
   - Framework/library choice
   - State management approach
   - Styling approach
   - **If existing:** "We're already using [X], so we'll continue with that."
   - **If new:** Propose based on requirements

2. **Backend:**
   - API approach (REST, GraphQL, etc.)
   - Server framework
   - **If existing:** Build on what's there
   - **If new:** Propose based on requirements

3. **Database:**
   - Database technology
   - ORM/query approach
   - **If existing:** Extend current schema
   - **If new:** Propose based on data needs

4. **New Libraries/Tools:**
   - What new dependencies do we need?
   - For each: what it does and why we need it
   - Be minimal - don't add complexity without reason

5. **Present:** "Here's what I'd recommend for the tech stack..."
6. **Ask:** "Does this align with your preferences? Any constraints?"

### Advancement Gate
- **Ask:** "Tech stack decided?"

### Transition
→ Proceed to **Phase 3: Data Model**

---

## Phase 3: Data Model
**Goal:** Define the entities, fields, and relationships.

### Stage-Setting
Announce: *"Phase 3: Data Model. Let's define the data structures we need."*

### Steps

1. **Identify Entities:**
   - Based on the Epics and UX/UI, what entities do we need?
   - Examples: Ideas, Projects, Series, Categories, Events, etc.

2. **Define Each Entity:**
   - For each entity:
     - Name
     - Key fields with types
     - Purpose

3. **Define Relationships:**
   - How do entities connect?
   - One-to-many, many-to-many, one-to-one
   - Draw relationship diagram (text-based)
   ```
   [Entity A] ──< [Entity B]     (one-to-many)
   [Entity C] >──< [Entity D]    (many-to-many)
   ```

4. **Integration with Existing:**
   - If extending existing system: how do new entities connect to existing ones?
   - Foreign keys, references

5. **Present:** "Here's the data model..."
6. **Ask:** "Does this capture all the entities? Any missing relationships?"

### Advancement Gate
- **Ask:** "Data model complete?"

### Transition
→ Proceed to **Phase 4: Architecture Overview**

---

## Phase 4: Architecture Overview
**Goal:** Define the high-level structure and patterns.

### Stage-Setting
Announce: *"Phase 4: Architecture Overview. Let's define how the pieces fit together."*

### Steps

1. **Component/Module Breakdown:**
   - How is the code organized?
   - Key modules and their responsibilities
   - Folder structure concept

2. **State Management:**
   - How is state managed?
   - What state needs to be tracked?
   - Local vs global state

3. **API Structure:**
   - If applicable: key endpoints
   - What data flows where

4. **Screen-to-Data Mapping:**
   - How do screens connect to data?
   - Which components fetch what data?

5. **Present:** "Here's how I'd structure the architecture..."
6. **Ask:** "Does this make sense? Any concerns?"

### Advancement Gate
- **Ask:** "Architecture defined?"

### Transition
→ Proceed to **Phase 5: Integration Points**

---

## Phase 5: Integration Points
**Goal:** Define how this connects to other systems.

### Stage-Setting
Announce: *"Phase 5: Integration Points. Let's define how this connects to other systems."*

### Steps

1. **Existing Features:**
   - How does this integrate with existing parts of the app?
   - Light integration (just links) vs deep integration (shared data)

2. **External APIs:**
   - Any external services we need to connect to?
   - What data comes from where?

3. **Auth/Permissions:**
   - How does authentication work?
   - Any permission model needed?

4. **Present:** "Here are the integration points..."
5. **Ask:** "Is this the right level of integration?"

### Advancement Gate
- **Ask:** "Integration points defined?"

### Transition
→ Proceed to **Phase 6: Technical Risks & Decisions**

---

## Phase 6: Technical Risks & Decisions
**Goal:** Identify tricky parts and key tradeoffs.

### Stage-Setting
Announce: *"Phase 6: Technical Risks & Decisions. Let's identify the tricky parts and key decisions."*

### Steps

1. **Risks:**
   - What's technically challenging?
   - Complex interactions (drag and drop, real-time updates)
   - Performance concerns
   - Data migration needs
   - For each: impact and mitigation

2. **Key Decisions:**
   - What tradeoffs did we make?
   - What options were considered?
   - Why did we choose this approach?

3. **Things That Need Prototyping:**
   - What should we spike first?
   - Uncertain technical approaches

4. **Present:** "Here are the technical risks and key decisions..."
5. **Ask:** "Any other concerns or decisions we should capture?"

### Advancement Gate
- **Ask:** "Risks and decisions captured?"

### Transition
→ Proceed to **Phase 7: Non-Functional Requirements**

---

## Phase 7: Non-Functional Requirements
**Goal:** Capture requirements beyond features.

### Stage-Setting
Announce: *"Phase 7: Non-Functional Requirements. Quick check on what else matters beyond features."*

### Steps

1. **Performance:**
   - Any performance expectations?
   - Load time, responsiveness

2. **Scalability:**
   - How much data? How many users?
   - Any scale considerations?

3. **Offline Support:**
   - Does this need to work offline?
   - If yes, how?

4. **Data Sync:**
   - Any sync considerations?
   - Multiple devices, real-time updates

5. **Other:**
   - Accessibility requirements
   - Browser/device support
   - Any other constraints

6. **Ask:** "Any non-functional requirements we should document?"

### Transition
→ Proceed to **Phase 8: Assembly**

---

## Phase 8: Assembly
**Goal:** Compile and save the Technical Vision.

### Stage-Setting
Announce: *"Phase 8: Assembly. I'm compiling everything into the Technical Vision."*

### Document Structure

1. **Overview** - What this document covers
2. **Existing System Analysis** - What we're building on
3. **Tech Stack Decisions** - Framework choices
4. **Data Model** - Entities and relationships
5. **Architecture Overview** - How it's structured
6. **Integration Points** - Connections to other systems
7. **Technical Risks & Decisions** - Tricky parts and tradeoffs
8. **Non-Functional Requirements** - Beyond features

### Steps

1. **Draft:**
   - Compile all content into the structure
   - **Present:** "Here's the complete Technical Vision..."

2. **Review:**
   - **Ask:** "Does this capture everything?"
   - Make adjustments as needed.

3. **Completeness Check:**
   - Can every screen from UX/UI be built with this architecture?
   - Does the data model support all the Epics?

4. **Advancement Gate:**
   - **Ask:** "Ready for me to save the Technical Vision?"

5. **Save:**
   - Write to `2-Backlog/Project-Backlog/[ProjectName]/Blueprint/Technical-Vision.md`
   - **Confirm:** "Technical Vision saved."

---

## Completion Protocol

### Summary
- "Technical Vision is complete for Project `[ProjectName]`."
- "All three Blueprint documents are now done:"
  - Grand PRD - the what and why
  - UX/UI Design Brief - the interface
  - Technical Vision - how to build it

### Next Steps
- "The natural next step is **Carve** - to break the Blueprint into discrete, buildable Implementations."
- "Carve will look at the Epics, the screens, and the architecture to create Implementation folders."
- "Each Implementation then gets **Spec-It** to create detailed Feature Specs and Implementation Plans."
- **Ask:** "Would you like to proceed with Carve?"

### Project State
```
Project-Backlog/[ProjectName]/
├── Genesis/
├── Storyboard/
└── Blueprint/
    ├── Grand-PRD.md
    ├── UX-UI-Design-Brief.md
    └── Technical-Vision.md  ← Blueprint complete!
```
