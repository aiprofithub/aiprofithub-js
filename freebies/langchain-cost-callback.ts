type TrackEvent = {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  userId?: string;
  customerId?: string;
  feature?: string;
  metadata?: Record<string, unknown>;
};

type Tracker = {
  track: (event: TrackEvent) => Promise<void> | void;
};

type CallbackOptions = {
  tracker: Tracker;
  userId?: string;
  customerId?: string;
  feature?: string;
};

export class AIProfitHubLangChainCostCallback {
  name = "AIProfitHubLangChainCostCallback";
  options: CallbackOptions;

  constructor(options: CallbackOptions) {
    this.options = options;
  }

  async handleLLMEnd(output: any) {
    const usage = output?.llmOutput?.tokenUsage ?? output?.llmOutput?.estimatedTokenUsage ?? {};

    await this.options.tracker.track({
      provider: "langchain",
      model: output?.llmOutput?.modelName ?? "unknown",
      inputTokens: usage.promptTokens ?? 0,
      outputTokens: usage.completionTokens ?? 0,
      userId: this.options.userId,
      customerId: this.options.customerId,
      feature: this.options.feature ?? "langchain-flow",
      metadata: {
        source: "langchain-cost-callback",
      },
    });
  }
}

// Example:
// const callbacks = [
//   new AIProfitHubLangChainCostCallback({
//     tracker: client,
//     customerId: "customer_123",
//     feature: "support-agent",
//   }),
// ];
