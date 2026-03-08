import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FileText, Plus, Clock, CheckCircle, Send } from "lucide-react";
import { toast } from "sonner";

export default function AssignmentsPage() {
  const { user, role } = useAuth();
  const queryClient = useQueryClient();
  const isLecturer = role === "lecturer";

  // Create assignment state (lecturer)
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCourseId, setNewCourseId] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newMarks, setNewMarks] = useState("100");

  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["assignments", role],
    queryFn: async () => {
      const { data } = await supabase
        .from("assignments")
        .select("*, courses(code, title)")
        .order("due_date", { ascending: true });
      return data || [];
    },
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["lecturer-courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("id, code, title").eq("lecturer_id", user!.id);
      return data || [];
    },
    enabled: isLecturer,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["my-submissions"],
    queryFn: async () => {
      const { data } = await supabase
        .from("assignment_submissions")
        .select("*")
        .eq("student_id", user!.id);
      return data || [];
    },
    enabled: !isLecturer && !!user,
  });

  const submittedIds = new Set(submissions.map((s: any) => s.assignment_id));

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("assignments").insert({
        course_id: newCourseId,
        title: newTitle.trim(),
        description: newDesc.trim(),
        due_date: new Date(newDueDate).toISOString(),
        total_marks: parseInt(newMarks),
        created_by: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      toast.success("Assignment created");
      setShowCreate(false);
      setNewTitle(""); setNewDesc(""); setNewCourseId(""); setNewDueDate(""); setNewMarks("100");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const submitMutation = useMutation({
    mutationFn: async (assignmentId: string) => {
      const { error } = await supabase.from("assignment_submissions").insert({
        assignment_id: assignmentId,
        student_id: user!.id,
        content: "Submitted via portal",
        submitted_at: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-submissions"] });
      toast.success("Assignment submitted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  if (isLoading) return <div className="h-64 bg-muted animate-pulse rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Assignments</h1>
          <p className="text-muted-foreground text-sm mt-1">{isLecturer ? "Create and manage course assignments." : "View and submit your assignments."}</p>
        </div>
        {isLecturer && (
          <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Assignment
          </button>
        )}
      </div>

      {/* Create form (lecturer) */}
      {isLecturer && showCreate && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Create Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Course</label>
              <select value={newCourseId} onChange={e => setNewCourseId(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm">
                <option value="">Select course</option>
                {courses.map((c: any) => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Title</label>
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" placeholder="Assignment title" />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Due Date</label>
              <input type="datetime-local" value={newDueDate} onChange={e => setNewDueDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Total Marks</label>
              <input type="number" value={newMarks} onChange={e => setNewMarks(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Description</label>
            <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none" placeholder="Assignment description..." />
          </div>
          <div className="flex gap-2">
            <button onClick={() => createMutation.mutate()} disabled={!newCourseId || !newTitle || !newDueDate || createMutation.isPending} className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 transition-colors">
              Create Assignment
            </button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground border border-border hover:bg-muted transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Assignments list */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assignment</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Due Date</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Marks</th>
                {!isLecturer && <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {assignments.length > 0 ? assignments.map((a: any) => {
                const isSubmitted = submittedIds.has(a.id);
                const isPastDue = new Date(a.due_date) < new Date();
                return (
                  <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      {a.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{a.description}</p>}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{a.courses?.code}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-medium flex items-center justify-center gap-1 ${isPastDue ? "text-destructive" : "text-accent"}`}>
                        <Clock className="h-3 w-3" /> {new Date(a.due_date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-foreground">{a.total_marks}</td>
                    {!isLecturer && (
                      <td className="px-4 py-3 text-right">
                        {isSubmitted ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full"><CheckCircle className="h-3 w-3" /> Submitted</span>
                        ) : isPastDue ? (
                          <span className="text-[10px] font-semibold text-destructive">Overdue</span>
                        ) : (
                          <button onClick={() => submitMutation.mutate(a.id)} disabled={submitMutation.isPending} className="px-3 py-1.5 rounded-md text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors flex items-center gap-1 ml-auto">
                            <Send className="h-3 w-3" /> Submit
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              }) : (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">No assignments available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
