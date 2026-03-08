import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { Award, Target, Eye, Users } from "lucide-react";

const leaders = [
  { name: "Prof. Eleanor Whitfield", title: "Vice Chancellor", area: "Quantum Physics" },
  { name: "Dr. James Okonkwo", title: "Deputy Vice Chancellor", area: "Biomedical Engineering" },
  { name: "Prof. Maria Santos", title: "Provost", area: "International Relations" },
  { name: "Dr. Chen Wei", title: "Registrar", area: "Educational Administration" },
];

export default function AboutPage() {
  return (
    <Layout>
      <PageHero
        title="About Grand University"
        subtitle="Over 130 years of academic excellence, innovation, and global impact."
        breadcrumb="About Us"
      />

      <Section id="history">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our History</h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>Founded in 1892, Grand University began as a small liberal arts college with a vision to make quality education accessible to all. Over the decades, it has grown into one of the world's leading research universities.</p>
              <p>Today, Grand University spans 300 acres of historic campus grounds, housing state-of-the-art facilities, world-renowned research centers, and a vibrant community of over 25,000 students from 120 countries.</p>
              <p>Our alumni include Nobel laureates, heads of state, pioneering scientists, and influential business leaders who continue to shape the world.</p>
            </div>
          </div>
          <div className="bg-muted rounded-2xl p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6 text-center">
              {[
                { value: "1892", label: "Year Founded" },
                { value: "120+", label: "Countries" },
                { value: "300", label: "Acre Campus" },
                { value: "15", label: "Nobel Laureates" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-gold">{s.value}</div>
                  <div className="text-sm font-body text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/50" id="mission">
        <SectionTitle>Mission & Vision</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border">
            <Target className="h-10 w-10 text-gold mb-4" />
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Mission</h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              To advance knowledge, educate students, and promote scholarship that makes a positive impact on the world through rigorous teaching, cutting-edge research, and meaningful community engagement.
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border">
            <Eye className="h-10 w-10 text-gold mb-4" />
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Vision</h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              To be a globally recognized institution that leads in transformative education, pioneering research, and societal impact — fostering a diverse community of thinkers and doers.
            </p>
          </div>
        </div>
      </Section>

      <Section id="leadership">
        <SectionTitle subtitle="Meet the leaders guiding Grand University">University Leadership</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <div key={leader.name} className="bg-card rounded-xl p-6 shadow-soft border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{leader.name}</h3>
              <p className="text-gold font-body text-sm font-medium">{leader.title}</p>
              <p className="text-muted-foreground font-body text-xs mt-1">{leader.area}</p>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
