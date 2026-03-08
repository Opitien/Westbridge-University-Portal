import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Users, Search } from "lucide-react";
import { useState } from "react";

export default function StudentsManagementPage() {
  const [search, setSearch] = useState("");

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const { data: roles } = await supabase.from("user_roles").select("user_id").eq("role", "student");
      if (!roles?.length) return [];
      const ids = roles.map(r => r.user_id);
      const { data } = await supabase.from("profiles").select("*").in("user_id", ids);
      return data || [];
    },
  });

  const filtered = students.filter((s: any) =>
    (s.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.matric_number || "").toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="h-64 bg-muted animate-pulse rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Student Management</h1>
          <p className="text-muted-foreground text-sm mt-1">View and manage all registered students.</p>
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Faculty</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? filtered.map((s: any) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{s.full_name || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{s.matric_number || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{s.department || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{s.faculty || "—"}</td>
                  <td className="px-4 py-3 text-center text-sm text-foreground">{s.level || "—"}</td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
