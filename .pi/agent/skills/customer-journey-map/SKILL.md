---
disable-model-invocation: true
name: customer-journey-map
description: "Customer Journey Mapping Expert. Эксперт по картированию и оптимизации клиентского пути. Keywords: customer success, customer journey, crm, customer journey map."
---

# Customer Journey Mapping Expert

## Extended Details



Эксперт по картированию и оптимизации клиентского пути.

## Core Competencies

### Journey Mapping
- Определение стадий пути
- Mapping touchpoints
- Emotion mapping
- Pain point identification

### Research
- Customer interviews
- Survey design
- Analytics interpretation
- Behavioral data analysis

### Optimization
- Gap analysis
- Opportunity identification
- Journey redesign
- A/B testing journeys

## Journey Stages

```yaml
1. Awareness:
   - Клиент узнаёт о проблеме
   - Начинает искать решения
   - Touchpoints: реклама, контент, рекомендации

2. Consideration:
   - Сравнивает варианты
   - Исследует решения
   - Touchpoints: сайт, демо, reviews

3. Purchase:
   - Принимает решение
   - Совершает покупку
   - Touchpoints: checkout, sales, договор

4. Onboarding:
   - Первый опыт с продуктом
   - Настройка и обучение
   - Touchpoints: welcome, training, support

5. Usage:
   - Регулярное использование
   - Получение ценности
   - Touchpoints: продукт, help center, email

6. Support:
   - Решение проблем
   - Помощь с задачами
   - Touchpoints: chat, email, phone

7. Renewal/Advocacy:
   - Продление подписки
   - Рекомендации другим
   - Touchpoints: renewals, referral, reviews
```

## Journey Map Template

```markdown
# Customer Journey Map: [Persona Name]

## Goal: [Что клиент хочет достичь]

| Stage | Actions | Touchpoints | Emotions | Pain Points | Opportunities |
|-------|---------|-------------|----------|-------------|---------------|
| Awareness | Поиск в Google | SEO, Ads | Frustration | Много вариантов | Лучший контент |
| Consideration | Сравнение | Сайт, Демо | Interest | Сложно сравнить | Comparison tool |
| Purchase | Оплата | Checkout | Anxiety | Долгий процесс | One-click |
| Onboarding | Setup | Email, App | Confusion | Много шагов | Quick wins |
| Usage | Ежедневно | Product | Satisfaction | Bugs | Feature guides |
```

## Research Methods

### Customer Interview Guide

```markdown
## Intro (5 min)
- Расскажите о себе и вашей роли
- Как давно используете [продукт]?

## Discovery Phase (10 min)
- Как вы узнали о нас?
- Какую проблему пытались решить?
- Какие альтернативы рассматривали?

## Decision Phase (10 min)
- Что повлияло на решение?
- Кто ещё участвовал в принятии решения?
- Какие были сомнения?

## Experience Phase (15 min)
- Опишите первый опыт с продуктом
- Что было сложным?
- Что приятно удивило?

## Current Usage (10 min)
- Как часто используете?
- Какие функции используете чаще всего?
- Чего не хватает?

## Closing (5 min)
- Порекомендовали бы нас? Почему?
- Что бы улучшили в первую очередь?
```

### Analytics Queries

```sql
-- Conversion funnel by stage
SELECT
    stage,
    COUNT(DISTINCT user_id) as users,
    COUNT(DISTINCT user_id) * 100.0 /
        FIRST_VALUE(COUNT(DISTINCT user_id)) OVER (ORDER BY stage_order) as conversion_rate
FROM user_journey_events
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY stage, stage_order
ORDER BY stage_order;

-- Time between stages
SELECT
    stage_from,
    stage_to,
    AVG(EXTRACT(EPOCH FROM (to_timestamp - from_timestamp)) / 3600) as avg_hours
FROM (
    SELECT
        user_id,
        stage as stage_from,
        LEAD(stage) OVER (PARTITION BY user_id ORDER BY created_at) as stage_to,
        created_at as from_timestamp,
        LEAD(created_at) OVER (PARTITION BY user_id ORDER BY created_at) as to_timestamp
    FROM user_journey_events
) sub
WHERE stage_to IS NOT NULL
GROUP BY stage_from, stage_to;
```

## Pain Point Categories

```yaml
Process Friction:
  - Слишком много шагов
  - Долгое время ожидания
  - Повторяющиеся действия
  - Неясные инструкции

Interaction Friction:
  - Сложность связи с поддержкой
  - Несогласованность каналов
  - Отсутствие персонализации
  - Долгий ответ

Product Friction:
  - Баги и ошибки
  - Отсутствие функций
  - Сложный интерфейс
  - Проблемы производительности

Emotional Friction:
  - Недоверие
  - Frustration
  - Confusion
  - Разочарование
```

## Impact-Effort Matrix

```
High Impact
    │
    │  ★ Quick Wins     ★ Major Projects
    │  (Do First)       (Plan Carefully)
    │
    ├──────────────────────────────────────
    │
    │  ✗ Fill-ins       ✗ Thankless Tasks
    │  (Do if time)     (Avoid)
    │
Low Impact
        Low Effort ──────────── High Effort
```

## Touchpoint Inventory

```markdown
## Digital Touchpoints
| Channel | Stage | Owner | Metrics |
|---------|-------|-------|---------|
| Website | Awareness | Marketing | Traffic, Bounce |
| Blog | Consideration | Content | Time on page |
| Demo | Consideration | Sales | Completion |
| App | Usage | Product | DAU, Retention |
| Email | All | Marketing | Open, Click |
| Chat | Support | Support | CSAT, FRT |

## Human Touchpoints
| Channel | Stage | Owner | Metrics |
|---------|-------|-------|---------|
| Sales call | Purchase | Sales | Win rate |
| Onboarding | Onboarding | CS | TTV |
| QBR | Retention | CS | NPS |
| Support call | Support | Support | Resolution |
```

## Emotion Mapping

```javascript
const emotionScale = {
  -3: { label: 'Frustrated', color: '#FF4444', icon: '😤' },
  -2: { label: 'Annoyed', color: '#FF8844', icon: '😕' },
  -1: { label: 'Neutral-', color: '#FFBB44', icon: '😐' },
   0: { label: 'Neutral', color: '#CCCCCC', icon: '😶' },
   1: { label: 'Satisfied', color: '#88CC44', icon: '🙂' },
   2: { label: 'Happy', color: '#44BB44', icon: '😊' },
   3: { label: 'Delighted', color: '#22AA22', icon: '🤩' }
};

// Example journey emotion data
const journeyEmotions = [
  { stage: 'Awareness', score: 1, note: 'Found helpful article' },
  { stage: 'Consideration', score: -1, note: 'Pricing unclear' },
  { stage: 'Purchase', score: 2, note: 'Easy checkout' },
  { stage: 'Onboarding', score: -2, note: 'Too many steps' },
  { stage: 'Usage', score: 2, note: 'Getting value' }
];
```

## Service Blueprint Integration

```markdown
## Service Blueprint: [Service Name]

### Customer Actions
[Видимые действия клиента]

### Frontstage (Visible)
| Step | Employee Action | Channel |
|------|-----------------|---------|
| 1 | Приветствие | Chat |
| 2 | Выяснение проблемы | Chat |
| 3 | Решение | Chat + Screen share |

### Backstage (Invisible)
| Step | Action | System |
|------|--------|--------|
| 1 | Lookup customer | CRM |
| 2 | Check history | Ticketing |
| 3 | Escalate if needed | Slack |

### Support Processes
| System | Function |
|--------|----------|
| CRM | Customer data |
| Knowledge Base | Solutions |
| Analytics | Patterns |
```

## Journey Optimization

### A/B Testing Framework

```yaml
Test: Onboarding Flow
Hypothesis: Simplified onboarding increases activation

Control:
  - 7 steps
  - All features shown
  - No personalization

Variant:
  - 3 steps
  - Progressive disclosure
  - Role-based personalization

Metrics:
  - Primary: Activation rate (Day 7)
  - Secondary: Time to value
  - Guardrail: Support tickets

Sample size: 2000 users per variant
Duration: 4 weeks
```

### ROI Calculation

```python
def calculate_journey_improvement_roi(
    current_conversion: float,
    improved_conversion: float,
    customer_value: float,
    monthly_visitors: int,
    implementation_cost: float
) -> dict:
    current_customers = monthly_visitors * current_conversion
    improved_customers = monthly_visitors * improved_conversion
    additional_customers = improved_customers - current_customers
    monthly_revenue_lift = additional_customers * customer_value
    annual_revenue_lift = monthly_revenue_lift * 12
    roi = (annual_revenue_lift - implementation_cost) / implementation_cost * 100

    return {
        "additional_customers_monthly": additional_customers,
        "monthly_revenue_lift": monthly_revenue_lift,
        "annual_revenue_lift": annual_revenue_lift,
        "roi_percent": roi,
        "payback_months": implementation_cost / monthly_revenue_lift
    }
```

## Journey Map Validation

```markdown
- [ ] Основана на реальных данных (интервью + аналитика)
- [ ] Включает эмоциональный путь
- [ ] Все touchpoints задокументированы
- [ ] Pain points приоритизированы
- [ ] Opportunities связаны с метриками
- [ ] Backstage процессы описаны
- [ ] Есть план действий
- [ ] Определены owners для каждого улучшения
```

## Лучшие практики

1. **Data-driven** — избегайте assumptions, валидируйте данными
2. **Customer voice** — используйте цитаты из интервью
3. **Cross-functional** — вовлекайте все команды
4. **Living document** — регулярно обновляйте карту
5. **Action-oriented** — каждая карта → план улучшений
6. **Measure impact** — отслеживайте ROI изменений
