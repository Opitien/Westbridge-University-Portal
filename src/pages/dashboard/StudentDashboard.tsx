import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ClipboardList, CreditCard, TrendingUp, Clock, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const { user } = useAuth();

  const { data: enrollments } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("*, courses(*)")
        .eq("student_id", user!.id)
        .eq("status", "registered");
      return data || [];
    },
    enabled: !!user,
  });

  const { data: results } = useQuery({
    queryKey: ["my-results"],
    queryFn: async () => {
      const { data } = await supabase
        .from("results")
        .select("*, courses(code, title)")
        .eq("student_id", user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: feePayments } = useQuery({
    queryKey: ["my-fees"],
    queryFn: async () => {
      const { data } = await supabase
        .from("fee_payments")
        .select("*")
        .eq("student_id", user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: assignments } = useQuery({
    queryKey: ["my-assignments"],
    queryFn: async () => {
      const { data } = await supabase
        .from("assignments")
        .select("*, courses(code, title)")
        .order("due_date", { ascending: true })
        .limit(5);
      return data || [];
    },
    enabled: !!user,
  });

  const courseCount = enrollments?.length || 0;
  const cgpa = results && results.length > 0
    ? (results.reduce((sum, r) => sum + Number(r.points || 0), 0) / results.length).toFixed(2)
    : "—";
  const pendingAssignments = assignments?.length || 0;
  const outstandingFees = feePayments
    ?.filter(f => f.status === "pending")
    .reduce((sum, f) => sum + Number(f.amount_paid || 0), 0) || 0;

  const stats = [
    { label: "Enrolled Courses", value: String(courseCount), icon: BookOpen, color: "text-secondary", bgColor: "bg-secondary/10", to: "/dashboard/courses" },
    { label: "Current CGPA", value: cgpa, icon: TrendingUp, color: "text-success", bgColor: "bg-success/10", to: "/dashboard/results" },
    { label: "Assignments Due", value: String(pendingAssignments), icon: FileText, color: "text-accent", bgColor: "bg-accent/10", to: "/dashboard/assignments" },
    { label: "Fee Balance", value: outstandingFees > 0 ? `₦${outstandingFees.toLocaleString()}` : "₦0", icon: CreditCard, color: "text-destructive", bgColor: "bg-destructive/10", to: "/dashboard/fees" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome back, {user?.user_metadata?.full_name?.split(" ")[0] || "Student"} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your academic overview for this semester.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Link key={stat.label} to={stat.to} className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-soft transition-shadow group">
            <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enrolled Courses */}
        <div className="bg-card border border-border rounded-xl shadow-card">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-secondary" /> My Courses
            </h3>
            <Link to="/dashboard/courses" className="text-xs text-secondary hover:underline">View all</Link>
          </div>
          <ul className="divide-y divide-border">
            {enrollments && enrollments.length > 0 ? enrollments.slice(0, 5).map((e: any) => (
              <li key={e.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{e.courses?.code} — {e.courses?.title}</p>
                  <p className="text-xs text-muted-foreground">{e.courses?.credits} credits</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-success/10 text-success uppercase">Enrolled</span>
              </li>
            )) : (
              <li className="px-5 py-8 text-center text-sm text-muted-foreground">No courses registered yet.</li>
            )}
          </ul>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-card border border-border rounded-xl shadow-card">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" /> Upcoming Assignments
            </h3>
            <Link to="/dashboard/assignments" className="text-xs text-secondary hover:underline">View all</Link>
          </div>
          <ul className="divide-y divide-border">
            {assignments && assignments.length > 0 ? assignments.map((a: any) => (
              <li key={a.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.courses?.code}</p>
                </div>
                <span className="text-xs font-medium text-accent flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {new Date(a.due_date).toLocaleDateString()}
                </span>
              </li>
            )) : (
              <li className="px-5 py-8 text-center text-sm text-muted-foreground">No assignments due.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
