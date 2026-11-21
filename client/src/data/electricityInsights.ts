/**
 * Derived views over the generated EIA dataset in ./electricity.
 * Nothing here invents a number: every value is a formatting or arithmetic
 * transform of the published figures, so the pages and the methodology page
 * stay in sync automatically.
 */
import {
  DATA_PERIOD,
  DATA_YTD_PERIOD,
  STATES_UPDATED,
  nationalBill,
  segments,
  states,
  type Segment,
  type StateBill,
} from "./electricity";

export const dataPeriod = DATA_PERIOD;
export const dataYtdPeriod = DATA_YTD_PERIOD;
export const dataUpdated = STATES_UPDATED;
export const allStates = states;
export const allSegments = segments;
export const national = nationalBill;

const CENSUS_DIVISIONS = new Set(["pacific-contiguous", "pacific-noncontiguous"]);

export function isCensusDivision(slug: string): boolean {
  return CENSUS_DIVISIONS.has(slug);
}

/**
 * Prior-August national bill. EIA publishes the current national figure as a
 * single row, so the year-ago value is reconstructed by weighting the 51
 * state + DC rows by their residential customer counts (census divisions are
 * excluded because they overlap the states).
 */
export const nationalBillAugPrev: number = (() => {
  let weighted = 0;
  let weight = 0;
  for (const state of allStates) {
    if (CENSUS_DIVISIONS.has(state.slug) || state.billAugPrev === null) continue;
    weighted += state.billAugPrev * state.customers;
    weight += state.customers;
  }
  return Math.round((weighted / weight) * 100) / 100;
})();

/** Prior-January-August national bill, reconstructed the same way. */
export const nationalBillYtdPrev: number | null = (() => {
  let weighted = 0;
  let weight = 0;
  for (const state of allStates) {
    if (CENSUS_DIVISIONS.has(state.slug) || state.billYtd === null || state.kwhMonthYtd === null) continue;
    const priorPrice = state.priceCentsYtdPrev;
    if (priorPrice === null) continue;
    weighted += (priorPrice * state.kwhMonthYtd) / 100 * state.customers;
    weight += state.customers;
  }
  return weight === 0 ? null : Math.round((weighted / weight) * 100) / 100;
})();

export function stateOrNull(slug: string): StateBill | null {
  return allStates.find((state) => state.slug === slug) ?? null;
}

export function segmentOrNull(slug: string): Segment | null {
  return allSegments.find((segment) => segment.slug === slug) ?? null;
}

export function usd(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function signedUsd(value: number): string {
  const abs = Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (Math.abs(value) < 0.005) return `$0.00`;
  return `${value > 0 ? "+" : "−"}$${abs}`;
}

export function cents(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `${value.toFixed(2)}¢`;
}

export function kwh(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `${Math.round(value).toLocaleString("en-US")} kWh`;
}

export function count(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return value.toLocaleString("en-US");
}

export function pctChange(current: number | null, previous: number | null): number | null {
  if (current === null || previous === null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

export function signedPct(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  const rounded = Math.abs(value) < 0.05 ? 0 : value;
  const abs = Math.abs(rounded).toFixed(1);
  if (rounded === 0) return "0.0%";
  return `${rounded > 0 ? "+" : "−"}${abs}%`;
}

export function sentenceCase(label: string): string {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export type Metric = "bill" | "price" | "kwh" | "change";

function metricValue(state: StateBill, metric: Metric): number | null {
  if (metric === "bill") return state.billAug;
  if (metric === "price") return state.priceCents;
  if (metric === "kwh") return state.kwhMonth;
  return pctChange(state.billAug, state.billAugPrev);
}

/**
 * Ranked lists cover the 51 billable jurisdictions only. The two census
 * divisions in the EIA table are aggregates of states in that same table, so
 * including them would double-count and would make a "rank 3" claim wrong.
 */
export const jurisdictions = allStates.filter((state) => !isCensusDivision(state.slug));
export const jurisdictionCount = jurisdictions.length;

/** Descending order; areas missing the metric are dropped. */
export function rankedStates(metric: Metric): StateBill[] {
  return jurisdictions
    .filter((state) => metricValue(state, metric) !== null)
    .sort((left, right) => (metricValue(right, metric) ?? 0) - (metricValue(left, metric) ?? 0));
}

export function rankOf(slug: string, metric: Metric): number {
  const index = rankedStates(metric).findIndex((state) => state.slug === slug);
  return index === -1 ? jurisdictionCount : index + 1;
}

export function nationalSegmentBill(segment: Segment): number {
  return Math.round(national.billAug * segment.factor * 100) / 100;
}

export function nationalSegmentKwh(segment: Segment): number {
  return Math.round(national.kwhMonth * segment.factor);
}

export function stateSegmentBill(state: StateBill, segment: Segment): number {
  return Math.round(state.billAug * segment.factor * 100) / 100;
}

export function stateSegmentKwh(state: StateBill, segment: Segment): number {
  return Math.round(state.kwhMonth * segment.factor);
}

export function rankedSegmentsByState(segment: Segment): { slug: string; name: string; bill: number }[] {
  return jurisdictions
    .map((state) => ({ slug: state.slug, name: state.name, bill: stateSegmentBill(state, segment) }))
    .sort((left, right) => right.bill - left.bill);
}

/** "41% below the all-household average" / "18% above …". */
export function segmentRatioNote(segment: Segment): string {
  const delta = Math.round((segment.factor - 1) * 1000) / 10;
  if (delta === 0) return "level with the all-household average";
  return `${Math.abs(delta).toFixed(1)}% ${delta > 0 ? "above" : "below"} the all-household bill`;
}

const NEIGHBOURS: Record<string, string[]> = {
  alabama: ["florida", "georgia", "mississippi", "tennessee"],
  alaska: ["washington", "pacific-noncontiguous"],
  arizona: ["california", "colorado", "nevada", "new-mexico", "utah"],
  arkansas: ["louisiana", "mississippi", "missouri", "oklahoma", "tennessee", "texas"],
  california: ["arizona", "nevada", "oregon"],
  colorado: ["arizona", "kansas", "nebraska", "new-mexico", "oklahoma", "utah", "wyoming"],
  connecticut: ["massachusetts", "new-york", "rhode-island"],
  delaware: ["maryland", "new-jersey", "pennsylvania"],
  "district-of-columbia": ["maryland", "virginia"],
  florida: ["alabama", "georgia"],
  georgia: ["alabama", "florida", "north-carolina", "south-carolina", "tennessee"],
  hawaii: ["pacific-noncontiguous"],
  idaho: ["montana", "nevada", "oregon", "utah", "washington", "wyoming"],
  illinois: ["indiana", "iowa", "kentucky", "missouri", "wisconsin"],
  indiana: ["illinois", "kentucky", "michigan", "ohio"],
  iowa: ["illinois", "minnesota", "missouri", "nebraska", "south-dakota", "wisconsin"],
  kansas: ["colorado", "missouri", "nebraska", "oklahoma"],
  kentucky: ["illinois", "indiana", "missouri", "ohio", "tennessee", "virginia", "west-virginia"],
  louisiana: ["arkansas", "mississippi", "texas"],
  maine: ["new-hampshire"],
  maryland: ["delaware", "district-of-columbia", "pennsylvania", "virginia", "west-virginia"],
  massachusetts: ["connecticut", "new-hampshire", "new-york", "rhode-island", "vermont"],
  michigan: ["indiana", "ohio", "wisconsin"],
  minnesota: ["iowa", "north-dakota", "south-dakota", "wisconsin"],
  mississippi: ["alabama", "arkansas", "louisiana", "tennessee"],
  missouri: ["arkansas", "illinois", "iowa", "kansas", "kentucky", "nebraska", "oklahoma", "tennessee"],
  montana: ["idaho", "north-dakota", "south-dakota", "wyoming"],
  nebraska: ["colorado", "iowa", "kansas", "missouri", "south-dakota", "wyoming"],
  nevada: ["arizona", "california", "idaho", "oregon", "utah"],
  "new-hampshire": ["maine", "massachusetts", "vermont"],
  "new-jersey": ["delaware", "new-york", "pennsylvania"],
  "new-mexico": ["arizona", "colorado", "oklahoma", "texas", "utah"],
  "new-york": ["connecticut", "massachusetts", "new-jersey", "pennsylvania", "vermont"],
  "north-carolina": ["georgia", "south-carolina", "tennessee", "virginia"],
  "north-dakota": ["minnesota", "montana", "south-dakota"],
  ohio: ["indiana", "kentucky", "michigan", "pennsylvania", "west-virginia"],
  oklahoma: ["arkansas", "colorado", "kansas", "missouri", "new-mexico", "texas"],
  oregon: ["california", "idaho", "nevada", "washington"],
  "pacific-contiguous": ["california", "oregon", "washington"],
  "pacific-noncontiguous": ["alaska", "hawaii"],
  pennsylvania: ["delaware", "maryland", "new-jersey", "new-york", "ohio", "west-virginia"],
  "rhode-island": ["connecticut", "massachusetts"],
  "south-carolina": ["georgia", "north-carolina"],
  "south-dakota": ["iowa", "minnesota", "montana", "nebraska", "north-dakota", "wyoming"],
  tennessee: ["alabama", "arkansas", "georgia", "kentucky", "mississippi", "missouri", "north-carolina", "virginia"],
  texas: ["arkansas", "louisiana", "new-mexico", "oklahoma"],
  utah: ["arizona", "colorado", "idaho", "nevada", "new-mexico", "wyoming"],
  vermont: ["massachusetts", "new-hampshire", "new-york"],
  virginia: ["district-of-columbia", "kentucky", "maryland", "north-carolina", "tennessee", "west-virginia"],
  washington: ["idaho", "oregon"],
  "west-virginia": ["kentucky", "maryland", "ohio", "pennsylvania", "virginia"],
  wisconsin: ["illinois", "iowa", "michigan", "minnesota"],
  wyoming: ["colorado", "idaho", "montana", "nebraska", "south-dakota", "utah"],
};

/** States that share a border, capped so the rail stays readable. */
export function adjacentStates(state: StateBill): StateBill[] {
  const slugs = NEIGHBOURS[state.slug] ?? [];
  return slugs
    .map((slug) => stateOrNull(slug))
    .filter((entry): entry is StateBill => Boolean(entry))
    .slice(0, 8);
}

/** 1st, 2nd, 3rd, 11th, 22nd — the pages state a position, so spell it correctly. */
export function ordinal(value: number): string {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}
