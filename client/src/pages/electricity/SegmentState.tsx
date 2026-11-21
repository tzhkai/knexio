/** Housing type × state page: 6 × 53 combinations, each with its own comparison set. */
import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
import SiteBreadcrumb from "@/components/SiteBreadcrumb";
import { BillPage, FigureGrid, LinkChips, NoteBox, SectionHeading } from "@/components/electricity/bill-ui";
import NotFound from "@/pages/NotFound";
import { CALCULATOR_PATH, HUB_PATH, METHODOLOGY_PATH, segmentPath, segmentStatePath, statePath } from "@/data/electricityRoutes";
import {
  adjacentStates,
  allSegments,
  cents,
  dataPeriod,
  dataUpdated,
  isCensusDivision,
  jurisdictionCount,
  kwh,
  national,
  nationalSegmentBill,
  ordinal,
  pctChange,
  rankedSegmentsByState,
  segmentOrNull,
  sentenceCase,
  signedPct,
  signedUsd,
  stateOrNull,
  stateSegmentBill,
  stateSegmentKwh,
  usd,
} from "@/data/electricityInsights";

export default function SegmentStateBill() {
  const params = useParams<{ segment?: string; state?: string }>();
  const segment = segmentOrNull(params.segment ?? "");
  const state = stateOrNull(params.state ?? "");
  if (!segment || !state) return <NotFound />;

  const bill = stateSegmentBill(state, segment);
  const modelledKwh = stateSegmentKwh(state, segment);
  const nationalBill = nationalSegmentBill(segment);
  const vsNational = bill - nationalBill;
  const vsState = bill - state.billAug;
  const stateChange = pctChange(state.billAug, state.billAugPrev);
  const neighbours = adjacentStates(state);
  const ranking = rankedSegmentsByState(segment);
  const division = isCensusDivision(state.slug);
  const position = ranking.findIndex((entry) => entry.slug === state.slug) + 1;
  const highest = ranking[0];
  const lowest = ranking[ranking.length - 1];
  const comparable = ranking.filter((entry) => entry.slug !== state.slug).slice(0, 3);

  return (
    <Layout>
      <SeoMeta
        title={`${sentenceCase(segment.label)} Electric Bill in ${state.name}: ${usd(bill)}`}
        description={`A ${segment.label} in ${state.name} pays an estimated ${usd(bill)} a month for ${kwh(modelledKwh)} in ${dataPeriod} — ${signedUsd(vsNational)} against the national ${segment.label} average and ${signedUsd(vsState)} against all ${state.name} households.`}
        schema={({ pageUrl, origin }) => [
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
              { "@type": "ListItem", position: 2, name: "Average electric bill", item: `${origin}${HUB_PATH}/` },
              { "@type": "ListItem", position: 3, name: sentenceCase(segment.label), item: `${origin}${segmentPath(segment.slug)}/` },
              { "@type": "ListItem", position: 4, name: state.name, item: pageUrl },
            ],
          },
          {
            "@type": "Dataset",
            "@id": `${pageUrl}#dataset`,
            name: `${segment.label} electric bill estimate for ${state.name}, ${dataPeriod}`,
            description: `Modeled monthly bill and consumption for a ${segment.label} in ${state.name}, derived from the EIA residential average and a RECS 2020 consumption ratio.`,
            temporalCoverage: "2025-08/2026-08",
            spatialCoverage: state.name,
            isAccessibleForFree: true,
            creator: { "@type": "Organization", name: "U.S. Energy Information Administration" },
          },
        ]}
      />
      <BillPage>
        <SiteBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Average electric bill", href: `${HUB_PATH}/` },
            { label: sentenceCase(segment.label), href: `${segmentPath(segment.slug)}/` },
            { label: state.name },
          ]}
        />
        <div className="eb-hero">
          <span className="eyebrow">
            Housing type × state · {dataPeriod}
          </span>
          <h1>
            {sentenceCase(segment.label)} electric bill in <em>{state.name}</em>
          </h1>
          <p className="eb-lede">
            An estimated <strong>{usd(bill)}</strong> a month for {kwh(modelledKwh)} of electricity in {dataPeriod}. That is{" "}
            {signedUsd(vsNational)} against the national {segment.label} average of {usd(nationalBill)}, and {signedUsd(vsState)}{" "}
            against the {usd(state.billAug)} average for all {state.name} households.
          </p>
          <div className="eb-meta">
            <span>Ratio ×{segment.factor} · RECS 2020</span>
            <span>{state.name} price {cents(state.priceCents)}</span>
            <span>
              {division ? `Census division · not ranked against the ${jurisdictionCount} states and DC` : `Rank ${position} of ${jurisdictionCount} for this type`}
            </span>
            <span>Updated {dataUpdated}</span>
          </div>
        </div>

        <FigureGrid
          figures={[
            { label: "Modeled monthly bill", value: usd(bill), note: `${segment.label} in ${state.name}` },
            { label: "Modeled use", value: kwh(modelledKwh), note: `all homes ${kwh(state.kwhMonth)}` },
            { label: "vs. U.S. same type", value: signedUsd(vsNational), note: `national ${usd(nationalBill)}` },
            { label: "vs. state all homes", value: signedUsd(vsState), note: `state average ${usd(state.billAug)}` },
            { label: "State price", value: cents(state.priceCents), note: `U.S. ${cents(national.priceCents)}` },
            { label: "State change YoY", value: signedPct(stateChange), note: "all households, August" },
          ]}
        />

        <section className="eb-section">
          <SectionHeading
            eyebrow="Decomposition"
            title="Where the number comes from"
            description="One ratio, one state tariff, no separate state-level survey for the housing type."
          />
          <div className="eb-table-wrap">
            <table className="eb-table" aria-label={`${segment.label} bill in ${state.name} compared with two reference points`}>
              <thead>
                <tr>
                  <th scope="col">Reference</th>
                  <th scope="col">Monthly bill</th>
                  <th scope="col">Monthly use</th>
                  <th scope="col">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {sentenceCase(segment.label)} in {state.name}
                  </td>
                  <td>{usd(bill)}</td>
                  <td>{kwh(modelledKwh)}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="eb-area">
                    <Link href={segmentPath(segment.slug)}>{segment.label}, national average</Link>
                  </td>
                  <td>{usd(nationalBill)}</td>
                  <td>{kwh(Math.round(national.kwhMonth * segment.factor))}</td>
                  <td className={vsNational > 0 ? "eb-up" : "eb-down"}>{signedUsd(vsNational)}</td>
                </tr>
                <tr>
                  <td className="eb-area">
                    <Link href={statePath(state.slug)}>All households in {state.name}</Link>
                  </td>
                  <td>{usd(state.billAug)}</td>
                  <td>{kwh(state.kwhMonth)}</td>
                  <td className={vsState > 0 ? "eb-up" : "eb-down"}>{signedUsd(vsState)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="eb-prose">
            <p>
              The gap against all {state.name} households is <strong>{signedPct((vsState / state.billAug) * 100)}</strong>. Rate
              is identical in both rows — {cents(state.priceCents)} per kWh — so the entire difference is the housing-type ratio
              of <strong>×{segment.factor}</strong> applied to consumption. The gap against the national {segment.label} average
              is rate and climate.
            </p>
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow={`Other homes in ${state.name}`}
            title="The same state, six housing types"
            description="Useful when the question is 'is this a big bill for where I live', rather than 'is this a big bill for my kind of home'."
          />
          <div className="eb-cards">
            {allSegments.map((entry) => (
              <Link className="eb-card" href={segmentStatePath(entry.slug, state.slug)} key={entry.slug}>
                <span className="eb-card-label">{sentenceCase(entry.label)}</span>
                <strong className="eb-card-value">{usd(stateSegmentBill(state, entry))}</strong>
                <span className="eb-card-note">×{entry.factor} ratio · {kwh(stateSegmentKwh(state, entry))}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Same housing type"
            title={
              division
                ? `How ${state.name} compares on ${segment.label} bills`
                : `Where ${state.name}'s ${segment.label} bills rank`
            }
            description={
              division
                ? `A census division averages several states at once, so this page compares it with the national figure rather than ranking it among the ${jurisdictionCount} states and DC.`
                : `${state.name} is ${ordinal(position)} of ${jurisdictionCount} for this housing type, between ${lowest ? lowest.name : "—"} at the bottom and ${highest ? highest.name : "—"} at the top.`
            }
          />
          <LinkChips
            links={[
              ...neighbours.map((neighbour) => ({
                href: segmentStatePath(segment.slug, neighbour.slug),
                label: `${neighbour.name} ${usd(stateSegmentBill(neighbour, segment))}`,
              })),
              ...comparable
                .filter((entry) => !neighbours.some((neighbour) => neighbour.slug === entry.slug))
                .map((entry) => ({
                  href: segmentStatePath(segment.slug, entry.slug),
                  label: `${entry.name} ${usd(entry.bill)}`,
                })),
            ]}
          />
        </section>

        <div className="eb-cta">
          <div className="eb-cta-copy">
            <h2>Replace the ratio with your own meter</h2>
            <p>
              If your last bill lists kWh, the calculator converts it at {state.name}'s {cents(state.priceCents)} average — or
              swap in the exact rate printed on your statement.
            </p>
          </div>
          <Link className="primary-button" href={`${CALCULATOR_PATH}?state=${state.slug}`}>
            Open the calculator
          </Link>
        </div>

        <NoteBox>
          <strong>Estimate, not measurement.</strong> Averages describe all households in {state.name}; this page scales that
          average by a national housing-type ratio. Your own bill depends on your tariff, heating fuel, insulation and
          household size. See{" "}
          <Link href={METHODOLOGY_PATH} style={{ color: "var(--green)", fontWeight: 800 }}>
            methodology
          </Link>{" "}
          for the formula and the RECS 2020 source tables. Data period {dataPeriod}.
        </NoteBox>
      </BillPage>
    </Layout>
  );
}
