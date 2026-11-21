/** Last-modified dates: the whole electricity dataset shares one EIA vintage. */
import { STATES_UPDATED } from "../client/src/data/electricity";
import { electricityRoutePaths } from "../client/src/data/electricityRoutes";

export const DEFAULT_SITEMAP_LASTMOD = STATES_UPDATED;

export function normalizeSitemapRoute(route: string) {
  return route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
}

/** Every electricity URL is regenerated from the same data release, so they share one date. */
export const SITEMAP_LASTMOD_BY_ROUTE: Record<string, string> = Object.fromEntries(
  electricityRoutePaths.map((route) => [normalizeSitemapRoute(route), STATES_UPDATED]),
);

export function sitemapLastmodForRoute(route: string) {
  return SITEMAP_LASTMOD_BY_ROUTE[normalizeSitemapRoute(route)] ?? DEFAULT_SITEMAP_LASTMOD;
}
