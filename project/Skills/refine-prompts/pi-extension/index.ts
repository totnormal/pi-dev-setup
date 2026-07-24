/**
 * Pi adapter for refine-prompts.
 *
 * This adapter intentionally fails open: if the refinement engine cannot run,
 * the original user input continues unchanged.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { refinePrompt } from "../src/index.js";
import type { OutputMode } from "../src/types.js";

interface RefinerState {
  enabled: boolean;
  mode: OutputMode;
}

const DEFAULT_STATE: RefinerState = { enabled: false, mode: "copy_paste" };
const MAX_AUTO_LENGTH = 1200;

function getState(entries: Array<{ type: string; customType?: string; data?: unknown }>): RefinerState {
  let state = DEFAULT_STATE;
  for (const entry of entries) {
    if (entry.type === "custom" && entry.customType === "refine-prompts-state" && entry.data) {
      state = { ...state, ...(entry.data as Partial<RefinerState>) };
    }
  }
  return state;
}

export default function refinePromptsExtension(pi: ExtensionAPI) {
  pi.registerCommand("refine", {
    description: "Toggle prompt refinement, or force-refine text. Usage: /refine [--verbose|--json] <prompt>",
    handler: async (args, ctx) => {
      const parsed = parseArgs(args ?? "");
      if (parsed.text.length > 0) {
        const result = refinePrompt(parsed.text, { mode: parsed.mode });
        const text = result.refinedPrompt.text || result.output;
        ctx.ui.setEditorText(text);
        ctx.ui.notify("Refined prompt loaded into editor. Submit when ready.", "info");
        return;
      }

      const state = getState(ctx.sessionManager.getBranch());
      const nextState: RefinerState = { enabled: !state.enabled, mode: parsed.mode ?? state.mode };
      pi.appendEntry("refine-prompts-state", nextState);
      ctx.ui.notify(
        nextState.enabled ? `Prompt refinement: ON (${nextState.mode})` : "Prompt refinement: OFF",
        "info"
      );
    }
  });

  pi.on("input", async (event, ctx) => {
    if (event.source === "extension") return { action: "continue" };
    if (event.streamingBehavior === "steer" || event.streamingBehavior === "followUp") return { action: "continue" };
    if (event.text.startsWith("/")) return { action: "continue" };

    const state = getState(ctx.sessionManager.getBranch());
    if (!state.enabled || event.text.length > MAX_AUTO_LENGTH) return { action: "continue" };

    try {
      const result = refinePrompt(event.text, { mode: state.mode });
      if (!result.refinedPrompt.text || !result.refinedPrompt.changed) return { action: "continue" };

      const accepted = await ctx.ui.confirm(
        "Prompt Refinement",
        `Original:\n${event.text}\n\nRefined:\n${result.refinedPrompt.text}\n\nUse refined version?`
      );

      return accepted ? { action: "transform", text: result.refinedPrompt.text } : { action: "continue" };
    } catch {
      return { action: "continue" };
    }
  });
}

function parseArgs(args: string): { text: string; mode?: OutputMode } {
  const tokens = args.trim().split(/\s+/).filter(Boolean);
  let mode: OutputMode | undefined;
  const remaining: string[] = [];

  for (const token of tokens) {
    if (token === "--verbose") mode = "verbose_markdown";
    else if (token === "--json") mode = "json";
    else remaining.push(token);
  }

  return { text: remaining.join(" ").trim(), mode };
}
