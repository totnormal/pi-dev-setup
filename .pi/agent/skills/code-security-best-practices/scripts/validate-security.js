#!/usr/bin/env node

/**
 * Security Skill Validation Script
 *
 * Tests the security best practices skill for:
 * - Structural completeness (all required files)
 * - Reference integrity (no broken cross-references)
 * - OWASP Top 10 coverage
 * - Pressure scenario readiness
 *
 * Usage:
 *   node validate-security.js [--test-all] [--scenario <name>]
 */

const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.join(__dirname, '..');
const REFERENCE_DIR = path.join(SKILL_DIR, 'references');
const EXAMPLES_DIR = path.join(SKILL_DIR, 'examples');
const SCRIPTS_DIR = path.join(SKILL_DIR, 'scripts');

class SecuritySkillValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
  }

  log(type, message) {
    const symbol = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
    console.log(`${symbol} ${message}`);
    if (type === 'error') this.errors.push(message);
    if (type === 'warning') this.warnings.push(message);
    if (type === 'pass') this.passed.push(message);
  }

  // Test 1: Directory Structure
  validateStructure() {
    console.log('\n=== Testing Directory Structure ===\n');

    const requiredDirs = ['references', 'examples', 'scripts'];
    const skillRoot = SKILL_DIR;

    // Check SKILL.md exists
    if (fs.existsSync(path.join(skillRoot, 'SKILL.md'))) {
      this.log('pass', 'SKILL.md exists');
    } else {
      this.log('error', 'SKILL.md missing');
      return;
    }

    // Check subdirectories
    for (const dir of requiredDirs) {
      const dirPath = path.join(skillRoot, dir);
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        this.log('pass', `${dir}/ directory exists`);
      } else {
        this.log('error', `${dir}/ directory missing`);
      }
    }
  }

  // Test 2: Reference Files
  validateReferences() {
    console.log('\n=== Testing Reference Files ===\n');

    const requiredRefs = [
      'owasp-top-10.md',
      'stride-threat-modeling.md',
      'access-control.md',
      'cryptography.md',
      'injection-prevention.md',
      'authentication.md',
      'secure-design.md',
      'misconfiguration.md',
      'ssrf.md',
      'logging-monitoring.md',
      'automated-tools.md',
      'countermeasures.md'
    ];

    const techStackChecklists = [
      'tech-stack-checklist/nodejs.md',
      'tech-stack-checklist/react.md',
      'tech-stack-checklist/python.md',
      'tech-stack-checklist/aws.md',
      'tech-stack-checklist/go.md',
      'tech-stack-checklist/java.md'
    ];

    const allRefs = [...requiredRefs, ...techStackChecklists];

    for (const ref of allRefs) {
      const refPath = path.join(REFERENCE_DIR, ref);
      if (fs.existsSync(refPath)) {
        const stats = fs.statSync(refPath);
        this.log('pass', `${ref} exists (${(stats.size / 1024).toFixed(1)}KB)`);
      } else {
        this.log('warning', `${ref} missing (optional)`);
      }
    }
  }

  // Test 3: Example Files
  validateExamples() {
    console.log('\n=== Testing Example Files ===\n');

    const requiredExamples = [
      'threat-model-ecommerce.md',
      'threat-model-financial-app.md',
      'security-review-node-api.md',
      'security-review-react-app.md',
      'pressure-test-scenarios.md'
    ];

    for (const example of requiredExamples) {
      const examplePath = path.join(EXAMPLES_DIR, example);
      if (fs.existsSync(examplePath)) {
        const stats = fs.statSync(examplePath);
        this.log('pass', `${example} exists (${(stats.size / 1024).toFixed(1)}KB)`);
      } else {
        this.log('error', `${example} missing`);
      }
    }
  }

  // Test 4: Scripts
  validateScripts() {
    console.log('\n=== Testing Scripts ===\n');

    const scripts = ['validate-security.js'];

    for (const script of scripts) {
      const scriptPath = path.join(SCRIPTS_DIR, script);
      if (fs.existsSync(scriptPath)) {
        this.log('pass', `${script} exists`);
        // Check it's executable
        try {
          require(scriptPath); // Syntax check
          this.log('pass', `${script} syntax valid`);
        } catch (e) {
          this.log('error', `${script} has syntax errors: ${e.message}`);
        }
      } else {
        this.log('error', `${script} missing`);
      }
    }
  }

  // Test 5: OWASP Top 10 Coverage in References
  validateOWASPCoverage() {
    console.log('\n=== Testing OWASP Top 10 Coverage ===\n');

    const owaspCategories = [
      'A01: Broken Access Control',
      'A02: Cryptographic Failures',
      'A03: Injection',
      'A04: Insecure Design',
      'A05: Security Misconfiguration',
      'A06: Vulnerable and Outdated Components',
      'A07: Authentication Failures',
      'A08: Software and Data Integrity Failures',
      'A09: Security Logging and Monitoring Failures',
      'A10: Server-Side Request Forgery (SSRF)'
    ];

    // Check which reference files cover which OWASP categories
    const referenceFiles = fs.readdirSync(REFERENCE_DIR).filter(f => f.endsWith('.md'));
    const coverage = {};

    for (const category of owaspCategories) {
      let found = false;
      for (const file of referenceFiles) {
        const content = fs.readFileSync(path.join(REFERENCE_DIR, file), 'utf8');
        if (content.includes(category) || content.includes(category.split(':')[1].trim())) {
          found = true;
          coverage[category] = file;
          break;
        }
      }
      if (found) {
        this.log('pass', `${category} covered in ${coverage[category]}`);
      } else {
        this.log('error', `${category} NOT covered`);
      }
    }
  }

  // Test 6: SKILL.md Quality
  validateSKILLmd() {
    console.log('\n=== Testing SKILL.md Quality ===\n');

    const skillPath = path.join(SKILL_DIR, 'SKILL.md');
    const content = fs.readFileSync(skillPath, 'utf8');

    // Check frontmatter
    if (content.startsWith('---')) {
      this.log('pass', 'YAML frontmatter present');
    } else {
      this.log('error', 'Missing YAML frontmatter');
    }

    // Check required frontmatter fields
    if (content.includes('name:')) {
      this.log('pass', 'name field in frontmatter');
    } else {
      this.log('error', 'name field missing in frontmatter');
    }

    if (content.includes('description:')) {
      this.log('pass', 'description field in frontmatter');
    } else {
      this.log('error', 'description field missing in frontmatter');
    }

    // Check description includes triggers
    const triggers = ['threat model', 'security review', 'vulnerability assessment', 'security audit'];
    let triggersFound = 0;
    for (const trigger of triggers) {
      if (content.toLowerCase().includes(trigger)) {
        triggersFound++;
      }
    }
    if (triggersFound >= 2) {
      this.log('pass', `Description includes trigger keywords (${triggersFound}/${triggers.length})`);
    } else {
      this.log('warning', `Description should include more trigger keywords (${triggersFound}/${triggers.length})`);
    }

    // Check for imperative/third-person instructions in body
    const bodyStart = content.indexOf('---', 3) + 3; // After second ---
    const body = content.slice(bodyStart);

    const imperativePatterns = ['Use this skill', 'Perform', 'Apply', 'Follow', 'Check', 'Verify', 'Validate', 'Identify'];
    let imperativeFound = imperativePatterns.some(p => body.includes(p));

    if (imperativeFound) {
      this.log('pass', 'Body uses imperative form');
    } else {
      this.log('warning', 'Body should use imperative form for instructions');
    }

    // Check size
    const sizeKB = (content.length / 1024).toFixed(1);
    this.log('pass', `SKILL.md size: ${sizeKB}KB`);
    if (content.length > 15000) {
      this.log('warning', 'SKILL.md exceeds recommended 10KB – consider moving details to references');
    }
  }

  // Test 7: Cross-references integrity
  validateCrossReferences() {
    console.log('\n=== Testing Cross-Reference Integrity ===\n');

    // Check SKILL.md references files that exist
    const skillContent = fs.readFileSync(path.join(SKILL_DIR, 'SKILL.md'), 'utf8');
    const refDir = REFERENCE_DIR;
    const examplesDir = EXAMPLES_DIR;
    const scriptsDir = SCRIPTS_DIR;

    // Extract markdown links
    const linkRegex = /\[[^\]]*\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(skillContent)) !== null) {
      const link = match[1];
      if (link.startsWith('http')) continue; // External link

      let linkPath;
      if (link.startsWith('references/')) {
        linkPath = path.join(SKILL_DIR, link);
      } else if (link.startsWith('examples/')) {
        linkPath = path.join(SKILL_DIR, link);
      } else if (link.startsWith('scripts/')) {
        linkPath = path.join(SKILL_DIR, link);
      } else {
        continue;
      }

      if (fs.existsSync(linkPath)) {
        this.log('pass', `Referenced file exists: ${link}`);
      } else {
        this.log('error', `Referenced file missing: ${link}`);
      }
    }
  }

  // Test 8: Pressure Scenario Coverage
  validatePressureScenarios() {
    console.log('\n=== Testing Pressure Scenario Coverage ===\n');

    const scenarioFile = path.join(EXAMPLES_DIR, 'pressure-test-scenarios.md');
    if (!fs.existsSync(scenarioFile)) {
      this.log('error', 'Pressure test scenarios file missing');
      return;
    }

    const content = fs.readFileSync(scenarioFile, 'utf8');

    const expectedScenarios = [
      'Production Breach',
      'Executive Dashboard',
      'Emergency Security Audit',
      'Incident Response',
      'Investor Demo',
      'Code Review Under Pressure',
      'Third-Party Library Emergency',
      'Customer Data Breach',
      'Social Engineering',
      'Rapid API Assessment'
    ];

    for (const scenario of expectedScenarios) {
      if (content.includes(scenario)) {
        this.log('pass', `Scenario: ${scenario}`);
      } else {
        this.log('warning', `Scenario not found: ${scenario}`);
      }
    }

    // Check for time pressure mentions
    if (content.match(/\b\d+\s*hours?\b/gi) || content.match(/\b\d+\s*minutes?\b/gi)) {
      this.log('pass', 'Scenarios include time pressure constraints');
    } else {
      this.log('warning', 'Scenarios should include time pressure constraints');
    }
  }

  // Run all tests
  runAllTests() {
    console.log('╔════════════════════════════════════════════════════╗');
    console.log('║  Security Best Practices Skill Validation         ║');
    console.log('╚════════════════════════════════════════════════════╝');

    this.validateStructure();
    this.validateReferences();
    this.validateExamples();
    this.validateScripts();
    this.validateOWASPCoverage();
    this.validateSKILLmd();
    this.validateCrossReferences();
    this.validatePressureScenarios();

    this.printSummary();
  }

  printSummary() {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log('║  Validation Summary                               ║');
    console.log('╚════════════════════════════════════════════════════╝\n');

    console.log(`✅ Passed:  ${this.passed.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`❌ Errors:   ${this.errors.length}\n`);

    if (this.errors.length === 0) {
      console.log('🎉 All critical checks passed! Skill is ready for packaging.\n');
      console.log('Next steps:');
      console.log('  - Review warnings (if any)');
      console.log('  - Run `scripts/package_skill.py ..` to create .skill file');
      console.log('  - Test with real threat modeling scenarios\n');
      process.exit(0);
    } else {
      console.log('❌ Validation failed. Please fix errors before packaging.\n');
      this.errors.forEach(e => console.log(`  • ${e}`));
      process.exit(1);
    }
  }
}

// Run
const validator = new SecuritySkillValidator();

if (process.argv.includes('--test-all') || process.argv.length <= 2) {
  validator.runAllTests();
} else if (process.argv.includes('--scenario')) {
  const scenarioIndex = process.argv.indexOf('--scenario') + 1;
  if (scenarioIndex < process.argv.length) {
    console.log(`Testing scenario: ${process.argv[scenarioIndex]}`);
    // In real implementation, would load and validate scenario
    console.log('Scenario validation not implemented yet');
  } else {
    console.error('Error: --scenario requires a scenario name');
    process.exit(1);
  }
} else {
  console.log('Usage: node validate-security.js [--test-all] [--scenario <name>]');
  process.exit(1);
}
