import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, FlaskConical, Calendar, ArrowRight, Award, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import { Section, SectionTitle } from "@/components/SectionComponents";
import heroCampus from "@/assets/hero-campus.jpg";

const stats = [
  { label: "Students", value: "25,000+", icon: Users },
  { label: "Programs", value: "120+", icon: BookOpen },
  { label: "Research Centers", value: "45", icon: FlaskConical },
  { label: "Global Ranking", value: "Top 100", icon: Globe },
];

const departments = [
  { name: "Faculty of Engineering", programs: 18, icon: "⚙️" },
  { name: "Faculty of Medicine", programs: 12, icon: "🏥" },
  { name: "Faculty of Arts & Humanities", programs: 22, icon: "🎨" },
  { name: "Faculty of Business", programs: 15, icon: "📊" },
  { name: "Faculty of Sciences", programs: 20, icon: "🔬" },
  { name: "Faculty of Law", programs: 8, icon: "⚖️" },
];

const announcements = [
  { title: "Spring 2026 Admission Now Open", date: "Mar 5, 2026", category: "Admissions" },
  { title: "Research Grant Award — $2.5M", date: "Mar 3, 2026", category: "Research" },
  { title: "Annual Convocation Ceremony", date: "Feb 28, 2026", category: "Events" },
  { title: "New AI Research Lab Opening", date: "Feb 25, 2026", category: "Campus" },
];

const events = [
  { title: "Open Day 2026", date: "Mar 15", month: "MAR" },
  { title: "International Research Symposium", date: "Mar 22", month: "MAR" },
  { title: "Alumni Homecoming", date: "Apr 5", month: "APR" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroCampus} alt="Grand University Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-hero-pattern" />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-gold font-body text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
              Est. 1892 — A Legacy of Excellence
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Shape Your
              <span className="text-gradient-gold block">Future Here</span>
            </h1>
            <p className="text-primary-foreground/80 font-body text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              Join a world-class community of scholars, innovators, and leaders.
              Discover programs that transform potential into impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 bg-gold text-navy-dark px-8 py-3.5 rounded-lg font-body font-semibold hover:bg-gold-light transition-colors shadow-gold"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-body font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                Explore Campus
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-elevated text-center"
              >
                <stat.icon className="h-8 w-8 text-gold mx-auto mb-2" />
                <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground font-body text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <Section>
        <SectionTitle subtitle="Stay updated with the latest news from Grand University">
          Latest Announcements
        </SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {announcements.map((item) => (
            <div key={item.title} className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-elevated transition-shadow group cursor-pointer">
              <span className="text-xs font-body font-semibold text-gold uppercase tracking-wider">{item.category}</span>
              <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{item.date}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Departments */}
      <Section className="bg-muted/50">
        <SectionTitle subtitle="Explore our diverse range of academic faculties">
          Our Faculties
        </SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept.name}
              to="/faculties"
              className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-elevated hover:border-gold/30 transition-all group"
            >
              <span className="text-3xl mb-3 block">{dept.icon}</span>
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-gold transition-colors">{dept.name}</h3>
              <p className="text-muted-foreground font-body text-sm mt-1">{dept.programs} Programs Available</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Events */}
      <Section>
        <SectionTitle subtitle="Don't miss out on exciting upcoming events">
          Upcoming Events
        </SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.title} className="flex gap-4 items-start bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className="bg-navy text-primary-foreground rounded-lg p-3 text-center min-w-[60px]">
                <div className="text-xs font-body font-bold uppercase text-gold">{event.month}</div>
                <div className="font-display text-xl font-bold">{event.date.split(" ")[1]}</div>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{event.title}</h3>
                <p className="text-muted-foreground font-body text-sm mt-1">{event.date}, 2026</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/events" className="inline-flex items-center gap-2 text-gold font-body font-semibold hover:underline">
            View All Events <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-hero-pattern py-20">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="h-12 w-12 text-gold mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Begin Your Academic Journey
          </h2>
          <p className="text-primary-foreground/70 font-body text-lg max-w-xl mx-auto mb-8">
            Applications for Spring 2026 are now open. Take the first step toward an exceptional education.
          </p>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 bg-gold text-navy-dark px-10 py-4 rounded-lg font-body font-bold text-lg hover:bg-gold-light transition-colors shadow-gold"
          >
            Start Your Application <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
