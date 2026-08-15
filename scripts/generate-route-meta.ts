/** Build-time SEO entry generator: Field Notes metadata stays factual, task-led, and readable without JavaScript. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { guides, heroImage, topicClusters } from "../client/src/lib/content";

type RouteMeta = {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
};

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");
const outputDir = path.resolve(projectRoot, "dist", "public");
const configuredOrigin = process.env.SITE_URL || "https://knexio.xyz";
const origin = new URL(configuredOrigin).origin;
const brand = "Workflow Library";
const defaultImageAlt = "Workflow Library field guide for practical AI workflows";

const staticRoutes: RouteMeta[] = [
  { path: "/", title: "Practical AI workflows, prompts, and review checks", description: "Practical AI workflows for research, writing, meeting notes, and project planning. Each guide includes a scoped prompt, clear limits, and human review checks.", image: heroImage, imageAlt: "A calm desk arranged with research notes, paper, and an understated laptop" },
  { path: "/guides", title: "AI workflows for research, writing, meetings, and planning", description: "Browse practical AI workflows for research briefs, project updates, meeting action lists, content planning, and focused first drafts." },
  { path: "/series", title: "AI workflow guides: read in order", description: "Follow a four-stage AI workflow reading path: frame the work, make decisions visible, run the conversation, and carry the record forward." },
  { path: "/about", title: "About the editorial project", description: "Workflow Library is an independent editorial project publishing practical, human-reviewed AI workflows for everyday knowledge work." },
  { path: "/editorial-policy", title: "Editorial standards and method", description: "How Workflow Library approaches authorship, AI assistance, sources, corrections, and practical content quality." },
  { path: "/privacy", title: "Privacy and cookie notice", description: "Workflow Library's policy for consent choices, necessary local storage, optional analytics, and disclosed advertising technology." },
  { path: "/terms", title: "Terms of use", description: "Workflow Library terms covering educational use, permitted conduct, AI limitations, intellectual property, third-party links, and policy updates." },
  { path: "/contact", title: "Contact the editorial desk", description: "Contact Workflow Library about editorial corrections, privacy requests, accessibility feedback, and commercial disclosures." },
  { path: "/404", title: "Page not found", description: "This page is not in the Workflow Library index.", noIndex: true },
];

const guideRoutes: RouteMeta[] = guides.map((guide) => ({
  path: `/guides/${guide.slug}`,
  title: guide.title,
  description: guide.dek,
  image: guide.image || heroImage,
  imageAlt: guide.imageAlt || defaultImageAlt,
  type: "article",
  publishedTime: guide.publishedAt,
  modifiedTime: guide.updatedAt,
  section: guide.category,
  tags: guide.topics,
}));

const topicRoutes: RouteMeta[] = topicClusters.map((topic) => ({
  path: `/workflows/${topic.slug}`,
  title: topic.seoTitle,
  description: topic.description,
}));

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function absoluteUrl(value: string) {
  return value.startsWith("http") ? value : `${origin}${value}`;
}

function routeUrl(routePath: string) {
  return routePath === "/" ? `${origin}/` : `${origin}${routePath}`;
}

function metadataTags(meta: RouteMeta) {
  const pageUrl = routeUrl(meta.path);
  const imageUrl = absoluteUrl(meta.image || heroImage);
  const imageAlt = meta.imageAlt || defaultImageAlt;
  const title = `${meta.title} | ${brand}`;
  const robots = meta.noIndex ? "noindex,follow" : "index,follow";
  const webPage = { "@context": "https://schema.org", "@type": meta.type === "article" ? "Article" : "WebPage", name: meta.title, description: meta.description, url: pageUrl, isPartOf: { "@type": "WebSite", name: brand, url: origin } };
  const articleTags = meta.type === "article" ? [
    `<meta property="article:published_time" content="${escapeHtml(meta.publishedTime || "")}" />`,
    `<meta property="article:modified_time" content="${escapeHtml(meta.modifiedTime || "")}" />`,
    `<meta property="article:section" content="${escapeHtml(meta.section || "")}" />`,
    ...(meta.tags || []).map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" />`),
  ] : [];
  return [
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="googlebot" content="${meta.noIndex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1"}" />`,
    `<link rel="canonical" href="${pageUrl}" />`,
    `<meta property="og:type" content="${meta.type || "website"}" />`,
    `<meta property="og:site_name" content="${brand}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:image:secure_url" content="${imageUrl}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
    ...articleTags,
    `<script id="workflow-library-page-schema" type="application/ld+json">${JSON.stringify(webPage)}</script>`,
    `<title>${escapeHtml(title)}</title>`,
  ].join("\n    ");
}

function staticHead(baseHead: string, meta: RouteMeta) {
  const preservedLinks = [...baseHead.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((link) => !/rel=["']canonical["']/i.test(link))
    .join("\n    ");
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <meta name="theme-color" content="#176B5B" />
    ${metadataTags(meta)}
    ${preservedLinks}
  </head>`;
}

function outputPath(routePath: string) {
  return routePath === "/" ? path.join(outputDir, "index.html") : path.join(outputDir, routePath.slice(1), "index.html");
}

const baseHtml = await readFile(path.join(outputDir, "index.html"), "utf8");
const baseHead = baseHtml.match(/<head>[\s\S]*?<\/head>/i)?.[0];
if (!baseHead) throw new Error("Could not locate the Vite HTML head for route metadata generation.");

const allRoutes = [...staticRoutes, ...guideRoutes, ...topicRoutes];
await Promise.all(allRoutes.map(async (meta) => {
  const destination = outputPath(meta.path);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, baseHtml.replace(baseHead, staticHead(baseHead, meta)), "utf8");
}));

console.log(`Generated static Meta, Open Graph, Twitter, canonical, and JSON-LD heads for ${allRoutes.length} routes at ${origin}.`);
