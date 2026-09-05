import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("sitemap lastmod generation", () => {
  it("uses evidence-based dates for recently updated tools, guides, and flagship rewrites", () => {
    const projectRoot = process.cwd();
    const output = mkdtempSync(path.join(tmpdir(), "knexio-sitemap-"));
    try {
      execFileSync("pnpm", ["exec", "tsx", "scripts/generate-sitemap.ts"], { cwd: projectRoot, env: { ...process.env, SITE_URL: "https://knexio.xyz", SITEMAP_OUTPUT_DIR: output } });
      const pages = readFileSync(path.join(output, "sitemap-pages.xml"), "utf8");
      const guides = readFileSync(path.join(output, "sitemap-guides.xml"), "utf8");
      expect(pages).toContain("<loc>https://knexio.xyz/tools/ai-prompt-word-counter/</loc><lastmod>2026-08-25</lastmod>");
      expect(guides).toContain("<loc>https://knexio.xyz/guides/meeting-agenda-from-notes/</loc><lastmod>2026-09-04</lastmod>");
      expect(guides).toContain("<loc>https://knexio.xyz/guides/research-brief-from-scattered-sources/</loc><lastmod>2026-08-26</lastmod>");
      expect(guides).toContain("<loc>https://knexio.xyz/guides/evidence-matrix-from-source-notes/</loc><lastmod>2026-08-26</lastmod>");
      expect(guides).toContain("<loc>https://knexio.xyz/guides/evidence-to-priority-plan/</loc><lastmod>2026-08-26</lastmod>");
      expect(guides).toContain("<loc>https://knexio.xyz/guides/meeting-notes-to-decision-brief/</loc><lastmod>2026-08-26</lastmod>");
      for (const slug of [
        "clear-project-update-prompt",
        "one-week-content-plan-from-questions",
        "brief-first-prompt-pattern",
        "thirty-minute-project-starting-plan",
        "meeting-follow-up-email",
        "decision-log-from-project-notes",
        "weekly-priorities-from-project-list",
        "meeting-agenda-from-notes",
        "customer-feedback-theme-map",
        "project-handoff-brief",
        "project-notes-to-decision-memo",
        "turn-rough-notes-into-decision-email",
        "weekly-review-from-completed-and-blocked-work",
      ]) {
        expect(guides).toContain(`<loc>https://knexio.xyz/guides/${slug}/</loc><lastmod>2026-09-04</lastmod>`);
      }
    } finally {
      rmSync(output, { recursive: true, force: true });
    }
  });
});
