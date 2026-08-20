import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("AdSense ads.txt", () => {
  it("keeps the verified Google publisher record in the public root file", () => {
    const file = readFileSync(resolve(process.cwd(), "client/public/ads.txt"), "utf8");
    const lines = file.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

    expect(lines).toEqual(["google.com, pub-2596567349043393, DIRECT, f08c47fec0942fa0"]);
    expect(lines[0]).toMatch(/^google\.com, pub-2596567349043393, DIRECT, f08c47fec0942fa0$/);
  });
});
