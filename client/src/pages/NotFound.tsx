/** 404: keep the reader inside the electricity reference rather than dead-ending. */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
import { HUB_PATH, CALCULATOR_PATH, METHODOLOGY_PATH } from "@/data/electricityRoutes";
import { dataPeriod } from "@/data/electricityInsights";

const recovery = [
  { href: HUB_PATH, label: "All states ranked", detail: `Every area, ${dataPeriod}` },
  { href: CALCULATOR_PATH, label: "Electricity cost calculator", detail: "Watts, hours, kWh and rate" },
  { href: METHODOLOGY_PATH, label: "Methodology", detail: "Sources and formulas" },
];

export default function NotFound() {
  return (
    <Layout>
      <SeoMeta
        title="Page not found"
        description="This address is not part of the Knexio electricity reference."
        noIndex
        schema={({ origin, pageUrl }) => [
          { "@type": "WebPage", "@id": `${pageUrl}#not-found`, name: "Page not found", url: pageUrl, isPartOf: { "@type": "WebSite", name: "Knexio", url: origin } },
        ]}
      />
      <section className="not-found-wrap">
        <span className="eyebrow">404</span>
        <h1>No table at that address.</h1>
        <p>The page may have moved, or the link may be incomplete. The electricity reference starts here:</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {recovery.map((item) => (
            <Link key={item.href} href={item.href} className="block border border-[rgba(32,33,30,.16)] bg-[rgba(255,255,255,.55)] px-5 py-4 text-left transition-colors hover:border-[var(--green)]">
              <span className="block text-[13px] font-extrabold text-[var(--green)]">{item.label}</span>
              <span className="mt-1 block text-[12px] text-[var(--muted-ink)]">{item.detail}</span>
            </Link>
          ))}
        </div>
        <Link href="/" className="primary-button mt-6">Return home</Link>
      </section>
    </Layout>
  );
}
