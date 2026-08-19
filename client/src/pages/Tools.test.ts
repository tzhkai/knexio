import { describe, expect, it } from "vitest";
import { buildShareLinks, clearLocalDraft, countPromptWords, estimateTokenCount, highlightCode, readLocalDraft, renderMarkdown, writeLocalDraft } from "./Tools";

describe("Workflow utilities", () => {
  it("counts prompt words using whitespace boundaries", () => {
    expect(countPromptWords("  Give me a brief\nwith sources. ")).toBe(6);
    expect(countPromptWords("   ")).toBe(0);
  });

  it("estimates tokens transparently without claiming exact model tokenization", () => { expect(estimateTokenCount("abcd", "gpt-4")).toBe(1); expect(estimateTokenCount("abcdefgh", "claude")).toBe(3); expect(estimateTokenCount("", "gemini")).toBe(0); });

  it("highlights supported code keywords while escaping markup", () => { const html = highlightCode("const value = \"<safe>\";", "js"); expect(html).toContain("code-keyword"); expect(html).toContain("code-string"); expect(html).toContain("&lt;safe&gt;"); });

  it("renders the supported Markdown subset", () => {
    const html = renderMarkdown("# Title\n\nUse **context**.\n\n- One\n- Two\n\n> Check it.");
    expect(html.__html).toContain("<h1>Title</h1>");
    expect(html.__html).toContain("<strong>context</strong>");
    expect(html.__html).toContain("<ul><li>One</li><li>Two</li></ul>");
    expect(html.__html).toContain("<blockquote>Check it.</blockquote>"); expect(renderMarkdown("```js\nconst ready = true;\n```").__html).toContain("code-keyword");
  });

  it("builds encoded social sharing links", () => { const links = buildShareLinks("https://knexio.xyz/tools/markdown-preview/?a=1&b=2", "Markdown Preview & Notes"); expect(links.linkedIn).toContain("%26"); expect(links.x).toContain("Markdown%20Preview%20%26%20Notes"); expect(links.facebook).toContain("markdown-preview"); });

  it("falls back safely when local storage is unavailable", () => { expect(readLocalDraft("missing-key", "fallback")).toBe("fallback"); expect(() => writeLocalDraft("key", "value")).not.toThrow(); expect(() => clearLocalDraft("key")).not.toThrow(); });

  it("escapes raw HTML instead of interpreting it", () => {
    const html = renderMarkdown("<script>alert('x')</script>");
    expect(html.__html).not.toContain("<script>");
    expect(html.__html).toContain("&lt;script&gt;");
  });
});
