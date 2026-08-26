# SEO and interaction implementation plan

**Prepared:** 26 August 2026  
**Decision boundary:** This plan does not authorize a merge to `main`, a Cloudflare deployment, a new indexing request, or an AdSense resubmission.

## What was implemented in the review branch

The article experience already had an active-section table of contents, a mobile TOC, smooth anchor navigation, long-form reading progress, contextual next-workflow links, sequential reading, and related reading. Rather than duplicate those elements, the review branch adds a **Reader-owned review trail** inside every guide’s human-check section.

It lets a reader mark guide-specific checks, see a 0–100% local progress state, copy a Markdown review record, and confirm before resetting marks. The data is scoped to the browser and guide, is not sent to Knexio, does not depend on analytics consent, and explicitly does not claim that a human has verified the underlying work. Helper-level regression tests, full production build, desktop and 375px visual checks, and manual label interaction were completed.

## Current SEO priorities

| Priority | Finding | Why it matters | Specific next action | Do not do |
|---|---|---|---|---|
| P0 | Production is behind the reviewed branch; the public Research Brief is the old 19 August version and Evidence to Priority Plan returns 404. | Search engines and readers can only evaluate the production version, not the local or GitHub review branch. | Reconcile the review branch with `main` through a separately approved, reversible merge/deployment plan; then recheck all four flagship URLs, canonical tags, Article/Breadcrumb JSON-LD, and sitemaps. | Do not force-push `main` or request indexing before the deployment is correct. |
| P0 | Public sitemap child files show 22 August dates and cannot contain the 26 August route/content changes. | Google uses only public sitemap signals; `lastmod` should reflect significant, visible changes. [2] | Regenerate and publish the sitemap only together with the approved production deployment; ensure its canonical URLs are the public routes and significant modified dates match page changes. | Do not alter dates merely to simulate freshness. |
| P1 | Search Console: 0 clicks, 19 impressions, 55.2 average position in 28 days; no reportable query rows. | The data volume is too small for title/keyword A/B decisions. | Use the next 28–56 days to observe page-level impressions after production catches up; tune snippets only when a query/page pattern has enough observations. | Do not add keyword-stuffed titles, chase a generic “hot keyword,” or infer keyword intent from 19 impressions. |
| P1 | Index report has 66 Crawled—currently not indexed and 19 Discovered—currently not indexed, alongside 124 historical 404s, 42 redirects, and 23 noindex URLs. | The largest counts are not automatically defects; historical 404s and intentional noindex pages need different handling from current valuable pages. | After deployment, export/sample the 85 Google-system candidates; score only current canonical pages for unique task value, evidence, helpful internal links, and crawlability before making a one-time request for a small number of strongest candidates. | Do not bulk-resubmit, turn every 404 into a redirect, or remove noindex without confirming its purpose. |
| P1 | Current topic pages share a recognisable workflow shape, while the flagship rewrite now gives four pages stronger task boundaries. | Google’s people-first guidance asks for original information and value beyond rewritten source material. [1] | Deploy the flagship sources/methods/artifacts first; use their distinct input → output → review boundary as the editorial standard for any future page. | Do not publish a new batch of near-identical “prompt + four steps + checklist” pages. |
| P2 | Production uses valid crawl entry points, canonical routing, Article/Breadcrumb markup, and a readable internal discovery structure. | These foundations are useful, but markup cannot substitute for a live, unique main page. [3] | Keep schema synchronized with the visible page and validate after each meaningful production release. | Do not add fake ratings, reviews, or irrelevant FAQ/schema types. |
| P2 | The site is too new for a reliable Core Web Vitals judgment from the available view. | Field data can be absent on low-traffic sites; static build success is not real-user performance evidence. | Recheck the Search Console Core Web Vitals report after sufficient traffic; meanwhile guard image weight, JS additions, and mobile layout through each build. | Do not claim a performance score without field or lab data. |

## High-value work before a future review date

The first priority is to **publish the already reviewed content correctly**, not to expand the URL count. Once that is separately authorized, the next additions should serve existing reader tasks and produce visible original artifacts.

| Order | Addition | Reader outcome | Original value and boundary |
|---|---|---|---|
| 1 | **Workflow selector / “Which record do I need?”** on the Library or a cluster hub. | A reader can distinguish research brief, evidence matrix, priority plan, decision log, action list, decision brief, and memo before opening a guide. | A compact input → output → when-not-to-use comparison, linked to existing URLs; it should replace indecision, not create another generic template page. |
| 2 | **One public, versioned editorial change log.** | A reader can see which guides materially changed, what was strengthened, and how to suggest corrections. | Do not claim testing or experience that did not happen. Link changes to visible edits and the editorial policy. |
| 3 | **One source-backed “decision record starter kit.”** | A reader can download/copy a coherent set of the existing evidence ledger, priority table, decision log, and meeting decision brief in a defined sequence. | Curate existing artifacts into one clearly scoped record flow; label it as a starting kit, not a proven business system or client result. |
| 4 | **Targeted source-method upgrades for the next 2–3 non-flagship guides.** | Readers get traceable examples and a clearer decision boundary in high-overlap clusters. | Use a different public source or clearly fictional composite each time; add a visible limitation and working artifact before calling a page “updated.” |

## Readiness gate before any new indexing request or AdSense resubmission

1. The review branch must be deliberately reconciled to `main` and visibly deployed.
2. All four flagship URLs must return 200 on production, use correct canonical URLs, expose current visible source/method content, and appear in the regenerated public sitemap.
3. A small sample of the 66 crawled-not-indexed URLs must be classified as legacy, duplicate/intentional, or current-and-worth-improving. Only the last group is an indexing-request candidate.
4. Continue to respect the earliest AdSense re-review date of **31 August 2026**. A completed content task does not guarantee approval.

## References

[1] Google Search Central, “Creating helpful, reliable, people-first content”: https://developers.google.com/search/docs/fundamentals/creating-helpful-content  
[2] Google Search Central, “Build and submit a sitemap”: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap  
[3] Google Search Central, “General structured data guidelines”: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
