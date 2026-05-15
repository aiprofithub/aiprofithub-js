# Anthropic Wrapper Example

Use this example when your app already calls Anthropic Claude and you want to add AIProfitHub tracking with minimal changes.

## Files

| Example | Purpose |
| --- | --- |
| `anthropic-wrapper.ts` | Wraps an Anthropic Messages API call and sends usage data to AIProfitHub. |

## What the wrapper tracks

- provider: `anthropic`
- model
- input tokens
- output tokens
- user attribution
- customer attribution
- feature attribution
- message id
- stop reason
- extra metadata

## Required environment variables

```txt
ANTHROPIC_API_KEY=your-anthropic-key
AIPROFITHUB_API_KEY=your-aiprofithub-key
```

## Safety behavior

The wrapper is safe to import. It exports `trackedAnthropicMessage()` and `runExample()`, but does not run an Anthropic request automatically at module load time.

The Anthropic message remains the primary result. If AIProfitHub tracking fails because of a temporary network issue, bad tracking key, or ingest error, the wrapper logs a warning and still returns the completed Anthropic response.

## Why this is useful

Most teams start with direct Claude calls. That works until cost attribution becomes unclear.

The wrapper adds a thin tracking layer so you can answer:

- which feature created the cost?
- which customer created the cost?
- which model created the cost?
- which workflows should be optimized first?

## Commercial next step

Once Anthropic calls are tracked, use AIProfitHub Cloud to view dashboards, detect anomalies, forecast budget risk, and run optimization agents.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
