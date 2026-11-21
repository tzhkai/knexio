/** Routes for the electricity reference: one hub, 53 areas, 6 housing types, 324 combinations, calculator, method. */
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import { CookieConsentProvider } from "@/components/CookieConsent";

const AverageBillHub = lazy(() => import("@/pages/electricity/AverageBillHub"));
const AverageBillAreaOrSegment = lazy(() => import("@/pages/electricity/AverageBillDetail"));
const SegmentStateBill = lazy(() => import("@/pages/electricity/SegmentState"));
const ElectricityCostCalculator = lazy(() => import("@/pages/electricity/Calculator"));
const Methodology = lazy(() => import("@/pages/electricity/Methodology"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const About = lazy(() => import("@/pages/InfoPages").then((module) => ({ default: module.About })));
const Contact = lazy(() => import("@/pages/InfoPages").then((module) => ({ default: module.Contact })));
const EditorialPolicy = lazy(() => import("@/pages/InfoPages").then((module) => ({ default: module.EditorialPolicy })));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));

function Router() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-[60vh] place-items-center px-6 font-serif text-[23px] text-[#176b5b]" role="status" aria-live="polite">
          Loading the electricity reference…
        </main>
      }
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/average-electric-bill/" component={AverageBillHub} />
        <Route path="/average-electric-bill" component={AverageBillHub} />
        <Route path="/average-electric-bill/:segment/:state" component={SegmentStateBill} />
        <Route path="/average-electric-bill/:slug" component={AverageBillAreaOrSegment} />
        <Route path="/electricity-cost-calculator/" component={ElectricityCostCalculator} />
        <Route path="/electricity-cost-calculator" component={ElectricityCostCalculator} />
        <Route path="/methodology/" component={Methodology} />
        <Route path="/methodology" component={Methodology} />
        <Route path="/about" component={About} />
        <Route path="/editorial-policy" component={EditorialPolicy} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CookieConsentProvider>
          <Router />
        </CookieConsentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
