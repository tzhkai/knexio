# Knexio SEO audit and pre-approval roadmap

**Prepared:** 26 August 2026  
**Scope:** Public `knexio.xyz`, authenticated Search Console observations, local checkpoint `8cfabb1f`, and the four flagship guides.  
**Decision boundary:** This report does not guarantee indexing, rankings, traffic, or AdSense approval. It does not submit an AdSense review request and does not authorize a GitHub/Cloudflare deployment.

## Executive conclusion

Knexio has a coherent topical focus, crawlable robots and sitemap entry points, basic canonical/meta output, HTTPS coverage, and a visibly differentiated local content model. However, the most important SEO issue is operational rather than editorial: **production is materially behind the local checkpoint**. Search engines and AdSense reviewers currently see older flagship copy and cannot access the local `Evidence to Priority Plan` guide because its production URL returns a 404.

This should be fixed before publishing further features or adding more generic articles. Google’s people-first guidance asks whether a page provides original information, substantial value beyond source rewrites, clear authorship/process, and a satisfying task outcome. [1] The local flagship rewrite is designed around those questions; the public version is not yet serving it.

| Area | Current status | Evidence | Priority |
|---|---|---|---|
| Production synchronization | **Critical gap** | Local checkpoint is newer than GitHub `main`; public flagship pages retain 19 Aug copy; `evidence-to-priority-plan/` is HTTP 404. | P0 |
| Crawlability and canonical foundation | Good baseline | `robots.txt` allows crawling and names the sitemap index; 200 flagship pages have self-canonicals; 404 has `noindex,follow`. | Maintain |
| Sitemap freshness and coverage | Needs deployment | Public index and guide sitemap show 22 Aug; the priority-plan URL is absent. | P0 |
| Search visibility | Expectedly weak | Last 28 days: 19 impressions, 0 clicks, 55.2 average position, no query rows. | Observe after P0 |
| Historical URL inventory | Needs triage, not blanket action | Search Console includes 124 404s, 42 redirects, 23 noindex, 66 crawled-not-indexed, 19 discovered-not-indexed. | P1 |
| Flagship content quality | Strong locally; not live | Sources & method, public references, case boundaries, original artifacts, human-review rules, and distinct jobs are visible locally. | P0 deploy |
| Layout and mobile reading | Good locally | Desktop and 375px review show readable modules with no observed clipping. | Maintain |

## Current Search Console interpretation

Search Console’s 28-day report is too small for query-level SEO tuning: it shows **19 impressions and no clicks**, with no reportable query rows. The broader 3-month report has 129 impressions and 0 clicks, but its few visible queries are mostly historical-domain remnants rather than validated Workflow Library demand. They should not be used as a content roadmap.

The property also contains legacy URL history. Of 276 non-indexed pages, 124 are 404s, 42 redirect, 23 noindex, 66 are crawled-but-not-indexed, and 19 are discovered-but-not-indexed. The first three groups are mostly normal historical hygiene. The meaningful review queue is the latter 85 URLs—but only after each candidate is a live 200 canonical page with distinct reader value. Google describes a sitemap as a crawl hint, not a guarantee, and asks that `lastmod` reflect significant changes accurately. [3]

## Flagship-guide quality confirmation

The local versions now satisfy a content standard that is substantially stronger than a prompt-and-checklist template. Each one exposes its method before the prompt, supplies at least one public source, labels the case type and boundary, provides an original copyable work artifact, and specifies the human review that must still occur.

| Guide | Reader’s actual job | Original value now visible | Quality assessment |
|---|---|---|---|
| Research Brief | Turn inspected sources into a decision-facing brief | Source register, public NYC 311 walkthrough boundary, traceable brief artifact | Strong; do not call it a data analysis or client case. |
| Evidence Matrix | Inspect support for atomic claims | Claim-support labels, NIST-oriented source framing, inspection matrix artifact | Strong; explicitly avoids invented confidence and citations. |
| Evidence to Priority Plan | Convert reviewed evidence into a reversible next move | Disconfirming-condition field, GAO-informed decision boundary, planning artifact/template | Strong; distinct from weekly prioritization and does not imply approval. |
| Meeting Notes to Decision Brief | Separate meeting status from inferred consensus | Confirmed/Proposed/Deferred/Not confirmed record, W3C process reference, confirmation artifact | Strong; clear distinction from action lists and minutes. |

The local editorial design also works at desktop and 375px mobile widths. The review found a coherent “Field Notes” system, readable sources/method cards, accessible-looking action blocks, and no observed clipping. Future visual refinement is optional: more visible Workflow Library wordmark ownership, a subtle category marker per topic, and occasional marginal “field note” cues can make long pages more memorable without changing their information architecture.

> **Important:** The local quality conclusion is not a production conclusion. The currently public versions still use the prior 19 August content and do not expose these source/method records.

## P0: Do before adding new pages or features

First, synchronize the approved local checkpoint to the intended GitHub `main` repository and let the existing Cloudflare Pages connection produce a deployment. This is an external publishing action and needs a separate confirmation. After it completes, verify exactly these public URLs as 200 canonical pages: Research Brief, Evidence Matrix, Evidence to Priority Plan, and Meeting Notes to Decision Brief. Confirm that the 26 August revised text, `Sources & method` module, updated `article:modified_time`, internal links, and guide sitemap `lastmod` values are visible.

Do not submit a new AdSense review before 31 August 2026. Do not make repetitive URL-indexing requests during this short period. Instead, let one accurate sitemap/indexing cycle and the production content settle. Structured data must describe visible page content and does not guarantee a rich result even when correct. [2]

## High-value content to create after the production gap is closed

The next content should demonstrate editorial work that cannot be reduced to interchangeable prompts. Publish **one case file at a time**, not a batch of formulaic guides.

| Priority | Proposed content | What makes it distinct | Evidence/asset required before publication |
|---|---|---|---|
| P1 | **Public-data field case: from an NYC 311 source register to a decision question** | A reproducible, bounded walkthrough that demonstrates the Research Brief method on an identified public dataset rather than claiming private-client experience. | Dataset URL, access date, exact query or download scope, limitations, a source register, and a clear statement that it is an illustrative public-source walkthrough—not a service-performance conclusion. |
| P1 | **Decision-record selection guide** | A visual decision tree that helps readers choose Evidence Matrix vs Research Brief vs Decision Log vs Decision Memo vs Priority Plan. | A compact, original comparison matrix; input/output/boundary rows; links only to the page that performs that job. Avoid recreating generic “AI prompt examples.” |
| P2 | **Meeting-record correction protocol** | A task-specific protocol for checking names, decision status, owners, dates, and source timestamps before sending a follow-up. | A printable/copyable correction checklist and a clearly labeled illustrative record, not a fictional client anecdote. |
| P2 | **Source-age and scope checklist** | A short supporting resource for recognizing stale evidence, source-type mismatch, and false precision. | Direct references to public methodological materials, a self-assessment table, and no unsupported claims about accuracy. |

The public-data case is the strongest next content bet because it adds transparent methodology, a reproducible source path, and a non-generic artifact. It should not be rushed: the value comes from carefully documenting the source, steps, limits, and a reader-verifiable result—not from using a popular keyword in the title.

## High-value interactive functionality to build after the production gap is closed

Prioritize client-side, privacy-preserving utilities that help a reader produce a reviewable record. Avoid adding a generic “AI writer,” a novelty calculator, or another prompt-copy surface that repeats existing article templates.

| Priority | Feature | Reader value | Guardrails |
|---|---|---|---|
| P1 | **Evidence Record Builder** | Lets a reader create rows for claim, source label, support state, limitation, verification step, and reviewer status; exports Markdown/CSV locally. | No upload, no generated confidence score, no claim that the tool verifies facts. Add a clear “review source” reminder. |
| P1 | **Workflow Selector** | A small input/output/boundary decision tree that routes a reader to the correct existing guide rather than expanding the library with overlapping pages. | Use explicit task labels; no tracking without optional analytics consent; link to canonical guide URLs. |
| P2 | **Decision Brief Completeness Check** | A local form that highlights missing decision status, authority, evidence reference, owner, date, or confirmation question before export. | It detects incomplete fields only; it must not infer agreement, names, dates, or commitments. |
| P3 | **Category field-note motifs** | Adds small research/planning/meetings labels and marginal verification prompts throughout long guides. | Visual differentiation only; preserve existing content order, contrast, keyboard access, and reduced-motion support. |

## SEO execution order through 31 August

| When | Action | Success criterion | Do not do |
|---|---|---|---|
| First available release window | Sync checkpoint `8cfabb1f` to GitHub/Cloudflare after confirmation. | Four flagship URLs return 200; priority-plan is no longer 404; sitemap contains it; page dates match material change. | Do not publish unrelated cosmetic changes at the same time. |
| After production verification | Review Search Console sitemap read status and a small set of priority URLs once. | Public content and sitemap are consistent; no new crawl error caused by the deployment. | Do not repeat indexing requests merely because impressions are still low. |
| Before 31 Aug | Produce one source-backed field-case outline or one local evidence-record feature specification. | It has unique inputs, output, source method, artifact, and human-review limit. | Do not bulk-generate similar prompt articles. |
| On/after 31 Aug | Re-run the AdSense readiness checklist and decide whether content is stable enough for a re-review request. | Production—not local—contains the strengthened content and no new material defects are observed. | Do not assume approval is guaranteed. |

## References

[1] [Google Search Central — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)  
[2] [Google Search Central — General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)  
[3] [Google Search Central — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
