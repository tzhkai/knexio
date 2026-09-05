import { describe, expect, it } from "vitest";
import { getGuide, getRecommendedGuideRecords, getRecommendedGuides, guidePracticeNotes, guides, topicClusters } from "./content";
import { coreByCategory } from "@/components/CoreWorkflowLinks";
import { MEETING_NOTES_TEMPLATE } from "@/components/MeetingNotesTemplate";
import { meetingGuideFaqs, meetingGuideFaqSchema } from "@/components/MeetingGuideFaq";

describe("workflow library content", () => {
  it("publishes the evidence matrix guide with practical review fields", () => {
    const guide = getGuide("evidence-matrix-from-source-notes");

    expect(guide).toBeDefined();
    expect(guide?.category).toBe("Research");
    expect(guide?.topics).toContain("evidence matrix");
    expect(guide?.prompt).toContain("direct support in supplied record");
    expect(guide?.prompt).toContain("Not supported in supplied record");
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

  it("provides a meeting record template with explicit uncertainty fields", () => {
    expect(MEETING_NOTES_TEMPLATE).toContain("## Confirmed decisions");
    expect(MEETING_NOTES_TEMPLATE).toContain("## Open questions");
    expect(MEETING_NOTES_TEMPLATE).toContain("## Not confirmed");
    expect(MEETING_NOTES_TEMPLATE).toContain("## Verification checklist");
  });

  it("connects the meetings decision brief to the meetings cluster", () => {
    const meetingsCluster = topicClusters.find((topic) => topic.slug === "meetings-and-follow-up");

    expect(meetingsCluster?.guideSlugs).toContain("meeting-notes-to-decision-brief");
  });

  it("connects the evidence matrix guide to the research cluster", () => {
    const researchCluster = topicClusters.find((topic) => topic.slug === "research-and-decisions");

    expect(researchCluster?.guideSlugs).toContain("evidence-matrix-from-source-notes");
  });

  it("publishes the evidence-to-priority transition guide in both Research and Planning clusters", () => {
    const guide = getGuide("evidence-to-priority-plan");
    const researchCluster = topicClusters.find((topic) => topic.slug === "research-and-decisions");
    const planningCluster = topicClusters.find((topic) => topic.slug === "planning-and-priorities");

    expect(guide?.category).toBe("Planning");
    expect(guide?.prompt).toContain("Do not invent priority, urgency, capacity, owners, dates, approval, evidence, or results.");
    expect(guide?.sections.length).toBeGreaterThanOrEqual(6);
    expect(researchCluster?.guideSlugs).toContain("evidence-to-priority-plan");
    expect(planningCluster?.guideSlugs).toContain("evidence-to-priority-plan");
  });

  it("gives every flagship guide a visible, reviewable source-and-method record", () => {
    const flagshipSlugs = [
      "research-brief-from-scattered-sources",
      "evidence-matrix-from-source-notes",
      "evidence-to-priority-plan",
      "meeting-notes-to-decision-brief",
    ];

    for (const slug of flagshipSlugs) {
      const guide = getGuide(slug);
      expect(guide, `${slug} should be published`).toBeDefined();
      expect(guide?.updatedAt, `${slug} should record the substantive rewrite`).toBe("2026-08-26T09:00:00+08:00");
      expect(guide?.sections.length, `${slug} needs substantive depth`).toBeGreaterThanOrEqual(7);
      expect(guide?.steps.length, `${slug} needs a distinct method sequence`).toBeGreaterThanOrEqual(5);
      expect(guide?.method?.inputs.length, `${slug} needs scoped inputs`).toBeGreaterThanOrEqual(3);
      expect(guide?.method?.steps.length, `${slug} needs a reviewable method`).toBeGreaterThanOrEqual(4);
      expect(guide?.method?.sources.length, `${slug} needs a public source`).toBeGreaterThanOrEqual(1);
      expect(guide?.method?.sources.every(source => source.href.startsWith("https://"))).toBe(true);
      expect(guide?.method?.caseStudy.boundary).toMatch(/not|Not|does not|This is/);
      expect(guide?.method?.artifact.copyText.length, `${slug} needs a reusable original working artifact`).toBeGreaterThan(250);
      expect(guide?.method?.reviewBoundary.length).toBeGreaterThan(90);
    }
  });

  it("keeps flagship workflow jobs distinct instead of publishing four interchangeable summaries", () => {
    const slugs = [
      "research-brief-from-scattered-sources",
      "evidence-matrix-from-source-notes",
      "evidence-to-priority-plan",
      "meeting-notes-to-decision-brief",
    ];
    const targets = slugs.map(slug => getGuide(slug)).filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));

    expect(new Set(targets.map(guide => guide.category)).size).toBe(3);
    expect(new Set(targets.map(guide => guide.method?.purpose)).size).toBe(4);
    expect(new Set(targets.map(guide => guide.method?.artifact.title)).size).toBe(4);
    expect(new Set(targets.map(guide => guide.method?.sources[0]?.publisher)).size).toBe(4);
    expect(targets.find(guide => guide.slug === "research-brief-from-scattered-sources")?.method?.artifact.copyText).toContain("Source register");
    expect(targets.find(guide => guide.slug === "evidence-matrix-from-source-notes")?.method?.artifact.copyText).toContain("Atomic claim");
    expect(targets.find(guide => guide.slug === "evidence-to-priority-plan")?.method?.artifact.copyText).toContain("Disconfirming condition");
    expect(targets.find(guide => guide.slug === "meeting-notes-to-decision-brief")?.method?.artifact.copyText).toContain("Confirmed / Proposed / Deferred / Not confirmed");
  });

  it("keeps the second content reinforcement batch page-specific and bounded", () => {
    const targetSlugs = [
      "project-notes-to-decision-memo",
      "turn-rough-notes-into-decision-email",
      "clear-project-update-prompt",
      "brief-first-prompt-pattern",
      "one-week-content-plan-from-questions",
      "thirty-minute-project-starting-plan",
      "weekly-priorities-from-project-list",
      "weekly-review-from-completed-and-blocked-work",
      "decision-log-from-project-notes",
      "meeting-follow-up-email",
      "meeting-agenda-from-notes",
      "customer-feedback-theme-map",
      "project-handoff-brief",
    ];

    expect(Object.keys(guidePracticeNotes)).toEqual(expect.arrayContaining(targetSlugs));
    expect(new Set(targetSlugs.map(slug => guidePracticeNotes[slug].title)).size).toBe(targetSlugs.length);
    for (const slug of targetSlugs) {
      const note = guidePracticeNotes[slug];
      expect(note.body.length, `${slug} needs page-specific context`).toBeGreaterThan(80);
      expect(note.startWith.length, `${slug} needs a concrete input boundary`).toBeGreaterThan(60);
      expect(note.output.length, `${slug} needs a distinct output`).toBeGreaterThan(60);
      expect(note.avoid.length, `${slug} needs an explicit non-inference boundary`).toBeGreaterThan(60);
      expect(note.verify.length, `${slug} needs a human verification step`).toBeGreaterThan(60);
    }
  });

  it("maps each core category to a published guide", () => {
    const guideSlugs = new Set(guides.map((guide) => guide.slug));

    expect(guideSlugs.has(coreByCategory.Research)).toBe(true);
    expect(guideSlugs.has(coreByCategory.Writing)).toBe(true);
    expect(guideSlugs.has(coreByCategory.Planning)).toBe(true);
    expect(guideSlugs.has(coreByCategory.Meetings)).toBe(true);
  });

  it("keeps the first reinforcement batch rich enough for re-evaluation", () => {
    const targets = [
      "meeting-agenda-from-notes",
      "meeting-follow-up-email",
      "weekly-priorities-from-project-list",
      "decision-log-from-project-notes",
    ];

    for (const slug of targets) {
      const guide = getGuide(slug);
      expect(guide, `${slug} should be published`).toBeDefined();
      expect(guide?.sections.length, `${slug} should include expanded context`).toBeGreaterThanOrEqual(7);
      expect(guide?.checks.length, `${slug} should include human review checks`).toBeGreaterThanOrEqual(5);
      expect(guide?.updatedAt, `${slug} should record the substantive update`).toBe("2026-09-04T09:00:00+08:00");
    }
  });

  it("publishes the Meetings FAQ with searchable questions and FAQPage schema", () => {
    expect(meetingGuideFaqs.length).toBeGreaterThanOrEqual(5);
    expect(meetingGuideFaqs.some((item) => item.question.includes("decision brief"))).toBe(true);
    const schema = meetingGuideFaqSchema();
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(meetingGuideFaqs.length);
    expect(schema.mainEntity.every((item) => item.acceptedAnswer.text.length > 40)).toBe(true);
  });

  it("keeps every topic guide reference resolvable", () => {
    const guideSlugs = new Set(guides.map((guide) => guide.slug));

    for (const topic of topicClusters) {
      for (const slug of topic.guideSlugs) {
        expect(guideSlugs.has(slug), `${topic.slug} references missing guide ${slug}`).toBe(true);
      }
    }
  });

  it("keeps recommended reading deterministic, task-related, and transparent about the reason", () => {
    const current = getGuide("research-brief-from-scattered-sources");
    expect(current).toBeDefined();

    const records = getRecommendedGuideRecords(current!);
    expect(records).toHaveLength(3);
    expect(records.every(record => record.guide.slug !== current?.slug)).toBe(true);
    expect(records.every(record => record.reason.length > 12)).toBe(true);
    expect(getRecommendedGuides(current!).map(guide => guide.slug)).toEqual(records.map(record => record.guide.slug));
  });

  it("keeps every published guide practically complete", () => {
    for (const guide of guides) {
      expect(guide.dek.length, `${guide.slug} needs a description`).toBeGreaterThan(40);
      expect(guide.topics.length, `${guide.slug} needs topic terms`).toBeGreaterThanOrEqual(3);
      expect(guide.prompt.length, `${guide.slug} needs a usable prompt`).toBeGreaterThan(120);
      expect(guide.steps.length, `${guide.slug} needs practical steps`).toBeGreaterThanOrEqual(3);
      expect(guide.sections.length, `${guide.slug} needs explanatory sections`).toBeGreaterThanOrEqual(2);
      expect(guide.checks.length, `${guide.slug} needs review checks`).toBeGreaterThanOrEqual(4);
      expect(guide.updatedAt).toMatch(/^2026-/);
    }
  });
});
