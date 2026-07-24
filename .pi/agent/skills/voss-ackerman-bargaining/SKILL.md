---
disable-model-invocation: true
name: voss-ackerman-bargaining
description: |
  Use for final-stage numeric bargaining over price, salary, fees, discounts, purchases, or concessions when rapport and information gathering are already done. Triggers: Ackerman, bargain hard, counteroffer, negotiate price. Do not use at the start of a complex negotiation before interests and constraints are known.
source_book: |
  Never Split the Difference: Negotiating as if Your Life Depended on It — Chris Voss with Tahl Raz (2016)
source_chapter: |
  Chapter 9 — Bargain Hard
tags: [bargaining, price, anchoring, ackerman]
related_skills:
  - slug: voss-bend-reality
    relation: depends-on
  - slug: voss-execution-how
    relation: composes-with
---

# Ackerman Bargaining Plan

## R — 原文 (Reading)

> “The Ackerman model is an offer-counteroffer method, at least on the surface. But it is a very effective system for beating the usual lackluster bargaining dynamic.”
>
> — Chris Voss, Chapter 9 — Bargain Hard

---

## I — 方法论骨架 (Interpretation)

Ackerman is a disciplined concession plan: set a target, anchor low/high, make decreasing moves, use empathy and calibrated questions between numbers, and end with a precise non-round figure plus a non-monetary item. It prevents emotional haggling and signals that concessions are increasingly painful. The system works only after you know what you want and why the other side might accept.

---

## A1 — 书中的应用 (Past Application)

### 案例 1: Toyota 4Runner
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: Voss used a respectful low anchor, repeated inability, silence, and calibrated questions to buy a $36,000 truck for $30,000.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。
### 案例 2: FBI bargaining
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: The model translates hostage-negotiation discipline into everyday price negotiation.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。

---

## A2 — 触发场景 (Future Trigger) ★

### 用户会在什么情境下需要这个 skill?

1. The negotiation has reached price/terms.
2. The user needs a counteroffer sequence.
3. The user wants to avoid over-conceding under pressure.

### 语言信号 (用户的话里出现这些就应激活)

- "Ackerman plan"
- "what should my counteroffer be"
- "negotiate salary"
- "bargain hard"

### 与相邻 skill 的区分

- Use voss-bend-reality for framing before numbers.
- Use voss-black-swan-leverage if hidden information could change the target entirely.

---

## E — 可执行步骤 (Execution)

当 skill 被激活后, agent 应按以下步骤执行:

1. **Prepare target**
   - 动作: Prepare target: define goal price, walkaway, rationale, and non-price add-ons.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

2. **Plan concessions**
   - 动作: Plan concessions: 65%, 85%, 95%, 100% of target, with decreasing increments and empathy between moves.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

3. **Close precisely**
   - 动作: Close precisely: use a non-round final number and ask for/offer a small non-monetary term.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

---

## B — 边界 (Boundary) ★

### 不要在以下情况使用此 skill

- Do not use when relationship/trust is too weak for numbers.
- Do not anchor absurdly beyond credibility.
- Do not bargain over illegal, unsafe, or values-based non-negotiables.

### 作者在书中警告的失败模式

- 不要把谈判当成战斗、辩论或单纯的价格拉扯; 先发现真实约束。
- 不要追逐表面 “Yes”; 没有 “How” 的 yes 可能毫无执行力。

### 作者的盲点 / 时代局限

- 本书来自 FBI/危机谈判背景, 现实商务/亲密关系中权力、法律和长期关系约束更复杂。
- 书中战术很强, 但若脱离伦理边界, 容易滑向操控。

### 容易混淆的邻近方法论

- Use voss-bend-reality for framing before numbers.
- Use voss-black-swan-leverage if hidden information could change the target entirely.

---

## 相关 skills

- **depends-on**: `voss-bend-reality`
- **composes-with**: `voss-execution-how`

---

## 审计信息

- **验证通过**: V1 ✓ / V2 ✓ / V3 ✓
- **测试通过率**: 100% static QA (详见 test-prompts.json 和 test-results.md)
- **蒸馏时间**: 2026-07-21
