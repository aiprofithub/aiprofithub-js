# Sample AI Spend Audit Report

This is a sample report format for teams evaluating AIProfitHub.

The numbers below are demo numbers. Replace them with real usage data from AIProfitHub Cloud or your own provider exports.

## Executive summary

| Metric | Demo value | Why it matters |
| --- | ---: | --- |
| Estimated monthly AI spend | $8,420 | Baseline cost exposure. |
| Projected month-end spend | $11,760 | Shows overrun risk before invoice day. |
| Budget overrun risk | 38% over budget | Indicates whether action is urgent. |
| Top cost-driving feature | Support chat | Shows where optimization starts. |
| Top cost-driving customer segment | Enterprise trial users | Reveals margin risk by segment. |
| Estimated quick-win savings | $2,150/month | Immediate reduction opportunity. |

## Top findings

### 1. Support chat is the largest AI cost driver

Support chat generates 46% of monthly AI usage but only 21% of expansion revenue in this demo dataset.

Recommended action:

- add feature-level budget alerts
- route simple support questions to a lower-cost model
- cache repeated answer patterns
- review long prompt templates

### 2. Premium model usage is leaking into low-value workflows

The premium model is used for summarization, tagging, and FAQ responses where a lower-cost model would likely be enough.

Recommended action:

- classify workflows by risk and value
- route low-risk tasks to cheaper models
- keep premium models for high-value reasoning or customer-facing edge cases

### 3. Trial users create margin risk before conversion

Trial users account for 33% of token usage but have not converted to paid accounts yet.

Recommended action:

- set trial usage budgets
- alert when trial users exceed expected usage
- show AI usage cost in customer-success review

### 4. Output tokens are driving hidden cost growth

Output tokens are growing faster than request count, which often means prompts are asking the model to produce more than the product needs.

Recommended action:

- tighten response length rules
- add output token budgets by feature
- monitor output-token trends weekly

## Cost leak map

| Area | Risk | Demo signal | First fix |
| --- | --- | --- | --- |
| Feature cost | High | Support chat dominates spend | Add feature attribution and budget alerts |
| Model routing | High | Premium model used for simple jobs | Add cheaper route options |
| Customer margin | Medium | Trial users use heavy tokens | Add customer-level budgets |
| Prompt design | Medium | Output tokens rising faster than requests | Shorten responses and templates |
| Forecasting | Medium | Month-end spend exceeds budget | Add forecast alerts |

## Optimization plan

### Week 1: Instrument and segment

- track every AI request
- send `customerId`, `feature`, `model`, `inputTokens`, and `outputTokens`
- group usage by customer and product feature

### Week 2: Alert and control

- set monthly budget thresholds
- add anomaly alerts for sudden spikes
- create separate budgets for trials, support, and production workflows

### Week 3: Optimize model routing

- identify low-risk workflows
- test cheaper model routes
- compare output quality and cost reduction

### Week 4: Review margin impact

- compare AI cost per customer against revenue per customer
- flag accounts with negative or compressed margin
- prioritize optimization by customer value

## Recommended dashboard views

- cost by model
- cost by feature
- cost by customer
- cost by user
- budget forecast
- anomaly timeline
- optimization opportunities

## Commercial next step

This sample report is free. A real AIProfitHub audit uses your actual usage data and returns a prioritized action plan.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
