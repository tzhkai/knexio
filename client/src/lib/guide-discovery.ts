import type { Guide } from "./content";

export type HighlightSegment = {
  value: string;
  matches: boolean;
};

function normalizedSearchText(guide: Guide) {
  return `${guide.title} ${guide.dek} ${guide.category} ${guide.topics.join(" ")}`.toLowerCase();
}

export function searchGuides(guides: readonly Guide[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [...guides];
  return guides.filter(guide => normalizedSearchText(guide).includes(normalizedQuery));
}

export function latestGuides(guides: readonly Guide[], limit = 3) {
  return [...guides]
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt))
    .slice(0, limit);
}

export function guideSearchQuery(search: string) {
  return (new URLSearchParams(search).get("q") || "").trim().slice(0, 120);
}

export function guideTitleSuggestions(guides: readonly Guide[], query: string, limit = 5) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return guides.slice(0, limit).map(guide => guide.title);

  return guides
    .filter(guide => guide.title.toLowerCase().includes(normalizedQuery))
    .slice(0, limit)
    .map(guide => guide.title);
}

export function splitSearchHighlight(text: string, query: string): HighlightSegment[] {
  const needle = query.trim();
  if (!needle) return [{ value: text, matches: false }];

  const escapedNeedle = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text
    .split(new RegExp(`(${escapedNeedle})`, "ig"))
    .filter(Boolean)
    .map(value => ({ value, matches: value.toLowerCase() === needle.toLowerCase() }));
}

export function brokenLinkReportHref(pathname: string) {
  const safePathname = pathname.startsWith("/") ? pathname : "/";
  const subject = "Broken link report — Workflow Library";
  const body = `The link I tried to open:\nhttps://knexio.xyz${safePathname}\n\nWhat I expected to find:\n\n(Optional) How I reached this link:`;
  return `mailto:tzhkai6@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
