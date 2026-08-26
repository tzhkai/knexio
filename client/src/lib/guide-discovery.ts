import type { Guide } from "./content";

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
