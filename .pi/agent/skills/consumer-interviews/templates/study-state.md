# Study State JSON Schema

This file is saved to `./research/study-state.json` and tracks the full study lifecycle.

```json
{
  "studyId": "study_YYYY-MM-DD_slug",
  "name": "Human-readable study name",
  "createdAt": "ISO 8601 date",
  "updatedAt": "ISO 8601 date",
  "status": "draft | in_progress | complete",
  "currentPhase": "intake | definition | respondents | guide | interview | analysis",

  "source": {
    "type": "documents | manual | mixed",
    "documents": [],
    "notes": ""
  },

  "product": {
    "name": "",
    "category": "",
    "positioning": "",
    "valueProposition": "",
    "targetAudience": "",
    "pricing": "",
    "competitors": [],
    "differentiation": "",
    "researchGoals": [],
    "dataSource": "synthetic | real"
  },

  "segments": [
    {
      "id": "seg_1",
      "name": "",
      "description": "",
      "demographics": "",
      "psychographics": "",
      "needs": [],
      "motivations": [],
      "barriers": [],
      "purchaseTriggers": [],
      "decisionCriteria": [],
      "priority": "high | medium | low",
      "respondentCount": 3
    }
  ],

  "respondents": [
    {
      "id": "resp_1",
      "name": "",
      "segmentId": "seg_1",
      "label": "",
      "background": "",
      "lifestyle": "",
      "categoryRelationship": "",
      "buyingBehavior": "",
      "attitude": "",
      "needs": [],
      "objections": [],
      "tensions": [],
      "interviewStatus": "pending | in_progress | paused | complete | skipped"
    }
  ],

  "interviewGuide": {
    "mode": "structured | standard | exploratory",
    "questions": [
      {
        "id": "q1",
        "order": 1,
        "text": "",
        "probes": [],
        "dimension": "",
        "segmentRelevance": []
      }
    ]
  },

  "interviews": [
    {
      "id": "int_1",
      "respondentId": "resp_1",
      "mode": "manual | autopilot",
      "status": "pending | in_progress | paused | complete",
      "currentQuestionIndex": 0,
      "transcript": [
        {
          "turnNumber": 1,
          "role": "interviewer | respondent | moderator",
          "content": "",
          "questionId": "q1",
          "userEdited": false
        }
      ]
    }
  ],

  "analysis": {
    "perRespondentSummaries": [
      {
        "respondentId": "resp_1",
        "keyInsights": [],
        "quotes": [],
        "motivations": [],
        "painPoints": [],
        "objections": [],
        "purchaseTriggers": [],
        "competitorMentions": [],
        "pricingSignals": [],
        "unresolvedQuestions": [],
        "statedPreferences": [],
        "revealedPreferences": [],
        "contradictions": []
      }
    ],
    "crossRespondentSynthesis": null,
    "segmentComparison": null,
    "opportunityMap": null,
    "recommendations": null,
    "limitations": null
  }
}
```

## Field Notes

- `source.type`: How context was gathered — from documents, manual Q&A, or both.
- `product.dataSource`: "synthetic" for skill-generated interviews, "real" for actual consumer data. The analysis pipeline works identically for both.
- `interviews[].transcript`: Ordered array of all turns. Each turn references the guide question it addresses.
- `analysis`: Starts as null. Populated as interviews are completed and analysis runs.
- When resuming a study, read this file and reconstruct the workflow state.
