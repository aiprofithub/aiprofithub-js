# GitHub Action: AI Cost Check

Use this free CI pattern to catch AI cost risk before code reaches production.

This is a lightweight example. AIProfitHub Cloud provides the paid control plane for real usage data, budget alerts, audits, agents, and optimization workflows.

## What it checks

The example workflow scans changed source files for common AI provider usage patterns and reminds the team to add usage tracking when AI code changes.

It looks for strings such as:

- `openai`
- `anthropic`
- `gpt-`
- `claude-`
- `generateText`
- `chat.completions`
- `inputTokens`
- `outputTokens`

## Example workflow

Create `.github/workflows/ai-cost-check.yml` in your app repository:

```yaml
name: AI Cost Check

on:
  pull_request:
    branches: [main]

jobs:
  ai-cost-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Scan changed files for AI usage
        shell: bash
        run: |
          set -euo pipefail

          base_sha="${{ github.event.pull_request.base.sha }}"
          head_sha="${{ github.event.pull_request.head.sha }}"

          changed_files=$(git diff --name-only "$base_sha" "$head_sha" -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.py' '*.md')

          if [ -z "$changed_files" ]; then
            echo "No relevant files changed."
            exit 0
          fi

          echo "Changed files:"
          echo "$changed_files"

          matches=$(echo "$changed_files" | xargs grep -nEi 'openai|anthropic|gpt-|claude-|generateText|chat\.completions|inputTokens|outputTokens' || true)

          if [ -z "$matches" ]; then
            echo "No obvious AI usage changes found."
            exit 0
          fi

          echo "AI usage indicators found:"
          echo "$matches"
          echo ""
          echo "Recommendation: add AIProfitHub usage tracking with model, inputTokens, outputTokens, customerId, and feature metadata."
          echo "Get audit: https://aiprofithub.ai/get-audit"
          echo "Docs: https://docs.aiprofithub.ai"
```

## Decision rule

| PR signal | Recommended action |
| --- | --- |
| New AI provider call | Add AIProfitHub tracking. |
| New model name | Confirm model cost and routing. |
| New feature using AI | Add `feature` metadata. |
| Customer-facing workflow | Add `customerId` attribution. |
| Token usage changed | Review budget and alert thresholds. |

## Better with AIProfitHub Cloud

This free workflow is a reminder. AIProfitHub Cloud gives you the real operating loop:

1. Track actual usage events.
2. Attribute cost by model, customer, user, and feature.
3. Detect spikes and anomalies.
4. Forecast budget risk.
5. Generate audit reports and optimization recommendations.

## Commercial next step

- Get an AI Spend Audit: https://aiprofithub.ai/get-audit
- Create an account: https://app.aiprofithub.ai/onboarding
- Read docs: https://docs.aiprofithub.ai
