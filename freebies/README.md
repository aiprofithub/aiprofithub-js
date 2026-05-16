# AIProfitHub Freebie Pack

Free tools and templates for builders shipping AI features with OpenAI, Anthropic, LangChain, and other LLM providers.

These assets are designed to help teams catch AI cost risk before it becomes a surprise bill.

## Assets

| Asset | Use it when |
| --- | --- |
| `ai-cost-check-action/` | You want a GitHub Action that comments on pull requests when AI cost risk appears. |
| `ai-cost-calculator-cli/` | You want a small CLI-style calculator for estimating monthly AI spend. |
| `langchain-cost-callback.ts` | You use LangChain and want a simple cost attribution callback pattern. |
| `nextjs-ai-usage-middleware.ts` | You use Next.js route handlers and want a reusable tracking wrapper. |
| `openai-cost-wrapper.ts` | You use the OpenAI SDK and want a drop-in attribution wrapper. |
| `ai-spend-audit-report-generator.mjs` | You want to generate a lightweight AI spend audit report from usage rows. |
| `customer-margin-risk-template.csv` | You want to compare customer revenue against estimated AI cost. |
| `llm-provider-router-template.ts` | You want simple routing rules for cost, latency, and risk. |
| `budget-alert-policy-pack.yaml` | You want starter thresholds for AI budget alerts. |
| `ai-cost-benchmark-dataset.csv` | You want sample data for testing dashboards or calculators. |

## Recommended funnel

1. Add AI cost risk checks to pull requests.
2. Estimate monthly AI spend with the calculator.
3. Add request-level attribution with the SDK.
4. Move production reporting into AIProfitHub Cloud when you need dashboards, alerts, and reports.

## Main SDK

```bash
npm install aiprofithub-sdk
```

Repo: https://github.com/aiprofithub/aiprofithub-js

AI Spend Audit: https://aiprofithub.ai/get-audit
