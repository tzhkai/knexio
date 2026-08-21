/** Style note: Field Notes for Better Work — metadata stays precise, useful, and free of hype. */
import { useEffect } from "react";
import { heroImage } from "@/lib/content";
type JsonLd = Record<string, unknown> | Record<string, unknown>[];
type SchemaContext = { origin: string; pageUrl: string };
type SeoMetaProps = {
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  schema?: (context: SchemaContext) => JsonLd;
};
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
  .site-breadcrumb { width:min(1170px,calc(100% - 48px)); margin:0 auto; padding:18px 0 0; } .site-breadcrumb-list { gap:7px; color:#6d7168; font-family:"Manrope",Arial,sans-serif; font-size:9px; font-weight:800; letter-spacing:.055em; line-height:1.35; text-transform:uppercase; } .site-breadcrumb-list a { color:var(--green); text-decoration:none; } .site-breadcrumb-list a:hover { text-decoration:underline; text-underline-offset:3px; } .site-breadcrumb-list [data-slot="breadcrumb-page"] { max-width:265px; overflow:hidden; color:#6d7168; text-overflow:ellipsis; white-space:nowrap; } .site-breadcrumb-compact { width:auto; margin:0; padding:0; } .site-breadcrumb-compact .site-breadcrumb-list { font-size:8px; }
  @media (max-width:760px) { .library-topic-index { grid-template-columns:1fr; gap:7px; width:min(100% - 28px,760px); } .site-breadcrumb { width:min(100% - 28px,760px); padding-top:13px; } .site-breadcrumb-list { gap:5px; font-size:8px; } .site-breadcrumb-list [data-slot="breadcrumb-page"] { max-width:154px; } }
  @media (max-width:960px) { .library-hero::after,.info-hero::after,.policy-hero::after,.about-disclosure::before { display:none; } }
`;
function upsertMeta(attribute: "name" | "property", key: string, value: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
  element.content = value;
}

function removeMeta(attribute: "name" | "property", key: string) {
  document.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

function syncMeta(attribute: "name" | "property", key: string, value?: string) {
  if (value) upsertMeta(attribute, key, value);
  else removeMeta(attribute, key);
}

export function SeoMeta({ title, description, type = "website", image = heroImage, imageAlt = "Workflow Library field guide for practical AI workflows", noIndex = false, publishedTime, modifiedTime, section, tags = [], schema }: SeoMetaProps) {
  useEffect(() => {
    document.title = title.endsWith("| Workflow Library") ? title : `${title} | Workflow Library`;
    const origin = window.location.origin;
    const pathname = window.location.pathname === "/" ? "/" : `${window.location.pathname.replace(/\/$/, "")}/`;
    const pageUrl = `${origin}${pathname}`;
    const imageUrl = image.startsWith("http") ? image : `${origin}${image}`;
    upsertMeta("name", "description", description);
    upsertMeta("name", "author", "Knexio");
    upsertMeta("name", "theme-color", "#f4f0e8");
    upsertMeta("name", "robots", noIndex ? "noindex,follow" : "index,follow");
    upsertMeta("name", "googlebot", noIndex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:site_name", "Workflow Library");
    upsertMeta("property", "og:locale", "en_US");
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:secure_url", imageUrl);
    upsertMeta("property", "og:image:alt", imageAlt);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertMeta("name", "twitter:image:alt", imageAlt);
    syncMeta("property", "article:published_time", type === "article" ? publishedTime : undefined);
    syncMeta("property", "article:modified_time", type === "article" ? modifiedTime : undefined);
    syncMeta("property", "article:section", type === "article" ? section : undefined);
    document.querySelectorAll('meta[property="article:tag"]').forEach(element => element.remove());
    if (type === "article") tags.forEach(tag => {
      const tagMeta = document.createElement("meta");
      tagMeta.setAttribute("property", "article:tag");
      tagMeta.content = tag;
      document.head.appendChild(tagMeta);
    });
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
  }, [title, description, type, image, imageAlt, noIndex, publishedTime, modifiedTime, section, tags, schema]);
  return <style>{fieldNoteRefinements}</style>;
}
