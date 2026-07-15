# Deployment Runbook

This project deploys to Cloudflare Workers with OpenNext.

## Production Target

- Domain: `https://www.samyun-wan.life`
- Apex route: `https://samyun-wan.life`
- Worker: `samyun-wan-life`
- Cloudflare account ID: `9de6a912443a2cbf7e72218953f0a746`
- Cloudflare zone ID: `84cc150f31676be5a7c18ed5057438d2`
- Routes:
  - `samyun-wan.life/*`
  - `www.samyun-wan.life/*`

`wrangler.jsonc` pins the production `account_id`. Keep it pinned so deploys fail loudly instead of uploading the Worker to the wrong Cloudflare account.

## Important Auth Rule

The Windows environment may contain `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` values for a different Cloudflare account. Those variables can make Wrangler upload successfully to the wrong account while the live domain stays unchanged.

Before production deploys in PowerShell, clear those variables in the current shell:

```powershell
$env:CLOUDFLARE_API_TOKEN=$null
$env:CLOUDFLARE_ACCOUNT_ID=$null
```

Then verify the active Cloudflare identity:

```powershell
npx wrangler whoami
```

The account must be:

```text
3lak3vatv@gmail.com's Account
9de6a912443a2cbf7e72218953f0a746
```

If `whoami` shows another account, run:

```powershell
npx wrangler login
```

In the browser, select the Cloudflare account that owns `samyun-wan.life`. Then rerun `npx wrangler whoami` and confirm the account ID above.

## Pre-Deploy Checks

Run these from the repository root:

```powershell
npm run typecheck
npm run lint
npm run build
```

The repository documents pnpm commands, but this machine has had a broken pnpm shim before. Use npm if pnpm fails locally.

## Deploy

Use Wrangler directly after clearing the wrong Cloudflare env vars:

```powershell
$env:CLOUDFLARE_API_TOKEN=$null
$env:CLOUDFLARE_ACCOUNT_ID=$null
npx wrangler deploy
```

Successful output must include:

```text
Uploaded samyun-wan-life
Deployed samyun-wan-life triggers
  samyun-wan.life/* (zone name: samyun-wan.life)
  www.samyun-wan.life/* (zone name: samyun-wan.life)
```

## Verify Live Site

Check that the live HTML is served by Cloudflare/OpenNext and references the new app chunk:

```powershell
$u='https://www.samyun-wan.life/hy?deploy_check=' + [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$r=Invoke-WebRequest -Uri $u -UseBasicParsing -MaximumRedirection 5 -TimeoutSec 30
$r.StatusCode
$r.Headers['x-opennext']
[regex]::Match($r.Content,'page-[a-f0-9]+\.js').Value
```

Also verify the matched chunk URL returns `200`.

## Known Wrong Paths

- Do not rely on GitHub push alone; this repository currently has no GitHub Actions workflow for production deploys.
- Do not use Netlify for the main `samyun-wan.life` production site.
- Do not deploy with Cloudflare account `4a3828e23806d9a0393e02f168b1c60d` or `1a389caecbf069441f7d7fff8e2ca6a2`; those are not the production account for this domain.
