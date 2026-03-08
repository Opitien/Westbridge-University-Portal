import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, BookOpen, Pencil, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LecturerProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  department: string | null;
  faculty: string | null;
  phone: string | null;
  address: string | null;
  courses: { id: string; code: string; title: string }[];
}

interface EditForm {
  full_name: string;
  department: string;
  faculty: string;
  phone: string;
  address: string;
}

export default function LecturersManagementPage() {
  const [search, setSearch] = useState("");
  const [editLecturer, setEditLecturer] = useState<LecturerProfile | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ full_name: "", department: "", faculty: "", phone: "", address: "" });
  const [editOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: lecturers = [], isLoading } = useQuery({
    queryKey: ["admin-lecturers"],
    queryFn: async () => {
      const { data: roles } = await supabase.from("user_roles").select("user_id").eq("role", "lecturer");
      if (!roles || roles.length === 0) return [];
      const userIds = roles.map((r) => r.user_id);
      const { data: profiles } = await supabase.from("profiles").select("*").in("user_id", userIds);
      const { data: courses } = await supabase.from("courses").select("id, code, title, lecturer_id");
      return (profiles || []).map((p: any) => ({
        ...p,
        courses: (courses || []).filter((c: any) => c.lecturer_id === p.user_id),
      })) as LecturerProfile[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; form: EditForm }) => {
      const { error } = await supabase.from("profiles").update({
        full_name: data.form.full_name || null,
        department: data.form.department || null,
        faculty: data.form.faculty || null,
        phone: data.form.phone || null,
        address: data.form.address || null,
      }).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-lecturers"] });
      toast.success("Lecturer profile updated");
      setEditOpen(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const openEdit = (l: LecturerProfile) => {
    setEditLecturer(l);
    setEditForm({
      full_name: l.full_name || "",
      department: l.department || "",
      faculty: l.faculty || "",
      phone: l.phone || "",
      address: l.address || "",
    });
    setEditOpen(true);
  };

  const filtered = lecturers.filter((l) =>
    (l.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (l.department || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Lecturer Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all lecturers and their course assignments.</p>
        </div>
        <div className="bg-card border border-border rounded-xl px-5 py-3 shadow-card">
          <p className="text-xs text-muted-foreground">Total Lecturers</p>
          <p className="text-2xl font-bold text-foreground">{lecturers.length}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or department..." className="bg-transparent text-sm text-foreground outline-none flex-1" />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border border-border">
          <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">No lecturers found</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Faculty</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Phone</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Courses</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-foreground">{l.full_name || "Unnamed"}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{l.department || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{l.faculty || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{l.phone || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                      <BookOpen className="h-3 w-3" /> {l.courses?.length || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => openEdit(l)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Lecturer Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {([
              ["full_name", "Full Name"],
              ["department", "Department"],
              ["faculty", "Faculty"],
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
                onClick={() => editLecturer && updateMutation.mutate({ id: editLecturer.id, form: editForm })}
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
