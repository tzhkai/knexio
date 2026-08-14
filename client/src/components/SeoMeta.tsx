/** Style note: Field Notes for Better Work — metadata stays precise, useful, and free of hype. */
import { useEffect } from "react";
const fieldNoteRefinements = `
  .brand-name { position:relative; padding-left:10px; }
  .brand-name::before { content:""; position:absolute; top:1px; bottom:1px; left:0; width:1px; background:var(--green); }
  .brand-name::after { content:"W—L"; position:absolute; bottom:-10px; left:10px; color:var(--green); font-family:"Manrope",Arial,sans-serif; font-size:6px; font-weight:800; letter-spacing:.1em; line-height:1; }
  .meta-dot { color:var(--green); opacity:.5; }
  .guide-card-trust { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:11px; padding:6px 0; border-top:1px solid rgba(32,33,30,.14); border-bottom:1px solid rgba(32,33,30,.14); color:var(--muted-ink); font-size:8px; font-weight:800; letter-spacing:.08em; line-height:1.1; text-transform:uppercase; }
  .guide-card-trust span:first-child { color:var(--green); }
  .guide-card .guide-boundary { display:grid; grid-template-columns:56px 1fr; gap:8px; margin-top:17px; padding:10px 0 0; border-top:1px dashed rgba(32,33,30,.18); color:#66685f; font-size:10px; line-height:1.5; }
  .guide-boundary strong { color:var(--rust); font-size:8px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
  .guide-card-foot { padding-top:19px; }
  .library-hero,.info-hero,.policy-hero { position:relative; }
  .library-hero::after,.info-hero::after,.policy-hero::after { position:absolute; top:36px; right:0; max-width:160px; color:var(--green); border-left:1px solid var(--green); font-size:8px; font-weight:800; letter-spacing:.11em; line-height:1.65; text-transform:uppercase; writing-mode:vertical-rl; }
  .library-hero::after { content:"REFERENCE TRACK / LIBRARY INDEX / 06 REVIEWED GUIDES"; }
  .info-hero::after { content:"REFERENCE TRACK / PUBLISHER FILE / 01 PURPOSE + SCOPE"; }
  .policy-hero::after { content:"REFERENCE TRACK / EDITORIAL FILE / 03 STANDARDS + LIMITS"; }
  .about-disclosure { position:relative; }
  .about-disclosure::before { content:"FIELD NOTE / WHO + HOW + WHY"; position:absolute; top:86px; left:-42px; color:var(--rust); font-size:8px; font-weight:800; letter-spacing:.11em; writing-mode:vertical-rl; }
  @media (max-width:960px) { .library-hero::after,.info-hero::after,.policy-hero::after,.about-disclosure::before { display:none; } }
`;
export function SeoMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | Workflow Library`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
    const pageUrl = `${window.location.origin}${window.location.pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = pageUrl;
    let schema = document.querySelector("#workflow-library-page-schema") as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "workflow-library-page-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: pageUrl,
      isPartOf: { "@type": "WebSite", name: "Workflow Library", url: window.location.origin },
    });
  }, [title, description]);
  return <style>{fieldNoteRefinements}</style>;
}
