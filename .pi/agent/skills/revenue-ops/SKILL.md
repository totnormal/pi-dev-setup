---
disable-model-invocation: true
name: revenue-ops
description: "Revenue Ops Lead Lifecycle, Pipeline & Revenue Management. Complete RevOps reference: lead lifecycle, scoring, routing, pipeline management,. Keywords: revenue operations, revops, b2b revenue, revenue ops."
---

# Revenue Ops — Lead Lifecycle, Pipeline & Revenue Management

## Extended Details



Complete RevOps reference: lead lifecycle, scoring, routing, pipeline management,
CRM processes, forecasting, and revenue metrics.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists, read it first. Only ask for
information not already covered.

Gather context:
1. What CRM platform? (HubSpot, Salesforce, Pipedrive, etc.)
2. Current pipeline stages?
3. How do leads currently flow from marketing to sales?
4. What's the biggest bottleneck?

---

# Section 1: Core Principles

### Single Source of Truth
- CRM is the system of record — no spreadsheets for pipeline
- All deal activity logged in CRM
- Clean, standardized data entry enforced by automation

### Process Before Tools
1. Define the process on paper first
2. Test and iterate manually
3. Then automate with CRM workflows
4. Monitor and refine

### Marketing-to-Sales Alignment
- Both teams agree on lead definitions (MQL, SQL)
- SLA on lead response time (ideally under 5 minutes)
- Regular feedback loop on lead quality
- Shared revenue target

---

# Section 2: Lead Lifecycle Framework

### Stage Definitions

| Stage | Definition | Owner | Key Action |
|-------|----------|-------|------------|
| **Visitor** | Anonymous website visitor | Marketing | Identify via cookies, forms |
| **Lead** | Known contact (form fill, signup) | Marketing | Qualify fit, score |
| **MQL** | Meets ICP criteria, engaged | Marketing | Nurture or pass to SDR |
| **SQL** | SDR qualified, meeting booked | SDR | Discovery call |
| **Opportunity** | Active deal, MEDDPICC scored | AE | Solution sell |
| **Negotiation** | Terms discussed, proposal sent | AE | Close |
| **Closed Won** | Contract signed | CS/AM | Onboard |
| **Closed Lost** | Declined | RevOps | Analyze why |

### Lead Scoring

#### Scoring Dimensions
- **Fit** (firmographic): Company size, industry, location, tech stack (0-50 points)
- **Intent** (behavioral): Page views, content downloads, email engagement (0-30 points)
- **Engagement** (interaction): Meeting attended, demo watched, trial activated (0-20 points)

#### Scoring Tiers
| Score | Tier | Action |
|-------|------|--------|
| 80-100 | Hot | Immediate SDR outreach (within 1 hour) |
| 60-79 | Warm | SDR outreach within 24 hours |
| 40-59 | Lukewarm | Nurture campaign |
| 0-39 | Cold | Marketing nurture only |

### Lead Routing

#### Routing Methods
- **Round-robin**: Even distribution across SDRs/AEs
- **Territory-based**: By geo, industry, or company size
- **Account-based**: Assigned accounts go to dedicated AE
- **Skill-based**: Route complex deals to senior reps
- **Capacity-aware**: Route based on current load

#### Routing Best Practices
- Speed matters: auto-route, not manual assignment
- Always have a fallback (no lead left unassigned)
- Reassign after 48 hours of no activity
- Track routing fairness and response time by rep

---

# Section 3: Pipeline Stage Management

### Pipeline Stages (Standard B2B SaaS)
1. **Discovery** (10% weighted) — Initial call, understanding needs
2. **Qualification** (20%) — MEDDPICC assessment, champion identified
3. **Solution Design** (40%) — Demo delivered, technical validation
4. **Proposal** (60%) — Pricing sent, terms discussed
5. **Negotiation** (80%) — Legal/procurement process
6. **Closed Won** (100%) — Contract signed

### Pipeline Health Metrics
- **Coverage**: 3x quota in pipeline for current quarter
- **Velocity**: Average days per stage (identify bottlenecks)
- **Conversion rate**: % that moves stage-to-stage
- **Aging**: Deals stuck >30 days in same stage (flag for review)

### Deal Desk Processes
When you need a deal desk:
- Non-standard pricing or terms
- Multi-year or enterprise deals above threshold
- Custom SLA or integration requirements
- Partner/co-sell arrangements

---

# Section 4: CRM Management

### Essential Automations
- Lead assignment on form submission
- Status update on email reply
- Task creation for follow-ups
- Stage progression on meeting completion
- Alert on deal at risk (no activity 7+ days)

### Data Hygiene & Enrichment

#### Dedup Strategy
- Match on email domain + company name
- Merge duplicates with most recent data
- Prevent future dupes with required fields on forms

#### Enrichment
- Auto-enrich company data (employee count, industry, revenue)
- Enrich individual data (title, LinkedIn, phone)
- Refresh stale records quarterly

#### Required Fields
- Stage, close date, deal size on every opportunity
- Source on every lead
- Next step on every active deal

---

# Section 5: Forecasting & Analytics

### Forecasting Methods
- **Opportunity stage**: Sum of weighted pipeline value
- **Commit**: What reps commit to closing
- **Pipeline**: Total open pipeline × historical conversion rate
- **Historical**: Based on same period last year + growth rate

### Revenue Metrics

| Metric | Formula | Good Benchmark |
|--------|---------|---------------|
| **CAC** | Total sales + marketing spend / new customers | < 1/3 of LTV |
| **LTV** | (ARPU × gross margin %) / churn rate | 3× CAC minimum |
| **Payback Period** | CAC / monthly gross margin per customer | < 12 months |
| **ARR Growth** | (Current ARR - Previous ARR) / Previous ARR | 50-100%+ (early stage) |
| **Net Revenue Retention** | (Starting ARR + expansion - churn) / Starting ARR | > 100% |
| **Sales Cycle** | Sum of deal cycle lengths / number of deals | Decreasing quarterly |
| **Win Rate** | Won deals / total opportunities | 25-35% |

### Capacity Planning
- **Ramp time**: New rep takes 3-6 months to full productivity
- **Quota per rep**: 3-5x their OTE (on-target earnings)
- **Hiring lead time**: 2-3 months to hire + 3-6 months to ramp = 5-9 months before revenue contribution

---

# Section 6: Sales Process Design

### Steps to Design a Sales Process
1. Map the buyer's journey (awareness → consideration → decision)
2. Align internal stages to buyer journey steps
3. Define entry/exit criteria for each stage
4. Set required activities per stage (calls, demos, proposals)
5. Create stage-specific collateral (discovery questions, demo scripts, proposal templates)
6. Implement in CRM with automation

### Territory & Quota Management
- Balance territories by total addressable market (TAM), not just geography
- Set quotas based on historical performance + growth targets
- Review and adjust quarterly
- Account for ramp time for new reps

### Performance Analytics
- **Activity metrics**: Calls, emails, meetings per rep
- **Pipeline metrics**: Deals created, stage progression, velocity
- **Outcome metrics**: Win rate, deal size, cycle length
- **Revenue metrics**: Quota attainment, forecast accuracy, contribution

---

# Output Format

When delivering RevOps recommendations:

```markdown
## Current State
- CRM: [Platform]
- Lead flow: [Description]
- Bottleneck: [Specific issue]

## Recommendations (Priority-ordered)
1. **[High]** Specific change → Expected impact
2. **[Medium]** Specific change → Expected impact
3. **[Low]** Specific change → Expected impact

## Implementation Plan
- Week 1-2: [Quick wins]
- Week 3-4: [Process changes]
- Month 2: [Automation rollout]
- Month 3: [Monitoring and refinement]

## Success Metrics
- [Metric 1]: Current → Target
- [Metric 2]: Current → Target
```
