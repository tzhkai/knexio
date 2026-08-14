/** Style note: Field Notes for Better Work — cards read like clipped field notes: exact metadata and one explicit next action. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { Guide } from "@/lib/content";
const boundaries: Record<Guide["category"], string> = {
  Research: "Use when sources are ready to inspect.",
  Writing: "Use when you can name the reader and goal.",
  Meetings: "Not for replacing participant confirmation.",
  Planning: "Use when the next decision still needs a human owner."
};
export default function GuideCard({ guide, featured = false }: { guide: Guide; featured?: boolean }) {
  return <article className={featured ? "guide-card guide-card-featured" : "guide-card"}>
    {guide.image && <div className="guide-image-wrap"><img className="guide-image" src={guide.image} alt={guide.imageAlt || ""} /></div>}
    <div className="guide-card-main"><div className="guide-card-meta"><span>{guide.category}</span><span className="meta-dot">•</span><span>{guide.readingTime}</span></div><div className="guide-card-trust"><span>Reviewed guide</span><span>Updated {guide.updated}</span></div><h3><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.dek}</p><p className="guide-boundary"><strong>Boundary</strong>{boundaries[guide.category]}</p><div className="guide-card-foot"><span className="field-tag">{guide.level}</span><Link href={`/guides/${guide.slug}`} className="text-link">Read the workflow <ArrowUpRight size={15} /></Link></div></div>
  </article>;
}
