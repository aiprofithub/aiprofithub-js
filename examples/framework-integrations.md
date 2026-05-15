# Framework Integration Examples

Use these examples when you want to copy AIProfitHub tracking into a real app route.

## Available examples

| Example | Use it when |
| --- | --- |
| `nextjs-route-handler.ts` | You use Next.js App Router route handlers. |
| `express-route.ts` | You use Express or an Express-style Node API. |

## What the examples do

Each route:

1. accepts AI usage details from a request body
2. validates `model`, `inputTokens`, and `outputTokens`
3. sends a usage event to AIProfitHub
4. attaches framework, route, customer, user, feature, and environment metadata

## Required environment variable

```txt
AIPROFITHUB_API_KEY=your-key
```

## Recommended payload

```json
{
  "provider": "openai",
  "model": "gpt-4o-mini",
  "inputTokens": 1200,
  "outputTokens": 300,
  "userId": "user_123",
  "customerId": "customer_456",
  "feature": "support-chat",
  "costUsd": 0.0042
}
```

## Commercial next step

Once your app route sends real usage events, use AIProfitHub Cloud to find the expensive customers, features, routes, and models.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai

