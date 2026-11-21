/** State and housing-type pages, plus the dispatcher used by /average-electric-bill/:slug. */
import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
import SiteBreadcrumb from "@/components/SiteBreadcrumb";
import { BillPage, FigureGrid, LinkChips, NoteBox, RankTable, SectionHeading, type RankRow } from "@/components/electricity/bill-ui";
import NotFound from "@/pages/NotFound";
import {
  CALCULATOR_PATH,
  HUB_PATH,
  METHODOLOGY_PATH,
  segmentPath,
  segmentStatePath,
  statePath,
} from "@/data/electricityRoutes";
import type { Segment, StateBill } from "@/data/electricity";
import {
  adjacentStates,
  allSegments,
  allStates,
  cents,
  count,
  dataPeriod,
  dataUpdated,
  dataYtdPeriod,
  isCensusDivision,
  jurisdictionCount,
  kwh,
  national,
  nationalSegmentBill,
  ordinal,
  pctChange,
  rankOf,
  rankedSegmentsByState,
  segmentOrNull,
  segmentRatioNote,
  sentenceCase,
  signedPct,
  signedUsd,
  stateOrNull,
  stateSegmentBill,
  stateSegmentKwh,
  usd,
} from "@/data/electricityInsights";

function nationalAverageAtRate(priceCents: number): number {
  return (priceCents * national.kwhMonth) / 100;
}

function StateBillPage({ state }: { state: StateBill }) {
  const change = pctChange(state.billAug, state.billAugPrev);
  const changeUsd = state.billAugPrev === null ? null : state.billAug - state.billAugPrev;
  const diff = state.billAug - national.billAug;
  const diffPct = (diff / national.billAug) * 100;
  const priceDiff = state.priceCents - national.priceCents;
  const kwhDiff = state.kwhMonth - national.kwhMonth;
  const billRank = rankOf(state.slug, "bill");
  const priceRank = rankOf(state.slug, "price");
  const kwhRank = rankOf(state.slug, "kwh");
  const rateMatchedBill = nationalAverageAtRate(state.priceCents);
  const neighbours = adjacentStates(state);
  const direction = diff >= 0 ? "above" : "below";

  return (
    <Layout>
      <SeoMeta
        title={`Average Electric Bill in ${state.name}: ${usd(state.billAug)} a Month`}
        description={`${state.name} households averaged ${usd(state.billAug)} for ${kwh(state.kwhMonth)} in ${dataPeriod} at ${cents(state.priceCents)} per kWh, ${signedPct(change)} year over year. Six housing types, modeled.`}
        schema={({ pageUrl, origin }) => [
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
              { "@type": "ListItem", position: 2, name: "Average electric bill", item: `${origin}${HUB_PATH}/` },
              { "@type": "ListItem", position: 3, name: state.name, item: pageUrl },
            ],
          },
          {
            "@type": "Dataset",
            "@id": `${pageUrl}#dataset`,
            name: `Residential electric bill averages for ${state.name}, ${dataPeriod}`,
            description: `Average residential price, monthly consumption and average bill for ${state.name}, with modeled figures for six housing types.`,
            temporalCoverage: "2025-08/2026-08",
            spatialCoverage: state.name,
            isAccessibleForFree: true,
            creator: { "@type": "Organization", name: "U.S. Energy Information Administration" },
          },
        ]}
      />
      <BillPage>
        <SiteBreadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Average electric bill", href: `${HUB_PATH}/` }, { label: state.name }]}
        />
        <div className="eb-hero">
          <span className="eyebrow">
            {isCensusDivision(state.slug) ? "EIA census division" : "State average"} · {dataPeriod}
          </span>
          <h1>
            Average electric bill in <em>{state.name}</em>
          </h1>
          <p className="eb-lede">
            {isCensusDivision(state.slug) ? "This census division" : `${state.name}`} residential customers paid an average of{" "}
            <strong>{usd(state.billAug)}</strong> in {dataPeriod}, on {kwh(state.kwhMonth)} of electricity at{" "}
            {cents(state.priceCents)} per kWh. That is <strong>{usd(Math.abs(diff))}</strong> ({signedPct(diffPct)}) {direction} the
            U.S. average of {usd(national.billAug)}, and {signedPct(change)} compared with the same month a year earlier.
          </p>
          <div className="eb-meta">
            <span>Data period {dataPeriod}</span>
            <span>
              {isCensusDivision(state.slug)
                ? `Census division · not ranked against the ${jurisdictionCount} states and DC`
                : `Rank ${billRank} of ${jurisdictionCount} by bill`}
            </span>
            <span>Updated {dataUpdated}</span>
          </div>
        </div>

        <FigureGrid
          figures={[
            { label: "Average monthly bill", value: usd(state.billAug), note: `${dataPeriod}, residential` },
            { label: "Average price", value: cents(state.priceCents), note: `U.S. ${cents(national.priceCents)}` },
            { label: "Average use", value: kwh(state.kwhMonth), note: `U.S. ${kwh(national.kwhMonth)}` },
            { label: "Change vs. last August", value: signedPct(change), note: changeUsd === null ? "prior August not reported" : `${signedUsd(changeUsd)} per month` },
            { label: "Year to date", value: usd(state.billYtd), note: `${dataYtdPeriod} monthly average` },
            { label: "Residential customers", value: count(state.customers), note: "EIA sales accounts" },
          ]}
        />

        <section className="eb-section">
          <SectionHeading
            eyebrow="Position"
            title={isCensusDivision(state.slug) ? "Where this census division sits against the U.S. average" : `Where ${state.name} sits in the national table`}
            description="Price and consumption move independently, so a high bill is not automatically a high rate."
          />
          <div className="eb-prose">
            <p>
              {isCensusDivision(state.slug) ? (
                <>
                  This census division is an EIA aggregate of states that appear in the same table, so it is not ranked
                  against them. Its rate sits {signedPct((priceDiff / national.priceCents) * 100)} against the national{" "}
                  {cents(national.priceCents)}, while its usage runs {kwh(Math.abs(kwhDiff))}{" "}
                  {kwhDiff >= 0 ? "above" : "below"} the national {kwh(national.kwhMonth)}.
                </>
              ) : (
                <>
                  {state.name} has the <strong>{ordinal(billRank)}-highest</strong> average bill among the{" "}
                  {jurisdictionCount} states and the District of Columbia, the{" "}
                  <strong>{ordinal(priceRank)}-highest</strong> residential price, and the{" "}
                  <strong>{ordinal(kwhRank)}-highest</strong> monthly consumption per customer. Its rate sits{" "}
                  {signedPct((priceDiff / national.priceCents) * 100)} against the national {cents(national.priceCents)},
                  while its usage runs {kwh(Math.abs(kwhDiff))} {kwhDiff >= 0 ? "above" : "below"} the national{" "}
                  {kwh(national.kwhMonth)}.
                </>
              )}
            </p>
            <p>
              Splitting the two effects explains most of the gap. At {state.name}'s own rate of {cents(state.priceCents)}, a
              household using exactly the national average of {kwh(national.kwhMonth)} would pay{" "}
              <strong>{usd(rateMatchedBill)}</strong>; the remaining{" "}
              {usd(Math.abs(state.billAug - rateMatchedBill))} of the difference comes from consumption, not from the tariff.
            </p>
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Six housing types"
            title={`What each kind of home pays in ${state.name}`}
            description="Each figure applies a RECS 2020 consumption ratio to this state's all-household bill. The ratio is national, so these are estimates of relative size, not measured bills for that housing type in this state."
          />
          <div className="eb-table-wrap">
            <table className="eb-table" aria-label={`Modeled monthly electric bill by housing type in ${state.name}`}>
              <thead>
                <tr>
                  <th scope="col">Housing type</th>
                  <th scope="col">Modeled bill</th>
                  <th scope="col">Modeled use</th>
                  <th scope="col">U.S. same type</th>
                  <th scope="col">Difference</th>
                </tr>
              </thead>
              <tbody>
                {allSegments.map((segment) => {
                  const bill = stateSegmentBill(state, segment);
                  const nationalBill = nationalSegmentBill(segment);
                  const delta = bill - nationalBill;
                  return (
                    <tr key={segment.slug}>
                      <td className="eb-area">
                        <Link href={segmentStatePath(segment.slug, state.slug)}>{sentenceCase(segment.label)}</Link>
                      </td>
                      <td>{usd(bill)}</td>
                      <td>{kwh(stateSegmentKwh(state, segment))}</td>
                      <td>{usd(nationalBill)}</td>
                      <td className={delta > 0 ? "eb-up" : "eb-down"}>{signedUsd(delta)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading eyebrow="Side by side" title={`${state.name} against the U.S. average`} />
          <div className="eb-table-wrap">
            <table className="eb-table" aria-label={`${state.name} compared with the U.S. average`}>
              <thead>
                <tr>
                  <th scope="col">Measure</th>
                  <th scope="col">{state.name}</th>
                  <th scope="col">U.S. average</th>
                  <th scope="col">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Average monthly bill</td>
                  <td>{usd(state.billAug)}</td>
                  <td>{usd(national.billAug)}</td>
                  <td className={diff > 0 ? "eb-up" : "eb-down"}>{signedUsd(diff)}</td>
                </tr>
                <tr>
                  <td>Price per kWh</td>
                  <td>{cents(state.priceCents)}</td>
                  <td>{cents(national.priceCents)}</td>
                  <td className={priceDiff > 0 ? "eb-up" : "eb-down"}>
                    {priceDiff > 0 ? "+" : "−"}
                    {Math.abs(priceDiff).toFixed(2)}¢
                  </td>
                </tr>
                <tr>
                  <td>Monthly use per customer</td>
                  <td>{kwh(state.kwhMonth)}</td>
                  <td>{kwh(national.kwhMonth)}</td>
                  <td className={kwhDiff > 0 ? "eb-up" : "eb-down"}>{kwh(kwhDiff)}</td>
                </tr>
                <tr>
                  <td>Year-to-date monthly bill</td>
                  <td>{usd(state.billYtd)}</td>
                  <td>{usd(national.billYtd)}</td>
                  <td className={state.billYtd === null ? "" : state.billYtd > national.billYtd ? "eb-up" : "eb-down"}>
                    {state.billYtd === null ? "—" : signedUsd(state.billYtd - national.billYtd)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {neighbours.length > 0 ? (
          <section className="eb-section">
            <SectionHeading
              eyebrow="Bordering areas"
              title={isCensusDivision(state.slug) ? "Divisions into states" : `States that border ${state.name}`}
              description="Bills on either side of a state line are a useful control, because weather and housing stock are often similar while rate regulation is not."
            />
            <LinkChips
              links={neighbours.map((neighbour) => ({
                href: statePath(neighbour.slug),
                label: `${neighbour.name} · ${usd(neighbour.billAug)}`,
              }))}
            />
          </section>
        ) : null}

        <div className="eb-cta">
          <div className="eb-cta-copy">
            <h2>Price your own usage at {state.name} rates</h2>
            <p>
              The calculator opens with this state's residential price preloaded. Change the rate, add watts and hours, and
              compare the result with the {usd(state.billAug)} area average.
            </p>
          </div>
          <Link className="primary-button" href={`${CALCULATOR_PATH}?state=${state.slug}`}>
            Open the calculator
          </Link>
        </div>

        <NoteBox>
          <strong>What this page does not tell you.</strong> A state average is a population-weighted figure across every
          household and every utility in {state.name}; individual tariffs vary by utility, season and rate plan. Formulas,
          source tables and the housing-type coefficients are documented on the{" "}
          <Link href={METHODOLOGY_PATH} style={{ color: "var(--green)", fontWeight: 800 }}>
            methodology page
          </Link>
          . Last updated {dataUpdated}.
        </NoteBox>
      </BillPage>
    </Layout>
  );
}

function SegmentBillPage({ segment }: { segment: Segment }) {
  const nationalBill = nationalSegmentBill(segment);
  const delta = nationalBill - national.billAug;
  const nationalKwh = Math.round(national.kwhMonth * segment.factor);
  const sorted = rankedSegmentsByState(segment);
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];

  const rows: RankRow[] = allStates.map((state) => {
    const bill = stateSegmentBill(state, segment);
    const gap = bill - nationalBill;
    return {
      key: state.slug,
      href: segmentStatePath(segment.slug, state.slug),
      label: state.name,
      tag: isCensusDivision(state.slug) ? "division" : undefined,
      cells: [usd(bill), usd(gap), signedPct((gap / nationalBill) * 100)],
      sort: [bill, gap, (gap / nationalBill) * 100],
    };
  });

  return (
    <Layout>
      <SeoMeta
        title={`Average ${sentenceCase(segment.label)} Electric Bill: ${usd(nationalBill)}`}
        description={`The national average ${segment.label} bill was ${usd(nationalBill)} in ${dataPeriod}, modeled from EIA state bills and a ${segment.factor} RECS 2020 ratio. Rank all 53 areas.`}
        schema={({ pageUrl, origin }) => [
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
              { "@type": "ListItem", position: 2, name: "Average electric bill", item: `${origin}${HUB_PATH}/` },
              { "@type": "ListItem", position: 3, name: sentenceCase(segment.label), item: pageUrl },
            ],
          },
        ]}
      />
      <BillPage>
        <SiteBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Average electric bill", href: `${HUB_PATH}/` },
            { label: sentenceCase(segment.label) },
          ]}
        />
        <div className="eb-hero">
          <span className="eyebrow">Housing type · {dataPeriod}</span>
          <h1>
            Average <em>{segment.label}</em> electric bill
          </h1>
          <p className="eb-lede">
            A {segment.label} in the United States pays an estimated <strong>{usd(nationalBill)}</strong> a month for
            electricity in {dataPeriod}, against {usd(national.billAug)} for the average household across all housing types.
            The estimate applies a <strong>×{segment.factor}</strong> consumption ratio from RECS 2020 to the EIA's published
            state bills.
          </p>
          <div className="eb-meta">
            <span>Ratio source: RECS 2020, {segment.basis}</span>
            <span>Data period {dataPeriod}</span>
            <span>Updated {dataUpdated}</span>
          </div>
        </div>

        <FigureGrid
          figures={[
            { label: "National average", value: usd(nationalBill), note: sentenceCase(segment.label) },
            { label: "All households", value: usd(national.billAug), note: "U.S. residential average" },
            { label: "Difference", value: signedUsd(delta), note: `${signedPct((delta / national.billAug) * 100)} vs. all homes` },
            { label: "Modeled use", value: kwh(nationalKwh), note: "per household per month" },
            { label: "Highest area", value: top ? usd(top.bill) : "—", note: top ? top.name : "—" },
            { label: "Lowest area", value: bottom ? usd(bottom.bill) : "—", note: bottom ? bottom.name : "—" },
          ]}
        />

        <section className="eb-section">
          <SectionHeading
            eyebrow="All 53 areas"
            title={`${sentenceCase(segment.label)} bills, ranked`}
            description="Every row links to the state × housing-type page, which also compares the figure with that state's all-household average."
          />
          <RankTable
            ariaLabel={`Average ${segment.label} electric bill by area`}
            columns={[{ label: "Modeled bill" }, { label: "vs. U.S. segment" }, { label: "Gap %" }]}
            rows={rows}
          />
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="The ratio"
            title={`Why a ${segment.label} is ${segmentRatioNote(segment)}`}
            description="Housing type changes consumption far more reliably than it changes price, which is why the coefficient is applied to usage rather than to the tariff."
          />
          <div className="eb-prose">
            <p>
              The multiplier is <strong>×{segment.factor}</strong>. A household of this type is modeled to consume{" "}
              {kwh(nationalKwh)} a month where the all-household average is {kwh(national.kwhMonth)}, and then pays its area's
              actual residential rate on that volume. Applying the ratio to consumption — not to the final bill — keeps the
              state-to-state differences in price intact.
            </p>
            <p>
              Across the {jurisdictionCount} states and DC the same housing type ranges from <strong>{top ? usd(top.bill) : "—"}</strong> in{" "}
              {top ? top.name : "—"} to <strong>{bottom ? usd(bottom.bill) : "—"}</strong> in {bottom ? bottom.name : "—"}. That
              spread is rate and climate, not housing type: the housing type is held constant.
            </p>
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading eyebrow="Other housing types" title="Compare with the rest of the stock" />
          <LinkChips
            links={allSegments
              .filter((entry) => entry.slug !== segment.slug)
              .map((entry) => ({ href: segmentPath(entry.slug), label: `${sentenceCase(entry.label)} · ${usd(nationalSegmentBill(entry))}` }))}
          />
        </section>

        <div className="eb-cta">
          <div className="eb-cta-copy">
            <h2>Does the ratio match your home?</h2>
            <p>
              A ratio is a national average. If you know your own appliance load, the calculator will price it directly at
              your state's rate instead of borrowing a coefficient.
            </p>
          </div>
          <Link className="primary-button" href={CALCULATOR_PATH}>
            Estimate your own bill
          </Link>
        </div>

        <NoteBox>
          <strong>Reading these numbers.</strong> Ratios come from RECS 2020 housing-unit tables and are applied uniformly
          across states; they are not state-level measurements of that housing type. Data period {dataPeriod}, updated{" "}
          {dataUpdated}. See the{" "}
          <Link href={METHODOLOGY_PATH} style={{ color: "var(--green)", fontWeight: 800 }}>
            methodology
          </Link>
          .
        </NoteBox>
      </BillPage>
    </Layout>
  );
}

export default function AverageBillAreaOrSegment() {
  const params = useParams<{ slug?: string }>();
  const slug = params.slug ?? "";
  const state = stateOrNull(slug);
  if (state) return <StateBillPage state={state} />;
  const segment = segmentOrNull(slug);
  if (segment) return <SegmentBillPage segment={segment} />;
  return <NotFound />;
}
