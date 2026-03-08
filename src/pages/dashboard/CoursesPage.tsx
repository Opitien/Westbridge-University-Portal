import { useState } from "react";
import { BookOpen, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";

const availableCourses = [
  { code: "CSC 301", title: "Data Structures & Algorithms", credits: 3, lecturer: "Dr. Okonkwo", status: "registered" },
  { code: "CSC 305", title: "Operating Systems", credits: 3, lecturer: "Prof. Adeyemi", status: "registered" },
  { code: "MTH 201", title: "Linear Algebra", credits: 3, lecturer: "Dr. Ibrahim", status: "registered" },
  { code: "CSC 311", title: "Software Engineering", credits: 3, lecturer: "Dr. Nnamdi", status: "available" },
  { code: "CSC 321", title: "Computer Networks", credits: 3, lecturer: "Dr. Oluwaseun", status: "available" },
  { code: "GST 201", title: "Philosophy & Logic", credits: 2, lecturer: "Prof. Abubakar", status: "available" },
  { code: "ENG 201", title: "Technical Writing", credits: 2, lecturer: "Dr. Chukwu", status: "available" },
];

type CourseStatus = "registered" | "available" | "dropped";

export default function CoursesPage() {
  const [courses, setCourses] = useState(
    availableCourses.map(c => ({ ...c, status: c.status as CourseStatus }))
  );

  const totalCredits = courses.filter(c => c.status === "registered").reduce((sum, c) => sum + c.credits, 0);

  const registerCourse = (code: string) => {
    if (totalCredits >= 24) {
      toast.error("Maximum credit load reached (24 units)");
      return;
    }
    setCourses(prev => prev.map(c => c.code === code ? { ...c, status: "registered" as CourseStatus } : c));
    toast.success(`${code} registered successfully`);
  };

  const dropCourse = (code: string) => {
    setCourses(prev => prev.map(c => c.code === code ? { ...c, status: "available" as CourseStatus } : c));
    toast.info(`${code} dropped`);
  };

  const registered = courses.filter(c => c.status === "registered");
  const available = courses.filter(c => c.status === "available");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Course Registration</h1>
          <p className="font-body text-muted-foreground text-sm">Register or drop courses for this semester.</p>
        </div>
        <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-soft">
          <p className="font-body text-xs text-muted-foreground">Total Credits</p>
          <p className="font-display text-xl font-bold text-foreground">{totalCredits}/24</p>
        </div>
      </div>

      {/* Registered */}
      <div>
        <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" /> Registered Courses
        </h2>
        <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase">Code</th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase">Title</th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Lecturer</th>
                <th className="text-center px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase">Credits</th>
                <th className="text-right px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {registered.map(course => (
                <tr key={course.code} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-body text-sm font-semibold text-foreground">{course.code}</td>
                  <td className="px-4 py-3 font-body text-sm text-foreground">{course.title}</td>
                  <td className="px-4 py-3 font-body text-sm text-muted-foreground hidden md:table-cell">{course.lecturer}</td>
                  <td className="px-4 py-3 text-center font-body text-sm font-semibold text-foreground">{course.credits}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => dropCourse(course.code)}
                      className="px-3 py-1.5 rounded-md font-body text-xs font-semibold text-destructive bg-destructive/10 hover:bg-destructive/20 transition-colors"
                    >
                      Drop
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Available */}
      <div>
        <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" /> Available Courses
        </h2>
        <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase">Code</th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase">Title</th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Lecturer</th>
                <th className="text-center px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase">Credits</th>
                <th className="text-right px-4 py-3 font-body text-xs font-semibold text-muted-foreground uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {available.map(course => (
                <tr key={course.code} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-body text-sm font-semibold text-foreground">{course.code}</td>
                  <td className="px-4 py-3 font-body text-sm text-foreground">{course.title}</td>
                  <td className="px-4 py-3 font-body text-sm text-muted-foreground hidden md:table-cell">{course.lecturer}</td>
                  <td className="px-4 py-3 text-center font-body text-sm font-semibold text-foreground">{course.credits}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => registerCourse(course.code)}
                      className="px-3 py-1.5 rounded-md font-body text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors flex items-center gap-1 ml-auto"
                    >
                      <Plus className="h-3 w-3" /> Register
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
