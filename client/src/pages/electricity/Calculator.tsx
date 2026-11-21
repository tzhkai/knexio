/** Calculator: watts x hours -> dollars, or kWh -> dollars, priced at a real residential rate. */
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
import SiteBreadcrumb, { breadcrumbListSchema, type Crumb } from "@/components/SiteBreadcrumb";
import { BillPage, FigureGrid, LinkChips, NoteBox, SectionHeading } from "@/components/electricity/bill-ui";
import { HUB_PATH, METHODOLOGY_PATH, calculatorMeta, statePath } from "@/data/electricityRoutes";
import { allStates, cents, dataPeriod, kwh, national, usd } from "@/data/electricityInsights";

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Electricity cost calculator" },
];

type AreaOption = { slug: string; name: string; priceCents: number; kwhMonth: number; billAug: number };

const areaOptions: AreaOption[] = [
  { slug: "national", name: "U.S. average", priceCents: national.priceCents, kwhMonth: national.kwhMonth, billAug: national.billAug },
  ...allStates.map((state) => ({
    slug: state.slug,
    name: state.name,
    priceCents: state.priceCents,
    kwhMonth: state.kwhMonth,
    billAug: state.billAug,
  })),
];

const presets = [
  { label: "Space heater", watts: 1500, hours: 6 },
  { label: "Window AC", watts: 1200, hours: 8 },
  { label: "Refrigerator", watts: 150, hours: 24 },
  { label: "EV charging", watts: 7200, hours: 2 },
  { label: "LED bulb", watts: 10, hours: 5 },
];

const fieldClass =
  "mt-1.5 w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 font-sans text-[15px] font-bold tabular-nums text-[var(--ink)] outline-none focus:border-[var(--green)]";
const labelClass = "block text-[9px] font-extrabold uppercase tracking-[0.11em] text-[var(--green)]";

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/** ?state=oregon on a link from an area page preselects that area and its real price. */
function areaFromQuery(): AreaOption | null {
  if (typeof window === "undefined") return null;
  const slug = new URLSearchParams(window.location.search).get("state");
  if (!slug) return null;
  return areaOptions.find((option) => option.slug === slug) ?? null;
}

export default function ElectricityCostCalculator() {
  const [areaSlug, setAreaSlug] = useState(() => areaFromQuery()?.slug ?? "national");
  const [rateInput, setRateInput] = useState(() => String(areaFromQuery()?.priceCents ?? national.priceCents));
  const [watts, setWatts] = useState("1500");
  const [hours, setHours] = useState("6");
  const [days, setDays] = useState("30");
  const [directKwh, setDirectKwh] = useState("1000");

  const area = useMemo(
    () => areaOptions.find((option) => option.slug === areaSlug) ?? areaOptions[0],
    [areaSlug],
  );

  const rate = Number.parseFloat(rateInput);
  const safeRate = Number.isFinite(rate) && rate > 0 ? rate : area.priceCents;

  const wattsValue = Math.max(0, Number.parseFloat(watts) || 0);
  const hoursValue = Math.min(24, Math.max(0, Number.parseFloat(hours) || 0));
  const daysValue = Math.min(31, Math.max(1, Number.parseFloat(days) || 0));

  const monthlyKwh = (wattsValue * hoursValue * daysValue) / 1000;
  const monthlyCost = (monthlyKwh * safeRate) / 100;
  const yearlyKwh = monthlyKwh * 12;
  const yearlyCost = monthlyCost * 12;

  const directValue = Math.max(0, Number.parseFloat(directKwh) || 0);
  const directCost = (directValue * safeRate) / 100;

  const usageShare = monthlyKwh > 0 && area.kwhMonth > 0 ? (monthlyKwh / area.kwhMonth) * 100 : 0;

  function selectArea(slug: string) {
    const next = areaOptions.find((option) => option.slug === slug);
    setAreaSlug(slug);
    if (next) setRateInput(String(next.priceCents));
  }

  function applyPreset(preset: { watts: number; hours: number }) {
    setWatts(String(preset.watts));
    setHours(String(preset.hours));
  }

  return (
    <Layout>
      <SeoMeta
        title={calculatorMeta.title}
        description={calculatorMeta.description}
        schema={({ origin, pageUrl }) => [
          breadcrumbListSchema(origin, pageUrl, crumbs),
          {
            "@type": "WebApplication",
            "@id": `${pageUrl}#app`,
            name: "Electricity Cost Calculator",
            url: pageUrl,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            browserRequirements: "Runs entirely in the browser; no sign-in or upload.",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description: calculatorMeta.description,
            publisher: { "@type": "Organization", name: "Knexio", url: origin },
          },
        ]}
      />
      <SiteBreadcrumb items={crumbs} />
      <BillPage>
        <header className="eb-hero">
          <span className="eyebrow">Tool · runs in your browser</span>
          <h1>
            Electricity cost calculator: <em>watts in, dollars out</em>
          </h1>
          <p className="eb-lede">
            Enter an appliance&rsquo;s wattage and the hours it runs, and you get the monthly and yearly kWh and the
            dollars that follow from them. The rate starts at the residential average for whichever area you pick
            &mdash; {cents(national.priceCents)} per kWh nationally in {dataPeriod} &mdash; and you can overwrite it with
            the rate printed on your own bill. Nothing is sent anywhere.
          </p>
          <div className="eb-meta">
            <span>Rates: EIA Electric Power Monthly, {dataPeriod}</span>
            <span>No account, no storage</span>
            <span>Formula shown below the tool</span>
          </div>
        </header>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Step 1 · pick the price"
            title="Load the residential rate for an area"
            description="Choosing an area fills the rate field with that area's latest EIA residential price. Overwrite it freely — a tiered or time-of-use tariff can be entered as the blended rate you actually pay."
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="area">
                Area
              </label>
              <select id="area" className={fieldClass} value={areaSlug} onChange={(event) => selectArea(event.target.value)}>
                {areaOptions.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="rate">
                Price per kWh (cents)
              </label>
              <input
                id="rate"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                className={fieldClass}
                value={rateInput}
                onChange={(event) => setRateInput(event.target.value)}
              />
            </div>
          </div>

          <NoteBox>
            Using <strong>{area.name}</strong>: residential price {cents(area.priceCents)} per kWh, average household
            use {kwh(area.kwhMonth)} a month, average bill {usd(area.billAug)}.
          </NoteBox>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Step 2a · appliance estimate"
            title="Watts × hours per day × days per month"
            description="This is the path for “what does this one device cost me?”. The wattage is printed on the label or in the manual; hours are what you actually run it, not peak capability."
            aside={
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="border border-[var(--rule)] bg-[var(--paper)] px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-[var(--green-deep)] transition-colors hover:border-[var(--green)] hover:bg-[var(--green-pale)]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            }
          />

          <div className="eb-split">
            <div className="eb-callout">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass} htmlFor="watts">
                    Watts
                  </label>
                  <input
                    id="watts"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="10"
                    className={fieldClass}
                    value={watts}
                    onChange={(event) => setWatts(event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="hours">
                    Hours per day
                  </label>
                  <input
                    id="hours"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="24"
                    step="0.5"
                    className={fieldClass}
                    value={hours}
                    onChange={(event) => setHours(event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="days">
                    Days per month
                  </label>
                  <input
                    id="days"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="31"
                    step="1"
                    className={fieldClass}
                    value={days}
                    onChange={(event) => setDays(event.target.value)}
                  />
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--muted-ink)]">
                {wattsValue.toLocaleString("en-US")} W × {hoursValue} h × {daysValue} days ÷ 1,000 ={" "}
                <strong className="text-[var(--ink)]">{kwh(round2(monthlyKwh))}</strong> per month. Multiply by{" "}
                {cents(safeRate)} per kWh to get the dollars on the right.
              </p>
            </div>
            <div>
              <FigureGrid
                figures={[
                  { label: "Monthly electricity", value: kwh(round2(monthlyKwh)), note: `${daysValue} days of use` },
                  { label: "Monthly cost", value: usd(round2(monthlyCost)), note: `at ${cents(safeRate)}/kWh` },
                  { label: "Yearly electricity", value: kwh(round2(yearlyKwh)), note: "12 months of the same habit" },
                  { label: "Yearly cost", value: usd(round2(yearlyCost)), note: "same rate, same hours" },
                ]}
              />
              <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted-ink)]">
                That is <strong className="text-[var(--ink)]">{usageShare.toFixed(0)}%</strong> of the {area.name}{" "}
                household average of {kwh(area.kwhMonth)} a month. Our other appliances add to the same meter, so the
                single-device figure is a slice of the bill, not a replacement for it.
              </p>
            </div>
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="Step 2b · bill estimate"
            title="Already know the kWh? Price it directly"
            description="Use this when your statement reports usage rather than a device: type the kWh figure and read the cost at the same rate. A 30-day month is not assumed here — the number is the number."
          />
          <div className="eb-split">
            <div className="eb-callout">
              <label className={labelClass} htmlFor="kwh">
                Electricity used (kWh)
              </label>
              <input
                id="kwh"
                type="number"
                inputMode="decimal"
                min="0"
                step="10"
                className={fieldClass}
                value={directKwh}
                onChange={(event) => setDirectKwh(event.target.value)}
              />
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--muted-ink)]">
                {directValue.toLocaleString("en-US")} kWh × {cents(safeRate)} ÷ 100 ={" "}
                <strong className="text-[var(--ink)]">{usd(round2(directCost))}</strong>.
              </p>
            </div>
            <FigureGrid
              figures={[
                { label: "Cost at this rate", value: usd(round2(directCost)), note: `${directValue.toLocaleString("en-US")} kWh` },
                { label: "Same usage, 12 times", value: usd(round2(directCost * 12)), note: "a year at a flat rate" },
                { label: "Effective price", value: cents(safeRate), note: "the rate you entered" },
              ]}
            />
          </div>
        </section>

        <section className="eb-section">
          <SectionHeading
            eyebrow="How the arithmetic works"
            title="Three lines, no hidden assumptions"
          />
          <div className="eb-prose">
            <ul>
              <li>
                <strong>kWh per month</strong> = watts × hours per day × days per month ÷ 1,000.
              </li>
              <li>
                <strong>Cost per month</strong> = kWh × price in cents per kWh ÷ 100.
              </li>
              <li>
                <strong>Cost per year</strong> = cost per month × 12.
              </li>
            </ul>
            <p>
              Two limits are worth stating plainly. First, a single rate is a simplification: many utilities bill in
              tiers, add fixed customer charges, or vary the price by time of day, so the calculator tracks the energy
              portion of a bill rather than the total. Second, nameplate wattage overstates draw for anything with a
              compressor or heating element that cycles — a refrigerator labelled 150 W does not run its compressor
              every hour. Where a device cycles, either lower the hours to an honest average or use a plug-in meter
              reading.
            </p>
          </div>
          <LinkChips
            links={[
              { href: HUB_PATH, label: "All 53 areas ranked" },
              { href: statePath("california"), label: "California bill detail" },
              { href: METHODOLOGY_PATH, label: "Data sources and limits" },
            ]}
          />
        </section>

        <div className="eb-cta">
          <div className="eb-cta-copy">
            <h2>Compare the result with the state table</h2>
            <p>
              The average U.S. household paid {usd(national.billAug)} for {kwh(national.kwhMonth)} in {dataPeriod}. See
              where your state sits, and how much of the gap is price rather than usage.
            </p>
          </div>
          <Link href={HUB_PATH} className="primary-button">
            Open the rankings <ArrowUpRight size={16} />
          </Link>
        </div>
      </BillPage>
    </Layout>
  );
}
