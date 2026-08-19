/** Editorial subpage: distinguish the source record from the decision-ready brief. */
import { ArrowLeft, ArrowUpRight, CheckCircle2, FileText, GitCompareArrows, Lightbulb, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
import SiteBreadcrumb, { breadcrumbListSchema } from "@/components/SiteBreadcrumb";
import ShareArticle from "@/components/ShareArticle";
import CoreWorkflowLinks from "@/components/CoreWorkflowLinks";

const pageUrl = "/workflows/meetings/meeting-minutes-vs-decision-brief/";

const comparisonRows = [
  ["Primary purpose", "Preserve what happened", "Help someone understand and act on a decision"],
  ["Best source", "Transcript, notes, agenda, and attendance", "Verified notes plus the evidence relevant to the decision"],
  ["Typical reader", "Participants, record keepers, and people checking the history", "Decision makers, owners, and people joining the work later"],
  ["Level of detail", "Chronological and relatively complete", "Selective, structured, and focused on the decision boundary"],
  ["Uncertainty", "Records discussion and open questions", "Must label what is confirmed, inferred, proposed, or still unconfirmed"],
];

const prompt = `You are helping convert a meeting record into a decision brief.\n\nUse only the supplied notes. Separate:\n1. confirmed decisions\n2. evidence or reasons discussed\n3. options considered\n4. proposed but unconfirmed ideas\n5. owners and deadlines explicitly stated\n6. open questions that require human confirmation\n\nFirst explain what belongs in the decision brief and what should remain in the source record. Do not invent agreement, owners, dates, or certainty. If the notes do not support a claim, write: Not confirmed in supplied notes.`;

const styles = `
  .comparison-page { max-width:1180px; margin:0 auto; padding:26px 34px 80px; }
  .comparison-hero { max-width:800px; padding:64px 0 34px; }
  .comparison-hero h1 { max-width:780px; margin:10px 0 18px; font-family:"DM Serif Display",Georgia,serif; font-size:clamp(44px,6vw,78px); font-weight:400; letter-spacing:-.055em; line-height:.98; }
  .comparison-hero p { max-width:680px; color:#5c625c; font-size:17px; line-height:1.65; }
  .comparison-meta { display:flex; flex-wrap:wrap; gap:9px 20px; margin-top:22px; color:var(--green); font-size:10px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
  .comparison-grid { display:grid; grid-template-columns:minmax(0,1fr) 285px; gap:62px; align-items:start; }
  .comparison-main { min-width:0; }
  .comparison-section { scroll-margin-top:96px; margin-top:52px; }
  .comparison-section h2 { margin:0 0 12px; font-family:"DM Serif Display",Georgia,serif; font-size:36px; font-weight:400; letter-spacing:-.04em; line-height:1.05; }
  .comparison-section h3 { margin:25px 0 7px; font-family:"DM Serif Display",Georgia,serif; font-size:24px; font-weight:400; }
  .comparison-section p { max-width:720px; color:#565850; font-size:14px; line-height:1.78; }
  .comparison-table { width:100%; border-collapse:collapse; margin-top:22px; font-size:12px; }
  .comparison-table th,.comparison-table td { padding:14px 13px; border:1px solid var(--rule); text-align:left; vertical-align:top; line-height:1.55; }
  .comparison-table th { background:var(--green-pale); color:var(--green); font-size:10px; letter-spacing:.08em; text-transform:uppercase; }
  .comparison-table td:first-child { width:24%; color:var(--ink); font-weight:800; }
  .comparison-callout { margin-top:25px; padding:22px; border-left:3px solid var(--rust); background:#f4eee7; color:#4f514b; font-size:14px; line-height:1.7; }
  .comparison-prompt { overflow:auto; margin-top:20px; padding:22px; background:var(--green); color:#eef3e8; font:12px/1.7 ui-monospace,SFMono-Regular,Menlo,monospace; white-space:pre-wrap; }
  .comparison-checks { display:grid; gap:9px; margin:20px 0 0; padding:0; list-style:none; }
  .comparison-checks li { display:flex; gap:9px; color:#565850; font-size:13px; line-height:1.55; }
  .comparison-checks svg { flex:0 0 auto; margin-top:2px; color:var(--green); }
  .comparison-rail { position:sticky; top:92px; padding-top:52px; }
  .comparison-rail-card { border-top:1px solid var(--ink); padding-top:15px; }
  .comparison-rail-card h2 { margin:0 0 12px; color:var(--green); font-size:10px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
  .comparison-rail-card a { display:block; padding:10px 0; border-bottom:1px solid var(--rule); color:#5c625c; font-size:12px; font-weight:800; line-height:1.4; }
  .comparison-rail-card a:hover { color:var(--green); }
  .comparison-next { display:flex; flex-wrap:wrap; gap:15px; margin-top:52px; padding-top:20px; border-top:1px solid var(--ink); }
  .comparison-next a { display:inline-flex; align-items:center; gap:7px; color:var(--green); font-size:12px; font-weight:800; }
  @media (max-width:900px) { .comparison-page { padding:18px 20px 60px; } .comparison-hero { padding:44px 0 20px; } .comparison-hero h1 { font-size:48px; } .comparison-hero p { font-size:15px; } .comparison-grid { display:block; } .comparison-rail { position:static; padding:0; margin-top:28px; } .comparison-rail-card { padding-top:14px; } .comparison-section { margin-top:38px; } .comparison-section h2 { font-size:31px; } .comparison-table { display:block; overflow-x:auto; white-space:normal; } .comparison-table th,.comparison-table td { min-width:160px; } }
  @media (max-width:560px) { .comparison-page { padding-inline:16px; } .comparison-hero h1 { font-size:42px; } .comparison-table { font-size:11px; } .comparison-table th,.comparison-table td { min-width:145px; padding:11px 9px; } }
`;

export default function MeetingMinutesVsDecisionBrief() {
  return <Layout>
    <SeoMeta
      title="Meeting Minutes vs Decision Brief: What to Keep and What to Change"
      description="Learn the practical difference between meeting minutes and a decision brief, when to use each, and how to transform notes without inventing agreement."
      type="article"
      section="Meetings"
      tags={["meeting minutes vs decision brief", "decision brief", "meeting notes", "AI meeting workflow"]}
      schema={({ origin, pageUrl: canonicalUrl }) => ([
        { "@type": "Article", headline: "Meeting Minutes vs Decision Brief: What to Keep and What to Change", description: "A practical comparison of meeting minutes and decision briefs.", author: { "@type": "Organization", name: "Knexio", url: `${origin}/about`, email: "tzhkai6@gmail.com" }, publisher: { "@type": "Organization", name: "Knexio", url: origin, email: "tzhkai6@gmail.com" }, mainEntityOfPage: { "@id": canonicalUrl }, articleSection: "Meetings", keywords: "meeting minutes vs decision brief, decision brief, meeting notes" },
        breadcrumbListSchema(origin, canonicalUrl, [{ label: "Home", href: "/" }, { label: "Meetings", href: "/workflows/meetings-and-follow-up/" }, { label: "Meeting minutes vs decision brief" }]),
      ])}
    />
    <style>{styles}</style>
    <main className="comparison-page">
      <SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Meetings", href: "/workflows/meetings-and-follow-up/" }, { label: "Meeting minutes vs decision brief" }]} />
      <header className="comparison-hero">
        <span className="eyebrow">Meetings / practical comparison</span>
        <h1>Meeting minutes and decision briefs solve different problems.</h1>
        <p>Minutes preserve the source record. A decision brief makes the relevant context usable for a decision, an owner, or the next person joining the work. Keeping those roles separate reduces accidental overstatement.</p>
        <div className="comparison-meta"><span><FileText size={14} /> Source record</span><span><GitCompareArrows size={14} /> Decision-ready summary</span><span><ShieldCheck size={14} /> Human verification</span></div>
      </header>
      <ShareArticle title="Meeting Minutes vs Decision Brief: What to Keep and What to Change" description="A practical comparison of meeting minutes and decision briefs." path={pageUrl} />
      <div className="comparison-grid">
        <div className="comparison-main">
          <section className="comparison-section" id="the-short-answer"><span className="eyebrow">The short answer</span><h2>Keep the minutes as the record; use the brief as the decision surface.</h2><p>Do not rewrite the source record until it sounds decisive. Instead, create a second artifact that names the decision question, selects the relevant evidence, states what is confirmed, and makes gaps visible.</p><div className="comparison-callout"><strong>Rule of thumb:</strong> if a reader needs to reconstruct what happened, link to the minutes. If a reader needs to understand what needs deciding or doing next, link to the decision brief.</div></section>
          <section className="comparison-section" id="side-by-side"><span className="eyebrow">Side by side</span><h2>What changes when the purpose changes?</h2><table className="comparison-table"><thead><tr><th>Dimension</th><th>Meeting minutes</th><th>Decision brief</th></tr></thead><tbody>{comparisonRows.map(([dimension, minutes, brief]) => <tr key={dimension}><td>{dimension}</td><td>{minutes}</td><td>{brief}</td></tr>)}</tbody></table></section>
          <section className="comparison-section" id="when-to-use-each"><span className="eyebrow">Choose the artifact</span><h2>Use minutes for traceability and briefs for movement.</h2><h3>Choose meeting minutes when the record itself matters.</h3><p>Use minutes when participants may need to check the sequence of discussion, who attended, what was raised, or how an unresolved question entered the record.</p><h3>Choose a decision brief when the reader needs a bounded next step.</h3><p>Use a decision brief when the relevant evidence can be separated from the full conversation and the reader needs options, a decision boundary, owners, or questions to resolve.</p></section>
          <section className="comparison-section" id="safe-ai-workflow"><span className="eyebrow">A safe AI workflow</span><h2>Ask AI to separate, not smooth over, uncertainty.</h2><p>Give the model the notes and define the boundary between confirmed agreement and interpretation. The output should be a draft that makes verification easier, never a replacement for the source record.</p><pre className="comparison-prompt">{prompt}</pre></section>
          <section className="comparison-section" id="final-check"><span className="eyebrow">Before sharing</span><h2>Run a five-minute human check.</h2><ul className="comparison-checks"><li><CheckCircle2 size={16} /> Confirm that every decision is explicitly supported by the notes.</li><li><CheckCircle2 size={16} /> Check names, owners, dates, numbers, and deadlines against the source record.</li><li><CheckCircle2 size={16} /> Mark proposals and inferences as unconfirmed instead of upgrading their certainty.</li><li><CheckCircle2 size={16} /> Link the brief to the original minutes so readers can inspect the evidence.</li><li><CheckCircle2 size={16} /> Ask the responsible participant to approve consequential wording before distribution.</li></ul></section>
          <nav className="comparison-next" aria-label="Related Meetings reading"><Link href="/guides/meeting-notes-to-decision-brief/"><ArrowLeft size={15} /> Read the Meetings decision brief guide</Link><Link href="/workflows/meetings-and-follow-up/">Explore the Meetings topic <ArrowUpRight size={15} /></Link></nav>
        </div>
        <aside className="comparison-rail"><div className="comparison-rail-card"><h2>On this page</h2><a href="#the-short-answer">The short answer</a><a href="#side-by-side">Side by side</a><a href="#when-to-use-each">When to use each</a><a href="#safe-ai-workflow">A safe AI workflow</a><a href="#final-check">Final check</a></div><div className="comparison-rail-card" style={{ marginTop: 28 }}><h2>Continue with</h2><Link href="/guides/meeting-notes-to-decision-brief/">Turn meeting notes into a decision brief <ArrowUpRight size={14} /></Link><Link href="/guides/evidence-matrix-from-source-notes/">Build an evidence matrix from source notes <ArrowUpRight size={14} /></Link></div></aside>
      </div>
      <CoreWorkflowLinks guide={{ category: "Meetings", slug: "meeting-notes-to-decision-brief" } as any} />
    </main>
  </Layout>;
}
