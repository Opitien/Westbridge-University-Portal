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
  { icon: HeartPulse, name: "Health Centre", desc: "Full-service medical and counselling" },
  { icon: Laptop, name: "IT Centre", desc: "High-speed internet, computer labs" },
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

      <div className="relative h-56 md:h-80">
        <img src={campusOverview} alt="Campus overview" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Section>
        <SectionTitle subtitle="Join a community of passionate students">Student Clubs & Organisations</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {clubs.map((club) => (
            <div key={club} className="bg-card rounded-lg p-4 border border-border text-center hover:border-accent/30 transition-colors">
              <p className="font-body text-sm font-medium text-foreground">{club}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/40">
        <SectionTitle subtitle="Everything you need for a great campus experience">Campus Facilities</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((f) => (
            <div key={f.name} className="bg-card rounded-lg p-5 border border-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground">{f.name}</h3>
                <p className="text-muted-foreground font-body text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="relative h-56 md:h-72">
        <img src={studentLife} alt="Students studying together" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <p className="font-heading text-2xl md:text-3xl font-bold">Explore. Discover. Grow.</p>
            <p className="font-body text-white/60 text-sm mt-1">Your campus, your community</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
