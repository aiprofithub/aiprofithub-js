# Customer Margin Risk Template

Use this table to compare customer revenue against estimated AI cost.

| customerId | plan | monthlyRevenueUsd | monthlyAiCostUsd | aiCostRatio | marginRisk | recommendedAction |
| --- | --- | ---: | ---: | ---: | --- | --- |
| customer_001 | pro | 499 | 42.50 | 0.085 | low | Monitor weekly. |
| customer_002 | growth | 99 | 28.20 | 0.285 | high | Review feature usage and add budget guardrails. |
| customer_003 | enterprise | 2500 | 380.00 | 0.152 | medium | Route low-risk tasks to cheaper models. |
| customer_004 | starter | 29 | 7.80 | 0.269 | high | Reduce context window or cap daily messages. |

## Formula

```txt
aiCostRatio = monthlyAiCostUsd / monthlyRevenueUsd
```

## Suggested risk bands

| Ratio | Risk |
| ---: | --- |
| Under 10% | low |
| 10% - 25% | medium |
| Over 25% | high |

## What to track

- customerId
- plan
- monthly revenue
- AI cost by customer
- AI cost by feature
- top model by cost
- top feature by cost
