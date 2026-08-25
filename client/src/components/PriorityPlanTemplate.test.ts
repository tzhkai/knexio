import { describe, expect, it } from "vitest";
import { buildPriorityPlanCsv, PRIORITY_PLAN_CSV_COLUMNS, PRIORITY_PLAN_CSV_ROW, PRIORITY_PLAN_MARKDOWN_TABLE, PRIORITY_PLAN_MARKDOWN_TEMPLATE, PRIORITY_PLAN_TEMPLATE_URL } from "./PriorityPlanTemplate";

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
});
