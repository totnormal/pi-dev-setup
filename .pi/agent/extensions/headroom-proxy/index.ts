/**
 * headroom-proxy - Pi extension routing API calls through Headroom proxy
 *
 * Overrides provider base URLs to point at the Headroom context-compression
 * proxy running on localhost:8787.
 *
 * Headroom compresses tool outputs, logs, and conversation history before
 * they reach the LLM — cutting token usage by 50-95% without changing answers.
 *
 * Start the proxy with: headroom proxy --port 8787
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // Override Google provider to route through Headroom proxy
  pi.registerProvider("google", {
    baseUrl: "http://localhost:8787",
  });

  // Also handle Anthropic provider through Headroom
  pi.registerProvider("anthropic", {
    baseUrl: "http://localhost:8787",
  });

  // Handle OpenAI provider through Headroom
  pi.registerProvider("openai", {
    baseUrl: "http://localhost:8787/v1",
  });
}
