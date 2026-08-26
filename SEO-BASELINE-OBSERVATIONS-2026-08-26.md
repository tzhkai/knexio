# Knexio SEO baseline observations — 2026-08-26

## Public crawl evidence

| URL | Observation | SEO interpretation |
|---|---|---|
| https://knexio.xyz/ | HTTP content is crawlable and presents a clear Workflow Library value proposition, topic entry points, guide cards, trust links, and a visible local analytics choice banner. | Core homepage information architecture is present. |
| https://knexio.xyz/guides/ | Crawlable library lists 17 guides across Research, Writing, Meetings, and Planning. | The guide inventory is discoverable, but displayed flagship data is old. |
| https://knexio.xyz/robots.txt | Allows crawlers, disallows `/404`, and names `https://knexio.xyz/sitemap_index.xml`. | No observed crawl block in robots. |
| https://knexio.xyz/sitemap_index.xml | Lists pages, guides, and workflows child maps with 2026-08-22 timestamps. | Sitemap index is accessible, but has not reflected the 2026-08-26 flagship update locally. |

## Critical production-versus-local gap

The currently public versions of Research Brief, Evidence Matrix, and Meeting Notes to Decision Brief still display their 19 August copy and update dates. They do **not** show the local 26 August “Sources & method” module, public-source links, case boundaries, original working artifacts, updated prompts, or new contextual internal links.

The public `evidence-to-priority-plan/` extraction returned no markdown in this pass, so it needs an HTTP/canonical/render check. The local static build had already pre-rendered the route successfully; this discrepancy must not be described as a production success until the current deployment is verified.

The follow-up production check confirmed that `https://knexio.xyz/guides/evidence-to-priority-plan/` returns an actual **HTTP 404**. The public `sitemap-guides.xml` omits that URL and lists the other flagship guides with `2026-08-22` lastmod values. This validates a production deployment gap rather than an extraction-only problem.

## Synchronization trace

The saved local checkpoint is `8cfabb1f`, while the GitHub `tzhkai/knexio` `main` query returned the materially older commit `64958ad7`. The local project remote is an environment-managed project artifact remote, not the GitHub repository. Therefore, this audit must treat GitHub/Cloudflare production as behind the local project checkpoint until a separately confirmed GitHub sync and Cloudflare deployment verification occurs.

## Old-production SEO metadata

The production Research Brief retains a correct self-canonical URL, title, description, Open Graph title, and an old `article:modified_time` of `2026-08-19T09:00:00+08:00`. These baseline technical signals are present on the old production version, but they do not represent the 26 August substantive rewrite and therefore should not be used to claim that the new source/method content is live.

## Search Console baseline shown on 2026-08-26

The authenticated `sc-domain:knexio.xyz` overview reported **0 web-search clicks**, **60 indexed pages**, and **276 non-indexed pages**. Its submitted `sitemap_index.xml` entry was last read on **2026-08-21**, had status **Success**, and reported **28 discovered pages**. The overview also showed **13 HTTPS valid pages**, no HTTPS invalid pages, and **7 valid Breadcrumb enhancements** with zero invalid items. Core Web Vitals had insufficient data.

The index totals include the property’s historical URL inventory and must not be read as a count of current Workflow Library pages alone. The crawlable production sitemap contains the 28 currently discovered URLs, but it is stale relative to the 26 August local content change and omits the new Evidence to Priority Plan route.

## Search Console non-indexed reasons

The 7 visible reason categories were: **124 Not found (404)**, **42 Page with redirect**, **23 Excluded by noindex**, **1 Alternate page with proper canonical tag**, **66 Crawled — currently not indexed**, **1 Redirect error (validation passed)**, and **19 Discovered — currently not indexed (validation passed)**.

The 404, redirect, noindex, and canonical categories largely need URL-inventory hygiene rather than indiscriminate indexing requests. The current editorial SEO priority is the **66 crawled but not indexed** and **19 discovered but not indexed** URLs, after ensuring they are current 200 canonical production pages with distinct reader value. The production `evidence-to-priority-plan/` 404 must be fixed before it can be considered for any indexing action.

## Search Console performance context

The current three-month web-search report (last updated approximately seven hours before the check) showed **0 clicks**, **129 impressions**, **0% CTR**, and **25.4 average position**. The visible queries were low-volume and largely unrelated to the current Workflow Library, including `ai coding assistant` (3 impressions) and several one-impression legacy-topic terms such as `steam not launching`, `slack not working`, and `keywordio`.

These queries are not a validated keyword strategy for the new site. They indicate that Search Console’s property still includes historical-domain signals while the new library has not yet accumulated meaningful query/page data. The correct near-term response is to ship the revised production content, ensure its crawlable 200 canonicals and sitemap timestamps, then observe a clean post-deployment window rather than chase unrelated legacy queries.

When restricted to the most recent **28 days**, the report showed **0 clicks**, **19 impressions**, **0% CTR**, and **55.2 average position**, with no reportable query rows. This is the appropriate baseline for the newly launched Workflow Library: insufficient visibility for keyword-level optimization, not evidence that a particular new guide has failed.

## Flagship-guide local quality review

The local 26 August build presents a visible Sources & method record before the reusable prompt in all four flagship guides. The record includes scoped inputs, a step-by-step method, a public reference link, a case-study classification and boundary, a copyable original work artifact, and a human-review boundary. Automated content tests require each flagship to have at least seven substantive sections, at least five method steps, public HTTPS sources, a stated case boundary, a reusable artifact exceeding 250 characters, and a distinct purpose, artifact title, and lead source publisher.

The four guides are now materially differentiated: Research Brief packages a reviewable source register for a decision owner; Evidence Matrix performs claim-level support inspection; Evidence to Priority Plan proposes a reversible next move with a disconfirming condition; Meeting Notes to Decision Brief classifies meeting decision status without inferring agreement. This directly addresses the former template-similarity risk.

Desktop and 375px mobile full-page review found the local pages readable and structurally consistent, with no observed clipping or broken mobile action areas. The shared Field Notes design is coherent. Optional design refinements—not blockers—are a more prominent Workflow Library wordmark, subtle category-specific visual motifs, and recurring marginal “field note” cues through long sections. These should be treated as secondary to production synchronization because the reviewed version is not live yet.

## Do not overstate

This baseline establishes a production publication lag, not an indexing, ranking, traffic, or AdSense verdict. It is the highest-priority technical/operational SEO issue because search engines and reviewers can only assess the production content currently served.
