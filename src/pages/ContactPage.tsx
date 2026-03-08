import { useState } from "react";
import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

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
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
            <div className="space-y-6 mb-8">
              {[
                { icon: MapPin, label: "Address", value: "1 University Avenue, Academic City, AC 12345" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: Mail, label: "Email", value: "info@granduniversity.edu" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="bg-navy text-primary-foreground p-3 rounded-lg">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground">{c.label}</p>
                    <p className="font-body text-muted-foreground text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-display text-lg font-bold text-foreground mb-3">Office Hours</h3>
            <div className="font-body text-sm text-muted-foreground space-y-1">
              <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
              <p>Saturday: 9:00 AM – 1:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Form */}
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
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
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
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-navy text-primary-foreground py-3 rounded-lg font-body font-semibold hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
            >
              Send Message <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </Section>
    </Layout>
  );
}
