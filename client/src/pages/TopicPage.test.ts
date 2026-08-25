import { describe, expect, it } from "vitest";
import { meetingsPathSteps } from "./TopicPage";

describe("Meetings topic path", () => {
  it("connects agenda, action list, follow-up, decision guidance, and the counter through valid task routes", () => {
    expect(meetingsPathSteps.map(step => step.href)).toEqual([
      "/guides/meeting-agenda-from-notes/",
      "/guides/meeting-notes-to-action-list/",
      "/guides/meeting-follow-up-email/",
      "/workflows/meetings/meeting-minutes-vs-decision-brief/",
    ]);
  });
});
