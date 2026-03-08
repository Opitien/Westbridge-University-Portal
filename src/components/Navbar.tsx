import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import universityCrest from "@/assets/university-crest.png";

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
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-navy-dark">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm font-body text-primary-foreground/80">
          <div className="hidden md:flex gap-6">
            <span>📞 +1 (555) 123-4567</span>
            <span>✉️ info@granduniversity.edu</span>
          </div>
          <div className="flex gap-4 ml-auto">
            <Link to="/faq" className="hover:text-gold transition-colors">FAQ</Link>
            <Link to="/portal" className="hover:text-gold transition-colors font-semibold">Student Portal →</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={universityCrest} alt="Grand University Crest" className="h-12 w-12" />
            <div>
              <h1 className="font-display text-lg font-bold text-primary leading-tight">Grand University</h1>
              <p className="text-xs text-muted-foreground font-body">Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1 font-body text-sm font-medium">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                    isActive(item.path)
                      ? "text-gold font-semibold"
                      : "text-foreground hover:text-gold"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3 w-3" />}
                </Link>
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-elevated py-2 min-w-[180px] z-50"
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            to={child.path}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-gold transition-colors"
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

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <ul className="px-4 py-4 space-y-1 font-body">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-3 py-2 rounded-md ${
                        isActive(item.path) ? "text-gold font-semibold bg-muted" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
