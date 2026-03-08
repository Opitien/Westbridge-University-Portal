import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";

const news = [
  { title: "Grand University Ranked #87 Globally", date: "Mar 6, 2026", category: "Rankings", excerpt: "The latest world university rankings place Grand University among the top 100 institutions worldwide." },
  { title: "New $50M Science Building Announced", date: "Mar 4, 2026", category: "Campus", excerpt: "Construction of a state-of-the-art interdisciplinary science center begins this summer." },
  { title: "Prof. Whitfield Receives National Science Medal", date: "Mar 2, 2026", category: "Awards", excerpt: "Vice Chancellor recognized for lifetime contributions to quantum physics research." },
  { title: "Partnership with MIT and Stanford", date: "Feb 28, 2026", category: "Partnerships", excerpt: "New collaborative research initiative spanning three continents in AI and robotics." },
  { title: "Student Team Wins Global Hackathon", date: "Feb 25, 2026", category: "Students", excerpt: "Engineering students take first place at the World Innovation Challenge in Tokyo." },
  { title: "Spring Enrollment Breaks Record", date: "Feb 20, 2026", category: "Admissions", excerpt: "Over 45,000 applications received for the Spring 2026 intake — a 20% increase." },
];

export default function NewsPage() {
  return (
    <Layout>
      <PageHero title="News & Announcements" subtitle="The latest updates from Grand University." breadcrumb="News" />

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((n) => (
            <article key={n.title} className="bg-card rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-elevated transition-shadow cursor-pointer group">
              <div className="h-2 bg-gold" />
              <div className="p-6">
                <span className="text-xs font-body font-semibold text-gold uppercase tracking-wider">{n.category}</span>
                <h3 className="font-display text-lg font-bold text-foreground mt-2 mb-2 group-hover:text-gold transition-colors">{n.title}</h3>
                <p className="text-muted-foreground font-body text-sm mb-3 line-clamp-2">{n.excerpt}</p>
                <p className="text-xs font-body text-muted-foreground">{n.date}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
