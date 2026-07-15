# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 14, TypeScript, and Tailwind CSS application for the Samyun Wan Armenia site. Route files live in `src/app`, with localized pages under `src/app/[lang]`. Reusable UI is in `src/components`, hooks in `src/hooks`, contexts in `src/context`, integrations in `src/services` and `src/integrations`, and helpers in `src/utils` and `src/lib`. Site constants and SEO settings live in `src/config`; product, blog, and testimonial data live in `src/data`. Markdown content is in `content/blogs`, locale strings are in `src/i18n/locales`, static assets are in `public`, and image/build utilities are in `scripts`.

## Build, Test, and Development Commands

Use the README-documented pnpm workflow.

- `pnpm install` installs dependencies.
- `pnpm run dev` starts the local Next.js dev server.
- `pnpm run build` creates a production build and runs postbuild sitemap/robots tasks.
- `pnpm run start` serves the production build locally.
- `pnpm run lint` runs Next.js ESLint checks.
- `pnpm run typecheck` runs `tsc --noEmit`.
- `pnpm run optimize-images` generates optimized assets from `public/images` into `public/optimized`.
- `pnpm run cf:preview` builds and previews the Cloudflare/OpenNext output.

## Production Deployment

The production site is a Cloudflare Workers/OpenNext deployment for `samyun-wan.life`.
Before deploying, read `docs/deployment.md`.

Critical Cloudflare details:

- Worker name: `samyun-wan-life`.
- Production account ID: `9de6a912443a2cbf7e72218953f0a746`.
- Production zone ID: `84cc150f31676be5a7c18ed5057438d2`.
- Routes: `samyun-wan.life/*` and `www.samyun-wan.life/*`.
- `wrangler.jsonc` intentionally pins the production `account_id`.

Do not deploy with a `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` that points to another Cloudflare account. In PowerShell, clear them for the current shell before deploying:

```powershell
$env:CLOUDFLARE_API_TOKEN=$null
$env:CLOUDFLARE_ACCOUNT_ID=$null
npx wrangler whoami
```

`wrangler whoami` must show account `9de6a912443a2cbf7e72218953f0a746`. If it does not, run `npx wrangler login` and select the Cloudflare account that owns `samyun-wan.life`.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, LF endings, and a final newline. Use TypeScript strict mode and prefer the `@/` path alias for imports from `src`. Components should be arrow functions, and component files use PascalCase such as `HeroSection.tsx`; hooks use `useX.ts`. Keep JSX self-closing where possible and avoid unnecessary JSX curly braces. Tailwind utility classes are the default styling approach, with shared CSS in `src/styles`.

## UI/UX Design Work

For any visual design, UI polish, layout, responsive, accessibility, color, typography, animation, or component UX task, use the installed Codex skill `ui-ux-pro-max`. It is installed from `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill` and should guide professional design decisions for this site.

Before redesign work, read:

- `docs/redesign-brief.md`
- `design-system/samyun-wan-armenia/MASTER.md`

The required art direction is premium botanical authority: modern, rich, professional, alive, nature-accented, product-first, and trust-focused. Do not make a generic landing page or a plain pharmacy template.

## Testing Guidelines

There is no dedicated test runner configured yet. For now, validate changes with `pnpm run lint`, `pnpm run typecheck`, and `pnpm run build`. For image or SEO work, also run `pnpm run optimize-images` or `pnpm run seo-image-audit` as relevant. If adding tests, use clear `*.test.ts` or `*.test.tsx` names and document the runner in `package.json`.

## Commit & Pull Request Guidelines

Current history shows short, sentence-case messages such as `Initial import from local Site`; keep commit subjects concise and descriptive. Pull requests should include a summary, verification commands run, linked issue or task context, screenshots for visual changes, and notes for locale, SEO, image, or deployment impacts.

## Security & Configuration Tips

Do not commit secrets. Configure Telegram, Supabase, Netlify, and Cloudflare values through environment settings. Generated folders such as `.next`, `.open-next`, `out`, and `public/optimized` should only be changed intentionally.
