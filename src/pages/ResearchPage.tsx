import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { Microscope, BookMarked, Banknote, TrendingUp } from "lucide-react";
import labResearch from "@/assets/lab-research.jpg";

const centers = [
  { name: "Center for Artificial Intelligence", focus: "Machine learning, NLP, robotics", papers: 320 },
  { name: "Institute of Biomedical Research", focus: "Genomics, drug discovery, clinical trials", papers: 280 },
  { name: "Center for Sustainable Energy", focus: "Renewable energy, climate modeling", papers: 195 },
  { name: "Global Policy Research Lab", focus: "International relations, public policy", papers: 150 },
  { name: "Advanced Materials Institute", focus: "Nanomaterials, semiconductor physics", papers: 210 },
  { name: "Center for Data Science", focus: "Big data analytics, statistical modeling", papers: 175 },
];

export default function ResearchPage() {
  return (
    <Layout>
      <PageHero
        title="Research & Innovation"
        subtitle="Pioneering discoveries that shape the future of science, technology, and society."
        breadcrumb="Research"
      />

      <Section>
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Microscope, value: "45", label: "Research Centers" },
            { icon: BookMarked, value: "2,500+", label: "Publications/Year" },
            { icon: Banknote, value: "$180M", label: "Research Funding" },
            { icon: TrendingUp, value: "85", label: "Patents Filed" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-6 shadow-soft border border-border text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <s.icon className="h-6 w-6 text-accent" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-muted-foreground font-body text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Research image */}
        <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-16">
          <img src={labResearch} alt="Research laboratory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8 md:p-12">
            <div className="text-primary-foreground max-w-md">
              <p className="font-heading text-2xl md:text-3xl font-bold">Cutting-Edge Laboratories</p>
              <p className="font-body text-primary-foreground/80 mt-2">45 research centers with state-of-the-art equipment and facilities</p>
            </div>
          </div>
        </div>

        <SectionTitle subtitle="World-class facilities driving groundbreaking research">Research Centers</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((c) => (
            <div key={c.name} className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-elevated transition-shadow">
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{c.name}</h3>
              <p className="text-muted-foreground font-body text-sm mb-3">{c.focus}</p>
              <p className="text-accent font-body text-sm font-semibold">{c.papers} publications</p>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
