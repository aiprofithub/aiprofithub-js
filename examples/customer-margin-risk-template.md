# Customer Margin Risk Template

Use this free template to identify customers whose AI usage may be compressing gross margin.

This template is a planning document. AIProfitHub Cloud turns real usage events into customer-level cost attribution, margin risk dashboards, alerts, audit reports, and optimization workflows.

## Core question

```txt
Is this customer profitable after AI usage cost?
```

Track AI cost by customer before usage scales. A customer can look healthy in revenue and still be margin-negative if AI cost is not attributed correctly.

## Required customer metrics

| Metric | Example | Why it matters |
| --- | ---: | --- |
| Monthly revenue | $499 | Baseline customer value. |
| Monthly AI cost | $142 | Direct AI cost exposure. |
| AI cost as revenue % | 28.5% | Shows margin pressure. |
| Top cost-driving feature | support-chat | Shows where optimization starts. |
| Top model route | premium-support-route | Shows routing risk. |
| Output token share | 64% | Reveals hidden answer-length cost. |

## Risk bands

| AI cost as revenue % | Risk | Action |
| ---: | --- | --- |
| 0% - 10% | Low | Keep tracking and review monthly. |
| 10% - 20% | Watch | Inspect feature usage and prompt/output growth. |
| 20% - 40% | Margin risk | Review model routes, output limits, and feature budgets. |
| 40%+ | High risk | Escalate to founder, finance, and customer success. |

## Customer margin worksheet

```txt
customerId: customer_456
plan: growth
monthlyRevenueUsd: 499
monthlyAiCostUsd: 142
aiCostRevenuePercent: 28.5
riskBand: Margin risk
topFeature: support-chat
topModelRoute: premium-support-route
recommendedAction: Review support-chat routing and output token limits.
```

## Investigation checklist

### 1. Is one feature driving most cost?

Check:

- support chat
- document processing
- contract review
- agent workflows
- summarization
- internal assistant usage

### 2. Is premium routing overused?

Check:

- premium models used on low-risk workflows
- fallback rate to expensive models
- trial accounts using premium routes
- customer-facing routes without output limits

### 3. Are output tokens growing faster than requests?

Check:

- prompt template changes
- verbose responses
- missing response length guardrails
- repeated context stuffing

### 4. Is the customer worth the AI cost?

Check:

- plan tier
- revenue per customer
- expansion potential
- renewal timing
- customer success priority

## Alert policy

```txt
IF customer_ai_cost >= 20% of customer_mrr
THEN flag margin risk and notify customer success

IF customer_ai_cost >= 40% of customer_mrr
THEN notify founder, finance, and engineering

IF customerPlan = trial AND customer_ai_cost > trial_daily_limit
THEN route to sales/customer-success review
```

## Recommended tracking fields

Required:

- provider
- model
- inputTokens
- outputTokens

Recommended:

- customerId
- userId
- feature
- route
- plan
- costUsd
- fallbackReason
- qualitySignal
- metadata

## Commercial next step

This template helps you reason about customer margin. AIProfitHub Cloud calculates it continuously using real usage data and shows which customers, features, and model routes are compressing margin.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
