import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { SEASONS_GALLERY } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
import { ChevronLeft, ChevronRight, Calendar, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps',
    skipSnaps: false,
    dragFree: false,
    duration: 30
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);
  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-sm">
              <History className="w-4 h-4" />
              The Archives
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Past Seasons</h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              Take a trip through the history of Forsaken and see our journey since the beginning.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              size="icon"
              aria-label="Previous slide"
              className={cn(
                "w-12 h-12 bg-white border-4 border-black text-black hover:bg-black hover:text-white shadow-hard-sm transition-all active:translate-y-0.5 active:shadow-none",
                prevBtnDisabled && "opacity-30 cursor-not-allowed pointer-events-none shadow-none"
              )}
            >
              <ChevronLeft className="h-6 w-6 stroke-[3px]" />
            </Button>
            <Button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              size="icon"
              aria-label="Next slide"
              className={cn(
                "w-12 h-12 bg-white border-4 border-black text-black hover:bg-black hover:text-white shadow-hard-sm transition-all active:translate-y-0.5 active:shadow-none",
                nextBtnDisabled && "opacity-30 cursor-not-allowed pointer-events-none shadow-none"
              )}
            >
              <ChevronRight className="h-6 w-6 stroke-[3px]" />
            </Button>
          </div>
        </div>
        <div className="embla overflow-visible" ref={emblaRef}>
          <div className="embla__container flex -ml-4 md:-ml-6">
            {SEASONS_GALLERY.map((season) => (
              <div key={season.id} className="embla__slide flex-[0_0_85%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_40%] pl-4 md:pl-6 select-none">
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <RetroCard className="h-[350px] md:h-[450px] relative group p-0">
                    <img
                      src={season.url}
                      alt={season.title}
                      draggable={false}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white text-left pointer-events-none">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        <span className="text-xs md:text-sm font-black uppercase tracking-widest text-orange-400">
                          {season.year}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-3xl font-black uppercase italic mb-2 tracking-tighter">
                        {season.title}
                      </h3>
                      <p className="text-xs md:text-sm font-bold text-gray-300 uppercase tracking-wide">
                        {season.theme}
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