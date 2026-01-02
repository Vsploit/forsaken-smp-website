import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { SEASONS_GALLERY } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
import { ChevronLeft, ChevronRight, Calendar, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const onSelect = useCallback((api: any) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);
  return (
    <section id="gallery" className="py-24 bg-indigo-500/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-sm">
              <Camera className="w-4 h-4" />
              The Bizarre Collection
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Snapshots of the Surreal</h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              Witness the anomalies. A curated gallery of the most bizarre moments in our history.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              size="icon"
              className={cn(
                "bg-white border-4 border-black text-black hover:bg-black hover:text-white shadow-hard-sm transition-all",
                prevBtnDisabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              size="icon"
              className={cn(
                "bg-white border-4 border-black text-black hover:bg-black hover:text-white shadow-hard-sm transition-all",
                nextBtnDisabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {SEASONS_GALLERY.map((season) => (
              <div key={season.id} className="embla__slide flex-[0_0_85%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_40%] pl-6 first:pl-0">
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <RetroCard className="h-[450px] relative group p-0">
                    <img
                      src={season.url}
                      alt={season.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Deep gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-left">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-black uppercase tracking-widest text-indigo-400">
                          {season.year}
                        </span>
                      </div>
                      <h3 className="text-3xl font-black uppercase italic mb-2 tracking-tight">{season.title}</h3>
                      <div className="w-12 h-1 bg-indigo-500 mb-4 group-hover:w-24 transition-all duration-300" />
                      <p className="text-sm font-bold text-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        Concept: {season.theme}
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