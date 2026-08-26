import { describe, expect, it } from "vitest";
import { AUTO_READING_PROGRESS_MIN_SECTIONS, READING_PROGRESS_GUIDE_SLUGS, shouldShowArticleReadingProgress } from "./article-reading-progress-guides";

describe("core long-form reading progress scope", () => {
  it("includes cross-topic research, planning, and meeting guides with substantial reference content", () => {
    expect(READING_PROGRESS_GUIDE_SLUGS).toContain("evidence-to-priority-plan");
    expect(READING_PROGRESS_GUIDE_SLUGS).toContain("evidence-matrix-from-source-notes");
    expect(READING_PROGRESS_GUIDE_SLUGS).toContain("weekly-priorities-from-project-list");
    expect(READING_PROGRESS_GUIDE_SLUGS).toContain("meeting-notes-to-decision-brief");
  });

  it("keeps shorter guides quiet but expands the reading bar to genuinely substantial authored articles", () => {
    expect(shouldShowArticleReadingProgress("evidence-to-priority-plan")).toBe(true);
    expect(shouldShowArticleReadingProgress("clear-project-update-prompt")).toBe(false);
    expect(shouldShowArticleReadingProgress("clear-project-update-prompt", AUTO_READING_PROGRESS_MIN_SECTIONS - 1)).toBe(false);
    expect(shouldShowArticleReadingProgress("clear-project-update-prompt", AUTO_READING_PROGRESS_MIN_SECTIONS)).toBe(true);
  });
});
