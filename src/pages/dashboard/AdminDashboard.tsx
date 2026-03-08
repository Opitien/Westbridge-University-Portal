import { useAuth } from "@/contexts/AuthContext";
import { Users, GraduationCap, BookOpen, Building2, CreditCard, BarChart3 } from "lucide-react";

const stats = [
  { label: "Total Students", value: "3,245", icon: Users, color: "text-accent" },
  { label: "Total Lecturers", value: "186", icon: GraduationCap, color: "text-blue-500" },
  { label: "Active Courses", value: "124", icon: BookOpen, color: "text-green-500" },
  { label: "Departments", value: "18", icon: Building2, color: "text-purple-500" },
  { label: "Revenue (Tuition)", value: "₦48.2M", icon: CreditCard, color: "text-accent" },
  { label: "Pending Admissions", value: "412", icon: BarChart3, color: "text-orange-500" },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="font-body text-muted-foreground text-sm">University management overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 shadow-soft">
            <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <h3 className="font-display text-base font-bold text-foreground mb-4">Quick Actions</h3>
        <p className="font-body text-sm text-muted-foreground">Student management, admissions, and reporting features coming soon.</p>
      </div>
    </div>
  );
}
