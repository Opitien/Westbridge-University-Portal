import { useState } from "react";
import { BookOpen, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function CoursesPage() {
  const { user, role } = useAuth();
  const queryClient = useQueryClient();

  const { data: allCourses = [], isLoading: loadingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*, departments(name, code)").order("code");
      return data || [];
    },
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("*")
        .eq("student_id", user!.id)
        .eq("status", "registered");
      return data || [];
    },
    enabled: !!user && role === "student",
  });

  const enrolledCourseIds = new Set(enrollments.map((e: any) => e.course_id));

  const enrollMutation = useMutation({
    mutationFn: async (courseId: string) => {
      const { error } = await supabase.from("enrollments").insert({
        student_id: user!.id,
        course_id: courseId,
        semester: "2025/2026 First",
        status: "registered",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
      toast.success("Course registered successfully");
    },
    onError: (err: any) => toast.error(err.message || "Failed to register"),
  });

  const dropMutation = useMutation({
    mutationFn: async (courseId: string) => {
      const { error } = await supabase
        .from("enrollments")
        .delete()
        .eq("student_id", user!.id)
        .eq("course_id", courseId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
      toast.info("Course dropped");
    },
    onError: (err: any) => toast.error(err.message || "Failed to drop course"),
  });

  const totalCredits = allCourses
    .filter((c: any) => enrolledCourseIds.has(c.id))
    .reduce((sum: number, c: any) => sum + (c.credits || 0), 0);

  const registered = allCourses.filter((c: any) => enrolledCourseIds.has(c.id));
  const available = allCourses.filter((c: any) => !enrolledCourseIds.has(c.id));

  if (loadingCourses) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Course Registration</h1>
          <p className="text-muted-foreground text-sm mt-1">Register or drop courses for this semester.</p>
        </div>
        {role === "student" && (
          <div className="bg-card border border-border rounded-xl px-5 py-3 shadow-card">
            <p className="text-xs text-muted-foreground">Total Credits</p>
            <p className="text-2xl font-bold text-foreground">{totalCredits}<span className="text-sm font-normal text-muted-foreground">/24</span></p>
          </div>
        )}
      </div>

      {/* Registered */}
      {role === "student" && (
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <Check className="h-4 w-4 text-success" /> Registered Courses ({registered.length})
          </h2>
          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            {registered.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Code</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Department</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Credits</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {registered.map((course: any) => (
                      <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">{course.code}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{course.title}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{course.departments?.name}</td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-foreground">{course.credits}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => dropMutation.mutate(course.id)}
                            disabled={dropMutation.isPending}
                            className="px-3 py-1.5 rounded-md text-xs font-semibold text-destructive bg-destructive/10 hover:bg-destructive/20 transition-colors"
                          >
                            Drop
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">No courses registered yet. Browse available courses below.</div>
            )}
          </div>
        </div>
      )}

      {/* Available */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-secondary" /> {role === "student" ? "Available Courses" : "All Courses"} ({available.length})
        </h2>
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Code</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Department</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Credits</th>
                  {role === "student" && <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(role === "student" ? available : allCourses).map((course: any) => (
                  <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{course.code}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{course.title}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{course.departments?.name}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-foreground">{course.credits}</td>
                    {role === "student" && (
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            if (totalCredits + (course.credits || 0) > 24) {
                              toast.error("Maximum credit load reached (24 units)");
                              return;
                            }
                            enrollMutation.mutate(course.id);
                          }}
                          disabled={enrollMutation.isPending}
                          className="px-3 py-1.5 rounded-md text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors flex items-center gap-1 ml-auto"
                        >
                          <Plus className="h-3 w-3" /> Register
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
