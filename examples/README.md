# AIProfitHub Free Examples

These examples help developers send AI usage data into AIProfitHub Cloud quickly.

## Available examples

| Example | Use it when |
| --- | --- |
| `basic-usage.ts` | You want the smallest possible event tracking example. |

## Decision path

1. Install the SDK.
2. Send one usage event.
3. Confirm it appears in AIProfitHub Cloud.
4. Add `customerId` and `feature` to identify cost drivers.
5. Use the dashboard, audit, alerts, and optimization workflow to reduce spend.

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

If the example works, the next question is not whether tracking works. It is where the money is leaking.

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
