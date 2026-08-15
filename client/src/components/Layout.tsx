/** Style note: Field Notes for Better Work — a warm editorial shell with a reading-first, asymmetric cadence. */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCookieConsent } from "@/components/CookieConsent";
import SiteBreadcrumb from "@/components/SiteBreadcrumb";

const navItems = [{ href: "/guides", label: "Library" }, { href: "/series", label: "Read in order" }, { href: "/guides/brief-first-prompt-pattern", label: "Start here" }, { href: "/editorial-policy", label: "Method" }, { href: "/about", label: "About" }];
const active = (path: string, href: string) => href === "/guides" ? path === href : path === href;
const staticPageLabels: Record<string, string> = { "/about": "About", "/editorial-policy": "Editorial method", "/contact": "Contact", "/privacy": "Privacy policy", "/terms": "Terms of use" };
const layoutRefinements = `
  main { position:relative; } .publication-imprint { position:absolute; top:18px; right:max(24px,calc((100vw - 1360px)/2)); z-index:2; display:flex; align-items:center; gap:7px; color:var(--green); font-size:8px; font-weight:800; letter-spacing:.11em; line-height:1; text-transform:uppercase; } .publication-imprint img { width:18px; height:18px; object-fit:contain; } .publication-imprint span { padding-left:7px; border-left:1px solid var(--green); }
  .library-shelves { display:grid; gap:58px; margin-top:27px; } .library-shelf { position:relative; } .library-shelf-header { display:grid; grid-template-columns:56px minmax(0,1fr) auto; align-items:end; gap:15px; padding:0 0 14px; border-bottom:1px solid var(--ink); } .library-shelf-number { color:var(--rust); font-family:"DM Serif Display",Georgia,serif; font-size:33px; letter-spacing:-.06em; line-height:.8; } .library-shelf-header h2 { margin:0; font-family:"DM Serif Display",Georgia,serif; font-size:25px; font-weight:400; letter-spacing:-.035em; line-height:1; } .library-shelf-header p { margin:4px 0 0; color:#66685f; font-size:11px; line-height:1.5; } .library-shelf-header a { display:inline-flex; align-items:center; gap:5px; color:var(--green); font-size:10px; font-weight:800; white-space:nowrap; } .library-shelf .guide-grid { margin-top:18px; }
  @media (max-width:960px) { .publication-imprint { right:18px; } } @media (max-width:620px) { .publication-imprint { top:12px; right:15px; font-size:6px; letter-spacing:.09em; } .publication-imprint img { width:14px; height:14px; } .publication-imprint span { padding-left:5px; } .library-shelves { gap:46px; margin-top:22px; } .library-shelf-header { grid-template-columns:38px minmax(0,1fr); gap:9px; padding-bottom:12px; } .library-shelf-header a { grid-column:2; margin-top:2px; } .library-shelf-number { font-size:27px; } .library-shelf-header h2 { font-size:22px; } }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation(); const [open, setOpen] = useState(false);
  const { openSettings } = useCookieConsent(); const staticPageLabel = staticPageLabels[location];
  return <div className="site-shell">
    <header className="site-header"><div className="header-inner">
      <Link href="/" className="brand-lockup" aria-label="Workflow Library home"><img className="brand-mark" src="/images/workflow-library-mark.webp" alt="" /><span className="brand-name">Workflow<br />Library</span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(item => <Link key={item.href} href={item.href} className={active(location, item.href) ? "nav-link active" : "nav-link"}>{item.label}</Link>)}</nav>
      <Link href="/guides" className="header-cta">Browse guides <ArrowUpRight size={14} /></Link>
      <button className="mobile-menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(item => <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/guides" className="mobile-nav-link mobile-nav-cta" onClick={() => setOpen(false)}>Browse all guides <ArrowUpRight size={15} /></Link></nav>}</header>
    <style>{layoutRefinements}</style><main><div className="publication-imprint" aria-hidden="true"><img src="/images/workflow-library-mark.webp" alt="" /><span>W—L / Field record</span></div>{staticPageLabel && <SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: staticPageLabel }]} />}{children}</main>
    <footer className="site-footer"><div className="footer-top">
      <div className="footer-brand"><img className="footer-mark" src="/images/workflow-library-mark.webp" alt="" /><p>Clearer work, one useful system at a time.</p></div>
      <div className="footer-column"><span className="footer-label">Explore</span><Link href="/guides">All guides</Link><Link href="/series">Read in order</Link><Link href="/guides/brief-first-prompt-pattern">Start with prompts</Link><Link href="/editorial-policy">Editorial method</Link></div>
      <div className="footer-column"><span className="footer-label">Site information</span><Link href="/about">About the library</Link><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link><button className="footer-settings" type="button" onClick={openSettings}>Cookie settings</button><Link href="/contact">Contact</Link></div>
      <div className="footer-note"><span className="footer-label">A practical note</span><p>AI can help structure work. It cannot take responsibility for facts, decisions, or relationships.</p></div>
    </div><div className="footer-bottom"><span>© 2026 Workflow Library</span><span>Independent educational publishing project</span></div></footer>
  </div>;
}
