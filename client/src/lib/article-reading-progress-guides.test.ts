import { describe, expect, it } from "vitest";
import { READING_PROGRESS_GUIDE_SLUGS, shouldShowArticleReadingProgress } from "./article-reading-progress-guides";

describe("core long-form reading progress scope", () => {
  it("includes cross-topic research, planning, and meeting guides with substantial reference content", () => {
    expect(READING_PROGRESS_GUIDE_SLUGS).toContain("evidence-to-priority-plan");
    expect(READING_PROGRESS_GUIDE_SLUGS).toContain("evidence-matrix-from-source-notes");
    expect(READING_PROGRESS_GUIDE_SLUGS).toContain("weekly-priorities-from-project-list");
    expect(READING_PROGRESS_GUIDE_SLUGS).toContain("meeting-notes-to-decision-brief");
  });

  it("does not enable the progress bar for a shorter guide outside the editorial long-form set", () => {
    expect(shouldShowArticleReadingProgress("evidence-to-priority-plan")).toBe(true);
    expect(shouldShowArticleReadingProgress("clear-project-update-prompt")).toBe(false);
  });
});
