# AdSense Re-submission Checklist

**Site:** `https://knexio.xyz` (non-www canonical; `https://www.knexio.xyz` now serves the same content, 200)
**Publisher ID:** `ca-pub-2596567349043393`
**AdSense account:** `tzhkai6@gmail.com`
**Status:** initial review requested 15 Aug 2026; major fixes shipped 19 Aug 2026 — re-verify then re-request review.
**Docs produced:** 19 August 2026

## Context

AdSense Site Auditor found three High risks, all fixed and deployed on 19 Aug 2026:

| Fix | Evidence |
|---|---|
| www subdomain was broken | `https://www.knexio.xyz/` returns 200 with prerendered content; canonical points to non-www. |
| JS-only rendering (raw HTML had no body content) | All 33 routes now ship static HTML with full content via headless prerender (`scripts/prerender.ts`); guides/ topics/tools/about all include `<h1>` and body text in raw HTML. |
| Templated guide content (4-gram Jaccard 0.46–0.51) | Each of the 17 guides gained two unique worked-example sections; Jaccard mean dropped to 0.24. |

## Step 1 — Confirm the fixes on the live site (10 min)

Run these before touching any console:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://knexio.xyz/            # expect 200
curl -s -o /dev/null -w '%{http_code}\n' https://www.knexio.xyz/       # expect 200
curl -s https://knexio.xyz/robots.txt                                  # Allow /, Disallow /404, sitemap
curl -s https://knexio.xyz/ads.txt                                     # google.com, pub-2596567349043393, DIRECT, f08c47fec0942fa0
curl -s https://knexio.xyz/guides/evidence-matrix-from-source-notes/   # raw HTML must contain <h1> + article text
```

## Step 2 — Search Console: re-validate and re-index

1. Open Search Console for the `knexio.xyz` property.
2. URL Inspection → test **https://knexio.xyz/** (Test Live URL) → confirm Google now sees the prerendered content (headings and article text, not an empty shell). Request indexing.
3. Repeat the URL Inspection test for one guide URL (e.g. `/guides/evidence-matrix-from-source-notes/`) and one workflow topic URL. Request indexing on each.
4. Sitemaps → confirm `sitemap_index.xml` is submitted and clickable; watch the index report over the next days. Old-site URLs intentionally return 404 — let them decay naturally in the coverage report; do not rebuild them.

## Step 3 — CMP / Privacy & messaging (must be done from the publisher account, in a real browser)

The custom site cookie banner currently only stores the choice for optional site analytics. Before re-requesting review, publish the Google message:

1. Sign in to AdSense as **`tzhkai6@gmail.com`** → **Privacy & messaging** → **European regulations** → create a message, select only `knexio.xyz`.
2. Default language **English (en)**; add `en-GB` only if reviewed separately.
3. Turn on **Do not consent** for all EEA, UK, Swiss regions; refusal path must be as discoverable as consent.
4. Turn on **Close (do not consent)**.
5. Message name (internal): `knexio.xyz | EEA-UK-CH | v1 | 2026-08`.
6. Privacy policy URL: `https://knexio.xyz/privacy/`.
7. Preview mobile + desktop; verify the message from an EEA/UK/CH IP before publishing.
8. Publish. Keep the site's own cookie interface limited to analytics consent afterward.

## Step 4 — Re-request review in AdSense

Since the site changed substantially (prerendering + content differentiation + www), re-request review:

1. AdSense → **Sites** → `knexio.xyz` → **Request review** (re-request).
2. Do this only after Steps 1–3 are confirmed (prerendered HTML reachable, sitemap re-submitted, CMP message published, ads.txt visible to Google).

## Step 5 — While review is pending

- Keep `/ads.txt`, `/robots.txt`, `/privacy/`, the CMP message, and core navigation public and unchanged.
- Do not add ad units yet (none are present — correct). Adding auto-refreshing, intrusive, or deceptive placements before approval can fail the review.
- Keep publishing original editorial content; the similarity work (Step "context") must not regress — avoid copying large blocks between guides.

## Step 6 — After approval

1. Create ad units in AdSense → add the AdSense script/auto ads snippet to the site → deploy via the existing GitHub → Cloudflare Pages pipeline (`pnpm build:cloudflare` includes prerender; CI installs Chromium automatically).
2. Check the live consent flow for EEA/UK/CH (GDPR/consent strings) and for the rest of the world (cookie notice scope).
3. Watch Search Console for indexation of new guides; update `updatedAt`/dates whenever content changes so re-crawls pick up revisions.
4. Re-run the three curl checks in Step 1 after every significant deploy.

## Reference docs in this repo

- `ADSENSE-SUBMISSION-RECORD-2026-08-15.md` — original submission state.
- `CMP-SETUP-GUIDE.md` — Privacy & messaging details and account caveat.
- `ADSENSE-PRIVACY-POLICY-TEMPLATE.md` — policy template; replace real publisher identity/contact before going live with ads.
- `SEARCH-CONSOLE-SITEMAP-ROBOTS-PLAN.md` — sitemap/robots history.