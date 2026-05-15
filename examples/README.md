# AIProfitHub Free Examples

These examples help developers send AI usage data into AIProfitHub Cloud quickly.

## Available examples

| Example | Use it when |
| --- | --- |
| `basic-usage.ts` | You want the smallest possible event tracking example. |
| `openai-wrapper.ts` | You already use OpenAI chat completions and want automatic usage tracking. |
| `openai-wrapper.md` | You want the guide for wrapping OpenAI calls with AIProfitHub tracking. |
| `anthropic-wrapper.ts` | You already use Anthropic Claude messages and want automatic usage tracking. |
| `anthropic-wrapper.md` | You want the guide for wrapping Claude calls with AIProfitHub tracking. |
| `framework-integrations.md` | You want to copy tracking into Next.js or Express routes. |
| `nextjs-route-handler.ts` | You use Next.js App Router route handlers. |
| `express-route.ts` | You use Express or an Express-style Node API. |
| `rest-cookbook.md` | You want to test the usage API with REST or cURL before installing an SDK. |
| `github-action-ai-cost-check.md` | You want a CI reminder when pull requests add AI cost risk. |
| `cost-calculator.html` | You want to estimate monthly AI cost and margin risk before connecting data. |
| `cost-calculator.md` | You want the decision guide for using the calculator. |
| `sample-ai-spend-audit-report.md` | You want to see what a paid AI Spend Audit can return. |
| `agent-playbooks.md` | You want to preview sample outputs from the 9 AIProfitHub product agents. |

## Decision path

1. Install the SDK or test the REST API with cURL.
2. Wrap existing OpenAI or Anthropic calls, or copy the Next.js/Express route example into your app.
3. Send one usage event.
4. Add the GitHub Action cost check to catch future AI usage changes.
5. Estimate spend with the calculator.
6. Read the sample audit report.
7. Review the agent playbooks.
8. Add `customerId` and `feature` to identify cost drivers.
9. Use the dashboard, audit, alerts, agents, and optimization workflow to reduce spend.

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
