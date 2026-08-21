import { describe, expect, it } from "vitest";
import { buildWritingShareUrl, clampShareDimension, WRITING_SHARE_URL } from "./writing-share";

describe("writing share helpers", () => {
  it("keeps the canonical URL when UTM tracking is disabled", () => {
    expect(buildWritingShareUrl({ enabled: false, source: "instagram", medium: "social", campaign: "writing" })).toBe(WRITING_SHARE_URL);
  });

  it("adds trimmed UTM parameters when tracking is enabled", () => {
    expect(buildWritingShareUrl({ enabled: true, source: " instagram ", medium: " social ", campaign: " writing-path " })).toBe(`${WRITING_SHARE_URL}?utm_source=instagram&utm_medium=social&utm_campaign=writing-path`);
  });

  it("clamps custom image dimensions to safe bounds", () => {
    expect(clampShareDimension(100, 1200)).toBe(320);
    expect(clampShareDimension(5000, 760)).toBe(2400);
    expect(clampShareDimension(Number.NaN, 760)).toBe(760);
  });
});
