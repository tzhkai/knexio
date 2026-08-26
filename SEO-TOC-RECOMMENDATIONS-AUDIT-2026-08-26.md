# TOC, recommendations, and SEO baseline — 26 August 2026

## Production content and navigation baseline

The live site now exposes the revised Research Brief with a 26 August 2026 editorial review date, an article-level Table of Contents, a public Sources & method record, a local-only reader review trail, contextual workflow links, sequential navigation, and recommendation cards. The public library currently lists 18 guides across Research, Writing, Meetings, and Planning.

This establishes that the next interaction change must improve the existing systems rather than add a second generic Table of Contents or an unqualified "popular posts" widget. Recommendation selection must remain explainable from site data and must not imply behavioral popularity.

## Search Console baseline

| Report | Current reading | Interpretation boundary |
|---|---:|---|
| Performance, last 28 days | 0 clicks, 19 impressions, 0% CTR, average position 55.2 | Too little visibility to infer query intent, winning pages, or CTR patterns. |
| Page indexing | 60 indexed; 276 excluded across 7 reasons | Most exclusion volume is historic URL cleanup: 124 404s and 42 redirects. |
| Quality queue | 66 crawled—not indexed; 19 discovered—not indexed | Prioritize page quality, distinct utility, internal pathways, and stable production output over repeated indexing requests. |
| Technical exclusions | 23 noindex; 1 alternate canonical; 1 redirect error already passed validation | Audit any future noindex entry individually; no evidence in this view that the flagship guide URLs are blocked. |

## Production crawl checks

The public homepage, `/guides/`, Research Brief, and `robots.txt` returned successfully. `robots.txt` allows general crawling, disallows only `/404`, and points to `https://knexio.xyz/sitemap_index.xml`. The current production Research Brief displays its TOC and recommended reading in rendered output.

## Immediate non-destructive implications

1. Preserve the stable canonical, sitemap, and robots configuration.
2. Do not issue repeat indexing requests merely because the volume is low; the last-28-day dataset is not yet decision-grade.
3. Improve on-page navigation and transparent task-to-task recommendations, then publish a small number of genuinely distinct, source-backed guides rather than expanding the existing template set indiscriminately.
