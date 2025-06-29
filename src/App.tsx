
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignupSender from "./pages/SignupSender";
import SignupRunner from "./pages/SignupRunner";
import LoginSender from "./pages/LoginSender";
import LoginRunner from "./pages/LoginRunner";
import DashboardSender from "./pages/DashboardSender";
import DashboardRunner from "./pages/DashboardRunner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup-sender" element={<SignupSender />} />
          <Route path="/signup-runner" element={<SignupRunner />} />
          <Route path="/login-sender" element={<LoginSender />} />
          <Route path="/login-runner" element={<LoginRunner />} />
          <Route path="/dashboard-sender" element={<DashboardSender />} />
          <Route path="/dashboard-runner" element={<DashboardRunner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
