#!/usr/bin/env node

import { execSync } from 'node:child_process';

console.log('\n\x1b[1m@decocms/zero-build-slides\x1b[0m\n');
console.log('Installing Claude Code skill...\n');

try {
  execSync('npx skills add decocms/zero-build-slides', {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
  console.log('\n\x1b[32mDone!\x1b[0m Ask your agent to create a presentation.\n');
} catch {
  console.log('\n\x1b[33mAutomatic install failed.\x1b[0m Try manually:\n');
  console.log('  npx skills add decocms/zero-build-slides\n');
}
