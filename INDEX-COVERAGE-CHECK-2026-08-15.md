# Search Console indexing coverage check — 15 August 2026

## Confirmed by the publisher

Google has indexed the following current-site canonical URLs:

1. `https://knexio.xyz/workflows/research-and-decisions/`
2. `https://knexio.xyz/guides/research-brief-from-scattered-sources/`
3. `https://knexio.xyz/guides/meeting-notes-to-action-list/`

## Search Console overview observed

The `sc-domain:knexio.xyz` property reported **63 indexed pages**, **413 not indexed pages**, **16 HTTPS pages**, and **6 valid breadcrumb pages**. The larger totals include historical URLs from the previous site and must not be used as a count of the current 24 canonical URLs alone.

## URL Inspection sample

| Canonical URL | Inspection status | Discovery details | Follow-up |
|---|---|---|---|
| `/workflows/writing-and-updates/` | Not indexed — Google does not recognize the URL. | No sitemap or referring page was detected; no crawl information was available. | Keep the canonical URL stable, reinforce internal links from indexed research/meeting pages and the library, then submit a limited indexing request. |
| `/workflows/meetings-and-follow-up/` | Not indexed — Google does not recognize the URL. | No sitemap or referring page was detected; no crawl information was available. | Link to this hub from the already indexed meeting-action guide, navigation collections, and sequential reading path; then submit a limited indexing request. |
| `/workflows/planning-and-priorities/` | Not indexed — Google does not recognize the URL. | No sitemap or referring page was detected; no crawl information was available. | Link to this hub from the planning guides, the library and the sequential reading path; then submit a limited indexing request. |
| `/guides/clear-project-update-prompt/` | Not indexed — Google does not recognize the URL. | No sitemap or referring page was detected; no crawl information was available. | Make the writing topic hub and main guide library link to this guide with descriptive anchor text, then submit a limited indexing request. |

## Notes

All three checked topic pages are present in the current sitemap and are publicly reachable, so the missing discovery data appears to be a crawl/discovery gap rather than an intentional noindex directive. Inspect the remaining topic hub and priority guides before issuing a small, prioritized set of new requests; do not submit all URLs at once.

## Submitted requests

- `https://knexio.xyz/workflows/writing-and-updates/` — submitted on 15 August 2026 after the related guide-to-hub internal links were deployed. Search Console confirmed that the URL was added to the priority crawl queue. This is a crawl request, not a guarantee of indexing.
- `https://knexio.xyz/workflows/meetings-and-follow-up/` — a request was attempted on 15 August 2026, but Search Console returned “Something went wrong. There was a problem submitting your indexing request. Please try again later.” Do not retry repeatedly in the same session; retry once later from URL Inspection after the current request queue has settled.
