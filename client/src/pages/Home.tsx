/** Home: the entry point for the electricity reference — baseline figures, rankings, housing types, and the calculator. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
import { BillPage, FigureGrid, LinkChips, NoteBox, RankTable, SectionHeading, type RankRow } from "@/components/electricity/bill-ui";
import { CALCULATOR_PATH, HUB_PATH, METHODOLOGY_PATH, homeMeta, segmentPath, statePath } from "@/data/electricityRoutes";
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
  nationalSegmentBill,
  pctChange,
  rankedStates,
  segmentRatioNote,
  sentenceCase,
  signedPct,
  signedUsd,
  usd,
} from "@/data/electricityInsights";

const startStates = [
  "california",
  "texas",
  "florida",
  "new-york",
  "pennsylvania",
  "illinois",
  "ohio",
  "georgia",
  "arizona",
  "washington",
  "michigan",
  "massachusetts",
];

export default function Home() {
  const top = rankedStates("bill").slice(0, 10);

  const topRows: RankRow[] = top.map((state) => ({
    key: state.slug,
    href: statePath(state.slug),
    label: state.name,
    tag: isCensusDivision(state.slug) ? "Division" : undefined,
    cells: [
      usd(state.billAug),
      cents(state.priceCents),
      kwh(state.kwhMonth),
      signedPct(pctChange(state.billAug, state.billAugPrev)),
    ],
    sort: [state.billAug, state.priceCents, state.kwhMonth, pctChange(state.billAug, state.billAugPrev)],
  }));

  const startLinks = startStates
    .map((slug) => allStates.find((state) => state.slug === slug))
    .filter((state): state is (typeof allStates)[number] => Boolean(state))
    .map((state) => ({ href: statePath(state.slug), label: state.name }));

  const cheapest = rankedStates("bill")[rankedStates("bill").length - 1];

  return (
    <Layout>
      <SeoMeta
        title={homeMeta.title}
        description={homeMeta.description}
        schema={({ origin }) => [
          {
            "@type": "WebSite",
            "@id": `${origin}/#website`,
            name: "Knexio Electricity Reference",
            url: origin,
            description: homeMeta.description,
          },
          {
            "@type": "Organization",
            "@id": `${origin}/#organization`,
            name: "Knexio",
            url: origin,
            email: "tzhkai6@gmail.com",
            description:
              "Publisher of an independent U.S. electricity bill reference built on EIA Electric Power Monthly data.",
          },
          {
            "@type": "Dataset",
            "@id": `${origin}${HUB_PATH}#dataset`,
            name: `U.S. residential electricity bills by state, ${dataPeriod}`,
            description: `Residential price, sales, customer counts and derived average bills for 53 reporting areas, from EIA Electric Power Monthly and RECS 2020.`,
            url: `${origin}${HUB_PATH}/`,
            creator: { "@type": "Organization", name: "U.S. Energy Information Administration" },
            isAccessibleForFree: true,
            dateModified: dataUpdated,
            temporalCoverage: "2026-01/2026-08",
          },
        ]}
      />
      <BillPage>
        <header className="eb-hero">
          <span className="eyebrow">EIA Electric Power Monthly · {dataPeriod}</span>
          <h1>
            What a U.S. household <em>actually pays</em> for electricity
          </h1>
          <p className="eb-lede">
            The average American household paid {usd(national.billAug)} for {kwh(national.kwhMonth)} of electricity in{" "}
            {dataPeriod}, at {cents(national.priceCents)} per kWh. Those three numbers move independently — price,
            usage, and the bill they produce — and the gap between states is almost never explained by price alone. This
            site tracks all three for every reporting area, then lets you price your own usage.
          </p>
          <div className="eb-meta">
            <span>{allStates.length} reporting areas</span>
            <span>{allSegments.length} housing types</span>
            <span>Source: EIA, RECS 2020</span>
            <span>Updated {dataUpdated}</span>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href={HUB_PATH} className="primary-button">
              Open the state rankings <ArrowUpRight size={16} />
            </Link>
            <Link href={CALCULATOR_PATH} className="secondary-button">
              Estimate my bill
            </Link>
          </div>
        </header>

        <FigureGrid
          figures={[
            { label: "Average bill", value: usd(national.billAug), note: `${dataPeriod}, residential` },
            { label: "Average price", value: cents(national.priceCents), note: "per kWh, all sectors excluded" },
            { label: "Average usage", value: kwh(national.kwhMonth), note: "per household, per month" },
            { label: "Year to date", value: usd(national.billYtd), note: `${dataYtdPeriod} monthly average` },
          ]}
        />

        <section className="eb-section">
          <SectionHeading
            eyebrow="Highest bills"
            title="Where the ten largest bills land"
            description="A bill is price multiplied by usage, so this table is not a ranking of expensive electricity — it is a ranking of expensive months. Sort by price or usage to see which half is doing the work."
            aside={
              <Link href={HUB_PATH} className="text-link">
                All {allStates.length} areas <ArrowUpRight size={15} />
              </Link>
            }
          />
          <RankTable
            ariaLabel={`The ten highest average residential electric bills in ${dataPeriod}`}
            columns={[{ label: "Bill" }, { label: "Price" }, { label: "Usage" }, { label: "YoY" }]}
            rows={topRows}
            initialSort={0}
          />
          <NoteBox>
            The spread is large: the highest bill in {dataPeriod} is {usd(top[0]?.billAug ?? null)} and the lowest is{" "}
            {usd(cheapest?.billAug ?? null)}, a difference of{" "}
            {usd((top[0]?.billAug ?? 0) - (cheapest?.billAug ?? 0))} a month. Compare that with the price column, which
            ranges from {cents(rankedStates("price")[rankedStates("price").length - 1]?.priceCents ?? null)} to{" "}
            {cents(rankedStates("price")[0]?.priceCents ?? null)} — the rest of the gap is how much electricity the
            households actually use.
          </NoteBox>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Housing types"
            title="A studio and a house are not the same bill"
            description="The published average covers every dwelling. These six views apply a RECS 2020 ratio to that average, so an apartment can be compared with a house on the same state data rather than on a separate survey."
          />
          <div className="eb-cards">
            {allSegments.map((segment) => (
              <Link key={segment.slug} href={segmentPath(segment.slug)} className="eb-card">
                <span className="eb-card-label">{sentenceCase(segment.label)}</span>
                <span className="eb-card-value">{usd(nationalSegmentBill(segment))}</span>
                <span className="eb-card-note">
                  National average, {segmentRatioNote(segment)}. Ratio {segment.factor.toFixed(3)} from RECS 2020.
                </span>
              </Link>
            ))}
          </div>
          <NoteBox>
            Housing-type figures are <strong>modeled</strong>, not published: the EIA does not report a monthly bill per
            housing type for each state. The all-household figure above is the official EIA number.{" "}
            <Link href={METHODOLOGY_PATH} className="underline">
              Read the derivation
            </Link>
            .
          </NoteBox>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="State detail"
            title="Start with the state you pay in"
            description="Each state page carries the price, usage and bill for two years, a housing-type matrix for that state, and the neighbouring states worth comparing against."
          />
          <LinkChips links={[...startLinks, { href: HUB_PATH, label: `All ${allStates.length} areas` }]} />
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Your own numbers"
            title="Average is a starting point, not an answer"
            description="A wattage-and-hours estimate or a straight kWh price is a better forecast of next month than any state average — and both run at the same published rate."
          />
          <div className="eb-duo">
            <div className="eb-callout">
              <h3>Watts and hours</h3>
              <p>
                Enter an appliance&rsquo;s wattage and daily runtime to get monthly kWh and dollars, priced at the
                residential rate for any of the {allStates.length} areas.
              </p>
              <Link href={CALCULATOR_PATH} className="text-link mt-3 inline-flex">
                Open the calculator <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="eb-callout">
              <h3>kWh on a statement</h3>
              <p>
                If your bill reports usage, price that figure directly. Same rate table, same arithmetic, no
                assumptions about how many days the month had.
              </p>
              <Link href={CALCULATOR_PATH} className="text-link mt-3 inline-flex">
                Price a kWh figure <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="eb-callout">
              <h3>Where the data ends</h3>
              <p>
                {count(national.customers)} households are averaged here. Your meter is one of them, and tiered rates,
                heat pumps and rooftop solar all break the average in useful ways.
              </p>
              <Link href={METHODOLOGY_PATH} className="text-link mt-3 inline-flex">
                Limits and sources <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <div className="eb-cta">
          <div className="eb-cta-copy">
            <h2>
              {allStates.length} areas, one table, sortable four ways
            </h2>
            <p>
              Bill, price, usage and year-over-year change for {dataPeriod} and {dataYtdPeriod} — with every figure
              traceable to an EIA table.
            </p>
          </div>
          <Link href={HUB_PATH} className="primary-button">
            Compare the states <ArrowUpRight size={16} />
          </Link>
        </div>
      </BillPage>
    </Layout>
  );
}
