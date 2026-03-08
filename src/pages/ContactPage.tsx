import { useState } from "react";
import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import { toast } from "sonner";

const contactMapImage = "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you. Reach out to us anytime." breadcrumb="Contact" />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
            <div className="space-y-5 mb-8">
              {[
                { icon: MapPin, label: "Address", value: "1 University Avenue, Academic City, AC 12345" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: Mail, label: "Email", value: "info@westbridgeuniversity.edu" },
                { icon: Clock, label: "Office Hours", value: "Mon–Fri: 8AM–5PM, Sat: 9AM–1PM" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <c.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">{c.label}</p>
                    <p className="font-body text-muted-foreground text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder with campus image */}
            <div className="rounded-xl overflow-hidden h-48">
              <img src={contactMapImage} alt="Campus location" className="w-full h-full object-cover" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 shadow-soft border border-border space-y-5">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Send a Message</h3>
            {[
              { key: "name", label: "Full Name", type: "text" },
              { key: "email", label: "Email Address", type: "email" },
              { key: "subject", label: "Subject", type: "text" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block font-body text-sm font-medium text-foreground mb-1">{f.label}</label>
                <input
                  type={f.type}
                  required
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            ))}
            <div>
              <label className="block font-body text-sm font-medium text-foreground mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              Send Message <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </Section>
    </Layout>
  );
}
