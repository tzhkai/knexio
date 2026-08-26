/** Reader-owned review trail: completion stays in local storage and is never sent as analytics. */
import { Check, ClipboardCheck, Copy, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { copyTextToClipboard } from "@/lib/clipboard";

export const GUIDE_REVIEW_STORAGE_PREFIX = "workflow-library:guide-review:";

export function guideReviewStorageKey(slug: string) {
  return `${GUIDE_REVIEW_STORAGE_PREFIX}${slug}`;
}

export function parseGuideReviewProgress(raw: string | null, checks: string[]) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const allowed = new Set(checks);
    return Array.from(new Set(parsed.filter((item): item is string => typeof item === "string" && allowed.has(item))));
  } catch {
    return [];
  }
}

export function buildGuideReviewNote(title: string, checks: string[], completed: readonly string[]) {
  const complete = new Set(completed);
  return `# Personal review record\n\nGuide: ${title}\n\nReviewed checks\n${checks.map(check => `- [${complete.has(check) ? "x" : " "}] ${check}`).join("\n")}\n\nReminder: This is a reader-owned local checklist. Reopen the original source, confirm commitments, and apply accountable human judgment before acting on an AI-assisted output.`;
}

const styles = `
  .guide-review-trail{margin-top:18px;padding:18px;border:1px solid #bed0bf;background:linear-gradient(135deg,#eef5ed,#fffdf8)}
  .guide-review-trail-head{display:grid;grid-template-columns:auto minmax(0,1fr);gap:11px;align-items:start}.guide-review-trail-icon{display:grid;width:30px;height:30px;place-items:center;background:var(--green);color:#fff}.guide-review-trail h3{margin:2px 0 4px;font-family:"DM Serif Display",Georgia,serif;font-size:23px;font-weight:400;line-height:1.05}.guide-review-trail-head p{margin:0;color:#526056;font-size:11px;line-height:1.55}
  .guide-review-progress-row{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:15px;color:var(--green);font-size:10px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.guide-review-progress{height:5px;margin-top:7px;overflow:hidden;background:#d6e2d3}.guide-review-progress span{display:block;height:100%;background:var(--green);transition:width 180ms var(--ease-out)}
  .guide-review-checks{display:grid;gap:0;margin:15px 0 0;padding:0;list-style:none;border-top:1px solid #c6d5c5}.guide-review-checks label{display:grid;grid-template-columns:18px minmax(0,1fr);gap:9px;align-items:start;padding:10px 0;border-bottom:1px solid #c6d5c5;color:#48544b;font-size:12px;line-height:1.5;cursor:pointer}.guide-review-checks input{width:15px;height:15px;margin:2px 0 0;accent-color:var(--green)}.guide-review-checks input:checked+span{color:#607269;text-decoration:line-through}.guide-review-checks label:has(input:focus-visible){outline:2px solid var(--green);outline-offset:3px}
  .guide-review-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:15px}.guide-review-action{display:inline-flex;align-items:center;gap:6px;min-height:34px;padding:8px 10px;border:1px solid var(--green);background:var(--green);color:#fff;font-size:10px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;transition:transform 160ms var(--ease-out),background 160ms var(--ease-out)}.guide-review-action:active{transform:scale(.97)}.guide-review-action:hover{background:#0c5b4f}.guide-review-action.is-secondary{background:transparent;color:var(--green)}.guide-review-action.is-secondary:hover{background:#e0ecde}.guide-review-action:disabled{opacity:.55;cursor:not-allowed}.guide-review-status{min-height:17px;margin:10px 0 0;color:#425c4f;font-size:11px;font-weight:700;line-height:1.45}
  .guide-review-confirm{margin-top:13px;padding:12px;border:1px solid #d6a78f;background:#fff4ec}.guide-review-confirm p{margin:0;color:#6d493b;font-size:12px;line-height:1.5}.guide-review-confirm-actions{display:flex;gap:8px;margin-top:10px}.guide-review-confirm button{min-height:31px;padding:6px 9px;border:1px solid #9b5b42;background:#9b5b42;color:#fff;font-size:10px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;cursor:pointer}.guide-review-confirm button.is-cancel{border-color:#9b5b42;background:transparent;color:#8b503b}
  .guide-review-privacy{display:flex;gap:6px;align-items:flex-start;margin:13px 0 0;color:#657168;font-size:10px;line-height:1.5}.guide-review-privacy svg{flex:0 0 auto;margin-top:1px;color:var(--green)}
  @media(max-width:760px){.guide-review-trail{padding:15px}.guide-review-trail h3{font-size:21px}.guide-review-progress-row{align-items:flex-start;flex-direction:column;gap:4px}.guide-review-actions{display:grid;grid-template-columns:1fr}.guide-review-action{justify-content:center}}
`;

export default function GuideReviewTrail({ slug, title, checks }: { slug: string; title: string; checks: string[] }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const completedCount = completed.length;
  const percent = checks.length ? Math.round((completedCount / checks.length) * 100) : 0;

  useEffect(() => {
    setCompleted(parseGuideReviewProgress(window.localStorage.getItem(guideReviewStorageKey(slug)), checks));
    setReady(true);
  }, [checks, slug]);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(guideReviewStorageKey(slug), JSON.stringify(completed)); } catch { /* Storage can be unavailable in private contexts. */ }
  }, [completed, ready, slug]);

  const toggle = (check: string) => {
    setCompleted(current => current.includes(check) ? current.filter(item => item !== check) : [...current, check]);
    setFeedback("");
  };

  const copyRecord = async () => {
    const copied = await copyTextToClipboard(buildGuideReviewNote(title, checks, completed));
    setFeedback(copied ? "Personal review record copied. No checklist data was sent from this page." : "Could not copy automatically. You can still keep the checklist in this browser.");
  };

  const reset = () => {
    setCompleted([]);
    setConfirmReset(false);
    setFeedback("Local review marks cleared from this device.");
  };

  return <section className="guide-review-trail" aria-labelledby="guide-review-trail-title"><style>{styles}</style><div className="guide-review-trail-head"><span className="guide-review-trail-icon" aria-hidden="true"><ClipboardCheck size={17} /></span><div><span className="eyebrow">Reader-owned review trail</span><h3 id="guide-review-trail-title">Keep your human check visible.</h3><p>Mark the checks you have personally reviewed. This is a local reading aid—not evidence that a claim, commitment, or decision is correct.</p></div></div><div className="guide-review-progress-row"><span>{completedCount} of {checks.length} checks reviewed</span><span>{percent}%</span></div><div className="guide-review-progress" role="progressbar" aria-label="Human checks reviewed" aria-valuemin={0} aria-valuemax={checks.length} aria-valuenow={completedCount}><span style={{ width: `${percent}%` }} /></div><ul className="guide-review-checks">{checks.map(check => <li key={check}><label><input type="checkbox" checked={completedSet.has(check)} onChange={() => toggle(check)} /><span>{check}</span></label></li>)}</ul><div className="guide-review-actions"><button type="button" className="guide-review-action" onClick={copyRecord}><Copy size={14} aria-hidden="true" /> Copy review record</button><button type="button" className="guide-review-action is-secondary" onClick={() => setConfirmReset(true)} disabled={!completedCount}><RotateCcw size={14} aria-hidden="true" /> Reset local marks</button></div>{confirmReset && <div className="guide-review-confirm" role="alertdialog" aria-label="Confirm reset of local review marks"><p>Clear all local review marks for this guide on this device?</p><div className="guide-review-confirm-actions"><button type="button" onClick={reset}>Clear marks</button><button type="button" className="is-cancel" onClick={() => setConfirmReset(false)}>Keep marks</button></div></div>}<p className="guide-review-status" role="status" aria-live="polite">{feedback}</p><p className="guide-review-privacy"><ShieldCheck size={13} aria-hidden="true" /> This checklist is stored only in this browser when storage is available. It is not sent to Knexio or used for analytics.</p></section>;
}
