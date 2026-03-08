import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { Download, FileText, BookOpen, Calendar, ClipboardList } from "lucide-react";

const downloadCategories = [
  {
    title: "Academic Documents",
    icon: BookOpen,
    files: [
      { name: "Academic Calendar 2025/2026", type: "PDF", size: "1.2 MB" },
      { name: "Student Handbook", type: "PDF", size: "3.5 MB" },
      { name: "Course Catalogue", type: "PDF", size: "2.8 MB" },
      { name: "Grading Policy Document", type: "PDF", size: "450 KB" },
    ],
  },
  {
    title: "Admission Forms",
    icon: ClipboardList,
    files: [
      { name: "Undergraduate Application Form", type: "PDF", size: "850 KB" },
      { name: "Postgraduate Application Form", type: "PDF", size: "920 KB" },
      { name: "Transfer Application Form", type: "PDF", size: "780 KB" },
      { name: "Scholarship Application Form", type: "PDF", size: "650 KB" },
    ],
  },
  {
    title: "Administrative Forms",
    icon: FileText,
    files: [
      { name: "Leave of Absence Request", type: "PDF", size: "320 KB" },
      { name: "Transcript Request Form", type: "PDF", size: "280 KB" },
      { name: "Change of Course Form", type: "PDF", size: "350 KB" },
      { name: "Hostel Application Form", type: "PDF", size: "400 KB" },
    ],
  },
  {
    title: "Schedules & Timetables",
    icon: Calendar,
    files: [
      { name: "Examination Timetable — First Semester", type: "PDF", size: "1.1 MB" },
      { name: "Lecture Timetable — All Faculties", type: "PDF", size: "2.3 MB" },
      { name: "Orientation Week Schedule", type: "PDF", size: "560 KB" },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <Layout>
      <PageHero
        title="Downloads"
        subtitle="Access important university documents, forms, and resources."
        breadcrumb="Downloads"
      />

      <Section>
        <SectionTitle subtitle="Find and download official university forms and documents.">
          Document Library
        </SectionTitle>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {downloadCategories.map((category) => (
            <div key={category.title} className="bg-card border border-border rounded-xl overflow-hidden shadow-soft">
              <div className="bg-primary/5 px-6 py-4 flex items-center gap-3 border-b border-border">
                <category.icon className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-bold text-foreground">{category.title}</h3>
              </div>
              <ul className="divide-y divide-border">
                {category.files.map((file) => (
                  <li key={file.name} className="px-6 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">{file.name}</p>
                      <p className="font-body text-xs text-muted-foreground">
                        {file.type} · {file.size}
                      </p>
                    </div>
                    <button className="p-2 rounded-lg text-accent hover:bg-accent/10 transition-colors" title="Download">
                      <Download className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
