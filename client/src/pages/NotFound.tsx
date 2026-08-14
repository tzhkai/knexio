/** Style note: Field Notes for Better Work — a missing page still offers a composed, useful return path. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SeoMeta } from "@/components/SeoMeta";
export default function NotFound() { return <Layout><SeoMeta title="Page not found" description="This page is not in the Workflow Library index." noIndex /><section className="not-found-wrap"><span className="eyebrow">Index mismatch</span><h1>This page is not in the library.</h1><p>The link may have moved, or the guide has not been filed here yet.</p><Link href="/guides" className="primary-button">Browse the guide library <ArrowUpRight size={17} /></Link></section></Layout>; }
