import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone, Mail, HelpCircle, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import universityCrest from "@/assets/university-crest.png";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    children: [
      { label: "History", path: "/about#history" },
      { label: "Mission & Vision", path: "/about#mission" },
      { label: "Leadership", path: "/about#leadership" },
    ],
  },
  {
    label: "Academics",
    path: "/faculties",
    children: [
      { label: "Faculties", path: "/faculties" },
      { label: "Research", path: "/research" },
    ],
  },
  { label: "Admissions", path: "/admissions" },
  { label: "Campus Life", path: "/campus-life" },
  { label: "Events", path: "/events" },
  { label: "News", path: "/news" },
  {
    label: "Media",
    path: "/gallery",
    children: [
      { label: "Photo Gallery", path: "/gallery" },
      { label: "Downloads", path: "/downloads" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-navy-dark border-b border-primary-foreground/10">
        <div className="container mx-auto flex items-center justify-between px-4 py-1.5 text-xs font-body text-primary-foreground/70">
          <div className="hidden md:flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-gold" />
              +1 (555) 123-4567
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-gold" />
              info@westbridgeuniversity.edu
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link to="/faq" className="flex items-center gap-1 hover:text-gold transition-colors">
              <HelpCircle className="h-3 w-3" />
              FAQ
            </Link>
            <Link to="/portal" className="flex items-center gap-1 hover:text-gold transition-colors font-semibold text-gold">
              <ExternalLink className="h-3 w-3" />
              Student Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-card/98 backdrop-blur-lg border-b border-border shadow-elevated">
        <div className="container mx-auto flex items-center justify-between px-4 h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img src={universityCrest} alt="WestBridge University Crest" className="h-11 w-11 transition-transform group-hover:scale-105" />
            </div>
            <div className="leading-tight">
              <h1 className="font-heading text-base font-bold text-primary tracking-tight">WestBridge University</h1>
              <p className="text-[10px] text-muted-foreground font-body uppercase tracking-[0.15em]">Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5 font-body text-[13px] font-medium">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1 ${
                    isActive(item.path)
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3 w-3 opacity-50" />}
                </Link>
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.12 }}
                      className="absolute top-full left-0 mt-0.5 bg-card border border-border rounded-lg shadow-elevated py-1.5 min-w-[190px] z-50"
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            to={child.path}
                            className="block px-4 py-2 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* CTA + Theme toggle + Mobile toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/admissions"
              className="hidden lg:inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-body text-xs font-bold hover:bg-gold-light transition-colors"
            >
              Apply Now
            </Link>
            <button
              className="lg:hidden p-2 text-foreground rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="lg:hidden overflow-hidden border-t border-border bg-card"
            >
              <ul className="px-4 py-3 space-y-0.5 font-body text-sm">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.path) ? "text-primary font-semibold bg-primary/5" : "text-foreground/80 hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="pl-6 space-y-0.5">
                        {item.children.map(child => (
                          <li key={child.label}>
                            <Link
                              to={child.path}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    to="/admissions"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center bg-accent text-accent-foreground px-4 py-2.5 rounded-lg font-bold"
                  >
                    Apply Now
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
