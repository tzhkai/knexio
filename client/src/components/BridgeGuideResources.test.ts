import { describe, expect, it } from "vitest";
import { BRIDGE_GUIDE_RESOURCES } from "./BridgeGuideResources";

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
});
