import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { Crosshair, Eye, UserCircle, Building2 } from "lucide-react";

const historyImage = "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1600&q=80";
const facilitiesImage = "https://images.unsplash.com/photo-1568667256549-094345857637?w=1600&q=80";

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
        title="About WestBridge University"
        subtitle="Over 130 years of academic excellence, innovation, and global impact."
        breadcrumb="About Us"
      />

      <Section id="history">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Our History</h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>Founded in 1892, WestBridge University began as a small liberal arts college with a vision to make quality education accessible to all. Over the decades, it has grown into one of the world's leading research universities.</p>
              <p>Today, WestBridge University spans 300 acres of historic campus grounds, housing state-of-the-art facilities, world-renowned research centers, and a vibrant community of over 25,000 students from 120 countries.</p>
              <p>Our alumni include Nobel laureates, heads of state, pioneering scientists, and influential business leaders who continue to shape the world.</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <img src={historyImage} alt="Historic campus grounds" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="grid grid-cols-4 gap-4 text-center text-primary-foreground">
                {[
                  { value: "1892", label: "Founded" },
                  { value: "120+", label: "Countries" },
                  { value: "300", label: "Acres" },
                  { value: "15", label: "Nobel Laureates" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-xl font-bold text-gold">{s.value}</div>
                    <div className="text-[10px] font-body opacity-80">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/50" id="mission">
        <SectionTitle>Mission & Vision</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Crosshair className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Mission</h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              To advance knowledge, educate students, and promote scholarship that makes a positive impact on the world through rigorous teaching, cutting-edge research, and meaningful community engagement.
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Eye className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Vision</h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              To be a globally recognized institution that leads in transformative education, pioneering research, and societal impact — fostering a diverse community of thinkers and doers.
            </p>
          </div>
        </div>
      </Section>

      {/* Full width image break */}
      <div className="relative h-64 md:h-80">
        <img src={facilitiesImage} alt="WestBridge University Library" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <Building2 className="h-10 w-10 mx-auto mb-3 text-gold" />
            <p className="font-heading text-2xl md:text-3xl font-bold">World-Class Facilities</p>
            <p className="font-body text-primary-foreground/70 mt-2">State-of-the-art libraries, labs, and learning spaces</p>
          </div>
        </div>
      </div>

      <Section id="leadership">
        <SectionTitle subtitle="Meet the leaders guiding WestBridge University">University Leadership</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <div key={leader.name} className="bg-card rounded-xl p-6 shadow-soft border border-border text-center group hover:shadow-elevated transition-shadow">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <UserCircle className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">{leader.name}</h3>
              <p className="text-accent font-body text-sm font-medium">{leader.title}</p>
              <p className="text-muted-foreground font-body text-xs mt-1">{leader.area}</p>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
