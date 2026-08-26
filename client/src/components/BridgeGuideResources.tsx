import { ArrowUpRight, BookOpenCheck, Braces, FileText, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useCookieConsent } from "@/components/CookieConsent";
import { trackRelatedResourceClick } from "@/lib/optional-analytics";

export const BRIDGE_GUIDE_RESOURCES = [
  { kind: "Tool", slug: "markdown-preview", icon: Braces, title: "Markdown Preview", description: "Inspect headings, source labels, and lists in research notes before carrying them into a planning record.", href: "/tools/markdown-preview/" },
  { kind: "Tool", slug: "ai-prompt-word-counter", icon: Braces, title: "AI Prompt Word Counter", description: "Compare a raw planning prompt with a smaller, reviewable brief before you send it to a model.", href: "/tools/ai-prompt-word-counter/" },
  { kind: "Read", slug: "evidence-matrix-from-source-notes", icon: FileText, title: "Build an evidence matrix from source notes", description: "Make support, limitations, confidence, and verification steps visible before choosing a priority.", href: "/guides/evidence-matrix-from-source-notes/" },
  { kind: "Read", slug: "weekly-priorities-from-project-list", icon: BookOpenCheck, title: "Plan weekly priorities from a crowded project list", description: "Turn a confirmed decision into a modest weekly focus without hiding dependencies or capacity limits.", href: "/guides/weekly-priorities-from-project-list/" },
] as const;

export const BRIDGE_RESOURCE_FILTERS = [{ value: "all", label: "All resources" }, { value: "tool", label: "Tools" }, { value: "read", label: "Reading" }] as const;
export const BRIDGE_GUIDE_EMPTY_STATE_RESOURCES = [BRIDGE_GUIDE_RESOURCES[0], BRIDGE_GUIDE_RESOURCES[2]] as const;
export type BridgeResourceFilter = (typeof BRIDGE_RESOURCE_FILTERS)[number]["value"];
export const BRIDGE_RESOURCE_TITLE_ONLY_STORAGE_KEY = "knexio.bridge-guide.title-only.v1";

export function readTitleOnlyPreference(storage: Pick<Storage, "getItem"> | null | undefined) {
  try { return storage?.getItem(BRIDGE_RESOURCE_TITLE_ONLY_STORAGE_KEY) === "true"; } catch { return false; }
}

export function writeTitleOnlyPreference(storage: Pick<Storage, "setItem"> | null | undefined, value: boolean) {
  try { if (!storage) return false; storage.setItem(BRIDGE_RESOURCE_TITLE_ONLY_STORAGE_KEY, String(value)); return true; } catch { return false; }
}

export function filterBridgeGuideResources(filter: BridgeResourceFilter) {
  return filter === "all" ? BRIDGE_GUIDE_RESOURCES : BRIDGE_GUIDE_RESOURCES.filter((resource) => resource.kind.toLowerCase() === filter);
}

export function searchBridgeGuideResources(filter: BridgeResourceFilter, query: string, titleOnly = false) {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = filterBridgeGuideResources(filter);
  if (!normalizedQuery) return filtered;
  return filtered.filter((resource) => (titleOnly ? resource.title : [resource.kind, resource.slug, resource.title, resource.description].join(" ")).toLowerCase().includes(normalizedQuery));
}

export function buildResourceMatchSummary(count: number, query: string, titleOnly = false) {
  const label = count === 1 ? "1 related resource" : `${count} related resources`;
  const normalizedQuery = query.trim();
  const scope = titleOnly ? " in titles only" : "";
  return normalizedQuery ? `${label} match “${normalizedQuery}”${scope}` : `${label} available${scope}`;
}

export type ResourceHighlightSegment = { text: string; isMatch: boolean };
export function splitResourceHighlight(text: string, query: string): ResourceHighlightSegment[] {
  const needle = query.trim();
  if (!needle) return [{ text, isMatch: false }];
  const lowerText = text.toLocaleLowerCase();
  const lowerNeedle = needle.toLocaleLowerCase();
  const segments: ResourceHighlightSegment[] = [];
  let cursor = 0;
  let matchIndex = lowerText.indexOf(lowerNeedle, cursor);
  while (matchIndex !== -1) {
    if (matchIndex > cursor) segments.push({ text: text.slice(cursor, matchIndex), isMatch: false });
    segments.push({ text: text.slice(matchIndex, matchIndex + needle.length), isMatch: true });
    cursor = matchIndex + needle.length;
    matchIndex = lowerText.indexOf(lowerNeedle, cursor);
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), isMatch: false });
  return segments.length ? segments : [{ text, isMatch: false }];
}

export function isResourceSearchShortcut(event: Pick<KeyboardEvent, "key" | "metaKey" | "ctrlKey" | "altKey" | "shiftKey">) { return event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey; }
function isTextEntryTarget(target: EventTarget | null) { return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)); }
function HighlightedResourceText({ text, query }: { text: string; query: string }) { return <>{splitResourceHighlight(text, query).map((segment, index) => segment.isMatch ? <mark key={`${segment.text}-${index}`}>{segment.text}</mark> : <span key={`${segment.text}-${index}`}>{segment.text}</span>)}</>; }

const styles = `
  .bridge-guide-resources { margin:34px 0 8px; padding:23px 0 4px; border-top:1px solid var(--ink); }.bridge-guide-resources h2 { margin:7px 0 7px; font-family:"DM Serif Display",Georgia,serif; font-size:28px; font-weight:400; letter-spacing:-.035em; line-height:1.08; }.bridge-guide-resources>p { max-width:660px; margin:0; color:#5c635c; font-size:13px; line-height:1.65; }
  .bridge-guide-resource-controls { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-top:15px; }.bridge-guide-resource-filters { display:flex; flex-wrap:wrap; gap:7px; }.bridge-guide-resource-filter { min-height:31px; padding:0 10px; border:1px solid var(--rule); background:#fffdf8; color:#586258; font-size:10px; font-weight:800; letter-spacing:.02em; transition:border-color 150ms var(--ease-out),background 150ms var(--ease-out),color 150ms var(--ease-out),transform 150ms var(--ease-out); }.bridge-guide-resource-filter:hover { border-color:var(--green); color:var(--green); }.bridge-guide-resource-filter[aria-pressed="true"] { border-color:var(--green); background:var(--green); color:#fffdf8; }.bridge-guide-resource-filter:active { transform:scale(.97); }.bridge-guide-resource-filter:focus-visible { outline:3px solid #b66b4d; outline-offset:3px; }
  .bridge-guide-resource-search-group { display:grid; gap:7px; min-width:min(100%,275px); }.bridge-guide-resource-search { position:relative; display:flex; align-items:center; border:1px solid var(--rule); background:#fffdf8; }.bridge-guide-resource-search>svg { position:absolute; left:9px; color:#68736b; pointer-events:none; }.bridge-guide-resource-search input { width:100%; min-height:32px; padding:0 58px 0 29px; border:0; outline:0; background:transparent; color:var(--ink); font:inherit; font-size:11px; }.bridge-guide-resource-search input::placeholder { color:#7a837a; }.bridge-guide-resource-search:focus-within { border-color:var(--green); box-shadow:0 0 0 3px rgba(23,107,91,.12); }.bridge-guide-resource-search button { position:absolute; right:3px; display:grid; place-items:center; width:52px; height:26px; border:0; background:transparent; color:#557063; cursor:pointer; font:inherit; font-size:9px; font-weight:800; letter-spacing:.02em; }.bridge-guide-resource-search button:disabled { color:#a0a79f; cursor:default; }.bridge-guide-resource-search button:focus-visible { outline:2px solid #b66b4d; outline-offset:1px; }.bridge-guide-resource-search-key { position:absolute; right:57px; border:1px solid #d9d8cc; padding:1px 4px; color:#7b817a; font-size:9px; line-height:1.2; pointer-events:none; }.bridge-guide-resource-title-only { display:flex; align-items:center; gap:6px; color:#5d685f; font-size:10px; font-weight:800; }.bridge-guide-resource-title-only input { width:14px; height:14px; accent-color:var(--green); }.bridge-guide-resource-title-only input:focus-visible { outline:3px solid #b66b4d; outline-offset:2px; }
  .bridge-guide-resource-match-count { margin:12px 0 -6px; color:#5f6b62; font-size:10px; font-weight:800; letter-spacing:.03em; }.bridge-guide-resource-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin-top:15px; }.bridge-guide-resource { display:block; min-height:100%; padding:15px; border:1px solid var(--rule); color:var(--ink); background:#fffdf8; transition:border-color 160ms var(--ease-out),box-shadow 160ms var(--ease-out),transform 160ms var(--ease-out),opacity 180ms var(--ease-out); }.bridge-guide-resource-grid.is-filtering .bridge-guide-resource { opacity:0; transform:translateY(5px); }.bridge-guide-resource:hover { border-color:var(--green); box-shadow:0 8px 16px rgba(23,107,91,.08); transform:translateY(-1px); }.bridge-guide-resource:active { transform:scale(.985); }.bridge-guide-resource:focus-visible { outline:3px solid #b66b4d; outline-offset:3px; }.bridge-guide-resource-kind { display:flex; align-items:center; gap:5px; color:var(--green); font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }.bridge-guide-resource strong { display:block; margin-top:8px; font-size:13px; line-height:1.35; }.bridge-guide-resource p { margin:6px 0 0; color:#62685f; font-size:11px; line-height:1.53; }.bridge-guide-resource mark { padding:0 1px; background:#d8ece4; color:#17463c; }.bridge-guide-resource-action { display:inline-flex; align-items:center; gap:4px; margin-top:10px; color:var(--green); font-size:10px; font-weight:800; }.bridge-guide-resource-empty { grid-column:1/-1; padding:18px; border:1px dashed var(--rule); background:#fbfaf5; color:#657067; font-size:12px; line-height:1.5; }.bridge-guide-resource-empty p { margin:0; }.bridge-guide-resource-empty strong { display:block; margin-top:14px; color:var(--ink); font-size:11px; }.bridge-guide-resource-empty-links { display:flex; flex-wrap:wrap; gap:7px; margin-top:8px; }.bridge-guide-resource-empty-links a { display:inline-flex; align-items:center; gap:4px; padding:5px 7px; border:1px solid var(--rule); background:#fffdf8; color:var(--green); font-size:10px; font-weight:800; }.bridge-guide-resource-empty-links a:hover { border-color:var(--green); background:var(--green-pale); }.bridge-guide-resource-empty-links a:focus-visible { outline:3px solid #b66b4d; outline-offset:2px; }
  @media(prefers-reduced-motion:reduce) { .bridge-guide-resource,.bridge-guide-resource-grid.is-filtering .bridge-guide-resource { transition:none; transform:none; } } @media(max-width:760px) { .bridge-guide-resources { margin-top:28px; }.bridge-guide-resources h2 { font-size:25px; }.bridge-guide-resources>p { font-size:12px; }.bridge-guide-resource-controls { align-items:stretch; }.bridge-guide-resource-search-group { width:100%; }.bridge-guide-resource-grid { grid-template-columns:1fr; }.bridge-guide-resource { padding:14px; } }
`;

export default function BridgeGuideResources() {
  const { consent } = useCookieConsent();
  const [filter, setFilter] = useState<BridgeResourceFilter>("all");
  const [query, setQuery] = useState("");
  const [titleOnly, setTitleOnly] = useState(false);
  const [hasLoadedTitleOnlyPreference, setHasLoadedTitleOnlyPreference] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resources = searchBridgeGuideResources(filter, query, titleOnly);
  const matchSummary = buildResourceMatchSummary(resources.length, query, titleOnly);
  useEffect(() => { setTitleOnly(readTitleOnlyPreference(window.localStorage)); setHasLoadedTitleOnlyPreference(true); }, []);
  useEffect(() => { if (hasLoadedTitleOnlyPreference) writeTitleOnlyPreference(window.localStorage, titleOnly); }, [hasLoadedTitleOnlyPreference, titleOnly]);
  useEffect(() => { setIsFiltering(true); const frame = window.requestAnimationFrame(() => setIsFiltering(false)); return () => window.cancelAnimationFrame(frame); }, [filter, query, titleOnly]);
  useEffect(() => { const focusSearch = (event: KeyboardEvent) => { if (!isResourceSearchShortcut(event) || isTextEntryTarget(event.target) || event.defaultPrevented) return; event.preventDefault(); searchInputRef.current?.focus(); }; window.addEventListener("keydown", focusSearch); return () => window.removeEventListener("keydown", focusSearch); }, []);
  const clearSearch = () => { setQuery(""); searchInputRef.current?.focus(); };
  return <section className="bridge-guide-resources" id="related-resources" aria-labelledby="related-resources-title"><style>{styles}</style><span className="eyebrow">Tools and follow-up reading</span><h2 id="related-resources-title">Related resources for the next review.</h2><p>Use these only when they clarify the evidence trail, narrow the planning record, or prepare a human decision. None of them confirms a priority for you.</p><div className="bridge-guide-resource-controls"><div className="bridge-guide-resource-filters" role="group" aria-label="Filter related resources">{BRIDGE_RESOURCE_FILTERS.map(option => <button key={option.value} type="button" className="bridge-guide-resource-filter" aria-pressed={filter === option.value} onClick={() => setFilter(option.value)}>{option.label}</button>)}</div><div className="bridge-guide-resource-search-group"><label className="bridge-guide-resource-search"><Search size={14} aria-hidden="true" /><span className="sr-only">Search related resources. Press slash to focus from this page.</span><input ref={searchInputRef} type="search" value={query} onKeyDown={(event) => { if (event.key === "Escape" && query) { event.preventDefault(); clearSearch(); } }} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools and reading" aria-label="Search related resources; press slash to focus" /><kbd className="bridge-guide-resource-search-key" aria-hidden="true">/</kbd><button type="button" onClick={clearSearch} disabled={!query} aria-label="Clear resource search"><X size={13} aria-hidden="true" /> Clear</button></label><label className="bridge-guide-resource-title-only"><input type="checkbox" checked={titleOnly} onChange={(event) => setTitleOnly(event.target.checked)} /> Only match titles</label></div></div><p className="bridge-guide-resource-match-count" role="status" aria-live="polite">{matchSummary}</p><div className={`bridge-guide-resource-grid${isFiltering ? " is-filtering" : ""}`} aria-live="polite">{resources.length ? resources.map(resource => { const Icon = resource.icon; return <Link key={`${filter}-${query}-${titleOnly}-${resource.href}`} href={resource.href} className="bridge-guide-resource" onClick={() => trackRelatedResourceClick(Boolean(consent?.analytics), "evidence-to-priority-plan", resource.kind.toLowerCase(), resource.slug)}><span className="bridge-guide-resource-kind"><Icon size={13} aria-hidden="true" /> <HighlightedResourceText text={resource.kind} query={query} /></span><strong><HighlightedResourceText text={resource.title} query={query} /></strong><p><HighlightedResourceText text={resource.description} query={query} /></p><span className="bridge-guide-resource-action">Open resource <ArrowUpRight size={13} aria-hidden="true" /></span></Link>; }) : <div className="bridge-guide-resource-empty" role="status"><p>No related resources match “{query.trim()}”. Try a broader term, switch off title-only matching, choose All resources, or start with one of these directly related records.</p><strong>Try these next</strong><div className="bridge-guide-resource-empty-links">{BRIDGE_GUIDE_EMPTY_STATE_RESOURCES.map(resource => <Link key={resource.href} href={resource.href} onClick={() => trackRelatedResourceClick(Boolean(consent?.analytics), "evidence-to-priority-plan", resource.kind.toLowerCase(), resource.slug)}>{resource.title} <ArrowUpRight size={12} aria-hidden="true" /></Link>)}</div></div>}</div></section>;
}
