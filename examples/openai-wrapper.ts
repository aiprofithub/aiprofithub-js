import OpenAI from "openai";
import { createClient } from "@aiprofithub/sdk";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const aip = createClient({
  apiKey: process.env.AIPROFITHUB_API_KEY ?? "replace-with-your-api-key",
});

type TrackedChatOptions = {
  model: string;
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  userId?: string;
  customerId?: string;
  feature?: string;
  metadata?: Record<string, unknown>;
};

export async function trackedChatCompletion(options: TrackedChatOptions) {
  const completion = await openai.chat.completions.create({
    model: options.model,
    messages: options.messages,
  });

  const usage = completion.usage;

  try {
    await aip.track({
      provider: "openai",
      model: options.model,
      inputTokens: usage?.prompt_tokens ?? 0,
      outputTokens: usage?.completion_tokens ?? 0,
      userId: options.userId,
      customerId: options.customerId,
      feature: options.feature ?? "openai-chat-completion",
      metadata: {
        ...options.metadata,
        totalTokens: usage?.total_tokens,
        completionId: completion.id,
        systemFingerprint: completion.system_fingerprint,
      },
    });
  } catch (error) {
    console.warn("AIProfitHub tracking failed; returning OpenAI completion anyway.", error);
  }

  return completion;
}

export async function runExample() {
  const completion = await trackedChatCompletion({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Summarize our support ticket trend." }],
    userId: "user_123",
    customerId: "customer_456",
    feature: "support-insights",
  });

  console.log(completion.choices[0]?.message?.content);
}

// This file exports a reusable wrapper. It does not run the demo automatically on import.
// To test the example manually, call runExample() from your own script.
