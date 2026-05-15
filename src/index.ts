export type TrackEvent = {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd?: number;
  userId?: string;
  customerId?: string;
  feature?: string;
  metadata?: Record<string, unknown>;
};

export type ClientOptions = {
  apiKey: string;
  endpoint?: string;
};

export class AIProfitHubClient {
  constructor(private readonly options: ClientOptions) {
    if (!options.apiKey) {
      throw new Error("apiKey is required");
    }
  }

  async track(event: TrackEvent) {
    if (!event.provider || !event.model) {
      throw new Error("provider and model are required");
    }

    if (!Number.isFinite(event.inputTokens) || !Number.isFinite(event.outputTokens)) {
      throw new Error("inputTokens and outputTokens are required");
    }

    const endpoint = this.options.endpoint ?? "https://api.aiprofithub.ai/v1/usage";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": this.options.apiKey,
      },
      body: JSON.stringify({
        model: event.model,
        inputTokens: event.inputTokens,
        outputTokens: event.outputTokens,
        userId: event.userId,
        metadata: {
          ...event.metadata,
          provider: event.provider,
          customerId: event.customerId,
          feature: event.feature,
          costUsd: event.costUsd,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("AIProfitHub tracking failed");
    }

    return response.json().catch(() => ({ ok: true }));
  }
}

export function createClient(options: ClientOptions) {
  return new AIProfitHubClient(options);
}
