import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Users, ClipboardList, FileText } from "lucide-react";

const stats = [
  { label: "Courses Teaching", value: "4", icon: BookOpen, color: "text-accent" },
  { label: "Total Students", value: "182", icon: Users, color: "text-blue-500" },
  { label: "Pending Grading", value: "12", icon: ClipboardList, color: "text-orange-500" },
  { label: "Assignments Created", value: "8", icon: FileText, color: "text-green-500" },
];

export default function LecturerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Welcome, {user?.user_metadata?.full_name?.split(" ")[0] || "Lecturer"} 👋
        </h1>
        <p className="font-body text-muted-foreground text-sm">Manage your courses and student activities.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 shadow-soft">
            <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <h3 className="font-display text-base font-bold text-foreground mb-4">Recent Activity</h3>
        <p className="font-body text-sm text-muted-foreground">Your course management features will appear here once courses are set up.</p>
      </div>
    </div>
  );
}
