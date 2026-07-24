---
disable-model-invocation: true
name: voss-active-listening
description: |
  Use when a negotiation or tense conversation is moving too fast, the counterpart is guarded, or the user needs rapport before asking/persuading. Triggers: mirror, active listening, slow it down, what do I say first. Do not use when the user already has trust and needs price bargaining or execution validation.
source_book: |
  Never Split the Difference: Negotiating as if Your Life Depended on It — Chris Voss with Tahl Raz (2016)
source_chapter: |
  Chapter 2 — Be a Mirror
tags: [active-listening, mirroring, rapport, voice]
related_skills:
  - slug: voss-labeling
    relation: composes-with
  - slug: voss-calibrated-questions
    relation: depends-on
---

# Active Listening Rapport Stack

## R — 原文 (Reading)

> “To quiet the voices in your head, make your sole and all-encompassing focus the other person and what they have to say.”
>
> — Chris Voss, Chapter 2 — Be a Mirror

---

## I — 方法论骨架 (Interpretation)

Before persuasion, make the other side feel safe enough to reveal information. Voss’s stack combines pace, tone, silence, and mirroring: slow the exchange, use a positive/playful or calm late-night-FM voice, repeat the last or critical 1–3 words, then pause. The goal is not agreement; it is disclosure. Treat every response as data that updates hypotheses about wants, fears, and constraints.

---

## A1 — 书中的应用 (Past Application)

### 案例 1: Chase Manhattan bank robbery
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: Voss discovered initial police assumptions were wrong by slowing down and listening instead of forcing surrender.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。
### 案例 2: Mirroring practice
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: Repeating critical words prompts the other person to elaborate while feeling heard.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。

---

## A2 — 触发场景 (Future Trigger) ★

### 用户会在什么情境下需要这个 skill?

1. The user is about to open a difficult conversation.
2. The counterpart is emotional, guarded, or giving short answers.
3. The user is over-talking and needs a listening script.

### 语言信号 (用户的话里出现这些就应激活)

- "how do I build rapport"
- "they won’t open up"
- "mirror their words"
- "conversation is tense"

### 与相邻 skill 的区分

- Use voss-labeling when emotions are visible and need naming.
- Use voss-calibrated-questions when rapport exists and the user needs the counterpart to solve a problem.

---

## E — 可执行步骤 (Execution)

当 skill 被激活后, agent 应按以下步骤执行:

1. **Set pace and tone**
   - 动作: Set pace and tone: choose positive/playful by default; use calm downward inflection for seriousness.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

2. **Mirror**
   - 动作: Mirror: repeat the last or most important 1–3 words as a question.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

3. **Pause and collect**
   - 动作: Pause and collect: let silence work; record new facts, emotions, constraints, and hypotheses.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

---

## B — 边界 (Boundary) ★

### 不要在以下情况使用此 skill

- Do not mirror mechanically every line; it becomes creepy.
- Do not use direct/assertive voice unless intentionally setting a boundary.
- If immediate safety is at risk, do not slow-walk emergency action.

### 作者在书中警告的失败模式

- 不要把谈判当成战斗、辩论或单纯的价格拉扯; 先发现真实约束。
- 不要追逐表面 “Yes”; 没有 “How” 的 yes 可能毫无执行力。

### 作者的盲点 / 时代局限

- 本书来自 FBI/危机谈判背景, 现实商务/亲密关系中权力、法律和长期关系约束更复杂。
- 书中战术很强, 但若脱离伦理边界, 容易滑向操控。

### 容易混淆的邻近方法论

- Use voss-labeling when emotions are visible and need naming.
- Use voss-calibrated-questions when rapport exists and the user needs the counterpart to solve a problem.

---

## 相关 skills

- **composes-with**: `voss-labeling`
- **depends-on**: `voss-calibrated-questions`

---

## 审计信息

- **验证通过**: V1 ✓ / V2 ✓ / V3 ✓
- **测试通过率**: 100% static QA (详见 test-prompts.json 和 test-results.md)
- **蒸馏时间**: 2026-07-21
