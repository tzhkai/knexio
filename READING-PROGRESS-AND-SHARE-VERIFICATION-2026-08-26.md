# Reading progress and article sharing verification — 2026-08-26

## Scope and boundary

This record covers the local development preview only. It is not a production deployment confirmation, does not create a GitHub pull request, and does not change AdSense, Search Console, analytics, or consent settings.

## First browser pass

The non-legacy article `meeting-follow-up-email` was opened at the local preview. Its table of contents contains eleven reading steps, including eight authored body sections, so it is a useful example of the new section-count eligibility path rather than a previously allowlisted flagship guide.

| Check | Result | Evidence |
|---|---|---|
| Article sharing surface | Passed | The title area rendered **Copy link**, **Copy share note**, X, LinkedIn, and Email. |
| Copy share note | Passed | Clicking the control changed its button text to **Copied** and exposed the polite status text: “Title, summary, and link copied.” |
| Share data boundary | Superseded | The first pass confirmed that share destinations use only the displayed title, dek, and page URL. The implementation was then tightened to generate the production canonical `https://knexio.xyz` URL even when a reader is viewing a local preview; this requires a final refreshed-page check below. |
| Tracking boundary | Passed | The component visibly states “No scripts. No tracking.” The interaction is browser clipboard only; no click analytics were added to this component. |

## Responsive visual pass

Desktop viewport captures at 1280px and full-page mobile captures at 375px were taken for both `meeting-follow-up-email` and the existing flagship `research-brief-from-scattered-sources`. The mobile reading surface stayed within the viewport and the sharing controls wrapped onto their own compact lines rather than forcing a horizontal layout. The fixed local consent panel was intentionally omitted from the full-page captures; it is unrelated to this feature and was not changed.

The remaining final pass will refresh the page after the canonical-link adjustment, inspect the `progressbar` ARIA value after a deliberate scroll, and verify the canonical link values before the full validation run is recorded.

## Canonical link refresh

After the adjustment, the refreshed development preview generated X, LinkedIn, and email share destinations for the **formal canonical URL** `https://knexio.xyz/guides/meeting-follow-up-email/`, rather than the temporary preview host. The visible sharing controls and their accessible labels remained present. A deliberate mid-article scroll was then initiated for the ARIA verification; its browser-console result is recorded in the final pass below.

## Scroll and accessibility pass

The article was deliberately scrolled to the middle of the authored content. The browser reported 2,756 pixels above the viewport and the dynamic table of contents updated its accessible summary from the start state to **“Now: Make corrections easy to give 6/11.”** The fixed top progress surface was visibly active in the scrolled page capture. Together with the component’s `role="progressbar"`, `aria-valuenow`, and `aria-valuetext` implementation, this confirms that the automatic long-form path mounts and updates as the reader moves through the article.

No analytics call, network request, third-party social SDK, tracking parameter, or cookie behavior was added by this feature. The component uses only browser clipboard and, where a browser exposes it, the native share sheet.

## Final automated validation

The final validation command completed successfully after the canonical-link adjustment.

| Validation | Result |
|---|---|
| Vitest | 81 tests passed across 16 test files, including the new reading-coverage and share-note regressions. |
| TypeScript | `pnpm check` passed. |
| Sitemap generation | Completed for 33 canonical URLs with the existing index, child sitemap, compatibility sitemap, and robots output. |
| Static build | Vite build, static metadata generation, server bundle, and prerender all completed successfully. |
| Route prerendering | 34 routes were prerendered with `https://knexio.xyz` canonicals. |

## Release boundary

The worktree has been validated locally only. No GitHub branch, pull request, merge, Cloudflare deployment, Search Console request, AdSense setting, or AdSense resubmission was created or changed during this work.
