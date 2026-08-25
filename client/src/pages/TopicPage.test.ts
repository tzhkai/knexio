import { describe, expect, it } from "vitest";
import { meetingsPathSteps, MEETINGS_PATH_STORAGE_KEY, parseMeetingsPathProgress } from "./TopicPage";

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
    expect(parseMeetingsPathProgress('{"0":true,"1":"no","2":false}')).toEqual({ "0": true, "2": false });
    expect(parseMeetingsPathProgress("not json")).toEqual({});
  });
});
