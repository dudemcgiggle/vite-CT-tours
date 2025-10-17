import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import LighthouseTours from "@/pages/LighthouseTours";
import Reviews from "@/pages/Reviews";
import SpaceForceMuseum from "@/pages/SpaceForceMuseum";
import AvailabilityDashboard from "@/pages/AvailabilityDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lighthouse-tours" component={LighthouseTours} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/space-force-museum" component={SpaceForceMuseum} />
      <Route path="/availability" component={AvailabilityDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
