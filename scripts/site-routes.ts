import { guides, toolRoutes, topicClusters } from "../client/src/lib/content";

export const staticSitemapRoutes = [
  "/",
  "/guides",
  "/series",
  "/about",
  "/editorial-policy",
  "/privacy",
  "/terms",
  "/contact",
  "/workflows/meetings/meeting-minutes-vs-decision-brief/",
  ...toolRoutes.map((tool) => tool.path),
] as const;

export const guideSitemapRoutes = guides.map((guide) => `/guides/${guide.slug}`);
export const workflowSitemapRoutes = topicClusters.map((topic) => `/workflows/${topic.slug}`);
export const allSitemapRoutes = [...staticSitemapRoutes, ...guideSitemapRoutes, ...workflowSitemapRoutes];

export function canonicalRouteUrl(origin: string, route: string) {
  return route === "/" ? `${origin}/` : `${origin}${route.replace(/\/$/, "")}/`;
}
