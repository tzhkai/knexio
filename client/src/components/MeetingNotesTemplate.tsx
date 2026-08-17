import { Download, FileText } from "lucide-react";
import { useCallback } from "react";

export const MEETING_NOTES_TEMPLATE = `# Meeting record

**Meeting:** [name]
**Date:** [YYYY-MM-DD]
**Facilitator:** [name]
**Participants:** [names]
**Purpose:** [why this meeting took place]

## Context

[What should a reader know before reviewing the record?]

## Confirmed decisions

- **Decision:** [what was confirmed]
- **Owner:** [person or team, if explicitly stated]
- **Effective date:** [date, if explicitly stated]
- **Evidence or source note:** [where this came from]

## Actions

| Action | Owner | Due date | Supporting context | Status |
| --- | --- | --- | --- | --- |
| [task] | [name / Unassigned] | [date / Not stated] | [context] | [Open] |

## Open questions

- [Question that still needs an answer]
- **Decision owner:** [person or team, if known]
- **Next review point:** [date or condition, if known]

## Not confirmed

- [Proposal, concern, or detail that was discussed but not agreed]

## Verification checklist

- [ ] Every decision is separated from discussion or suggestion.
- [ ] Owners and dates are copied only when explicitly stated.
- [ ] Unassigned actions and unresolved questions remain visible.
- [ ] Participants have a chance to correct the record.
`;

const styles = `
  .meeting-template { margin: 30px 0; padding: 20px 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--rule); }
  .meeting-template-head { display:flex; align-items:flex-start; justify-content:space-between; gap:20px; }
  .meeting-template-kicker { color:var(--green); font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
  .meeting-template h2 { margin:7px 0 7px; font-family:"DM Serif Display",Georgia,serif; font-size:28px; font-weight:400; letter-spacing:-.035em; line-height:1.08; }
  .meeting-template p { max-width:650px; margin:0; color:#5d625c; font-size:13px; line-height:1.65; }
  .meeting-template-button { display:inline-flex; align-items:center; gap:7px; flex-shrink:0; min-height:36px; padding:0 12px; border:1px solid var(--green); background:var(--green); color:#fffdf8; font-size:10px; font-weight:800; letter-spacing:.03em; cursor:pointer; transition:background 160ms var(--ease-out),transform 160ms var(--ease-out); }
  .meeting-template-button:hover { background:var(--green-deep); }
  .meeting-template-button:active { transform:scale(.97); }
  @media (max-width:760px) { .meeting-template-head { display:grid; gap:13px; } .meeting-template h2 { font-size:25px; } .meeting-template-button { justify-content:center; width:100%; } }
`;

export default function MeetingNotesTemplate() {
  const downloadTemplate = useCallback(() => {
    const blob = new Blob([MEETING_NOTES_TEMPLATE], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "meeting-record-template.md";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }, []);

  return <section className="meeting-template" aria-labelledby="meeting-template-title"><style>{styles}</style><div className="meeting-template-head"><div><span className="meeting-template-kicker"><FileText size={13} aria-hidden="true" /> Practical asset</span><h2 id="meeting-template-title">Download a meeting record template.</h2><p>A plain Markdown template for separating confirmed decisions, actions, open questions, and details that still need confirmation. It contains no tracking or external requests.</p></div><button type="button" className="meeting-template-button" onClick={downloadTemplate}><Download size={15} aria-hidden="true" /> Download .md template</button></div></section>;
}
