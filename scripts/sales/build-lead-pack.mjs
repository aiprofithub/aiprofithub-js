#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderSubject, renderTemplate, selectTemplate, templates } from "./templates.mjs";

const REQUIRED_COLUMNS = [
  "company",
  "website",
  "category",
  "trigger",
  "contact_email",
  "linkedin_url",
  "source_url",
  "priority",
  "status",
  "notes",
];

const DEFAULT_INPUT = "data/private/leads.csv";
const OUTREACH_DIR = ".sales/outreach";
const LEAD_PACK_PATH = path.join(OUTREACH_DIR, "lead-pack.md");
const REACH_IMPORT_PATH = path.join(OUTREACH_DIR, "reach-import.csv");

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT,
    validateOnly: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--input") {
      args.input = argv[index + 1];
      index += 1;
    } else if (arg === "--validate-only") {
      args.validateOnly = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function parseCsv(content) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(field);
      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }
      field = "";
      row = [];
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((value) => value.trim() !== "")) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    throw new Error("CSV is empty.");
  }

  const headers = rows[0].map((header) => header.trim());
  const records = rows.slice(1).map((values, rowIndex) => {
    const record = {};
    headers.forEach((header, columnIndex) => {
      record[header] = (values[columnIndex] || "").trim();
    });
    record._row = rowIndex + 2;
    return record;
  });

  return { headers, records };
}

function validateColumns(headers) {
  const missing = REQUIRED_COLUMNS.filter((column) => !headers.includes(column));
  if (missing.length > 0) {
    throw new Error(`Missing required columns: ${missing.join(", ")}`);
  }
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function getDomain(lead) {
  const website = String(lead.website || "").trim();
  if (website) {
    try {
      const url = website.includes("://") ? new URL(website) : new URL(`https://${website}`);
      return url.hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      return website
        .replace(/^https?:\/\//i, "")
        .replace(/^www\./i, "")
        .split("/")[0]
        .toLowerCase();
    }
  }

  const email = normalizeEmail(lead.contact_email);
  return email.includes("@") ? email.split("@")[1] : "";
}

function dedupeLeads(records) {
  const seenEmails = new Set();
  const seenDomains = new Set();
  const leads = [];
  const skipped = [];

  for (const record of records) {
    const email = normalizeEmail(record.contact_email);
    const domain = getDomain(record);

    if (email && seenEmails.has(email)) {
      skipped.push({ row: record._row, reason: `duplicate email: ${email}` });
      continue;
    }

    if (domain && seenDomains.has(domain)) {
      skipped.push({ row: record._row, reason: `duplicate domain: ${domain}` });
      continue;
    }

    if (email) {
      seenEmails.add(email);
    }
    if (domain) {
      seenDomains.add(domain);
    }

    leads.push({ ...record, contact_email: email, domain });
  }

  return { leads, skipped };
}

function scoreLead(lead) {
  const category = String(lead.category || "").toLowerCase();
  const trigger = String(lead.trigger || "").toLowerCase();
  const startingPriority = Number.parseInt(lead.priority, 10);
  let score = Number.isInteger(startingPriority) ? Math.min(Math.max(startingPriority, 1), 5) : 2;

  if (category.includes("agent") || category.includes("workflow")) score += 1;
  if (category.includes("observability") || category.includes("eval") || category.includes("gateway")) score += 1;
  if (category.includes("usage-based") || category.includes("usage based")) score += 1;
  if (category.includes("customer-support") || category.includes("customer support") || category.includes("chatbot")) score += 1;
  if (category.includes("ai saas")) score += 1;

  const strongTriggerTerms = [
    "usage-based",
    "usage based",
    "pricing",
    "credits",
    "launch",
    "funding",
    "scale",
    "routing",
    "gateway",
    "eval",
    "support automation",
    "case study",
  ];

  if (strongTriggerTerms.some((term) => trigger.includes(term))) {
    score += 1;
  }

  return Math.min(Math.max(score, 1), 5);
}

function buildOpeningLine(lead) {
  const trigger = lead.trigger || "your recent AI product activity";
  return `I noticed ${lead.company} ${trigger.charAt(0).toLowerCase()}${trigger.slice(1)}.`;
}

function enrichLead(lead) {
  const score = scoreLead(lead);
  const openingLine = buildOpeningLine(lead);
  const template = selectTemplate(lead.category);

  return {
    ...lead,
    score,
    openingLine,
    templateName: template.name,
    subject: renderSubject(template, { ...lead, openingLine }),
    draft: renderTemplate(template, { ...lead, openingLine }),
    followUpSubject: renderSubject(templates.clickedOpenedFollowUp, { ...lead, openingLine }),
    followUpDraft: renderTemplate(templates.clickedOpenedFollowUp, { ...lead, openingLine }),
  };
}

function escapeMarkdown(value) {
  return String(value || "").replaceAll("|", "\\|");
}

function buildLeadPack(leads, skipped) {
  const lines = [
    "# AIProfitHub Outreach Lead Pack",
    "",
    "Generated local draft pack. Review every draft manually before any outreach. This file is not a sending tool.",
    "",
    "## Summary",
    "",
    `- Leads included: ${leads.length}`,
    `- Duplicates skipped: ${skipped.length}`,
    "",
  ];

  if (skipped.length > 0) {
    lines.push("## Skipped Rows", "");
    for (const item of skipped) {
      lines.push(`- Row ${item.row}: ${item.reason}`);
    }
    lines.push("");
  }

  lines.push("## Leads", "");

  for (const lead of leads) {
    lines.push(`### ${lead.company}`);
    lines.push("");
    lines.push(`- Website: ${lead.website}`);
    lines.push(`- Category: ${lead.category}`);
    lines.push(`- Trigger: ${lead.trigger}`);
    lines.push(`- Contact: ${lead.contact_email || "manual review required"}`);
    lines.push(`- Source: ${lead.source_url}`);
    lines.push(`- Score: ${lead.score}/5`);
    lines.push(`- Template: ${lead.templateName}`);
    lines.push(`- Status: ${lead.status || "new"}`);
    lines.push("");
    lines.push("Opening line:");
    lines.push("");
    lines.push(`> ${lead.openingLine}`);
    lines.push("");
    lines.push("Draft:");
    lines.push("");
    lines.push("```text");
    lines.push(`Subject: ${lead.subject}`);
    lines.push("");
    lines.push(lead.draft);
    lines.push("```");
    lines.push("");
    lines.push("Clicked/opened follow-up draft:");
    lines.push("");
    lines.push("```text");
    lines.push(`Subject: ${lead.followUpSubject}`);
    lines.push("");
    lines.push(lead.followUpDraft);
    lines.push("```");
    lines.push("");
  }

  lines.push("## Reach Import Preview", "");
  lines.push("| email | company | website | score | status | notes |");
  lines.push("| --- | --- | --- | --- | --- | --- |");
  for (const lead of leads.filter((item) => item.contact_email)) {
    lines.push(
      `| ${escapeMarkdown(lead.contact_email)} | ${escapeMarkdown(lead.company)} | ${escapeMarkdown(lead.website)} | ${lead.score} | ${escapeMarkdown(lead.status || "new")} | ${escapeMarkdown(lead.notes)} |`,
    );
  }
  lines.push("");

  return `${lines.join("\n")}\n`;
}

function escapeCsv(value) {
  const text = String(value || "");
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function buildReachImportCsv(leads) {
  const headers = ["email", "company", "website", "category", "score", "status", "notes"];
  const rows = leads
    .filter((lead) => lead.contact_email)
    .map((lead) => [
      lead.contact_email,
      lead.company,
      lead.website,
      lead.category,
      lead.score,
      lead.status || "new",
      lead.notes,
    ]);

  return `${[headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const content = await readFile(args.input, "utf8");
  const { headers, records } = parseCsv(content);

  validateColumns(headers);

  const { leads, skipped } = dedupeLeads(records);
  const enrichedLeads = leads.map(enrichLead).sort((a, b) => b.score - a.score);

  if (!args.validateOnly) {
    await mkdir(OUTREACH_DIR, { recursive: true });
    await writeFile(LEAD_PACK_PATH, buildLeadPack(enrichedLeads, skipped), "utf8");
    await writeFile(REACH_IMPORT_PATH, buildReachImportCsv(enrichedLeads), "utf8");
  }

  console.log(`Validated ${records.length} row(s).`);
  console.log(`Included ${enrichedLeads.length} lead(s).`);
  console.log(`Skipped ${skipped.length} duplicate row(s).`);

  if (args.validateOnly) {
    console.log("Validation only; no outreach files written.");
  } else {
    console.log(`Wrote ${LEAD_PACK_PATH}`);
    console.log(`Wrote ${REACH_IMPORT_PATH}`);
  }
  console.log("No emails or DMs were sent.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
