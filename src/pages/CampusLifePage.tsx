import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { Library, Dumbbell, UtensilsCrossed, HeartPulse, Laptop, Home } from "lucide-react";

const campusOverview = "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1600&q=80";
const studentLife = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80";

const clubs = [
  "Debate Society", "Drama Club", "Tech Innovation Club", "Music Society",
  "Photography Club", "Community Service", "Entrepreneurship Club", "Literary Society",
];

const facilities = [
  { icon: Library, name: "Central Library", desc: "500,000+ volumes, 24/7 digital access" },
  { icon: Dumbbell, name: "Sports Complex", desc: "Olympic pool, gym, indoor courts" },
  { icon: UtensilsCrossed, name: "Dining Halls", desc: "5 dining facilities, international cuisine" },
  { icon: HeartPulse, name: "Health Center", desc: "Full-service medical and counseling" },
  { icon: Laptop, name: "IT Center", desc: "High-speed internet, computer labs" },
  { icon: Home, name: "Student Housing", desc: "Modern hostels for 8,000+ students" },
];

export default function CampusLifePage() {
  return (
    <Layout>
      <PageHero
        title="Campus Life"
        subtitle="A vibrant community where learning extends beyond the classroom."
        breadcrumb="Campus"
      />

      {/* Full-width campus image */}
      <div className="relative h-64 md:h-96">
        <img src={campusOverview} alt="Campus overview" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <Section>
        <SectionTitle subtitle="Join a community of passionate students">Student Clubs & Organizations</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clubs.map((club) => (
            <div key={club} className="bg-card rounded-xl p-5 shadow-soft border border-border text-center hover:border-accent/30 hover:shadow-elevated transition-all">
              <p className="font-body font-semibold text-foreground">{club}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/50">
        <SectionTitle subtitle="Everything you need for a great campus experience">Campus Facilities</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f) => (
            <div key={f.name} className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{f.name}</h3>
              <p className="text-muted-foreground font-body text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Student life image section */}
      <div className="relative h-64 md:h-80">
        <img src={studentLife} alt="Students studying together" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-primary-foreground">
          <div>
            <p className="font-heading text-2xl md:text-3xl font-bold">Explore. Discover. Grow.</p>
            <p className="font-body text-primary-foreground/70 mt-2">Your campus, your community</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
