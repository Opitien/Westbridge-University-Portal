import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { CheckCircle, ArrowRight, FileText, Calendar } from "lucide-react";

const requirements = [
  "Completed secondary school certificate (or equivalent)",
  "Minimum GPA of 3.0 / 4.0 (or equivalent)",
  "English proficiency test (TOEFL / IELTS for international students)",
  "Two letters of recommendation",
  "Personal statement / essay",
  "Application fee payment",
];

const steps = [
  { step: 1, title: "Create Account", desc: "Register on our online application portal" },
  { step: 2, title: "Fill Application", desc: "Complete all required sections of the form" },
  { step: 3, title: "Upload Documents", desc: "Submit transcripts, certificates, and ID" },
  { step: 4, title: "Pay Fee", desc: "Pay the non-refundable application fee" },
  { step: 5, title: "Track Status", desc: "Monitor your application status online" },
];

export default function AdmissionsPage() {
  return (
    <Layout>
      <PageHero
        title="Admissions"
        subtitle="Start your journey at Grand University. Applications for Spring 2026 are now open."
        breadcrumb="Admissions"
      />

      {/* Overview */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Why Grand University?</h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Grand University offers a transformative educational experience with world-class faculty, cutting-edge facilities, and a diverse global community. Our graduates are leaders in every field.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Acceptance Rate", value: "18%" },
                { label: "Scholarship Rate", value: "65%" },
                { label: "Employment Rate", value: "96%" },
                { label: "Avg. Starting Salary", value: "$72K" },
              ].map((s) => (
                <div key={s.label} className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gold">{s.value}</div>
                  <div className="text-sm font-body text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Entry Requirements</h3>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 font-body text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-muted/50">
        <SectionTitle subtitle="Follow these simple steps to apply">Application Process</SectionTitle>
        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((s) => (
            <div key={s.step} className="bg-card rounded-xl p-6 shadow-soft border border-border text-center relative">
              <div className="w-10 h-10 rounded-full bg-navy text-primary-foreground font-display font-bold text-lg flex items-center justify-center mx-auto mb-3">
                {s.step}
              </div>
              <h4 className="font-display text-sm font-bold text-foreground mb-1">{s.title}</h4>
              <p className="text-xs font-body text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Deadlines */}
      <Section>
        <SectionTitle>Important Dates</SectionTitle>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { date: "March 15, 2026", event: "Application Portal Opens" },
            { date: "June 30, 2026", event: "Early Decision Deadline" },
            { date: "August 15, 2026", event: "Regular Decision Deadline" },
            { date: "September 1, 2026", event: "Admission Results Released" },
            { date: "October 1, 2026", event: "Semester Begins" },
          ].map((d) => (
            <div key={d.event} className="flex items-center gap-4 bg-card rounded-lg p-4 shadow-soft border border-border">
              <Calendar className="h-5 w-5 text-gold shrink-0" />
              <div className="flex-1">
                <p className="font-body font-semibold text-foreground">{d.event}</p>
              </div>
              <span className="text-sm font-body text-muted-foreground">{d.date}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-hero-pattern py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Ready to Apply?</h2>
          <p className="text-primary-foreground/70 font-body mb-8 max-w-lg mx-auto">
            Begin your application today and take the first step toward your future at Grand University.
          </p>
          <button className="bg-gold text-navy-dark px-10 py-4 rounded-lg font-body font-bold text-lg hover:bg-gold-light transition-colors shadow-gold inline-flex items-center gap-2">
            Start Application <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </Layout>
  );
}
