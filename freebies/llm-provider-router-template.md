# LLM Provider Router Template

Use this as a starter policy for choosing AI providers and models by cost, latency, quality, and customer tier.

## Routing table

| Scenario | Suggested route | Why |
| --- | --- | --- |
| Free-tier chat | low-cost fast model | Protect margin on free usage. |
| Starter customer support chat | low-cost fast model | Good enough for common support flows. |
| Pro customer workflow automation | balanced model | Balance output quality and cost. |
| Enterprise reasoning task | premium reasoning model | Prioritize quality when contract value supports it. |
| Extraction or summarization | low-cost fast model | These tasks often do not need premium models. |
| High-risk customer-facing response | balanced or premium model | Reduce answer quality risk. |
| Monthly budget almost used | cheapest acceptable model | Keep service available without overspending. |

## Minimum route metadata

Every routed request should include:

- provider
- model
- customerId
- userId when available
- feature
- routeReason
- inputTokens
- outputTokens
- costUsd when available

## Example route decision JSON

```json
{
  "provider": "openai",
  "model": "gpt-4o-mini",
  "routeReason": "starter_support_chat_low_cost",
  "feature": "support-chat",
  "customerId": "customer_123"
}
```

## Starter policy

1. Use low-cost models for summarization, extraction, and free-tier chat.
2. Use balanced models for paid customer workflows.
3. Use premium models only for high-value reasoning or enterprise tasks.
4. Add budget alerts before changing routes globally.
5. Review customer-level margin before offering unlimited AI usage.
