import { describe, expect, it } from "vitest";
import { guides } from "./content";
import { brokenLinkReportHref, guideSearchQuery, guideTitleSuggestions, latestGuides, searchGuides, splitSearchHighlight } from "./guide-discovery";

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

  it("offers title-only suggestions and safely segments matching text for display", () => {
    expect(guideTitleSuggestions(guides, "meeting follow-up")).toEqual(["Write a meeting follow-up email without inventing commitments"]);
    expect(guideTitleSuggestions(guides, "unlikely phrase")).toEqual([]);
    expect(splitSearchHighlight("Meeting follow-up", "follow-up")).toEqual([
      { value: "Meeting ", matches: false },
      { value: "follow-up", matches: true },
    ]);
  });

  it("creates a report link that only includes the current path and no tracking parameters", () => {
    const href = brokenLinkReportHref("/games/mini-crossword/");
    expect(href).toContain("mailto:tzhkai6@gmail.com");
    expect(decodeURIComponent(href)).toContain("https://knexio.xyz/games/mini-crossword/");
    expect(href).not.toContain("utm_");
  });
});
