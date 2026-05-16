# Copy-paste AI cost tracking recipes

Use these snippets as starting points for tagging AI usage by provider, model, customer, feature, and estimated cost.

> Replace placeholder values before using in production. Do not commit API keys, customer secrets, raw prompts, private URLs, or provider credentials.

## 1. Minimal usage event

```ts
import { createClient } from "aiprofithub-sdk";

const aiProfitHub = createClient({
  apiKey: process.env.AIPROFITHUB_API_KEY,
});

await aiProfitHub.trackUsage({
  provider: "openai",
  model: "gpt-4o-mini",
  inputTokens: 1200,
  outputTokens: 300,
  userId: "user_123",
  customerId: "customer_456",
  feature: "support-chat",
  costUsd: 0.0042,
});
```

## 2. Customer margin event

```ts
await aiProfitHub.trackUsage({
  provider: "anthropic",
  model: "claude-3-5-haiku",
  inputTokens: 2400,
  outputTokens: 650,
  userId: "user_support_agent_12",
  customerId: "acme_corp",
  feature: "ticket-summary",
  costUsd: 0.018,
  metadata: {
    plan: "growth",
    monthlyRevenueUsd: 99,
    requestSource: "dashboard",
  },
});
```

## 3. Feature-level attribution

```ts
const feature = "ai-report-builder";

await aiProfitHub.trackUsage({
  provider: "openai",
  model: "gpt-4o-mini",
  inputTokens: usage.promptTokens,
  outputTokens: usage.completionTokens,
  customerId: account.id,
  userId: user.id,
  feature,
  metadata: {
    route: "/api/reports/generate",
    environment: process.env.NODE_ENV,
  },
});
```

## 4. Background job tracking

```ts
await aiProfitHub.trackUsage({
  provider: "openai",
  model: "gpt-4o-mini",
  inputTokens: job.usage.inputTokens,
  outputTokens: job.usage.outputTokens,
  customerId: job.customerId,
  feature: "nightly-insights-worker",
  metadata: {
    jobId: job.id,
    queue: "insights",
    async: true,
  },
});
```

## 5. Suggested event tagging rules

| Tag | Use it for |
| --- | --- |
| `provider` | OpenAI, Anthropic, Google, Groq, Mistral, or custom provider. |
| `model` | The exact model name used for the request. |
| `customerId` | The paying account, workspace, team, or organization. |
| `userId` | The end user or actor that triggered the request. |
| `feature` | The product feature, workflow, route, or agent that caused usage. |
| `costUsd` | Estimated or known request cost when available. |
| `metadata.plan` | Pricing plan or contract tier. |
| `metadata.route` | App route or API endpoint where the AI request happened. |

## 6. Start with these metrics

- AI cost by customer
- AI cost by feature
- AI cost by model
- AI cost as percentage of customer revenue
- Highest-cost users or workspaces
- Cost spikes by route, provider, or model
- Requests missing customer or feature tags
