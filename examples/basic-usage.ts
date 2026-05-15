import { createClient } from "@aiprofithub/sdk";

const aip = createClient({
  apiKey: process.env.AIPROFITHUB_API_KEY ?? "replace-with-your-api-key",
});

await aip.track({
  provider: "openai",
  model: "gpt-4o-mini",
  inputTokens: 1200,
  outputTokens: 300,
  userId: "user_123",
  customerId: "customer_456",
  feature: "support-chat",
  costUsd: 0.0042,
  metadata: {
    environment: "demo",
    route: "/api/chat",
  },
});

console.log("Usage event sent to AIProfitHub.");
