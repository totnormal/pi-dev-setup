export type ComplexityLevel = "simple" | "moderate" | "complex" | "mission_critical";

export type OutputMode = "copy_paste" | "verbose_markdown" | "json";

export type TaskArchetype =
  | "general"
  | "coding"
  | "debugging"
  | "architecture"
  | "audit"
  | "research"
  | "strategy"
  | "migration"
  | "documentation"
  | "testing"
  | "deployment"
  | "data_task"
  | "content_brief"
  | "stakeholder_brief"
  | "tool_workflow";

export type RiskFlag =
  | "ambiguous_goal"
  | "missing_context"
  | "source_conflict"
  | "destructive_action"
  | "production_impact"
  | "external_service"
  | "credentials_or_secrets"
  | "payments"
  | "legal_or_compliance"
  | "repository_modification"
  | "publishing_or_deployment";

export interface RawPromptInput {
  prompt: string;
  targetAgent?: string;
  mode?: OutputMode;
  requireClarification?: boolean;
}

export interface RefinementConfig {
  mode: OutputMode;
  targetAgent: string;
  includeAnalysis: boolean;
  includeQualityScore: boolean;
  maxSimpleWords: number;
  maxModerateWords: number;
  askClarifyingQuestions: boolean;
  preserveMarkdown: boolean;
}

export interface SourceItem {
  label: string;
  value: string;
  authority: "primary" | "secondary" | "reference" | "inspiration";
  reason: string;
}

export interface SourceHierarchy {
  sources: SourceItem[];
  conflictRule: string;
}

export interface PromptAnalysis {
  originalPrompt: string;
  normalizedPrompt: string;
  goal: string;
  contextItems: string[];
  constraints: string[];
  deliverables: string[];
  tools: string[];
  files: string[];
  urls: string[];
  archetypes: TaskArchetype[];
  complexity: ComplexityLevel;
  risks: RiskFlag[];
  missingContext: string[];
  sourceHierarchy: SourceHierarchy;
}

export interface ValidationResult {
  passed: boolean;
  missing: string[];
  warnings: string[];
}

export interface QualityScore {
  clarity: number;
  specificity: number;
  structure: number;
  executionReadiness: number;
  riskControl: number;
  assumptionControl: number;
  overall: number;
}

export interface RefinedPrompt {
  text: string;
  changed: boolean;
  clarifyingQuestions: string[];
}

export interface RefinementResult {
  analysis: PromptAnalysis;
  refinedPrompt: RefinedPrompt;
  validation: ValidationResult;
  qualityBefore: QualityScore;
  qualityAfter: QualityScore;
  output: string;
}
