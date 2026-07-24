---
disable-model-invocation: true
name: churn-retention
description: "Churn Retention Reduce Churn, Maximize LTV. Complete retention reference: cancel flows, dunning, win-back campaigns,. Keywords: retention, customer churn, cancellation, saas metrics, customer retention, loyalty."
---

# Churn Retention — Reduce Churn, Maximize LTV

## Extended Details



Complete retention reference: cancel flows, dunning, win-back campaigns,
churn prediction, and customer ascension.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists, read it first.

Gather context:
1. **Churn rate** — What's your current monthly churn?
2. **Churn type** — Voluntary (choices) or involuntary (failed payments)?
3. **Customer lifecycle** — Average customer lifespan?
4. **ARPU** — Average revenue per user?
5. **Current cancel flow** — Do you have one? Is it instant cancel?

---

# Section 1: The LTV Equation

```
LTV = (ARPU × Gross Margin %) / Churn Rate
```

**Why retention matters most:**
- A 5% increase in retention → 25-95% increase in profit
- Acquiring a new customer costs 5-25× more than retaining one
- Retained customers buy more over time (ascension)

## The 3-Year Relationship Vision
Ask: "What would a 3-year relationship with a customer look like?"
Map the journey from activation → engagement → expansion → advocacy.

---

# Section 2: Execution Workflow

### Step 1: Current Journey Mapping
- Map the customer journey from purchase to potential churn
- Identify the "aha moment" — when do they see value?
- Find the friction points where customers disengage

### Step 2: Churn Diagnosis
- **Involuntary churn** (failed payments): 30-50% of all churn but most recoverable
- **Voluntary churn** (dissatisfaction): Requires product/experience fixes
- **Competitor churn** (switching): Requires differentiation and lock-in
- **Financial churn** (budget cuts): Requires ROI proof and plan flexibility

### Step 3: Fix Involuntary Churn First (Highest ROI)
Failed payment recovery (dunning) is the fastest win:
1. Retry logic: retry 3-4 times over 14 days with smart timing
2. Email notifications: "Your payment failed — update card" (send immediately)
3. In-app banners: Show failed payment notice on next login
4. Card updater: Use network tokenization (Stripe/Paddle auto-retry)
5. Win-back after final failure: "We miss you — want to restart?"

**Expected impact**: 30-50% recovery of failed payments = 5-10% churn reduction

---

# Section 3: Cancel Flow Design

### The Cancel Flow Structure
1. **Acknowledge**: "We're sorry to see you go" — not passive-aggressive
2. **Survey**: "What's the main reason?" (required but quick — radio buttons)
3. **Save Offer** (1-2 max):
   - Price-sensitive: 20% off for 3 months
   - Feature-gap: Free trial of higher tier
   - Usage-based: Pause instead of cancel
4. **Alternative**: "Pause your subscription" — keep the relationship
5. **Confirm**: Make cancellation easy if they insist (hidden cancel = brand damage)

### Save Offer Strategy

| Churn Signal | Save Offer | Expected Save Rate |
|-------------|-----------|-------------------|
| Too expensive | 20-30% discount for 3 months | 15-25% |
| Didn't use it | Extended trial + onboarding help | 10-20% |
| Switching to competitor | Feature comparison + migration help | 5-15% |
| No one using it | Team management tools | 10-20% |
| Temporary break | Pause subscription | 20-40% |

### Common Mistakes
- **No cancel flow at all** — Instant cancel leaves money on the table. Even a simple survey + one offer saves 10-15%
- **Too many save offers** — Confuses the user and increases churn
- **Hidden cancel button** — Damages trust and brand reputation
- **No follow-up after cancel** — Send a win-back email at 30, 60, 90 days

---

# Section 4: Churn Prediction & Proactive Retention

### Early Warning Signals
- Declining login frequency (30% drop → trigger outreach)
- Feature usage dropping (stopped using core features)
- Support ticket spike (frustration signal)
- Payment method expiration (upcoming failure)
- Contract renewal approaching (30/60/90 day check-ins)

### Proactive Retention Actions
- **At-risk customers**: Proactive check-in email + customer success call
- **Low usage**: In-app prompts showing value + tips to get more value
- **NPS detractors**: Immediate follow-up call from account manager
- **Anniversary**: "You've been with us a year! Here's what you've accomplished"

---

# Section 5: Ascension Ladder

Maximize LTV through customer progression:

| Level | Offer | Transition Trigger |
|-------|-------|-------------------|
| Free/Trial | Basic features | Usage milestone reached |
| Starter | Essential features | First value moment achieved |
| Pro | Advanced features | Team growth or advanced needs |
| Enterprise | Custom + SLA + dedicated support | Company scale or compliance needs |

## Lifecycle Campaign Stages
- **Activation** (Day 0-7): Onboarding wins and habit triggers
- **Engagement** (Day 7-30): Usage depth and feature adoption
- **Expansion** (Day 30-90): Upsell to next tier based on usage
- **Advocacy** (Day 90+): Referral program, reviews, case studies

---

# Section 6: Metrics & Measurement

### Key Churn Metrics
| Metric | Formula | Target |
|--------|---------|--------|
| **Gross Churn** | Lost MRR / Starting MRR | < 5% monthly |
| **Net Churn** | (Lost + Expansion) / Starting MRR | Negative (Net negative churn = growth) |
| **Logo Churn** | Lost customers / Starting customers | < 3% monthly |
| **Revenue Churn** | Lost revenue / Starting revenue | < 5% monthly |

### Output Format
```markdown
## Current State Analysis
- Average Customer Lifespan: X months
- Monthly Churn Rate: X%
- Main churn reason: [reason from survey]

## Recommendations (Priority-ordered)
1. **[CRITICAL]** Fix dunning → Expected: X% churn reduction
2. **[HIGH]** Implement cancel flow → Expected: X% churn reduction
3. **[MEDIUM]** Proactive outreach → Expected: X% churn reduction

## Projected Impact
| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Monthly churn | X% | Y% | -Z% |
| Avg. lifespan | X months | Y months | +Z months |
| LTV | $X | $Y | +Z% |
```
