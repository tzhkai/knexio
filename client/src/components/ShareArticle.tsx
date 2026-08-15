/** Style note: Field Notes for Better Work — sharing is a compact distribution record, never a noisy social widget. */
import { Check, Copy, Linkedin, Mail, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ShareArticleProps = { title: string; description: string; path: string };

const shareStyles = `
  .share-record { display:grid; grid-template-columns:138px minmax(0,1fr); gap:20px; margin:25px 0 30px; padding:16px 0; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); } .share-record-label { color:var(--green); font-size:9px; font-weight:800; letter-spacing:.1em; line-height:1.4; text-transform:uppercase; } .share-record-label span { display:block; margin-top:3px; color:#7a7b73; font-size:9px; font-weight:700; letter-spacing:.06em; } .share-actions { display:flex; flex-wrap:wrap; gap:7px; align-items:center; } .share-button { display:inline-flex; align-items:center; gap:6px; min-height:32px; padding:0 10px; border:1px solid var(--rule); background:#fffdf8; color:var(--green-deep); font-size:10px; font-weight:800; letter-spacing:.025em; line-height:1; transition:background 160ms var(--ease-out),color 160ms var(--ease-out),border-color 160ms var(--ease-out),transform 160ms var(--ease-out); } .share-button:hover { border-color:var(--green); background:var(--green-pale); } .share-button:active { transform:scale(.97); } .share-button-primary { border-color:var(--green); background:var(--green); color:#fffdf8; } .share-button-primary:hover { background:var(--green-deep); color:#fffdf8; } .share-native { display:none; } .share-status { min-height:14px; margin:8px 0 0; color:#68756d; font-size:10px; line-height:1.45; } @media (max-width:760px) { .share-record { grid-template-columns:1fr; gap:10px; margin:18px 0 23px; padding:14px 0; } .share-record-label { display:flex; gap:8px; align-items:baseline; } .share-record-label span { display:inline; margin:0; } .share-actions { gap:6px; } .share-button { min-height:34px; padding:0 9px; } .share-native { display:inline-flex; } .share-status { margin-top:5px; } }
`;

export default function ShareArticle({ title, description, path }: ShareArticleProps) {
  const [copied, setCopied] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [nativeShareAvailable, setNativeShareAvailable] = useState(false);
  const url = useMemo(() => typeof window === "undefined" ? path : new URL(path, window.location.origin).toString(), [path]);
  useEffect(() => setNativeShareAvailable(typeof navigator !== "undefined" && typeof navigator.share === "function"), []);
  const text = `${title} — ${description}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true); setShareMessage("Link copied. Ready to paste anywhere.");
      window.setTimeout(() => { setCopied(false); setShareMessage(""); }, 2200);
    } catch {
      setShareMessage("Could not copy automatically. Select the page address to share it.");
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, text: description, url });
      setShareMessage("Share sheet opened.");
      window.setTimeout(() => setShareMessage(""), 2200);
    } catch {
      setShareMessage("");
    }
  }

  return <section className="share-record" aria-labelledby="share-record-title"><style>{shareStyles}</style><div className="share-record-label" id="share-record-title">Pass it on<span>No scripts. No tracking.</span></div><div><div className="share-actions"><button className="share-button share-button-primary" type="button" onClick={copyLink}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy link"}</button><a className="share-button" href={xHref} target="_blank" rel="noreferrer" aria-label={`Share ${title} on X`}><span aria-hidden="true">X</span> X</a><a className="share-button" href={linkedInHref} target="_blank" rel="noreferrer" aria-label={`Share ${title} on LinkedIn`}><Linkedin size={14} /> LinkedIn</a><a className="share-button" href={mailHref} aria-label={`Share ${title} by email`}><Mail size={14} /> Email</a>{nativeShareAvailable && <button className="share-button share-native" type="button" onClick={nativeShare}><Share2 size={14} /> Share</button>}</div><p className="share-status" role="status" aria-live="polite">{shareMessage}</p></div></section>;
}
