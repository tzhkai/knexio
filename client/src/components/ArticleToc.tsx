/** Style note: Field Notes for Better Work — the table of contents is an index card for real sections, not decoration. */
import { ChevronDown, ListTree } from "lucide-react";

export type ArticleTocItem = { id: string; label: string; number: string };

const tocStyles = `
  .article-toc { border-top:1px solid var(--rule); } .article-toc-heading { display:flex; align-items:center; gap:7px; color:var(--green); font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; } .article-toc-list { display:grid; gap:0; margin:10px 0 0; padding:0; list-style:none; } .article-toc-list a { display:grid; grid-template-columns:23px minmax(0,1fr); gap:5px; padding:7px 0; border-bottom:1px solid var(--rule); color:#5c625c; font-size:10px; font-weight:700; line-height:1.35; transition:color 160ms var(--ease-out),padding-left 160ms var(--ease-out); } .article-toc-list a:hover { padding-left:3px; color:var(--green); } .article-toc-list span { color:var(--rust); font-family:"DM Serif Display",Georgia,serif; font-size:13px; letter-spacing:-.04em; line-height:.9; } .article-toc-desktop { margin-top:26px; padding-top:15px; } .article-toc-mobile { display:none; } .article-toc-mobile summary { display:flex; align-items:center; justify-content:space-between; gap:12px; cursor:pointer; list-style:none; } .article-toc-mobile summary::-webkit-details-marker { display:none; } .article-toc-mobile summary svg:last-child { transition:transform 160ms var(--ease-out); } .article-toc-mobile[open] summary svg:last-child { transform:rotate(180deg); } @media (max-width:900px) { .article-toc-desktop { display:none; } .article-toc-mobile { display:block; margin:18px 0 23px; padding:14px 0 0; border-bottom:1px solid var(--rule); } .article-toc-mobile .article-toc-list { margin-top:11px; } .article-toc-mobile .article-toc-list a { padding:9px 0; font-size:11px; } }
`;

export default function ArticleToc({ items, mobile = false }: { items: ArticleTocItem[]; mobile?: boolean }) {
  const className = mobile ? "article-toc article-toc-mobile" : "article-toc article-toc-desktop";
  const list = <ol className="article-toc-list">{items.map(item => <li key={item.id}><a href={`#${item.id}`}><span>{item.number}</span>{item.label}</a></li>)}</ol>;
  if (mobile) return <details className={className}><style>{tocStyles}</style><summary className="article-toc-heading"><span><ListTree size={14} /> On this page</span><ChevronDown size={15} /></summary>{list}</details>;
  return <nav className={className} aria-label="On this page"><style>{tocStyles}</style><div className="article-toc-heading"><ListTree size={14} /> On this page</div>{list}</nav>;
}
