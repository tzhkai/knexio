export const DEFAULT_SITEMAP_LASTMOD = "2026-08-17";

export const SITEMAP_LASTMOD_BY_ROUTE: Record<string, string> = {
  "/tools/ai-prompt-word-counter/": "2026-08-25",
  "/guides/research-brief-from-scattered-sources/": "2026-08-26",
  "/guides/evidence-matrix-from-source-notes/": "2026-08-26",
  "/guides/evidence-to-priority-plan/": "2026-08-26",
  "/guides/meeting-notes-to-decision-brief/": "2026-08-26",
  "/guides/clear-project-update-prompt/": "2026-09-04",
  "/guides/one-week-content-plan-from-questions/": "2026-09-04",
  "/guides/brief-first-prompt-pattern/": "2026-09-04",
  "/guides/thirty-minute-project-starting-plan/": "2026-09-04",
  "/guides/meeting-follow-up-email/": "2026-09-04",
  "/guides/decision-log-from-project-notes/": "2026-09-04",
  "/guides/weekly-priorities-from-project-list/": "2026-09-04",
  "/guides/meeting-agenda-from-notes/": "2026-09-04",
  "/guides/customer-feedback-theme-map/": "2026-09-04",
  "/guides/project-handoff-brief/": "2026-09-04",
  "/guides/project-notes-to-decision-memo/": "2026-09-04",
  "/guides/turn-rough-notes-into-decision-email/": "2026-09-04",
  "/guides/weekly-review-from-completed-and-blocked-work/": "2026-09-04",
};

export function normalizeSitemapRoute(route: string) {
  return route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
}

export function sitemapLastmodForRoute(route: string) {
  return SITEMAP_LASTMOD_BY_ROUTE[normalizeSitemapRoute(route)] ?? DEFAULT_SITEMAP_LASTMOD;
}
