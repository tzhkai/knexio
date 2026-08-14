/** Style note: Field Notes for Better Work — every route uses the same reading-first shell and an obvious escape route. */
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Guides from "@/pages/Guides";
import GuideDetail from "@/pages/GuideDetail";
import NotFound from "@/pages/NotFound";
import { About, Contact, EditorialPolicy, Privacy } from "@/pages/InfoPages";
function Router() { return <Switch><Route path="/" component={Home} /><Route path="/guides" component={Guides} /><Route path="/guides/:slug" component={GuideDetail} /><Route path="/about" component={About} /><Route path="/editorial-policy" component={EditorialPolicy} /><Route path="/privacy" component={Privacy} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch>; }
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
