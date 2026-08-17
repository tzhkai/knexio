import { describe, expect, it } from "vitest";
import { getGuide, guides, topicClusters } from "./content";
import { coreByCategory } from "@/components/CoreWorkflowLinks";

describe("workflow library content", () => {
  it("publishes the evidence matrix guide with practical review fields", () => {
    const guide = getGuide("evidence-matrix-from-source-notes");

    expect(guide).toBeDefined();
    expect(guide?.category).toBe("Research");
    expect(guide?.topics).toContain("evidence matrix");
    expect(guide?.prompt).toContain("supporting source");
    expect(guide?.prompt).toContain("Not supported in supplied notes");
    expect(guide?.checks.length).toBeGreaterThanOrEqual(4);
  });

  it("publishes the meetings decision brief with an explicit agreement boundary", () => {
    const guide = getGuide("meeting-notes-to-decision-brief");

    expect(guide).toBeDefined();
    expect(guide?.category).toBe("Meetings");
    expect(guide?.topics).toContain("meeting decision brief");
    expect(guide?.prompt).toContain("Not confirmed");
    expect(guide?.prompt).toContain("Do not invent commitments");
    expect(guide?.checks.length).toBeGreaterThanOrEqual(4);
  });

  it("connects the meetings decision brief to the meetings cluster", () => {
    const meetingsCluster = topicClusters.find((topic) => topic.slug === "meetings-and-follow-up");

    expect(meetingsCluster?.guideSlugs).toContain("meeting-notes-to-decision-brief");
  });

  it("connects the evidence matrix guide to the research cluster", () => {
    const researchCluster = topicClusters.find((topic) => topic.slug === "research-and-decisions");

    expect(researchCluster?.guideSlugs).toContain("evidence-matrix-from-source-notes");
  });

  it("maps each core category to a published guide", () => {
    const guideSlugs = new Set(guides.map((guide) => guide.slug));

    expect(guideSlugs.has(coreByCategory.Research)).toBe(true);
    expect(guideSlugs.has(coreByCategory.Writing)).toBe(true);
    expect(guideSlugs.has(coreByCategory.Planning)).toBe(true);
    expect(guideSlugs.has(coreByCategory.Meetings)).toBe(true);
  });

  it("keeps every topic guide reference resolvable", () => {
    const guideSlugs = new Set(guides.map((guide) => guide.slug));

    for (const topic of topicClusters) {
      for (const slug of topic.guideSlugs) {
        expect(guideSlugs.has(slug), `${topic.slug} references missing guide ${slug}`).toBe(true);
      }
    }
  });
});
