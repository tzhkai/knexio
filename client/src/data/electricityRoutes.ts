/**
 * Single source of truth for the electricity section's URLs, titles and
 * descriptions. Imported by both the React app and the build scripts so the
 * router, prerender pass, route metadata and sitemap can never drift apart.
 */
import { segments, states } from "./electricity";
import {
  cents,
  kwh,
  nationalSegmentBill,
  pctChange,
  sentenceCase,
  signedPct,
  stateSegmentBill,
  stateSegmentKwh,
  usd,
} from "./electricityInsights";

export type PageMeta = { path: string; title: string; description: string };

export const HUB_PATH = "/average-electric-bill";
export const CALCULATOR_PATH = "/electricity-cost-calculator";
export const METHODOLOGY_PATH = "/methodology";

export function statePath(slug: string): string {
  return `${HUB_PATH}/${slug}`;
}

export function segmentPath(slug: string): string {
  return `${HUB_PATH}/${slug}`;
}

export function segmentStatePath(segmentSlug: string, stateSlug: string): string {
  return `${HUB_PATH}/${segmentSlug}/${stateSlug}`;
}

export const homeMeta: PageMeta = {
  path: "/",
  title: "U.S. Electricity Bills, State by State (August 2026)",
  description:
    "The average U.S. household paid $224.70 for electricity in August 2026 at 20.28¢ per kWh. Compare all 53 reporting areas, six housing types and your own usage.",
};

export const hubMeta: PageMeta = {
  path: HUB_PATH,
  title: "Average Electric Bill in the U.S.: All 53 Areas Ranked",
  description:
    "U.S. residential customers averaged $224.70 and 1,108 kWh in August 2026, at 20.28¢ per kWh. Sort every state by bill, price, usage and year-over-year change.",
};

export const calculatorMeta: PageMeta = {
  path: CALCULATOR_PATH,
  title: "Electricity Cost Calculator: Watts and Hours to Dollars",
  description:
    "Turn watts and daily hours into a monthly and yearly electric bill, or price any kWh figure at a state's real residential rate. Rates come from EIA data.",
};

export const methodologyMeta: PageMeta = {
  path: METHODOLOGY_PATH,
  title: "Methodology: EIA Data, RECS Coefficients, and Bill Math",
  description:
    "Where every number comes from: EIA Electric Power Monthly price, sales and customer tables, RECS 2020 housing ratios, the formulas, and the limits of each estimate.",
};

export const stateMetas: PageMeta[] = states.map((state) => {
  const change = signedPct(pctChange(state.billAug, state.billAugPrev));
  return {
    path: statePath(state.slug),
    title: `Average Electric Bill in ${state.name}: ${usd(state.billAug)} a Month`,
    description: `${state.name} households averaged ${usd(state.billAug)} for ${kwh(state.kwhMonth)} in August 2026 at ${cents(state.priceCents)} per kWh, ${change} year over year. Six housing types, modeled.`,
  };
});

export const segmentMetas: PageMeta[] = segments.map((segment) => {
  const nationalBill = nationalSegmentBill(segment);
  return {
    path: segmentPath(segment.slug),
    title: `Average ${sentenceCase(segment.label)} Electric Bill: ${usd(nationalBill)}`,
    description: `The national average ${segment.label} bill was ${usd(nationalBill)} in August 2026, modeled from EIA state bills and a ${segment.factor} RECS 2020 ratio. Rank all 53 areas.`,
  };
});

export const segmentStateMetas: PageMeta[] = segments.flatMap((segment) =>
  states.map((state) => {
    const bill = stateSegmentBill(state, segment);
    return {
      path: segmentStatePath(segment.slug, state.slug),
      title: `${sentenceCase(segment.label)} Electric Bill in ${state.name}: ${usd(bill)}`,
      description: `${usd(bill)} a month for a ${segment.label} in ${state.name}, August 2026: ${kwh(stateSegmentKwh(state, segment))} at ${cents(state.priceCents)} per kWh. Compare with the statewide and U.S. averages.`,
    };
  }),
);

/** All sitemap-indexable electricity URLs, ordered from broad to specific. */
export const electricityPageMetas: PageMeta[] = [
  homeMeta,
  hubMeta,
  ...stateMetas,
  ...segmentMetas,
  ...segmentStateMetas,
  calculatorMeta,
  methodologyMeta,
];

export const electricityRoutePaths: string[] = electricityPageMetas.map((meta) => meta.path);
