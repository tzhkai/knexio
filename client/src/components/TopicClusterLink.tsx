/** Style note: Field Notes for Better Work — the cluster link is a useful editorial signpost, not a promotional widget. */
import { ArrowUpRight, Map } from "lucide-react";
import { Link } from "wouter";
import type { Guide } from "@/lib/content";

const topicByCategory = {
  Research: { href: "/workflows/research-and-decisions", label: "Research & decisions" },
  Writing: { href: "/workflows/writing-and-updates", label: "Writing & updates" },
  Meetings: { href: "/workflows/meetings-and-follow-up", label: "Meetings & follow-up" },
  Planning: { href: "/workflows/planning-and-priorities", label: "Planning & priorities" },
} as const;

const topicLinkStyles = `
  .topic-cluster-link { display:grid; grid-template-columns:44px minmax(0,1fr) auto; gap:17px; align-items:center; margin-top:28px; padding:19px 0; border-top:1px solid var(--ink); border-bottom:1px solid var(--rule); } .topic-cluster-mark { display:grid; width:38px; height:38px; place-items:center; color:var(--green); border:1px solid var(--green); background:var(--green-pale); } .topic-cluster-copy .eyebrow { color:var(--green); } .topic-cluster-copy p { margin:5px 0 0; color:#60625a; font-size:12px; line-height:1.58; } .topic-cluster-link a { display:inline-flex; align-items:center; gap:6px; color:var(--green); font-size:10px; font-weight:800; letter-spacing:.02em; white-space:nowrap; } .topic-cluster-link a:hover { color:var(--green-deep); } @media (max-width:620px) { .topic-cluster-link { grid-template-columns:38px minmax(0,1fr); gap:12px; padding:17px 0; } .topic-cluster-mark { width:33px; height:33px; } .topic-cluster-link a { grid-column:2; padding-top:2px; white-space:normal; } }
`;

export default function TopicClusterLink({ guide }: { guide: Guide }) {
  const topic = topicByCategory[guide.category as keyof typeof topicByCategory];
  if (!topic) return null;
  return <aside className="topic-cluster-link" aria-label={`Explore ${topic.label}`}><style>{topicLinkStyles}</style><div className="topic-cluster-mark" aria-hidden="true"><Map size={17} /></div><div className="topic-cluster-copy"><span className="eyebrow">Explore the connected workflow map</span><p>See the practical guides and next reading paths collected under {topic.label}.</p></div><Link href={topic.href}>Open the {topic.label} hub <ArrowUpRight size={14} /></Link></aside>;
}
