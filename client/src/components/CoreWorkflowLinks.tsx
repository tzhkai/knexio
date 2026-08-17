import { ArrowUpRight, Compass } from "lucide-react";
import { Link } from "wouter";
import type { Guide } from "@/lib/content";

const coreByCategory = {
  Research: "evidence-matrix-from-source-notes",
  Writing: "clear-project-update-prompt",
  Planning: "one-week-content-plan-from-questions",
} as const;

const coreLabels = {
  Research: "Evidence check before a decision",
  Writing: "Clear project update",
  Planning: "One-week plan from real questions",
} as const;

const coreDescriptions = {
  Research: "Turn source notes into a reviewable matrix with visible support, gaps, and next checks.",
  Writing: "Turn rough progress notes into a reader-ready update without inflating status or commitments.",
  Planning: "Build a modest publishing plan from real audience questions and available capacity.",
} as const;

const styles = `
  .core-workflow-links { margin-top: 42px; padding: 20px 0 0; border-top: 1px solid var(--rule); }
  .core-workflow-links-heading { display: flex; align-items: baseline; gap: 9px; color: var(--green); font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
  .core-workflow-links-heading svg { flex: 0 0 auto; }
  .core-workflow-links a { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 16px; align-items: center; margin-top: 12px; padding: 15px 16px; border: 1px solid var(--rule); color: var(--ink); transition: background 160ms var(--ease-out), border-color 160ms var(--ease-out), transform 160ms var(--ease-out); }
  .core-workflow-links a:hover { border-color: var(--green); background: var(--green-pale); transform: translateY(-1px); }
  .core-workflow-links strong { display: block; font-family: "DM Serif Display", Georgia, serif; font-size: 22px; font-weight: 400; letter-spacing: -.03em; line-height: 1.05; }
  .core-workflow-links p { max-width: 590px; margin: 5px 0 0; color: #62645c; font-size: 12px; line-height: 1.55; }
  .core-workflow-links .core-arrow { color: var(--green); }
  @media (max-width: 760px) { .core-workflow-links { margin-top: 32px; padding-top: 16px; } .core-workflow-links a { padding: 13px; } .core-workflow-links strong { font-size: 20px; } }
`;

function CoreWorkflowLinks({ guide }: { guide: Guide }) {
  const slug = coreByCategory[guide.category as keyof typeof coreByCategory];
  if (!slug || slug === guide.slug) return null;
  return <section className="core-workflow-links" aria-labelledby="core-workflow-links-title">
    <style>{styles}</style>
    <div id="core-workflow-links-title" className="core-workflow-links-heading"><Compass size={14} /> Related core workflow</div>
    <Link href={`/guides/${slug}`}>
      <span><strong>{coreLabels[guide.category as keyof typeof coreLabels]}</strong><p>{coreDescriptions[guide.category as keyof typeof coreDescriptions]}</p></span>
      <ArrowUpRight className="core-arrow" size={18} aria-hidden="true" />
    </Link>
  </section>;
}

export { coreByCategory };
export default CoreWorkflowLinks;
