---
disable-model-invocation: true
name: voss-labeling
description: |
  Use when emotion, fear, anger, distrust, shame, or resistance is driving a negotiation. Triggers: label emotion, tactical empathy, calm them down, defuse tension, they are angry/scared. Do not use as therapy or when the user needs hard price bargaining after rapport is already established.
source_book: |
  Never Split the Difference: Negotiating as if Your Life Depended on It — Chris Voss with Tahl Raz (2016)
source_chapter: |
  Chapter 3 — Don’t Feel Their Pain, Label It
tags: [tactical-empathy, labeling, emotions, trust]
related_skills:
  - slug: voss-accusation-audit
    relation: composes-with
  - slug: voss-thats-right-summary
    relation: depends-on
---

# Tactical Empathy and Labeling

## R — 原文 (Reading)

> “Emotions aren’t the obstacles, they are the means.”
>
> — Chris Voss, Chapter 3 — Don’t Feel Their Pain, Label It

---

## I — 方法论骨架 (Interpretation)

Tactical empathy means recognizing the counterpart’s perspective without agreeing to it. Labeling turns observed emotions into neutral statements—“It seems like…”, “It sounds like…”, “It looks like…”. Naming the emotion reduces its grip and shows listening. After the label, pause; the counterpart will often correct, deepen, or disclose. The skill converts emotion from noise into negotiation information.

---

## A1 — 书中的应用 (Past Application)

### 案例 1: Harlem fugitives
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: Voss repeatedly labeled the fugitives’ fear of being shot; after hours they surrendered because they felt calmed and understood.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。
### 案例 2: Negative dynamics
- **问题**: 书中对应场景需要推进谈判而不能靠直接说服。
- **方法论的使用**: Voss uses labels to bring unspoken fears into the open instead of arguing them away.
- **结论**: 先影响互动结构与信息流, 再推进要价或承诺。
- **结果**: 案例展示该方法能降低阻抗或揭示关键信息。

---

## A2 — 触发场景 (Future Trigger) ★

### 用户会在什么情境下需要这个 skill?

1. The counterpart is angry, scared, insulted, suspicious, or silent.
2. The user wants to acknowledge a concern without conceding.
3. The conversation is stuck because feelings are unspoken.

### 语言信号 (用户的话里出现这些就应激活)

- "they’re upset"
- "label their emotion"
- "tactical empathy"
- "how do I calm them down"

### 与相邻 skill 的区分

- Use voss-accusation-audit when the negative emotion is specifically about accusations against the user.
- Use voss-thats-right-summary when labels have produced enough material to summarize their worldview.

---

## E — 可执行步骤 (Execution)

当 skill 被激活后, agent 应按以下步骤执行:

1. **Observe**
   - 动作: Observe: list explicit words plus tone/body-language signals; infer 1–3 emotions carefully.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

2. **Label**
   - 动作: Label: say “It seems/sounds/looks like…” without “I” and without judgment.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

3. **Pause and refine**
   - 动作: Pause and refine: wait, accept correction, and relabel until resistance drops or new information appears.
   - 完成标准: 能产出可检查的文本、问题、判断或下一步。

---

## B — 边界 (Boundary) ★

### 不要在以下情况使用此 skill

- Do not say “I understand”; it often sounds self-centered or false.
- Do not fake empathy to manipulate; keep labels grounded in observable cues.
- Do not diagnose clinical states; label negotiation-relevant feelings only.

### 作者在书中警告的失败模式

- 不要把谈判当成战斗、辩论或单纯的价格拉扯; 先发现真实约束。
- 不要追逐表面 “Yes”; 没有 “How” 的 yes 可能毫无执行力。

### 作者的盲点 / 时代局限

- 本书来自 FBI/危机谈判背景, 现实商务/亲密关系中权力、法律和长期关系约束更复杂。
- 书中战术很强, 但若脱离伦理边界, 容易滑向操控。

### 容易混淆的邻近方法论

- Use voss-accusation-audit when the negative emotion is specifically about accusations against the user.
- Use voss-thats-right-summary when labels have produced enough material to summarize their worldview.

---

## 相关 skills

- **composes-with**: `voss-accusation-audit`
- **depends-on**: `voss-thats-right-summary`

---

## 审计信息

- **验证通过**: V1 ✓ / V2 ✓ / V3 ✓
- **测试通过率**: 100% static QA (详见 test-prompts.json 和 test-results.md)
- **蒸馏时间**: 2026-07-21
