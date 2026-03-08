import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClipboardList, Save, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function GradingPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: courses = [] } = useQuery({
    queryKey: ["lecturer-courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("id, code, title").eq("lecturer_id", user!.id);
      return data || [];
    },
    enabled: !!user,
  });

  const [selectedCourse, setSelectedCourse] = useState("");

  const { data: enrolledStudents = [] } = useQuery({
    queryKey: ["course-students", selectedCourse],
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("student_id, profiles!inner(full_name, matric_number)")
        .eq("course_id", selectedCourse)
        .eq("status", "registered");
      return data || [];
    },
    enabled: !!selectedCourse,
  });

  const { data: existingResults = [] } = useQuery({
    queryKey: ["course-results", selectedCourse],
    queryFn: async () => {
      const { data } = await supabase
        .from("results")
        .select("*")
        .eq("course_id", selectedCourse);
      return data || [];
    },
    enabled: !!selectedCourse,
  });

  const [grades, setGrades] = useState<Record<string, { grade: string; points: string }>>({});

  const gradeOptions = ["A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];
  const gradeToPoints: Record<string, number> = { A: 5, "A-": 4.5, "B+": 4, B: 3.5, "B-": 3, "C+": 2.5, C: 2, D: 1.5, F: 0 };

  const handleGradeChange = (studentId: string, grade: string) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: { grade, points: String(gradeToPoints[grade] || 0) },
    }));
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const course = courses.find((c: any) => c.id === selectedCourse);
      const entries = Object.entries(grades).filter(([, v]) => v.grade);
      for (const [studentId, { grade, points }] of entries) {
        const existing = existingResults.find((r: any) => r.student_id === studentId);
        if (existing) {
          await supabase.from("results").update({ grade, points: parseFloat(points) }).eq("id", existing.id);
        } else {
          await supabase.from("results").insert({
            student_id: studentId,
            course_id: selectedCourse,
            semester: course?.semester || "2025/2026 First",
            grade,
            points: parseFloat(points),
          });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-results", selectedCourse] });
      toast.success("Grades saved successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Grading</h1>
        <p className="text-muted-foreground text-sm mt-1">Enter and manage student grades for your courses.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 shadow-card">
        <label className="block text-sm font-medium text-foreground mb-2">Select Course</label>
        <select value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setGrades({}); }} className="w-full max-w-sm px-3 py-2 rounded-lg border border-input bg-background text-sm">
          <option value="">Choose a course...</option>
          {courses.map((c: any) => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
        </select>
      </div>

      {selectedCourse && (
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Enrolled Students ({enrolledStudents.length})</h3>
            <button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending || Object.keys(grades).length === 0} className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-2">
              <Save className="h-4 w-4" /> Save Grades
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Matric No.</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {enrolledStudents.length > 0 ? enrolledStudents.map((e: any) => {
                  const existing = existingResults.find((r: any) => r.student_id === e.student_id);
                  const currentGrade = grades[e.student_id]?.grade || existing?.grade || "";
                  const currentPoints = grades[e.student_id]?.points || (existing?.points ? String(existing.points) : "");
                  return (
                    <tr key={e.student_id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{e.profiles?.full_name || "—"}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{e.profiles?.matric_number || "—"}</td>
                      <td className="px-4 py-3 text-center">
                        <select value={currentGrade} onChange={ev => handleGradeChange(e.student_id, ev.target.value)} className="px-2 py-1 rounded border border-input bg-background text-sm">
                          <option value="">—</option>
                          {gradeOptions.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-foreground">{currentPoints || "—"}</td>
                    </tr>
                  );
                }) : (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">No students enrolled in this course.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
