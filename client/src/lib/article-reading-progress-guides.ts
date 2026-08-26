/** Editorially selected long-form guides with multi-section reference content. */
export const READING_PROGRESS_GUIDE_SLUGS = [
  "research-brief-from-scattered-sources",
  "evidence-matrix-from-source-notes",
  "evidence-to-priority-plan",
  "weekly-priorities-from-project-list",
  "weekly-review-from-completed-and-blocked-work",
  "one-week-content-plan-from-questions",
  "meeting-notes-to-action-list",
  "meeting-agenda-from-notes",
  "meeting-notes-to-decision-brief",
] as const;

export function shouldShowArticleReadingProgress(guideSlug: string) {
  return (READING_PROGRESS_GUIDE_SLUGS as readonly string[]).includes(guideSlug);
}
