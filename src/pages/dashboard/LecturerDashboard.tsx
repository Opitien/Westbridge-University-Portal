import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Users, ClipboardList, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function LecturerDashboard() {
  const { user } = useAuth();

  const { data: courses = [] } = useQuery({
    queryKey: ["lecturer-courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*").eq("lecturer_id", user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: assignments = [] } = useQuery({
    queryKey: ["lecturer-assignments"],
    queryFn: async () => {
      const { data } = await supabase.from("assignments").select("*, courses(code, title)").eq("created_by", user!.id).order("due_date", { ascending: true });
      return data || [];
    },
    enabled: !!user,
  });

  const stats = [
    { label: "Courses Teaching", value: String(courses.length), icon: BookOpen, color: "text-secondary", bgColor: "bg-secondary/10", to: "/dashboard/courses" },
    { label: "Active Assignments", value: String(assignments.length), icon: FileText, color: "text-accent", bgColor: "bg-accent/10", to: "/dashboard/assignments" },
    { label: "Grading", value: "—", icon: ClipboardList, color: "text-success", bgColor: "bg-success/10", to: "/dashboard/grading" },
    { label: "Attendance", value: "—", icon: Calendar, color: "text-primary", bgColor: "bg-primary/10", to: "/dashboard/attendance" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome, {user?.user_metadata?.full_name?.split(" ")[0] || "Lecturer"} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your courses and student activities.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Link key={stat.label} to={stat.to} className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-soft transition-shadow">
            <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <div className="bg-card border border-border rounded-xl shadow-card">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-secondary" /> My Courses
            </h3>
          </div>
          <ul className="divide-y divide-border">
            {courses.length > 0 ? courses.map((c: any) => (
              <li key={c.id} className="px-5 py-3">
                <p className="text-sm font-medium text-foreground">{c.code} — {c.title}</p>
                <p className="text-xs text-muted-foreground">{c.credits} credits · {c.semester}</p>
              </li>
            )) : (
              <li className="px-5 py-8 text-center text-sm text-muted-foreground">No courses assigned yet.</li>
            )}
          </ul>
        </div>

        {/* Recent Assignments */}
        <div className="bg-card border border-border rounded-xl shadow-card">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" /> Recent Assignments
            </h3>
            <Link to="/dashboard/assignments" className="text-xs text-secondary hover:underline">Manage</Link>
          </div>
          <ul className="divide-y divide-border">
            {assignments.length > 0 ? assignments.slice(0, 5).map((a: any) => (
              <li key={a.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.courses?.code}</p>
                </div>
                <span className="text-xs text-accent">{new Date(a.due_date).toLocaleDateString()}</span>
              </li>
            )) : (
              <li className="px-5 py-8 text-center text-sm text-muted-foreground">No assignments created yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
