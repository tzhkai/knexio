/** Generate sitemap.xml and robots.txt only after the final public domain is known. */
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
  "customer-feedback-theme-map",
  "project-handoff-brief",
];
const topics = ["research-and-decisions", "writing-and-updates", "meetings-and-follow-up", "planning-and-priorities"];
const routes = ["/", "/guides", "/series", "/about", "/editorial-policy", "/privacy", "/terms", "/contact", ...guides.map(slug => `/guides/${slug}`), ...topics.map(slug => `/workflows/${slug}`)];
const lastmod = "2026-08-15";
const xmlEscape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${xmlEscape(`${origin}${route}`)}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\nDisallow: /404\n\nSitemap: ${origin}/sitemap.xml\n`;
const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = process.env.SITEMAP_OUTPUT_DIR ? path.resolve(process.env.SITEMAP_OUTPUT_DIR) : path.resolve(here, "..", "client", "public");
await mkdir(publicDir, { recursive: true });
await Promise.all([writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8"), writeFile(path.join(publicDir, "robots.txt"), robots, "utf8")]);
console.log(`Generated sitemap.xml and robots.txt for ${origin} (${routes.length} canonical URLs).`);
