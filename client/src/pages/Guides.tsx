/** Style note: Field Notes for Better Work — library browsing is an editorial index, not a dense SaaS directory. */
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import GuideCard from "@/components/GuideCard";
import { SeoMeta } from "@/components/SeoMeta";
import SiteBreadcrumb, { breadcrumbListSchema } from "@/components/SiteBreadcrumb";
import { categories, guides, topicClusters } from "@/lib/content";
import { Link } from "wouter";

export default function Guides() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All"); const [query, setQuery] = useState("");
  const results = useMemo(() => guides.filter(g => (category === "All" || g.category === category) && (!query.trim() || `${g.title} ${g.dek} ${g.category} ${g.topics.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()))), [category, query]);
  const showShelves = category === "All" && !query.trim();
  return <Layout><SeoMeta title="AI workflow library for research, writing, meetings, and planning" description="Browse practical AI workflows for research briefs, project updates, meeting action lists, content planning, and focused first drafts." schema={({ origin, pageUrl }) => ([{ "@type": "CollectionPage", name: "Workflow Library", url: pageUrl, mainEntity: { "@type": "ItemList", numberOfItems: guides.length, itemListElement: guides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: `${origin}/guides/${guide.slug}` })) } }, breadcrumbListSchema(origin, pageUrl, [{ label: "Home", href: "/" }, { label: "Library" }])])} /><SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Library" }]} />
    <section className="library-hero"><div><span className="eyebrow">The library</span><h1>Useful systems for<br /><em>everyday</em> work.</h1></div><p>Browse a small, focused collection of AI workflows. Each one is built around a task, a bounded prompt, and the checks that keep the result grounded.</p></section>
    <section className="library-controls" aria-label="Guide filters"><div className="category-list" role="group" aria-label="Filter by category"><SlidersHorizontal size={16} />{categories.map(item => <button key={item} type="button" className={category === item ? "category-button active" : "category-button"} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><Search size={17} /><span className="sr-only">Search guides</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a task or workflow" /></label></section>
    <nav className="library-topic-index" aria-label="Browse workflow topics"><span>00 / Shelf index</span><div>{topicClusters.map(topic => <Link href={`/workflows/${topic.slug}`} key={topic.slug}>{topic.number} — {topic.shortTitle}</Link>)}</div></nav>
    <section className="library-results"><div className="result-bar"><span>{results.length} guide{results.length === 1 ? "" : "s"}</span><span>Updated with a practical focus</span></div>{results.length ? (showShelves ? <div className="library-shelves">{topicClusters.map(topic => { const shelfGuides = guides.filter(guide => (topic.guideSlugs as readonly string[]).includes(guide.slug)); return <section className="library-shelf" key={topic.slug}><div className="library-shelf-header"><span className="library-shelf-number">{topic.number}</span><div><h2>{topic.shortTitle}</h2><p>{topic.useWhen}</p></div><Link href={`/workflows/${topic.slug}`}>Open shelf <ArrowUpRight size={13} /></Link></div><div className="guide-grid">{shelfGuides.map(guide => <GuideCard guide={guide} key={guide.slug} />)}</div></section>; })}</div> : <div className="guide-grid">{results.map(g => <GuideCard guide={g} key={g.slug} />)}</div>) : <div className="empty-library"><p>No guide matches that search yet.</p><button type="button" className="text-link" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}</section>
  </Layout>;
}
