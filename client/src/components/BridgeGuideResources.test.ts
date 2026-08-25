import { describe, expect, it } from "vitest";
import { BRIDGE_GUIDE_RESOURCES, BRIDGE_RESOURCE_FILTERS, filterBridgeGuideResources, isResourceSearchShortcut, searchBridgeGuideResources } from "./BridgeGuideResources";

describe("bridge guide resources", () => {
  it("keeps the resource block grounded in two local tools and two connected guides", () => {
    expect(BRIDGE_GUIDE_RESOURCES).toHaveLength(4);
    expect(BRIDGE_GUIDE_RESOURCES.filter((item) => item.kind === "Tool").map((item) => item.href)).toEqual([
      "/tools/markdown-preview/",
      "/tools/ai-prompt-word-counter/",
    ]);
    expect(BRIDGE_GUIDE_RESOURCES.filter((item) => item.kind === "Read").map((item) => item.href)).toEqual([
      "/guides/evidence-matrix-from-source-notes/",
      "/guides/weekly-priorities-from-project-list/",
    ]);
    expect(BRIDGE_GUIDE_RESOURCES.map((item) => item.slug)).toEqual([
      "markdown-preview",
      "ai-prompt-word-counter",
      "evidence-matrix-from-source-notes",
      "weekly-priorities-from-project-list",
    ]);
  });

  it("filters the resource choices without changing their stable identifiers", () => {
    expect(BRIDGE_RESOURCE_FILTERS.map((filter) => filter.value)).toEqual(["all", "tool", "read"]);
    expect(filterBridgeGuideResources("all")).toHaveLength(4);
    expect(filterBridgeGuideResources("tool").map((item) => item.slug)).toEqual(["markdown-preview", "ai-prompt-word-counter"]);
    expect(filterBridgeGuideResources("read").map((item) => item.slug)).toEqual(["evidence-matrix-from-source-notes", "weekly-priorities-from-project-list"]);
  });

  it("searches titles, descriptions and stable slugs within the selected category", () => {
    expect(searchBridgeGuideResources("all", "prompt").map((item) => item.slug)).toEqual(["ai-prompt-word-counter"]);
    expect(searchBridgeGuideResources("tool", "markdown").map((item) => item.slug)).toEqual(["markdown-preview"]);
    expect(searchBridgeGuideResources("read", "source").map((item) => item.slug)).toEqual(["evidence-matrix-from-source-notes"]);
    expect(searchBridgeGuideResources("read", "counter")).toEqual([]);
  });

  it("reserves slash without modifiers as the search-focus shortcut", () => {
    expect(isResourceSearchShortcut({ key: "/", metaKey: false, ctrlKey: false, altKey: false, shiftKey: false })).toBe(true);
    expect(isResourceSearchShortcut({ key: "/", metaKey: true, ctrlKey: false, altKey: false, shiftKey: false })).toBe(false);
    expect(isResourceSearchShortcut({ key: "k", metaKey: false, ctrlKey: false, altKey: false, shiftKey: false })).toBe(false);
  });
});
