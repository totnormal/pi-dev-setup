import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import { refinePrompt } from "../dist/index.js";

const execFileAsync = promisify(execFile);

const examples = JSON.parse(await readFile(new URL("../examples/transformations.json", import.meta.url), "utf8"));
assert.ok(examples.length >= 10, "expected at least 10 example transformations");

const coding = refinePrompt("add dark mode to the app");
assert.ok(coding.analysis.archetypes.includes("coding"), "expected coding archetype");
assert.ok(coding.refinedPrompt.text.includes("Repository Workflow"), "expected repository workflow");
assert.equal(coding.validation.passed, true, "expected coding prompt validation to pass");

const risky = refinePrompt("deploy this to production");
assert.equal(risky.analysis.complexity, "mission_critical", "expected mission-critical complexity");
assert.ok(risky.refinedPrompt.text.includes("Safety And Approval Boundaries"), "expected governance boundaries");

const incomplete = refinePrompt("make it better and use the attached files");
assert.equal(incomplete.refinedPrompt.text.length, 0, "expected clarification mode");
assert.ok(incomplete.refinedPrompt.clarifyingQuestions.length > 0, "expected clarifying questions");

const cli = await execFileAsync("node", ["dist/cli.js", "add dark mode to the app"]);
assert.ok(cli.stdout.includes("Repository Workflow"), "expected CLI output to include repository workflow");

console.log("smoke tests passed");
