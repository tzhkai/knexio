/**
 * Route inventory for the sitemap and the prerender pass. The electricity URLs
 * come from client/src/data/electricityRoutes.ts so the router, the prerender
 * list, the per-route metadata and the sitemap can never drift apart.
 */
import { electricityRoutePaths } from "../client/src/data/electricityRoutes";

/** Static trust pages that sit outside the electricity section. */
export const infoPageRoutes = ["/about", "/editorial-policy", "/privacy", "/terms", "/contact"] as const;

/** Home + hub + 53 areas + 6 housing types + 318 combinations + calculator + methodology. */
export const electricitySitemapRoutes = electricityRoutePaths;

export const staticSitemapRoutes = electricitySitemapRoutes;

export const allSitemapRoutes = [...electricitySitemapRoutes, ...infoPageRoutes];

export function canonicalRouteUrl(origin: string, route: string) {
  return route === "/" ? `${origin}/` : `${origin}${route.replace(/\/$/, "")}/`;
}
