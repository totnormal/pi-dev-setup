/**
 * Notion integration for pi/Hermes.
 *
 * Wraps the notion.py CLI script as pi tools.
 * Token loaded from NOTION_TOKEN env var or Playground/execution/.env
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { execFile } from "node:child_process";
import { homedir } from "node:os";
import { join } from "node:path";

const SCRIPT = join(
  homedir(),
  "Documents/Playground/execution/notion.py"
);

function run(args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile("python3", [SCRIPT, ...args], {
      maxBuffer: 5 * 1024 * 1024,
      timeout: 30_000,
      env: { ...process.env, NOTION_TOKEN: process.env.NOTION_TOKEN },
    }, (err, stdout, stderr) => {
      if (err) reject(new Error(stderr || err.message));
      else resolve(stdout.trim());
    });
  });
}

export default function (pi: ExtensionAPI) {
  // ── notion_search ───────────────────────────────────────────────────────

  pi.registerTool({
    name: "notion_search",
    label: "Search Notion",
    description:
      "Search Notion pages and databases by query. Returns JSON array with id, title, type, url.",
    promptSnippet: "Search Notion pages and databases",
    promptGuidelines: [
      "Use notion_search to find Notion pages or databases by keyword.",
    ],
    parameters: Type.Object({
      query: Type.String({ description: "Search query" }),
      limit: Type.Optional(Type.Number({ description: "Max results (default 10)", default: 10 })),
    }),
    async execute(_id, params, _signal, _onUpdate, _ctx) {
      const args = ["search", params.query];
      if (params.limit) args.push("--limit", String(params.limit));
      const result = await run(args);
      return { content: [{ type: "text", text: result }], details: {} };
    },
  });

  // ── notion_get_page ─────────────────────────────────────────────────────

  pi.registerTool({
    name: "notion_get_page",
    label: "Get Notion Page",
    description:
      "Fetch a Notion page and return its content as markdown. Accepts page ID or URL.",
    promptSnippet: "Read a Notion page as markdown",
    promptGuidelines: [
      "Use notion_get_page to read a full Notion page. Pass the page ID or URL.",
    ],
    parameters: Type.Object({
      page_id: Type.String({ description: "Page ID or Notion URL" }),
    }),
    async execute(_id, params, _signal, _onUpdate, _ctx) {
      const result = await run(["get-page", params.page_id]);
      return { content: [{ type: "text", text: result }], details: {} };
    },
  });

  // ── notion_get_db ───────────────────────────────────────────────────────

  pi.registerTool({
    name: "notion_get_db",
    label: "Get Notion Database",
    description:
      "Fetch rows from a Notion database as JSON. Returns schema + rows.",
    promptSnippet: "Query a Notion database",
    promptGuidelines: [
      "Use notion_get_db to read a Notion database. Returns all rows with properties.",
    ],
    parameters: Type.Object({
      db_id: Type.String({ description: "Database ID or Notion URL" }),
      limit: Type.Optional(Type.Number({ description: "Max rows (default 100)", default: 100 })),
    }),
    async execute(_id, params, _signal, _onUpdate, _ctx) {
      const args = ["get-db", params.db_id];
      if (params.limit) args.push("--limit", String(params.limit));
      const result = await run(args);
      return { content: [{ type: "text", text: result }], details: {} };
    },
  });

  // ── notion_create_page ──────────────────────────────────────────────────

  pi.registerTool({
    name: "notion_create_page",
    label: "Create Notion Page",
    description:
      "Create a new page under a Notion parent page. Returns new page ID and URL.",
    promptSnippet: "Create a new page in Notion",
    promptGuidelines: [
      "Use notion_create_page to add a new page under a parent. Requires parent_id and title.",
    ],
    parameters: Type.Object({
      parent_id: Type.String({ description: "Parent page ID or URL" }),
      title: Type.String({ description: "Page title" }),
      body: Type.Optional(Type.String({ description: "Initial body text" })),
    }),
    async execute(_id, params, _signal, _onUpdate, _ctx) {
      const args = ["create-page", params.parent_id, "--title", params.title];
      if (params.body) args.push("--body", params.body);
      const result = await run(args);
      return { content: [{ type: "text", text: result }], details: {} };
    },
  });

  // ── notion_update_page ──────────────────────────────────────────────────

  pi.registerTool({
    name: "notion_update_page",
    label: "Update Notion Page",
    description:
      "Update or append content to an existing Notion page.",
    promptSnippet: "Update a Notion page's content",
    promptGuidelines: [
      "Use notion_update_page to replace or append content. Set append=true to add without replacing.",
    ],
    parameters: Type.Object({
      page_id: Type.String({ description: "Page ID or URL" }),
      body: Type.String({ description: "New content text" }),
      append: Type.Optional(Type.Boolean({ description: "Append instead of replace (default false)", default: false })),
    }),
    async execute(_id, params, _signal, _onUpdate, _ctx) {
      const args = ["update-page", params.page_id, "--body", params.body];
      if (params.append) args.push("--append");
      const result = await run(args);
      return { content: [{ type: "text", text: result }], details: {} };
    },
  });
}
