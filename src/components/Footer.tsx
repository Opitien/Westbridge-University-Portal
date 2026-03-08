import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import universityCrest from "@/assets/university-crest.png";

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-gradient text-primary-foreground">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <img src={universityCrest} alt="Grand University" className="h-10 w-10 brightness-0 invert opacity-90" />
              <div>
                <h3 className="font-heading text-lg font-bold">Grand University</h3>
                <p className="text-[10px] text-primary-foreground/50 uppercase tracking-[0.15em]">Est. 1892</p>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm font-body leading-relaxed mb-6 max-w-xs">
              Empowering minds, shaping futures. A tradition of academic excellence and global impact for over 130 years.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gold mb-5">Quick Links</h4>
            <ul className="space-y-2.5 font-body text-sm">
              {[
                { label: "About Us", path: "/about" },
                { label: "Admissions", path: "/admissions" },
                { label: "Faculties", path: "/faculties" },
                { label: "Research", path: "/research" },
                { label: "Campus Life", path: "/campus-life" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-primary-foreground/60 hover:text-gold transition-colors hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gold mb-5">Resources</h4>
            <ul className="space-y-2.5 font-body text-sm">
              {[
                { label: "Student Portal", path: "/portal" },
                { label: "Library", path: "/campus-life" },
                { label: "Events", path: "/events" },
                { label: "News", path: "/news" },
                { label: "Downloads", path: "/downloads" },
                { label: "FAQ", path: "/faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-primary-foreground/60 hover:text-gold transition-colors hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gold mb-5">Contact Us</h4>
            <ul className="space-y-4 font-body text-sm text-primary-foreground/60">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-gold" />
                </div>
                <span>1 University Avenue,<br />Academic City, AC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-gold" />
                </div>
                <span>info@granduniversity.edu</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Globe className="h-4 w-4 text-gold" />
                </div>
                <span>www.granduniversity.edu</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/40 font-body">
            © {new Date().getFullYear()} Grand University. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-body text-primary-foreground/40">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Accessibility</a>
            <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
