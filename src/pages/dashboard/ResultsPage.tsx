import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const gradeColor: Record<string, string> = {
  A: "text-success bg-success/10",
  "A-": "text-success bg-success/10",
  "B+": "text-secondary bg-secondary/10",
  B: "text-secondary bg-secondary/10",
  "B-": "text-secondary bg-secondary/10",
  C: "text-accent bg-accent/10",
  D: "text-destructive/70 bg-destructive/10",
  F: "text-destructive bg-destructive/10",
};

export default function ResultsPage() {
  const { user } = useAuth();

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["my-results"],
    queryFn: async () => {
      const { data } = await supabase
        .from("results")
        .select("*, courses(code, title, credits)")
        .eq("student_id", user!.id)
        .order("semester");
      return data || [];
    },
    enabled: !!user,
  });

  // Group by semester
  const semesters = results.reduce((acc: any, r: any) => {
    if (!acc[r.semester]) acc[r.semester] = [];
    acc[r.semester].push(r);
    return acc;
  }, {});

  const semesterEntries = Object.entries(semesters) as [string, any[]][];

  // Calculate GPA per semester for chart
  const chartData = semesterEntries.map(([sem, courses]) => {
    const totalPoints = courses.reduce((s: number, c: any) => s + Number(c.points || 0) * Number(c.courses?.credits || 0), 0);
    const totalCredits = courses.reduce((s: number, c: any) => s + Number(c.courses?.credits || 0), 0);
    return { semester: sem.split(" ").slice(-1)[0], gpa: totalCredits > 0 ? +(totalPoints / totalCredits).toFixed(2) : 0 };
  });

  const cgpa = results.length > 0
    ? (results.reduce((s: number, r: any) => s + Number(r.points || 0) * Number(r.courses?.credits || 0), 0) /
       results.reduce((s: number, r: any) => s + Number(r.courses?.credits || 0), 0)).toFixed(2)
    : "—";

  if (isLoading) {
    return <div className="space-y-4"><div className="h-8 w-48 bg-muted animate-pulse rounded" /><div className="h-64 bg-muted animate-pulse rounded-xl" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Academic Results</h1>
          <p className="text-muted-foreground text-sm mt-1">View your semester results and cumulative GPA.</p>
        </div>
        <div className="bg-card border border-border rounded-xl px-6 py-3 shadow-card flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Cumulative GPA</p>
            <p className="text-2xl font-bold text-foreground">{cgpa}</p>
          </div>
        </div>
      </div>

      {/* GPA Chart */}
      {chartData.length > 1 && (
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">GPA Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="semester" fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis domain={[0, 5]} fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip />
              <Bar dataKey="gpa" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Semester results */}
      {semesterEntries.length > 0 ? semesterEntries.map(([sem, courses]) => (
        <div key={sem} className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/30">
            <h3 className="text-sm font-semibold text-foreground">{sem}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Code</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Credits</th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade</th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {courses.map((c: any) => (
                  <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2.5 text-sm font-semibold text-foreground">{c.courses?.code}</td>
                    <td className="px-4 py-2.5 text-sm text-foreground">{c.courses?.title}</td>
                    <td className="px-4 py-2.5 text-center text-sm text-foreground">{c.courses?.credits}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${gradeColor[c.grade] || "text-foreground bg-muted"}`}>
                        {c.grade || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center text-sm text-foreground">{c.points ? Number(c.points).toFixed(1) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )) : (
        <div className="bg-card border border-border rounded-xl p-8 text-center shadow-card">
          <p className="text-muted-foreground">No results available yet.</p>
        </div>
      )}
    </div>
  );
}
