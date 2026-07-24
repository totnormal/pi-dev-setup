---
disable-model-invocation: true
name: voss-calibrated-questions
description: |
  Use when the user needs to say no gently, shift problem-solving to the counterpart, handle demands, or turn conflict into collaboration. Triggers: how am I supposed to do that, what/how question, calibrated question, illusion of control. Do not use when direct safety boundaries are required.
source_book: |
  Never Split the Difference: Negotiating as if Your Life Depended on It — Chris Voss with Tahl Raz (2016)
source_chapter: |
  Chapter 7 — Create the Illusion of Control
tags: [calibrated-questions, how, what, control]
related_skills:
  - slug: voss-active-listening
    relation: depends-on
  - slug: voss-execution-how
    relation: composes-with
---

# Calibrated Questions and Illusion of Control

## R — 原文 (Reading)

> “The calibrated, or open-ended, question... remove[s] aggression from conversations by acknowledging the other side openly, without resistance.”
>
> — Chris Voss, Chapter 7 — Create the Illusion of Control

---

## I — 方法论骨架 (Interpretation)

Calibrated questions are open-ended “How” and “What” questions with no fixed answer. They let the counterpart feel in control while making them confront implementation, constraints, and your problems. They replace hostile statements (“You can’t”) with collaborative questions (“How can we…?”). Good calibrated questions are short, curious, and hard to answer without thinking.

---

## A1 — 书中的应用 (Past Application)

### 案例 1: Harvard kidnap role-play
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: “How am I supposed to do that?” forced the professor-kidnapper to solve the logistics of his own demand.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。
### 案例 2: Dos Palmas failure
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: The FBI learned negotiation is coaxing, not overpowering; questions reduce confrontation.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。

---

## A2 — 触发场景 (Future Trigger) ★

### 用户会在什么情境下需要这个 skill?

1. The counterpart makes an impossible demand.
2. The user needs to decline without saying a blunt no.
3. The user wants the other side to reveal constraints or propose a path.

### 语言信号 (用户的话里出现这些就应激活)

- "how am I supposed to"
- "calibrated question"
- "gentle no"
- "what should I ask"

### 与相邻 skill 的区分

- Use voss-execution-how when the issue is whether an agreement will be implemented.
- Use voss-active-listening before questions if trust is too low.

---

## E — 可执行步骤 (Execution)

当 skill 被激活后, agent 应按以下步骤执行:

1. **Convert statements to questions**
   - 动作: Convert statements to questions: rewrite accusations or refusals as “How/What” questions.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

2. **Remove blame**
   - 动作: Remove blame: avoid “Why” unless defensiveness is intended; keep tone curious.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

3. **Follow the answer**
   - 动作: Follow the answer: mirror/label new information and ask the next calibrated question.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

---

## B — 边界 (Boundary) ★

### 不要在以下情况使用此 skill

- Do not use questions to evade a necessary clear boundary.
- Too many questions can feel interrogative; alternate with labels and summaries.
- Avoid “Why did you…” because it often sounds accusatory.

### 作者在书中警告的失败模式

- 不要把谈判当成战斗、辩论或单纯的价格拉扯; 先发现真实约束。
- 不要追逐表面 “Yes”; 没有 “How” 的 yes 可能毫无执行力。

### 作者的盲点 / 时代局限

- 本书来自 FBI/危机谈判背景, 现实商务/亲密关系中权力、法律和长期关系约束更复杂。
- 书中战术很强, 但若脱离伦理边界, 容易滑向操控。

### 容易混淆的邻近方法论

- Use voss-execution-how when the issue is whether an agreement will be implemented.
- Use voss-active-listening before questions if trust is too low.

---

## 相关 skills

- **depends-on**: `voss-active-listening`
- **composes-with**: `voss-execution-how`

---

## 审计信息

- **验证通过**: V1 ✓ / V2 ✓ / V3 ✓
- **测试通过率**: 100% static QA (详见 test-prompts.json 和 test-results.md)
- **蒸馏时间**: 2026-07-21
