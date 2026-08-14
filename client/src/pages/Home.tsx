/** Style note: Field Notes for Better Work — asymmetric editorial home page with warm paper, Verdigris Ink, and evidence-first reading. */
import { ArrowDown, ArrowUpRight, BookOpenCheck, Braces, CheckCircle2, Compass, FileText, SearchCheck } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import GuideCard from "@/components/GuideCard";
import { SeoMeta } from "@/components/SeoMeta";
import { guides, heroImage } from "@/lib/content";

const focus = [
  { icon: SearchCheck, label: "Research", text: "Keep sources visible while turning notes into a brief." },
  { icon: FileText, label: "Writing", text: "Create clearer drafts with context and constraints." },
  { icon: BookOpenCheck, label: "Meetings", text: "Separate actions, decisions, and questions before they drift." },
  { icon: Compass, label: "Planning", text: "Find the next useful move without building an imaginary backlog." }
];

export default function Home() {
  const [research, update, meeting, contentPlan, promptPattern, startPlan] = guides;
  return <Layout>
    <SeoMeta title="Practical AI workflows, prompts, and review checks" description="Practical AI workflows for research, writing, meeting notes, and project planning. Each guide includes a scoped prompt, clear limits, and human review checks." image={heroImage} schema={({ origin }) => [{ "@type": "WebSite", "@id": `${origin}/#website`, name: "Workflow Library", url: origin, description: "Practical AI workflows, prompts, and review checks for everyday knowledge work." }, { "@type": "Organization", "@id": `${origin}/#organization`, name: "Workflow Library", url: origin, description: "Independent educational publishing project for practical AI workflows." }]} />
    <section className="hero-section">
      <div className="hero-copy"><span className="eyebrow">Practical AI, explained like a field guide</span><h1>Make the work<br /><em>clearer</em> before you<br />make it faster.</h1><p className="hero-dek">Workflow Library is a calm, practical reference for using AI in work that needs context, judgment, and a human final check.</p><div className="hero-actions"><Link href="/guides" className="primary-button">Find a workflow <ArrowUpRight size={17} /></Link><a href="#featured" className="secondary-button">See what is inside <ArrowDown size={16} /></a></div><div className="hero-note"><span className="stamp">Field note</span> No productivity promises. Just usable steps, clear limits, and a place to start.</div></div>
      <div className="hero-visual"><div className="hero-image-frame"><img src={heroImage} alt="A calm desk arranged with research notes, paper, and an understated laptop" fetchPriority="high" decoding="async" /></div><div className="hero-index-card"><span>START HERE</span><strong>Give the task a brief.</strong><p>Context, constraints, output.</p></div><div className="hero-number">01</div></div>
    </section>
    <section className="credibility-strip" aria-label="What each guide contains"><div><span>01</span><p>One real task, not a tool list</p></div><div><span>02</span><p>Copyable starting prompt</p></div><div><span>03</span><p>Human review checks</p></div><div><span>04</span><p>Known limits, plainly stated</p></div></section>
    <section id="featured" className="feature-section"><div className="section-heading split-heading"><div><span className="eyebrow">The reading room</span><h2>Start with the work<br />already on your desk.</h2></div><p>Each guide begins with a task that tends to become vague, repetitive, or slow. The goal is not to let AI do everything. It is to give your attention a better place to land.</p></div><div className="feature-layout"><GuideCard guide={research} featured /><div className="feature-rail"><div className="rail-label">Also useful this week</div><GuideCard guide={update} /><GuideCard guide={meeting} /><Link href="/guides" className="rail-all-link">Open the full library <ArrowUpRight size={17} /></Link></div></div></section>
    <section className="focus-section"><div className="focus-side"><span className="eyebrow">Choose your entry point</span><h2>Four kinds of work.<br />One useful habit.</h2><p>Brief the task before you prompt it. Name what you know, what must be true, and what needs a person to decide.</p><Link href={`/guides/${promptPattern.slug}`} className="text-link large-link">Learn the brief-first pattern <ArrowUpRight size={17} /></Link></div><div className="focus-grid">{focus.map(({ icon: Icon, label, text }, index) => <div className="focus-card" key={label}><span className="focus-number">0{index + 1}</span><Icon size={22} strokeWidth={1.6} /><h3>{label}</h3><p>{text}</p></div>)}</div></section>
    <section className="method-section"><div className="method-mark"><Braces size={42} strokeWidth={1.25} /></div><div><span className="eyebrow">The editorial rule</span><h2>A good AI workflow leaves you with <em>more</em> clarity, not more to verify.</h2></div><div className="method-checks"><p><CheckCircle2 size={17} /> Keep sources and uncertainty visible.</p><p><CheckCircle2 size={17} /> Review commitments, names, numbers, and advice.</p><p><CheckCircle2 size={17} /> Use an output only when you understand it.</p></div></section>
    <section className="latest-section"><div className="section-heading compact-heading"><div><span className="eyebrow">From the library</span><h2>Small systems worth keeping.</h2></div><Link href="/guides" className="text-link">See all guides <ArrowUpRight size={16} /></Link></div><div className="latest-grid"><GuideCard guide={contentPlan} /><GuideCard guide={promptPattern} /><GuideCard guide={startPlan} /></div></section>
    <section className="closing-section"><div className="closing-copy"><span className="eyebrow">A better starting point</span><h2>Copy the workflow,<br />then make it yours.</h2><p>Begin with one task you already need to finish this week. The library will meet you there.</p><Link href="/guides" className="primary-button">Browse the library <ArrowUpRight size={17} /></Link></div><div className="closing-annotation" aria-hidden="true"><span>KEEP</span><span>THE</span><span>HUMAN</span><span>IN THE LOOP</span></div></section>
  </Layout>;
}
