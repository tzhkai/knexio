import { describe, expect, it } from "vitest";
import { countPromptWords, renderMarkdown } from "./Tools";

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

  it("escapes raw HTML instead of interpreting it", () => {
    const html = renderMarkdown("<script>alert('x')</script>");
    expect(html.__html).not.toContain("<script>");
    expect(html.__html).toContain("&lt;script&gt;");
  });
});
