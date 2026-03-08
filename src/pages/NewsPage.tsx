import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";

const news = [
  { title: "WestBridge Ranked #87 Globally", date: "Mar 6, 2026", tag: "Rankings", excerpt: "The latest world university rankings place WestBridge among the top 100 institutions worldwide.", image: "https://images.unsplash.com/photo-1523050854058-8df90110c5f1?w=800&q=80" },
  { title: "New $50M Science Building Announced", date: "Mar 4, 2026", tag: "Campus", excerpt: "Construction of a state-of-the-art interdisciplinary science centre begins this summer.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { title: "Prof. Whitfield Receives National Science Medal", date: "Mar 2, 2026", tag: "Awards", excerpt: "Vice Chancellor recognised for lifetime contributions to quantum physics research.", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80" },
  { title: "Partnership with MIT and Stanford", date: "Feb 28, 2026", tag: "Partnerships", excerpt: "New collaborative research initiative spanning three continents in AI and robotics.", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" },
  { title: "Student Team Wins Global Hackathon", date: "Feb 25, 2026", tag: "Students", excerpt: "Engineering students take first place at the World Innovation Challenge in Tokyo.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" },
  { title: "Spring Enrollment Breaks Record", date: "Feb 20, 2026", tag: "Admissions", excerpt: "Over 45,000 applications received for the Spring 2026 intake — a 20% increase.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" },
];

export default function NewsPage() {
  return (
    <Layout>
      <PageHero title="News & Announcements" subtitle="The latest from WestBridge University." breadcrumb="News" />

      <Section>
        {/* Featured article */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl overflow-hidden h-64 lg:h-auto">
            <img src={news[0].image} alt={news[0].title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-body font-bold uppercase tracking-wider text-accent mb-2">{news[0].tag}</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{news[0].title}</h2>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{news[0].excerpt}</p>
            <p className="text-xs font-body text-muted-foreground">{news[0].date}</p>
          </div>
        </div>

        {/* Rest of articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.slice(1).map((n) => (
            <article key={n.title} className="bg-card rounded-lg overflow-hidden border border-border hover:border-border/80 transition-colors group cursor-pointer">
              <div className="h-40 overflow-hidden">
                <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-body font-bold uppercase tracking-wider text-accent">{n.tag}</span>
                  <span className="text-[10px] font-body text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2">{n.title}</h3>
                <p className="text-muted-foreground font-body text-xs line-clamp-2">{n.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
