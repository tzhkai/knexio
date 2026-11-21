/** Hub: the national baseline, the sortable 53-area table, and the housing-type entry points. */
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
import { BillPage, FigureGrid, LinkChips, NoteBox, RankTable, SectionHeading, type RankRow } from "@/components/electricity/bill-ui";
import { CALCULATOR_PATH, METHODOLOGY_PATH, hubMeta, segmentPath, statePath } from "@/data/electricityRoutes";
import {
  allSegments,
  allStates,
  cents,
  count,
  dataPeriod,
  dataUpdated,
  dataYtdPeriod,
  isCensusDivision,
  kwh,
  national,
  nationalBillAugPrev,
  nationalSegmentBill,
  pctChange,
  rankedStates,
  segmentRatioNote,
  sentenceCase,
  signedPct,
  signedUsd,
  usd,
} from "@/data/electricityInsights";
import { Link } from "wouter";

const byBill = rankedStates("bill");
const byPrice = rankedStates("price");
const byChange = rankedStates("change");
const highestBill = byBill[0];
const lowestBill = byBill[byBill.length - 1];
const highestPrice = byPrice[0];
const lowestPrice = byPrice[byPrice.length - 1];
const biggestRise = byChange[0];
const biggestFall = byChange[byChange.length - 1];
const stateOnlyBills = allStates
  .filter((state) => !isCensusDivision(state.slug))
  .map((state) => state.billAug)
  .sort((a, b) => a - b);
const medianStateBill = stateOnlyBills[Math.floor(stateOnlyBills.length / 2)];

function buildRows(): RankRow[] {
  return allStates.map((state) => ({
    key: state.slug,
    href: statePath(state.slug),
    label: state.name,
    tag: isCensusDivision(state.slug) ? "division" : undefined,
    cells: [
      usd(state.billAug),
      cents(state.priceCents),
      kwh(state.kwhMonth),
      signedPct(pctChange(state.billAug, state.billAugPrev)),
    ],
    sort: [state.billAug, state.priceCents, state.kwhMonth, pctChange(state.billAug, state.billAugPrev)],
  }));
}

const rows = buildRows();

export default function AverageBillHub() {
  return (
    <Layout>
      <SeoMeta
        title={hubMeta.title}
        description={hubMeta.description}
        schema={({ pageUrl, origin }) => [
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
              { "@type": "ListItem", position: 2, name: "Average electric bill", item: pageUrl },
            ],
          },
          {
            "@type": "Dataset",
            "@id": `${pageUrl}#dataset`,
            name: `U.S. residential electric bill averages, ${dataPeriod}`,
            description:
              "Average residential electricity price, monthly consumption, average bill and year-over-year change for the 50 states, the District of Columbia and two EIA census divisions.",
            temporalCoverage: "2025-08/2026-08",
            spatialCoverage: "United States",
            isAccessibleForFree: true,
            creator: { "@type": "Organization", name: "U.S. Energy Information Administration" },
            variableMeasured: [
              "Average retail price of residential electricity",
              "Residential sales per customer",
              "Average monthly bill",
            ],
          },
        ]}
      />
      <BillPage>
        <div className="eb-hero">
          <span className="eyebrow">EIA Electric Power Monthly · {dataPeriod}</span>
          <h1>
            Average electric bill in the <em>United States</em>
          </h1>
          <p className="eb-lede">
            U.S. residential customers paid an average of <strong>{usd(national.billAug)}</strong> for electricity in {dataPeriod}.
            That is {kwh(national.kwhMonth)} of power at {cents(national.priceCents)} per kWh, spread across{" "}
            {count(national.customers)} residential accounts. The same table for the year to date,{" "}
            {dataYtdPeriod}, averages <strong>{usd(national.billYtd)}</strong> a month.
          </p>
          <div className="eb-meta">
            <span>Data period {dataPeriod}</span>
            <span>53 reporting areas</span>
            <span>Source: EIA Electric Power Monthly</span>
            <span>Updated {dataUpdated}</span>
          </div>
        </div>

        <FigureGrid
          figures={[
            { label: "U.S. average bill", value: usd(national.billAug), note: `${dataPeriod}, residential` },
            { label: "Average price", value: cents(national.priceCents), note: "per kWh, all residential" },
            { label: "Average use", value: kwh(national.kwhMonth), note: "per residential customer" },
            {
              label: "Change vs. last August",
              value: signedPct(pctChange(national.billAug, nationalBillAugPrev)),
              note: `${signedUsd(national.billAug - nationalBillAugPrev)} on the year before`,
            },
            { label: "Median state bill", value: usd(medianStateBill), note: "middle of the 50 states plus DC" },
            { label: "Year to date", value: usd(national.billYtd), note: `${dataYtdPeriod} monthly average` },
          ]}
        />

        <section className="eb-section" id="rankings">
          <SectionHeading
            eyebrow="53 reporting areas"
            title="Every area, ranked by what households actually paid"
            description="Click any column to re-sort. Census divisions are EIA aggregates and are listed so the published table reconciles, not as jurisdictions you can be billed in."
          />
          <RankTable
            ariaLabel={`Average residential electric bill by state, ${dataPeriod}`}
            columns={[
              { label: "Avg. monthly bill" },
              { label: "Price ¢/kWh" },
              { label: "Monthly use" },
              { label: "vs. last Aug." },
            ]}
            rows={rows}
          />
          <NoteBox>
            <strong>How to read the change column.</strong> It compares {dataPeriod} with August 2025. A bill can rise while
            the price per kWh falls, because usage moved more than the rate; that gap is why every state page shows price and
            consumption next to the bill.
          </NoteBox>
        </section>

        <section className="eb-section" id="housing-type">
          <SectionHeading
            eyebrow="Six housing types"
            title="What a bill looks like in your kind of home"
            description="State averages blend every household, from a studio flat to a 2,400 sq ft house. These six entries apply the RECS 2020 consumption ratios to the same EIA price data."
          />
          <div className="eb-cards">
            {allSegments.map((segment) => (
              <Link className="eb-card" href={segmentPath(segment.slug)} key={segment.slug}>
                <span className="eb-card-label">{sentenceCase(segment.label)}</span>
                <strong className="eb-card-value">{usd(nationalSegmentBill(segment))}</strong>
                <span className="eb-card-note">
                  National average for this housing type, {segmentRatioNote(segment)}. Ratio ×{segment.factor} from RECS 2020.
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="eb-section" id="extremes">
          <SectionHeading
            eyebrow="The spread"
            title="Where bills and rates actually diverge"
            description="The distance between the top and the bottom of the table is the single most useful fact on this page."
          />
          <div className="eb-prose">
            <p>
              The highest average bill is in <strong>{highestBill ? highestBill.name : "—"}</strong> at{" "}
              <strong>{highestBill ? usd(highestBill.billAug) : "—"}</strong>; the lowest is in{" "}
              <strong>{lowestBill ? lowestBill.name : "—"}</strong> at <strong>{lowestBill ? usd(lowestBill.billAug) : "—"}</strong>.
              The gap of {highestBill && lowestBill ? usd(highestBill.billAug - lowestBill.billAug) : "—"} is a difference in both
              rates and consumption, so the two are not interchangeable: the highest rate appears in{" "}
              <strong>{highestPrice ? highestPrice.name : "—"}</strong> at{" "}
              <strong>{highestPrice ? cents(highestPrice.priceCents) : "—"}</strong> per kWh, while{" "}
              <strong>{lowestPrice ? lowestPrice.name : "—"}</strong> pays{" "}
              <strong>{lowestPrice ? cents(lowestPrice.priceCents) : "—"}</strong>.
            </p>
            <p>
              Year over year the fastest increase is in <strong>{biggestRise ? biggestRise.name : "—"}</strong> (
              {biggestRise ? signedPct(pctChange(biggestRise.billAug, biggestRise.billAugPrev)) : "—"}), and the steepest
              decrease is in <strong>{biggestFall ? biggestFall.name : "—"}</strong> (
              {biggestFall ? signedPct(pctChange(biggestFall.billAug, biggestFall.billAugPrev)) : "—"}). Only a minority of
              areas moved against the national trend of{" "}
              {signedPct(pctChange(national.billAug, nationalBillAugPrev))}.
            </p>
          </div>
          <LinkChips
            links={[
              { href: statePath("california"), label: "California" },
              { href: statePath("texas"), label: "Texas" },
              { href: statePath("florida"), label: "Florida" },
              { href: statePath("new-york"), label: "New York" },
              { href: statePath("pennsylvania"), label: "Pennsylvania" },
              { href: statePath("illinois"), label: "Illinois" },
            ]}
          />
        </section>

        <div className="eb-cta">
          <div className="eb-cta-copy">
            <h2>Estimate your own bill</h2>
            <p>
              Enter an appliance's wattage and daily hours and the calculator converts it to monthly kWh and dollars at your
              state's residential rate — or price a kWh figure you already know.
            </p>
          </div>
          <Link className="primary-button" href={CALCULATOR_PATH}>
            Open the electricity cost calculator
          </Link>
        </div>

        <NoteBox>
          <strong>Sources and limits.</strong> Bills are computed as price × consumption ÷ 100 from the EIA Electric Power
          Monthly residential tables, and housing-type figures apply RECS 2020 ratios. Averages describe an area, not your
          household: see the{" "}
          <Link href={METHODOLOGY_PATH} style={{ color: "var(--green)", fontWeight: 800 }}>
            methodology
          </Link>{" "}
          for the exact tables, formulas and update date ({dataUpdated}).
        </NoteBox>
      </BillPage>
    </Layout>
  );
}
