import { describe, expect, it, vi } from "vitest";
import { NEXT_PATH_CLICK_EVENT, trackNextPathClick } from "./optional-analytics";

describe("optional next-path analytics", () => {
  it("does not send a navigation event unless site analytics is allowed", () => {
    const track = vi.fn();
    expect(trackNextPathClick(false, "research-and-decisions", "planning-and-priorities", { track })).toBe(false);
    expect(track).not.toHaveBeenCalled();
  });

  it("sends only the coarse topic transition payload when consent and a tracker are available", () => {
    const track = vi.fn();
    expect(trackNextPathClick(true, "research-and-decisions", "planning-and-priorities", { track })).toBe(true);
    expect(track).toHaveBeenCalledWith(NEXT_PATH_CLICK_EVENT, {
      from_topic: "research-and-decisions",
      to_topic: "planning-and-priorities",
      interaction: "next_path_card",
    });
  });
});
