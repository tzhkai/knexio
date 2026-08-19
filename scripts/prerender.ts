/**
 * Build-time prerenderer: renders every published route in a real headless
 * browser and writes the full HTML so raw responses contain visible content,
 * not an empty SPA shell. Runs after `vite build` + `generate-route-meta.ts`
 * + the server bundle, so `dist/public` and `dist/index.js` already exist.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Page } from "playwright";
import { allRoutes, outputPath, type RouteMeta } from "./generate-route-meta";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");
const outputDir = path.resolve(projectRoot, "dist", "public");
const PORT = Number(process.env.PRERENDER_PORT || 3100);
const BASE = `http://127.0.0.1:${PORT}`;
const SETTLE_MS = Number(process.env.PRERENDER_SETTLE_MS || 1000);
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 3);
const productionOrigin = new URL(process.env.SITE_URL || "https://knexio.xyz").origin;

function pageUrl(routePath: string) {
  return routePath === "/" ? `${BASE}/` : `${BASE}${routePath.replace(/\/$/, "")}/`;
}

async function waitForServer(url: string, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return;
    } catch {
      /* server not ready yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`Prerender server did not become ready at ${url}`);
}

let server: ChildProcess | null = null;

async function startServer(): Promise<string> {
  server = spawn("node", ["dist/index.js"], {
    cwd: projectRoot,
    env: { ...process.env, NODE_ENV: "production", PORT: String(PORT) },
    stdio: "ignore",
  });
  await waitForServer(BASE);
  return BASE;
}

function stopServer() {
  if (server) {
    server.kill("SIGTERM");
    server = null;
  }
}

async function renderRoute(page: Page, meta: RouteMeta) {
  const url = pageUrl(meta.path);
  await page.goto(url, { waitUntil: "load", timeout: 30000 });
  await page.waitForSelector('link[rel="canonical"]', { state: "attached", timeout: 20000 });
  await page.waitForFunction(() => {
    const root = document.getElementById("root");
    if (!root) return false;
    const fallback = root.querySelector("main[role='status']");
    const mounted = root.querySelector("#main-content, article");
    return Boolean(mounted && (!fallback || mounted !== fallback));
  }, { timeout: 20000 });
  await page.waitForTimeout(SETTLE_MS);
  const html = (await page.content()).replaceAll(BASE, productionOrigin).replaceAll(encodeURIComponent(BASE), encodeURIComponent(productionOrigin));
  if (html.includes(BASE) || html.includes(encodeURIComponent(BASE))) {
    throw new Error(`Prerendered ${meta.path} still contains the local prerender base URL.`);
  }
  const destination = outputPath(meta.path);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
  const bytes = Buffer.byteLength(html);
  const canonical = meta.path === "/" ? `${productionOrigin}/` : `${productionOrigin}${meta.path.replace(/\/$/, "")}/`;
  console.log(`Prerendered ${meta.path} (${bytes} B) -> ${path.relative(projectRoot, destination)} (canonical ${canonical})`);
}

async function run() {
  await startServer();
  const browser = await chromium.launch();
  try {
    const routes = [...allRoutes];
    let cursor = 0;
    let failures = 0;

    async function worker() {
      const page = await browser.newPage();
      try {
        while (cursor < routes.length) {
          const meta = routes[cursor++];
          try {
            await renderRoute(page, meta);
          } catch (error) {
            failures += 1;
            console.error(`Prerender FAILED for ${meta.path}: ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      } finally {
        await page.close();
      }
    }

    const workers = Array.from({ length: Math.min(CONCURRENCY, routes.length) }, () => worker());
    await Promise.all(workers);

    if (failures > 0) {
      throw new Error(`${failures} route(s) failed to prerender.`);
    }
    console.log(`Prerendered ${routes.length} routes into ${outputDir}.`);
  } finally {
    await browser.close();
    stopServer();
  }
}

run().catch((error) => {
  stopServer();
  console.error(error);
  process.exitCode = 1;
});