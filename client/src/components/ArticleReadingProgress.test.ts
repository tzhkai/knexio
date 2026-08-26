import { describe, expect, it } from "vitest";
import { calculateArticleReadingProgress } from "./ArticleReadingProgress";

describe("article reading progress", () => {
  it("clamps progress before, within, and after the readable article range", () => {
    expect(calculateArticleReadingProgress(100, 2000, 800, 0)).toBe(0);
    expect(calculateArticleReadingProgress(100, 2000, 800, 100)).toBe(0);
    expect(calculateArticleReadingProgress(100, 2000, 800, 900)).toBe(51);
    expect(calculateArticleReadingProgress(100, 2000, 800, 5000)).toBe(100);
  });

  it("keeps a short article calculation safe", () => {
    expect(calculateArticleReadingProgress(0, 200, 800, 0)).toBe(0);
    expect(calculateArticleReadingProgress(0, 200, 800, 1)).toBe(100);
  });
});
