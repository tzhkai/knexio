/**
 * Style note: Field Notes for Better Work — consent controls are calm, specific, and reversible.
 * Optional analytics and advertising are not activated by this component until the visitor chooses them.
 */
import { Check, ChevronDown, Cookie, ShieldCheck, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type ConsentRecord = {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  updatedAt: string;
  expiresAt: number;
};

type ConsentContextValue = {
  consent: ConsentRecord | null;
  openSettings: () => void;
};

const STORAGE_KEY = "workflow-library-cookie-consent-v1";
const CONSENT_DAYS = 180;
const CookieConsentContext = createContext<ConsentContextValue | null>(null);

const consentStyles = `
  .cookie-consent { position:fixed; right:24px; bottom:24px; z-index:100; width:min(520px,calc(100vw - 32px)); color:#edf1ea; background:#1c2823; box-shadow:0 22px 60px rgba(15,32,27,.28); }
  .cookie-consent-inner { padding:24px 25px 21px; border-top:3px solid #176b5b; }
  .cookie-consent-heading { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; }
  .cookie-consent-title { display:flex; align-items:center; gap:10px; margin:0; color:#fffdf8; font-family:"DM Serif Display",Georgia,serif; font-size:25px; font-weight:400; letter-spacing:-.03em; line-height:1; }
  .cookie-consent-title svg { color:#a9d3c3; }
  .cookie-close { display:grid; width:30px; height:30px; place-items:center; background:transparent; color:#c8d7d0; }
  .cookie-consent p { margin:13px 0 0; color:rgba(237,241,234,.75); font-size:12px; line-height:1.66; }
  .cookie-consent p a { color:#d6eee3; border-bottom:1px solid #9fc9b9; }
  .cookie-actions { display:flex; flex-wrap:wrap; gap:9px; margin-top:20px; }
  .cookie-primary,.cookie-secondary,.cookie-text-button { display:inline-flex; align-items:center; justify-content:center; min-height:38px; padding:0 12px; font-size:11px; font-weight:800; letter-spacing:.01em; transition:background 160ms var(--ease-out),transform 160ms var(--ease-out),color 160ms var(--ease-out); }
  .cookie-primary { background:#dbeee5; color:#104a3e; } .cookie-primary:hover { background:#fffdf8; } .cookie-secondary { border:1px solid rgba(237,241,234,.38); background:transparent; color:#edf1ea; } .cookie-secondary:hover { background:rgba(255,255,255,.09); }
  .cookie-text-button { min-height:34px; padding:0; background:transparent; color:#b8d8cb; text-decoration:underline; text-underline-offset:4px; }
  .cookie-primary:active,.cookie-secondary:active,.cookie-text-button:active { transform:scale(.97); }
  .cookie-preferences { margin-top:20px; padding-top:18px; border-top:1px solid rgba(237,241,234,.2); }
  .cookie-preferences h3 { margin:0 0 4px; color:#fffdf8; font-family:"DM Serif Display",Georgia,serif; font-size:20px; font-weight:400; }
  .cookie-preferences > p { margin-top:0; }
  .cookie-option { display:grid; grid-template-columns:38px minmax(0,1fr); gap:12px; padding:13px 0; border-top:1px solid rgba(237,241,234,.14); }
  .cookie-option:first-of-type { margin-top:14px; }
  .cookie-switch { display:grid; width:36px; height:21px; place-items:center; margin-top:2px; border:1px solid rgba(237,241,234,.35); border-radius:99px; background:transparent; color:transparent; }
  .cookie-switch.active { border-color:#b8d8cb; background:#b8d8cb; color:#104a3e; } .cookie-switch:disabled { opacity:.65; }
  .cookie-option strong { display:block; color:#edf1ea; font-size:11px; letter-spacing:.04em; } .cookie-option span { display:block; margin-top:3px; color:rgba(237,241,234,.64); font-size:11px; line-height:1.48; }
  .footer-settings { padding:0; background:transparent; color:rgba(237,241,234,.72); font-size:12px; font-weight:700; text-align:left; text-decoration:underline; text-underline-offset:4px; transition:color 160ms var(--ease-out); } .footer-settings:hover { color:#fffdf8; }
  @media (max-width:620px) { .cookie-consent { right:14px; bottom:14px; width:calc(100vw - 28px); } .cookie-consent-inner { padding:21px 19px 18px; } .cookie-actions { display:grid; grid-template-columns:1fr 1fr; } .cookie-text-button { grid-column:1 / -1; justify-content:flex-start; } }
`;

function readConsent() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as ConsentRecord;
    if (!parsed.expiresAt || parsed.expiresAt < Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function AnalyticsLoader({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled || document.getElementById("workflow-library-analytics")) return;
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
    if (!endpoint || !websiteId) return;
    const script = document.createElement("script");
    script.id = "workflow-library-analytics";
    script.defer = true;
    script.src = `${endpoint}/umami`;
    script.dataset.websiteId = websiteId;
    document.head.appendChild(script);
  }, [enabled]);
  return null;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  const contextValue = useMemo(() => ({ consent, openSettings: () => setSettingsOpen(true) }), [consent]);

  return <CookieConsentContext.Provider value={contextValue}><style>{consentStyles}</style><AnalyticsLoader enabled={Boolean(consent?.analytics)} />{children}<CookieConsentSurface ready={ready} consent={consent} settingsOpen={settingsOpen} closeSettings={() => setSettingsOpen(false)} onSave={(analytics, advertising) => {
    const next: ConsentRecord = { necessary: true, analytics, advertising, updatedAt: new Date().toISOString(), expiresAt: Date.now() + CONSENT_DAYS * 24 * 60 * 60 * 1000 };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
    setSettingsOpen(false);
  }} /></CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const value = useContext(CookieConsentContext);
  if (!value) throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  return value;
}

function CookieConsentSurface({ ready, consent, settingsOpen, closeSettings, onSave }: { ready: boolean; consent: ConsentRecord | null; settingsOpen: boolean; closeSettings: () => void; onSave: (analytics: boolean, advertising: boolean) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, advertising: false });
  useEffect(() => { setDraft({ analytics: Boolean(consent?.analytics), advertising: Boolean(consent?.advertising) }); }, [consent, settingsOpen]);
  if (!ready || (consent && !settingsOpen)) return null;
  const isSettings = Boolean(consent && settingsOpen);
  return <aside className="cookie-consent" role="dialog" aria-modal="true" aria-label={isSettings ? "Cookie preferences" : "Cookie notice"}>
    <div className="cookie-consent-inner"><div className="cookie-consent-heading"><div><h2 className="cookie-consent-title"><Cookie size={20} /> {isSettings ? "Cookie preferences" : "Your choices, kept visible."}</h2><p>{isSettings ? "Change optional categories at any time. Necessary local storage keeps this choice available for the next visit." : "We use necessary local storage to remember this choice. Optional analytics is loaded only if you allow it. Advertising technology is not active in this version, but the choice is saved for a future, disclosed activation."} <Link href="/privacy">Read the privacy notice</Link>.</p></div>{isSettings && <button className="cookie-close" type="button" aria-label="Close cookie preferences" onClick={closeSettings}><X size={18} /></button>}</div>
      {!expanded && !isSettings ? <div className="cookie-actions"><button className="cookie-primary" type="button" onClick={() => onSave(true, true)}>Accept optional cookies</button><button className="cookie-secondary" type="button" onClick={() => onSave(false, false)}>Reject optional</button><button className="cookie-text-button" type="button" onClick={() => setExpanded(true)}>Manage choices <ChevronDown size={14} /></button></div> : <div className="cookie-preferences"><h3>Choose by purpose</h3><p>Necessary storage is always on because it records your decision. Optional choices are off until you save them.</p><CookieOption label="Necessary preferences" detail="Stores your consent choice in this browser for up to 180 days." enabled disabled onToggle={() => undefined} /><CookieOption label="Analytics" detail="Loads the site’s usage measurement script after you agree, to help understand pages and navigation." enabled={draft.analytics} onToggle={() => setDraft(item => ({ ...item, analytics: !item.analytics }))} /><CookieOption label="Advertising" detail="Reserved for disclosed Google advertising and related measurement if the publisher enables them later." enabled={draft.advertising} onToggle={() => setDraft(item => ({ ...item, advertising: !item.advertising }))} /><div className="cookie-actions"><button className="cookie-primary" type="button" onClick={() => onSave(draft.analytics, draft.advertising)}><Check size={15} /> Save choices</button><button className="cookie-secondary" type="button" onClick={() => onSave(false, false)}>Reject optional</button></div></div>}
    </div>
  </aside>;
}

function CookieOption({ label, detail, enabled, disabled = false, onToggle }: { label: string; detail: string; enabled: boolean; disabled?: boolean; onToggle: () => void }) {
  return <div className="cookie-option"><button className={enabled ? "cookie-switch active" : "cookie-switch"} type="button" aria-pressed={enabled} aria-label={`${label}: ${enabled ? "enabled" : "disabled"}`} disabled={disabled} onClick={onToggle}>{enabled && <Check size={13} />}</button><div><strong>{label}</strong><span>{detail}</span></div></div>;
}
