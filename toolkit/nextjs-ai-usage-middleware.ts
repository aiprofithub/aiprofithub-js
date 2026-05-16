type Tracker = {
  track: (event: {
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    userId?: string;
    customerId?: string;
    feature?: string;
    metadata?: Record<string, unknown>;
  }) => Promise<void> | void;
};

type TrackedHandlerResult = {
  response: Response;
  inputTokens?: number;
  outputTokens?: number;
  userId?: string;
  customerId?: string;
  metadata?: Record<string, unknown>;
};

export function withAIUsageTracking<TBody>({
  tracker,
  provider,
  model,
  feature,
  handler,
}: {
  tracker: Tracker;
  provider: string;
  model: string;
  feature: string;
  handler: (body: TBody) => Promise<TrackedHandlerResult>;
}) {
  return async function POST(request: Request): Promise<Response> {
    const body = (await request.json()) as TBody;
    const result = await handler(body);

    await tracker.track({
      provider,
      model,
      inputTokens: result.inputTokens ?? 0,
      outputTokens: result.outputTokens ?? 0,
      userId: result.userId,
      customerId: result.customerId,
      feature,
      metadata: {
        source: "nextjs-ai-usage-middleware",
        ...result.metadata,
      },
    });

    return result.response;
  };
}

// Example:
//
// export const POST = withAIUsageTracking({
//   tracker: client,
//   provider: "openai",
//   model: "gpt-4o-mini",
//   feature: "support-chat",
//   async handler(body) {
//     const completion = await openai.chat.completions.create(...);
//
//     return {
//       response: Response.json({ ok: true }),
//       inputTokens: completion.usage?.prompt_tokens,
//       outputTokens: completion.usage?.completion_tokens,
//       customerId: body.customerId,
//     };
//   },
// });