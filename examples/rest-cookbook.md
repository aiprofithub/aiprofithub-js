# AIProfitHub REST / cURL Cookbook

Use this cookbook when you want to send AI usage events without the JavaScript SDK.

This is useful for:

- Python apps
- backend services
- workers
- cron jobs
- low-code tools
- quick API tests
- teams that want to validate the ingest contract before installing an SDK

## Endpoint

```txt
POST https://api.aiprofithub.ai/v1/usage
```

## Required headers

```txt
content-type: application/json
x-api-key: YOUR_AIPROFITHUB_API_KEY
```

## Required body fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `model` | string | Yes | Model name used for the AI request. |
| `inputTokens` | number | Yes | Prompt/input tokens. |
| `outputTokens` | number | Yes | Generated/output tokens. |
| `userId` | string | No | User attribution. |
| `metadata` | object | No | Provider, feature, customer, trace, or extra context. |

## Basic cURL example

```bash
curl -X POST "https://api.aiprofithub.ai/v1/usage" \
  -H "content-type: application/json" \
  -H "x-api-key: $AIPROFITHUB_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "inputTokens": 1200,
    "outputTokens": 300,
    "userId": "user_123",
    "metadata": {
      "provider": "openai",
      "customerId": "customer_456",
      "feature": "support-chat",
      "costUsd": 0.0042
    }
  }'
```

## Feature attribution example

Use this when you want to find which product feature burns the most AI budget.

```json
{
  "model": "gpt-4o-mini",
  "inputTokens": 900,
  "outputTokens": 250,
  "userId": "user_123",
  "metadata": {
    "provider": "openai",
    "feature": "document-summary",
    "customerId": "customer_456",
    "route": "/api/summarize"
  }
}
```

## Customer margin example

Use this when you need customer-level cost visibility.

```json
{
  "model": "claude-3-5-sonnet",
  "inputTokens": 2400,
  "outputTokens": 800,
  "userId": "user_789",
  "metadata": {
    "provider": "anthropic",
    "customerId": "enterprise_trial_001",
    "feature": "contract-review",
    "plan": "trial"
  }
}
```

## Decision path

1. Send one usage event with cURL.
2. Confirm the event appears in AIProfitHub Cloud.
3. Add `customerId` and `feature` to metadata.
4. Use the calculator to estimate spend risk.
5. Read the sample audit report.
6. Turn on dashboards, alerts, and optimization workflows.

## Commercial next step

If you can send one event, you can measure real spend. The next question is where the money is leaking.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
