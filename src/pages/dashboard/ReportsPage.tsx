import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export default function ReportsPage() {
  const { data: departments = [] } = useQuery({
    queryKey: ["admin-departments"],
    queryFn: async () => {
      const { data } = await supabase.from("departments").select("*");
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

  const { data: enrollments = [] } = useQuery({
    queryKey: ["admin-all-enrollments"],
    queryFn: async () => {
      const { data } = await supabase.from("enrollments").select("*");
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

  // Enrollment by department
  const enrollmentByDept = departments.map((d: any) => {
    const deptCourseIds = courses.filter((c: any) => c.department_id === d.id).map((c: any) => c.id);
    return {
      dept: d.code,
      students: enrollments.filter((e: any) => deptCourseIds.includes(e.course_id)).length,
    };
  });

  // Admissions by faculty
  const faculties = [...new Set(admissions.map((a: any) => a.faculty).filter(Boolean))];
  const admissionsByFaculty = faculties.map(f => ({
    faculty: f as string,
    count: admissions.filter((a: any) => a.faculty === f).length,
  }));

  // Revenue breakdown
  const paidPayments = feePayments.filter((f: any) => f.status === "paid");
  const pendingPayments = feePayments.filter((f: any) => f.status === "pending" || f.status !== "paid");
  const revenueData = [
    { name: "Collected", value: paidPayments.reduce((s: number, p: any) => s + Number(p.amount_paid), 0) },
    { name: "Pending", value: pendingPayments.reduce((s: number, p: any) => s + Number(p.amount_paid || 0), 0) },
  ];
  const COLORS = ["hsl(var(--success))", "hsl(var(--accent))"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">University-wide data insights and reporting.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enrollment by Department */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Enrollment by Department</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={enrollmentByDept}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="dept" fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip />
              <Bar dataKey="students" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue pie */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={revenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} label={({ name, value }) => `${name}: ₦${(value / 1000).toFixed(0)}k`}>
                {revenueData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(value: number) => `₦${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Admissions by faculty */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Applications by Faculty</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={admissionsByFaculty} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis dataKey="faculty" type="category" fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary cards */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Quick Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Courses", value: courses.length },
              { label: "Total Departments", value: departments.length },
              { label: "Total Enrollments", value: enrollments.length },
              { label: "Total Applications", value: admissions.length },
            ].map(item => (
              <div key={item.label} className="bg-muted/50 rounded-lg p-3">
                <p className="text-xl font-bold text-foreground">{item.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
