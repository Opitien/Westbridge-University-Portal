import Layout from "@/components/Layout";
import { PageHero, Section, SectionTitle } from "@/components/SectionComponents";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryCategories = ["All", "Campus", "Events", "Academics", "Sports", "Graduation"];

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600", title: "Main Campus Building", category: "Campus" },
  { id: 2, src: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600", title: "University Library", category: "Campus" },
  { id: 3, src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600", title: "Graduation Ceremony 2025", category: "Graduation" },
  { id: 4, src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600", title: "Student Orientation", category: "Events" },
  { id: 5, src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600", title: "Science Laboratory", category: "Academics" },
  { id: 6, src: "https://images.unsplash.com/photo-1461896836934-bd45ba0fcfca?w=600", title: "Sports Day", category: "Sports" },
  { id: 7, src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600", title: "Campus Aerial View", category: "Campus" },
  { id: 8, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600", title: "Lecture Hall", category: "Academics" },
  { id: 9, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", title: "Annual Conference", category: "Events" },
  { id: 10, src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600", title: "Football Match", category: "Sports" },
  { id: 11, src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600", title: "Convocation", category: "Graduation" },
  { id: 12, src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600", title: "Student Garden", category: "Campus" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter(i => i.category === activeCategory);

  return (
    <Layout>
      <PageHero title="Photo Gallery" subtitle="Explore campus life through our lens." breadcrumb="Gallery" />

      <Section>
        <SectionTitle subtitle="Browse photos from across campus life and university events.">Our Gallery</SectionTitle>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {galleryCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer group overflow-hidden rounded-xl border border-border"
                onClick={() => setLightbox(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 bg-card">
                  <p className="font-body text-sm font-medium text-foreground">{item.title}</p>
                  <p className="font-body text-xs text-muted-foreground">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-primary-foreground" onClick={() => setLightbox(null)}>
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightbox.src.replace("w=600", "w=1200")}
              alt={lightbox.title}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            <div className="absolute bottom-8 text-center text-primary-foreground">
              <p className="font-display text-xl font-bold">{lightbox.title}</p>
              <p className="font-body text-sm opacity-70">{lightbox.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
