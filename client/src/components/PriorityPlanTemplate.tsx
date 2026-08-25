import { Check, Copy, Download, FileSpreadsheet, FileText } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { copyTextToClipboard } from "@/lib/clipboard";

export const PRIORITY_PLAN_TEMPLATE_URL = "/manus-storage/research-to-priority-plan-template_75c37156.xlsx";
export const PRIORITY_PLAN_MARKDOWN_TEMPLATE = `# Research → Priority Plan

> Use this working record to carry source-aware research into one modest next priority. Replace every bracketed field with your real context. Do not invent certainty, urgency, capacity, approval, owners, or dates.

## Decision context

- **Decision question:** [What decision does this plan support?]
- **Decision owner:** [Who can confirm, defer, or revise the trade-off?]
- **Review date or condition:** [When should the priority be checked again?]
- **Known constraint:** [Time, dependency, approval, capacity, or external condition]

## Evidence notes

| Claim or observation | Source label / date | Evidence type | Support status | Limitation or counter-evidence | Next verification step | Priority impact |
| --- | --- | --- | --- | --- | --- | --- |
| [record] | [source / date] | [type] | [Supported / Mixed / Needs verification / Not supported] | [limit] | [specific check] | [Could change the decision / Important context / Low impact] |

## Priority record

| Priority / next move | Decision it supports | Evidence reference | Gap or limitation | Dependency | Owner | Review condition | Status |
| --- | --- | --- | --- | --- | --- | --- |
| [smallest useful move] | [decision] | [source label] | [gap] | [dependency] | [owner or Not stated] | [condition] | [Not started / In review / Needs verification / Ready for decision / Deferred] |

## Human review before commitment

- [ ] Decision-critical evidence can be traced to a source label and date.
- [ ] Important gaps and dependencies are visible.
- [ ] The first priority is small enough to review, test, or reverse.
- [ ] The decision owner has confirmed the trade-off and next review point.
`;

const styles = `
  .priority-plan-template { margin:30px 0; padding:21px 0; border-top:1px solid var(--ink); border-bottom:1px solid var(--rule); }
  .priority-plan-template-head { display:flex; align-items:flex-start; justify-content:space-between; gap:20px; }
  .priority-plan-template-kicker { display:inline-flex; align-items:center; gap:6px; color:var(--green); font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
  .priority-plan-template h2 { margin:7px 0; font-family:"DM Serif Display",Georgia,serif; font-size:28px; font-weight:400; letter-spacing:-.035em; line-height:1.08; }
  .priority-plan-template p { max-width:660px; margin:0; color:#5d625c; font-size:13px; line-height:1.65; }
  .priority-plan-template-note { display:block; margin-top:9px; color:#687169; font-size:10px; line-height:1.5; }
  .priority-plan-template-actions { display:grid; gap:8px; flex-shrink:0; }.priority-plan-template-button { display:inline-flex; align-items:center; justify-content:center; gap:7px; min-height:37px; padding:0 13px; border:1px solid var(--green); background:var(--green); color:#fffdf8; font-size:10px; font-weight:800; letter-spacing:.03em; transition:background 160ms var(--ease-out),transform 160ms var(--ease-out); }
  .priority-plan-template-button.is-secondary { background:transparent; color:var(--green); }.priority-plan-template-button:hover { background:var(--green-deep); }.priority-plan-template-button.is-secondary:hover { background:var(--green-pale); }.priority-plan-template-button:active { transform:scale(.97); }.priority-plan-template-button:focus-visible { outline:3px solid #b66b4d; outline-offset:4px; }
  .priority-plan-template-toast { position:fixed; z-index:110; right:20px; bottom:20px; display:flex; align-items:center; gap:8px; max-width:min(340px,calc(100vw - 40px)); padding:12px 14px; border:1px solid rgba(255,255,255,.18); background:#17342e; color:#fffdf8; box-shadow:0 13px 30px rgba(24,43,36,.2); font-size:12px; font-weight:800; line-height:1.4; transform:translateY(0); opacity:1; transition:transform 180ms var(--ease-out),opacity 180ms var(--ease-out); }.priority-plan-template-toast svg { flex-shrink:0; color:#a6d6c8; }
  @media(max-width:760px) { .priority-plan-template-head { display:grid; gap:13px; }.priority-plan-template h2 { font-size:25px; }.priority-plan-template-actions { grid-template-columns:1fr; }.priority-plan-template-button { width:100%; }.priority-plan-template p { font-size:12px; }.priority-plan-template-toast { right:14px; bottom:14px; max-width:calc(100vw - 28px); } }
  @media(prefers-reduced-motion:reduce) { .priority-plan-template-toast { transition:none; } }
`;

export default function PriorityPlanTemplate() {
  const [feedback, setFeedback] = useState("");
  const feedbackTimer = useRef<number | null>(null);
  const showFeedback = useCallback((message: string) => {
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    setFeedback(message);
    feedbackTimer.current = window.setTimeout(() => setFeedback(""), 2600);
  }, []);
  useEffect(() => () => { if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current); }, []);
  const downloadMarkdownTemplate = useCallback(() => {
    const blob = new Blob([PRIORITY_PLAN_MARKDOWN_TEMPLATE], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "research-to-priority-plan-template.md";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showFeedback("Markdown template download started");
  }, [showFeedback]);
  const copyMarkdownTemplate = useCallback(async () => {
    const copied = await copyTextToClipboard(PRIORITY_PLAN_MARKDOWN_TEMPLATE);
    showFeedback(copied ? "Markdown template copied to clipboard" : "Could not copy automatically — select the template text instead");
  }, [showFeedback]);
  return <section className="priority-plan-template" id="priority-plan-template" aria-labelledby="priority-plan-template-title"><style>{styles}</style><div className="priority-plan-template-head"><div><span className="priority-plan-template-kicker"><FileSpreadsheet size={13} aria-hidden="true" /> Practical asset</span><h2 id="priority-plan-template-title">Download the research-to-priority plan template.</h2><p>Choose an editable Excel workbook or a plain Markdown record. Both formats separate source-aware evidence notes from the decision, one modest priority, dependencies, review condition, and human check. Downloads stay in your browser and do not require an account.</p><span className="priority-plan-template-note">Excel includes: Start here, Priority plan, and Evidence notes worksheets.</span></div><div className="priority-plan-template-actions"><a className="priority-plan-template-button" href={PRIORITY_PLAN_TEMPLATE_URL} download="research-to-priority-plan-template.xlsx" onClick={() => showFeedback("Excel template download started")}><Download size={15} aria-hidden="true" /> Download .xlsx</a><button type="button" className="priority-plan-template-button is-secondary" onClick={downloadMarkdownTemplate}><FileText size={15} aria-hidden="true" /> Download .md</button><button type="button" className="priority-plan-template-button is-secondary" onClick={copyMarkdownTemplate}><Copy size={15} aria-hidden="true" /> Copy Markdown</button></div></div>{feedback && <div className="priority-plan-template-toast" role="status" aria-live="polite"><Check size={16} aria-hidden="true" /> {feedback}</div>}</section>;
}
