import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { Users, Trophy, Home, Wifi } from "lucide-react";

const clubs = [
  "Debate Society", "Drama Club", "Tech Innovation Club", "Music Society",
  "Photography Club", "Community Service", "Entrepreneurship Club", "Literary Society",
];

const facilities = [
  { icon: "🏛️", name: "Central Library", desc: "500,000+ volumes, 24/7 digital access" },
  { icon: "🏋️", name: "Sports Complex", desc: "Olympic pool, gym, indoor courts" },
  { icon: "🍽️", name: "Dining Halls", desc: "5 dining facilities, international cuisine" },
  { icon: "🏥", name: "Health Center", desc: "Full-service medical and counseling" },
  { icon: "💻", name: "IT Center", desc: "High-speed internet, computer labs" },
  { icon: "🏡", name: "Student Housing", desc: "Modern hostels for 8,000+ students" },
];

export default function CampusLifePage() {
  return (
    <Layout>
      <PageHero
        title="Campus Life"
        subtitle="A vibrant community where learning extends beyond the classroom."
        breadcrumb="Campus"
      />

      <Section>
        <SectionTitle subtitle="Join a community of passionate students">Student Clubs & Organizations</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clubs.map((club) => (
            <div key={club} className="bg-card rounded-xl p-5 shadow-soft border border-border text-center hover:border-gold/30 transition-colors">
              <p className="font-body font-semibold text-foreground">{club}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/50">
        <SectionTitle subtitle="Everything you need for a great campus experience">Campus Facilities</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f) => (
            <div key={f.name} className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <span className="text-3xl block mb-3">{f.icon}</span>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{f.name}</h3>
              <p className="text-muted-foreground font-body text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
