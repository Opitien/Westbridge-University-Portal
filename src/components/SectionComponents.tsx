import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`py-14 md:py-20 ${className}`}
    >
      <div className="container mx-auto px-4">{children}</div>
    </motion.section>
  );
}

export function SectionTitle({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{children}</h2>
      {subtitle && <p className="text-muted-foreground font-body text-sm mt-2 max-w-xl">{subtitle}</p>}
    </div>
  );
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <div className="bg-hero-pattern py-16 md:py-24">
      <div className="container mx-auto px-4">
        {breadcrumb && (
          <p className="text-gold/70 font-body text-xs uppercase tracking-widest mb-2">{breadcrumb}</p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-3"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/60 font-body text-base max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
