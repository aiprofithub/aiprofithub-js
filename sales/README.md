# AIProfitHub Sales Agent v1

This is a local, human-reviewed sales workflow for finding AI Spend Audit customers. It creates lead scoring notes, personalized opening lines, and outreach drafts. It does not send email, DMs, or automated messages.

## Workflow

1. Collect trigger-based leads in `data/private/leads.csv`.
   Focus on companies showing buying triggers around AI SaaS, LLM observability, AI agents, customer-support AI, and usage-based AI products.
2. Score leads with:
   ```sh
   npm run sales:leadpack
   ```
3. Review `.sales/outreach/lead-pack.md` manually.
   Edit or reject drafts before any outreach.
4. Import only approved contacts into Hostinger Reach using `.sales/outreach/reach-import.csv`.
5. Follow up only with opened, clicked, or replied leads.
   Use the follow-up template as a review draft, not an auto-send.

## Safety

- Review every draft manually.
- Do not send to unsubscribed contacts.
- Do not use scraped personal emails without a lawful basis.
- Respect unsubscribe and opt-out requests.
- Prefer company/team inboxes or contact forms.

## Private Data

Do not commit real leads, personal emails, private contact lists, API tokens, or secrets. Private sales inputs and generated packs are ignored by git:

- `data/private/`
- `.sales/`
- `.env.local`
- `*.leadpack.local.csv`

Use `data/private/leads.example.csv` only as a fake-data template.
