# Knexio Search Console Diagnosis Notes — 2026-08-25

## Scope

Logged in to Google Search Console property `sc-domain:knexio.xyz` as `tzhkai6@gmail.com`. The Search Console data has a reporting delay; the latest available performance data ended on 2026-08-22.

## Observed Search Console data

| Report and window | Observed result |
|---|---:|
| Performance, last 7 days (2026-08-16 to 2026-08-22) | 0 clicks; 8 impressions; 0% CTR; average position 74.4 |
| Performance, last 28 days (2026-07-26 to 2026-08-22) | 0 clicks; 19 impressions; 0% CTR; average position 55.2 |
| Performance, last 3 months (2026-05-23 to 2026-08-22) | 0 clicks; 131 impressions; 0% CTR; average position 25.3 |
| Sitemaps | `https://knexio.xyz/sitemap_index.xml` status Success; last read 2026-08-21; 28 discovered pages |
| Index report | 60 indexed URLs; 276 not indexed URLs |

The 3-month property-level data includes legacy-site history and must not be used to judge the new Workflow Library alone.

## Index report categories

| Reason | Count |
|---|---:|
| Not found (404) | 124 |
| Page with redirect | 42 |
| Excluded by noindex | 23 |
| Alternate page with proper canonical | 1 |
| Crawled — currently not indexed | 66 |
| Redirect error | 1 (validated) |
| Discovered — currently not indexed | 19 (validated) |

These counts mix legacy URLs with the new site and cannot by themselves identify new-site coverage.

## Core URL inspection

Both URLs were checked through the Search Console URL Inspection UI:

* `https://knexio.xyz/tools/ai-prompt-word-counter/`
* `https://knexio.xyz/guides/meeting-agenda-from-notes`

For each, Search Console reported **URL is not on Google** and **Google does not know this URL**. It reported no referring sitemap, no referring page, no crawl date, and no canonical evaluation. No indexing request was sent.

## Follow-up inspection and indexing request attempts

* `https://knexio.xyz/` was checked on 2026-08-25 and is already indexed. No request was sent for the homepage.
* `https://knexio.xyz/tools/ai-prompt-word-counter/` remained unknown to Google. After the user confirmed a one-time request, the Search Console flow completed its live-test step but returned: “There was a problem submitting your indexing request. Please try again later.” No successful request confirmation was shown.
* `https://knexio.xyz/guides/meeting-agenda-from-notes/` was reported as **Discovered — currently not indexed**, with `sitemap_index.xml` shown as the discovery source. Its separately confirmed one-time request also returned the same generic Search Console submission error. No retry was made.

## Publicly verified online state

* `https://knexio.xyz/robots.txt` allows crawling and declares `https://knexio.xyz/sitemap_index.xml`.
* The current `sitemap_index.xml` references pages, guides, and workflows child sitemaps with a 2026-08-22 last-modified date.
* The live `sitemap-pages.xml` contains both tools; the live `sitemap-guides.xml` contains `meeting-agenda-from-notes` and the other current guides.
* The live tool page returned readable server-rendered content and its expected navigation/internal links.
* A public HTTP check on 2026-08-25 returned `200` for the canonical tool URL. The guide's no-trailing-slash form returned `308` to its trailing-slash canonical URL, which then returned `200`. `robots.txt` allowed crawling.
* Search Console's **Test live URL** completed for `https://knexio.xyz/tools/ai-prompt-word-counter/` at 2026-08-25 03:11 and reported that the page **can be indexed by Google**, with one valid breadcrumb enhancement detected.

## Working diagnosis

The immediate problem is not CTR optimization. The newest core URLs have not yet been discovered by Google, even though they are now publicly crawlable, eligible for indexing in the live test, and listed in the live sitemap. Search Console last read the sitemap on 2026-08-21, while the current sitemap URLs carry a 2026-08-22 modification date. The 7-day performance window has only eight impressions at a low average position and is insufficient for a CTR diagnosis.

## Follow-up actions to consider

1. Confirm Search Console re-reads the current sitemap after the latest deployment. Avoid duplicate submissions without a material sitemap or deployment change.
2. After the sitemap is re-read, inspect a very small set of core URLs again. Request indexing only for pages that remain unknown after the normal discovery window.
3. Reassess performance after Google reports enough impressions; use queries and pages only after data is no longer privacy-suppressed.
