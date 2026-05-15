# LangChain Wrapper Example

Use this example when your app already uses LangChain and you want to add AIProfitHub tracking around chains, runnables, agents, or workflow steps.

## Files

| Example | Purpose |
| --- | --- |
| `langchain-wrapper.ts` | Wraps a LangChain-style async run and sends usage data to AIProfitHub. |

## What the wrapper tracks

- provider
- model
- estimated input tokens
- estimated output tokens
- chain name
- duration
- user attribution
- customer attribution
- feature attribution
- extra metadata

## Required environment variable

```txt
AIPROFITHUB_API_KEY=your-aiprofithub-key
```

## Safety behavior

The wrapper is safe to import. It exports `trackedLangChainRun()` and `runExample()`, but does not run a chain automatically at module load time.

The LangChain output remains the primary result. If AIProfitHub tracking fails because of a temporary network issue, bad tracking key, or ingest error, the wrapper logs a warning and still returns the chain output.

## Token estimation note

LangChain integrations vary by model provider and runtime. This example uses a rough token estimator so the tracking pattern is easy to copy.

For production, replace `estimateTokens` with your provider's usage metadata, callback data, tokenizer, or model response usage fields when available.

## Why this is useful

LangChain apps often hide cost inside chains, tools, agents, and feature workflows.

The wrapper adds a thin tracking layer so you can answer:

- which chain created the cost?
- which feature created the cost?
- which customer created the cost?
- which model or provider should be optimized first?

## Commercial next step

Once LangChain workflows are tracked, use AIProfitHub Cloud to view dashboards, detect anomalies, forecast budget risk, and run optimization agents.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
