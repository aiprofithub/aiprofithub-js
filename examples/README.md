# AIProfitHub Free Examples

These examples help developers send AI usage data into AIProfitHub Cloud quickly.

## Available examples

| Example | Use it when |
| --- | --- |
| `basic-usage.ts` | You want the smallest possible event tracking example. |
| `rest-cookbook.md` | You want to test the usage API with REST or cURL before installing an SDK. |
| `github-action-ai-cost-check.md` | You want a CI reminder when pull requests add AI cost risk. |
| `cost-calculator.html` | You want to estimate monthly AI cost and margin risk before connecting data. |
| `cost-calculator.md` | You want the decision guide for using the calculator. |
| `sample-ai-spend-audit-report.md` | You want to see what a paid AI Spend Audit can return. |
| `agent-playbooks.md` | You want to preview sample outputs from the 9 AIProfitHub product agents. |

## Decision path

1. Install the SDK or test the REST API with cURL.
2. Send one usage event.
3. Add the GitHub Action cost check to catch future AI usage changes.
4. Estimate spend with the calculator.
5. Read the sample audit report.
6. Review the agent playbooks.
7. Add `customerId` and `feature` to identify cost drivers.
8. Use the dashboard, audit, alerts, agents, and optimization workflow to reduce spend.

## What to send

Required:

- provider
- model
- inputTokens
- outputTokens

Recommended:

- userId
- customerId
- feature
- costUsd
- metadata

## Commercial next step

If the examples work, the next question is not whether tracking works. It is where the money is leaking and which agent should act first.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
