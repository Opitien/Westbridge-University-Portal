import { TrendingUp } from "lucide-react";

const semesters = [
  {
    name: "2025/2026 — First Semester",
    gpa: 3.72,
    courses: [
      { code: "CSC 301", title: "Data Structures", credits: 3, grade: "A", points: 5.0 },
      { code: "CSC 305", title: "Operating Systems", credits: 3, grade: "B+", points: 4.0 },
      { code: "MTH 201", title: "Linear Algebra", credits: 3, grade: "A", points: 5.0 },
      { code: "GST 201", title: "Philosophy & Logic", credits: 2, grade: "B", points: 3.5 },
      { code: "ENG 201", title: "Technical Writing", credits: 2, grade: "A", points: 5.0 },
    ],
  },
  {
    name: "2024/2025 — Second Semester",
    gpa: 3.58,
    courses: [
      { code: "CSC 202", title: "Computer Architecture", credits: 3, grade: "B+", points: 4.0 },
      { code: "CSC 204", title: "Database Systems", credits: 3, grade: "A", points: 5.0 },
      { code: "MTH 102", title: "Calculus II", credits: 3, grade: "B", points: 3.5 },
      { code: "PHY 102", title: "Electricity & Magnetism", credits: 3, grade: "B+", points: 4.0 },
    ],
  },
];

const gradeColor: Record<string, string> = {
  A: "text-green-600 bg-green-50",
  "A-": "text-green-500 bg-green-50",
  "B+": "text-blue-600 bg-blue-50",
  B: "text-blue-500 bg-blue-50",
  "B-": "text-blue-400 bg-blue-50",
  C: "text-orange-500 bg-orange-50",
  D: "text-red-400 bg-red-50",
  F: "text-destructive bg-destructive/10",
};

export default function ResultsPage() {
  const cgpa = 3.65;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Academic Results</h1>
          <p className="font-body text-muted-foreground text-sm">View your semester results and CGPA.</p>
        </div>
        <div className="bg-card border border-border rounded-xl px-6 py-3 shadow-soft flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <div>
            <p className="font-body text-xs text-muted-foreground">Cumulative GPA</p>
            <p className="font-display text-2xl font-bold text-foreground">{cgpa.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {semesters.map(sem => (
        <div key={sem.name} className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/30">
            <h3 className="font-display text-base font-bold text-foreground">{sem.name}</h3>
            <span className="font-body text-sm font-semibold text-accent">GPA: {sem.gpa.toFixed(2)}</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2 font-body text-xs font-semibold text-muted-foreground uppercase">Code</th>
                <th className="text-left px-4 py-2 font-body text-xs font-semibold text-muted-foreground uppercase">Title</th>
                <th className="text-center px-4 py-2 font-body text-xs font-semibold text-muted-foreground uppercase">Credits</th>
                <th className="text-center px-4 py-2 font-body text-xs font-semibold text-muted-foreground uppercase">Grade</th>
                <th className="text-center px-4 py-2 font-body text-xs font-semibold text-muted-foreground uppercase">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sem.courses.map(c => (
                <tr key={c.code} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-2.5 font-body text-sm font-semibold text-foreground">{c.code}</td>
                  <td className="px-4 py-2.5 font-body text-sm text-foreground">{c.title}</td>
                  <td className="px-4 py-2.5 text-center font-body text-sm text-foreground">{c.credits}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${gradeColor[c.grade] || ""}`}>
                      {c.grade}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center font-body text-sm text-foreground">{c.points.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
