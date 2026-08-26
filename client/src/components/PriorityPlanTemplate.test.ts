import { describe, expect, it } from "vitest";
import { buildPriorityPlanCsv, buildPriorityPlanCsvWithBlankRows, buildPriorityPlanFileName, formatPrintDate, normalizeBlankRowCount, normalizeProjectName, PRIORITY_PLAN_BLANK_ROW_STORAGE_KEY, PRIORITY_PLAN_CSV_COLUMNS, PRIORITY_PLAN_CSV_ROW, PRIORITY_PLAN_MARKDOWN_TABLE, PRIORITY_PLAN_MARKDOWN_TEMPLATE, PRIORITY_PLAN_TEMPLATE_URL, readBlankRowPreference, writeBlankRowPreference } from "./PriorityPlanTemplate";

describe("priority plan template", () => {
  it("uses the deployed webdev asset URL for the editable workbook", () => {
    expect(PRIORITY_PLAN_TEMPLATE_URL).toBe("/manus-storage/research-to-priority-plan-template_75c37156.xlsx");
    expect(PRIORITY_PLAN_TEMPLATE_URL.endsWith(".xlsx")).toBe(true);
  });

  it("offers an equivalent source-aware Markdown record for local download", () => {
    expect(PRIORITY_PLAN_MARKDOWN_TEMPLATE).toContain("# Research → Priority Plan");
    expect(PRIORITY_PLAN_MARKDOWN_TEMPLATE).toContain("## Evidence notes");
    expect(PRIORITY_PLAN_MARKDOWN_TEMPLATE).toContain("## Priority record");
    expect(PRIORITY_PLAN_MARKDOWN_TEMPLATE).toContain("Do not invent certainty, urgency, capacity, approval, owners, or dates.");
  });

  it("keeps the Markdown template suitable for clipboard use without an external URL", () => {
    expect(PRIORITY_PLAN_MARKDOWN_TEMPLATE).not.toMatch(/https?:\/\//);
    expect(PRIORITY_PLAN_MARKDOWN_TEMPLATE).toContain("## Human review before commitment");
  });

  it("exposes a focused clipboard payload for the priority table only", () => {
    expect(PRIORITY_PLAN_MARKDOWN_TABLE).toContain("## Priority record");
    expect(PRIORITY_PLAN_MARKDOWN_TABLE).toContain("| Priority / next move |");
    expect(PRIORITY_PLAN_MARKDOWN_TABLE).not.toContain("## Evidence notes");
    expect(PRIORITY_PLAN_MARKDOWN_TABLE).not.toContain("## Human review before commitment");
  });

  it("builds a UTF-8-friendly priority-table CSV with quoted import fields", () => {
    const csv = buildPriorityPlanCsv();
    expect(csv.split("\r\n")).toHaveLength(2);
    expect(csv).toContain(`"${PRIORITY_PLAN_CSV_COLUMNS[0]}"`);
    expect(csv).toContain(`"${PRIORITY_PLAN_CSV_ROW[0]}"`);
    expect(buildPriorityPlanCsv([["Needs, review", "Say \"hello\""]])).toBe('"Needs, review","Say ""hello"""');
  });

  it("creates a print-friendly CSV option with a header and blank entry rows", () => {
    const csv = buildPriorityPlanCsvWithBlankRows(6);
    expect(csv.split("\r\n")).toHaveLength(7);
    expect(csv.split("\r\n")[0]).toContain('"Priority / next move"');
    expect(csv.split("\r\n")[1]).toBe('"","","","","","","",""');
    expect(buildPriorityPlanCsvWithBlankRows(0).split("\r\n")).toHaveLength(2);
  });

  it("normalizes user-selected blank CSV rows to a practical printable range", () => {
    expect(normalizeBlankRowCount(3)).toBe(3);
    expect(normalizeBlankRowCount(0)).toBe(1);
    expect(normalizeBlankRowCount(28.9)).toBe(25);
    expect(normalizeBlankRowCount(Number.NaN)).toBe(6);
    expect(buildPriorityPlanCsvWithBlankRows(10).split("\r\n")).toHaveLength(11);
  });

  it("reads and writes the local blank-row preference without depending on storage availability", () => {
    const values = new Map<string, string>();
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
    expect(readBlankRowPreference(storage)).toBeNull();
    expect(writeBlankRowPreference(storage, 28)).toBe(true);
    expect(values.get(PRIORITY_PLAN_BLANK_ROW_STORAGE_KEY)).toBe("25");
    expect(readBlankRowPreference(storage)).toBe(25);
    expect(readBlankRowPreference({ getItem: () => { throw new Error("blocked"); } })).toBeNull();
    expect(writeBlankRowPreference({ setItem: () => { throw new Error("blocked"); } }, 6)).toBe(false);
  });

  it("uses a cleaned project name in local export filenames and formats a stable print date", () => {
    expect(normalizeProjectName("  Q4   Planning / Review  ")).toBe("Q4 Planning / Review");
    expect(buildPriorityPlanFileName("Q4 Planning / Review", "csv", "-10-blank-rows")).toBe("q4-planning-review-plan-10-blank-rows.csv");
    expect(buildPriorityPlanFileName("", "md")).toBe("research-to-priority-plan.md");
    expect(formatPrintDate(new Date("2026-08-25T12:00:00Z"))).toBe("August 25, 2026");
  });
});
