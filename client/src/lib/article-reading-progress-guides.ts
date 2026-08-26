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

/** A guide with this many authored body sections has a meaningful reading surface even if it was not in the initial editorial allowlist. */
export const AUTO_READING_PROGRESS_MIN_SECTIONS = 5;

export function shouldShowArticleReadingProgress(guideSlug: string, sectionCount = 0) {
  return (READING_PROGRESS_GUIDE_SLUGS as readonly string[]).includes(guideSlug) || sectionCount >= AUTO_READING_PROGRESS_MIN_SECTIONS;
}
