import type { RiskFlag } from "./types.js";

const RISK_PATTERNS: Array<[RiskFlag, RegExp]> = [
  ["destructive_action", /\b(delete|remove|drop|wipe|reset|destroy|overwrite)\b/i],
  ["production_impact", /\b(production|prod|live|customer|users|database)\b/i],
  ["external_service", /\b(stripe|github|revenuecat|aws|gcp|azure|vercel|cloudflare|api|connector|plugin)\b/i],
  ["credentials_or_secrets", /\b(secret|token|api key|credential|password|oauth|private key)\b/i],
  ["payments", /\b(payment|billing|subscription|invoice|refund|stripe|checkout)\b/i],
  ["legal_or_compliance", /\b(legal|contract|compliance|privacy|gdpr|hipaa|policy|app store review)\b/i],
  ["repository_modification", /\b(repo|repository|codebase|commit|pull request|modify files|make changes)\b/i],
  ["publishing_or_deployment", /\b(deploy|publish|release|submit|ship|go live)\b/i]
];

export function detectRisks(text: string, wordCount: number): RiskFlag[] {
  const risks = new Set<RiskFlag>();
  for (const [risk, pattern] of RISK_PATTERNS) {
    if (pattern.test(text)) risks.add(risk);
  }

  if (wordCount < 6) risks.add("ambiguous_goal");
  if (/\b(attached|files?|docs?|examples?)\b/i.test(text) && !/\/|\.md|\.txt|\.json|\.tsx?|\.py|https?:/i.test(text)) {
    risks.add("missing_context");
  }

  if (/\b(use|follow)\b.+\b(example|inspiration)\b/i.test(text)) risks.add("source_conflict");

  return [...risks];
}

export function requiresGovernance(risks: RiskFlag[]): boolean {
  return risks.some((risk) =>
    [
      "destructive_action",
      "production_impact",
      "external_service",
      "credentials_or_secrets",
      "payments",
      "legal_or_compliance",
      "repository_modification",
      "publishing_or_deployment"
    ].includes(risk)
  );
}
