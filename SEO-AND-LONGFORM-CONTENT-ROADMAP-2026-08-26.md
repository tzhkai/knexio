# Knexio SEO and long-form content roadmap

**Audit date:** 26 August 2026  
**Decision context:** Do not submit a new AdSense review before 31 August 2026. Do not use repeated indexing requests as a substitute for content and production quality work.

## Executive assessment

Knexio now has a coherent public focus: practical, bounded AI workflows for research, writing, meetings, and planning. The four flagship guides are materially stronger than the older template-led articles because they expose source method, case boundaries, original working artifacts, and human-review steps. The public site is crawlable through normal links, `robots.txt`, and a sitemap index; flagship metadata and update records are now on production.

The current SEO constraint is **insufficient search visibility**, not a newly observed crawl block. Search Console’s most recent 28-day report shows 19 impressions, zero clicks, 0% CTR, and an average position of 55.2. That is too little signal to infer winning queries, target a CTR change, or declare a page weak. The practical response is to protect stable production output, improve genuine article-to-article task paths, and publish a small number of non-overlapping source-backed guides.

## Evidence baseline

| Area | Evidence | Interpretation | Action status |
|---|---|---|---|
| Crawl entry points | Homepage, library, Research Brief, and `robots.txt` returned successfully; `robots.txt` allows crawling and references `sitemap_index.xml`. | The core discovery path is present. | Maintain; do not churn canonical or robots rules. |
| Flagship visibility | The live Research Brief shows its 26 August review date, Sources & method module, reader-owned review trail, contextual workflow links, sequential navigation, and recommended reading. | The flagship pattern has visible publisher value rather than hidden data-only claims. | Preserve and reuse only where the task really warrants it. |
| Search performance | 28 days: 0 clicks, 19 impressions, 0% CTR, average position 55.2. | Too early and too sparse for query-level optimization. | Observe weekly; do not chase CTR or repeat indexing requests. |
| Index coverage | 60 indexed; 276 excluded: 124 404s, 42 redirects, 23 noindex, 66 crawled—not indexed, 19 discovered—not indexed, 1 canonical alternate, and 1 redirect error already validated. | Historical URLs dominate the totals. The quality queue is the 66 + 19 Google-system rows, not every historical 404. | Sample and classify important current URLs before changing global rules. |
| Core Web Vitals | Search Console has no 90-day Chrome UX Report field data for mobile or desktop. The public PageSpeed API quota was unavailable during this audit. | There is no field-data failure to diagnose or claim as fixed. | Retest later with PageSpeed when its service quota permits; keep assets and client behavior conservative. |
| Structured data | Guides render Article and BreadcrumbList data; the flagship Articles also cite visible source records. | The markup tracks visible page content, which is the correct baseline. | Do not add ratings, reviews, FAQ, or other markup unless fully visible and genuinely applicable. |

## Remaining technical SEO work

### Priority 0 — protect the production release discipline

The current public site should remain stable while the site accrues discovery signals. Any new interaction or content change should follow: local tests → static build → review branch / Pull Request → production verification of status, canonical, visible body, JSON-LD, and sitemap. The current interactive Table of Contents and recommendation enhancements are local until they are reviewed and merged; this is intentional, because unverified changes should not be mistaken for live SEO improvements.

### Priority 1 — classify the current index queue, not the aggregate count

The 124 404 rows and 42 redirect rows should be sampled against the legacy URL inventory. Keep a true 404 when there is no semantically equivalent replacement; do not point unrelated historical URLs at the homepage. For the 23 noindex URLs, make a small route inventory identifying whether each is an intentional utility, error, or duplicate. For the 66 crawled—not-indexed and 19 discovered—not-indexed URLs, prioritize only canonical current pages that have a distinct user task, a link from a relevant hub, and meaningful body content. Google recommends a people-first focus and warns against producing many pages merely to attract search visits.[1]

### Priority 2 — maintain explicitly crawlable, contextual internal links

The site already uses standard anchor links in navigation, topic hubs, sequential reading, contextual workflow links, and recommendations. The next improvement is qualitative: every guide selected for future publication should have one hub link, two meaningful incoming links from adjacent tasks, and one clearly explained outbound next step. The recommendation component now exposes a deterministic reason such as a shared topic or shared reading path; it must not be presented as "popular" or behaviorally personalized. Google advises normal `<a href>` links, descriptive anchor text, and context for important internal pages rather than an arbitrary number of links.[2]

### Priority 3 — limit structured data to what a reader can see

Article and BreadcrumbList are appropriate for the guide format. Continue to ensure that dateModified reflects only a substantive revision, sources named in JSON-LD remain visible in the Sources & method section, and any FAQ markup exactly represents visible questions and answers. Do not introduce fabricated ratings, user reviews, or inapplicable rich-result types. Correct structured data enables eligibility; it does not guarantee a search appearance.[3]

### Priority 4 — improve the middle tier before adding a large volume of pages

The flagship pages have a strong evidence-and-artifact pattern. Several older pages still use broadly similar prompt / steps / sections / checklist framing. Before adding many more pages, revise the most important middle-tier guides so each has a distinct input, output, reader, failure condition, reusable working asset, and deliberate handoff. This is a content-quality recommendation, not a claim that every guide is thin.

## Completed reader-experience upgrade

The current local version improves existing systems instead of adding duplicate widgets.

| Feature | Upgrade | Reader and SEO relevance |
|---|---|---|
| Dynamic Table of Contents | The active section now exposes a current-section label, `n / total` position, and accessible progress bar. Desktop and mobile use the same scroll-observer state; motion respects the existing preference handling. | Readers can regain their place in a long guide; the underlying section anchors remain ordinary crawlable links. |
| Recommended reading | Recommendation selection remains deterministic and only uses existing content relationships: shared topic, shared topic cluster, category, and level. Cards now state a visible reason such as `Shared focus: source checking` or `Part of the same reading path`. | Helps a reader choose the next useful task without pretending the card is based on popularity, users, or tracking. |
| Test coverage | Added TOC progress tests and transparent recommendation-selection tests. Full local suite: 80 tests; TypeScript and 34-route static build pass. | Prevents accidental removal of task reasoning and anchor-driven navigation. |

## Long-form candidates for the pre-review period

The candidates below are **planning candidates**, not claims of high search volume. They are selected because they extend the site’s existing task graph without republishing the same generic AI prompt template. Each must use public, reviewable source material or an explicitly labeled illustrative composite, and must include an original reusable artifact.

| Priority | Proposed long-form guide | User job and search-intent family | Distinct original asset | Evidence / authenticity boundary | Internal-link plan |
|---|---|---|---|---|---|
| 1 | **Create an AI source verification checklist before you share a claim** | Readers want to check a draft claim, citation, date, scope, and confidence before sharing it. | Copyable claim-verification ledger with source location, date check, direct-support test, counterevidence, and reviewer field. | Use public-source walkthroughs only to explain provenance; do not claim external fact-checking or tool accuracy. | Research Brief → Evidence Matrix → Decision Log. |
| 2 | **Turn delivery notes into a project risk register without inventing likelihood** | Teams need a bounded way to surface risks, owners, triggers, mitigations, and unknown likelihood from project notes. | Risk register template with observed signal, impact, owner, trigger, mitigation, and review date columns. | Explicitly distinguish recorded risk, proposed risk, and missing evidence; no probability estimates without supplied data. | Project Update → Weekly Priorities → Handoff Brief. |
| 3 | **Build a requirements traceability matrix from a project brief** | A reader needs to connect stated requirements to source, acceptance check, owner, and unresolved ambiguity. | Requirements traceability table with requirement ID, source statement, interpretation boundary, acceptance evidence, and reviewer. | Use a fictional composite or public specification excerpts; do not present it as a client delivery or claim compliance. | Brief-first Prompt → Research Brief → Project Handoff. |
| 4 | **Draft release notes from confirmed changes without inflating impact** | A writer wants to turn accepted changes, known limits, and upgrade notes into release communication. | Release-note source register plus change / user impact / limitation / action / confirmation checklist. | Use a clearly labeled public changelog walkthrough or a fictional composite; never invent customer outcomes or performance gains. | Clear Project Update → Markdown Preview → Decision-ready Email. |
| 5 | **Run a decision review after a project milestone without rewriting history** | A project owner wants to compare the original decision, evidence, outcome signals, and next review question. | Decision-review record with original rationale, observable outcome, disconfirming condition, owner, and revision rule. | It is not a root-cause analysis or proof of causation; human owner validates interpretation. | Decision Log → Evidence Matrix → Evidence-to-Priority Plan. |

## Editorial acceptance gate for any candidate

A candidate should not enter the library until the author can answer each of these questions:

1. What single input does the reader bring, and what distinct output can they leave with?
2. Which existing guide cannot substitute for it, and why?
3. What is the original artifact, decision table, or review method that makes the page useful without an AI model?
4. What public source, clearly labeled composite, or reproducible method supports the example?
5. What must a human verify before the output is used?
6. Which two current pages will link into it, and where will it link out next?

## References

[1] [Google Search Central, *Creating helpful, reliable, people-first content*](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)  
[2] [Google Search Central, *Link best practices for Google*](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)  
[3] [Google Search Central, *General structured data guidelines*](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
