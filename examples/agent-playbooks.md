# AIProfitHub Agent Playbooks

These are sample outputs for the 9 production AIProfitHub product agents.

They are free examples for evaluation. They do not expose internal agent logic, prompts, infrastructure, or private product code.

## Agent map

| Agent | Sample business output |
| --- | --- |
| `cost-anomaly` | Detect abnormal AI cost spikes. |
| `budget-forecast` | Forecast month-end spend vs budget. |
| `model-optimizer` | Recommend lower-cost model or route options. |
| `churn-prediction` | Estimate customer churn risk. |
| `silent-churn-email` | Draft customer re-engagement email. |
| `lead-qualification` | Score and tier inbound leads. |
| `revenue-advisor` | Recommend revenue and margin opportunities. |
| `cost-intelligence` | Produce deep cost analysis and action plan. |
| `customer-success` | Score customer health and suggest next-best action. |

## 1. Cost Anomaly Agent

### Sample finding

AI usage for `support-chat` increased 64% over the 7-day baseline while request count increased only 18%.

### Likely causes

- longer generated answers
- premium model used for low-risk support workflows
- repeated requests from a small customer segment

### Recommended action

- add feature-level budget alert
- inspect output token growth
- test lower-cost routing for repeat support intents

## 2. Budget Forecast Agent

### Sample forecast

Current monthly budget: `$10,000`

Projected month-end spend: `$13,850`

Forecast status: `Over budget by 38.5%`

### Recommended action

- lower trial usage limits
- add warning at 70% and 90% budget usage
- review top three cost-driving features before month-end

## 3. Model Optimizer Agent

### Sample recommendation

Move low-risk summarization, tagging, and FAQ responses from premium model routing to a lower-cost route.

### Expected result

- lower cost per request
- limited quality impact for low-risk tasks
- premium model reserved for high-value reasoning

## 4. Churn Prediction Agent

### Sample signal

Customer `customer_456` shows high cost-to-revenue pressure and declining product engagement.

### Recommended action

- schedule customer-success review
- show feature-level AI cost value
- offer optimization support before renewal

## 5. Silent Churn Email Agent

### Sample email angle

Subject: Quick check on your AI usage efficiency

Message angle:

- acknowledge recent usage growth
- offer to review AI cost drivers
- suggest an optimization session
- route customer to audit or dashboard review

## 6. Lead Qualification Agent

### Sample output

Lead score: `82 / 100`

Tier: `High intent`

Why:

- running AI product in production
- clear cost visibility pain
- multiple model providers
- needs customer-level attribution

Recommended next step:

- offer AI Spend Audit
- ask for monthly AI spend range
- ask which workflows use premium models

## 7. Revenue Advisor Agent

### Sample opportunity

Enterprise trial accounts generate high AI usage before paid conversion.

### Recommended action

- add trial usage limits
- package usage analytics as a paid upgrade
- prioritize high-usage accounts for sales follow-up

## 8. Cost Intelligence Agent

### Sample action plan

1. Track all requests with customer and feature attribution.
2. Rank features by monthly AI cost.
3. Identify premium model routes used in low-risk workflows.
4. Add anomaly alerts for sudden usage spikes.
5. Review cost per customer against revenue per customer.

## 9. Customer Success Agent

### Sample health summary

Customer health: `Medium risk`

Signals:

- usage growing faster than revenue
- support feature drives most AI spend
- no budget alert configured

Next-best action:

- schedule optimization review
- share top feature cost drivers
- recommend dashboard alerts

## Commercial next step

These playbooks show example outputs. AIProfitHub Cloud runs the agents on real usage data and turns findings into dashboards, alerts, audit reports, and optimization workflows.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai

