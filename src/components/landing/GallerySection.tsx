import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SEASONS_GALLERY } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
import { ChevronLeft, ChevronRight, Calendar, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function GallerySection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const scrollPrev = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: -(el.clientWidth * 0.85), behavior: 'smooth' });
  }, []);
  const scrollNext = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const checkScroll = () => {
      if (!el) return;
      setPrevBtnDisabled(el.scrollLeft <= 5);
      setNextBtnDisabled(el.scrollLeft + el.clientWidth + 5 >= el.scrollWidth);
    };
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);
  return (
    <section id="gallery" className="py-24 bg-background overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-sm">
              <History className="w-4 h-4" />
              The Archives
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">Past Seasons</h2>
            <p className="text-xl text-muted-foreground max-w-xl font-medium">
              Explore the history of Forsaken and see our journey since the first day.
            </p>
          </div>
          <div className="flex gap-4 p-1">
            <Button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              size="icon"
              className={cn(
                "w-12 h-12 bg-background border-4 border-foreground text-foreground hover:bg-foreground hover:text-background shadow-hard-sm transition-all active:translate-y-0.5 active:shadow-none",
                prevBtnDisabled && "opacity-30 cursor-not-allowed pointer-events-none shadow-none"
              )}
            >
              <ChevronLeft className="h-6 w-6 stroke-[3px]" />
            </Button>
            <Button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              size="icon"
              className={cn(
                "w-12 h-12 bg-background border-4 border-foreground text-foreground hover:bg-foreground hover:text-background shadow-hard-sm transition-all active:translate-y-0.5 active:shadow-none",
                nextBtnDisabled && "opacity-30 cursor-not-allowed pointer-events-none shadow-none"
              )}
            >
              <ChevronRight className="h-6 w-6 stroke-[3px]" />
            </Button>
          </div>
        </div>
        <div 
          className="overflow-x-auto scrollbar-hide snap-x-mandatory" 
          ref={carouselRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex snap-start gap-6 -ml-4 md:-ml-6 flex-nowrap pb-8">
            {SEASONS_GALLERY.map((season) => (
              <div key={season.id} className="flex-shrink-0 snap-start flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_40%] pl-4 md:pl-6 select-none">
                <div className="transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
                  <RetroCard className="h-[350px] md:h-[450px] relative group p-0 border-4 border-foreground">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}