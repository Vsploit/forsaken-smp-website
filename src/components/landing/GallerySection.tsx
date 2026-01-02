import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { SEASONS_GALLERY } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <section id="gallery" className="py-24 bg-minecraft-sky/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4 text-left">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The History Hall</h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              Relive the epic builds, massive wars, and legendary moments from our previous world resets.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={scrollPrev}
              size="icon"
              className="bg-white border-4 border-black text-black hover:bg-black hover:text-white shadow-hard-sm transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={scrollNext}
              size="icon"
              className="bg-white border-4 border-black text-black hover:bg-black hover:text-white shadow-hard-sm transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {SEASONS_GALLERY.map((season) => (
              <div key={season.id} className="embla__slide flex-[0_0_85%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 first:pl-0">
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <RetroCard className="h-[400px] relative group p-0">
                    <img
                      src={season.url}
                      alt={season.title}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-minecraft-sky" />
                        <span className="text-xs font-black uppercase tracking-widest text-minecraft-sky">
                          {season.year}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black uppercase italic mb-1">{season.title}</h3>
                      <p className="text-sm font-bold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        Theme: {season.theme}
                      </p>
                    </div>
                  </RetroCard>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}