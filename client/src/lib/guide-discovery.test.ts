import { describe, expect, it } from "vitest";
import { guides } from "./content";
import { guideSearchQuery, latestGuides, searchGuides } from "./guide-discovery";

describe("guide discovery helpers", () => {
  it("matches current guides by task text without inventing a popularity signal", () => {
    expect(searchGuides(guides, "meeting follow-up").map(guide => guide.slug)).toContain("meeting-follow-up-email");
    expect(searchGuides(guides, "unlikely phrase")).toEqual([]);
    expect(searchGuides(guides, "")).toEqual(guides);
  });

  it("orders latest guides by their recorded update timestamp without mutating the source list", () => {
    const before = guides.map(guide => guide.slug);
    const latest = latestGuides(guides, 4);
    expect(latest).toHaveLength(4);
    expect(latest.every((guide, index) => index === 0 || Date.parse(latest[index - 1]!.updatedAt) >= Date.parse(guide.updatedAt))).toBe(true);
    expect(guides.map(guide => guide.slug)).toEqual(before);
  });

  it("reads a bounded guide query from the current URL", () => {
    expect(guideSearchQuery("?q=meeting%20notes")).toBe("meeting notes");
    expect(guideSearchQuery("")).toBe("");
  });
});
