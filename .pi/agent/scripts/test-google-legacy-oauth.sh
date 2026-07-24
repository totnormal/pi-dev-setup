#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/andreitarnovski/.pi/agent/extensions/google-legacy-oauth"
EXT="$ROOT/index.ts"
VENDOR="$ROOT/vendor/pi-ai-0.70.6/dist"

fail() { echo "FAIL: $*" >&2; exit 1; }
assert_file() { [[ -f "$1" ]] || fail "missing file: $1"; }
assert_contains() {
  local file="$1" needle="$2"
  grep -Fq -- "$needle" "$file" || { echo "--- $file ---" >&2; sed -n '1,220p' "$file" >&2; fail "expected '$needle' in $file"; }
}

assert_file "$EXT"
assert_contains "$EXT" 'pi.registerProvider("google-gemini-cli"'
assert_contains "$EXT" 'pi.registerProvider("google-antigravity"'
assert_contains "$EXT" 'streamSimpleGoogleGeminiCli'
assert_contains "$EXT" 'geminiCliOAuthProvider'
assert_contains "$EXT" 'antigravityOAuthProvider'

assert_file "$VENDOR/providers/google-gemini-cli.js"
assert_file "$VENDOR/utils/oauth/google-gemini-cli.js"
assert_file "$VENDOR/utils/oauth/google-antigravity.js"
assert_file "$VENDOR/models.generated.js"
assert_contains "$VENDOR/utils/oauth/google-gemini-cli.js" 'id: "google-gemini-cli"'
assert_contains "$VENDOR/utils/oauth/google-antigravity.js" 'id: "google-antigravity"'
assert_contains "$VENDOR/providers/google-gemini-cli.js" 'streamSimpleGoogleGeminiCli'

node --input-type=module <<'NODE'
const root = '/Users/andreitarnovski/.pi/agent/extensions/google-legacy-oauth/vendor/pi-ai-0.70.6/dist';
const provider = await import(`file://${root}/providers/google-gemini-cli.js`);
const oauthGemini = await import(`file://${root}/utils/oauth/google-gemini-cli.js`);
const oauthAnti = await import(`file://${root}/utils/oauth/google-antigravity.js`);
const models = await import(`file://${root}/models.generated.js`);
if (typeof provider.streamSimpleGoogleGeminiCli !== 'function') throw new Error('missing streamSimpleGoogleGeminiCli');
if (oauthGemini.geminiCliOAuthProvider?.id !== 'google-gemini-cli') throw new Error('bad gemini oauth provider');
if (oauthAnti.antigravityOAuthProvider?.id !== 'google-antigravity') throw new Error('bad antigravity oauth provider');
if (!models.MODELS['google-gemini-cli']?.['gemini-3.1-pro-preview']) throw new Error('missing gemini cli model');
if (!models.MODELS['google-antigravity']?.['gemini-3.1-pro-high']) throw new Error('missing antigravity model');
console.log('legacy-google-extension-imports-ok');
NODE

echo "All google legacy oauth tests passed"
