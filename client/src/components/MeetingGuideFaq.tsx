import { ArrowUpRight, ChevronDown, CircleHelp } from "lucide-react";
import { Link } from "wouter";

export const meetingGuideFaqs = [
  {
    question: "What should a meeting decision brief include?",
    answer: "A useful decision brief includes the decision or question, the evidence discussed, the options considered, the agreed action, the owner, the deadline, and any unresolved or explicitly unconfirmed points.",
  },
  {
    question: "How do I turn meeting notes into action items without inventing agreement?",
    answer: "Separate what was explicitly agreed from suggestions, open questions, and inferred next steps. Keep the speaker or source attached to important claims, mark uncertain items as unconfirmed, and ask a participant to verify the final action list before distribution.",
  },
  {
    question: "Can AI summarize a meeting when the notes are incomplete?",
    answer: "Yes, but the output should be treated as a structured draft. Tell the model which notes are missing, require it to label uncertainty, and ask it to list questions that a participant must answer before the brief is shared.",
  },
  {
    question: "What is the difference between meeting minutes and a decision brief?",
    answer: "Meeting minutes preserve a record of what happened, while a decision brief compresses the relevant context into a decision, evidence, options, owners, and next steps. A decision brief should not replace the source record when the distinction matters.",
  },
  {
    question: "How should I review an AI-generated meeting summary?",
    answer: "Check names, dates, owners, deadlines, decisions, numbers, and the difference between agreement and discussion. Confirm every consequential claim against the notes or recording before sending the summary to other people.",
  },
] as const;

const faqStyles = `
  .meeting-faq { margin-top:42px; padding-top:24px; border-top:1px solid var(--ink); }
  .meeting-faq-heading { display:flex; align-items:flex-start; gap:12px; margin-bottom:16px; }
  .meeting-faq-heading svg { flex:0 0 auto; margin-top:5px; color:var(--green); }
  .meeting-faq-heading h2 { margin:0; font-family:"DM Serif Display",Georgia,serif; font-size:30px; font-weight:400; letter-spacing:-.035em; line-height:1.05; }
  .meeting-faq-heading p { max-width:620px; margin:7px 0 0; color:#62665f; font-size:13px; line-height:1.65; }
  .meeting-faq-list { border-top:1px solid var(--rule); }
  .meeting-faq-item { border-bottom:1px solid var(--rule); }
  .meeting-faq-item summary { display:flex; align-items:center; justify-content:space-between; gap:18px; padding:15px 0; cursor:pointer; color:var(--ink); font-size:13px; font-weight:800; line-height:1.4; list-style:none; }
  .meeting-faq-item summary::-webkit-details-marker { display:none; }
  .meeting-faq-item summary svg { flex:0 0 auto; color:var(--green); transition:transform 160ms var(--ease-out); }
  .meeting-faq-item[open] summary svg { transform:rotate(180deg); }
  .meeting-faq-answer { max-width:680px; padding:0 30px 16px 0; color:#565850; font-size:13px; line-height:1.72; }
  @media (max-width:760px) { .meeting-faq { margin-top:32px; padding-top:20px; } .meeting-faq-heading h2 { font-size:26px; } .meeting-faq-heading p,.meeting-faq-answer { font-size:12px; } .meeting-faq-item summary { font-size:12px; } }
`;

export default function MeetingGuideFaq() {
  return <section className="meeting-faq" id="meeting-faq" aria-labelledby="meeting-faq-title">
    <style>{faqStyles}</style>
    <div className="meeting-faq-heading">
      <CircleHelp size={22} aria-hidden="true" />
      <div><span className="eyebrow">Common questions</span><h2 id="meeting-faq-title">Questions readers usually ask.</h2><p>Use these checks when turning incomplete notes into a brief that another person can verify.</p></div>
    </div>
    <div className="meeting-faq-list">
      {meetingGuideFaqs.map(item => <details className="meeting-faq-item" key={item.question}><summary>{item.question}<ChevronDown size={16} aria-hidden="true" /></summary><div className="meeting-faq-answer">{item.answer}</div></details>)}
    </div>
    <p className="meeting-faq-related">Want the full comparison? <Link href="/workflows/meetings/meeting-minutes-vs-decision-brief/">Read the guide to meeting minutes vs decision briefs <ArrowUpRight size={14} /></Link></p>
  </section>;
}

export function meetingGuideFaqSchema() {
  return {
    "@type": "FAQPage",
    mainEntity: meetingGuideFaqs.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
