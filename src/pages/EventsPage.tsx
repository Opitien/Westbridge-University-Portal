import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { Calendar } from "lucide-react";

const events = [
  { title: "Spring Open Day", date: "March 15, 2026", type: "Admissions", desc: "Tour the campus, meet faculty, and explore programs." },
  { title: "International Research Symposium", date: "March 22-24, 2026", type: "Conference", desc: "Leading researchers present their latest findings." },
  { title: "Alumni Homecoming Weekend", date: "April 5-6, 2026", type: "Alumni", desc: "Reconnect with classmates and celebrate our legacy." },
  { title: "Annual Convocation Ceremony", date: "May 20, 2026", type: "Graduation", desc: "Celebrating the class of 2026." },
  { title: "Science Fair 2026", date: "June 8, 2026", type: "Academic", desc: "Student-led science and engineering exhibitions." },
  { title: "Cultural Festival", date: "July 12-14, 2026", type: "Culture", desc: "A celebration of diversity with food, music, and art." },
];

const calendarItems = [
  { period: "Oct 1, 2025 – Feb 15, 2026", event: "Fall Semester" },
  { period: "Mar 1 – Jul 15, 2026", event: "Spring Semester" },
  { period: "Jul 20 – Sep 15, 2026", event: "Summer Session" },
  { period: "Dec 15 – Jan 5", event: "Winter Break" },
];

export default function EventsPage() {
  return (
    <Layout>
      <PageHero title="Events & Calendar" subtitle="Stay connected with the university calendar and upcoming events." breadcrumb="Events" />

      <Section>
        <SectionTitle subtitle="Mark your calendar for these exciting events">Upcoming Events</SectionTitle>
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((e) => (
            <div key={e.title} className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-elevated transition-shadow">
              <span className="text-xs font-body font-semibold text-gold uppercase tracking-wider">{e.type}</span>
              <h3 className="font-display text-lg font-bold text-foreground mt-1 mb-2">{e.title}</h3>
              <p className="text-muted-foreground font-body text-sm mb-3">{e.desc}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                <Calendar className="h-4 w-4 text-gold" /> {e.date}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/50">
        <SectionTitle>Academic Calendar</SectionTitle>
        <div className="max-w-2xl mx-auto space-y-4">
          {calendarItems.map((c) => (
            <div key={c.event} className="flex justify-between items-center bg-card rounded-lg p-4 shadow-soft border border-border">
              <span className="font-body font-semibold text-foreground">{c.event}</span>
              <span className="text-sm font-body text-muted-foreground">{c.period}</span>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
