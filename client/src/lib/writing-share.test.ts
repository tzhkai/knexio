import { describe, expect, it } from "vitest";
import { buildTopicPathShareUrl, buildWritingShareUrl, clampShareDimension, TOPIC_PATH_SHARE_URLS, WRITING_SHARE_URL } from "./writing-share";

describe("writing share helpers", () => {
  it("keeps the canonical URL when UTM tracking is disabled", () => {
    expect(buildWritingShareUrl({ enabled: false, source: "instagram", medium: "social", campaign: "writing" })).toBe(WRITING_SHARE_URL);
  });

  it("adds trimmed UTM parameters when tracking is enabled", () => {
    expect(buildWritingShareUrl({ enabled: true, source: " instagram ", medium: " social ", campaign: " writing-path " })).toBe(`${WRITING_SHARE_URL}?utm_source=instagram&utm_medium=social&utm_campaign=writing-path`);
  });

  it("keeps each non-writing topic on its own canonical path while allowing optional UTM parameters", () => {
    expect(buildTopicPathShareUrl("meetings-and-follow-up", { enabled: false, source: "x", medium: "social", campaign: "meeting-path" })).toBe(TOPIC_PATH_SHARE_URLS["meetings-and-follow-up"]);
    expect(buildTopicPathShareUrl("research-and-decisions", { enabled: true, source: " linkedin ", medium: " social ", campaign: " research-path " })).toBe(`${TOPIC_PATH_SHARE_URLS["research-and-decisions"]}?utm_source=linkedin&utm_medium=social&utm_campaign=research-path`);
  });

  it("clamps custom image dimensions to safe bounds", () => {
    expect(clampShareDimension(100, 1200)).toBe(320);
    expect(clampShareDimension(5000, 760)).toBe(2400);
    expect(clampShareDimension(Number.NaN, 760)).toBe(760);
  });
});
