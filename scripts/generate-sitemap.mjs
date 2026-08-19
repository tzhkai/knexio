/** Generate a sitemap index, purpose-led child sitemaps, and robots.txt after the final public domain is known. */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const configuredUrl = process.env.SITE_URL;
if (!configuredUrl) {
  console.error("SITE_URL is required. Example: SITE_URL=https://www.example.com pnpm sitemap");
  process.exit(1);
}

let origin;
try {
  origin = new URL(configuredUrl).origin;
} catch {
  console.error("SITE_URL must be a valid absolute HTTPS URL.");
  process.exit(1);
}

if (!origin.startsWith("https://")) {
  console.error("SITE_URL must use HTTPS for the public sitemap.");
  process.exit(1);
}

const guides = [
  "research-brief-from-scattered-sources",
  "clear-project-update-prompt",
  "meeting-notes-to-action-list",
  "one-week-content-plan-from-questions",
  "brief-first-prompt-pattern",
  "thirty-minute-project-starting-plan",
  "meeting-follow-up-email",
  "decision-log-from-project-notes",
  "weekly-priorities-from-project-list",
  "meeting-agenda-from-notes",
  "meeting-notes-to-decision-brief",
  "customer-feedback-theme-map",
  "project-handoff-brief",
  "project-notes-to-decision-memo",
  "turn-rough-notes-into-decision-email",
  "weekly-review-from-completed-and-blocked-work",
  "evidence-matrix-from-source-notes",
];
const topics = ["research-and-decisions", "writing-and-updates", "meetings-and-follow-up", "planning-and-priorities"];
const pageRoutes = ["/", "/guides", "/series", "/about", "/editorial-policy", "/privacy", "/terms", "/contact", "/workflows/meetings/meeting-minutes-vs-decision-brief/", "/tools/ai-prompt-word-counter/", "/tools/markdown-preview/"];
const guideRoutes = guides.map(slug => `/guides/${slug}`);
const workflowRoutes = topics.map(slug => `/workflows/${slug}`);
const sitemapGroups = [
  { file: "sitemap-pages.xml", routes: pageRoutes },
  { file: "sitemap-guides.xml", routes: guideRoutes },
  { file: "sitemap-workflows.xml", routes: workflowRoutes },
];
const routes = sitemapGroups.flatMap(group => group.routes);
const lastmod = "2026-08-17";
const xmlEscape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const canonicalUrl = (route) => route === "/" ? `${origin}/` : `${origin}${route.replace(/\/$/, "")}/`;
const createUrlset = (groupRoutes) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${groupRoutes.map(route => `  <url><loc>${xmlEscape(canonicalUrl(route))}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`;
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapGroups.map(({ file }) => `  <sitemap><loc>${xmlEscape(`${origin}/${file}`)}</loc><lastmod>${lastmod}</lastmod></sitemap>`).join("\n")}\n</sitemapindex>\n`;
const robots = `User-agent: *\nAllow: /\nDisallow: /404\n\nSitemap: ${origin}/sitemap_index.xml\n`;
const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = process.env.SITEMAP_OUTPUT_DIR ? path.resolve(process.env.SITEMAP_OUTPUT_DIR) : path.resolve(here, "..", "client", "public");
await mkdir(publicDir, { recursive: true });
await Promise.all([
  ...sitemapGroups.map(({ file, routes: groupRoutes }) => writeFile(path.join(publicDir, file), createUrlset(groupRoutes), "utf8")),
  writeFile(path.join(publicDir, "sitemap_index.xml"), sitemapIndex, "utf8"),
  // Keep the previously submitted address valid while Search Console migrates to sitemap_index.xml.
  writeFile(path.join(publicDir, "sitemap.xml"), sitemapIndex, "utf8"),
  writeFile(path.join(publicDir, "robots.txt"), robots, "utf8"),
]);
console.log(`Generated sitemap_index.xml, ${sitemapGroups.length} child sitemaps, compatibility sitemap.xml, and robots.txt for ${origin} (${routes.length} canonical URLs).`);
