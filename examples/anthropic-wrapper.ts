import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "aiprofithub-sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const aip = createClient({
  apiKey: process.env.AIPROFITHUB_API_KEY ?? "replace-with-your-api-key",
});

type TrackedMessageOptions = {
  model: string;
  maxTokens: number;
  messages: Anthropic.Messages.MessageParam[];
  userId?: string;
  customerId?: string;
  feature?: string;
  metadata?: Record<string, unknown>;
};

export async function trackedAnthropicMessage(options: TrackedMessageOptions) {
  const message = await anthropic.messages.create({
    model: options.model,
    max_tokens: options.maxTokens,
    messages: options.messages,
  });

  try {
    await aip.track({
      provider: "anthropic",
      model: options.model,
      inputTokens: message.usage.input_tokens,
      outputTokens: message.usage.output_tokens,
      userId: options.userId,
      customerId: options.customerId,
      feature: options.feature ?? "anthropic-message",
      metadata: {
        ...options.metadata,
        messageId: message.id,
        stopReason: message.stop_reason,
        maxTokens: options.maxTokens,
      },
    });
  } catch (error) {
    console.warn("AIProfitHub tracking failed; returning Anthropic message anyway.", error);
  }

  return message;
}

export async function runExample() {
  const message = await trackedAnthropicMessage({
    model: "claude-3-5-sonnet-latest",
    maxTokens: 400,
    messages: [{ role: "user", content: "Summarize our customer support cost risk." }],
    userId: "user_123",
    customerId: "customer_456",
    feature: "support-insights",
  });

  console.log(message.content);
}

// This file exports a reusable wrapper. It does not run the demo automatically on import.
// To test the example manually, call runExample() from your own script.

