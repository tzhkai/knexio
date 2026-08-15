/** Style note: Field Notes for Better Work — breadcrumbs are concise index records that clarify a real path, never decorative chrome. */
import { Link } from "wouter";
import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export type Crumb = { label: string; href?: string };

export function breadcrumbListSchema(origin: string, pageUrl: string, items: Crumb[]) {
  const canonicalCrumbUrl = (href: string) => href === "/" ? `${origin}/` : `${origin}${href.replace(/\/$/, "")}/`;
  return { "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: item.href ? canonicalCrumbUrl(item.href) : pageUrl })) };
}

export default function SiteBreadcrumb({ items, compact = false }: { items: Crumb[]; compact?: boolean }) {
  return <Breadcrumb className={compact ? "site-breadcrumb site-breadcrumb-compact" : "site-breadcrumb"}><BreadcrumbList className="site-breadcrumb-list">{items.map((item, index) => <Fragment key={`${item.label}-${index}`}><BreadcrumbItem>{index < items.length - 1 && item.href ? <BreadcrumbLink asChild><Link href={item.href}>{item.label}</Link></BreadcrumbLink> : <BreadcrumbPage>{item.label}</BreadcrumbPage>}</BreadcrumbItem>{index < items.length - 1 && <BreadcrumbSeparator />}</Fragment>)}</BreadcrumbList></Breadcrumb>;
}
