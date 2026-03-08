import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClipboardList, Save, Search, TrendingUp, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const gradeOptions = ["A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];
const gradeToPoints: Record<string, number> = { A: 5, "A-": 4.5, "B+": 4, B: 3.5, "B-": 3, "C+": 2.5, C: 2, D: 1.5, F: 0 };

const gradeColor: Record<string, string> = {
  A: "text-success bg-success/10",
  "A-": "text-success bg-success/10",
  "B+": "text-secondary bg-secondary/10",
  B: "text-secondary bg-secondary/10",
  "B-": "text-secondary bg-secondary/10",
  C: "text-accent bg-accent/10",
  "C+": "text-accent bg-accent/10",
  D: "text-destructive/70 bg-destructive/10",
  F: "text-destructive bg-destructive/10",
};

export default function AdminResultsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ student_id: "", course_id: "", semester: "2025/2026 First", grade: "" });

  // Fetch students
  const { data: students = [] } = useQuery({
    queryKey: ["admin-students-for-results"],
    queryFn: async () => {
      const { data: roles } = await supabase.from("user_roles").select("user_id").eq("role", "student");
      if (!roles?.length) return [];
      const ids = roles.map(r => r.user_id);
      const { data } = await supabase.from("profiles").select("user_id, full_name, matric_number").in("user_id", ids);
      return data || [];
    },
  });

  // Fetch all courses
  const { data: courses = [] } = useQuery({
    queryKey: ["admin-all-courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("id, code, title, credits");
      return data || [];
    },
  });

  // Fetch results for selected student (or all)
  const { data: results = [] } = useQuery({
    queryKey: ["admin-results", selectedStudent],
    queryFn: async () => {
      let q = supabase.from("results").select("*, courses(code, title, credits)").order("semester");
      if (selectedStudent) q = q.eq("student_id", selectedStudent);
      const { data } = await q;
      return data || [];
    },
  });

  // Calculate CGPA for a student
  const calcCGPA = (studentId: string) => {
    const sr = results.filter((r: any) => r.student_id === studentId);
    if (sr.length === 0) return "—";
    const totalPoints = sr.reduce((s: number, r: any) => s + Number(r.points || 0) * Number(r.courses?.credits || 0), 0);
    const totalCredits = sr.reduce((s: number, r: any) => s + Number(r.courses?.credits || 0), 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "—";
  };

  // Group results by semester
  const semesters = results.reduce((acc: any, r: any) => {
    if (!acc[r.semester]) acc[r.semester] = [];
    acc[r.semester].push(r);
    return acc;
  }, {});
  const semesterEntries = Object.entries(semesters) as [string, any[]][];

  // Add result mutation
  const addMutation = useMutation({
    mutationFn: async () => {
      const points = gradeToPoints[addForm.grade];
      if (points === undefined) throw new Error("Select a valid grade");
      const { error } = await supabase.from("results").insert({
        student_id: addForm.student_id,
        course_id: addForm.course_id,
        semester: addForm.semester,
        grade: addForm.grade,
        points,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-results"] });
      toast.success("Result added successfully");
      setAddOpen(false);
      setAddForm({ student_id: "", course_id: "", semester: "2025/2026 First", grade: "" });
    },
    onError: (err: any) => toast.error(err.message),
  });

  // Delete result
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("results").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-results"] });
      toast.success("Result deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  // Update grade inline
  const updateMutation = useMutation({
    mutationFn: async ({ id, grade }: { id: string; grade: string }) => {
      const points = gradeToPoints[grade];
      const { error } = await supabase.from("results").update({ grade, points }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-results"] });
      toast.success("Grade updated");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const filteredStudents = students.filter((s: any) =>
    (s.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.matric_number || "").toLowerCase().includes(search.toLowerCase())
  );

  const selectedStudentName = students.find((s: any) => s.user_id === selectedStudent)?.full_name || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Results Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Add, edit, and manage student academic results with CGPA tracking.</p>
        </div>
        <button
          onClick={() => { setAddForm(f => ({ ...f, student_id: selectedStudent })); setAddOpen(true); }}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Result
        </button>
      </div>

      {/* Student selector */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-card space-y-3">
        <label className="block text-sm font-medium text-foreground">Select Student</label>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-input bg-background max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." className="bg-transparent text-sm text-foreground outline-none flex-1" />
        </div>
        <div className="max-h-48 overflow-y-auto space-y-1">
          <button
            onClick={() => setSelectedStudent("")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedStudent ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"}`}
          >
            All Students
          </button>
          {filteredStudents.map((s: any) => (
            <button
              key={s.user_id}
              onClick={() => setSelectedStudent(s.user_id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedStudent === s.user_id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"}`}
            >
              {s.full_name || "Unnamed"} <span className="text-muted-foreground ml-2">{s.matric_number || ""}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CGPA display */}
      {selectedStudent && (
        <div className="bg-card border border-border rounded-xl px-6 py-4 shadow-card flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{selectedStudentName}'s Cumulative GPA</p>
            <p className="text-3xl font-bold text-foreground">{calcCGPA(selectedStudent)}</p>
          </div>
        </div>
      )}

      {/* Results by semester */}
      {semesterEntries.length > 0 ? semesterEntries.map(([sem, courses]) => {
        // Calculate semester GPA
        const semTotalPoints = courses.reduce((s: number, c: any) => s + Number(c.points || 0) * Number(c.courses?.credits || 0), 0);
        const semTotalCredits = courses.reduce((s: number, c: any) => s + Number(c.courses?.credits || 0), 0);
        const semGPA = semTotalCredits > 0 ? (semTotalPoints / semTotalCredits).toFixed(2) : "—";

        return (
          <div key={sem} className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/30">
              <h3 className="text-sm font-semibold text-foreground">{sem}</h3>
              <span className="text-xs font-medium text-secondary">GPA: {semGPA}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {!selectedStudent && <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>}
                    <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Code</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                    <th className="text-center px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Credits</th>
                    <th className="text-center px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade</th>
                    <th className="text-center px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Points</th>
                    <th className="text-center px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {courses.map((c: any) => {
                    const studentName = students.find((s: any) => s.user_id === c.student_id)?.full_name || "Unknown";
                    return (
                      <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                        {!selectedStudent && <td className="px-4 py-2.5 text-sm text-foreground">{studentName}</td>}
                        <td className="px-4 py-2.5 text-sm font-semibold text-foreground">{c.courses?.code}</td>
                        <td className="px-4 py-2.5 text-sm text-foreground">{c.courses?.title}</td>
                        <td className="px-4 py-2.5 text-center text-sm text-foreground">{c.courses?.credits}</td>
                        <td className="px-4 py-2.5 text-center">
                          <select
                            value={c.grade || ""}
                            onChange={e => updateMutation.mutate({ id: c.id, grade: e.target.value })}
                            className={`px-2 py-0.5 rounded text-xs font-semibold border border-input bg-background ${gradeColor[c.grade] || ""}`}
                          >
                            <option value="">—</option>
                            {gradeOptions.map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-2.5 text-center text-sm text-foreground">{c.points ? Number(c.points).toFixed(1) : "—"}</td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            onClick={() => { if (confirm("Delete this result?")) deleteMutation.mutate(c.id); }}
                            className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      }) : (
        <div className="bg-card border border-border rounded-xl p-8 text-center shadow-card">
          <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground">{selectedStudent ? "No results for this student yet." : "Select a student or view all results."}</p>
        </div>
      )}

      {/* Add Result Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Result</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Student</label>
              <select
                value={addForm.student_id}
                onChange={e => setAddForm(f => ({ ...f, student_id: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">Select student...</option>
                {students.map((s: any) => (
                  <option key={s.user_id} value={s.user_id}>{s.full_name || "Unnamed"} — {s.matric_number || "N/A"}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Course</label>
              <select
                value={addForm.course_id}
                onChange={e => setAddForm(f => ({ ...f, course_id: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">Select course...</option>
                {courses.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.code} — {c.title} ({c.credits} cr)</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Semester</label>
              <input
                value={addForm.semester}
                onChange={e => setAddForm(f => ({ ...f, semester: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Grade</label>
              <select
                value={addForm.grade}
                onChange={e => setAddForm(f => ({ ...f, grade: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="">Select grade...</option>
                {gradeOptions.map(g => <option key={g} value={g}>{g} ({gradeToPoints[g]} pts)</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setAddOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors">Cancel</button>
              <button
                onClick={() => addMutation.mutate()}
                disabled={addMutation.isPending || !addForm.student_id || !addForm.course_id || !addForm.grade}
                className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {addMutation.isPending ? "Saving..." : "Add Result"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
