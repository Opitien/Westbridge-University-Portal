import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";
import { Users, GraduationCap } from "lucide-react";
import labResearch from "@/assets/lab-research.jpg";
import library from "@/assets/library.jpg";
import campusAerial from "@/assets/campus-aerial.jpg";
import graduation from "@/assets/graduation.jpg";

const faculties = [
  {
    name: "Faculty of Engineering",
    dean: "Prof. Robert Adebayo",
    departments: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Computer Engineering", "Chemical Engineering"],
    students: 4200,
    image: labResearch,
  },
  {
    name: "Faculty of Medicine & Health Sciences",
    dean: "Prof. Sarah Greenwood",
    departments: ["Medicine", "Nursing", "Pharmacy", "Public Health", "Anatomy"],
    students: 3100,
    image: library,
  },
  {
    name: "Faculty of Arts & Humanities",
    dean: "Dr. Amara Diop",
    departments: ["English", "History", "Philosophy", "Linguistics", "Fine Arts"],
    students: 3500,
    image: campusAerial,
  },
  {
    name: "Faculty of Business & Management",
    dean: "Prof. Liu Chang",
    departments: ["Accounting", "Finance", "Marketing", "Management", "Economics"],
    students: 3800,
    image: graduation,
  },
  {
    name: "Faculty of Sciences",
    dean: "Prof. Elena Petrova",
    departments: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
    students: 4000,
    image: labResearch,
  },
  {
    name: "Faculty of Law",
    dean: "Dr. Michael Okafor",
    departments: ["Public Law", "Private Law", "International Law", "Jurisprudence"],
    students: 1800,
    image: library,
  },
];

export default function FacultiesPage() {
  return (
    <Layout>
      <PageHero
        title="Faculties & Departments"
        subtitle="Explore our diverse academic faculties offering world-class programs."
        breadcrumb="Academics"
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {faculties.map((fac) => (
            <div key={fac.name} className="bg-card rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-elevated transition-shadow">
              <div className="h-44 overflow-hidden">
                <img src={fac.image} alt={fac.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{fac.name}</h3>
                <p className="text-accent font-body text-sm font-medium mb-4 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" /> Dean: {fac.dean}
                </p>
                <div className="mb-4">
                  <p className="text-sm font-body font-semibold text-foreground mb-2">Departments:</p>
                  <div className="flex flex-wrap gap-2">
                    {fac.departments.map((d) => (
                      <span key={d} className="bg-muted text-muted-foreground text-xs font-body px-3 py-1 rounded-full">{d}</span>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground font-body text-sm flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-accent" /> {fac.students.toLocaleString()} students enrolled
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
