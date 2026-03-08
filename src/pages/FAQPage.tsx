import { useState } from "react";
import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "How do I apply to Grand University?", a: "Visit our Admissions page and click 'Start Application'. You'll need to create an account, fill in your details, upload documents, and pay the application fee." },
  { q: "What are the tuition fees?", a: "Tuition varies by program. Undergraduate programs range from $8,000–$15,000 per year. Postgraduate programs range from $10,000–$25,000. Scholarships are available for qualifying students." },
  { q: "Is campus housing available?", a: "Yes, Grand University offers modern on-campus housing for over 8,000 students. You can apply for hostel accommodation through the student portal after admission." },
  { q: "What scholarships are available?", a: "We offer merit-based, need-based, and athletic scholarships. International students may qualify for our Global Excellence Scholarship covering up to 100% of tuition." },
  { q: "How do I access the student portal?", a: "After enrollment, you'll receive your matriculation number and login credentials via email. Use these to access the student portal at the portal link in the navigation." },
  { q: "Can I transfer credits from another university?", a: "Yes, we accept transfer credits from accredited institutions. Submit your transcripts during application and our academic office will evaluate eligible credits." },
  { q: "What support services are available?", a: "We offer academic advising, career counseling, mental health services, disability support, tutoring, and a 24/7 helpline for all students." },
  { q: "How do I contact my department?", a: "Each department page lists contact information including email and phone number. You can also reach departments through the Contact page." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Layout>
      <PageHero title="Frequently Asked Questions" subtitle="Find answers to common questions about Grand University." breadcrumb="FAQ" />

      <Section>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-display text-base font-semibold text-foreground pr-4">{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="h-5 w-5 text-gold shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
