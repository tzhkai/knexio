import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("sitemap lastmod generation", () => {
  it("uses current dates for the updated Prompt Counter, Meeting Agenda, and transition guide routes", () => {
    const projectRoot = process.cwd();
    const output = mkdtempSync(path.join(tmpdir(), "knexio-sitemap-"));
    try {
      execFileSync("pnpm", ["exec", "tsx", "scripts/generate-sitemap.ts"], { cwd: projectRoot, env: { ...process.env, SITE_URL: "https://knexio.xyz", SITEMAP_OUTPUT_DIR: output } });
      const pages = readFileSync(path.join(output, "sitemap-pages.xml"), "utf8");
      const guides = readFileSync(path.join(output, "sitemap-guides.xml"), "utf8");
      expect(pages).toContain("<loc>https://knexio.xyz/tools/ai-prompt-word-counter/</loc><lastmod>2026-08-25</lastmod>");
      expect(guides).toContain("<loc>https://knexio.xyz/guides/meeting-agenda-from-notes/</loc><lastmod>2026-08-25</lastmod>");
      expect(guides).toContain("<loc>https://knexio.xyz/guides/evidence-to-priority-plan/</loc><lastmod>2026-08-25</lastmod>");
    } finally {
      rmSync(output, { recursive: true, force: true });
    }
  });
});
