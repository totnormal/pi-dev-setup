#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { refinePromptText } from "./index.js";
import type { OutputMode } from "./types.js";

interface CliOptions {
  mode: OutputMode;
  prompt: string;
}

function parseArgs(argv: string[]): CliOptions {
  let mode: OutputMode = "copy_paste";
  const promptParts: string[] = [];

  for (const arg of argv) {
    if (arg === "--verbose") mode = "verbose_markdown";
    else if (arg === "--json") mode = "json";
    else if (arg === "--copy-paste") mode = "copy_paste";
    else promptParts.push(arg);
  }

  const prompt = promptParts.join(" ").trim() || readStdin();
  return { mode, prompt };
}

function readStdin(): string {
  try {
    return readFileSync(0, "utf8").trim();
  } catch {
    return "";
  }
}

function main(): void {
  const options = parseArgs(process.argv.slice(2));
  if (!options.prompt) {
    console.error("Usage: refine-prompts [--copy-paste|--verbose|--json] <prompt>");
    console.error("       echo '<prompt>' | refine-prompts --verbose");
    process.exitCode = 1;
    return;
  }

  console.log(refinePromptText(options.prompt, { mode: options.mode }));
}

main();
