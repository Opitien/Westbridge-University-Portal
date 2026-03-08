import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";
import { ArrowUpRight } from "lucide-react";

const news = [
  { title: "WestBridge University Ranked #87 Globally", date: "Mar 6, 2026", category: "Rankings", excerpt: "The latest world university rankings place WestBridge University among the top 100 institutions worldwide.", image: "https://images.unsplash.com/photo-1523050854058-8df90110c5f1?w=800&q=80" },
  { title: "New $50M Science Building Announced", date: "Mar 4, 2026", category: "Campus", excerpt: "Construction of a state-of-the-art interdisciplinary science center begins this summer.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { title: "Prof. Whitfield Receives National Science Medal", date: "Mar 2, 2026", category: "Awards", excerpt: "Vice Chancellor recognized for lifetime contributions to quantum physics research.", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80" },
  { title: "Partnership with MIT and Stanford", date: "Feb 28, 2026", category: "Partnerships", excerpt: "New collaborative research initiative spanning three continents in AI and robotics.", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" },
  { title: "Student Team Wins Global Hackathon", date: "Feb 25, 2026", category: "Students", excerpt: "Engineering students take first place at the World Innovation Challenge in Tokyo.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" },
  { title: "Spring Enrollment Breaks Record", date: "Feb 20, 2026", category: "Admissions", excerpt: "Over 45,000 applications received for the Spring 2026 intake — a 20% increase.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" },
];

export default function NewsPage() {
  return (
    <Layout>
      <PageHero title="News & Announcements" subtitle="The latest updates from WestBridge University." breadcrumb="News" />

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((n) => (
            <article key={n.title} className="bg-card rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-elevated transition-shadow cursor-pointer group">
              <div className="h-44 overflow-hidden">
                <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-body font-semibold text-accent uppercase tracking-wider">{n.category}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{n.title}</h3>
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
