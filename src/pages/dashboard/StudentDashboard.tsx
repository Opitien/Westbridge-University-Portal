import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, ClipboardList, CreditCard, Calendar, TrendingUp, Clock } from "lucide-react";

const stats = [
  { label: "Registered Courses", value: "6", icon: BookOpen, color: "text-accent" },
  { label: "Current CGPA", value: "3.65", icon: TrendingUp, color: "text-green-500" },
  { label: "Pending Assignments", value: "3", icon: ClipboardList, color: "text-orange-500" },
  { label: "Outstanding Fees", value: "₦45,000", icon: CreditCard, color: "text-destructive" },
];

const upcomingClasses = [
  { course: "CSC 301 — Data Structures", time: "9:00 AM", room: "LT-5" },
  { course: "MTH 201 — Linear Algebra", time: "11:00 AM", room: "LT-2" },
  { course: "CSC 305 — Operating Systems", time: "2:00 PM", room: "Lab A" },
];

const announcements = [
  { title: "Mid-semester exams begin March 15", date: "Mar 8, 2026" },
  { title: "Course registration deadline extended", date: "Mar 5, 2026" },
  { title: "Library hours updated for exam period", date: "Mar 3, 2026" },
];

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Welcome, {user?.user_metadata?.full_name?.split(" ")[0] || "Student"} 👋
        </h1>
        <p className="font-body text-muted-foreground text-sm">Here's your academic overview for this semester.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-card border border-border rounded-xl shadow-soft">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" />
            <h3 className="font-display text-base font-bold text-foreground">Today's Classes</h3>
          </div>
          <ul className="divide-y divide-border">
            {upcomingClasses.map(cls => (
              <li key={cls.course} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-body text-sm font-medium text-foreground">{cls.course}</p>
                  <p className="font-body text-xs text-muted-foreground">{cls.room}</p>
                </div>
                <span className="font-body text-xs font-semibold text-accent flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {cls.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Announcements */}
        <div className="bg-card border border-border rounded-xl shadow-soft">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display text-base font-bold text-foreground">📢 Announcements</h3>
          </div>
          <ul className="divide-y divide-border">
            {announcements.map(a => (
              <li key={a.title} className="px-5 py-3">
                <p className="font-body text-sm font-medium text-foreground">{a.title}</p>
                <p className="font-body text-xs text-muted-foreground">{a.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
