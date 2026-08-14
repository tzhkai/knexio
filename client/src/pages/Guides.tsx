/** Style note: Field Notes for Better Work — library browsing is an editorial index, not a dense SaaS directory. */
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import GuideCard from "@/components/GuideCard";
import { SeoMeta } from "@/components/SeoMeta";
import { categories, guides } from "@/lib/content";

export default function Guides() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All"); const [query, setQuery] = useState("");
  const results = useMemo(() => guides.filter(g => (category === "All" || g.category === category) && (!query.trim() || `${g.title} ${g.dek} ${g.category}`.toLowerCase().includes(query.trim().toLowerCase()))), [category, query]);
  return <Layout><SeoMeta title="AI workflow library" description="Browse practical AI workflows for research, writing, meetings, and planning. Every guide includes a scoped prompt and a human review checklist." />
    <section className="library-hero"><div><span className="eyebrow">The library</span><h1>Useful systems for<br /><em>everyday</em> work.</h1></div><p>Browse a small, focused collection of AI workflows. Each one is built around a task, a bounded prompt, and the checks that keep the result grounded.</p></section>
    <section className="library-controls" aria-label="Guide filters"><div className="category-list" role="group" aria-label="Filter by category"><SlidersHorizontal size={16} />{categories.map(item => <button key={item} type="button" className={category === item ? "category-button active" : "category-button"} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><Search size={17} /><span className="sr-only">Search guides</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a task" /></label></section>
    <section className="library-results"><div className="result-bar"><span>{results.length} guide{results.length === 1 ? "" : "s"}</span><span>Updated with a practical focus</span></div>{results.length ? <div className="guide-grid">{results.map(g => <GuideCard guide={g} key={g.slug} />)}</div> : <div className="empty-library"><p>No guide matches that search yet.</p><button type="button" className="text-link" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}</section>
  </Layout>;
}
