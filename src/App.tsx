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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFound from "./pages/NotFound";

import DashboardRouter from "./pages/dashboard/DashboardRouter";
import ProfilePage from "./pages/dashboard/ProfilePage";
import CoursesPage from "./pages/dashboard/CoursesPage";
import ResultsPage from "./pages/dashboard/ResultsPage";
import FeesPage from "./pages/dashboard/FeesPage";
import AssignmentsPage from "./pages/dashboard/AssignmentsPage";
import GradingPage from "./pages/dashboard/GradingPage";
import AttendancePage from "./pages/dashboard/AttendancePage";
import StudentsManagementPage from "./pages/dashboard/StudentsManagementPage";
import AdmissionsManagementPage from "./pages/dashboard/AdmissionsManagementPage";
import FeeManagementPage from "./pages/dashboard/FeeManagementPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import TimetablePage from "./pages/dashboard/TimetablePage";
import LecturersManagementPage from "./pages/dashboard/LecturersManagementPage";
import DepartmentsPage from "./pages/dashboard/DepartmentsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

const queryClient = new QueryClient();

const DashboardPage = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <DashboardLayout>{children}</DashboardLayout>
  </ProtectedRoute>
);

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
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardPage><DashboardRouter /></DashboardPage>} />
            <Route path="/dashboard/profile" element={<DashboardPage><ProfilePage /></DashboardPage>} />
            <Route path="/dashboard/courses" element={<DashboardPage><CoursesPage /></DashboardPage>} />
            <Route path="/dashboard/results" element={<DashboardPage><ResultsPage /></DashboardPage>} />
            <Route path="/dashboard/fees" element={<DashboardPage><FeesPage /></DashboardPage>} />
            <Route path="/dashboard/assignments" element={<DashboardPage><AssignmentsPage /></DashboardPage>} />
            <Route path="/dashboard/grading" element={<DashboardPage><GradingPage /></DashboardPage>} />
            <Route path="/dashboard/attendance" element={<DashboardPage><AttendancePage /></DashboardPage>} />
            <Route path="/dashboard/students" element={<DashboardPage><StudentsManagementPage /></DashboardPage>} />
            <Route path="/dashboard/admissions" element={<DashboardPage><AdmissionsManagementPage /></DashboardPage>} />
            <Route path="/dashboard/fee-management" element={<DashboardPage><FeeManagementPage /></DashboardPage>} />
            <Route path="/dashboard/reports" element={<DashboardPage><ReportsPage /></DashboardPage>} />
            <Route path="/dashboard/timetable" element={<DashboardPage><TimetablePage /></DashboardPage>} />
            <Route path="/dashboard/lecturers" element={<DashboardPage><LecturersManagementPage /></DashboardPage>} />
            <Route path="/dashboard/departments" element={<DashboardPage><DepartmentsPage /></DashboardPage>} />
            <Route path="/dashboard/settings" element={<DashboardPage><SettingsPage /></DashboardPage>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
