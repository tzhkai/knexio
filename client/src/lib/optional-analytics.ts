export type OptionalAnalyticsTracker = {
  track: (eventName: string, eventData?: Record<string, string>) => unknown;
};

declare global {
  interface Window {
    umami?: OptionalAnalyticsTracker;
  }
}

export const NEXT_PATH_CLICK_EVENT = "next_path_click";
export const RELATED_RESOURCE_CLICK_EVENT = "related_resource_click";

/**
 * Sends only a coarse internal-navigation event after the reader has opted into
 * site analytics. It deliberately excludes prompt text, progress, UTM values,
 * referrers, identifiers, and other reader-provided information.
 */
export function trackNextPathClick(analyticsAllowed: boolean, fromTopic: string, toTopic: string, tracker: OptionalAnalyticsTracker | undefined = typeof window === "undefined" ? undefined : window.umami): boolean {
  if (!analyticsAllowed || !tracker?.track) return false;
  tracker.track(NEXT_PATH_CLICK_EVENT, { from_topic: fromTopic, to_topic: toTopic, interaction: "next_path_card" });
  return true;
}

/** Sends a fixed resource identifier after optional analytics consent; no reader content or URL parameters are included. */
export function trackRelatedResourceClick(analyticsAllowed: boolean, guideSlug: string, resourceKind: string, resourceSlug: string, tracker: OptionalAnalyticsTracker | undefined = typeof window === "undefined" ? undefined : window.umami): boolean {
  if (!analyticsAllowed || !tracker?.track) return false;
  tracker.track(RELATED_RESOURCE_CLICK_EVENT, { from_guide: guideSlug, resource_kind: resourceKind, resource_slug: resourceSlug, interaction: "related_resources" });
  return true;
}
