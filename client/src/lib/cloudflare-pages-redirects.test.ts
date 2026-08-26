import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const redirects = readFileSync(new URL("../../public/_redirects", import.meta.url), "utf8");

describe("Cloudflare Pages legacy redirects", () => {
  it("permanently sends the retired Games root and its descendants to the homepage", () => {
    expect(redirects).toContain("/games / 301");
    expect(redirects).toContain("/games/* / 301");
  });

  it("does not turn unrelated missing routes into homepage redirects", () => {
    expect(redirects).not.toMatch(/^\/\*\s+\/\s+301$/m);
  });
});
