import { describe, expect, it, vi } from "vitest";
import { addShareUtm, buildPromptCounterReport, aiPromptCounterSchema, buildPromptCounterShareText, buildPromptCounterStatsReport, buildShareLinks, clearLocalDraft, clearPromptHistory, copyTextToClipboard, mergePromptHistory, countPromptWords, estimateTokenCount, highlightCode, MARKDOWN_PRESET_TEMPLATE, COUNTER_PRESET_TEMPLATE, parseTemplateExport, readLocalDraft, readPromptHistory, readPromptHistoryImportMode, renderMarkdown, resolvePresetTemplate, savePromptHistory, serializePromptHistory, parsePromptHistoryExport, serializeTemplateExport, syncScrollPosition, tokenWarningLevel, writeLocalDraft } from "./Tools";

describe("Workflow utilities", () => {
  it("copies non-empty results through the available clipboard API", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    await expect(copyTextToClipboard("Words: 4\nCharacters: 28")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("Words: 4\nCharacters: 28");
  });

  it("rejects an empty result instead of reporting a false success", async () => {
    await expect(copyTextToClipboard("")).resolves.toBe(false);
  });

  it("adds source, medium, and campaign UTM parameters to a share URL", () => {
    const tracked = new URL(addShareUtm("https://knexio.xyz/tools/ai-prompt-word-counter/", "linkedin"));
    expect(tracked.searchParams.get("utm_source")).toBe("linkedin");
    expect(tracked.searchParams.get("utm_medium")).toBe("social");
    expect(tracked.searchParams.get("utm_campaign")).toBe("prompt-counter-share");
  });

  it("builds a share text with the canonical tool URL and current statistics", () => {
    const shareText = buildPromptCounterShareText("https://knexio.xyz/tools/ai-prompt-word-counter/", { words: 12, characters: 86, lines: 4, model: "GPT-4", tokens: 22 });
    expect(shareText).toContain("Words: 12");
    expect(shareText).toContain("Estimated tokens (GPT-4): 22");
    expect(shareText).toContain("https://knexio.xyz/tools/ai-prompt-word-counter/");
  });

  it("keeps a stats-only TXT report free of the prompt body", () => {
    const report = buildPromptCounterStatsReport({ words: 4, characters: 28, lines: 1, model: "GPT-4", tokens: 7 });
    expect(report).toContain("Words: 4");
    expect(report).not.toContain("Prompt:");
  });

  it("builds a TXT report with the current prompt and statistics", () => {
    const report = buildPromptCounterReport("Task: summarize these notes", { words: 4, characters: 28, lines: 1, model: "GPT-4", tokens: 7 });
    expect(report).toContain("Estimated tokens (GPT-4): 7");
    expect(report).toContain("Prompt:\nTask: summarize these notes");
  });

  it("keeps prompt history local, deduplicated, and capped at five entries", () => {
    const key = "test:prompt-history";
    const storage = new Map<string, string>();
    vi.stubGlobal("window", { localStorage: { getItem: (name: string) => storage.get(name) ?? null, setItem: (name: string, value: string) => storage.set(name, value), removeItem: (name: string) => storage.delete(name) } });
    for (let index = 0; index < 6; index += 1) savePromptHistory(key, { text: `Prompt ${index}`, words: 2, characters: 9, lines: 1, model: "gpt-4", tokens: 3, savedAt: index });
    const history = readPromptHistory(key);
    expect(history).toHaveLength(5);
    expect(history[0].text).toBe("Prompt 5");
    savePromptHistory(key, { text: "Prompt 3", words: 2, characters: 9, lines: 1, model: "gpt-4", tokens: 3, savedAt: 10 });
    expect(readPromptHistory(key)[0].text).toBe("Prompt 3");
  });

  it("exposes truthful AI Prompt Word Counter JSON-LD fields", () => {
    const schema = aiPromptCounterSchema({ origin: "https://knexio.xyz", pageUrl: "https://knexio.xyz/tools/ai-prompt-word-counter/" });
    expect(schema["@type"]).toBe("WebApplication");
    expect(schema["@id"]).toBe("https://knexio.xyz/tools/ai-prompt-word-counter/#application");
    expect(schema.isAccessibleForFree).toBe(true);
    expect(schema.featureList).toContain("Local browser processing");
    expect(schema.creator).toMatchObject({ "@type": "Organization", name: "Knexio" });
    expect(schema.potentialAction).toMatchObject({ "@type": "UseAction" });
  });

  it("restores a valid import preference and falls back to merge", () => {
    const storage = new Map<string, string>([["mode", "replace"]]);
    vi.stubGlobal("window", { localStorage: { getItem: (name: string) => storage.get(name) ?? null, setItem: (name: string, value: string) => storage.set(name, value), removeItem: (name: string) => storage.delete(name) } });
    expect(readPromptHistoryImportMode("mode")).toBe("replace");
    storage.set("mode", "invalid");
    expect(readPromptHistoryImportMode("mode")).toBe("merge");
    expect(readPromptHistoryImportMode("missing")).toBe("merge");
  });

  it("merges prompt history by text, keeps the latest entry, and caps at five", () => {
    const existing = [{ text: "Keep", words: 1, characters: 4, lines: 1, model: "gpt-4", tokens: 1, savedAt: 2 }, { text: "Old", words: 1, characters: 3, lines: 1, model: "gpt-4", tokens: 1, savedAt: 1 }];
    const incoming = Array.from({ length: 6 }, (_, index) => ({ text: index === 0 ? "Keep" : `New ${index}`, words: 1, characters: 4, lines: 1, model: "gpt-4", tokens: 1, savedAt: index === 0 ? 9 : index + 3 }));
    const merged = mergePromptHistory(existing, incoming);
    expect(merged).toHaveLength(5);
    expect(merged[0].text).toBe("Keep");
    expect(merged[0].savedAt).toBe(9);
    expect(merged.some(entry => entry.text === "Old")).toBe(false);
  });

  it("round-trips prompt history JSON and rejects invalid versions", () => {
    const entries = [{ text: "Task: review notes", words: 3, characters: 18, lines: 1, model: "gpt-4", tokens: 5, savedAt: 10 }];
    const imported = parsePromptHistoryExport(serializePromptHistory(entries));
    expect(imported).toEqual(entries);
    expect(() => parsePromptHistoryExport(JSON.stringify({ version: 2, entries }))).toThrow();
  });

  it("clears prompt history through the storage helper", () => {
    const storage = new Map<string, string>([["history", "[]"]]);
    vi.stubGlobal("window", { localStorage: { getItem: (name: string) => storage.get(name) ?? null, setItem: (name: string, value: string) => storage.set(name, value), removeItem: (name: string) => storage.delete(name) } });
    expect(clearPromptHistory("history")).toEqual([]);
    expect(storage.has("history")).toBe(false);
  });

  it("counts prompt words using whitespace boundaries", () => {
    expect(countPromptWords("  Give me a brief\nwith sources. ")).toBe(6);
    expect(countPromptWords("   ")).toBe(0);
  });

  it("estimates tokens transparently without claiming exact model tokenization", () => { expect(estimateTokenCount("abcd", "gpt-4")).toBe(1); expect(estimateTokenCount("abcdefgh", "claude-3-5")).toBe(3); expect(estimateTokenCount("", "gemini-1-5")).toBe(0); });

  it("keeps practical copyable presets for both tools", () => {
    expect(COUNTER_PRESET_TEMPLATE).toContain("Audience:");
    expect(COUNTER_PRESET_TEMPLATE).toContain("do not invent owners or dates");
    expect(MARKDOWN_PRESET_TEMPLATE).toContain("## Confirmed");
    expect(MARKDOWN_PRESET_TEMPLATE).toContain("## Open questions");
  });

  it("prefers a saved custom template and falls back to the default", () => {
    expect(resolvePresetTemplate(" My custom brief ", "Default brief")).toBe("My custom brief");
    expect(resolvePresetTemplate("   ", "Default brief")).toBe("Default brief");
  });

  it("round-trips template JSON and rejects unsupported files", () => {
    const exported = serializeTemplateExport("  My portable template  ");
    expect(parseTemplateExport(exported)).toBe("My portable template");
    expect(() => parseTemplateExport(JSON.stringify({ version: 2, template: "No" }))).toThrow("Unsupported template file");
    expect(() => parseTemplateExport(JSON.stringify({ version: 1, template: "" }))).toThrow("Template must contain");
  });

  it("flags prompts near or above the selected context planning limit", () => { expect(tokenWarningLevel(6554, "gpt-4")).toBe("near"); expect(tokenWarningLevel(8192, "gpt-4")).toBe("over"); expect(tokenWarningLevel(160000, "claude-3-5")).toBe("near"); });

  it("highlights supported code keywords while escaping markup", () => { const html = highlightCode("const value = \"<safe>\";", "js"); expect(html).toContain("code-keyword"); expect(html).toContain("code-string"); expect(html).toContain("&lt;safe&gt;"); });

  it("renders the supported Markdown subset", () => {
    const html = renderMarkdown("# Title\n\nUse **context**.\n\n- One\n- Two\n\n> Check it.");
    expect(html.__html).toContain("<h1>Title</h1>");
    expect(html.__html).toContain("<strong>context</strong>");
    expect(html.__html).toContain("<ul><li>One</li><li>Two</li></ul>");
    expect(html.__html).toContain("<blockquote>Check it.</blockquote>"); expect(renderMarkdown("```js\nconst ready = true;\n```").__html).toContain("code-keyword");
  });

  it("maps scroll positions proportionally between long panels", () => { const source = { scrollHeight: 1000, clientHeight: 100, scrollTop: 450 } as HTMLElement; const target = { scrollHeight: 600, clientHeight: 200, scrollTop: 0 } as HTMLElement; syncScrollPosition(source, target); expect(target.scrollTop).toBe(200); });

  it("builds encoded social sharing links", () => { const links = buildShareLinks("https://knexio.xyz/tools/markdown-preview/?a=1&b=2", "Markdown Preview & Notes"); expect(links.linkedIn).toContain("%26"); expect(links.x).toContain("Markdown%20Preview%20%26%20Notes"); expect(links.facebook).toContain("markdown-preview"); });

  it("falls back safely when local storage is unavailable", () => { expect(readLocalDraft("missing-key", "fallback")).toBe("fallback"); expect(() => writeLocalDraft("key", "value")).not.toThrow(); expect(() => clearLocalDraft("key")).not.toThrow(); });

  it("escapes raw HTML instead of interpreting it", () => {
    const html = renderMarkdown("<script>alert('x')</script>");
    expect(html.__html).not.toContain("<script>");
    expect(html.__html).toContain("&lt;script&gt;");
  });
});
