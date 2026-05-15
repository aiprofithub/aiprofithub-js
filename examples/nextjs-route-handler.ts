import { createClient } from "@aiprofithub/sdk";
import { NextResponse } from "next/server";

const aip = createClient({
  apiKey: process.env.AIPROFITHUB_API_KEY ?? "replace-with-your-api-key",
});

export async function POST(request: Request) {
  const body = await request.json();

  const inputTokens = Number(body.inputTokens ?? 0);
  const outputTokens = Number(body.outputTokens ?? 0);

  if (!body.model || inputTokens <= 0 || outputTokens <= 0) {
    return NextResponse.json(
      { error: "model, inputTokens, and outputTokens are required" },
      { status: 400 },
    );
  }

  await aip.track({
    provider: body.provider ?? "openai",
    model: body.model,
    inputTokens,
    outputTokens,
    userId: body.userId,
    customerId: body.customerId,
    feature: body.feature ?? "nextjs-api-route",
    costUsd: body.costUsd,
    metadata: {
      framework: "nextjs",
      route: "/api/ai/usage",
      environment: process.env.NODE_ENV,
    },
  });

  return NextResponse.json({ ok: true });
}
