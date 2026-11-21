/**
 * Shared presentation pieces for the electricity pages: one stylesheet, the
 * figure grid, the sortable ranking table, and the link rails. Kept in one file
 * so all 379 electricity URLs stay visually identical to the rest of the site.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export const billStyles = `
  .eb-page { width:min(1180px,calc(100% - 48px)); margin:auto; padding:92px 0 118px; }
  .eb-hero { max-width:900px; }
  .eb-hero h1 { margin:16px 0 20px; font-family:"DM Serif Display",Georgia,serif; font-size:clamp(38px,4.5vw,64px); font-weight:400; letter-spacing:-.055em; line-height:1; }
  .eb-hero h1 em { font-style:italic; color:var(--green); }
  .eb-lede { max-width:68ch; color:#54564e; font-size:17px; line-height:1.62; }
  .eb-meta { display:flex; flex-wrap:wrap; gap:8px 18px; margin-top:22px; color:var(--muted-ink); font-size:10px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
  .eb-meta span { display:inline-flex; align-items:center; gap:8px; }
  .eb-meta span+span::before { content:""; width:1px; height:9px; background:var(--rule); }
  .eb-figures { display:grid; grid-template-columns:repeat(auto-fit,minmax(158px,1fr)); gap:1px; margin:32px 0 0; border:1px solid var(--rule); background:var(--rule); }
  .eb-figure { padding:16px 16px 14px; background:var(--paper); }
  .eb-figure-label { display:block; color:var(--green); font-size:9px; font-weight:800; letter-spacing:.11em; line-height:1.3; text-transform:uppercase; }
  .eb-figure-value { display:block; margin-top:7px; font-family:"DM Serif Display",Georgia,serif; font-size:30px; font-weight:400; letter-spacing:-.045em; line-height:1; font-variant-numeric:tabular-nums; }
  .eb-figure-note { display:block; margin-top:6px; color:var(--muted-ink); font-size:11px; line-height:1.4; }
  .eb-section { margin-top:66px; }
  .eb-section-head { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:18px; padding-bottom:12px; border-bottom:1px solid var(--ink); }
  .eb-section-head h2 { margin:6px 0 0; font-family:"DM Serif Display",Georgia,serif; font-size:clamp(25px,2.6vw,35px); font-weight:400; letter-spacing:-.035em; line-height:1.05; }
  .eb-section-head p { max-width:52ch; margin:0; color:var(--muted-ink); font-size:13px; line-height:1.55; }
  .eb-prose { max-width:72ch; margin-top:18px; font-size:15px; line-height:1.72; color:#3c3e37; }
  .eb-prose p { margin:0 0 14px; }
  .eb-prose strong { color:var(--ink); font-weight:800; font-variant-numeric:tabular-nums; }
  .eb-prose ul { margin:0 0 14px; padding-left:18px; }
  .eb-prose li { margin-bottom:7px; }
  .eb-table-wrap { margin-top:20px; overflow-x:auto; border:1px solid var(--rule); background:var(--paper); }
  table.eb-table { width:100%; border-collapse:collapse; font-size:13px; font-variant-numeric:tabular-nums; }
  .eb-table th, .eb-table td { padding:9px 12px; border-bottom:1px solid var(--rule); text-align:right; white-space:nowrap; }
  .eb-table thead th { position:sticky; top:0; background:var(--paper-deep); color:var(--green-deep); font-size:9px; font-weight:800; letter-spacing:.09em; text-transform:uppercase; }
  .eb-table th:first-child, .eb-table td:first-child { text-align:left; }
  .eb-table th:last-child, .eb-table td:last-child { padding-right:14px; }
  .eb-table tbody tr:last-child td { border-bottom:0; }
  .eb-table tbody tr:hover { background:rgba(23,107,91,.05); }
  .eb-table .eb-rank { width:44px; color:var(--muted-ink); font-size:11px; font-weight:800; }
  .eb-table .eb-area a { color:var(--ink); font-weight:700; border-bottom:1px solid rgba(23,107,91,.25); }
  .eb-table .eb-area a:hover { color:var(--green); }
  .eb-table .eb-tag { margin-left:6px; color:var(--rust); font-size:8px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
  .eb-sort { background:none; padding:0; color:inherit; cursor:pointer; font:inherit; letter-spacing:inherit; text-transform:inherit; }
  .eb-sort:hover { color:var(--green); }
  .eb-sort[data-active="true"] { color:var(--green); text-decoration:underline; text-underline-offset:3px; }
  .eb-up { color:var(--rust); }
  .eb-down { color:var(--green); }
  .eb-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(214px,1fr)); gap:1px; margin-top:20px; border:1px solid var(--rule); background:var(--rule); }
  .eb-card { display:flex; flex-direction:column; gap:4px; padding:16px; background:var(--paper); transition:background 160ms var(--ease-out); }
  .eb-card:hover { background:var(--green-pale); }
  .eb-card-label { color:var(--green); font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
  .eb-card-value { font-family:"DM Serif Display",Georgia,serif; font-size:27px; letter-spacing:-.04em; line-height:1; font-variant-numeric:tabular-nums; }
  .eb-card-note { color:var(--muted-ink); font-size:11px; line-height:1.45; }
  .eb-note { margin-top:22px; padding:14px 18px; border-left:2px solid var(--green); background:rgba(23,107,91,.045); color:#43453e; font-size:13px; line-height:1.62; }
  .eb-note strong { color:var(--green-deep); }
  .eb-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; padding:0; list-style:none; }
  .eb-chips a { display:inline-flex; align-items:center; gap:5px; padding:7px 11px; border:1px solid var(--rule); background:var(--paper); color:var(--green-deep); font-size:12px; font-weight:700; transition:border-color 160ms var(--ease-out),background 160ms var(--ease-out); }
  .eb-chips a:hover { border-color:var(--green); background:var(--green-pale); }
  .eb-duo { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:32px; margin-top:20px; }
  .eb-split { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,0.85fr); gap:38px; align-items:start; margin-top:20px; }
  .eb-callout { padding:20px; border:1px solid var(--rule); background:var(--paper); }
  .eb-callout h3 { margin:0 0 8px; font-family:"DM Serif Display",Georgia,serif; font-size:20px; font-weight:400; letter-spacing:-.025em; }
  .eb-callout p { margin:0; color:#4d4f47; font-size:13px; line-height:1.6; }
  .eb-cta { display:flex; flex-wrap:wrap; align-items:center; gap:14px 22px; margin-top:44px; padding:24px; border:1px solid var(--ink); background:var(--paper); }
  .eb-cta-copy { flex:1 1 320px; }
  .eb-cta h2 { margin:0 0 6px; font-family:"DM Serif Display",Georgia,serif; font-size:24px; font-weight:400; letter-spacing:-.03em; }
  .eb-cta p { margin:0; color:var(--muted-ink); font-size:13px; line-height:1.55; }
  @media (max-width:860px) { .eb-split { grid-template-columns:1fr; gap:26px; } }
  @media (max-width:640px) {
    .eb-page { width:calc(100% - 32px); padding:64px 0 88px; }
    .eb-hero h1 { font-size:clamp(32px,9vw,42px); }
    .eb-lede { font-size:15px; }
    .eb-figure-value { font-size:25px; }
    .eb-table th, .eb-table td { padding:8px 9px; font-size:12px; }
    .eb-section { margin-top:48px; }
  }
`;

export function BillPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="eb-page">
      <style>{billStyles}</style>
      {children}
    </div>
  );
}

export type Figure = { label: string; value: string; note?: string };

export function FigureGrid({ figures }: { figures: Figure[] }) {
  return (
    <div className="eb-figures">
      {figures.map((figure) => (
        <div className="eb-figure" key={figure.label}>
          <span className="eb-figure-label">{figure.label}</span>
          <strong className="eb-figure-value">{figure.value}</strong>
          {figure.note ? <span className="eb-figure-note">{figure.note}</span> : null}
        </div>
      ))}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="eb-section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description ? <p style={{ marginTop: 10 }}>{description}</p> : null}
      </div>
      {aside}
    </div>
  );
}

export function NoteBox({ children }: { children: React.ReactNode }) {
  return <div className="eb-note">{children}</div>;
}

export function LinkChips({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="eb-chips">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>
            {link.label}
            <ArrowUpRight size={12} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export type RankRow = {
  key: string;
  href: string;
  label: string;
  tag?: string;
  /** Display cells after the area name; one per sortable column. */
  cells: string[];
  /** Numeric values used for sorting, aligned with `cells`. */
  sort: (number | null)[];
};

export function RankTable({
  ariaLabel,
  columns,
  rows,
  initialSort = 0,
}: {
  ariaLabel: string;
  columns: { label: string }[];
  rows: RankRow[];
  initialSort?: number;
}) {
  const [sortIndex, setSortIndex] = useState(initialSort);
  const [descending, setDescending] = useState(true);

  const ordered = useMemo(() => {
    const copy = [...rows];
    copy.sort((left, right) => {
      const a = left.sort[sortIndex] ?? Number.NEGATIVE_INFINITY;
      const b = right.sort[sortIndex] ?? Number.NEGATIVE_INFINITY;
      return descending ? b - a : a - b;
    });
    return copy;
  }, [rows, sortIndex, descending]);

  const toggle = (index: number) => {
    if (index === sortIndex) {
      setDescending((value) => !value);
      return;
    }
    setSortIndex(index);
    setDescending(true);
  };

  return (
    <div className="eb-table-wrap">
      <table className="eb-table" aria-label={ariaLabel}>
        <thead>
          <tr>
            <th scope="col" className="eb-rank">#</th>
            <th scope="col">Area</th>
            {columns.map((column, index) => (
              <th scope="col" key={column.label}>
                <button
                  type="button"
                  className="eb-sort"
                  data-active={sortIndex === index}
                  onClick={() => toggle(index)}
                  aria-label={`Sort by ${column.label}${sortIndex === index ? (descending ? ", currently descending" : ", currently ascending") : ""}`}
                >
                  {column.label}
                  {sortIndex === index ? (descending ? " ↓" : " ↑") : ""}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ordered.map((row, index) => (
            <tr key={row.key}>
              <td className="eb-rank">{index + 1}</td>
              <td className="eb-area">
                <Link href={row.href}>{row.label}</Link>
                {row.tag ? <span className="eb-tag">{row.tag}</span> : null}
              </td>
              {row.cells.map((cell, cellIndex) => (
                <td key={`${row.key}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
