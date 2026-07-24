---
disable-model-invocation: true
name: voss-negotiation-orchestrator
description: |
  Use when the user asks for negotiation help, prep, scripts, deal strategy, salary/vendor/client/hostage-style conflict handling, or says “use Voss / Never Split the Difference”. Routes to the right voss-* skill, sequences them, and performs final QA. Do not use for pure legal advice, manipulation, or ordinary factual lookup.
source_book: |
  Never Split the Difference: Negotiating as if Your Life Depended on It — Chris Voss with Tahl Raz (2016)
source_chapter: |
  Whole book / Appendix: Prepare a Negotiation One Sheet
tags: [negotiation, orchestrator, voss, decision-routing]
related_skills:
  - slug: voss-active-listening
    relation: depends-on
  - slug: voss-calibrated-questions
    relation: composes-with
  - slug: voss-final-qa
    relation: composes-with
---

# Voss Negotiation Orchestrator

## R — 原文 (Reading)

> “Negotiation is not an act of battle; it’s a process of discovery. The goal is to uncover as much information as possible.”
>
> — Chris Voss, Whole book / Appendix: Prepare a Negotiation One Sheet

---

## I — 方法论骨架 (Interpretation)

This is the router and quality gate for the Voss toolkit. It treats negotiation as a staged information-discovery process, not a single persuasion trick. First assess the situation: parties, stakes, phase, relationship, emotions, constraints, known facts, unknowns, power/leverage, implementation risk, and safety/ethical limits. Then decide which atomic `voss-*` skills are worth calling, which are explicitly not worth calling, and why. Select only the smallest useful sequence: calm/listen, uncover emotion, make “No” safe, summarize for “that’s right,” shape reality, ask calibrated questions, verify implementation, bargain, or hunt Black Swans. After producing a plan/script/output, reassess it with `voss-final-qa`: check tactical fit, tone, evidence, ethics, implementation, hidden stakeholders, residual risks, and next action. The orchestrator is successful only when it both routes intelligently and verifies the proposed solution before handing it to the user.

---

## A1 — 书中的应用 (Past Application)

### 案例 1: Harvard role-play
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: Voss faced a mock kidnapper demanding $1M and did not argue price; he asked “How am I supposed to do that?” to change the frame from demand to feasibility.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。
### 案例 2: Negotiation One Sheet
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: The appendix condenses preparation into goals, summaries, labels, accusation audits, calibrated questions, and non-cash offers.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。

---

## A2 — 触发场景 (Future Trigger) ★

### 用户会在什么情境下需要这个 skill?

1. The user wants a complete negotiation plan rather than one tactic.
2. The user asks which Voss tactic to use in a messy situation.
3. The user needs prep, live-message drafting, and final review for an important conversation.

### 语言信号 (用户的话里出现这些就应激活)

- "help me negotiate this"
- "make a Voss plan"
- "Never Split the Difference this"
- "what should I say in this negotiation"

### 与相邻 skill 的区分

- Use atomic voss-* skills when the user already asks for a specific tactic; use this orchestrator when diagnosis/routing is needed.
- Do not replace legal, HR, or safety advice; escalate when stakes require professionals.

---

## E — 可执行步骤 (Execution)

当 skill 被激活后, agent 应按以下步骤执行:

1. **Assess the situation before choosing tactics**
   - 动作: Build a compact situation map: parties, relationship, stakes, desired outcome, current phase, emotions/resistance, known facts, unknowns, constraints/deadlines, leverage, decision-makers, implementation risk, and ethical/safety limits.
   - 完成标准: The response contains a clear diagnosis and names any missing information that would materially change the recommendation.

2. **Decide which `voss-*` skills are worth calling**
   - 动作: Select the smallest useful sequence of atomic skills. Use this routing logic:
     - Low trust / guarded counterpart → `voss-active-listening`
     - Visible anger, fear, suspicion, shame, or resistance → `voss-labeling`
     - The counterpart likely holds negative assumptions about the user → `voss-accusation-audit`
     - User is chasing fake yes or needs to make refusal safe → `voss-no-oriented-momentum`
     - Persuasion is premature; counterpart must feel understood → `voss-thats-right-summary`
     - Deadline/fairness/anchor/compromise framing dominates → `voss-bend-reality`
     - User must say no gently or shift problem-solving to the counterpart → `voss-calibrated-questions`
     - Agreement exists but follow-through is uncertain → `voss-execution-how`
     - Final-stage numeric price/terms bargaining → `voss-ackerman-bargaining`
     - Leverage seems absent, facts do not add up, or hidden stakeholders likely matter → `voss-black-swan-leverage`
   - 完成标准: State “Using:” and “Skipping:” with one-line reasons, so the user can see why each skill is or is not being invoked.

3. **Compose the proposed solution/output**
   - 动作: Draft the negotiation plan, message, call script, prep sheet, questions, labels, summary, offer sequence, or implementation checklist using the selected skills in order.
   - 完成标准: The output is specific enough to use: it includes exact wording where helpful, sequence, fallback, and what to listen/watch for next.

4. **Reassess and verify with final QA before returning**
   - 动作: Run a final pass equivalent to `voss-final-qa`: verify trigger fit, tactical sequencing, tone, grounded empathy, non-manipulation, safety/legal/HR escalation needs, stakeholder/implementation path, success criteria, stop criteria, and residual risks.
   - 完成标准: End with a short `Final QA` section containing Pass / Needs revision / Do not send, concrete fixes made or still needed, and the safest next action.

---

## B — 边界 (Boundary) ★

### 不要在以下情况使用此 skill

- Do not use to coerce, deceive, threaten, or exploit a vulnerable person.
- Do not use for routine information lookup or low-stakes everyday choices.
- For illegal threats, self-harm, violence, or formal legal disputes, prioritize safety/professional escalation.

### 作者在书中警告的失败模式

- 不要把谈判当成战斗、辩论或单纯的价格拉扯; 先发现真实约束。
- 不要追逐表面 “Yes”; 没有 “How” 的 yes 可能毫无执行力。

### 作者的盲点 / 时代局限

- 本书来自 FBI/危机谈判背景, 现实商务/亲密关系中权力、法律和长期关系约束更复杂。
- 书中战术很强, 但若脱离伦理边界, 容易滑向操控。

### 容易混淆的邻近方法论

- Use atomic voss-* skills when the user already asks for a specific tactic; use this orchestrator when diagnosis/routing is needed.
- Do not replace legal, HR, or safety advice; escalate when stakes require professionals.

---

## 相关 skills

- **depends-on**: `voss-active-listening`
- **composes-with**: `voss-calibrated-questions`
- **composes-with**: `voss-final-qa`

---

## 审计信息

- **验证通过**: V1 ✓ / V2 ✓ / V3 ✓
- **测试通过率**: 100% static QA (详见 test-prompts.json 和 test-results.md)
- **蒸馏时间**: 2026-07-21
