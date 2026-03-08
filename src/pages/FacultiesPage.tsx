import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";
import { Users } from "lucide-react";

const faculties = [
  {
    name: "Faculty of Engineering",
    dean: "Prof. Robert Adebayo",
    departments: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Computer Engineering", "Chemical Engineering"],
    students: 4200,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    name: "Faculty of Medicine & Health Sciences",
    dean: "Prof. Sarah Greenwood",
    departments: ["Medicine", "Nursing", "Pharmacy", "Public Health", "Anatomy"],
    students: 3100,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
  },
  {
    name: "Faculty of Arts & Humanities",
    dean: "Dr. Amara Diop",
    departments: ["English", "History", "Philosophy", "Linguistics", "Fine Arts"],
    students: 3500,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
  },
  {
    name: "Faculty of Business & Management",
    dean: "Prof. Liu Chang",
    departments: ["Accounting", "Finance", "Marketing", "Management", "Economics"],
    students: 3800,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    name: "Faculty of Sciences",
    dean: "Prof. Elena Petrova",
    departments: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
    students: 4000,
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
  },
  {
    name: "Faculty of Law",
    dean: "Dr. Michael Okafor",
    departments: ["Public Law", "Private Law", "International Law", "Jurisprudence"],
    students: 1800,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
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
        <div className="space-y-6">
          {faculties.map((fac, i) => (
            <div key={fac.name} className={`grid md:grid-cols-12 gap-5 bg-card rounded-lg border border-border overflow-hidden ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`md:col-span-4 h-48 md:h-auto ${i % 2 === 1 ? 'md:order-last' : ''}`}>
                <img src={fac.image} alt={fac.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-8 p-5 md:p-6 flex flex-col justify-center">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{fac.name}</h3>
                <p className="text-xs font-body text-accent font-medium mb-3">Dean: {fac.dean}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {fac.departments.map((d) => (
                    <span key={d} className="bg-muted text-muted-foreground text-[11px] font-body px-2.5 py-1 rounded-md">{d}</span>
                  ))}
                </div>
                <p className="text-muted-foreground font-body text-xs flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-accent" /> {fac.students.toLocaleString()} students enrolled
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
