import { Download, FileSpreadsheet } from "lucide-react";

export const PRIORITY_PLAN_TEMPLATE_URL = "/manus-storage/research-to-priority-plan-template_75c37156.xlsx";

const styles = `
  .priority-plan-template { margin:30px 0; padding:21px 0; border-top:1px solid var(--ink); border-bottom:1px solid var(--rule); }
  .priority-plan-template-head { display:flex; align-items:flex-start; justify-content:space-between; gap:20px; }
  .priority-plan-template-kicker { display:inline-flex; align-items:center; gap:6px; color:var(--green); font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
  .priority-plan-template h2 { margin:7px 0; font-family:"DM Serif Display",Georgia,serif; font-size:28px; font-weight:400; letter-spacing:-.035em; line-height:1.08; }
  .priority-plan-template p { max-width:660px; margin:0; color:#5d625c; font-size:13px; line-height:1.65; }
  .priority-plan-template-note { display:block; margin-top:9px; color:#687169; font-size:10px; line-height:1.5; }
  .priority-plan-template-button { display:inline-flex; align-items:center; justify-content:center; gap:7px; flex-shrink:0; min-height:37px; padding:0 13px; border:1px solid var(--green); background:var(--green); color:#fffdf8; font-size:10px; font-weight:800; letter-spacing:.03em; transition:background 160ms var(--ease-out),transform 160ms var(--ease-out); }
  .priority-plan-template-button:hover { background:var(--green-deep); }.priority-plan-template-button:active { transform:scale(.97); }.priority-plan-template-button:focus-visible { outline:3px solid #b66b4d; outline-offset:4px; }
  @media(max-width:760px) { .priority-plan-template-head { display:grid; gap:13px; }.priority-plan-template h2 { font-size:25px; }.priority-plan-template-button { width:100%; }.priority-plan-template p { font-size:12px; } }
`;

export default function PriorityPlanTemplate() {
  return <section className="priority-plan-template" id="priority-plan-template" aria-labelledby="priority-plan-template-title"><style>{styles}</style><div className="priority-plan-template-head"><div><span className="priority-plan-template-kicker"><FileSpreadsheet size={13} aria-hidden="true" /> Practical asset</span><h2 id="priority-plan-template-title">Download the research-to-priority plan template.</h2><p>This editable Excel workbook separates source-aware evidence notes from the decision, one modest priority, dependencies, review condition, and human check. Yellow cells are for your own record; it does not send data or require an account.</p><span className="priority-plan-template-note">Includes: Start here, Priority plan, and Evidence notes worksheets.</span></div><a className="priority-plan-template-button" href={PRIORITY_PLAN_TEMPLATE_URL} download="research-to-priority-plan-template.xlsx"><Download size={15} aria-hidden="true" /> Download .xlsx</a></div></section>;
}
