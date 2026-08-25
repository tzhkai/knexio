export const TOPIC_PATH_SHARE_URLS = {
  "research-and-decisions": "https://knexio.xyz/workflows/research-and-decisions/",
  "writing-and-updates": "https://knexio.xyz/workflows/writing-and-updates/",
  "meetings-and-follow-up": "https://knexio.xyz/workflows/meetings-and-follow-up/",
  "planning-and-priorities": "https://knexio.xyz/workflows/planning-and-priorities/",
} as const;

export type TopicPathSlug = keyof typeof TOPIC_PATH_SHARE_URLS;

export type ShareUtm = {
  enabled: boolean;
  source: string;
  medium: string;
  campaign: string;
};

export const WRITING_SHARE_URL = TOPIC_PATH_SHARE_URLS["writing-and-updates"];

export function buildTopicPathShareUrl(pathSlug: TopicPathSlug, { enabled, source, medium, campaign }: ShareUtm): string {
  const canonicalUrl = TOPIC_PATH_SHARE_URLS[pathSlug];
  if (!enabled) return canonicalUrl;

  const url = new URL(canonicalUrl);
  if (source.trim()) url.searchParams.set("utm_source", source.trim());
  if (medium.trim()) url.searchParams.set("utm_medium", medium.trim());
  if (campaign.trim()) url.searchParams.set("utm_campaign", campaign.trim());
  return url.toString();
}

export function buildWritingShareUrl(options: ShareUtm): string {
  return buildTopicPathShareUrl("writing-and-updates", options);
}

export function clampShareDimension(value: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(2400, Math.max(320, Math.round(value)));
}
