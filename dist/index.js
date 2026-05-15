// src/index.ts
var AIProfitHubClient = class {
  constructor(options) {
    this.options = options;
    if (!options.apiKey) {
      throw new Error("apiKey is required");
    }
  }
  options;
  async track(event) {
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
        "x-api-key": this.options.apiKey
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
          costUsd: event.costUsd
        }
      })
    });
    if (!response.ok) {
      throw new Error("AIProfitHub tracking failed");
    }
    return response.json().catch(() => ({ ok: true }));
  }
};
function createClient(options) {
  return new AIProfitHubClient(options);
}
export {
  AIProfitHubClient,
  createClient
};
