import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { allSitemapRoutes, guideSitemapRoutes, staticSitemapRoutes, workflowSitemapRoutes } from "../../../scripts/site-routes";

const normalized = (route: string) => route === "/" ? "/" : `${route.replace(/\/$/, "")}/`;

describe("shared sitemap routes", () => {
  it("contains unique canonical route paths", () => {
    const routes = allSitemapRoutes.map(normalized);
    expect(new Set(routes).size).toBe(routes.length);
    expect(routes.every((route) => route === "/" || route.endsWith("/"))).toBe(true);
  });

  it("includes public tools, guides, and workflow clusters", () => {
    expect(staticSitemapRoutes).toEqual(expect.arrayContaining([
      "/tools/ai-prompt-word-counter/",
      "/tools/markdown-preview/",
    ]));
    expect(guideSitemapRoutes.length).toBeGreaterThan(0);
    expect(workflowSitemapRoutes).toEqual(expect.arrayContaining([
      "/workflows/research-and-decisions",
      "/workflows/meetings-and-follow-up",
    ]));
  });

  it("keeps the AdSense publisher authorization record present", () => {
    const adsTxt = readFileSync(new URL("../../public/ads.txt", import.meta.url), "utf8");
    expect(adsTxt).toContain("google.com, pub-2596567349043393, DIRECT, f08c47fec0942fa0");
  });
});
