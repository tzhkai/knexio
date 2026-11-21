/** Methodology: where every figure comes from, how the coefficients are built, and what the model cannot do. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
import SiteBreadcrumb, { breadcrumbListSchema, type Crumb } from "@/components/SiteBreadcrumb";
import { BillPage, FigureGrid, LinkChips, NoteBox, SectionHeading } from "@/components/electricity/bill-ui";
import { CALCULATOR_PATH, HUB_PATH, methodologyMeta, segmentPath, statePath } from "@/data/electricityRoutes";
import {
  allSegments,
  cents,
  count,
  dataPeriod,
  dataUpdated,
  dataYtdPeriod,
  kwh,
  national,
  sentenceCase,
  usd,
} from "@/data/electricityInsights";

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Methodology" },
];

const sources = [
  {
    figure: "Price per kWh",
    table: "EIA Electric Power Monthly, Table 5.6.A / 5.6.B — residential average retail price, cents per kWh",
  },
  {
    figure: "Usage per household",
    table: "EIA Electric Power Monthly, Table 5.4.A / 5.4.B — residential sales in thousand MWh, divided by the customer count",
  },
  {
    figure: "Customer counts",
    table: "EIA Electric Power Monthly, Table 5.8 — residential ultimate customers",
  },
  {
    figure: "Housing-type ratios",
    table: "EIA Residential Energy Consumption Survey (RECS) 2020, Tables CE1.1 / CE5.1a / CE5.1b",
  },
];

export default function Methodology() {
  return (
    <Layout>
      <SeoMeta
        title={methodologyMeta.title}
        description={methodologyMeta.description}
        schema={({ origin, pageUrl }) => [
          breadcrumbListSchema(origin, pageUrl, crumbs),
          {
            "@type": "TechArticle",
            "@id": `${pageUrl}#article`,
            headline: methodologyMeta.title,
            description: methodologyMeta.description,
            url: pageUrl,
            dateModified: dataUpdated,
            datePublished: dataUpdated,
            author: { "@type": "Organization", name: "Knexio", url: origin },
            publisher: { "@type": "Organization", name: "Knexio", url: origin },
          },
        ]}
      />
      <SiteBreadcrumb items={crumbs} />
      <BillPage>
        <header className="eb-hero">
          <span className="eyebrow">Reference · methodology</span>
          <h1>
            Where the numbers come from, <em>and what they cannot do</em>
          </h1>
          <p className="eb-lede">
            Every figure on this site is either published by the U.S. Energy Information Administration or computed
            from published figures by an arithmetic rule written out on this page. There is no survey of our own, no
            scraped listing, and no estimated state that we cannot point back to a table for.
          </p>
          <div className="eb-meta">
            <span>Data period: {dataPeriod}</span>
            <span>Year to date: {dataYtdPeriod}</span>
            <span>Last updated: {dataUpdated}</span>
          </div>
        </header>

        <FigureGrid
          figures={[
            { label: "U.S. average bill", value: usd(national.billAug), note: dataPeriod },
            { label: "U.S. average price", value: cents(national.priceCents), note: "residential, per kWh" },
            { label: "U.S. average use", value: kwh(national.kwhMonth), note: "per household, per month" },
            { label: "Residential customers", value: count(national.customers), note: "the population being averaged" },
          ]}
        />

        <section className="eb-section">
          <SectionHeading
            eyebrow="Sources"
            title="Four published tables, nothing else"
            description="The EIA publishes monthly state-level price, sales and customer counts. The RECS publishes how electricity use splits across housing types. Those two publications are the entire input."
          />
          <div className="eb-table-wrap">
            <table className="eb-table">
              <thead>
                <tr>
                  <th scope="col">Figure on this site</th>
                  <th scope="col" style={{ textAlign: "left" }}>
                    Source table
                  </th>
                </tr>
              </thead>
              <tbody>
                {sources.map((source) => (
                  <tr key={source.figure}>
                    <td className="eb-area">{source.figure}</td>
                    <td style={{ textAlign: "left", whiteSpace: "normal" }}>{source.table}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <NoteBox>
            <strong>Periods.</strong> Monthly figures are the latest published month, {dataPeriod}. Year-to-date figures
            are the {dataYtdPeriod} average, which is why they move more slowly and why a monthly number can look
            unusually high or low against them. Prices are the residential sector average and already include
            transmission, distribution and the fixed charges that utilities fold into the per-kWh rate; they exclude
            one-off credits, arrears and taxes collected separately.
          </NoteBox>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Derivations"
            title="How a bill figure is built"
            description="Three quantities and four lines of arithmetic. Each step is reversible, so any number on any page can be traced back to a published table."
          />
          <div className="eb-prose">
            <ul>
              <li>
                <strong>Usage per household</strong> = residential sales (thousand MWh) ÷ residential customers, in the
                same month and area. A state with high usage per customer is a state of large homes, electric heating
                or both — the price tells you a different story.
              </li>
              <li>
                <strong>Average monthly bill</strong> = usage per household × price per kWh. That is the figure ranked
                in the tables across the site.
              </li>
              <li>
                <strong>Year-over-year change</strong> = (this period ÷ same period a year earlier − 1) × 100, computed
                on the bill, so it captures price and usage moving together.
              </li>
              <li>
                <strong>Housing-type bill</strong> = area bill × RECS ratio. The ratio is the only modeled quantity on
                the site; everything else is published.
              </li>
            </ul>
            <p>
              Rounding happens once, at display: prices to two decimals of a cent, bills to the cent, usage to the whole
              kWh. Rankings are computed on the rounded values shown, so the order in the table is always reproducible
              from the numbers printed beside it.
            </p>
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Coefficients"
            title="The six housing ratios, and why they are trustworthy"
            description="RECS 2020 reports average electricity use per household for each housing type and size band. Dividing one of those averages by the all-household average gives a ratio between 0 and about 1.2 — no fitting, no regression, no judgment call."
          />
          <div className="eb-table-wrap">
            <table className="eb-table">
              <thead>
                <tr>
                  <th scope="col">Housing type</th>
                  <th scope="col">Ratio to all households</th>
                  <th scope="col" style={{ textAlign: "left" }}>
                    RECS 2020 cell used
                  </th>
                </tr>
              </thead>
              <tbody>
                {allSegments.map((segment) => (
                  <tr key={segment.slug}>
                    <td className="eb-area">
                      <Link href={segmentPath(segment.slug)}>{sentenceCase(segment.label)}</Link>
                    </td>
                    <td>{segment.factor.toFixed(3)}</td>
                    <td style={{ textAlign: "left", whiteSpace: "normal" }}>{segment.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="eb-prose">
            <p>
              Two consequences follow, and both are stated on the pages that use them. A ratio transfers the{" "}
              <em>shape</em> of national housing differences onto a state&rsquo;s all-household bill; it does not claim
              that a studio in Maine uses 59.4% of the Maine average, only that nationally studios sit at that fraction
              of the all-household figure. And because the ratio is national, the housing-type pages rank states by how
              expensive the state is overall, not by how common that housing type is locally.
            </p>
            <p>
              Segment bills are therefore labeled <strong>modeled</strong> wherever they appear, and the all-household
              bill is what should be quoted as the official EIA figure.
            </p>
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Coverage"
            title="What “53 areas” means"
            description="The EIA reports 50 states, the District of Columbia, and two census divisions for the Pacific region. All 53 are ranked together because all 53 publish the same three inputs. The two divisions are flagged in the tables so a division is never mistaken for a state."
          />
          <div className="eb-prose">
            <p>
              Totals are not sums of the rows: the Pacific divisions overlap with their member states, so adding every
              row would double-count the West Coast. The national figure published by the EIA is used instead, and the
              customer count shown beside it — {count(national.customers)} residential customers — is the weight behind
              the national average.
            </p>
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Limits"
            title="Four things this site does not know"
            description="Being explicit about the edge of the data is part of the method, not a disclaimer bolted on at the end."
          />
          <div className="eb-split">
            <div className="eb-prose">
              <ul>
                <li>
                  <strong>Your bill is not the average.</strong> Averages smooth over apartment size, heating fuel,
                  household size, rooftop solar, and whether the home is all-electric. A single household can sit far
                  from its state line in either direction.
                </li>
                <li>
                  <strong>Tiers, time-of-use and fixed charges are invisible here.</strong> A published per-kWh price is
                  a revenue-weighted average, not the marginal rate you pay on the last block of usage.
                </li>
                <li>
                  <strong>Month matters.</strong> {dataPeriod} is a summer month in most of the country, so air
                  conditioning states look expensive on usage and heating states look mild. The year-to-date column
                  exists for exactly that reason.
                </li>
                <li>
                  <strong>Prices are nominal dollars.</strong> No inflation adjustment, no regional cost-of-living
                  adjustment. A cheap bill in a low-income state is not automatically a smaller burden.
                </li>
              </ul>
            </div>
            <div className="eb-callout">
              <h3>Update routine</h3>
              <p>
                Each EIA release replaces the monthly and year-to-date figures for all 53 areas in one pass; the site
                does not mix vintages. The update date in the page header — currently {dataUpdated} — is generated from
                the same file as the numbers, so it cannot drift from them. RECS coefficients only change when a new
                survey is published, roughly every four years.
              </p>
            </div>
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading eyebrow="Use" title="Quoting and reusing these figures" />
          <div className="eb-prose">
            <p>
              The underlying data is public domain, and we cite the exact tables above so anyone can reproduce a figure
              without trusting us. If you quote a number, quote the period with it: {dataPeriod} for the monthly
              columns, {dataYtdPeriod} for the year-to-date columns. When quoting a housing-type figure, say that it is
              modeled from a RECS ratio, because that is what it is. Corrections are welcome and are applied to the
              whole dataset rather than to one page.
            </p>
          </div>
          <LinkChips
            links={[
              { href: HUB_PATH, label: "All 53 areas ranked" },
              { href: CALCULATOR_PATH, label: "Electricity cost calculator" },
              { href: statePath("texas"), label: "Texas bill detail" },
            ]}
          />
        </section>

        <div className="eb-cta">
          <div className="eb-cta-copy">
            <h2>Check a figure against the source</h2>
            <p>
              Every table on this site names the period it uses. If a number here disagrees with the EIA release for{" "}
              {dataPeriod}, the EIA is right and we want to know.
            </p>
          </div>
          <Link href="/contact" className="primary-button">
            Send a correction <ArrowUpRight size={16} />
          </Link>
        </div>
      </BillPage>
    </Layout>
  );
}
