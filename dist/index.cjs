"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AIProfitHubClient: () => AIProfitHubClient,
  createClient: () => createClient
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AIProfitHubClient,
  createClient
});
