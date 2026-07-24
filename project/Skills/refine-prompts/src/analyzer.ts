import { detectArchetypes } from "./archetypes.js";
import { detectRisks } from "./risk-detector.js";
import { buildSourceHierarchy } from "./source-hierarchy.js";
import type { ComplexityLevel, PromptAnalysis } from "./types.js";

const URL_PATTERN = /https?:\/\/[^\s)]+/g;
const FILE_PATTERN = /(?:\/[\w./@+% -]+|[\w.-]+\.(?:md|txt|json|ya?ml|tsx?|jsx?|py|rb|go|rs|java|kt|swift|xlsx?|csv|pdf|docx?))/g;
const TOOL_PATTERN = /(?:\[@?[\w-]+[^\]]*\]\([^)]+\)|\/skill:[\w-]+|@[\w-]+|\b(?:GitNexus|Context7|Stripe|RevenueCat|Codex|Claude|ChatGPT)\b)/g;

export function analyzePrompt(prompt: string): PromptAnalysis {
  const normalizedPrompt = normalize(prompt);
  const words = normalizedPrompt.split(/\s+/).filter(Boolean);
  const urls = unique(normalizedPrompt.match(URL_PATTERN) ?? []);
  const files = unique((normalizedPrompt.match(FILE_PATTERN) ?? []).filter((item) => !item.startsWith("http")));
  const tools = unique(normalizedPrompt.match(TOOL_PATTERN) ?? []);
  const archetypes = detectArchetypes(normalizedPrompt);
  const complexity = classifyComplexity(words.length, normalizedPrompt);
  const risks = detectRisks(normalizedPrompt, words.length);
  const constraints = extractSentences(normalizedPrompt, /\b(do not|don't|must|must not|only|never|before|after|constraints?|important)\b/i);
  const deliverables = extractSentences(normalizedPrompt, /\b(deliver|output|provide|create|generate|write|include|format|report|plan|brief)\b/i);
  const contextItems = extractSentences(normalizedPrompt, /\b(context|background|source|attached|files?|folder|project|app|company|repo)\b/i);
  const missingContext = inferMissingContext(normalizedPrompt, risks);

  return {
    originalPrompt: prompt,
    normalizedPrompt,
    goal: inferGoal(normalizedPrompt),
    contextItems,
    constraints,
    deliverables,
    tools,
    files,
    urls,
    archetypes,
    complexity,
    risks,
    missingContext,
    sourceHierarchy: buildSourceHierarchy(normalizedPrompt, files, urls, tools)
  };
}

function normalize(prompt: string): string {
  return prompt.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim();
}

function classifyComplexity(wordCount: number, text: string): ComplexityLevel {
  if (/\b(production|legal|compliance|payment|deploy|delete|migration|app store|customer data)\b/i.test(text)) {
    return "mission_critical";
  }
  if (wordCount > 140 || /\b(architecture|strategy|contract|multiple|comprehensive|end-to-end)\b/i.test(text)) {
    return "complex";
  }
  if (wordCount > 18 || /\b(files?|tools?|deliverables?|format|constraints?)\b/i.test(text)) {
    return "moderate";
  }
  return "simple";
}

function inferGoal(text: string): string {
  const firstSentence = text.split(/(?<=[.!?])\s+|\n/).find(Boolean) ?? text;
  return firstSentence.length > 220 ? `${firstSentence.slice(0, 217)}...` : firstSentence;
}

function extractSentences(text: string, pattern: RegExp): string[] {
  return unique(
    text
      .split(/(?<=[.!?])\s+|\n+/)
      .map((part) => part.trim())
      .filter((part) => part.length > 0 && pattern.test(part))
      .slice(0, 8)
  );
}

function inferMissingContext(text: string, risks: string[]): string[] {
  const missing: string[] = [];
  if (risks.includes("ambiguous_goal")) missing.push("The concrete objective and definition of done are not fully specified.");
  if (/\b(make|build|implement|create)\b/i.test(text) && !/\b(output|deliver|format|acceptance|done)\b/i.test(text)) {
    missing.push("Expected deliverables and output format are not specified.");
  }
  if (/\b(use|analyze|review)\b.+\b(files?|attached|folder)\b/i.test(text) && !/\/|\.md|\.txt|\.json|\.tsx?|\.py|https?:/i.test(text)) {
    missing.push("Referenced files or folders need explicit paths or attachment names.");
  }
  return missing;
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}
