---
disable-model-invocation: true
name: voss-final-qa
description: |
  Use as the final verification step after any voss-* negotiation plan, script, prep sheet, offer, or message. Checks trigger fit, tone, ethics, evidence, implementation, sibling-skill confusion, and safety. Do not use as a standalone negotiation tactic.
source_book: |
  Never Split the Difference: Negotiating as if Your Life Depended on It — Chris Voss with Tahl Raz (2016)
source_chapter: |
  Whole book quality gate
tags: [qa, verification, ethics, negotiation]
related_skills:
  - slug: voss-negotiation-orchestrator
    relation: depends-on
  - slug: voss-execution-how
    relation: composes-with
---

# Final QA for Voss Negotiation Outputs

## R — 原文 (Reading)

> “You don’t get your profits with the agreement. They come upon implementation.”
>
> — Chris Voss, Whole book quality gate

---

## I — 方法论骨架 (Interpretation)

This skill is the quality gate for the toolkit. It asks whether the chosen tactics match the phase, whether the wording sounds calm and respectful, whether it creates discovery rather than pressure, and whether a real implementation path exists. It also checks for overreach: Voss methods can become manipulative if empathy is faked or if “calibrated” questions hide coercion. Passing QA means the user has a next action that is specific, ethical, and testable.

---

## A1 — 书中的应用 (Past Application)

### 案例 1: Rule of Three
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: Voss validates agreement multiple ways rather than trusting one yes.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。
### 案例 2: Implementation failures
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: The prison-siege radio mistake shows why plan QA must include operational details.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。

---

## A2 — 触发场景 (Future Trigger) ★

### 用户会在什么情境下需要这个 skill?

1. A voss-* skill just drafted a message or plan.
2. The user asks “is this good?” for a negotiation script.
3. The user wants confidence before sending an offer or reply.

### 语言信号 (用户的话里出现这些就应激活)

- "final QA"
- "check this negotiation plan"
- "verify this Voss script"
- "is this message safe to send"

### 与相邻 skill 的区分

- Use voss-negotiation-orchestrator for routing and generation; use this after generation.
- Use voss-execution-how for implementation design, then this to audit the whole output.

---

## E — 可执行步骤 (Execution)

当 skill 被激活后, agent 应按以下步骤执行:

1. **Fit check**
   - 动作: Fit check: confirm the selected voss-* skills match phase, facts, and trigger boundaries.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

2. **Language check**
   - 动作: Language check: remove threats, fake empathy, legal admissions, neediness, and overlong cleverness.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

3. **Execution check**
   - 动作: Execution check: require next action, owner, timing, fallback, stakeholder map, and success/stop criteria.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

4. **Ethics/safety check**
   - 动作: Ethics/safety check: flag coercion, deception, high-risk escalation, or need for professional advice.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

---

## B — 边界 (Boundary) ★

### 不要在以下情况使用此 skill

- Do not generate new negotiation strategy unless QA reveals a gap; return to orchestrator if needed.
- Do not rubber-stamp manipulative or unsafe tactics.
- Do not claim certainty; state residual risks.

### 作者在书中警告的失败模式

- 不要把谈判当成战斗、辩论或单纯的价格拉扯; 先发现真实约束。
- 不要追逐表面 “Yes”; 没有 “How” 的 yes 可能毫无执行力。

### 作者的盲点 / 时代局限

- 本书来自 FBI/危机谈判背景, 现实商务/亲密关系中权力、法律和长期关系约束更复杂。
- 书中战术很强, 但若脱离伦理边界, 容易滑向操控。

### 容易混淆的邻近方法论

- Use voss-negotiation-orchestrator for routing and generation; use this after generation.
- Use voss-execution-how for implementation design, then this to audit the whole output.

---

## 相关 skills

- **depends-on**: `voss-negotiation-orchestrator`
- **composes-with**: `voss-execution-how`

---

## 审计信息

- **验证通过**: V1 ✓ / V2 ✓ / V3 ✓
- **测试通过率**: 100% static QA (详见 test-prompts.json 和 test-results.md)
- **蒸馏时间**: 2026-07-21
