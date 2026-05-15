# Provider Router Decision Guide

Use this free guide when you need to decide which AI provider or model route should handle a workflow.

This is a lightweight decision framework. AIProfitHub Cloud and Optimizer use real usage data, budget signals, customer attribution, and quality feedback to recommend routing changes.

## Routing principle

Do not send every AI task to the most expensive model by default.

Route by:

- task risk
- customer value
- feature importance
- expected output quality
- latency requirement
- token volume
- margin impact

## Decision table

| Workflow type | Risk | Suggested route | What to track |
| --- | --- | --- | --- |
| FAQ answer | Low | Low-cost model | feature, inputTokens, outputTokens, customerId |
| Tagging / classification | Low | Low-cost model | feature, model, accuracy signal |
| Summarization | Low to medium | Low-cost or mid-tier model | outputTokens, feature, route |
| Internal draft | Medium | Mid-tier model | userId, feature, approval signal |
| Customer-facing support | Medium | Mid-tier with fallback | customerId, feature, latency, quality signal |
| Legal / finance reasoning | High | Premium model | customerId, risk level, review status |
| Enterprise customer workflow | High | Premium or guarded route | customerId, plan, feature, margin impact |
| Agent planning / tool use | High | Premium model with budget guard | chainName, tool usage, durationMs |

## Simple routing rules

### Rule 1: Low-risk tasks should not start on premium models

Good candidates for cheaper routes:

- summarization
- classification
- keyword extraction
- short FAQ responses
- internal drafts
- metadata generation

### Rule 2: Customer-facing high-value tasks deserve stronger routing

Use better models when:

- the customer is on a high-value plan
- the workflow affects revenue
- incorrect output would create support load
- the user is near renewal or expansion

### Rule 3: Output tokens can hide margin leaks

Long answers often create hidden cost. Track output tokens by feature and customer.

### Rule 4: Use fallback routes deliberately

A fallback is useful when a cheaper model fails quality checks. It is dangerous when every request silently falls back to the expensive model.

Track:

- original route
- fallback route
- fallback reason
- customerId
- feature

## Example routing policy

```txt
IF feature = support-chat AND customerPlan = trial
THEN use low-cost route with strict output limit

IF feature = contract-review AND customerPlan = enterprise
THEN use premium route with audit logging

IF outputTokens increase > 30% week over week
THEN inspect prompt template and response length

IF fallback rate > 15%
THEN review model choice or prompt quality
```

## Metrics to send to AIProfitHub

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

## Commercial next step

This guide helps you reason about routing. AIProfitHub Optimizer turns real usage into routing recommendations and savings opportunities.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
