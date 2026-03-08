import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Users, GraduationCap, BookOpen, Building2, CreditCard, BarChart3, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data: profiles = [] } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*");
      return data || [];
    },
  });

  const { data: userRoles = [] } = useQuery({
    queryKey: ["admin-roles"],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("*");
      return data || [];
    },
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*");
      return data || [];
    },
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["admin-departments"],
    queryFn: async () => {
      const { data } = await supabase.from("departments").select("*");
      return data || [];
    },
  });

  const { data: admissions = [] } = useQuery({
    queryKey: ["admin-admissions"],
    queryFn: async () => {
      const { data } = await supabase.from("admissions").select("*");
      return data || [];
    },
  });

  const { data: feePayments = [] } = useQuery({
    queryKey: ["admin-fee-payments"],
    queryFn: async () => {
      const { data } = await supabase.from("fee_payments").select("*");
      return data || [];
    },
  });

  const studentCount = userRoles.filter((r: any) => r.role === "student").length;
  const lecturerCount = userRoles.filter((r: any) => r.role === "lecturer").length;
  const pendingAdmissions = admissions.filter((a: any) => a.status === "pending").length;
  const totalRevenue = feePayments.filter((f: any) => f.status === "paid").reduce((s: number, f: any) => s + Number(f.amount_paid), 0);

  const stats = [
    { label: "Total Students", value: String(studentCount), icon: Users, color: "text-secondary", bgColor: "bg-secondary/10", to: "/dashboard/students" },
    { label: "Total Lecturers", value: String(lecturerCount), icon: GraduationCap, color: "text-primary", bgColor: "bg-primary/10", to: "/dashboard/lecturers" },
    { label: "Active Courses", value: String(courses.length), icon: BookOpen, color: "text-success", bgColor: "bg-success/10", to: "/dashboard/courses" },
    { label: "Departments", value: String(departments.length), icon: Building2, color: "text-accent", bgColor: "bg-accent/10", to: "/dashboard/departments" },
    { label: "Revenue", value: `₦${(totalRevenue / 1000000).toFixed(1)}M`, icon: CreditCard, color: "text-success", bgColor: "bg-success/10", to: "/dashboard/fee-management" },
    { label: "Pending Admissions", value: String(pendingAdmissions), icon: ClipboardList, color: "text-accent", bgColor: "bg-accent/10", to: "/dashboard/admissions" },
  ];

  // Charts data
  const admissionData = [
    { status: "Pending", count: admissions.filter((a: any) => a.status === "pending").length },
    { status: "Approved", count: admissions.filter((a: any) => a.status === "approved").length },
    { status: "Rejected", count: admissions.filter((a: any) => a.status === "rejected").length },
  ];

  const COLORS = ["hsl(var(--accent))", "hsl(var(--success))", "hsl(var(--destructive))"];

  const deptData = departments.map((d: any) => ({
    dept: d.code,
    courses: courses.filter((c: any) => c.department_id === d.id).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">University management overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
        {/* Courses by Department */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Courses by Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="dept" fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip />
              <Bar dataKey="courses" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Admissions */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Admission Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={admissionData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                {admissionData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Admissions */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Recent Applications</h3>
          <Link to="/dashboard/admissions" className="text-xs text-secondary hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Applicant</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Program</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">JAMB</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {admissions.slice(0, 5).map((a: any) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{a.applicant_name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{a.program}</td>
                  <td className="px-4 py-3 text-center text-sm text-foreground">{a.jamb_score}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      a.status === "approved" ? "bg-success/10 text-success" :
                      a.status === "rejected" ? "bg-destructive/10 text-destructive" :
                      "bg-accent/10 text-accent"
                    }`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
