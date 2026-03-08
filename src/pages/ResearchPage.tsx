import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";

const centers = [
  { name: "Centre for Artificial Intelligence", focus: "Machine learning, NLP, robotics", papers: 320 },
  { name: "Institute of Biomedical Research", focus: "Genomics, drug discovery, clinical trials", papers: 280 },
  { name: "Centre for Sustainable Energy", focus: "Renewable energy, climate modelling", papers: 195 },
  { name: "Global Policy Research Lab", focus: "International relations, public policy", papers: 150 },
  { name: "Advanced Materials Institute", focus: "Nanomaterials, semiconductor physics", papers: 210 },
  { name: "Centre for Data Science", focus: "Big data analytics, statistical modelling", papers: 175 },
];

const researchImage = "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600&q=80";

const stats = [
  { value: "45", label: "Research Centres" },
  { value: "2,500+", label: "Publications / Year" },
  { value: "$180M", label: "Research Funding" },
  { value: "85", label: "Patents Filed" },
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-5 border border-border rounded-lg bg-card">
              <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-muted-foreground font-body text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="relative rounded-xl overflow-hidden h-56 md:h-72 mb-14">
          <img src={researchImage} alt="Research laboratory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center p-6 md:p-10">
            <div className="text-white max-w-md">
              <p className="font-heading text-xl md:text-2xl font-bold">Cutting-Edge Laboratories</p>
              <p className="font-body text-white/60 text-sm mt-1">45 research centres with state-of-the-art equipment</p>
            </div>
          </div>
        </div>

        <SectionTitle subtitle="World-class facilities driving groundbreaking research">Research Centres</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {centers.map((c) => (
            <div key={c.name} className="bg-card rounded-lg p-5 border border-border">
              <h3 className="font-display text-sm font-bold text-foreground mb-1">{c.name}</h3>
              <p className="text-muted-foreground font-body text-xs mb-2">{c.focus}</p>
              <p className="text-accent font-body text-xs font-medium">{c.papers} publications</p>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
