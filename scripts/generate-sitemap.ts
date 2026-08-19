import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { allSitemapRoutes, canonicalRouteUrl, guideSitemapRoutes, staticSitemapRoutes, workflowSitemapRoutes } from "./site-routes";

const configuredUrl = process.env.SITE_URL || "https://knexio.xyz";

let origin: string;
try {
  const url = new URL(configuredUrl);
  if (url.protocol !== "https:") throw new Error("HTTPS required");
  origin = url.origin;
} catch {
  console.error("SITE_URL must be a valid absolute HTTPS URL.");
  process.exit(1);
}

const normalizedRoutes = allSitemapRoutes.map((route) => route === "/" ? "/" : `${route.replace(/\/$/, "")}/`);
const uniqueRoutes = new Set(normalizedRoutes);
if (uniqueRoutes.size !== normalizedRoutes.length) {
  throw new Error("Duplicate sitemap route detected. Each canonical URL must appear once.");
}

const xmlEscape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const lastmod = new Date().toISOString().slice(0, 10);
const createUrlset = (routes: readonly string[]) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${xmlEscape(canonicalRouteUrl(origin, route))}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`;
const sitemapGroups = [
  { file: "sitemap-pages.xml", routes: staticSitemapRoutes },
  { file: "sitemap-guides.xml", routes: guideSitemapRoutes },
  { file: "sitemap-workflows.xml", routes: workflowSitemapRoutes },
] as const;
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapGroups.map(({ file }) => `  <sitemap><loc>${xmlEscape(`${origin}/${file}`)}</loc><lastmod>${lastmod}</lastmod></sitemap>`).join("\n")}\n</sitemapindex>\n`;
const robots = `User-agent: *\nAllow: /\nDisallow: /404\n\nSitemap: ${origin}/sitemap_index.xml\n`;
const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = process.env.SITEMAP_OUTPUT_DIR ? path.resolve(process.env.SITEMAP_OUTPUT_DIR) : path.resolve(here, "..", "client", "public");
await mkdir(publicDir, { recursive: true });
await Promise.all([
  ...sitemapGroups.map(({ file, routes }) => writeFile(path.join(publicDir, file), createUrlset(routes), "utf8")),
  writeFile(path.join(publicDir, "sitemap_index.xml"), sitemapIndex, "utf8"),
  writeFile(path.join(publicDir, "sitemap.xml"), sitemapIndex, "utf8"),
  writeFile(path.join(publicDir, "robots.txt"), robots, "utf8"),
]);
console.log(`Generated sitemap_index.xml, ${sitemapGroups.length} child sitemaps, compatibility sitemap.xml, and robots.txt for ${origin} (${uniqueRoutes.size} canonical URLs).`);
