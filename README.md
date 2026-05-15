# AIProfitHub JavaScript SDK

Public SDK starter for sending AI usage events into AIProfitHub Cloud.

## Install

npm install @aiprofithub/sdk

## Quick start

Create an AIProfitHub API key, then send usage events with provider, model, token counts, user, customer, and feature metadata.

Required fields:

- provider
- model
- inputTokens
- outputTokens

Example event:

- provider: openai
- model: gpt-4o-mini
- inputTokens: 1200
- outputTokens: 300
- userId: user_123
- customerId: customer_456
- feature: support-chat

## Commercial path

The SDK is free. AIProfitHub Cloud is the paid product.

- AI Spend Audit: https://aiprofithub.ai/get-audit
- App dashboard: https://app.aiprofithub.ai/onboarding
- Docs: https://docs.aiprofithub.ai

## Do not publish

Do not publish backend source, billing logic, private dashboards, production env files, or secrets.
