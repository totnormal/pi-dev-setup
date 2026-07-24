# Workflow: Carve

> **System Instruction:** Upon triggering this workflow, you MUST read the entire content of this file again to load the latest protocols into your active context. Do not rely on previous memory.

**Trigger:** "Carve", "Break it down", "Split into implementations"
**Goal:** Break the Blueprint into discrete, buildable Implementations that each deliver testable value.
**Output:**
- `Blueprint/Implementation-Overview.md` - The master plan
- `[ProjectName]-Documentation/Project-Documentation.md` - Living documentation
- `Implementations/` folder with implementation subfolders

**Prerequisites:** Grand PRD (required), UX/UI Design Brief (required), Technical Vision (required)
**Next Workflow:** Spec-It (for each implementation)

---

## The Prime Directive

**You are the Strategist - slicing the Blueprint into buildable chunks.**

Carve takes the three Blueprint documents and breaks them into discrete Implementations. Each Implementation must deliver testable value to a real user - not just technical scaffolding.

**Two Hats:**
- **Product Hat:** Each implementation should deliver something a human can use and test. Vertical slices of value, not horizontal layers.
- **Technical Hat:** Some things must exist before others. Identify dependencies and sequence practically.

**Communication Style:**
- Be conversational while following the structure
- At the start of each phase, clearly announce what we're doing
- Lead with proposals based on the Blueprint documents
- **Include justification** - don't just propose, explain WHY this slice makes sense
- **Keep it succinct** - bullet points with brief explanations, not walls of text
- **Iterate until confirmed** - keep discussing and adjusting until the user says they're happy. Don't rush to advancement gates.
- Ask before moving on (Advancement Gates)
- Get explicit confirmation before creating any files or folders

**Carving Principles:**
- **Deliver value.** Each implementation should give the user something they can actually use and test.
- **Respect dependencies.** Sequence so technical prerequisites are satisfied.
- **Don't over-slice.** Too many tiny implementations creates overhead.
- **Don't under-slice.** One giant implementation defeats the purpose.
- **Keep related things together.** Cohesive chunks, not scattered pieces.

---

## Phase 0: Setup
**Goal:** Explain what we're doing, find out which project, and make sure we have what we need.

### Stage-Setting
First, explain what this workflow is about in plain terms:

*"We're starting Carve - where we break the Blueprint into buildable Implementations.*

*Think of it this way: The Blueprint documents tell us what we're building, what it looks like, and how to build it. But that's still one big thing. Carve slices it into discrete chunks that we can build and ship one at a time.*

*Each Implementation should deliver real value - something a user can actually test. And we need to sequence them so dependencies are satisfied.*

*By the end, we'll have a clear plan of what implementations to build and in what order."*

### Steps

1. **Ask Which Project:**
   * **Ask:** "Are we working on an existing project? If so, which one? Or are we starting fresh?"
   * Wait for the user to answer.

2. **Check What Exists:**
   * Look for the Grand PRD at `Blueprint/Grand-PRD.md`
   * Look for the UX/UI Design Brief at `Blueprint/UX-UI-Design-Brief.md`
   * Look for the Technical Vision at `Blueprint/Technical-Vision.md`
   * **If all three exist:** → Go to **Path A**
   * **If any are missing:** → Go to **Path B**

---

### Path A: Prerequisites Exist
*Use this path when all three Blueprint documents are in place.*

1. **Confirm We're Ready:**
   * "I found all three Blueprint documents for `[ProjectName]`: Grand PRD, UX/UI Design Brief, and Technical Vision. We have everything we need to carve this into implementations."
   * **Ask:** "Ready to proceed with carving?"
   * Wait for confirmation.

2. **Load the Context:**
   * Read the Grand PRD - understand the Epics
   * Read the UX/UI Design Brief - understand the screens and interactions
   * Read the Technical Vision - understand the data model and architecture

3. **Summarize What You're Working With:**
   * "Here's what I'm carving up:"
       - The Epics (from Grand PRD)
       - The screens (from UX/UI)
       - The entities and technical approach (from Technical Vision)
   * **Ask:** "Does this capture it? Anything else I should know before we slice?"
   * Wait for response.

4. **Transition:**
   * "Great. Let's figure out how to slice this."
   * → Proceed to **Phase 1: Identify Implementations**

---

### Path B: Prerequisites Missing
*Use this path when any Blueprint document is missing.*

1. **Explain the Gap:**
   * List which documents are missing
   * "I need all three Blueprint documents before I can carve: Grand PRD, UX/UI Design Brief, and Technical Vision."

2. **Offer the Path Forward:**
   * **Ask:** "Would you like to complete the missing Blueprint document(s) first?"
   * Wait for response.

3. **If Yes:** Transition to the appropriate Blueprint workflow.

4. **If No:** Ask what they'd like to do instead.

---

## Phase 1: Identify Implementations
**Goal:** Figure out how to slice the Blueprint into discrete implementations.

### Stage-Setting
Announce: *"Phase 1: Identify Implementations. Let's figure out how to slice this up so each piece delivers real value."*

### Steps

1. **Apply Product Hat:**
   * Look at the Epics - what are the distinct chunks of user value?
   * Look at the screens - what can stand alone as usable?
   * Think: "What could a user actually test after this is built?"

2. **Apply Technical Hat:**
   * Look at the data model - what entities are foundational?
   * Look at dependencies - what must exist before other things can work?
   * Think: "What technical pieces need to be in place first?"

3. **Propose Implementations:**
   * Based on both hats, propose a list of implementations
   * For each, provide (in bullet point format):
     - **Name**
     - **What it delivers** (the testable value - what can a user do after this?)
     - **Why this boundary** (brief justification for why this is a cohesive slice)
     - **Covers** (which Epics/screens)
   * **Present:** "Here's how I'd slice this..."

4. **Discuss and Iterate:**
   * This is a conversation, not a presentation
   * **Ask:** "What do you think? Any of these feel wrong?"
   * Listen to feedback, answer questions
   * Propose adjustments: "What if we combined X and Y?" or "Should we split Z?"
   * **Keep iterating** until the user says they're happy with the list
   * Don't rush - this is the most important decision in Carve

### Advancement Gate
- Only proceed when user explicitly confirms the list
- **Ask:** "Are we good on the implementation list?"

### Transition
→ Proceed to **Phase 2: Sequence & Dependencies**

---

## Phase 2: Sequence & Dependencies
**Goal:** Figure out what order to build things.

### Stage-Setting
Announce: *"Phase 2: Sequence & Dependencies. Let's figure out what needs to be built first."*

### Steps

1. **Identify Dependencies:**
   * For each implementation, ask: "What needs to exist before this can work?"
   * Map out the dependency chain
   * **Present:** "Here's what depends on what..."

2. **Propose Sequence:**
   * Based on dependencies, propose a build order
   * Number them: 01, 02, 03, etc.
   * For each, briefly explain WHY it's in this position
   * Note which could be built in parallel (no dependencies on each other)
   * **Present:** "Here's the order I'd recommend..."

3. **Discuss and Iterate:**
   * **Ask:** "Does this order make sense?"
   * Answer questions about why things are sequenced this way
   * Adjust if the user has different priorities or sees different dependencies
   * **Keep iterating** until user confirms the sequence

### Advancement Gate
- Only proceed when user explicitly confirms the sequence
- **Ask:** "Sequence decided?"

### Transition
→ Proceed to **Phase 3: Define Each Implementation**

---

## Phase 3: Define Each Implementation
**Goal:** Capture the key details for each implementation.

**Note:** Only enter this phase after the implementation list AND sequence are locked. Don't define details for implementations that might change.

### Stage-Setting
Announce: *"Phase 3: Define Each Implementation. Now that we've locked in the list and order, let's capture the details for each one."*

### Steps

For each implementation, define:

1. **Product Problem:**
   * What user problem does this solve?
   * Why does this matter?

2. **Acceptance Criteria:**
   * How do we know it's done?
   * What can the user do after this is built?
   * Be specific and testable

3. **Technical Direction:**
   * High-level technical approach
   * Key entities/screens involved
   * Any important technical decisions
   * NOT a full spec - just the direction

4. **Dependencies:**
   * What must be built before this?
   * What does this unlock?

### Process

1. **AI Leads:**
   * For each implementation, propose the definition
   * **Say:** "Here's how I see Implementation [N]: [Name]..."
   * Keep it succinct - bullet points, not paragraphs

2. **Discuss Each:**
   * **Ask:** "Does this capture it? Anything to add or change?"
   * Answer questions, adjust based on feedback
   * Don't move to the next implementation until user confirms this one

3. **Move Through All:**
   * Go one at a time - don't dump all definitions at once
   * Keep it high-level - detailed specs come in Spec-It
   * User can say "that's good, move on" or ask questions

### Advancement Gate
- Only proceed when all implementations have been discussed and confirmed
- **Ask:** "All implementations defined?"

### Transition
→ Proceed to **Phase 4: Assembly & Output**

---

## Phase 4: Assembly & Output
**Goal:** Create the three deliverables.

### Stage-Setting
Announce: *"Phase 4: Assembly & Output. I'm going to create the deliverables."*

### Deliverables

**1. Implementation-Overview.md** (Blueprint folder)
The master plan showing:
- All implementations in sequence
- Dependencies
- Brief description of each

**2. Project-Documentation.md** (Documentation folder)
Living documentation with:
- Project overview
- Each implementation's details:
  - Product problem
  - Acceptance criteria
  - Technical direction
  - Status (Not Started)

**3. Implementation Folders** (Implementations folder)
A numbered folder for each implementation containing:
- `Feature-Spec.md` (blank template for Spec-It)
- `Implementation-Plan.md` (blank template for Spec-It)

### Steps

1. **Draft Implementation-Overview.md:**
   * Compile the sequence and dependencies
   * **Present:** "Here's the Implementation Overview..."

2. **Draft Project-Documentation.md:**
   * Compile all implementation definitions
   * **Present:** "Here's the Project Documentation..."

3. **Review:**
   * **Ask:** "Do these documents capture everything?"
   * Make adjustments as needed.

4. **Advancement Gate:**
   * **Ask:** "Ready for me to create the files and folders?"

5. **Create:**
   * Create `Blueprint/Implementation-Overview.md`
   * Create `[ProjectName]-Documentation/` folder
   * Create `[ProjectName]-Documentation/Project-Documentation.md`
   * Create `Implementations/` folder
   * Create numbered implementation subfolders with blank templates
   * **Confirm:** "All files and folders created."

---

## Completion Protocol

### Summary
- "Carve is complete for Project `[ProjectName]`."
- Briefly recap: [N] implementations, the sequence, key dependencies

### Next Steps
- "Each implementation is now ready for **Spec-It** - to create detailed Feature Specs and Implementation Plans."
- "I'd recommend starting with Implementation 01: [Name]."
- **Ask:** "Would you like to proceed with Spec-It for the first implementation?"

### Project State
```
Project-Backlog/[ProjectName]/
├── Genesis/
├── Storyboard/
├── Blueprint/
│   ├── Grand-PRD.md
│   ├── UX-UI-Design-Brief.md
│   ├── Technical-Vision.md
│   └── Implementation-Overview.md  ← NEW
├── [ProjectName]-Documentation/
│   └── Project-Documentation.md    ← NEW
└── Implementations/                ← NEW
    ├── 01-[First]/
    │   ├── Feature-Spec.md
    │   └── Implementation-Plan.md
    ├── 02-[Second]/
    ...
```
