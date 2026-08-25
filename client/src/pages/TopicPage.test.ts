import { describe, expect, it } from "vitest";
import { buildTopicPathSummary, meetingsPathSteps, MEETINGS_PATH_STORAGE_KEY, parseMeetingsPathProgress, TOPIC_PATH_STORAGE_KEYS } from "./TopicPage";

describe("Meetings topic path", () => {
  it("connects agenda, action list, follow-up, decision guidance, and the counter through valid task routes", () => {
    expect(meetingsPathSteps.map(step => step.href)).toEqual([
      "/guides/meeting-agenda-from-notes/",
      "/guides/meeting-notes-to-action-list/",
      "/guides/meeting-follow-up-email/",
      "/workflows/meetings/meeting-minutes-vs-decision-brief/",
    ]);
  });

  it("keeps Meetings progress local and discards malformed saved data", () => {
    expect(MEETINGS_PATH_STORAGE_KEY).toBe("workflow-library:meetings-path-progress");
    expect(TOPIC_PATH_STORAGE_KEYS).toEqual({ research: "workflow-library:research-path-progress", planning: "workflow-library:planning-path-progress", meetings: "workflow-library:meetings-path-progress" });
    expect(parseMeetingsPathProgress('{"0":true,"1":"no","2":false}')).toEqual({ "0": true, "2": false });
    expect(parseMeetingsPathProgress("not json")).toEqual({});
  });

  it("builds a completion summary with marked steps and the next unfinished handoff", () => {
    const summary = buildTopicPathSummary("Meetings", meetingsPathSteps, { "0": true, "1": true });
    expect(summary).toContain("Meetings path: 2/4 steps complete (50%)");
    expect(summary).toContain("Set the next meeting up → Separate the commitments");
    expect(summary).toContain("Next: Send the shared record");
  });
});
