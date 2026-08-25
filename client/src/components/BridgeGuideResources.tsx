import { ArrowUpRight, BookOpenCheck, Braces, FileText } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useCookieConsent } from "@/components/CookieConsent";
import { trackRelatedResourceClick } from "@/lib/optional-analytics";

export const BRIDGE_GUIDE_RESOURCES = [
  { kind: "Tool", slug: "markdown-preview", icon: Braces, title: "Markdown Preview", description: "Inspect headings, source labels, and lists in research notes before carrying them into a planning record.", href: "/tools/markdown-preview/" },
  { kind: "Tool", slug: "ai-prompt-word-counter", icon: Braces, title: "AI Prompt Word Counter", description: "Compare a raw planning prompt with a smaller, reviewable brief before you send it to a model.", href: "/tools/ai-prompt-word-counter/" },
  { kind: "Read", slug: "evidence-matrix-from-source-notes", icon: FileText, title: "Build an evidence matrix from source notes", description: "Make support, limitations, confidence, and verification steps visible before choosing a priority.", href: "/guides/evidence-matrix-from-source-notes/" },
  { kind: "Read", slug: "weekly-priorities-from-project-list", icon: BookOpenCheck, title: "Plan weekly priorities from a crowded project list", description: "Turn a confirmed decision into a modest weekly focus without hiding dependencies or capacity limits.", href: "/guides/weekly-priorities-from-project-list/" },
] as const;

export const BRIDGE_RESOURCE_FILTERS = [
  { value: "all", label: "All resources" },
  { value: "tool", label: "Tools" },
  { value: "read", label: "Reading" },
] as const;

export type BridgeResourceFilter = (typeof BRIDGE_RESOURCE_FILTERS)[number]["value"];
export function filterBridgeGuideResources(filter: BridgeResourceFilter) {
  return filter === "all" ? BRIDGE_GUIDE_RESOURCES : BRIDGE_GUIDE_RESOURCES.filter((resource) => resource.kind.toLowerCase() === filter);
}

const styles = `
  .bridge-guide-resources { margin:34px 0 8px; padding:23px 0 4px; border-top:1px solid var(--ink); }
  .bridge-guide-resources h2 { margin:7px 0 7px; font-family:"DM Serif Display",Georgia,serif; font-size:28px; font-weight:400; letter-spacing:-.035em; line-height:1.08; }.bridge-guide-resources>p { max-width:660px; margin:0; color:#5c635c; font-size:13px; line-height:1.65; }
  .bridge-guide-resource-filters { display:flex; flex-wrap:wrap; gap:7px; margin-top:15px; }.bridge-guide-resource-filter { min-height:31px; padding:0 10px; border:1px solid var(--rule); background:#fffdf8; color:#586258; font-size:10px; font-weight:800; letter-spacing:.02em; transition:border-color 150ms var(--ease-out),background 150ms var(--ease-out),color 150ms var(--ease-out),transform 150ms var(--ease-out); }.bridge-guide-resource-filter:hover { border-color:var(--green); color:var(--green); }.bridge-guide-resource-filter[aria-pressed="true"] { border-color:var(--green); background:var(--green); color:#fffdf8; }.bridge-guide-resource-filter:active { transform:scale(.97); }.bridge-guide-resource-filter:focus-visible { outline:3px solid #b66b4d; outline-offset:3px; }
  .bridge-guide-resource-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin-top:15px; }.bridge-guide-resource { display:block; min-height:100%; padding:15px; border:1px solid var(--rule); color:var(--ink); background:#fffdf8; transition:border-color 160ms var(--ease-out),box-shadow 160ms var(--ease-out),transform 160ms var(--ease-out); }.bridge-guide-resource:hover { border-color:var(--green); box-shadow:0 8px 16px rgba(23,107,91,.08); transform:translateY(-1px); }.bridge-guide-resource:active { transform:scale(.985); }.bridge-guide-resource:focus-visible { outline:3px solid #b66b4d; outline-offset:3px; }.bridge-guide-resource-kind { display:flex; align-items:center; gap:5px; color:var(--green); font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }.bridge-guide-resource strong { display:block; margin-top:8px; font-size:13px; line-height:1.35; }.bridge-guide-resource p { margin:6px 0 0; color:#62685f; font-size:11px; line-height:1.53; }.bridge-guide-resource-action { display:inline-flex; align-items:center; gap:4px; margin-top:10px; color:var(--green); font-size:10px; font-weight:800; }
  @media(max-width:760px) { .bridge-guide-resources { margin-top:28px; }.bridge-guide-resources h2 { font-size:25px; }.bridge-guide-resources>p { font-size:12px; }.bridge-guide-resource-grid { grid-template-columns:1fr; }.bridge-guide-resource { padding:14px; } }
`;

export default function BridgeGuideResources() {
  const { consent } = useCookieConsent();
  const [filter, setFilter] = useState<BridgeResourceFilter>("all");
  const resources = filterBridgeGuideResources(filter);
  return <section className="bridge-guide-resources" id="related-resources" aria-labelledby="related-resources-title"><style>{styles}</style><span className="eyebrow">Tools and follow-up reading</span><h2 id="related-resources-title">Related resources for the next review.</h2><p>Use these only when they clarify the evidence trail, narrow the planning record, or prepare a human decision. None of them confirms a priority for you.</p><div className="bridge-guide-resource-filters" role="group" aria-label="Filter related resources">{BRIDGE_RESOURCE_FILTERS.map(option => <button key={option.value} type="button" className="bridge-guide-resource-filter" aria-pressed={filter === option.value} onClick={() => setFilter(option.value)}>{option.label}</button>)}</div><div className="bridge-guide-resource-grid">{resources.map(resource => { const Icon = resource.icon; return <Link key={resource.href} href={resource.href} className="bridge-guide-resource" onClick={() => trackRelatedResourceClick(Boolean(consent?.analytics), "evidence-to-priority-plan", resource.kind.toLowerCase(), resource.slug)}><span className="bridge-guide-resource-kind"><Icon size={13} aria-hidden="true" /> {resource.kind}</span><strong>{resource.title}</strong><p>{resource.description}</p><span className="bridge-guide-resource-action">Open resource <ArrowUpRight size={13} aria-hidden="true" /></span></Link>; })}</div></section>;
}
