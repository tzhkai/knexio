import { describe, expect, it } from "vitest";
import { PRIORITY_PLAN_TEMPLATE_URL } from "./PriorityPlanTemplate";

describe("priority plan template", () => {
  it("uses the deployed webdev asset URL for the editable workbook", () => {
    expect(PRIORITY_PLAN_TEMPLATE_URL).toBe("/manus-storage/research-to-priority-plan-template_75c37156.xlsx");
    expect(PRIORITY_PLAN_TEMPLATE_URL.endsWith(".xlsx")).toBe(true);
  });
});
