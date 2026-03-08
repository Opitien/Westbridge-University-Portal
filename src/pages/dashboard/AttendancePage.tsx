import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Save, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function AttendancePage() {
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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

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

  const { data: existingAttendance = [] } = useQuery({
    queryKey: ["attendance", selectedCourse, selectedDate],
    queryFn: async () => {
      const { data } = await supabase
        .from("attendance")
        .select("*")
        .eq("course_id", selectedCourse)
        .eq("date", selectedDate);
      return data || [];
    },
    enabled: !!selectedCourse && !!selectedDate,
  });

  const [attendance, setAttendance] = useState<Record<string, string>>({});

  const toggleAttendance = (studentId: string) => {
    const existing = existingAttendance.find((a: any) => a.student_id === studentId);
    const current = attendance[studentId] || existing?.status || "present";
    setAttendance(prev => ({
      ...prev,
      [studentId]: current === "present" ? "absent" : "present",
    }));
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      for (const student of enrolledStudents) {
        const status = attendance[student.student_id] || "present";
        const existing = existingAttendance.find((a: any) => a.student_id === student.student_id);
        if (existing) {
          await supabase.from("attendance").update({ status }).eq("id", existing.id);
        } else {
          await supabase.from("attendance").insert({
            course_id: selectedCourse,
            student_id: student.student_id,
            date: selectedDate,
            status,
            marked_by: user!.id,
          });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      toast.success("Attendance saved");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Attendance</h1>
        <p className="text-muted-foreground text-sm mt-1">Mark and track student attendance for your courses.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 shadow-card flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-foreground mb-2">Course</label>
          <select value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setAttendance({}); }} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm">
            <option value="">Select course...</option>
            {courses.map((c: any) => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
          </select>
        </div>
        <div className="min-w-[180px]">
          <label className="block text-sm font-medium text-foreground mb-2">Date</label>
          <input type="date" value={selectedDate} onChange={e => { setSelectedDate(e.target.value); setAttendance({}); }} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
        </div>
      </div>

      {selectedCourse && (
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Students ({enrolledStudents.length})</h3>
            <button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-2">
              <Save className="h-4 w-4" /> Save Attendance
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Matric No.</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {enrolledStudents.length > 0 ? enrolledStudents.map((e: any) => {
                  const existing = existingAttendance.find((a: any) => a.student_id === e.student_id);
                  const status = attendance[e.student_id] || existing?.status || "present";
                  return (
                    <tr key={e.student_id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{e.profiles?.full_name || "—"}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{e.profiles?.matric_number || "—"}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => toggleAttendance(e.student_id)} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          status === "present" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                        }`}>
                          {status === "present" ? <><CheckCircle className="h-3 w-3" /> Present</> : <><XCircle className="h-3 w-3" /> Absent</>}
                        </button>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr><td colSpan={3} className="px-4 py-8 text-center text-sm text-muted-foreground">No students enrolled.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
