/** Style note: Field Notes for Better Work — a warm editorial shell with a reading-first, asymmetric cadence. */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCookieConsent } from "@/components/CookieConsent";

const navItems = [{ href: "/guides", label: "Library" }, { href: "/guides/brief-first-prompt-pattern", label: "Start here" }, { href: "/editorial-policy", label: "Method" }, { href: "/about", label: "About" }];
const active = (path: string, href: string) => href === "/guides" ? path === href : path === href;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation(); const [open, setOpen] = useState(false);
  const { openSettings } = useCookieConsent();
  return <div className="site-shell">
    <header className="site-header"><div className="header-inner">
      <Link href="/" className="brand-lockup" aria-label="Workflow Library home"><img className="brand-mark" src="/manus-storage/workflow-library-mark_89833f8a.png" alt="" /><span className="brand-name">Workflow<br />Library</span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(item => <Link key={item.href} href={item.href} className={active(location, item.href) ? "nav-link active" : "nav-link"}>{item.label}</Link>)}</nav>
      <Link href="/guides" className="header-cta">Browse guides <ArrowUpRight size={14} /></Link>
      <button className="mobile-menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(item => <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/guides" className="mobile-nav-link mobile-nav-cta" onClick={() => setOpen(false)}>Browse all guides <ArrowUpRight size={15} /></Link></nav>}</header>
    <main>{children}</main>
    <footer className="site-footer"><div className="footer-top">
      <div className="footer-brand"><img className="footer-mark" src="/manus-storage/workflow-library-mark_89833f8a.png" alt="" /><p>Clearer work, one useful system at a time.</p></div>
      <div className="footer-column"><span className="footer-label">Explore</span><Link href="/guides">All guides</Link><Link href="/guides/brief-first-prompt-pattern">Start with prompts</Link><Link href="/editorial-policy">Editorial method</Link></div>
      <div className="footer-column"><span className="footer-label">Site information</span><Link href="/about">About the library</Link><Link href="/privacy">Privacy</Link><button className="footer-settings" type="button" onClick={openSettings}>Cookie settings</button><Link href="/contact">Contact</Link></div>
      <div className="footer-note"><span className="footer-label">A practical note</span><p>AI can help structure work. It cannot take responsibility for facts, decisions, or relationships.</p></div>
    </div><div className="footer-bottom"><span>© 2026 Workflow Library</span><span>Independent educational publishing project</span></div></footer>
  </div>;
}
