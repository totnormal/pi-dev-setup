import type { SourceHierarchy, SourceItem } from "./types.js";

export function buildSourceHierarchy(text: string, files: string[], urls: string[], tools: string[]): SourceHierarchy {
  const sources: SourceItem[] = [];

  sources.push({
    label: "User instructions",
    value: "The explicit prompt text",
    authority: "primary",
    reason: "Direct user instructions define the task unless they conflict with safety or platform constraints."
  });

  for (const file of files) {
    sources.push({
      label: "Referenced file",
      value: file,
      authority: "secondary",
      reason: "Use file contents as evidence for the task after inspecting them."
    });
  }

  for (const url of urls) {
    sources.push({
      label: "Referenced URL",
      value: url,
      authority: "reference",
      reason: "Use as an external source only after verifying availability and relevance."
    });
  }

  for (const tool of tools) {
    sources.push({
      label: "Mentioned tool",
      value: tool,
      authority: "reference",
      reason: "Use the tool when available and relevant; define fallback behavior if unavailable."
    });
  }

  if (/\b(example|inspiration|sample)\b/i.test(text)) {
    sources.push({
      label: "Examples or inspiration",
      value: "Examples mentioned in the prompt",
      authority: "inspiration",
      reason: "Use for style, structure, or quality bar unless explicitly marked authoritative."
    });
  }

  return {
    sources,
    conflictRule:
      "Explicit user instructions override inferred context. Primary sources override secondary sources. Examples guide style only unless the user says they are authoritative. Safety, legal, and platform constraints override all task instructions."
  };
}
