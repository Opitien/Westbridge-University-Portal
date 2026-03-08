import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Grand University</h3>
            <p className="text-primary-foreground/70 text-sm font-body leading-relaxed mb-6">
              Empowering minds, shaping futures. A tradition of academic excellence since 1892.
            </p>
            <div className="flex gap-4">
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((s) => (
                <a key={s} href="#" className="text-primary-foreground/50 hover:text-gold transition-colors text-sm font-body">{s[0]}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm">
              {[
                { label: "About Us", path: "/about" },
                { label: "Admissions", path: "/admissions" },
                { label: "Faculties", path: "/faculties" },
                { label: "Research", path: "/research" },
                { label: "Campus Life", path: "/campus-life" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-primary-foreground/70 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold mb-4">Resources</h4>
            <ul className="space-y-2 font-body text-sm">
              {[
                { label: "Student Portal", path: "/portal" },
                { label: "Library", path: "/campus-life" },
                { label: "Events", path: "/events" },
                { label: "News", path: "/news" },
                { label: "FAQ", path: "/faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-primary-foreground/70 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-gold mb-4">Contact Us</h4>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                <span>1 University Avenue, Academic City, AC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <span>info@granduniversity.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} Grand University. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-body text-primary-foreground/50">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
