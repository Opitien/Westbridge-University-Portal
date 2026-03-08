import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Mail, BookOpen } from "lucide-react";

export default function LecturersManagementPage() {
  const { data: lecturers = [], isLoading } = useQuery({
    queryKey: ["admin-lecturers"],
    queryFn: async () => {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "lecturer");
      if (!roles || roles.length === 0) return [];

      const userIds = roles.map((r) => r.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", userIds);

      const { data: courses } = await supabase
        .from("courses")
        .select("id, code, title, lecturer_id");

      return (profiles || []).map((p) => ({
        ...p,
        courses: (courses || []).filter((c) => c.lecturer_id === p.user_id),
      }));
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Lecturers</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage all lecturers and their course assignments.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : lecturers.length === 0 ? (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Faculty</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Courses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lecturers.map((l: any) => (
                <tr key={l.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{l.full_name || "Unnamed"}</p>
                        <p className="text-xs text-muted-foreground">{l.phone || "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{l.department || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{l.faculty || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                      <BookOpen className="h-3 w-3" /> {l.courses?.length || 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
