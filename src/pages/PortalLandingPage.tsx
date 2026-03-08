import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, ShieldCheck, BookOpen } from "lucide-react";
import campusLogin from "@/assets/campus-login.jpg";

export default function PortalLandingPage() {
  return (
    <Layout>
      <PageHero
        title="Student Portal"
        subtitle="Access your academic dashboard, course registration, results, and more."
        breadcrumb="Portal"
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="max-w-lg bg-card rounded-xl p-8 shadow-elevated border border-border">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
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
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 font-body text-xs text-muted-foreground">
                Forgot password? <Link to="/forgot-password" className="text-accent hover:underline">Reset here</Link>
              </p>
            </div>
          </div>

          <div className="hidden lg:block space-y-4">
            <div className="rounded-2xl overflow-hidden h-56">
              <img src={campusLogin} alt="Campus" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-xl p-5 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">Secure Access</p>
                  <p className="font-body text-xs text-muted-foreground">256-bit encrypted connection</p>
                </div>
              </div>
              <div className="bg-muted rounded-xl p-5 flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">Full Access</p>
                  <p className="font-body text-xs text-muted-foreground">Courses, results, fees & more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
