/**
 * deepseek-web - DeepSeek via chat.deepseek.com with v0 API + PoW challenge
 *
 * Uses the official DeepSeek web API (v0) with Proof-of-Work authentication.
 * Browser login extracts cookies, then all API calls use v0 endpoints
 * with a required PoW challenge solving step (DeepSeekHashV1 WASM).
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { Context as PiContext, SimpleStreamOptions } from "@earendil-works/pi-ai";
import { createAssistantMessageEventStream } from "@earendil-works/pi-ai";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";

// ─── Config ────────────────────────────────────────────────────────────────

const TOKEN_FILE = process.env.DEEPSEEK_COOKIE
  ? undefined
  : join(homedir(), ".pi", "agent", "deepseek-web-cookie.json");
const BROWSER_DIR = process.env.DEEPSEEK_COOKIE
  ? undefined
  : join(homedir(), ".pi", "agent", "deepseek-browser-profile");

// v0 API endpoints (current DeepSeek web API)
const BASE_URL = "https://chat.deepseek.com";
const CREATE_SESSION_PATH = "/api/v0/chat_session/create";
const CREATE_POW_CHALLENGE_PATH = "/api/v0/chat/create_pow_challenge";
const COMPLETION_PATH = "/api/v0/chat/completion";
const STOP_STREAM_PATH = "/api/v0/chat/stop_stream";
const DEEPSEEK_SHA3_WASM =
  "https://fe-static.deepseek.com/chat/static/sha3_wasm_bg.7b9ca65ddd.wasm";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/131.0.0.0 Safari/537.36";
const APP_VERSION = "1.0.2";

// ─── Auth state ────────────────────────────────────────────────────────────

interface DeepSeekAuthState {
  cookieHeader: string;
}

let cookieCache: string | null = null;
let cookieExp = 0;
const COOKIE_TTL_MS = 10 * 60 * 60 * 1000; // ~10h

function diskCookie(): string | null {
  try {
    if (process.env.DEEPSEEK_COOKIE) return process.env.DEEPSEEK_COOKIE.trim();
    if (!TOKEN_FILE || !existsSync(TOKEN_FILE)) return null;
    const data = JSON.parse(readFileSync(TOKEN_FILE, "utf-8"));
    const cookie = data.cookie || data.token;
    if (!cookie) return null;
    cookieCache = cookie;
    cookieExp = Date.now() + COOKIE_TTL_MS;
    return cookie;
  } catch { return null; }
}

function saveCookie(cookie: string) {
  if (!TOKEN_FILE) return;
  mkdirSync(dirname(TOKEN_FILE), { recursive: true });
  cookieCache = cookie;
  cookieExp = Date.now() + COOKIE_TTL_MS;
  writeFileSync(TOKEN_FILE, JSON.stringify({ cookie, at: new Date().toISOString() }, null, 2), { mode: 0o600 });
}

function getCookie(): string | null {
  return cookieCache && Date.now() < cookieExp ? cookieCache : diskCookie();
}

function clearCookie() { cookieCache = null; cookieExp = 0; }

function toAuthState(cookie: string): DeepSeekAuthState {
  const bare = cookie.replace(/^Bearer\s+/i, "").replace(/^["']|["']$/g, "").trim();
  return { cookieHeader: bare };
}

// ─── Browser login ────────────────────────────────────────────────────────

async function loginChrome(): Promise<string> {
  const { chromium } = await import("playwright");
  if (BROWSER_DIR) mkdirSync(BROWSER_DIR, { recursive: true });

  let ctx;
  const ctxOpts = {
    headless: false as const,
    channel: "chrome" as const,
    args: ["--disable-blink-features=AutomationControlled"],
    viewport: { width: 1280, height: 800 },
  };
  try { ctx = await chromium.launchPersistentContext(BROWSER_DIR ?? join(homedir(), ".pi", "agent", "deepseek-browser-profile"), ctxOpts); }
  catch {
    ctx = await chromium.launchPersistentContext(BROWSER_DIR ?? join(homedir(), ".pi", "agent", "deepseek-browser-profile"), { ...ctxOpts, channel: undefined });
  }

  const page = await ctx.newPage();
  return new Promise<string>((resolve, reject) => {
    let cookieStr: string | undefined;
    const dl = Date.now() + 90_000;
    const timer = setInterval(async () => {
      if (cookieStr) { clearInterval(timer); await ctx.close(); resolve(cookieStr); return; }
      if (Date.now() > dl) { clearInterval(timer); await ctx.close(); reject(new Error("Login timed out")); return; }
      try {
        const cookies = await page.context().cookies();
        const parts = cookies.map(c => `${c.name}=${c.value}`);
        const all = parts.join("; ");
        if (all.includes("ds_session_id")) cookieStr = all;
      } catch { /* ignore */ }
    }, 1000);

    page.on("request", (r) => {
      if (cookieStr || !r.url().includes("deepseek.com")) return;
      const c = r.headers()["cookie"];
      if (c && c.includes("ds_session_id")) cookieStr = c;
    });

    page.goto(`${BASE_URL}/auth?action=signin`, { waitUntil: "domcontentloaded", timeout: 30_000 }).catch(() => {});
  });
}

// ─── HTTP helper ───────────────────────────────────────────────────────────

const rng = () => crypto.randomUUID().replace(/-/g, "").slice(0, 16);

async function requestJson(path: string, opts: {
  method: string; auth: DeepSeekAuthState; body?: Record<string, unknown>;
  abortSignal?: AbortSignal;
}): Promise<any> {
  const { method, auth, body, abortSignal } = opts;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": UA,
    Cookie: auth.cookieHeader,
    "x-request-id": `${rng()}${rng()}`,
    "x-request-client-info": `platform/web/${APP_VERSION}`,
    Origin: BASE_URL,
    Referer: `${BASE_URL}/`,
  };

  const r = await fetch(`${BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined, signal: abortSignal });

  if (r.status === 401) throw new Error("TOKEN_EXPIRED");
  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error(`DS API ${r.status} ${path}: ${t.slice(0, 200)}`);
  }

  const ct = r.headers.get("content-type") || "";
  if (ct.includes("text/html")) throw new Error("TOKEN_EXPIRED");

  const text = await r.text();
  try { return JSON.parse(text); }
  catch { throw new Error(`DS API non-JSON ${path}: ${text.slice(0, 200)}`); }
}

// ─── PoW Challenge Solver ──────────────────────────────────────────────────

interface PowChallenge {
  algorithm: string; challenge: string; salt: string;
  difficulty: number; expire_at?: number; expireAt?: number; signature: string;
}

type DeepSeekWasmExports = {
  memory: WebAssembly.Memory;
  __wbindgen_add_to_stack_pointer(delta: number): number;
  __wbindgen_export_0(size: number, align: number): number;
  __wbindgen_export_1(ptr: number, oldSize: number, newSize: number, align: number): number;
  wasm_solve(retptr: number, ptr0: number, len0: number, ptr1: number, len1: number, difficulty: number): void;
};

class DeepSeekHash {
  private offset = 0;
  private cachedUint8Memory: Uint8Array | null = null;
  private readonly cachedTextEncoder = new TextEncoder();

  private constructor(private readonly wasmInstance: DeepSeekWasmExports) {}

  static async create(wasmUrl: string): Promise<DeepSeekHash> {
    const res = await fetch(wasmUrl);
    if (!res.ok) throw new Error(`Failed to load PoW WASM: HTTP ${res.status}`);
    const wasmBuffer = await res.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(wasmBuffer, { wbg: {} });
    return new DeepSeekHash(instance.exports as unknown as DeepSeekWasmExports);
  }

  calculateHash(algorithm: string, challenge: string, salt: string, difficulty: number, expireAt: number): number | undefined {
    if (algorithm !== "DeepSeekHashV1") throw new Error(`Unsupported algorithm: ${algorithm}`);
    const prefix = `${salt}_${expireAt}_`;
    const retptr = this.wasmInstance.__wbindgen_add_to_stack_pointer(-16);
    try {
      const ptr0 = this.encodeString(challenge, this.wasmInstance.__wbindgen_export_0.bind(this.wasmInstance), this.wasmInstance.__wbindgen_export_1.bind(this.wasmInstance));
      const len0 = this.offset;
      const ptr1 = this.encodeString(prefix, this.wasmInstance.__wbindgen_export_0.bind(this.wasmInstance), this.wasmInstance.__wbindgen_export_1.bind(this.wasmInstance));
      const len1 = this.offset;
      this.wasmInstance.wasm_solve(retptr, ptr0, len0, ptr1, len1, difficulty);
      const dataView = new DataView(this.wasmInstance.memory.buffer);
      const status = dataView.getInt32(retptr, true);
      const value = dataView.getFloat64(retptr + 8, true);
      return status === 0 ? undefined : value;
    } finally {
      this.wasmInstance.__wbindgen_add_to_stack_pointer(16);
    }
  }

  private getCachedUint8Memory(): Uint8Array {
    if (!this.cachedUint8Memory || this.cachedUint8Memory.byteLength === 0) {
      this.cachedUint8Memory = new Uint8Array(this.wasmInstance.memory.buffer);
    }
    return this.cachedUint8Memory;
  }

  private encodeString(text: string, allocate: (size: number, align: number) => number, reallocate: (ptr: number, oldSize: number, newSize: number, align: number) => number): number {
    const strLength = text.length;
    let ptr = allocate(strLength, 1) >>> 0;
    const memory = this.getCachedUint8Memory();
    let asciiLength = 0;
    for (; asciiLength < strLength; asciiLength += 1) {
      const charCode = text.charCodeAt(asciiLength);
      if (charCode > 127) break;
      memory[ptr + asciiLength] = charCode;
    }
    if (asciiLength < strLength) {
      ptr = reallocate(ptr, strLength, strLength, 1) >>> 0;
      const buf = this.cachedTextEncoder.encode(text);
      memory.set(buf, ptr);
      this.offset = buf.length;
    } else {
      this.offset = strLength;
    }
    return ptr;
  }
}

let wasmSolverPromise: Promise<DeepSeekHash> | undefined;

async function getWasmSolver(): Promise<DeepSeekHash> {
  if (!wasmSolverPromise) wasmSolverPromise = DeepSeekHash.create(DEEPSEEK_SHA3_WASM);
  return wasmSolverPromise;
}

async function solvePow(challenge: PowChallenge): Promise<number> {
  if (challenge.algorithm !== "DeepSeekHashV1") throw new Error(`Unsupported PoW algorithm: ${challenge.algorithm}`);
  const expireAt = challenge.expire_at ?? challenge.expireAt;
  if (!Number.isFinite(expireAt)) throw new Error("PoW challenge without expire_at");
  const solver = await getWasmSolver();
  const answer = solver.calculateHash(challenge.algorithm, challenge.challenge, challenge.salt, Number(challenge.difficulty), Number(expireAt));
  if (typeof answer !== "number" || !Number.isInteger(answer)) throw new Error("PoW solver returned an invalid answer");
  return answer;
}

async function createPowHeader(auth: DeepSeekAuthState, targetPath: string, signal?: AbortSignal): Promise<Record<string, string>> {
  const challengeJson = await requestJson(CREATE_POW_CHALLENGE_PATH, { method: "POST", auth, body: { path: targetPath }, abortSignal: signal });
  const challenge: PowChallenge = challengeJson?.data?.biz_data?.challenge;
  if (!challenge) throw new Error(`Failed to get PoW challenge: ${JSON.stringify(challengeJson).slice(0, 200)}`);
  const answer = await solvePow(challenge);
  const payload = {
    algorithm: challenge.algorithm, challenge: challenge.challenge, salt: challenge.salt,
    answer, signature: challenge.signature, target_path: targetPath,
  };
  return { "x-ali-pow": JSON.stringify(payload) };
}

// ─── Session / Chat management ────────────────────────────────────────────

async function createSession(auth: DeepSeekAuthState, signal?: AbortSignal): Promise<string> {
  const json = await requestJson(CREATE_SESSION_PATH, { method: "POST", auth, body: {}, abortSignal: signal });
  const biz = json?.data?.biz_data;
  const sessionId = biz?.id ?? biz?.chat_session?.id;
  if (!sessionId) throw new Error(`Failed to get DeepSeek session id: ${JSON.stringify(json).slice(0, 250)}`);
  return sessionId;
}

async function stopStream(auth: DeepSeekAuthState, sessionId: string): Promise<void> {
  try {
    await requestJson(STOP_STREAM_PATH, { method: "POST", auth, body: { session_id: sessionId } });
  } catch { /* best-effort */ }
}

// ─── Chat sessions cache ───────────────────────────────────────────────────

const sessions = new Map<string, string>(); // key → session_id

function chatKey(model: string, text: string) { return `${model}::${text.slice(0, 80)}`; }

async function getSession(auth: DeepSeekAuthState, model: string, key: string): Promise<string> {
  const cached = sessions.get(key);
  if (cached) return cached;
  const sid = await createSession(auth);
  sessions.set(key, sid);
  return sid;
}

// ─── Message helpers (same as before) ──────────────────────────────────────

function textOf(c: unknown): string {
  if (typeof c === "string") return c;
  if (Array.isArray(c)) return (c as any[]).map((p: any) => p.type === "text" ? p.text || "" : "").join("");
  return String(c || "");
}

function buildPrompt(msgs: PiContext["messages"]): string {
  const parts: string[] = [];
  for (const m of msgs) {
    const role = (m as any).role;
    switch (role) {
      case "system": parts.push(`System: ${textOf((m as any).content)}`); break;
      case "user": parts.push(`User: ${textOf((m as any).content)}`); break;
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
        } else if (c) parts.push(`Assistant: ${textOf(c)}`);
        break;
      }
      case "tool": case "toolResult": parts.push(`Tool result: ${textOf((m as any).content)}`); break;
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
    } catch { /* ignore */ }
    return `- **${t.name}**(${params || "no params"}) — ${desc}`;
  }).filter(Boolean);
  const tp = [
    "Available tools:", items.join("\n"), "",
    "To call a tool, output exactly:", "",
    "```tool_call",
    `{"name": "<tool>", "arguments": {<args>}}`,
    "```",
  ].join("\n");
  return sys ? `${sys}\n\n${tp}` : tp;
}

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
      else if (p.arguments && typeof p.arguments === "object") a = p.arguments;
      res.push({ name: p.name, arguments: a });
    } catch { /* skip */ }
  }
  return res;
}

function stripTools(txt: string): string {
  return txt.replace(/```tool_call\s*\n[\s\S]*?\n\s*```/g, "").trim();
}

// ─── SSE stream (v0 completion endpoint) ───────────────────────────────────

const CHAT_IN_PROGRESS_DELAYS_MS = [500, 1000, 2000, 4000, 7500, 10000, 15000];

interface StreamEvent {
  type: string;
  content?: string;
  extra?: Record<string, unknown>;
}

async function* rawStream(
  auth: DeepSeekAuthState,
  sessionId: string,
  prompt: string,
  signal?: AbortSignal,
): AsyncGenerator<{ t: "text" | "done" | "authErr"; text?: string }> {
  // Solve PoW challenge for each completion
  const powHeaders = await createPowHeader(auth, COMPLETION_PATH, signal);

  const body: Record<string, unknown> = {
    session_id: sessionId,
    prompt,
    stream: true,
    model: "deepseek-chat",
    app_version: APP_VERSION,
    timestamp: Date.now(),
  };

  const r = await fetch(`${BASE_URL}${COMPLETION_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: auth.cookieHeader,
      "User-Agent": UA,
      Origin: BASE_URL,
      Referer: `${BASE_URL}/`,
      "x-request-id": `${crypto.randomUUID().replace(/-/g, "").slice(0, 32)}`,
      "x-request-client-info": `platform/web/${APP_VERSION}`,
      ...powHeaders,
    },
    body: JSON.stringify(body),
    signal,
  });

  if (r.status === 401) { yield { t: "authErr" }; return; }

  const contentType = r.headers.get("content-type") || "";
  if (!r.ok || contentType.includes("text/html")) {
    const errText = await r.text().catch(() => "");
    if (contentType.includes("text/html") || errText.trimStart().startsWith("<!") || errText.trimStart().startsWith("<html")) {
      yield { t: "authErr" }; return;
    }
    throw new Error(`DS v0 ${r.status}: ${errText.slice(0, 300)}`);
  }
  if (!contentType.includes("text/event-stream")) {
    const errText = await r.text().catch(() => "");
    throw new Error(`DS v0 non-SSE response: ${errText.slice(0, 200)}`);
  }

  const reader = r.body!.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let full = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n"); buf = lines.pop() || "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data: ")) continue;
        const j = trimmed.slice(6);
        if (j === "[DONE]") continue;
        try {
          const ev: StreamEvent = JSON.parse(j);
          if (ev.type === "text" && ev.content) {
            full += ev.content;
            yield { t: "text", text: ev.content };
          } else if (ev.type === "finished" || ev.type === "done") {
            yield { t: "done", text: full };
            return;
          } else if (ev.type === "error") {
            throw new Error(`Stream error: ${JSON.stringify(ev)}`);
          }
        } catch (e) {
          if ((e as Error).message.startsWith("Stream error")) throw e;
        }
      }
    }
    yield { t: "done", text: full };
  } finally { reader.releaseLock(); }
}

// ─── Stream handler ────────────────────────────────────────────────────────

function streamDeepseek(
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

    async function run(cookie: string) {
      const auth = toAuthState(cookie);
      let sessionId = await getSession(auth, mid, key);
      let full = "", bi = -1, started = false;

      p({ type: "start", partial: out });

      let progressRetries = 0, freshRetries = 0;
      const MAX_FRESH_RETRIES = 2;

      while (true) {
        try {
          for await (const ev of rawStream(auth, sessionId, finalPrompt, options?.signal)) {
            switch (ev.t) {
              case "text":
                if (!started) { out.content.push({ type: "text", text: "" }); bi = out.content.length - 1; p({ type: "text_start", contentIndex: bi, partial: out }); started = true; }
                full += ev.text || ""; out.content[bi].text += ev.text || "";
                p({ type: "text_delta", contentIndex: bi, delta: ev.text || "", partial: out });
                break;
              case "done": {
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
          return; // stream completed
        } catch (e: any) {
          const msg = String(e?.message ?? e).toLowerCase();

          if (msg === "token_expired") throw e;

          // Abort — stop upstream stream server-side, re-throw
          const isAbort = /aborted|aborterror|request aborted/i.test(msg) || e?.name === "AbortError";
          if (isAbort) { await stopStream(auth, sessionId).catch(() => {}); throw e; }

          // "Chat is in progress" — stop + backoff + retry in SAME session
          const isChatInProgress = msg.includes("chat is in progress");
          if (isChatInProgress && progressRetries < CHAT_IN_PROGRESS_DELAYS_MS.length) {
            const delay = CHAT_IN_PROGRESS_DELAYS_MS[progressRetries++];
            await stopStream(auth, sessionId).catch(() => {});
            await new Promise(r => setTimeout(r, delay));
            out.content = []; full = ""; started = false; bi = -1;
            continue;
          }

          // "Internal error" or "terminated" — fresh session + retry
          const isInternal = msg.includes("internal error");
          const isTerminated = msg.trim() === "terminated" || msg.includes("fetch failed");
          if ((isInternal || isTerminated) && freshRetries < MAX_FRESH_RETRIES) {
            freshRetries++;
            sessionId = await createSession(auth, options?.signal);
            sessions.set(key, sessionId);
            out.content = []; full = ""; started = false; bi = -1;
            continue;
          }

          throw e;
        }
      }
    }

    try {
      let cookie = getCookie();
      if (!cookie) {
        const loginText = "Opening Chrome for deepseek.com login…";
        out.content.push({ type: "text", text: loginText });
        p({ type: "start", partial: out });
        p({ type: "text_start", contentIndex: 0, partial: out });
        p({ type: "text_delta", contentIndex: 0, delta: loginText, partial: out });
        try { cookie = await loginChrome(); saveCookie(cookie); out.content = []; }
        catch (e) {
          const errText = `Login failed: ${(e as Error).message}`;
          if (out.content[0]) out.content[0].text = errText;
          out.stopReason = "error"; out.errorMessage = (e as Error).message;
          p({ type: "text_end", contentIndex: 0, content: errText, partial: out });
          strm.end(); return;
        }
      }
      await run(cookie);
    } catch (e) {
      const msg = (e as Error).message;
      if (msg === "TOKEN_EXPIRED") {
        tokenExpiredRetries++;
        if (tokenExpiredRetries > MAX_TOKEN_RETRIES) {
          p({ type: "error", reason: "error", error: { ...out, stopReason: "error", errorMessage: `Token refresh failed ${MAX_TOKEN_RETRIES} times. Try /deepseek-login later.` } }); strm.end(); return;
        }
        clearCookie();
        try { const nt = await loginChrome(); saveCookie(nt); sessions.delete(key); out.content = []; await run(nt); return; }
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

// ─── Extension entry point ─────────────────────────────────────────────────

const DEEPSEEK_WEB_MODELS = [
  { id: "deepseek-chat",    name: "DeepSeek V3",   reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 128_000, maxTokens: 8192 },
  { id: "deepseek-reasoner", name: "DeepSeek R1",   reasoning: true,  input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 128_000, maxTokens: 8192 },
];

export default function (pi: ExtensionAPI) {
  pi.registerProvider("deepseek-web", {
    name: "DeepSeek Web (deepseek.com)",
    baseUrl: BASE_URL,
    apiKey: "!echo dummy",
    api: "deepseek-web",
    streamSimple: streamDeepseek,
    models: DEEPSEEK_WEB_MODELS,
  });

  let shown = false;
  pi.on("before_agent_start", async (_e, ctx) => {
    if (shown || ctx.model?.provider !== "deepseek-web") return;
    shown = true;
    const isReady = !!getCookie();
    return { message: { customType: "deepseek-web", content: isReady ? "DeepSeek Web v0 — cookie loaded, auto-refresh on expiry" : "DeepSeek Web — browser will open on first use", display: "inline" } };
  });

  pi.registerCommand("deepseek-login", {
    description: "Force re-login to deepseek.com (opens Chrome)",
    handler: async (_a, ctx) => {
      ctx.ui.notify("Opening Chrome for deepseek.com login...", "info");
      try { clearCookie(); saveCookie(await loginChrome()); shown = false; ctx.ui.notify("✓ deepseek.com login successful!", "info"); }
      catch (e) { ctx.ui.notify(`Login failed: ${(e as Error).message}`, "error"); }
    },
  });

  pi.registerCommand("deepseek-status", {
    description: "Check deepseek-web cookie status",
    handler: async (_a, ctx) => {
      const c = getCookie();
      ctx.ui.notify(c ? `Cookie loaded (${c.length} chars)` : "No cookie — browser will open on first use", c ? "info" : "warning");
    },
  });
}