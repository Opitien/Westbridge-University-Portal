import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, AppRole } from "@/contexts/AuthContext";
import {
  LayoutDashboard, User, BookOpen, ClipboardList, FileText, Calendar,
  CreditCard, MessageSquare, LogOut, Menu, X, GraduationCap,
  Users, Settings, BarChart3, Building2, Bell, Library, Home as HomeIcon
} from "lucide-react";
import universityCrest from "@/assets/university-crest.png";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const studentNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", path: "/dashboard/profile", icon: User },
  { label: "Courses", path: "/dashboard/courses", icon: BookOpen },
  { label: "Results", path: "/dashboard/results", icon: ClipboardList },
  { label: "Assignments", path: "/dashboard/assignments", icon: FileText },
  { label: "Timetable", path: "/dashboard/timetable", icon: Calendar },
  { label: "Fees", path: "/dashboard/fees", icon: CreditCard },
  { label: "Messages", path: "/dashboard/messages", icon: MessageSquare },
];

const lecturerNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", path: "/dashboard/courses", icon: BookOpen },
  { label: "Assignments", path: "/dashboard/assignments", icon: FileText },
  { label: "Grading", path: "/dashboard/grading", icon: ClipboardList },
  { label: "Attendance", path: "/dashboard/attendance", icon: Calendar },
  { label: "Messages", path: "/dashboard/messages", icon: MessageSquare },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Students", path: "/dashboard/students", icon: Users },
  { label: "Lecturers", path: "/dashboard/lecturers", icon: GraduationCap },
  { label: "Departments", path: "/dashboard/departments", icon: Building2 },
  { label: "Courses", path: "/dashboard/courses", icon: BookOpen },
  { label: "Admissions", path: "/dashboard/admissions", icon: ClipboardList },
  { label: "Fees", path: "/dashboard/fees", icon: CreditCard },
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

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src={universityCrest} alt="Logo" className="h-8 w-8" />
              <span className="font-display text-sm font-bold text-sidebar-foreground">Grand University</span>
            </Link>
            <button className="lg:hidden text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 py-3 border-b border-sidebar-border">
            <p className="font-body text-xs text-sidebar-foreground/60">Signed in as</p>
            <p className="font-body text-sm font-semibold text-sidebar-foreground truncate">
              {user?.user_metadata?.full_name || user?.email}
            </p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-body font-semibold bg-sidebar-primary text-sidebar-primary-foreground">
              {getRoleLabel(role)}
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-sidebar-border space-y-1">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <HomeIcon className="h-4 w-4" /> Public Website
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between lg:px-6">
          <button className="lg:hidden p-2 text-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="font-display text-lg font-bold text-foreground">
            {navItems.find(i => i.path === location.pathname)?.label || "Dashboard"}
          </h2>
          <div className="flex items-center gap-3">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
