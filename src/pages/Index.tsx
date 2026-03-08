import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, Microscope, CalendarDays, ArrowRight, Globe2, Newspaper } from "lucide-react";
import Layout from "@/components/Layout";
import { Section, SectionTitle } from "@/components/SectionComponents";
import heroCampus from "@/assets/hero-campus.jpg";
import campusAerial from "@/assets/campus-aerial.jpg";
import library from "@/assets/library.jpg";
import labResearch from "@/assets/lab-research.jpg";
import graduation from "@/assets/graduation.jpg";

const stats = [
  { label: "Students Enrolled", value: "25,000+", icon: Users },
  { label: "Degree Programs", value: "120+", icon: BookOpen },
  { label: "Research Centres", value: "45", icon: Microscope },
  { label: "Global Ranking", value: "Top 100", icon: Globe2 },
];

const departments = [
  { name: "Engineering", programs: 18, image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80" },
  { name: "Medicine & Health Sciences", programs: 12, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80" },
  { name: "Arts & Humanities", programs: 22, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80" },
  { name: "Business & Management", programs: 15, image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  { name: "Natural Sciences", programs: 20, image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80" },
  { name: "Law", programs: 8, image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80" },
];

const announcements = [
  { title: "Spring 2026 Admission Now Open", date: "Mar 5, 2026", tag: "Admissions" },
  { title: "Research Grant Award — $2.5M", date: "Mar 3, 2026", tag: "Research" },
  { title: "Annual Convocation Ceremony", date: "Feb 28, 2026", tag: "Events" },
  { title: "New AI Research Lab Opening", date: "Feb 25, 2026", tag: "Campus" },
];

const events = [
  { title: "Open Day 2026", date: "Mar 15", month: "MAR" },
  { title: "International Research Symposium", date: "Mar 22", month: "MAR" },
  { title: "Alumni Homecoming", date: "Apr 5", month: "APR" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero — asymmetric layout */}
      <section className="relative min-h-[80vh] flex items-end pb-20 md:items-center md:pb-0">
        <div className="absolute inset-0">
          <img src={heroCampus} alt="WestBridge University main campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-gold/90 font-body text-xs uppercase tracking-[0.25em] mb-3">
              Established 1892
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5">
              Shape Your Future at WestBridge
            </h1>
            <p className="text-white/70 font-body text-base md:text-lg max-w-lg mb-8 leading-relaxed">
              A world-class community of scholars, innovators, and leaders across 120 programs in 6 faculties.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3 rounded-lg font-body font-semibold text-sm hover:bg-gold-light transition-colors"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3 rounded-lg font-body text-sm hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 md:py-8 text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground font-body text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Images — editorial grid */}
      <Section>
        <div className="grid md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative h-60 md:h-96 rounded-xl overflow-hidden">
            <img src={campusAerial} alt="Campus aerial view" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white font-display text-lg font-bold">300-Acre Campus</p>
              <p className="text-white/60 font-body text-xs">Students from over 120 countries</p>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-rows-2 gap-3">
            <div className="relative rounded-xl overflow-hidden h-40 md:h-auto">
              <img src={library} alt="University Library" className="w-full h-full object-cover" />
              <p className="absolute bottom-3 left-4 text-white font-body text-sm font-medium drop-shadow-lg">Central Library</p>
            </div>
            <div className="relative rounded-xl overflow-hidden h-40 md:h-auto">
              <img src={labResearch} alt="Research laboratory" className="w-full h-full object-cover" />
              <p className="absolute bottom-3 left-4 text-white font-body text-sm font-medium drop-shadow-lg">Research Labs</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Announcements — compact list style */}
      <Section className="bg-muted/40">
        <SectionTitle subtitle="Latest updates from WestBridge University">Announcements</SectionTitle>
        <div className="max-w-3xl mx-auto divide-y divide-border">
          {announcements.map((item) => (
            <div key={item.title} className="flex items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="shrink-0 text-[10px] font-body font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">{item.tag}</span>
                <p className="font-body text-sm font-medium text-foreground truncate">{item.title}</p>
              </div>
              <span className="text-xs text-muted-foreground font-body shrink-0">{item.date}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/news" className="text-sm text-primary font-body font-medium hover:underline inline-flex items-center gap-1">
            All News <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* Faculties — clean image cards */}
      <Section>
        <SectionTitle subtitle="Six faculties, 120+ programs">Our Faculties</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept) => (
            <Link
              key={dept.name}
              to="/faculties"
              className="group relative rounded-xl overflow-hidden h-52"
            >
              <img src={dept.image} alt={dept.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-display text-base font-bold">{dept.name}</h3>
                <p className="text-white/60 font-body text-xs mt-0.5">{dept.programs} programs</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Events — minimal */}
      <Section className="bg-muted/40">
        <SectionTitle subtitle="What's coming up">Upcoming Events</SectionTitle>
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {events.map((event) => (
            <div key={event.title} className="flex gap-4 items-start bg-card rounded-lg p-5 border border-border">
              <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center shrink-0">
                <div className="text-[10px] font-body font-bold uppercase text-gold">{event.month}</div>
                <div className="font-display text-xl font-bold leading-none">{event.date.split(" ")[1]}</div>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground">{event.title}</h3>
                <p className="text-muted-foreground font-body text-xs mt-1">{event.date}, 2026</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/events" className="text-sm text-primary font-body font-medium hover:underline inline-flex items-center gap-1">
            View All Events <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={graduation} alt="Graduation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative container mx-auto px-4 max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Begin Your Academic Journey
          </h2>
          <p className="text-white/60 font-body mb-8">
            Applications for Spring 2026 are now open. Take the first step toward an exceptional education.
          </p>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-lg font-body font-bold hover:bg-gold-light transition-colors"
          >
            Start Your Application <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
