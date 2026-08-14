/** Style note: Field Notes for Better Work — metadata stays precise, useful, and free of hype. */
import { useEffect } from "react";
type JsonLd = Record<string, unknown> | Record<string, unknown>[];
type SchemaContext = { origin: string; pageUrl: string };
type SeoMetaProps = { title: string; description: string; type?: "website" | "article"; image?: string; noIndex?: boolean; schema?: (context: SchemaContext) => JsonLd };
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
  .guide-card { position:relative; overflow:hidden; } .guide-card-no-image .guide-card-main::before { content:"WORKBENCH NOTE / SOURCE + OWNER + CHECK"; display:block; margin-bottom:18px; padding-bottom:8px; border-bottom:1px solid var(--rule); color:var(--green); font-size:8px; font-weight:800; letter-spacing:.11em; line-height:1.3; } .guide-card-no-image .guide-card-main { background:linear-gradient(135deg,rgba(255,253,248,.97),rgba(237,245,241,.55)); } .dossier-dot { display:inline-block; width:6px; height:6px; margin:0 5px 1px 0; border-radius:50%; background:var(--green); vertical-align:middle; } .guide-card-trust { position:relative; } .guide-card-trust::after { content:""; position:absolute; right:0; bottom:-1px; width:38px; height:1px; background:var(--green); } .library-topic-index { display:grid; grid-template-columns:145px minmax(0,1fr); gap:18px; width:min(1170px,calc(100% - 48px)); margin:0 auto; padding:17px 0 14px; border-bottom:1px solid var(--rule); color:var(--green); } .library-topic-index>span { padding-top:5px; font-size:9px; font-weight:800; letter-spacing:.11em; text-transform:uppercase; } .library-topic-index>div { display:flex; flex-wrap:wrap; gap:8px; } .library-topic-index a { padding:6px 9px; border-left:1px solid var(--green); color:#46665a; font-size:10px; font-weight:800; letter-spacing:.055em; text-transform:uppercase; transition:color 160ms var(--ease-out),background 160ms var(--ease-out); } .library-topic-index a:hover { background:var(--green); color:#fffdf8; }
  @media (max-width:760px) { .library-topic-index { grid-template-columns:1fr; gap:7px; width:min(100% - 28px,760px); } }
  @media (max-width:960px) { .library-hero::after,.info-hero::after,.policy-hero::after,.about-disclosure::before { display:none; } }
`;
function upsertMeta(attribute: "name" | "property", key: string, value: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
  element.content = value;
}

export function SeoMeta({ title, description, type = "website", image, noIndex = false, schema }: SeoMetaProps) {
  useEffect(() => {
    document.title = `${title} | Workflow Library`;
    const origin = window.location.origin;
    const pageUrl = `${origin}${window.location.pathname}`;
    const imageUrl = image ? (image.startsWith("http") ? image : `${origin}${image}`) : undefined;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex,follow" : "index,follow");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("name", "twitter:card", imageUrl ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    if (imageUrl) { upsertMeta("property", "og:image", imageUrl); upsertMeta("name", "twitter:image", imageUrl); }
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;
    let schemaScript = document.querySelector("#workflow-library-page-schema") as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "workflow-library-page-schema";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    const webPage: Record<string, unknown> = { "@type": "WebPage", "@id": `${pageUrl}#webpage`, name: title, description, url: pageUrl, isPartOf: { "@type": "WebSite", name: "Workflow Library", url: origin } };
    const additions = schema?.({ origin, pageUrl });
    schemaScript.text = JSON.stringify({ "@context": "https://schema.org", "@graph": [webPage, ...(additions ? (Array.isArray(additions) ? additions : [additions]) : [])] });
  }, [title, description, type, image, noIndex, schema]);
  return <style>{fieldNoteRefinements}</style>;
}
