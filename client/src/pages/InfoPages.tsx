/** Trust pages: what this reference is, how it is edited, and how corrections reach us. */
import { Link } from "wouter";
import { CircleAlert, Database, FileCheck2, Gauge, Mail, PencilLine, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
import { METHODOLOGY_PATH, CALCULATOR_PATH, HUB_PATH } from "@/data/electricityRoutes";
import { cents, dataPeriod, dataUpdated, dataYtdPeriod, national, usd } from "@/data/electricityInsights";

const dataSummary = `In ${dataPeriod}, U.S. residential customers paid an average of ${cents(national.priceCents)} per kWh for ${national.kwhMonth.toLocaleString("en-US")} kWh, or ${usd(national.billAug)} for the month.`;

export function About() {
  return (
    <Layout>
      <SeoMeta
        title="About this electricity reference"
        description="Knexio publishes an independent U.S. residential electricity bill reference built on EIA Electric Power Monthly releases and RECS 2020 housing ratios."
        schema={({ origin, pageUrl }) => [
          { "@type": "AboutPage", "@id": `${pageUrl}#about`, name: "About this electricity reference", url: pageUrl, isPartOf: { "@type": "WebSite", name: "Knexio", url: origin } },
        ]}
      />
      <section className="info-hero">
        <span className="eyebrow">About Knexio</span>
        <h1>Every number here<br /><em>has a table</em> behind it.</h1>
        <p>{dataSummary} This site exists so that sentence can be checked, area by area, instead of taken on faith.</p>
      </section>

      <nav className="info-toc" aria-label="On this page">
        <a href="#what">What this site publishes</a>
        <a href="#scope">What is measured, what is modeled</a>
        <a href="#record">Data record</a>
        <a href="#making">How pages are built</a>
      </nav>

      <section className="about-manifesto" aria-label="Editorial stance">
        <article>
          <span className="manifesto-number">01</span>
          <h2>One publisher, one vintage</h2>
          <p>Price, sales and customer counts all come from the same monthly EIA release. Mixing vintages is how "average bill" pages end up disagreeing with each other; we do not mix them.</p>
        </article>
        <article>
          <span className="manifesto-number">02</span>
          <h2>Modeled figures say so</h2>
          <p>Housing-type bills are arithmetic on top of a RECS 2020 ratio, not a survey of identical homes. Every page that shows one also names the ratio it used.</p>
        </article>
        <article>
          <span className="manifesto-number">03</span>
          <h2>Averages are not quotes</h2>
          <p>A state average is what the population paid, not what your meter will do. Tiered rates, heating fuel, rooftop solar and apartment master-metering all pull a real bill away from it.</p>
        </article>
      </section>

      <section id="what" className="about-scope" aria-label="What Knexio publishes">
        <article>
          <Gauge size={23} />
          <h3>Area bills, monthly</h3>
          <p>All 53 reporting areas — 50 states, the District of Columbia and the two Pacific census divisions — with average bill, average price and average use for {dataPeriod}, plus the year-over-year move and the {dataYtdPeriod} average.</p>
        </article>
        <article>
          <Database size={23} />
          <h3>Housing-type estimates</h3>
          <p>Six housing types, from studio apartments to mobile homes, each carrying a single RECS 2020 ratio applied to the area bill. Every combination of housing type and area is published, including the ones where the estimate is least reliable.</p>
        </article>
        <article>
          <PencilLine size={23} />
          <h3>A calculator you can audit</h3>
          <p>The calculator uses one formula and shows it while you type: watts × hours × days ÷ 1,000 × rate. State rates are preloaded from the same dataset as the tables, and you can overwrite any field.</p>
        </article>
      </section>

      <section id="scope" className="trust-record" aria-label="Measured and modeled figures">
        <div>
          <span className="eyebrow">Reading the numbers</span>
          <h2>Two kinds of figure, kept apart.</h2>
        </div>
        <dl className="trust-record-list">
          <div><dt>Measured</dt><dd>Area bill, price per kWh, monthly use, customer count and sales. These are EIA survey results, reproduced without adjustment.</dd></div>
          <div><dt>Modeled</dt><dd>Every housing-type bill and every housing-type-by-area bill. The formula is area bill × RECS ratio, and the ratio is printed next to the figure.</dd></div>
          <div><dt>Derived</dt><dd>Percent changes, rankings, differences from the U.S. average, and the customer-weighted prior-year national bill. All are arithmetic on the two sets above.</dd></div>
          <div><dt>Never</dt><dd>No forecasts, no "typical household" composites, no invented utility names, no numbers rounded to look cleaner than the source.</dd></div>
        </dl>
      </section>

      <section id="record" className="trust-record" aria-label="Data record">
        <div>
          <span className="eyebrow">Data record</span>
          <h2>What is current, and when it changes.</h2>
        </div>
        <dl className="trust-record-list">
          <div><dt>Latest month</dt><dd>{dataPeriod}</dd></div>
          <div><dt>Year to date</dt><dd>{dataYtdPeriod} monthly average</dd></div>
          <div><dt>Dataset updated</dt><dd>{dataUpdated}</dd></div>
          <div><dt>Housing ratios</dt><dd>RECS 2020, revised only when EIA publishes a new survey</dd></div>
          <div><dt>Full derivation</dt><dd><Link className="text-link" href={METHODOLOGY_PATH}>Methodology: sources, formulas and limits</Link></dd></div>
        </dl>
      </section>

      <section id="making" className="transparency-note">
        <span>01</span>
        <div>
          <span className="eyebrow">How pages are built</span>
          <h2>Generated from the dataset, not typed by hand.</h2>
          <p>The ~380 pages in this section are rendered from a single data file that is populated from EIA tables. That is why a state page can never quietly disagree with the national table: there is only one place a bill figure exists. Editorial work goes into the wording, the comparisons chosen, and the limits stated — not into retyping numbers.</p>
          <p>Language models assist with drafting explanatory copy. They are not allowed to produce, adjust or interpolate a figure; any page where a number changed without a matching source row is treated as a bug.</p>
          <a className="text-link large-link" href={HUB_PATH}>Start with the national table</a>
        </div>
      </section>
    </Layout>
  );
}

const standards = [
  { title: "Source before sentence", body: "A page may only state a figure that exists in an EIA table or is arithmetic on one. If a claim cannot be traced to a table row, it is removed rather than softened." },
  { title: "Name the period", body: "Every table and figure states its month or year-to-date window. No undated averages, no \"recently\" or \"currently\" standing in for a date." },
  { title: "Label the model", body: "Housing-type bills carry the word modeled, the RECS cell they use, and the multiplier. Readers should be able to reproduce the number with a calculator." },
  { title: "Show the weak cases", body: "Where a housing type is rare in an area, or a division overlaps states, the page says so instead of hiding the caveat in a footnote." },
  { title: "Corrections are public", body: "Confirmed data errors are fixed in the dataset, which updates every dependent page at once. The update date on the methodology page changes with the fix." },
  { title: "No commercial steering", body: "Rankings are ordered by the published figure only. No utility, retailer or installer can pay for placement, and no link in a data table is paid." },
  { title: "Advertisers do not see drafts", body: "Advertising is served by Google on published pages. Ad placement never determines which areas, housing types or comparisons are published." },
  { title: "Independent of utilities", body: "This site is not affiliated with EIA, any utility, or any energy retailer. EIA data is public domain; the presentation and derived figures are ours." },
];

export function EditorialPolicy() {
  return (
    <Layout>
      <SeoMeta
        title="Editorial standards and data method"
        description="How Knexio selects sources, computes averages, labels modeled figures, dates every dataset, and handles corrections."
        schema={({ origin, pageUrl }) => [
          { "@type": "WebPage", "@id": `${pageUrl}#standards`, name: "Editorial standards and data method", url: pageUrl, isPartOf: { "@type": "WebSite", name: "Knexio", url: origin } },
        ]}
      />
      <section className="policy-hero">
        <span className="eyebrow">Editorial standards</span>
        <h1>Publish less,<br /><em>prove</em> more.</h1>
        <p className="policy-intro">A bill reference is only useful if a reader can retrace it. These are the rules the pages are held to, and the ones a correction request can be argued against.</p>
      </section>

      <nav className="policy-index" aria-label="Standards index">
        <a href={METHODOLOGY_PATH}>Methodology and sources</a>
        <a href="#standards">The eight standards</a>
        <a href="/contact">Report an error</a>
      </nav>

      <section id="standards" className="standards-list" aria-label="The eight standards">
        {standards.map((standard, index) => (
          <article key={standard.title} className="standard-row">
            <span className="standard-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{standard.title}</h2>
              <p>{standard.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="policy-grid" aria-label="Practical consequences">
        <article>
          <FileCheck2 size={22} />
          <h3>What gets published</h3>
          <p>Pages that carry at least one figure a reader cannot get from a generic article: a state's own bill, its housing-type matrix, or its position against the other 52 areas.</p>
        </article>
        <article>
          <ShieldCheck size={22} />
          <h3>What does not</h3>
          <p>No "energy saving tips" filler, no invented case studies, no household profiles. If a page would only restate the national average, it is not written.</p>
        </article>
        <article>
          <CircleAlert size={22} />
          <h3>When we are wrong</h3>
          <p>Send the area, the figure and the EIA table you are comparing against. A confirmed error is corrected in the dataset and dated; a disagreement about interpretation is answered, not silently edited.</p>
        </article>
      </section>
    </Layout>
  );
}

export function Contact() {
  return (
    <Layout>
      <SeoMeta
        title="Contact and corrections"
        description="Report a data error, request a correction, or ask about the method behind any figure published here."
        schema={({ origin, pageUrl }) => [
          { "@type": "ContactPage", "@id": `${pageUrl}#contact`, name: "Contact and corrections", url: pageUrl, isPartOf: { "@type": "WebSite", name: "Knexio", url: origin } },
        ]}
      />
      <section className="contact-hero">
        <span className="eyebrow">Contact</span>
        <h1>A wrong number is<br />worth an email.</h1>
        <p>This is a small, single-editor reference. Corrections from readers who are looking at the same EIA table are the fastest way it stays accurate.</p>
      </section>

      <section className="contact-request-grid" aria-label="What to send">
        <article>
          <Database size={22} />
          <h3>Data corrections</h3>
          <p>Name the area or housing type, the figure you see, the figure you expected, and the EIA table or release you are comparing against. Corrections are applied to the dataset, so every dependent page updates at once.</p>
        </article>
        <article>
          <PencilLine size={22} />
          <h3>Method questions</h3>
          <p>If a derived figure is unclear — a customer-weighted national prior year, a RECS ratio, a division flagged inside a state table — ask and the explanation is added to the methodology page rather than buried in a reply.</p>
        </article>
        <article>
          <Gauge size={22} />
          <h3>Calculator problems</h3>
          <p>Report the inputs you used, the number the calculator produced, and what you expected. The formula is fixed and published, so a mismatch is either a display bug or an input parsing bug, and both are fixable.</p>
        </article>
      </section>

      <section className="contact-record" aria-label="Contact details">
        <div className="contact-record-main">
          <h2>Where to write</h2>
          <p>Email reaches the editor directly. There is no ticket queue and no support team, so replies are short but they are from the person who publishes the page.</p>
          <p><Mail size={16} aria-hidden="true" /> <a className="text-link" href="mailto:tzhkai6@gmail.com">tzhkai6@gmail.com</a></p>
        </div>
        <dl>
          <div><dt>Typical reply</dt><dd>Within five working days</dd></div>
          <div><dt>Data questions</dt><dd>Include the EIA table number when you have it</dd></div>
          <div><dt>Privacy requests</dt><dd>See the <Link className="text-link" href="/privacy">privacy notice</Link></dd></div>
        </dl>
      </section>

      <section className="contact-launch-card">
        <div className="launch-field">
          <h2>Before you write</h2>
          <p>Most questions about where a number came from are already answered on the methodology page: sources, the RECS ratios, the division handling, and what the figures cannot tell you.</p>
          <Link className="text-link large-link" href={METHODOLOGY_PATH}>Read the methodology</Link>
        </div>
        <div className="launch-field">
          <h2>Check the calculator first</h2>
          <p>If your question is "why is my bill different", the calculator is the faster answer: enter your own rate and usage, and compare that with the published average for your area.</p>
          <Link className="text-link large-link" href={CALCULATOR_PATH}>Open the calculator</Link>
        </div>
      </section>
    </Layout>
  );
}
