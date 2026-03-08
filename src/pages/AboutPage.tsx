import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { UserCircle } from "lucide-react";

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
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-5">Our History</h2>
            <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
              <p>Founded in 1892, WestBridge University began as a small liberal arts college with a vision to make quality education accessible to all. Over the decades, it has grown into one of the world's leading research universities.</p>
              <p>Today, WestBridge spans 300 acres of historic campus grounds, housing state-of-the-art facilities, world-renowned research centres, and a vibrant community of over 25,000 students from 120 countries.</p>
              <p>Our alumni include Nobel laureates, heads of state, pioneering scientists, and influential business leaders who continue to shape the world.</p>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <img src={historyImage} alt="Historic campus grounds" className="w-full h-72 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="grid grid-cols-4 gap-3 text-center text-white">
                {[
                  { value: "1892", label: "Founded" },
                  { value: "120+", label: "Countries" },
                  { value: "300", label: "Acres" },
                  { value: "15", label: "Nobel Laureates" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-lg font-bold text-gold">{s.value}</div>
                    <div className="text-[10px] font-body text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/40" id="mission">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-7 border border-border">
            <h3 className="font-display text-lg font-bold text-foreground mb-3">Our Mission</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              To advance knowledge, educate students, and promote scholarship that makes a positive impact on the world through rigorous teaching, cutting-edge research, and meaningful community engagement.
            </p>
          </div>
          <div className="bg-card rounded-lg p-7 border border-border">
            <h3 className="font-display text-lg font-bold text-foreground mb-3">Our Vision</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              To be a globally recognised institution that leads in transformative education, pioneering research, and societal impact — fostering a diverse community of thinkers and doers.
            </p>
          </div>
        </div>
      </Section>

      {/* Full width image */}
      <div className="relative h-56 md:h-72">
        <img src={facilitiesImage} alt="WestBridge University Library interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <p className="font-heading text-2xl md:text-3xl font-bold">World-Class Facilities</p>
            <p className="font-body text-white/60 text-sm mt-1">State-of-the-art libraries, labs, and learning spaces</p>
          </div>
        </div>
      </div>

      <Section id="leadership">
        <SectionTitle subtitle="Meet the leaders guiding WestBridge University">University Leadership</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {leaders.map((leader) => (
            <div key={leader.name} className="bg-card rounded-lg p-5 border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                <UserCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-sm font-bold text-foreground">{leader.name}</h3>
              <p className="text-accent font-body text-xs font-medium mt-0.5">{leader.title}</p>
              <p className="text-muted-foreground font-body text-xs mt-0.5">{leader.area}</p>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
