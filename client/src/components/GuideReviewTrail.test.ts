import { describe, expect, it } from "vitest";
import { buildGuideReviewNote, guideReviewStorageKey, parseGuideReviewProgress } from "./GuideReviewTrail";

describe("GuideReviewTrail helpers", () => {
  const checks = ["Reopen the source", "Confirm the owner", "Name the uncertainty"];

  it("keeps only known, unique local review marks", () => {
    expect(parseGuideReviewProgress('["Reopen the source","unknown","Reopen the source",2]', checks)).toEqual(["Reopen the source"]);
    expect(parseGuideReviewProgress("not-json", checks)).toEqual([]);
  });

  it("uses one reader-owned storage key per guide", () => {
    expect(guideReviewStorageKey("research-brief-from-scattered-sources")).toBe("workflow-library:guide-review:research-brief-from-scattered-sources");
  });

  it("builds a portable record without claiming completion for unchecked items", () => {
    const record = buildGuideReviewNote("A research brief", checks, ["Confirm the owner"]);
    expect(record).toContain("Guide: A research brief");
    expect(record).toContain("- [ ] Reopen the source");
    expect(record).toContain("- [x] Confirm the owner");
    expect(record).toContain("reader-owned local checklist");
  });
});
