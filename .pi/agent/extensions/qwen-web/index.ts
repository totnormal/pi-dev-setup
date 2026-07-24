/**
 * Qwen Web provider for pi — self-contained, no proxy, auto-refresh.
 *
 * Talks directly to chat.qwen.ai/api/v2/chat/completions using
 * browser-extracted session tokens. Persistent Chrome profile means
 * re-login happens automatically (Chrome opens briefly, grabs fresh
 * token from existing session, closes).
 *
 * Usage in pi:
 *   /provider qwen-web    (first launch opens Chrome for login)
 *   /qwen-login           (force re-login if needed)
 *   /qwen-status          (check token status)
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { Context as PiContext, SimpleStreamOptions } from "@earendil-works/pi-ai";
import { createAssistantMessageEventStream } from "@earendil-works/pi-ai";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// ─── Config ────────────────────────────────────────────────────────────────

const TOKEN_FILE = join(homedir(), ".pi", "agent", "qwen-web-token.json");
const BROWSER_DIR = join(homedir(), ".pi", "agent", "qwen-browser-profile");
const API_CMP = "https://chat.qwen.ai/api/v2/chat/completions";
const API_NEW = "https://chat.qwen.ai/api/v2/chats/new";
const API_STOP = "https://chat.qwen.ai/api/v2/chat/completions/stop";
const CHAT_IN_PROGRESS_DELAYS_MS = [500, 1000, 2000, 4000, 7500, 10000, 15000];
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/131.0.0.0 Safari/537.36";

// ─── Token ─────────────────────────────────────────────────────────────────

let tokCache: string | null = null;
let tokExp = 0;

function diskToken(): string | null {
  try {
    if (process.env.QWEN_WEB_TOKEN) return process.env.QWEN_WEB_TOKEN.trim();
    if (!existsSync(TOKEN_FILE)) return null;
    const { token } = JSON.parse(readFileSync(TOKEN_FILE, "utf-8"));
    if (!token) return null;
    tokCache = token;
    tokExp = Date.now() + 50 * 60 * 1000;
    return token;
  } catch { return null; }
}

function saveToken(t: string) {
  mkdirSync(join(homedir(), ".pi", "agent"), { recursive: true });
  tokCache = t;
  tokExp = Date.now() + 50 * 60 * 1000;
  writeFileSync(TOKEN_FILE, JSON.stringify({ token: t, at: new Date().toISOString() }, null, 2), { mode: 0o600 });
}

function getToken(): string | null {
  return (tokCache && Date.now() < tokExp) ? tokCache : diskToken();
}

function clearToken() { tokCache = null; tokExp = 0; }
const strip = (t: string) => t.replace(/^Bearer\s+/i, "").replace(/^["']|["']$/g, "").trim();

// ─── Browser login ─────────────────────────────────────────────────────────

async function loginChrome(): Promise<string> {
  const { chromium } = await import("playwright");
  mkdirSync(BROWSER_DIR, { recursive: true });

  let ctx;
  try {
    ctx = await chromium.launchPersistentContext(BROWSER_DIR, {
      headless: false, channel: "chrome",
      args: ["--disable-blink-features=AutomationControlled"],
      viewport: { width: 1280, height: 800 },
    });
  } catch {
    ctx = await chromium.launchPersistentContext(BROWSER_DIR, {
      headless: false,
      args: ["--disable-blink-features=AutomationControlled"],
      viewport: { width: 1280, height: 800 },
    });
  }

  const page = await ctx.newPage();
  return new Promise<string>((resolve, reject) => {
    let tok: string | undefined;
    const dl = Date.now() + 90_000;
    const timer = setInterval(async () => {
      if (tok) { clearInterval(timer); await ctx.close(); resolve(tok); return; }
      if (Date.now() > dl) { clearInterval(timer); await ctx.close(); reject(new Error("Login timed out")); return; }
      try {
        const ls = await page.evaluate(() => {
          for (let i = 0; i < localStorage.length; i++) {
            const v = localStorage.getItem(localStorage.key(i)!);
            if (v?.startsWith("eyJ") && v.length > 50) return v;
          }
          return null;
        });
        if (ls?.startsWith("eyJ")) tok = ls;
      } catch {}
    }, 1000);

    page.on("request", (r) => {
      if (tok || !r.url().includes("qwen.ai")) return;
      const a = r.headers()["authorization"];
      if (a?.startsWith("Bearer ")) {
        const t = strip(a);
        if (t.startsWith("eyJ")) tok = t;
      }
    });

    page.goto("https://chat.qwen.ai/auth?action=signin", { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
  });
}

// ─── Chat sessions ─────────────────────────────────────────────────────────

const chats = new Map<string, { id: string; pid?: string }>();

function chatKey(m: string, txt: string) { return `${m}::${txt.slice(0, 80)}`; }

async function getChat(token: string, model: string, k: string): Promise<string> {
  const c = chats.get(k);
  if (c) return c.id;

  const r = await fetch(API_NEW, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Origin: "https://chat.qwen.ai", Referer: "https://chat.qwen.ai/", "User-Agent": UA,
    },
    body: JSON.stringify({ title: "pi", models: [model], chat_mode: "normal", chat_type: "t2t", timestamp: Date.now() }),
  });

  const t = await r.text();
  // Detect HTML/WAF responses
  if (t.trimStart().startsWith("<!") || t.trimStart().startsWith("<html")) throw new Error("TOKEN_EXPIRED");
  if (!r.ok) throw new Error(`createChat ${r.status}: ${t.slice(0, 200)}`);
  const d = JSON.parse(t);
  const id = d.data?.id || d.chat_id || d.id;
  if (!id) throw new Error(`No chat_id: ${t.slice(0, 200)}`);
  chats.set(k, { id });
  return id;
}

/** Stop an active upstream stream so the next request to this chat_id isn't rejected as "chat is in progress." */
async function stopStream(token: string, chatId: string): Promise<void> {
  try {
    await fetch(`${API_STOP}?chat_id=${encodeURIComponent(chatId)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        "X-Requested-With": "XMLHttpRequest", Referer: `https://chat.qwen.ai/c/${chatId}`,
        Origin: "https://chat.qwen.ai", "User-Agent": UA,
      },
      body: JSON.stringify({}),
    });
  } catch { /* best-effort cleanup */ }
}

// ─── Prompt builder ────────────────────────────────────────────────────────

function textOf(c: unknown): string {
  if (typeof c === "string") return c;
  if (Array.isArray(c)) return (c as any[]).map(p => p.type === "text" ? p.text || "" : "").join("");
  return String(c || "");
}

function buildPrompt(msgs: PiContext["messages"]): string {
  const parts: string[] = [];
  for (const m of msgs) {
    const r = (m as any).role;
    switch (r) {
      case "system":
        parts.push(`System: ${textOf((m as any).content)}`);
        break;
      case "user":
        parts.push(`User: ${textOf((m as any).content)}`);
        break;
      case "assistant": {
        const c = (m as any).content;
        if (Array.isArray(c)) {
          for (const b of c) {
            if (b.type === "text" && b.text) parts.push(`Assistant: ${b.text}`);
            else if (b.type === "toolCall") {
              let a = b.arguments;
              if (typeof a === "string") try { a = JSON.parse(a); } catch {}
              parts.push(`Assistant: \`\`\`tool_call\n${JSON.stringify({ name: b.name, arguments: a })}\n\`\`\``);
            }
          }
        } else if (c) {
          parts.push(`Assistant: ${textOf(c)}`);
        }
        break;
      }
      case "tool":
      case "toolResult":
        parts.push(`Tool result: ${textOf((m as any).content)}`);
        break;
    }
  }
  return parts.join("\n\n");
}

function injectTools(sys: string, tools: PiContext["tools"]): string {
  if (!tools?.length) return sys;
  const items = tools.map((t: any) => {
    if (!t.name) return "";
    const desc = (t.description || "").slice(0, 200);
    let params = "";
    try {
      if (t.parameters?.properties) {
        params = Object.entries(t.parameters.properties as Record<string, any>)
          .map(([k, v]: [string, any]) => `${k}: ${v.type || "any"}${t.parameters?.required?.includes(k) ? " (required)" : ""} — ${v.description || ""}`)
          .join(", ");
      }
    } catch {}
    return `- **${t.name}**(${params || "no params"}) — ${desc}`;
  }).filter(Boolean);
  const tp = [
    "Available tools:",
    items.join("\n"),
    "",
    "To call a tool, output exactly:",
    "",
    "```tool_call",
    `{"name": "<tool>", "arguments": {<args>}}`,
    "```",
  ].join("\n");
  return sys ? `${sys}\n\n${tp}` : tp;
}

// ─── Tool parsing ──────────────────────────────────────────────────────────

function parseTools(txt: string) {
  const res: { name: string; arguments: Record<string, unknown> }[] = [];
  const re = /```tool_call\s*\n([\s\S]*?)\n\s*```/g;
  let m;
  while ((m = re.exec(txt))) {
    try {
      const p = JSON.parse(m[1]);
      if (!p.name) continue;
      let a: Record<string, unknown> = {};
      if (typeof p.arguments === "string") try { a = JSON.parse(p.arguments); } catch {}
      else if (typeof p.arguments === "object") a = p.arguments;
      res.push({ name: p.name, arguments: a });
    } catch {}
  }
  return res;
}

function stripTools(txt: string): string {
  return txt.replace(/```tool_call\s*\n[\s\S]*?\n\s*```/g, "").trim();
}

// ─── Raw stream ────────────────────────────────────────────────────────────

async function* rawStream(
  token: string, model: string, chatId: string, pid: string | undefined,
  prompt: string, _sysMsg: string | undefined, signal?: AbortSignal,
): AsyncGenerator<{ t: "text" | "done" | "authErr"; text?: string; pid?: string }> {
  const uId = crypto.randomUUID(), aId = crypto.randomUUID();
  const msg: Record<string, unknown> = {
    fid: uId, role: "user", content: prompt,
    chat_type: "t2t", sub_chat_type: "t2t", timestamp: Math.floor(Date.now() / 1000),
    user_action: "chat", models: [model], files: [], childrenIds: [aId],
    extra: { meta: { subChatType: "t2t" } }, feature_config: { thinking_enabled: false },
  };
  if (pid) { msg.parentId = pid; msg.parent_id = pid; }

    const body: Record<string, unknown> = {
      stream: true, incremental_output: true,
      chat_id: chatId, chat_mode: "normal", messages: [msg], model, timestamp: Date.now(),
    };
    if (pid) body.parent_id = pid;

  const r = await fetch(`${API_CMP}?chat_id=${encodeURIComponent(chatId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", Authorization: `Bearer ${token}`,
      "X-Requested-With": "XMLHttpRequest", Referer: `https://chat.qwen.ai/c/${chatId}`,
      Origin: "https://chat.qwen.ai", "User-Agent": UA,
    },
    body: JSON.stringify(body), signal,
  });

  if (r.status === 401) { yield { t: "authErr" }; return; }
  // Detect HTML/WAF responses (Alibaba WAF returns 200 text/html)
  const ct = r.headers.get("content-type") || "";
  if (!r.ok || ct.includes("text/html")) {
    const errText = await r.text();
    if (ct.includes("text/html") || errText.trimStart().startsWith("<!") || errText.trimStart().startsWith("<html")) {
      // WAF/HTML page instead of API JSON — treat as auth error to trigger re-login
      yield { t: "authErr" };
      return;
    }
    throw new Error(`Qwen ${r.status}: ${errText.slice(0, 300)}`);
  }

  const reader = r.body!.getReader();
  const dec = new TextDecoder();
  let buf = "", full = "", newPid: string | undefined;

  try {
    let lineCount = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n"); buf = lines.pop() || "";
      for (const line of lines) {
        const tt = line.trim();
        if (!tt.startsWith("data: ")) continue;
        const j = tt.slice(6); if (j === "[DONE]") continue;
        try {
          const c = JSON.parse(j);
          if (c.error) throw new Error(`Stream error: ${JSON.stringify(c.error)}`);
          if (c.parent_id) newPid = c.parent_id;
          for (const ch of c.choices || []) {
            if (ch.delta?.content) { full += ch.delta.content; yield { t: "text", text: ch.delta.content }; }
          }
        } catch (e) {
          // Re-throw stream errors, skip parse errors
          if ((e as Error).message.startsWith("Stream error")) throw e;
        }
        lineCount++;
      }
    }
    yield { t: "done", text: full, pid: newPid };
  } finally { reader.releaseLock(); }
}

// ─── Stream handler ────────────────────────────────────────────────────────

function streamQwen(
  model: { id: string; api: string; provider: string },
  context: PiContext, options?: SimpleStreamOptions,
) {
  const strm = createAssistantMessageEventStream();
  const p = (e: any) => strm.push(e);

  (async () => {
    const mid = model.id;
    const msgs = context.messages;
    const prompt = buildPrompt(msgs);
    const sys = msgs.find((m: any) => m.role === "system");
    const fullSys = injectTools(sys ? textOf((sys as any).content) : "", context.tools || []);
    // Prepend system+tools to prompt (system_message causes Internal Error)
    const finalPrompt = fullSys ? `${fullSys}\n\n${prompt}` : prompt;
    const firstUser = msgs.find((m: any) => m.role === "user");
    const key = chatKey(mid, firstUser ? textOf((firstUser as any).content) : "def");

    const out: any = {
      role: "assistant", content: [], model: mid, api: model.api, provider: model.provider,
      usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
      stopReason: "stop", timestamp: Date.now(),
    };

    let tokenExpiredRetries = 0;
    const MAX_TOKEN_RETRIES = 2;

    async function run(tok: string) {
      let cid = await getChat(tok, mid, key);
      let sess = chats.get(key);
      let full = "", bi = -1, started = false;

      p({ type: "start", partial: out });

      let progressRetries = 0, freshRetries = 0;
      const MAX_FRESH_RETRIES = 2;

      while (true) {
        try {
          for await (const ev of rawStream(tok, mid, cid, sess?.pid, finalPrompt, undefined, options?.signal)) {
            switch (ev.t) {
              case "text":
                if (!started) { out.content.push({ type: "text", text: "" }); bi = out.content.length - 1; p({ type: "text_start", contentIndex: bi, partial: out }); started = true; }
                full += ev.text || ""; out.content[bi].text += ev.text || "";
                p({ type: "text_delta", contentIndex: bi, delta: ev.text || "", partial: out });
                break;
              case "done": {
                if (ev.pid) chats.set(key, { id: cid, pid: ev.pid });
                if (ev.text) full = ev.text;
                const tools = parseTools(full), clean = stripTools(full);

                if (started) { out.content[bi].text = clean; p({ type: "text_end", contentIndex: bi, content: clean, partial: out }); }
                else if (clean) { out.content.push({ type: "text", text: clean }); bi = out.content.length - 1; p({ type: "text_start", contentIndex: bi, partial: out }); p({ type: "text_end", contentIndex: bi, content: clean, partial: out }); }

                for (const tc of tools) {
                  const ci = out.content.length;
                  const id = `call_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
                  out.content.push({ type: "toolCall", id, name: tc.name, arguments: tc.arguments });
                  p({ type: "tool_call_start", contentIndex: ci, partial: out });
                  p({ type: "tool_call_end", contentIndex: ci, toolCall: out.content[ci], partial: out });
                }
                out.stopReason = tools.length > 0 ? "toolUse" : "stop";
                p({ type: "done", reason: out.stopReason, message: out });
                strm.end(); return;
              }
              case "authErr": throw new Error("TOKEN_EXPIRED");
            }
          }
          return; // stream completed successfully
        } catch (e: any) {
          const msg = String(e?.message ?? e).toLowerCase();

          // Pass through auth errors to the outer token-refresh handler
          if (msg === "token_expired") throw e;

          // User abort — stop the upstream stream server-side, then re-throw
          const isAbort = /aborted|aborterror|request aborted/i.test(msg) || e?.name === "AbortError";
          if (isAbort) {
            await stopStream(tok, cid).catch(() => {});
            throw e;
          }

          // "Chat is in progress" — stop stream + backoff + retry in SAME chat_id
          const isChatInProgress = msg.includes("chat is in progress");
          if (isChatInProgress && progressRetries < CHAT_IN_PROGRESS_DELAYS_MS.length) {
            const delay = CHAT_IN_PROGRESS_DELAYS_MS[progressRetries++];
            await stopStream(tok, cid).catch(() => {});
            await new Promise(r => setTimeout(r, delay));
            out.content = []; full = ""; started = false; bi = -1;
            continue;
          }

          // "Internal error" or network "terminated" — create a FRESH chat_id and retry
          const isInternal = msg.includes("internal error");
          const isTerminated = msg.trim() === "terminated" || msg.includes("fetch failed");
          if ((isInternal || isTerminated) && freshRetries < MAX_FRESH_RETRIES) {
            freshRetries++;
            chats.delete(key);
            cid = await getChat(tok, mid, key);
            sess = undefined;
            out.content = []; full = ""; started = false; bi = -1;
            continue;
          }

          throw e; // unhandled error — propagate
        }
      }
    }

    try {
      let tok = getToken();
      if (!tok) {
        const loginText = "Opening Chrome for qwen.ai login…";
        out.content.push({ type: "text", text: loginText });
        p({ type: "start", partial: out });
        p({ type: "text_start", contentIndex: 0, partial: out });
        p({ type: "text_delta", contentIndex: 0, delta: loginText, partial: out });
        try { tok = await loginChrome(); saveToken(tok); out.content = []; }
        catch (e) {
          const errText = `Login failed: ${(e as Error).message}`;
          out.content[0].text = errText;
          out.stopReason = "error"; out.errorMessage = (e as Error).message;
          p({ type: "text_end", contentIndex: 0, content: errText, partial: out });
          strm.end(); return;
        }
      }
      await run(strip(tok));
    } catch (e) {
      const msg = (e as Error).message;
      if (msg === "TOKEN_EXPIRED") {
        tokenExpiredRetries++;
        if (tokenExpiredRetries > MAX_TOKEN_RETRIES) {
          p({ type: "error", reason: "error", error: { ...out, stopReason: "error", errorMessage: `Token refresh failed ${MAX_TOKEN_RETRIES} times. The site may be blocking requests (WAF). Try /qwen-login later.` } }); strm.end(); return;
        }
        clearToken();
        try { const nt = await loginChrome(); saveToken(nt); chats.delete(key); out.content = []; await run(strip(nt)); return; }
        catch (re) { p({ type: "error", reason: "error", error: { ...out, stopReason: "error", errorMessage: `Refresh failed: ${(re as Error).message}` } }); strm.end(); return; }
      }
      out.stopReason = options?.signal?.aborted ? "aborted" : "error";
      out.errorMessage = msg;
      p({ type: "error", reason: out.stopReason, error: out });
      strm.end();
    }
  })();
  return strm;
}

// ─── Extension ─────────────────────────────────────────────────────────────

export default function (pi: ExtensionAPI) {
  getToken();

  pi.registerProvider("qwen-web", {
    name: "Qwen Web (qwen.ai)",
    baseUrl: "https://chat.qwen.ai",
    apiKey: "!echo dummy",
    api: "qwen-web",
    streamSimple: streamQwen,
    models: [
      { id: "qwen3.7-max",   name: "Qwen 3.7 Max",  reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1_000_000, maxTokens: 65536 },
      { id: "qwen3.6-plus",  name: "Qwen 3.6 Plus",  reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1_000_000, maxTokens: 65536 },
      { id: "qwen3.6-27b",   name: "Qwen 3.6 27B",   reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 262144,   maxTokens: 65536 },
      { id: "qwen3.5-plus",  name: "Qwen 3.5 Plus",  reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1_000_000, maxTokens: 65536 },
      { id: "qwen3.5-flash", name: "Qwen 3.5 Flash", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1_000_000, maxTokens: 65536 },
    ],
  });

  let shown = false;
  pi.on("before_agent_start", async (_e, ctx) => {
    if (shown || ctx.model?.provider !== "qwen-web") return;
    shown = true;
    return { message: { customType: "qwen-web", content: `Qwen Web (qwen.ai) — ${getToken() ? "✅ token loaded, auto-refresh on expiry" : "Chrome will open on first use"}`, display: "inline" } };
  });

  pi.registerCommand("qwen-login", {
    description: "Force re-login to qwen.ai (opens Chrome)",
    handler: async (_a, ctx) => {
      ctx.ui.notify("Opening Chrome for qwen.ai login...", "info");
      try { clearToken(); saveToken(await loginChrome()); ctx.ui.notify("✓ qwen.ai login successful!", "info"); }
      catch (e) { ctx.ui.notify(`Login failed: ${(e as Error).message}`, "error"); }
    },
  });

  pi.registerCommand("qwen-status", {
    description: "Check qwen-web token status",
    handler: async (_a, ctx) => {
      const t = getToken();
      ctx.ui.notify(t ? `Token loaded (${t.length} chars)` : "No token — will open Chrome on first use", t ? "info" : "warning");
    },
  });
}