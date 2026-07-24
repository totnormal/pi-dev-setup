---
disable-model-invocation: true
name: voss-accusation-audit
description: |
  Use before asking for something difficult, after a mistake, or when the other side likely holds negative assumptions about the user. Triggers: accusation audit, apologize, address objections, they think I’m pushy/unfair. Do not use for generic rapport when no predictable accusation exists.
source_book: |
  Never Split the Difference: Negotiating as if Your Life Depended on It — Chris Voss with Tahl Raz (2016)
source_chapter: |
  Chapter 3 — Don’t Feel Their Pain, Label It
tags: [accusation-audit, trust, objections, preparation]
related_skills:
  - slug: voss-labeling
    relation: depends-on
  - slug: voss-no-oriented-momentum
    relation: contrasts-with
---

# Accusation Audit

## R — 原文 (Reading)

> “The fastest and most efficient means of establishing a quick working relationship is to acknowledge the negative and diffuse it.”
>
> — Chris Voss, Chapter 3 — Don’t Feel Their Pain, Label It

---

## I — 方法论骨架 (Interpretation)

An accusation audit disarms objections by naming the worst fair criticisms before the counterpart weaponizes them. The move is not groveling; it is preemptive clarity. List what they may think—selfish, late, expensive, risky, wasting time—then state the strongest version briefly. This lowers defensiveness because the counterpart no longer has to fight to be heard.

---

## A1 — 书中的应用 (Past Application)

### 案例 1: Late request setup
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: Voss recommends opening hard asks by saying the other side may think you are wasting their time or being unreasonable.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。
### 案例 2: Labeling chapter
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: The audit extends labeling from their emotions to their likely accusations about you.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。

---

## A2 — 触发场景 (Future Trigger) ★

### 用户会在什么情境下需要这个 skill?

1. The user must reopen trust after delay, error, or conflict.
2. The user expects the other side to object before listening.
3. The user needs a first message for a hard ask.

### 语言信号 (用户的话里出现这些就应激活)

- "they’ll think I’m"
- "how do I apologize without weakening"
- "preempt objections"
- "accusation audit"

### 与相邻 skill 的区分

- Use voss-labeling for their current emotions; use this for their likely accusations about you.
- Use voss-no-oriented-momentum if the goal is to make refusal safe rather than name negatives.

---

## E — 可执行步骤 (Execution)

当 skill 被激活后, agent 应按以下步骤执行:

1. **Brainstorm**
   - 动作: Brainstorm: write the 3–7 harshest reasonable accusations they may hold.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

2. **Edit**
   - 动作: Edit: remove melodrama; keep only accusations that could plausibly be true from their perspective.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

3. **Deliver**
   - 动作: Deliver: state them before the ask, then pause and let them correct or soften.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

---

## B — 边界 (Boundary) ★

### 不要在以下情况使用此 skill

- Do not confess to false facts or create legal liability casually.
- Do not use exaggerated self-attack as manipulation.
- Avoid when the other side has no reason to mistrust you; it can introduce negatives unnecessarily.

### 作者在书中警告的失败模式

- 不要把谈判当成战斗、辩论或单纯的价格拉扯; 先发现真实约束。
- 不要追逐表面 “Yes”; 没有 “How” 的 yes 可能毫无执行力。

### 作者的盲点 / 时代局限

- 本书来自 FBI/危机谈判背景, 现实商务/亲密关系中权力、法律和长期关系约束更复杂。
- 书中战术很强, 但若脱离伦理边界, 容易滑向操控。

### 容易混淆的邻近方法论

- Use voss-labeling for their current emotions; use this for their likely accusations about you.
- Use voss-no-oriented-momentum if the goal is to make refusal safe rather than name negatives.

---

## 相关 skills

- **depends-on**: `voss-labeling`
- **contrasts-with**: `voss-no-oriented-momentum`

---

## 审计信息

- **验证通过**: V1 ✓ / V2 ✓ / V3 ✓
- **测试通过率**: 100% static QA (详见 test-prompts.json 和 test-results.md)
- **蒸馏时间**: 2026-07-21
