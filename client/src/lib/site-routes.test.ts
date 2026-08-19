import { describe, expect, it } from "vitest";
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
});
