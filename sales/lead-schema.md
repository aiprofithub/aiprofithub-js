# Lead CSV Schema

The local lead input file is `data/private/leads.csv`. Keep real lead data private and out of git.

Required columns:

| Column | Description |
| --- | --- |
| `company` | Company or product name. |
| `website` | Company website URL or domain. |
| `category` | One of: AI SaaS, LLM observability, AI agents, customer-support AI, usage-based AI product. |
| `trigger` | Specific reason this company may care about AI spend audits. |
| `contact_email` | Company/team inbox when available. Prefer role-based addresses over personal emails. |
| `linkedin_url` | Company LinkedIn URL or blank. |
| `source_url` | URL where the trigger was found. |
| `priority` | Optional starting priority from 1-5. The script recalculates a score. |
| `status` | Lead status, such as new, reviewed, approved, contacted, opened, clicked, replied, unsubscribed, rejected. |
| `notes` | Internal notes for manual review. |

Do not store secrets, API tokens, private contact exports, or unrelated personal data in this file.
