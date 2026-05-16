#!/usr/bin/env node

import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const modelPricingPerMillion = {
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-4o": { input: 5, output: 15 },
  "claude-3-5-sonnet": { input: 3, output: 15 },
  "claude-3-haiku": { input: 0.25, output: 1.25 },
};

function money(value) {
  return `$${value.toFixed(2)}`;
}

function estimate({ model, requests, inputTokens, outputTokens }) {
  const pricing = modelPricingPerMillion[model] ?? modelPricingPerMillion["gpt-4o-mini"];
  const inputCost = (requests * inputTokens * pricing.input) / 1_000_000;
  const outputCost = (requests * outputTokens * pricing.output) / 1_000_000;
  return inputCost + outputCost;
}

const rl = readline.createInterface({ input, output });

const model = await rl.question("Model [gpt-4o-mini]: ") || "gpt-4o-mini";
const requests = Number(await rl.question("Monthly AI requests [100000]: ") || "100000");
const inputTokens = Number(await rl.question("Average input tokens per request [1200]: ") || "1200");
const outputTokens = Number(await rl.question("Average output tokens per request [300]: ") || "300");
const customers = Number(await rl.question("Paying customers [100]: ") || "100");
const revenuePerCustomer = Number(await rl.question("Monthly revenue per customer USD [49]: ") || "49");

rl.close();

const monthlyCost = estimate({ model, requests, inputTokens, outputTokens });
const revenue = customers * revenuePerCustomer;
const costPerCustomer = customers > 0 ? monthlyCost / customers : monthlyCost;
const aiCostRatio = revenue > 0 ? monthlyCost / revenue : 0;
const marginRisk = aiCostRatio > 0.25 ? "high" : aiCostRatio > 0.1 ? "medium" : "low";
const alertThreshold = monthlyCost * 1.25;

console.log("\nAI Cost Estimate");
console.log("================");
console.log(`Model: ${model}`);
console.log(`Estimated monthly AI cost: ${money(monthlyCost)}`);
console.log(`Cost per customer: ${money(costPerCustomer)}`);
console.log(`AI cost / revenue ratio: ${(aiCostRatio * 100).toFixed(1)}%`);
console.log(`Margin risk: ${marginRisk}`);
console.log(`Suggested first alert threshold: ${money(alertThreshold)}`);
console.log("\nWant request-level attribution?");
console.log("npm install aiprofithub-sdk");
