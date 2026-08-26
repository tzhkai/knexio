export const DEFAULT_SITEMAP_LASTMOD = "2026-08-17";

export const SITEMAP_LASTMOD_BY_ROUTE: Record<string, string> = {
  "/tools/ai-prompt-word-counter/": "2026-08-25",
  "/guides/meeting-agenda-from-notes/": "2026-08-25",
  "/guides/evidence-to-priority-plan/": "2026-08-25",
  "/guides/research-brief-from-scattered-sources/": "2026-08-26",
  "/guides/evidence-matrix-from-source-notes/": "2026-08-26",
  "/guides/evidence-to-priority-plan/": "2026-08-26",
  "/guides/meeting-notes-to-decision-brief/": "2026-08-26",
};

export function normalizeSitemapRoute(route: string) {
  return route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
}

export function sitemapLastmodForRoute(route: string) {
  return SITEMAP_LASTMOD_BY_ROUTE[normalizeSitemapRoute(route)] ?? DEFAULT_SITEMAP_LASTMOD;
}
