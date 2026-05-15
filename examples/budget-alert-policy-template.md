# Budget Alert Policy Template

Use this free template to define when your team should get warned about AI spend risk.

This template is a planning document. AIProfitHub Cloud turns these policies into live dashboards, budget alerts, anomaly detection, audit reports, and optimization workflows.

## Alert levels

| Level | Trigger | Owner | Action |
| --- | --- | --- | --- |
| Info | 50% of monthly AI budget used | Product or engineering lead | Review top features and models. |
| Warning | 70% of monthly AI budget used | Engineering lead | Inspect feature-level usage and customer attribution. |
| Critical | 90% of monthly AI budget used | Founder, finance, engineering | Freeze risky experiments and review premium model routes. |
| Overrun | 100%+ of monthly AI budget used | Founder, finance | Approve continued spend or enforce route limits. |

## Policy 1: Monthly budget threshold

```txt
IF monthly_ai_spend >= 50% of budget
THEN notify product owner

IF monthly_ai_spend >= 70% of budget
THEN notify engineering lead

IF monthly_ai_spend >= 90% of budget
THEN notify founder and finance owner

IF monthly_ai_spend >= 100% of budget
THEN require approval for high-cost routes
```

## Policy 2: Feature budget threshold

```txt
IF feature_ai_spend >= 30% of total monthly AI spend
THEN inspect feature usage, prompt size, output tokens, and model route
```

Recommended metadata:

- feature
- provider
- model
- inputTokens
- outputTokens
- route
- fallbackReason

## Policy 3: Customer margin threshold

```txt
IF customer_ai_cost >= 20% of customer_mrr
THEN flag margin risk

IF customer_ai_cost >= 40% of customer_mrr
THEN require customer-success review
```

Recommended metadata:

- customerId
- plan
- feature
- costUsd
- inputTokens
- outputTokens

## Policy 4: Trial usage guardrail

```txt
IF customerPlan = trial AND daily_ai_cost > trial_daily_limit
THEN notify sales and customer success
```

Recommended action:

- route trial workflows to lower-cost models
- limit output length
- require upgrade for heavy usage
- inspect support/chat workflows first

## Policy 5: Anomaly detection

```txt
IF feature_spend_today > 2x 7_day_average
THEN notify engineering lead

IF output_tokens_today > 1.5x 7_day_average
THEN inspect prompt/template changes

IF fallback_rate > 15%
THEN inspect model routing and quality checks
```

## Policy 6: Premium model route guardrail

```txt
IF premium_model_used AND feature_risk = low
THEN review route selection

IF premium_model_used AND customerPlan = trial
THEN require approval or reroute to cheaper model
```

## Recommended alert channels

| Channel | Best for |
| --- | --- |
| Slack | Engineering and product alerts. |
| Email | Founder, finance, and weekly summaries. |
| Webhook | Automated workflows and internal ops. |
| Dashboard | Daily review and trend analysis. |

## Minimum tracking fields

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
- fallbackReason
- qualitySignal
- costUsd
- metadata

## Commercial next step

This policy helps you decide what to monitor. AIProfitHub Cloud monitors it continuously and sends alerts before the provider bill becomes a surprise.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
