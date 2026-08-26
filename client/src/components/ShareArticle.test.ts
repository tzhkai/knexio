import { describe, expect, it } from "vitest";
import { buildArticleShareNote } from "./ShareArticle";

describe("buildArticleShareNote", () => {
  it("keeps the title, reader-facing description, and canonical URL in a paste-ready order", () => {
    expect(buildArticleShareNote("Check a claim", "Keep the source trail visible.", "https://knexio.xyz/guides/check-a-claim/")).toBe("Check a claim\n\nKeep the source trail visible.\n\nhttps://knexio.xyz/guides/check-a-claim/");
  });
});
