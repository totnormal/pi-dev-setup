/**
 * Cloudflare MCP Tools Extension
 *
 * Connects to Cloudflare's remote MCP servers (docs, api, bindings, builds, observability)
 * and registers their tools as pi tools.
 *
 * The docs MCP server (docs.mcp.cloudflare.com) is public and requires no auth.
 * The other servers require OAuth — they will attempt connection but may fail
 * until OAuth is completed via a browser login flow.
 *
 * Reference: https://developers.cloudflare.com/agent-setup/prompt.md
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

// ── MCP Server definitions ──────────────────────────────────────────────

interface McpServerDef {
	name: string;
	label: string;
	url: string;
	requiresAuth: boolean;
}

interface McpToolDef {
	name: string;
	description: string;
	inputSchema: Record<string, unknown>;
}

const SERVERS: McpServerDef[] = [
	{
		name: "cloudflare-docs",
		label: "Cloudflare Docs",
		url: "https://docs.mcp.cloudflare.com/mcp",
		requiresAuth: false,
	},
	{
		name: "cloudflare-api",
		label: "Cloudflare API",
		url: "https://mcp.cloudflare.com/mcp",
		requiresAuth: true,
	},
	{
		name: "cloudflare-bindings",
		label: "Cloudflare Bindings",
		url: "https://bindings.mcp.cloudflare.com/mcp",
		requiresAuth: true,
	},
	{
		name: "cloudflare-builds",
		label: "Cloudflare Builds",
		url: "https://builds.mcp.cloudflare.com/mcp",
		requiresAuth: true,
	},
	{
		name: "cloudflare-observability",
		label: "Cloudflare Observability",
		url: "https://observability.mcp.cloudflare.com/mcp",
		requiresAuth: true,
	},
];

// ── MCP protocol helpers ────────────────────────────────────────────────

let nextId = 1;

/** Load optional Cloudflare API token from secrets file for bearer auth. */
async function loadCloudflareToken(): Promise<string | null> {
	try {
		const fs = await import("node:fs/promises");
		const path = require("path").join(require("os").homedir(), ".pi/agent/secrets/cloudflare-api-token");
		const content = await fs.readFile(path, "utf8");
		const match = content.match(/CF_API_TOKEN=(\S+)/);
		if (match) return match[1].trim();
	} catch {
		// no token file or unreadable
	}
	return null;
}

let cachedCloudflareToken: string | null = null;
async function getCloudflareToken(): Promise<string | null> {
	if (cachedCloudflareToken !== undefined) return cachedCloudflareToken;
	cachedCloudflareToken = await loadCloudflareToken();
	return cachedCloudflareToken;
}

/**
 * Make a JSON-RPC request to an MCP server over HTTP POST.
 * Handles the SSE transport format that Cloudflare MCP servers use.
 */
async function mcpRequest(
	url: string,
	method: string,
	params?: Record<string, unknown>,
	signal?: AbortSignal,
): Promise<unknown> {
	const id = nextId++;
	const body = JSON.stringify({
		jsonrpc: "2.0",
		id,
		method,
		params: params ?? {},
	});

	const token = await getCloudflareToken();
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json, text/event-stream",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		body,
		signal,
	});

	// Read the full response body
	const text = await response.text();

	if (!response.ok && !text.startsWith("event:")) {
		try {
			const err = JSON.parse(text);
			throw new Error(err.error?.message ?? `HTTP ${response.status}`);
		} catch (e) {
			if (e instanceof SyntaxError) {
				throw new Error(`MCP server returned HTTP ${response.status}: ${text.slice(0, 200)}`);
			}
			throw e;
		}
	}

	// Parse SSE format: "event: message\ndata: {json}\n\n"
	let dataStr = "";
	for (const line of text.split("\n")) {
		if (line.startsWith("data: ")) {
			dataStr = line.slice(6);
			break;
		}
	}

	if (!dataStr) {
		// Fallback: try parsing as plain JSON
		try {
			const parsed = JSON.parse(text);
			if (parsed.error) throw new Error(parsed.error.message ?? "MCP error");
			return parsed.result;
		} catch (e) {
			if (e instanceof SyntaxError) {
				throw new Error(
					`Unexpected MCP response format. First 200 chars: ${text.slice(0, 200)}`,
				);
			}
			throw e;
		}
	}

	const parsed = JSON.parse(dataStr);
	if (parsed.error) {
		throw new Error(parsed.error.message ?? `MCP error code ${parsed.error.code}`);
	}
	return parsed.result;
}

/**
 * Fetch the list of tools from an MCP server.
 */
async function listTools(
	url: string,
	signal?: AbortSignal,
): Promise<McpToolDef[]> {
	const result = (await mcpRequest(url, "tools/list", undefined, signal)) as {
		tools: McpToolDef[];
	};
	return result.tools ?? [];
}

/**
 * Call an MCP tool and return the text content.
 */
async function callTool(
	url: string,
	toolName: string,
	args: Record<string, unknown>,
	signal?: AbortSignal,
): Promise<string> {
	const result = (await mcpRequest(
		url,
		"tools/call",
		{ name: toolName, arguments: args },
		signal,
	)) as { content?: Array<{ type: string; text?: string }> };

	if (!result?.content || !Array.isArray(result.content)) {
		return "(no content returned)";
	}

	return result.content
		.filter((c: { type: string; text?: string }) => c.type === "text" && c.text)
		.map((c: { type: string; text?: string }) => c.text)
		.join("\n\n");
}

/**
 * Convert MCP JSON Schema to typebox parameters.
 */
function schemaToTypebox(
	schema: Record<string, unknown>,
): Record<string, unknown> {
	const props = (schema as { properties?: Record<string, unknown> }).properties;
	if (!props) return {};

	const tbParams: Record<string, unknown> = {};
	const required = new Set<string>(
		((schema as { required?: string[] }).required ?? []) as string[],
	);

	for (const [key, prop] of Object.entries(props)) {
		const p = prop as { type?: string; description?: string };
		const description = p.description ?? key;
		const isRequired = required.has(key);

		switch (p.type) {
			case "string":
				tbParams[key] = isRequired
					? Type.String({ description })
					: Type.Optional(Type.String({ description }));
				break;
			case "number":
			case "integer":
				tbParams[key] = isRequired
					? Type.Number({ description })
					: Type.Optional(Type.Number({ description }));
				break;
			case "boolean":
				tbParams[key] = isRequired
					? Type.Boolean({ description })
					: Type.Optional(Type.Boolean({ description }));
				break;
			case "array":
				tbParams[key] = isRequired
					? Type.Array(Type.Any(), { description })
					: Type.Optional(Type.Array(Type.Any(), { description }));
				break;
			default:
				tbParams[key] = isRequired
					? Type.String({ description })
					: Type.Optional(Type.String({ description }));
				break;
		}
	}

	return tbParams;
}

// ── Extension ───────────────────────────────────────────────────────────

export default function cloudflareMcpExtension(pi: ExtensionAPI) {
	const registeredCount = { success: 0, failed: 0 };

	pi.on("session_start", async (_event, ctx) => {
		// Register tools from each MCP server
		for (const server of SERVERS) {
			try {
				const tools = await listTools(server.url);
				for (const tool of tools) {
					// Build a unique name: cf_docs_toolname, cf_api_toolname, etc.
					const prefix = server.name.replace(/^cloudflare-/, "cf_");
					const toolName = `${prefix}_${tool.name}`;
					const toolLabel = `${server.label}: ${tool.description?.split("\n")[0] ?? tool.name}`;

					const paramsShape = schemaToTypebox(
						tool.inputSchema as Record<string, unknown>,
					);

					pi.registerTool({
						name: toolName,
						label: toolLabel.slice(0, 60),
						description: `${server.label}: ${tool.description}`,
						promptSnippet: `Search Cloudflare documentation or interact with Cloudflare's ${server.label} API.`,
						promptGuidelines: [
							`Use ${toolName} for Cloudflare ${server.label} operations.`,
						],
						parameters: paramsShape,
						async execute(
							_toolCallId,
							params,
							signal,
							_onUpdate,
							_ctx,
						) {
							try {
								const result = await callTool(
									server.url,
									tool.name,
									params as Record<string, unknown>,
									signal,
								);

								return {
									content: [
										{
											type: "text" as const,
											text: result.slice(0, 50000),
										},
									],
									details: {
										server: server.name,
										tool: tool.name,
									},
								};
							} catch (err: unknown) {
								const msg = err instanceof Error ? err.message : String(err);

								// Auth-required servers will fail — that's expected.
								return {
									content: [
										{
											type: "text" as const,
											text: server.requiresAuth
												? `Cloudflare ${server.label} requires authentication (OAuth).\n` +
													`Open a browser and visit Cloudflare Dashboard to authorize, then retry.\n` +
													`Error: ${msg}`
												: `Cloudflare MCP error: ${msg}`,
										},
									],
									details: { server: server.name, tool: tool.name, error: msg },
								};
							}
						},
					});

					registeredCount.success++;
				}

				if (tools.length > 0) {
					ctx.ui.notify(
						`Cloudflare ${server.label}: ${tools.length} tool(s) registered`,
						"info",
					);
				}
			} catch (err: unknown) {
				registeredCount.failed++;
				const msg = err instanceof Error ? err.message : String(err);
				// Silent fail for auth-required servers if not yet authenticated
				if (!server.requiresAuth) {
					ctx.ui.notify(
						`Cloudflare ${server.label}: failed to connect — ${msg}`,
						"warning",
					);
				}
			}
		}

		ctx.ui.notify(
			`Cloudflare MCP: ${registeredCount.success} tools registered, ${registeredCount.failed} server(s) unavailable`,
			"info",
		);
	});
}
