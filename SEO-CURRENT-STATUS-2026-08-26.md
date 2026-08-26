# Current public SEO status

**Checked:** 26 August 2026  
**Scope:** Public `knexio.xyz`, public crawl files, and authenticated Google Search Console.

## Public production baseline

The live homepage, `robots.txt`, and sitemap index remain reachable. `robots.txt` permits crawling and declares `https://knexio.xyz/sitemap_index.xml`. The public sitemap index currently lists its three child sitemaps with **22 August** dates.

The public Research Brief is a valid old page, but it remains the **19 August** version. It does not contain the local 26 August Sources & method record, public-source walkthrough boundary, original working artifact, review trail, or revised 14-minute depth. The production site therefore still does not reflect the validated local/review-branch content.

The public `https://knexio.xyz/guides/evidence-to-priority-plan/` returns **HTTP 404** without a redirect as of this check. It is present in the local validated route set and review branch, so it must be restored through the future deployment reconciliation before it can be assessed as a live flagship guide.

## Current Search Console baseline

The 28-day performance report, last updated approximately 5.5 hours before the review, reports **0 clicks**, **19 impressions**, **0% CTR**, and **55.2 average position**, with no reportable query rows. This is not sufficient data to tune titles around query terms.

The index report was last updated 21 August. It reports **60 indexed** and **276 non-indexed** URLs. The visible non-indexed categories are: 124 Not found (404), 42 Page with redirect, 23 Excluded by noindex, 1 Alternate page with proper canonical, 66 Crawled—currently not indexed, 1 Redirect error (validation passed), and 19 Discovered—currently not indexed (validation passed).

## Immediate conclusion

The primary SEO blocker is production synchronization, not a lack of another dynamic TOC or related-reading component. Existing production pages have crawl entry points and basic reading architecture; the higher-value local changes remain isolated in the GitHub review branch. Any indexing assessment or content refresh should wait until a deliberate, separately confirmed reconciliation of the review branch with `main` and its deployment path.

## Official standards used for the remaining-action list

Google’s people-first content guidance asks whether pages add original information or analysis beyond source rewriting, satisfy a reader’s goal, make authorship and the content-production process clear, and avoid scaled search-engine-first output. [1] Google’s sitemap guidance says sitemap URLs should be canonical, absolute, and reflect significant `lastmod` changes accurately; it also describes submission as a hint rather than a crawl or indexing guarantee. [2] Google’s structured-data guidance requires visible, current, non-misleading markup that represents the page and notes that correct markup does not guarantee a rich result. [3]

## References

[1] https://developers.google.com/search/docs/fundamentals/creating-helpful-content  
[2] https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap  
[3] https://developers.google.com/search/docs/appearance/structured-data/sd-policies
