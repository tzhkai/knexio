import { describe, expect, it } from "vitest";
import { legacyRecoveryLinks } from "./NotFound";

describe("NotFound recovery paths", () => {
  it("gives users of retired links an immediate route home and into the current library", () => {
    expect(legacyRecoveryLinks.map(link => link.href)).toEqual(["/", "/guides", "/read-order"]);
    expect(legacyRecoveryLinks.map(link => link.label)).toContain("Return home");
  });
});
