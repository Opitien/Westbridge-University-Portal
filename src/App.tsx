import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import FacultiesPage from "./pages/FacultiesPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import ResearchPage from "./pages/ResearchPage";
import CampusLifePage from "./pages/CampusLifePage";
import EventsPage from "./pages/EventsPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import GalleryPage from "./pages/GalleryPage";
import DownloadsPage from "./pages/DownloadsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFound from "./pages/NotFound";

import DashboardRouter from "./pages/dashboard/DashboardRouter";
import ProfilePage from "./pages/dashboard/ProfilePage";
import CoursesPage from "./pages/dashboard/CoursesPage";
import ResultsPage from "./pages/dashboard/ResultsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faculties" element={<FacultiesPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/campus-life" element={<CampusLifePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/portal" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Protected dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout><DashboardRouter /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout><ProfilePage /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/courses"
              element={
                <ProtectedRoute>
                  <DashboardLayout><CoursesPage /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/results"
              element={
                <ProtectedRoute>
                  <DashboardLayout><ResultsPage /></DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
