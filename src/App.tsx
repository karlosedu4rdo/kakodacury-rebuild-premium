import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PropertiesProvider } from "./contexts/PropertiesContext";
import { BannersProvider } from "./contexts/BannersContext";
import { LeadsProvider } from "./contexts/LeadsContext";
import { WhatsAppButton } from "./components/WhatsAppButton";
import Index from "./pages/Index";
import Imoveis from "./pages/Imoveis";
import Indicacao from "./pages/Indicacao";
import Contato from "./pages/Contato";
import Sobre from "./pages/Sobre";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LeadsProvider>
        <PropertiesProvider>
          <BannersProvider>
            <Toaster />
            <Sonner />
            <WhatsAppButton />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/imoveis" element={<Imoveis />} />
              <Route path="/indicacao" element={<Indicacao />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
          </BannersProvider>
        </PropertiesProvider>
      </LeadsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
