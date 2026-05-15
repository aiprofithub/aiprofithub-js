# AIProfitHub JavaScript SDK

Track AI model usage, token volume, customer attribution, feature attribution, and cost signals from JavaScript or TypeScript apps.

<p align="center">
  <strong>AI cost visibility for apps using OpenAI, Anthropic, Google, Mistral, Groq, LangChain, and custom LLM flows.</strong>
</p>

<p align="center">
  <a href="https://aiprofithub.ai/get-audit"><strong>Get an AI Spend Audit</strong></a>
  ·
  <a href="https://app.aiprofithub.ai/onboarding"><strong>Create an account</strong></a>
  ·
  <a href="https://docs.aiprofithub.ai"><strong>Read the docs</strong></a>
</p>

## Visual flow

```mermaid
flowchart LR
  A[Your app] --> B[AIProfitHub SDK]
  B --> C[Usage ingest]
  C --> D[AIProfitHub Cloud]
  D --> E[Cost dashboard]
  D --> F[Budget alerts]
  D --> G[Audit report]
  D --> H[Optimization recommendations]
```

## What this SDK does

AIProfitHub helps teams see where AI spend is going before the bill becomes a surprise.

Use this SDK to send usage events from your app into AIProfitHub Cloud:

- model used
- input and output token counts
- user, customer, and feature attribution
- provider and cost metadata
- usage data for dashboards, alerts, audits, and optimization

## Install

npm install @aiprofithub/sdk

## Quick start

Import `createClient` from `@aiprofithub/sdk`, then send usage events with provider, model, token counts, user, customer, and feature metadata.

Required fields:

- provider
- model
- inputTokens
- outputTokens

Example event:

- provider: openai
- model: gpt-4o-mini
- inputTokens: 1200
- outputTokens: 300
- userId: user_123
- customerId: customer_456
- feature: support-chat
- costUsd: 0.0042

## Free examples

Start here if you want to test the SDK before connecting a full app:

- `examples/basic-usage.ts` — smallest working usage tracking example
- `examples/openai-wrapper.ts` — wrapper for tracking OpenAI chat completions
- `examples/openai-wrapper.md` — guide for adding usage tracking around OpenAI calls
- `examples/anthropic-wrapper.ts` — wrapper for tracking Anthropic Claude messages
- `examples/anthropic-wrapper.md` — guide for adding usage tracking around Claude calls
- `examples/langchain-wrapper.ts` — wrapper for tracking LangChain-style runs and chains
- `examples/langchain-wrapper.md` — guide for adding usage tracking around LangChain workflows
- `examples/provider-router-decision-guide.md` — guide for choosing provider/model routes by cost, risk, and margin
- `examples/budget-alert-policy-template.md` — policy template for AI budget thresholds, anomaly alerts, and route guardrails
- `examples/framework-integrations.md` — Next.js and Express app route integration guide
- `examples/nextjs-route-handler.ts` — copyable Next.js route handler example
- `examples/express-route.ts` — copyable Express route example
- `examples/rest-cookbook.md` — REST and cURL examples for non-JavaScript teams
- `examples/github-action-ai-cost-check.md` — CI reminder for AI cost risk in pull requests
- `examples/cost-calculator.html` — browser-based AI spend and margin risk calculator
- `examples/cost-calculator.md` — guide for turning estimated spend into an audit decision
- `examples/sample-ai-spend-audit-report.md` — sample report showing what paid audits deliver
- `examples/agent-playbooks.md` — sample outputs from the 9 AIProfitHub product agents
- `examples/README.md` — decision path from free tracking to paid AIProfitHub Cloud

## Required fields

| Field | Required | Why it matters |
| --- | --- | --- |
| provider | Yes | Groups spend by AI provider. |
| model | Yes | Shows which models create cost. |
| inputTokens | Yes | Measures prompt volume. |
| outputTokens | Yes | Measures generated output volume. |
| userId | No | Attributes usage to an app user. |
| customerId | No | Attributes usage to a paying customer. |
| feature | No | Shows which product feature drives spend. |
| costUsd | No | Lets you pass known cost estimates. |
| metadata | No | Adds extra trace context for audits. |

## Decision guide

| You need to... | Use this SDK? | Next action |
| --- | --- | --- |
| Track AI calls from a JavaScript app | Yes | Install the SDK and send track events. |
| Wrap OpenAI chat completions | Yes | Use `examples/openai-wrapper.md`. |
| Wrap Anthropic Claude messages | Yes | Use `examples/anthropic-wrapper.md`. |
| Track LangChain workflows | Yes | Use `examples/langchain-wrapper.md`. |
| Choose model/provider routes | Yes | Use `examples/provider-router-decision-guide.md`. |
| Define AI budget alert policy | Yes | Use `examples/budget-alert-policy-template.md`. |
| Copy tracking into a Next.js or Express route | Yes | Use `examples/framework-integrations.md`. |
| Test API ingest without the SDK | Yes | Use `examples/rest-cookbook.md`. |
| Add a PR reminder for AI cost risk | Yes | Use `examples/github-action-ai-cost-check.md`. |
| Estimate monthly AI spend before connecting data | Yes | Open `examples/cost-calculator.html`. |
| See what an audit report looks like before buying | Yes | Read `examples/sample-ai-spend-audit-report.md`. |
| See sample agent outputs before buying | Yes | Read `examples/agent-playbooks.md`. |
| Find which customer or feature burns the most AI budget | Yes | Send customerId and feature with each event. |
| Get a one-time cost leak report | Yes | Start with an AI Spend Audit. |
| Replace your generic log stack | No | Use AIProfitHub for AI cost intelligence, not generic logs. |
| Open source your private SaaS backend | No | Keep backend, billing, and dashboard code private. |

## When users should buy AIProfitHub Cloud

The SDK is free. The paid value is the control plane around the data.

Buy AIProfitHub when you need to:

- stop surprise AI bills
- attribute AI cost by customer or feature
- detect abnormal model usage
- prepare finance-ready AI spend reports
- reduce AI cost without guessing
- protect product margin as usage grows

## Safety notes

Do not commit credentials, environment files, backend source, billing logic, or private dashboard code into public repositories.

## Commercial path

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai

## License

MIT
