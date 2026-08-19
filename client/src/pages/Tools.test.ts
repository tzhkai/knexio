import { describe, expect, it } from "vitest";
import { buildShareLinks, countPromptWords, renderMarkdown } from "./Tools";

describe("Workflow utilities", () => {
  it("counts prompt words using whitespace boundaries", () => {
    expect(countPromptWords("  Give me a brief\nwith sources. ")).toBe(6);
    expect(countPromptWords("   ")).toBe(0);
  });

  it("renders the supported Markdown subset", () => {
    const html = renderMarkdown("# Title\n\nUse **context**.\n\n- One\n- Two\n\n> Check it.");
    expect(html.__html).toContain("<h1>Title</h1>");
    expect(html.__html).toContain("<strong>context</strong>");
    expect(html.__html).toContain("<ul><li>One</li><li>Two</li></ul>");
    expect(html.__html).toContain("<blockquote>Check it.</blockquote>");
  });

  it("builds encoded social sharing links", () => { const links = buildShareLinks("https://knexio.xyz/tools/markdown-preview/?a=1&b=2", "Markdown Preview & Notes"); expect(links.linkedIn).toContain("%26"); expect(links.x).toContain("Markdown%20Preview%20%26%20Notes"); expect(links.facebook).toContain("markdown-preview"); });

  it("escapes raw HTML instead of interpreting it", () => {
    const html = renderMarkdown("<script>alert('x')</script>");
    expect(html.__html).not.toContain("<script>");
    expect(html.__html).toContain("&lt;script&gt;");
  });
});
