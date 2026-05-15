import { createClient } from "aiprofithub-sdk";

type LangChainRunOptions<TInput, TOutput> = {
  provider: string;
  model: string;
  chainName: string;
  input: TInput;
  run: (input: TInput) => Promise<TOutput>;
  estimateTokens: (value: unknown) => number;
  userId?: string;
  customerId?: string;
  feature?: string;
  metadata?: Record<string, unknown>;
};

const aip = createClient({
  apiKey: process.env.AIPROFITHUB_API_KEY ?? "replace-with-your-api-key",
});

export async function trackedLangChainRun<TInput, TOutput>(
  options: LangChainRunOptions<TInput, TOutput>,
) {
  const startedAt = Date.now();
  const output = await options.run(options.input);
  const durationMs = Date.now() - startedAt;

  const inputTokens = options.estimateTokens(options.input);
  const outputTokens = options.estimateTokens(output);

  try {
    await aip.track({
      provider: options.provider,
      model: options.model,
      inputTokens,
      outputTokens,
      userId: options.userId,
      customerId: options.customerId,
      feature: options.feature ?? options.chainName,
      metadata: {
        ...options.metadata,
        framework: "langchain",
        chainName: options.chainName,
        durationMs,
      },
    });
  } catch (error) {
    console.warn("AIProfitHub tracking failed; returning LangChain output anyway.", error);
  }

  return output;
}

function roughTokenEstimate(value: unknown) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return Math.ceil((text ?? "").length / 4);
}

export async function runExample() {
  const output = await trackedLangChainRun({
    provider: "openai",
    model: "gpt-4o-mini",
    chainName: "support-ticket-summary-chain",
    input: "Summarize the last 20 support tickets and identify cost risk.",
    estimateTokens: roughTokenEstimate,
    userId: "user_123",
    customerId: "customer_456",
    feature: "support-insights",
    run: async (input) => {
      // Replace this demo function with your real LangChain Runnable.invoke(input).
      return `Demo LangChain output for: ${input}`;
    },
  });

  console.log(output);
}

// This file exports a reusable wrapper. It does not run the demo automatically on import.
// To test the example manually, call runExample() from your own script.

