#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const budget = Number(args.get("--budget") ?? "500");
const failOnRisk = args.get("--fail-on-risk") === "true";
const roots = String(args.get("--paths") ?? ".").split(/\s+/).filter(Boolean);

const providerPatterns = [
  /from\s+["']openai["']/i,
  /new\s+OpenAI\s*\(/i,
  /@anthropic-ai\/sdk/i,
  /from\s+["']langchain/i,
  /from\s+["']@langchain/i,
  /ChatOpenAI/i,
  /Anthropic/i,
  /chat\.completions\.create/i,
  /messages\.create/i,
];

const attributionPatterns = [/customerId/i, /userId/i, /feature/i, /inputTokens/i, /outputTokens/i, /costUsd/i, /model/i];
const allowedExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".py"]);
const ignoredDirs = new Set([".git", "node_modules", "dist", "build", ".next", "coverage"]);

function walk(target) {
  if (!fs.existsSync(target)) return [];
  const stats = fs.statSync(target);
  if (stats.isFile()) return [target];
  const files = [];
  for (const entry of fs.readdirSync(target)) {
    if (ignoredDirs.has(entry)) continue;
    files.push(...walk(path.join(target, entry)));
  }
  return files;
}

const findings = [];
for (const root of roots) {
  for (const file of walk(root)) {
    if (!allowedExtensions.has(path.extname(file))) continue;
    const content = fs.readFileSync(file, "utf8");
    const providerHits = providerPatterns.filter((pattern) => pattern.test(content));
    if (providerHits.length === 0) continue;
    const attributionHits = attributionPatterns.filter((pattern) => pattern.test(content));
    findings.push({ file, attributionScore: attributionHits.length });
  }
}

if (findings.length === 0) {
  console.log("✅ AI Cost Check: no obvious AI provider calls detected.");
  process.exit(0);
}

console.log("## AI Cost Risk Check");
console.log("");
console.log(`Monthly budget hint: $${Number.isFinite(budget) ? budget : 500}`);
console.log("");
console.log("Detected files that appear to call OpenAI, Anthropic, LangChain, or similar AI providers:");
console.log("");
for (const finding of findings) {
  const risk = finding.attributionScore >= 4 ? "lower" : finding.attributionScore >= 2 ? "medium" : "higher";
  console.log(`- ${finding.file} — attribution coverage: ${finding.attributionScore}/7, risk: ${risk}`);
}
console.log("");
console.log("Recommended before production:");
console.log("");
console.log("- Attach provider, model, inputTokens, outputTokens.");
console.log("- Attach userId, customerId, and feature where possible.");
console.log("- Add budget alerts before usage scales.");
console.log("- Track customer margin risk, not only provider invoice totals.");
console.log("");
console.log("Free SDK: https://github.com/aiprofithub/aiprofithub-js");

const highRisk = findings.some((finding) => finding.attributionScore < 2);
if (failOnRisk && highRisk) {
  process.exit(1);
}
