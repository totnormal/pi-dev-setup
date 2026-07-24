---
disable-model-invocation: true
name: conversion-optimization
description: "Conversion Optimization CRO Surfaces & Methods. Complete CRO reference for all conversion surfaces: pages, forms, signups,. Keywords: cro, conversion optimization, optimization, ux."
---

# Conversion Optimization — CRO Surfaces & Methods

## Extended Details

Complete CRO reference for all conversion surfaces: pages, forms, signups,
onboarding, popups, and paywalls.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists, read it first. Only ask for
information not already covered.

Gather context (ask if not provided):
1. **Surface** — Which conversion point? (page, form, signup, onboarding, popup, paywall)
2. **Current metrics** — Conversion rate, drop-off points, traffic volume
3. **Goal** — What's the target conversion rate?
4. **Constraints** — Technical limitations, brand guidelines, legal requirements
5. **Current state** — Screenshot or URL of what's live now

---

# Section 1: Page-Level CRO (/cro page)

Applies to homepage, landing pages, pricing pages, feature pages, blog CTAs.

## CRO Analysis Framework

### Message Match (Most Common Failure)
- Does the page headline match the ad/email/link that brought them here?
- Is the unique value proposition visible without scrolling?
- Does the page speak to the visitor's intent (awareness vs. consideration vs. decision)?

### Above the Fold (Mobile + Desktop)
- Clear headline stating the primary benefit
- Supporting subheadline that explains how
- Visual proof (product screenshot, demo video, social proof)
- Primary CTA visible and compelling
- Trust signals (logos, ratings, security badges)

### Page-Specific Frameworks

| Page Type | Primary Goal | Key Elements |
|-----------|-------------|-------------|
| **Homepage** | Understand who you're for | Hero, social proof, key features, CTA |
| **Landing Page** | Single conversion objective | Matching headline, proof, 1 CTA |
| **Pricing Page** | Plan selection, trial start | Clear tiers, comparison, FAQ, testimonials |
| **Feature Page** | Feature understanding, demo | Screenshots, use cases, benefits |
| **Blog Post** | Continue reading, subscribe | Related posts, inline CTAs, email capture |

## Experiment Ideas
- Headline testing: benefit-driven vs. curiosity-driven
- CTA placement: above fold vs. after social proof
- Social proof placement: hero vs. before CTA
- Video vs. static hero image
- Pricing page: monthly vs. annual default, anchor pricing

## Output Format
```
# CRO Report: [Page URL]

## Current State
- Conversion rate: [X]%
- Top drop-off: [section]
- Monthly traffic: [X] visitors

## Issues Found (Priority-ordered)
1. **[CRITICAL]** Issue → Impact → Fix
2. **[HIGH]** Issue → Impact → Fix
3. **[MEDIUM]** Issue → Impact → Fix

## Experiment Recommendations
- Test A: [variation] vs [control] → Expected lift: [X]%
```

---

# Section 2: Form Optimization (/cro form)

Applies to lead capture forms, contact forms, demo request forms, application forms,
survey forms, and checkout forms (NOT signup/registration — see Section 3).

## Core Principles

### Every Extra Field Costs Conversions
- Adding 1 field → ~10-15% conversion drop
- Removing 1 field → ~10-20% conversion lift
- Only ask for what you NEED right now

### Field-by-Field Optimization
- **Required vs. Optional**: Only required fields should be truly required
- **Smart defaults**: Pre-fill where possible
- **Inline validation**: Show errors as users type, not on submit
- **Field labels**: Always visible (don't rely on placeholder text alone)
- **Input types**: Match keyboard type (email → email keyboard, phone → numeric)

### Multi-Step Forms
- **Progress indicator**: "Step 2 of 4" — gives users a finish line
- **Micro-commitments**: Easy first step (email only), harder later
- **Save progress**: Allow return without losing data
- **Summarize before submit**: Let users review before committing

### Friction vs. Quality Trade-off
| Form Type | Ideal Fields | Conversion Focus |
|-----------|-------------|-----------------|
| Lead magnet download | 1-2 (email + name) | Maximum leads |
| Demo request | 4-6 | Qualified leads |
| Contact form | 3-4 | General inquiries |
| Survey | 5-7 max | Completion rate |
| Checkout | As few as possible | Cart completion |

---

# Section 3: Signup Flow Optimization (/cro signup)

Applies to registration, account creation, and trial activation.

## Core Principles

### Progressive Profiling
- Collect minimal info upfront (email + password, or SSO)
- Gather additional data after activation ("Set up your profile")
- Each additional pre-signup field costs conversions

### Single-Step vs. Multi-Step Signup
- **Single-step**: Best when you only need email + password
- **Multi-step**: Better when onboarding questions feel natural ("What brings you here?")
- **Rule**: If multi-step, first step must be dead simple (1 field)

### Trust & Friction Reduction
- Show what they get after signup
- "No credit card required" if true (prominent)
- Social proof: "[X,000] companies use [Product]"
- Show password requirements upfront
- Offer SSO (Google, Microsoft, GitHub) — reduces friction 40%+

### Signup Field Optimization
| Field | Impact | Recommendation |
|-------|--------|---------------|
| Email | Essential | Single field, validate inline |
| Password | Essential | Show requirements, strength meter |
| Company name | Optional or post-signup | Reduces conversion 10-15% |
| Phone number | High friction | Only if legally required or core to product |
| Password confirmation | Moderate friction | Use show/hide toggle instead |
| Name | Low friction | Fine to include |

---

# Section 4: Onboarding Optimization (/cro onboarding)

Applies to post-signup, first-run experience, and user activation.

## Defining Activation
The "aha moment" — the specific action that correlates with retention.
- **Examples**: First message sent (Slack), first design created (Canva), first payment processed (Stripe)

## Onboarding Flow Design
1. **Welcome** (immediate): Confirm they're in the right place
2. **First win** (within 60 seconds): Help them achieve the activation action
3. **Guided progression**: Checklist showing what to do next
4. **Contextual help**: Tooltips, not tours (users skip tours)

## Multi-Channel Onboarding
- **In-app**: Primary onboarding experience
- **Email**: Supports in-app (sends tips, not duplicates)
- **Push/SMS**: Time-sensitive nudges (use sparingly)
- **Video**: For complex setups (keep under 2 minutes)

## Common Onboarding Mistakes
- Forced tours (users skip them)
- Too many screens (keep to 3 max)
- Asking users to "explore on their own" without guidance
- Not tracking activation rate (the single most important onboarding metric)

---

# Section 5: Popup & Modal Optimization (/cro popup)

## Trigger Strategies
| Trigger | Best For | Conversion Rate |
|---------|----------|----------------|
| **Exit intent** | Capture leaving visitors | 5-15% |
| **Scroll 50%** | Engaged readers | 3-8% |
| **Timed (30s+)** | All traffic | 2-6% |
| **Scroll to end** | Article completion | 4-10% |
| **Click trigger** | High-intent moments | 8-20% |

## Popup Types
- **Modal**: Center overlay, blocks content — highest visibility, most annoying
- **Slide-in**: Corner notification, non-blocking — good balance
- **Sticky bar**: Top/bottom bar — least intrusive, lowest conversion
- **Fullscreen**: Mobile takeover — only for critical messages

## Design Best Practices
- **Headline**: Clear value proposition (not "Subscribe to our newsletter")
- **Single field**: Email only for popups (friction kills popup conversion)
- **CTA**: Action-oriented text ("Send me the guide" not "Submit")
- **Close button**: Always visible and easy (hidden close = brand damage)
- **Frequency capping**: Don't show more than once per session

---

# Section 6: Paywall & Upgrade Optimization (/cro paywall)

Applies to in-app paywalls, upgrade screens, upsell modals, and feature gates.

## Paywall Trigger Points
- **Limit reached**: "You've used 3 of 5 free projects"
- **Premium feature click**: User clicks a feature not in their plan
- **Trial expiration**: Clean, value-first expiration screen
- **Usage milestone**: "You've created 50 designs — unlock unlimited"

## Paywall Screen Components
1. **Value reminder**: What they've achieved so far
2. **What they're missing**: Specific features of the next tier
3. **Social proof**: "Join 10,000 PRO users"
4. **Pricing clarity**: Clear tiers, highlight recommended
5. **Risk reduction**: Free trial, money-back guarantee
6. **Single CTA**: "Upgrade to PRO" — not "Compare plans" AND "Upgrade"

## Specific Paywall Types
- **Soft paywall**: Try premium features, paywall appears at save/export
- **Hard paywall**: Immediate gate (use for high-value features only)
- **Metered**: X free uses before paywall (like news sites)
- **Freemium**: Core features free, power features paid

---

# Experiment Framework

For any surface, use this prioritization:
1. **ICE Score**: Impact (1-10) × Confidence (1-10) / Ease (1-10)
2. **PIE Framework**: Potential × Importance / Ease
3. Run A/B tests with statistical significance (see ab-test-setup)
4. Minimum 100 conversions per variant for reliable results
