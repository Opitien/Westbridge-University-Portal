import { useAuth } from "@/contexts/AuthContext";
import StudentDashboard from "./StudentDashboard";
import LecturerDashboard from "./LecturerDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardRouter() {
  const { role } = useAuth();

  switch (role) {
    case "lecturer":
      return <LecturerDashboard />;
    case "admin":
    case "dept_admin":
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
}
