import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, BookOpen } from "lucide-react";

export default function DepartmentsPage() {
  const { data: departments = [], isLoading } = useQuery({
    queryKey: ["admin-departments-page"],
    queryFn: async () => {
      const { data: depts } = await supabase.from("departments").select("*").order("faculty");
      const { data: courses } = await supabase.from("courses").select("id, department_id");
      return (depts || []).map((d) => ({
        ...d,
        courseCount: (courses || []).filter((c) => c.department_id === d.id).length,
      }));
    },
  });

  const grouped = departments.reduce((acc: Record<string, any[]>, d: any) => {
    (acc[d.faculty] = acc[d.faculty] || []).push(d);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Departments</h1>
        <p className="text-sm text-muted-foreground mt-1">All academic departments by faculty.</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        Object.entries(grouped).map(([faculty, depts]) => (
          <div key={faculty} className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{faculty}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(depts as any[]).map((d) => (
                <div key={d.id} className="bg-card border border-border rounded-xl p-5 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {d.courseCount} courses
                    </span>
                    {d.head_of_department && (
                      <span>HOD: {d.head_of_department}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
