---
disable-model-invocation: true
name: email-outbound
description: "Email Outbound Lifecycle Sequences & Automation. Lifecycle email reference: welcome sequences, nurture flows, re-engagement,. Keywords: email marketing, newsletter, drip campaigns, automation, email outbound."
---

# Email Outbound — Lifecycle Sequences & Automation

## Extended Details



Lifecycle email reference: welcome sequences, nurture flows, re-engagement,
onboarding emails, and drip campaigns.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists, read it first.

Gather context:
1. **Sequence Trigger** — What starts this sequence?
2. **Primary Goal** — Conversion action?
3. **Audience** — Who? What do they already know?
4. **Other Emails** — What else are they receiving?

---

# Section 1: Sequence Types & Architecture

## Core Principles

### One Email, One Job
- Each email has one primary purpose and one main CTA
- Don't try to do everything in a single email

### Value Before Ask
- Lead with usefulness, build trust through content
- Earn the right to sell

### Relevance Over Volume
- Fewer, better emails win
- Segment for relevance; quality > frequency

## Sequence Types

### Welcome Sequence (Post-Signup)
**5-7 emails over 12-14 days | Goal: Activate, build trust, convert**
1. Welcome + deliver promised value (immediate)
2. Quick win (day 1-2)
3. Story/Why (day 3-4)
4. Social proof (day 5-6)
5. Overcome objection (day 7-8)
6. Core feature highlight (day 9-11)
7. Conversion (day 12-14)

### Lead Nurture Sequence (Pre-Sale)
**6-8 emails over 2-3 weeks | Goal: Build trust, demonstrate expertise, convert**
1. Deliver lead magnet + intro (immediate)
2. Expand on topic (day 2-3)
3. Problem deep-dive (day 4-5)
4. Solution framework (day 6-8)
5. Case study (day 9-11)
6. Differentiation (day 12-14)
7. Objection handler (day 15-18)
8. Direct offer (day 19-21)

### Re-Engagement Sequence
**3-4 emails over 2 weeks | Trigger: 30-60 days inactivity**
1. Check-in (genuine concern)
2. Value reminder (what's new)
3. Incentive (special offer)
4. Last chance (stay or unsubscribe)

### Onboarding Sequence (Product Users)
**5-7 emails over 14 days | Goal: Activate, drive to aha moment, upgrade**
1. Welcome + first step (immediate)
2. Getting started help (day 1)
3. Feature highlight (day 2-3)
4. Success story (day 4-5)
5. Check-in (day 7)
6. Advanced tip (day 10-12)
7. Upgrade/expand (day 14+)

**Note**: Coordinate with in-app onboarding — email supports, doesn't duplicate.

### Billing & Retention Emails
- Switch to annual (cost savings focus)
- Failed payment recovery (dunning — 3-4 retry attempts)
- Cancellation survey + save offer
- Upcoming renewal reminders

### Usage Campaign Emails
- Daily/weekly/monthly summaries
- Key event notifications
- Milestone celebrations

### Win-Back Emails
- Expired trials (re-activate with new feature highlight)
- Cancelled customers (win-back with improvements made)

## Timing Rules
- Welcome email: immediately
- Early sequence: 1-2 days apart
- Nurture: 2-4 days apart
- Long-term: weekly or bi-weekly
- B2B: avoid weekends; B2C: test weekends
- Time zones: send at local time

---

# Section 2: Email Copy Guidelines

## Structure
1. **Hook**: First line grabs attention
2. **Context**: Why this matters to them
3. **Value**: The useful content
4. **CTA**: What to do next
5. **Sign-off**: Human, warm close

## Subject Line Strategy
- Clear > Clever; Specific > Vague
- 40-60 characters ideal
- Benefit or curiosity-driven

**Patterns that work:**
- Question: "Still struggling with X?"
- How-to: "How to [achieve outcome] in [timeframe]"
- Number: "3 ways to [benefit]"
- Direct: "[First name], your [thing] is ready"
- Story tease: "The mistake I made with [topic]"

### Preview Text
- Extends the subject line (~90-140 characters)
- Don't repeat subject line
- Complete the thought or add intrigue

## Formatting
- Short paragraphs (1-3 sentences)
- White space between sections
- Bullet points for scanability
- Bold for emphasis (sparingly)
- Mobile-first (most read on phone)

## Length
- 50-125 words: transactional
- 150-300 words: educational
- 300-500 words: story-driven

## CTA Guidelines
- Buttons for primary actions, links for secondary
- One clear primary CTA per email
- Button text: Action + outcome ("Start your free trial" not "Click here")

## Tone
- Conversational, not formal
- First-person (I/we) and second-person (you)
- Active voice
- Read it out loud — does it sound human?

---

# Section 3: Sequence Architecture (Multi-Touch Campaigns)

## Sequence Types for Outbound

### Classic Cold Outreach
- 7 emails over 2 weeks
- Mix of email + LinkedIn + phone touchpoints
- Personalization level: account-based or segment-based

### Fast-Track
- 5 emails over 1 week
- Higher frequency for time-sensitive offers
- Personalization level: hyper-personal

### Long-Play Nurture
- 12-14 emails over 4-6 weeks
- Educational content first, soft offer later
- Personalization level: segment-based

### Event/Trigger-Based
- 3-5 emails tied to specific events
- Funding rounds, product launches, conference attendance

### Re-Engagement (Old Leads)
- 5 emails to revive warm leads gone cold
- Start with value, then incentive, then breakup

## Email Flow & Timing

### Email #1: The Introduction
- Goal: Make them aware you exist
- Focus: Relevant problem + quick win
- Length: 50-100 words
- CTA: Soft ask (reply, quick question)

### Email #2: The Value Proof
- Goal: Establish credibility
- Focus: Case study or social proof
- Length: 75-125 words
- CTA: Specific meeting time

### Email #3: The Different Angle
- Goal: Address alternative pain point
- Focus: Another use case or benefit
- Length: 50-75 words
- CTA: Yes/no question

### Email #4: The Social Proof
- Goal: Show others like them trust you
- Focus: Customer testimonial or stat
- Length: 60-90 words
- CTA: Simple reply

### Email #5: The Breakup
- Goal: Final attempt, close the loop
- Focus: "Should I close your file?"
- Length: 30-50 words
- CTA: One-line reply

## A/B Testing Framework
- Test one variable at a time (subject line, CTA, send time)
- Minimum 100 emails per variant for significance
- Track: open rate, reply rate, positive reply rate, meeting booked rate

## Metrics Benchmarks
| Metric | Good | Great |
|--------|------|-------|
| Open rate | 30-40% | 50%+ |
| Reply rate | 5-10% | 15%+ |
| Positive reply rate | 1-2% | 3%+ |

---

# Output Format

```
Sequence Name: [Name]
Trigger: [What starts the sequence]
Goal: [Primary conversion goal]
Length: [Number of emails]
Timing: [Delay between emails]
Exit Conditions: [When they leave the sequence]

## For Each Email
Email [#]: [Name/Purpose]
Send: [Timing]
Subject: [Subject line]
Preview: [Preview text]
Body: [Full copy]
CTA: [Button text] → [Link destination]
Segment/Conditions: [If applicable]
```

---

# Tool Integrations

| Tool | Best For |
|------|----------|
| **Customer.io** | Behavior-based automation |
| **Mailchimp** | SMB email marketing |
| **Resend** | Developer-friendly transactional |
| **SendGrid** | Transactional email at scale |
| **Kit** | Creator/newsletter focused |
