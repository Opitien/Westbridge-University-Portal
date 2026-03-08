import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function PortalLandingPage() {
  return (
    <Layout>
      <PageHero
        title="Student Portal"
        subtitle="Access your academic dashboard, course registration, results, and more."
        breadcrumb="Portal"
      />

      <Section>
        <div className="max-w-lg mx-auto bg-card rounded-xl p-8 shadow-elevated border border-border text-center">
          <GraduationCap className="h-12 w-12 text-gold mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Sign In to Portal</h2>
          <p className="font-body text-muted-foreground text-sm mb-6">
            Enter your matriculation number and password to access your dashboard.
          </p>
          <div className="space-y-4 text-left">
            <div>
              <label className="block font-body text-sm font-medium text-foreground mb-1">Matriculation Number</label>
              <input
                type="text"
                placeholder="e.g. GU/2024/001234"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-foreground mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
            <button className="w-full bg-navy text-primary-foreground py-3 rounded-lg font-body font-semibold hover:bg-navy-light transition-colors flex items-center justify-center gap-2">
              Sign In <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 font-body text-xs text-muted-foreground">
            Forgot password? <a href="#" className="text-gold hover:underline">Reset here</a>
          </p>
        </div>
      </Section>
    </Layout>
  );
}
