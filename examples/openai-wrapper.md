# OpenAI Wrapper Example

Use this example when your app already calls OpenAI and you want to add AIProfitHub tracking with minimal changes.

## Files

| Example | Purpose |
| --- | --- |
| `openai-wrapper.ts` | Wraps an OpenAI chat completion call and sends usage data to AIProfitHub. |

## What the wrapper tracks

- provider: `openai`
- model
- input tokens
- output tokens
- total tokens
- user attribution
- customer attribution
- feature attribution
- completion id
- extra metadata

## Required environment variables

```txt
OPENAI_API_KEY=your-openai-key
AIPROFITHUB_API_KEY=your-aiprofithub-key
```

## Why this is useful

Most teams start with direct OpenAI calls. That works until cost attribution becomes unclear.

The wrapper adds a thin tracking layer so you can answer:

- which feature created the cost?
- which customer created the cost?
- which model created the cost?
- which workflows should be optimized first?

## Commercial next step

Once OpenAI calls are tracked, use AIProfitHub Cloud to view dashboards, detect anomalies, forecast budget risk, and run optimization agents.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
