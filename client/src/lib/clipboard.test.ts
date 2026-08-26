import { describe, expect, it, vi } from "vitest";
import { copyTextToClipboard } from "./clipboard";

describe("copyTextToClipboard", () => {
  it("uses the Clipboard API when it is available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    await expect(copyTextToClipboard("Priority record", { writeText })).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("Priority record");
  });

  it("does not claim success for empty text or a rejected clipboard write", async () => {
    await expect(copyTextToClipboard("", { writeText: vi.fn() })).resolves.toBe(false);
    await expect(copyTextToClipboard("Priority record", { writeText: vi.fn().mockRejectedValue(new Error("blocked")) })).resolves.toBe(false);
  });
});
