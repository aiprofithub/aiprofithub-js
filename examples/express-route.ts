import express from "express";
import { createClient } from "aiprofithub-sdk";

const app = express();

app.use(express.json());

const aip = createClient({
  apiKey: process.env.AIPROFITHUB_API_KEY ?? "replace-with-your-api-key",
});

app.post("/api/ai/usage", async (request, response) => {
  try {
    const body = request.body;
    const inputTokens = Number(body.inputTokens ?? 0);
    const outputTokens = Number(body.outputTokens ?? 0);

    if (!body.model || inputTokens <= 0 || outputTokens <= 0) {
      response.status(400).json({ error: "model, inputTokens, and outputTokens are required" });
      return;
    }

    await aip.track({
      provider: body.provider ?? "openai",
      model: body.model,
      inputTokens,
      outputTokens,
      userId: body.userId,
      customerId: body.customerId,
      feature: body.feature ?? "express-api-route",
      costUsd: body.costUsd,
      metadata: {
        framework: "express",
        route: "/api/ai/usage",
        environment: process.env.NODE_ENV,
      },
    });

    response.json({ ok: true });
  } catch (error) {
    response.status(500).json({ error: "failed to track AI usage" });
  }
});

app.listen(3000, () => {
  console.log("Example server listening on http://localhost:3000");
});

