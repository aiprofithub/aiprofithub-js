type AIProfitHubTracker = {
  track: (event: {
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    userId?: string;
    customerId?: string;
    feature?: string;
    costUsd?: number;
    metadata?: Record<string, unknown>;
  }) => Promise<void> | void;
};

type OpenAIClientLike = {
  chat: {
    completions: {
      create: (input: Record<string, unknown>) => Promise<{
        model?: string;
        usage?: {
          prompt_tokens?: number;
          completion_tokens?: number;
          total_tokens?: number;
        };
        [key: string]: unknown;
      }>;
    };
  };
};

export function createTrackedOpenAIClient({
  openai,
  tracker,
  defaultFeature = "ai-chat",
}: {
  openai: OpenAIClientLike;
  tracker: AIProfitHubTracker;
  defaultFeature?: string;
}) {
  return {
    chat: {
      completions: {
        async create(input: Record<string, unknown> & {
          model?: string;
          userId?: string;
          customerId?: string;
          feature?: string;
        }) {
          const response = await openai.chat.completions.create(input);
          const model = response.model ?? input.model ?? "unknown";
          const inputTokens = response.usage?.prompt_tokens ?? 0;
          const outputTokens = response.usage?.completion_tokens ?? 0;

          await tracker.track({
            provider: "openai",
            model,
            inputTokens,
            outputTokens,
            userId: input.userId,
            customerId: input.customerId,
            feature: input.feature ?? defaultFeature,
            metadata: {
              source: "openai-cost-wrapper",
              totalTokens: response.usage?.total_tokens ?? inputTokens + outputTokens,
            },
          });

          return response;
        },
      },
    },
  };
}
