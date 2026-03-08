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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-16 md:py-24 ${className}`}
    >
      <div className="container mx-auto px-4">{children}</div>
    </motion.section>
  );
}

export function SectionTitle({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{children}</h2>
      {subtitle && <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">{subtitle}</p>}
      <div className="mt-4 mx-auto w-16 h-1 bg-gold rounded-full" />
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
    <div className="bg-hero-pattern py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        {breadcrumb && (
          <p className="text-gold/80 font-body text-sm uppercase tracking-widest mb-3">{breadcrumb}</p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-primary-foreground/70 font-body text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
