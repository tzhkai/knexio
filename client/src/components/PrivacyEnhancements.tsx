/** Style note: Field Notes for Better Work — shared privacy styles preserve the paper-and-ink editorial system. */
export default function PrivacyEnhancements() {
  return <style>{`
    .legal-page { position:relative; } .legal-page::before { content:"REFERENCE TRACK / PRIVACY RECORD / CURRENT CONFIGURATION"; position:absolute; top:111px; left:-38px; color:var(--green); border-left:1px solid var(--green); font-size:8px; font-weight:800; letter-spacing:.1em; line-height:1.55; text-transform:uppercase; writing-mode:vertical-rl; }
    .privacy-choice-panel { display:flex; align-items:center; justify-content:space-between; gap:24px; margin-top:48px; padding:22px 24px; border-top:2px solid var(--green); background:#edf5f1; }
    .privacy-choice-panel > div { display:flex; align-items:flex-start; gap:13px; } .privacy-choice-panel svg { flex:0 0 auto; margin-top:3px; color:var(--green); } .privacy-choice-panel .eyebrow { color:var(--green); } .privacy-choice-panel p { max-width:510px; margin:5px 0 0; color:#3e524a; font-size:12px; line-height:1.6; }
    .legal-content strong { color:var(--green-deep); } .legal-content a { display:inline-flex; align-items:center; gap:3px; color:var(--green); border-bottom:1px solid var(--green); } .legal-content a:hover { color:var(--green-deep); } .inline-policy-button { padding:0; border-bottom:1px solid var(--green); background:transparent; color:var(--green); font-size:inherit; font-weight:700; }
    .privacy-sources { display:flex; gap:14px; margin-top:56px; padding:22px 0; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); } .privacy-sources>svg { flex:0 0 auto; margin-top:2px; color:var(--rust); } .privacy-sources p { margin:4px 0 0; color:#5b5d55; font-size:12px; line-height:1.7; } .privacy-sources a { color:var(--green); border-bottom:1px solid var(--green); }
    @media (max-width:760px) { .legal-page::before { display:none; } } @media (max-width:620px) { .privacy-choice-panel { flex-direction:column; align-items:stretch; margin-top:34px; } .privacy-choice-panel .primary-button { width:100%; } }
  `}</style>;
}
