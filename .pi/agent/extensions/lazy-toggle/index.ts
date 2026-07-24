import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const STATE_KEY = "lazy-mode-enabled";
const LAZY_SKILLS = ["lazy-think-twice", "lazy-surgical"];

export default function (pi: ExtensionAPI) {
  pi.registerCommand("lazy", {
    description: "Toggle 'lazy-cat' skills (think-twice, surgical) on/off for coding vs writing",
    handler: async (args, ctx) => {
      const current = ctx.sessionManager.getBranch().some(
        (e) => e.type === "custom" && e.customType === STATE_KEY && e.data === true
      );
      
      const newState = args?.trim().toLowerCase() === "off" ? false : 
                       args?.trim().toLowerCase() === "on" ? true : !current;

      if (newState) {
        pi.appendEntry(STATE_KEY, true);
        ctx.ui.notify("🐱 Lazy mode ON: think-twice & surgical skills active for coding", "info");
      } else {
        // Remove the entry to disable
        const entries = ctx.sessionManager.getBranch();
        // We can't easily delete, but we can append false
        pi.appendEntry(STATE_KEY, false);
        ctx.ui.notify("✍️ Lazy mode OFF: Writing/Marketing mode (no code-optimization skills)", "info");
      }
    },
  });

  // Intercept skill loading to block lazy skills when disabled
  pi.on("input", async (event, ctx) => {
    const entries = ctx.sessionManager.getBranch();
    const isEnabled = entries.some(
      (e) => e.type === "custom" && e.customType === STATE_KEY && e.data === true
    );

    // Default to ON for coding if not set, but allow explicit OFF
    const isExplicitlyOff = entries.some(
      (e) => e.type === "custom" && e.customType === STATE_KEY && e.data === false
    );

    if (isExplicitlyOff) {
      // If user types /skill:think-twice or /skill:surgical, warn them
      if (LAZY_SKILLS.some(s => event.text.includes(`/skill:${s}`))) {
        ctx.ui.notify("Lazy skills are currently disabled. Use /lazy on to enable.", "warning");
      }
    }
    return { action: "continue" };
  });
}
