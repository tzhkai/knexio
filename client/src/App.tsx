/** Style note: Field Notes for Better Work — every route uses the same reading-first shell and an obvious escape route. */
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import { CookieConsentProvider } from "@/components/CookieConsent";
const Guides = lazy(() => import("@/pages/Guides"));
const GuideDetail = lazy(() => import("@/pages/GuideDetail"));
const TopicPage = lazy(() => import("@/pages/TopicPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const About = lazy(() => import("@/pages/InfoPages").then(module => ({ default: module.About })));
const Contact = lazy(() => import("@/pages/InfoPages").then(module => ({ default: module.Contact })));
const EditorialPolicy = lazy(() => import("@/pages/InfoPages").then(module => ({ default: module.EditorialPolicy })));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
function Router() { return <Suspense fallback={<main className="grid min-h-[60vh] place-items-center px-6 font-serif text-[23px] text-[#176b5b]" role="status" aria-live="polite">Opening the field guide…</main>}><Switch><Route path="/" component={Home} /><Route path="/guides" component={Guides} /><Route path="/guides/:slug" component={GuideDetail} /><Route path="/workflows/:topic" component={TopicPage} /><Route path="/about" component={About} /><Route path="/editorial-policy" component={EditorialPolicy} /><Route path="/privacy" component={Privacy} /><Route path="/terms" component={Terms} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></Suspense>; }
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><CookieConsentProvider><Router /></CookieConsentProvider></ThemeProvider></ErrorBoundary>; }
