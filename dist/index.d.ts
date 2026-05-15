type TrackEvent = {
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
type ClientOptions = {
    apiKey: string;
    endpoint?: string;
};
declare class AIProfitHubClient {
    private readonly options;
    constructor(options: ClientOptions);
    track(event: TrackEvent): Promise<any>;
}
declare function createClient(options: ClientOptions): AIProfitHubClient;

export { AIProfitHubClient, type ClientOptions, type TrackEvent, createClient };
