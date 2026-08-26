import { describe, expect, it } from "vitest";
import { getTocProgress, type ArticleTocItem } from "./ArticleToc";

const items: ArticleTocItem[] = [
  { id: "inputs", number: "01", label: "Prepare the inputs" },
  { id: "prompt", number: "02", label: "Copy the starting prompt" },
  { id: "review", number: "03", label: "Run a human check" },
];

describe("getTocProgress", () => {
  it("returns a readable position and percentage for the active section", () => {
    expect(getTocProgress(items, "prompt")).toEqual({
      position: 2,
      total: 3,
      percent: 67,
      currentLabel: "Copy the starting prompt",
    });
  });

  it("falls back safely to the first visible section when no active id is available", () => {
    expect(getTocProgress(items, "missing")).toMatchObject({
      position: 1,
      total: 3,
      percent: 33,
      currentLabel: "Prepare the inputs",
    });
  });
});
