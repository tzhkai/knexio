/** Style note: Field Notes for Better Work — a quiet reading control that appears only after the reader has earned it. */
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookieConsent } from "@/components/CookieConsent";

const backToTopStyles = `
  .back-to-top { position:fixed; right:24px; bottom:24px; z-index:80; display:grid; width:44px; height:44px; place-items:center; border:1px solid var(--green); border-radius:50%; background:#fffdf8; color:var(--green); box-shadow:0 10px 24px rgba(23,107,91,.16); opacity:0; pointer-events:none; transform:translateY(10px); transition:opacity 180ms var(--ease-out),transform 180ms var(--ease-out),background 180ms var(--ease-out),color 180ms var(--ease-out); } .back-to-top.visible { opacity:1; pointer-events:auto; transform:translateY(0); } .back-to-top:hover { background:var(--green); color:#fffdf8; } .back-to-top:active { transform:scale(.96); } .back-to-top:focus-visible { outline:2px solid var(--rust); outline-offset:3px; } @media (max-width:760px) { .back-to-top { right:14px; bottom:max(14px,env(safe-area-inset-bottom)); width:42px; height:42px; } } @media (prefers-reduced-motion: reduce) { .back-to-top { transition:none; } }
`;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { consent } = useCookieConsent();
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  if (!consent) return null;
  const returnToTop = () => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };
  return <><style>{backToTopStyles}</style><button className={visible ? "back-to-top visible" : "back-to-top"} type="button" onClick={returnToTop} aria-label="Return to the top of this guide" title="Back to top"><ArrowUp size={18} aria-hidden="true" /></button></>;
}
