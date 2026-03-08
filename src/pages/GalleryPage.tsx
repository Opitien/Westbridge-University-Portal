import Layout from "@/components/Layout";
import { PageHero, Section } from "@/components/SectionComponents";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Facilities", "Student Life", "Events", "Academics", "Sports", "Graduation"] as const;

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", title: "Administration Building", category: "Facilities" },
  { id: 2, src: "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80", title: "Central Library Reading Hall", category: "Facilities" },
  { id: 3, src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", title: "Faculty of Business Wing", category: "Facilities" },
  { id: 4, src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", title: "Lecture Theatre Complex", category: "Facilities" },
  { id: 5, src: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&q=80", title: "Student Dormitories", category: "Facilities" },
  { id: 6, src: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=600&q=80", title: "University Sports Arena", category: "Facilities" },
  { id: 7, src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80", title: "Study Group in the Quad", category: "Student Life" },
  { id: 8, src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80", title: "Friends on Campus Lawn", category: "Student Life" },
  { id: 9, src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80", title: "Collaborative Project Work", category: "Student Life" },
  { id: 10, src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80", title: "Freshman Welcome Week", category: "Student Life" },
  { id: 11, src: "https://images.unsplash.com/photo-1525026198548-4baa812f1183?w=600&q=80", title: "Campus Coffee Hour", category: "Student Life" },
  { id: 12, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", title: "Annual Research Symposium", category: "Events" },
  { id: 13, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80", title: "Keynote Speaker Series", category: "Events" },
  { id: 14, src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80", title: "TEDx WestBridge", category: "Events" },
  { id: 15, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", title: "Cultural Night Festival", category: "Events" },
  { id: 16, src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80", title: "Founders Day Celebration", category: "Events" },
  { id: 17, src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80", title: "Chemistry Lab Session", category: "Academics" },
  { id: 18, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80", title: "Engineering Workshop", category: "Academics" },
  { id: 19, src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80", title: "Biomedical Research Lab", category: "Academics" },
  { id: 20, src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80", title: "Physics Department", category: "Academics" },
  { id: 21, src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", title: "Outdoor Field Study", category: "Academics" },
  { id: 22, src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80", title: "Inter-University Football", category: "Sports" },
  { id: 23, src: "https://images.unsplash.com/photo-1461896836934-bd45ba0fcfca?w=600&q=80", title: "Athletics Championship", category: "Sports" },
  { id: 24, src: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&q=80", title: "Basketball Tournament", category: "Sports" },
  { id: 25, src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80", title: "Swimming Gala", category: "Sports" },
  { id: 26, src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80", title: "Class of 2025 Ceremony", category: "Graduation" },
  { id: 27, src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80", title: "Cap Toss Celebration", category: "Graduation" },
  { id: 28, src: "https://images.unsplash.com/photo-1627556704353-39ef22c18ecd?w=600&q=80", title: "Degree Presentation", category: "Graduation" },
  { id: 29, src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80", title: "Alumni Award Ceremony", category: "Graduation" },
  { id: 30, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80", title: "Graduation Family Photos", category: "Graduation" },
];

function GalleryImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div className="overflow-hidden relative">
      {!loaded && (
        <div className="w-full aspect-[4/3] bg-muted animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full object-cover transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
        loading="lazy"
        onLoad={handleLoad}
        onClick={onClick}
      />
    </div>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter(i => i.category === activeCategory);
  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const navigateLightbox = (dir: number) => {
    if (lightboxIndex === null) return;
    const next = lightboxIndex + dir;
    if (next >= 0 && next < filtered.length) setLightboxIndex(next);
  };

  return (
    <Layout>
      <PageHero title="Photo Gallery" subtitle="Explore life at WestBridge through our lens." breadcrumb="Gallery" />

      <Section>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
              className={`px-5 py-2 rounded-full font-body text-sm transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-xs opacity-60">
                ({cat === "All" ? galleryItems.length : galleryItems.filter(i => i.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="break-inside-avoid cursor-pointer group overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="group-hover:scale-105 transition-transform duration-500">
                  <GalleryImage
                    src={item.src}
                    alt={item.title}
                    onClick={() => setLightboxIndex(idx)}
                  />
                </div>
                <div className="px-3 py-2.5" onClick={() => setLightboxIndex(idx)}>
                  <p className="font-body text-sm font-medium text-foreground leading-tight">{item.title}</p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button className="absolute top-5 right-5 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
              <X className="h-6 w-6" />
            </button>

            {lightboxIndex > 0 && (
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); navigateLightbox(-1); }}>
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}
            {lightboxIndex < filtered.length - 1 && (
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); navigateLightbox(1); }}>
                <ChevronRight className="h-8 w-8" />
              </button>
            )}

            <motion.img
              key={lightboxItem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxItem.src.replace("w=600", "w=1400")}
              alt={lightboxItem.title}
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              onClick={e => e.stopPropagation()}
            />
            <div className="absolute bottom-6 text-center text-white">
              <p className="text-lg font-medium">{lightboxItem.title}</p>
              <p className="text-sm text-white/50">{lightboxItem.category} · {lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
