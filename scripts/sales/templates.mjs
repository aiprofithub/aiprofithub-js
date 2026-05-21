export const templates = {
  agentWorkflow: {
    name: "AI agent/workflow startup",
    subject: "AI spend audit for {company}",
    body: `Hi team,

{openingLine}

AIProfitHub helps teams running agent and workflow products find avoidable AI spend across model choice, retries, tool calls, and usage attribution.

Would it be useful if I put together a lightweight AI Spend Audit outline for {company}?`,
  },
  observability: {
    name: "LLM observability/evals/gateway tool",
    subject: "Spend visibility angle for {company}",
    body: `Hi team,

{openingLine}

AIProfitHub audits AI spend patterns across model routing, eval runs, gateway usage, and customer-level cost attribution.

If useful, I can send a short draft audit checklist tailored to {company}.`,
  },
  customerSupport: {
    name: "AI customer support/chatbot company",
    subject: "AI support cost audit for {company}",
    body: `Hi team,

{openingLine}

AIProfitHub helps support-AI teams spot cost leaks from high-volume conversations, fallback models, retries, and unprofitable customer segments.

Would a quick AI Spend Audit outline be useful for {company}?`,
  },
  usageBasedSaas: {
    name: "Usage-based AI SaaS",
    subject: "Usage-based AI margin check for {company}",
    body: `Hi team,

{openingLine}

AIProfitHub helps usage-based AI SaaS teams connect AI API cost to plans, features, and customers so margin leaks are easier to catch.

Would you be open to reviewing a short AI Spend Audit outline for {company}?`,
  },
  general: {
    name: "General AI SaaS",
    subject: "AI spend audit for {company}",
    body: `Hi team,

{openingLine}

AIProfitHub helps AI product teams find wasted AI spend and map model cost back to customers, plans, and features.

Would a short AI Spend Audit outline be useful for {company}?`,
  },
  clickedOpenedFollowUp: {
    name: "Clicked/opened follow-up",
    subject: "Re: AI spend audit for {company}",
    body: `Hi team,

Following up because there may be interest in the AI Spend Audit note for {company}.

The most useful first pass is usually a quick review of model usage, retry behavior, customer-level cost, and plan margin.

Should I send over a concise audit outline for manual review?`,
  },
};

export function selectTemplate(category) {
  const normalized = String(category || "").toLowerCase();

  if (normalized.includes("agent") || normalized.includes("workflow")) {
    return templates.agentWorkflow;
  }

  if (
    normalized.includes("observability") ||
    normalized.includes("eval") ||
    normalized.includes("gateway")
  ) {
    return templates.observability;
  }

  if (
    normalized.includes("customer-support") ||
    normalized.includes("customer support") ||
    normalized.includes("chatbot")
  ) {
    return templates.customerSupport;
  }

  if (normalized.includes("usage-based") || normalized.includes("usage based")) {
    return templates.usageBasedSaas;
  }

  if (normalized.includes("ai saas")) {
    return templates.usageBasedSaas;
  }

  return templates.general;
}

export function renderTemplate(template, lead) {
  return template.body
    .replaceAll("{company}", lead.company)
    .replaceAll("{openingLine}", lead.openingLine);
}

export function renderSubject(template, lead) {
  return template.subject.replaceAll("{company}", lead.company);
}
