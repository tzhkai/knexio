export const WRITING_SHARE_URL = "https://knexio.xyz/workflows/writing-and-updates/";

export type ShareUtm = {
  enabled: boolean;
  source: string;
  medium: string;
  campaign: string;
};

export function buildWritingShareUrl({ enabled, source, medium, campaign }: ShareUtm): string {
  if (!enabled) return WRITING_SHARE_URL;
  const url = new URL(WRITING_SHARE_URL);
  if (source.trim()) url.searchParams.set("utm_source", source.trim());
  if (medium.trim()) url.searchParams.set("utm_medium", medium.trim());
  if (campaign.trim()) url.searchParams.set("utm_campaign", campaign.trim());
  return url.toString();
}

export function clampShareDimension(value: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(2400, Math.max(320, Math.round(value)));
}
