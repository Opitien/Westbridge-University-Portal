import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, AppRole } from "@/contexts/AuthContext";
import {
  LayoutDashboard, User, BookOpen, ClipboardList, FileText, Calendar,
  CreditCard, LogOut, Menu, X, GraduationCap,
  Users, Settings, BarChart3, Building2, Home as HomeIcon, Search, ChevronDown, Clock
} from "lucide-react";
import universityCrest from "@/assets/university-crest.png";
import { motion, AnimatePresence } from "framer-motion";
import NotificationDropdown from "@/components/NotificationDropdown";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const studentNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Courses", path: "/dashboard/courses", icon: BookOpen },
  { label: "Timetable", path: "/dashboard/timetable", icon: Clock },
  { label: "Assignments", path: "/dashboard/assignments", icon: FileText },
  { label: "Results", path: "/dashboard/results", icon: ClipboardList },
  { label: "Fees", path: "/dashboard/fees", icon: CreditCard },
  { label: "Profile", path: "/dashboard/profile", icon: User },
];

const lecturerNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", path: "/dashboard/courses", icon: BookOpen },
  { label: "Timetable", path: "/dashboard/timetable", icon: Clock },
  { label: "Assignments", path: "/dashboard/assignments", icon: FileText },
  { label: "Grading", path: "/dashboard/grading", icon: ClipboardList },
  { label: "Attendance", path: "/dashboard/attendance", icon: Calendar },
  { label: "Profile", path: "/dashboard/profile", icon: User },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Students", path: "/dashboard/students", icon: Users },
  { label: "Lecturers", path: "/dashboard/lecturers", icon: GraduationCap },
  { label: "Departments", path: "/dashboard/departments", icon: Building2 },
  { label: "Courses", path: "/dashboard/courses", icon: BookOpen },
  { label: "Admissions", path: "/dashboard/admissions", icon: ClipboardList },
  { label: "Fee Management", path: "/dashboard/fee-management", icon: CreditCard },
  { label: "Reports", path: "/dashboard/reports", icon: BarChart3 },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
];

function getNavForRole(role: AppRole | null): NavItem[] {
  switch (role) {
    case "lecturer": return lecturerNav;
    case "admin":
    case "dept_admin": return adminNav;
    default: return studentNav;
  }
}

function getRoleLabel(role: AppRole | null): string {
  switch (role) {
    case "lecturer": return "Lecturer";
    case "admin": return "Administrator";
    case "dept_admin": return "Dept. Admin";
    default: return "Student";
  }
}

function getRoleBadgeColor(role: AppRole | null): string {
  switch (role) {
    case "lecturer": return "bg-secondary/20 text-secondary";
    case "admin": return "bg-accent/20 text-accent";
    case "dept_admin": return "bg-accent/20 text-accent";
    default: return "bg-success/20 text-success";
  }
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, role, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = getNavForRole(role);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const currentPage = navItems.find(i => i.path === location.pathname)?.label || "Dashboard";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-sidebar text-sidebar-foreground transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-[70px] px-5 flex items-center justify-between border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={universityCrest} alt="Logo" className="h-8 w-8" />
            <div>
              <p className="font-heading text-sm font-bold text-sidebar-foreground leading-tight">Westbridge</p>
              <p className="text-[10px] text-sidebar-muted tracking-wider uppercase">University Portal</p>
            </div>
          </Link>
          <button className="lg:hidden text-sidebar-muted hover:text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-border/50"
                }`}
              >
                <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-border/50 transition-colors"
          >
            <HomeIcon className="h-[18px] w-[18px]" /> Public Website
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-[18px] w-[18px]" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top navigation bar */}
        <header className="sticky top-0 z-30 h-[70px] bg-card border-b border-border px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="font-display text-lg font-semibold text-foreground">{currentPage}</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-sm w-64">
              <Search className="h-4 w-4" />
              <span className="text-muted-foreground/60">Search...</span>
            </div>
            {/* Notifications */}
            <NotificationDropdown />
            {/* User pill */}
            <div className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg bg-muted">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-foreground leading-tight truncate max-w-[120px]">
                  {user?.user_metadata?.full_name || "User"}
                </p>
                <span className={`inline-block px-1.5 py-0 rounded text-[10px] font-semibold ${getRoleBadgeColor(role)}`}>
                  {getRoleLabel(role)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
