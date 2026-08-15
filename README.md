# Workflow Library

Workflow Library is an English-language reference site for practical AI workflows used in research, writing, meetings, and planning. It publishes original, task-based guides with clear steps, review checks, and transparent publishing policies.

## Stack

The site is a static React 19, TypeScript, Vite, and Tailwind CSS application. Client-side routes are provided by Wouter. Production content, policy pages, sitemap generation, and Cloudflare deployment configuration are versioned in this repository.

## Local development

```bash
pnpm install
pnpm dev
```

Run the TypeScript check with:

```bash
pnpm check
```

## Production build

Cloudflare Pages deploys `dist/public`. The canonical production build requires the final HTTPS origin so that `sitemap.xml` and `robots.txt` use the correct domain:

```bash
SITE_URL=https://knexio.xyz pnpm build:cloudflare
```

The GitHub Actions workflow runs this command automatically on changes to `main` and deploys the generated static output to the configured Cloudflare Pages project.

## Before public monetization

Replace all clearly marked publisher, author, reviewer, and contact placeholders with real operational information. Verify the deployed `/sitemap.xml` and `/robots.txt`, then complete Google Search Console verification before making any AdSense application.
