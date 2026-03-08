import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, Search, Pencil, Trash2, Plus, X, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StudentProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  matric_number: string | null;
  department: string | null;
  faculty: string | null;
  level: string | null;
  phone: string | null;
  address: string | null;
}

interface EditForm {
  full_name: string;
  matric_number: string;
  department: string;
  faculty: string;
  level: string;
  phone: string;
  address: string;
}

const emptyForm: EditForm = { full_name: "", matric_number: "", department: "", faculty: "", level: "", phone: "", address: "" };

export default function StudentsManagementPage() {
  const [search, setSearch] = useState("");
  const [editStudent, setEditStudent] = useState<StudentProfile | null>(null);
  const [editForm, setEditForm] = useState<EditForm>(emptyForm);
  const [editOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const { data: roles } = await supabase.from("user_roles").select("user_id").eq("role", "student");
      if (!roles?.length) return [];
      const ids = roles.map(r => r.user_id);
      const { data } = await supabase.from("profiles").select("*").in("user_id", ids);
      return (data || []) as StudentProfile[];
    },
  });

  // Fetch results for CGPA calculation
  const { data: allResults = [] } = useQuery({
    queryKey: ["admin-all-results"],
    queryFn: async () => {
      const { data } = await supabase.from("results").select("*, courses(credits)");
      return data || [];
    },
  });

  const calcCGPA = (userId: string) => {
    const studentResults = allResults.filter((r: any) => r.student_id === userId);
    if (studentResults.length === 0) return "—";
    const totalPoints = studentResults.reduce((s: number, r: any) => s + Number(r.points || 0) * Number(r.courses?.credits || 0), 0);
    const totalCredits = studentResults.reduce((s: number, r: any) => s + Number(r.courses?.credits || 0), 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "—";
  };

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; form: EditForm }) => {
      const { error } = await supabase.from("profiles").update({
        full_name: data.form.full_name || null,
        matric_number: data.form.matric_number || null,
        department: data.form.department || null,
        faculty: data.form.faculty || null,
        level: data.form.level || null,
        phone: data.form.phone || null,
        address: data.form.address || null,
      }).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-students"] });
      toast.success("Student profile updated");
      setEditOpen(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const openEdit = (s: StudentProfile) => {
    setEditStudent(s);
    setEditForm({
      full_name: s.full_name || "",
      matric_number: s.matric_number || "",
      department: s.department || "",
      faculty: s.faculty || "",
      level: s.level || "",
      phone: s.phone || "",
      address: s.address || "",
    });
    setEditOpen(true);
  };

  const filtered = students.filter((s) =>
    (s.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.matric_number || "").toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="h-64 bg-muted animate-pulse rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Student Management</h1>
          <p className="text-muted-foreground text-sm mt-1">View, edit, and manage all registered students.</p>
        </div>
        <div className="bg-card border border-border rounded-xl px-5 py-3 shadow-card">
          <p className="text-xs text-muted-foreground">Total Students</p>
          <p className="text-2xl font-bold text-foreground">{students.length}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or matric number..." className="bg-transparent text-sm text-foreground outline-none flex-1" />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Matric No.</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Faculty</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Level</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">CGPA</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? filtered.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{s.full_name || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{s.matric_number || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{s.department || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{s.faculty || "—"}</td>
                  <td className="px-4 py-3 text-center text-sm text-foreground">{s.level || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                      <TrendingUp className="h-3 w-3" /> {calcCGPA(s.user_id)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Student Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {([
              ["full_name", "Full Name"],
              ["matric_number", "Matric Number"],
              ["department", "Department"],
              ["faculty", "Faculty"],
              ["level", "Level"],
              ["phone", "Phone"],
              ["address", "Address"],
            ] as [keyof EditForm, string][]).map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
                <input
                  value={editForm[key]}
                  onChange={e => setEditForm(prev => ({ ...prev, [key]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                />
              </div>
            ))}
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setEditOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors">Cancel</button>
              <button
                onClick={() => editStudent && updateMutation.mutate({ id: editStudent.id, form: editForm })}
                disabled={updateMutation.isPending}
                className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
