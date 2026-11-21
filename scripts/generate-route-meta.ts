/** Build-time SEO entry generator: Field Notes metadata stays factual, task-led, and readable without JavaScript. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { heroImage } from "../client/src/lib/content";
import { electricityPageMetas } from "../client/src/data/electricityRoutes";

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
const configuredOrigin = process.env.SITE_URL || "https://knexio.cc.cd";
const origin = new URL(configuredOrigin).origin;
const brand = "Knexio";
const defaultImageAlt = "Knexio reference of U.S. residential electricity bills, sourced from EIA data";

/** Trust pages keep their URL; everything else is generated from the electricity route table. */
export const infoRoutes: RouteMeta[] = [
  { path: "/about", title: "About this electricity reference", description: "Knexio publishes an independent U.S. residential electricity bill reference built on EIA Electric Power Monthly releases and RECS 2020 housing ratios." },
  { path: "/editorial-policy", title: "Editorial standards and data method", description: "How Knexio selects sources, computes averages, labels modeled figures, dates every dataset, and handles corrections." },
  { path: "/privacy", title: "Privacy and cookie notice", description: "What this site stores in your browser, which third parties receive requests, and how consent choices are recorded." },
  { path: "/terms", title: "Terms of use", description: "Terms for using the electricity reference and calculator, including accuracy limits, permitted reuse, and citation guidance." },
  { path: "/contact", title: "Contact and corrections", description: "Report a data error, request a correction, or ask about the method behind any figure published here." },
  { path: "/404", title: "Page not found", description: "This page is not part of the Knexio electricity index.", noIndex: true },
];

export const staticRoutes: RouteMeta[] = [...electricityPageMetas, ...infoRoutes];

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function absoluteUrl(value: string) {
  return value.startsWith("http") ? value : `${origin}${value}`;
}

export function routeUrl(routePath: string) {
  return routePath === "/" ? `${origin}/` : `${origin}${routePath.replace(/\/$/, "")}/`;
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
  const preservedRuntimeScripts = [...baseHead.matchAll(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*><\/script>/gi)]
    .map((match) => match[0])
    .filter((script) => /type=["']module["']|pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/i.test(script))
    .join("\n    ");
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <meta name="theme-color" content="#176B5B" />
    ${metadataTags(meta)}
    ${preservedLinks}
    ${preservedRuntimeScripts}
  </head>`;
}

export function outputPath(routePath: string) {
  return routePath === "/" ? path.join(outputDir, "index.html") : path.join(outputDir, routePath.slice(1), "index.html");
}

const baseHtml = await readFile(path.join(outputDir, "index.html"), "utf8");
const baseHead = baseHtml.match(/<head>[\s\S]*?<\/head>/i)?.[0];
if (!baseHead) throw new Error("Could not locate the Vite HTML head for route metadata generation.");

export const allRoutes: RouteMeta[] = staticRoutes;

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await Promise.all(allRoutes.map(async (meta) => {
    const destination = outputPath(meta.path);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, baseHtml.replace(baseHead, staticHead(baseHead, meta)), "utf8");
  }));

  console.log(`Generated static Meta, Open Graph, Twitter, canonical, and JSON-LD heads for ${allRoutes.length} routes at ${origin}.`);
}
