import { describe, expect, it } from "vitest";
import { PRIORITY_PLAN_MARKDOWN_TEMPLATE, PRIORITY_PLAN_TEMPLATE_URL } from "./PriorityPlanTemplate";

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
});
