#!/usr/bin/env node

import fs from "node:fs";

const inputPath = process.argv[2] ?? "usage.csv";
const outputPath = process.argv[3] ?? "ai-spend-audit-report.md";

if (!fs.existsSync(inputPath)) {
  console.error(`Missing input file: ${inputPath}`);
  console.error("Expected CSV columns: provider,model,customerId,feature,inputTokens,outputTokens,costUsd");
  process.exit(1);
}

const rows = fs.readFileSync(inputPath, "utf8").trim().split(/\r?\n/);
const headers = rows.shift().split(",").map((item) => item.trim());
const records = rows.filter(Boolean).map((row) => {
  const values = row.split(",");
  return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
});

function groupBy(key) {
  const groups = new Map();
  for (const record of records) {
    const groupKey = record[key] || "unknown";
    const cost = Number(record.costUsd || 0);
    groups.set(groupKey, (groups.get(groupKey) ?? 0) + cost);
  }
  return [...groups.entries()].sort((a, b) => b[1] - a[1]);
}

function table(title, entries) {
  return [
    `## ${title}`,
    "",
    "| Name | Estimated cost |",
    "| --- | ---: |",
    ...entries.slice(0, 10).map(([name, cost]) => `| ${name} | $${cost.toFixed(4)} |`),
    "",
  ].join("\n");
}

const totalCost = records.reduce((sum, record) => sum + Number(record.costUsd || 0), 0);
const totalInputTokens = records.reduce((sum, record) => sum + Number(record.inputTokens || 0), 0);
const totalOutputTokens = records.reduce((sum, record) => sum + Number(record.outputTokens || 0), 0);

const report = [
  "# AI Spend Audit Report",
  "",
  `Generated from: ${inputPath}`,
  "",
  "## Summary",
  "",
  `- Events analyzed: ${records.length}`,
  `- Estimated total cost: $${totalCost.toFixed(4)}`,
  `- Input tokens: ${totalInputTokens}`,
  `- Output tokens: ${totalOutputTokens}`,
  "",
  table("Cost by provider", groupBy("provider")),
  table("Cost by model", groupBy("model")),
  table("Cost by customer", groupBy("customerId")),
  table("Cost by feature", groupBy("feature")),
  "## Recommended next actions",
  "",
  "- Add customerId and feature to every production AI request.",
  "- Add alert thresholds for daily and monthly spend.",
  "- Review the top 3 features by cost before optimizing models.",
  "- Compare customer-level AI cost against revenue to find margin risk.",
  "",
  "Production SDK: https://github.com/aiprofithub/aiprofithub-js",
  "AI Spend Audit: https://aiprofithub.ai/get-audit",
  "",
].join("\n");

fs.writeFileSync(outputPath, report);
console.log(`Wrote ${outputPath}`);
