import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import RegulatoryFeed from "./pages/RegulatoryFeed";
import FleetManagement from "./pages/FleetManagement";
import WorkOrders from "./pages/WorkOrders";
import Approvals from "./pages/Approvals";
import AuditPackages from "./pages/AuditPackages";
import ChatAssistant from "./pages/ChatAssistant";
import AgentMonitor from "./pages/AgentMonitor";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/regulatory" element={<RegulatoryFeed />} />
            <Route path="/fleet" element={<FleetManagement />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/audit" element={<AuditPackages />} />
            <Route path="/chat" element={<ChatAssistant />} />
            <Route path="/agents" element={<AgentMonitor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
