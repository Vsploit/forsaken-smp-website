import React from 'react';
import { CURRENT_SEASON_DATA, SOCIAL_LINKS } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
export function SeasonHighlight() {
  return (
    <section id="current-season" className="py-24 bg-orange-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-600 text-white font-bold text-xs uppercase tracking-widest mb-4 shadow-hard-sm">
            <Sparkles className="w-4 h-4" />
            Active Season
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gradient-forsaken">
            {CURRENT_SEASON_DATA.title}
          </h2>
        </div>
        <RetroCard className="max-w-5xl mx-auto bg-white">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-3/5 aspect-video overflow-hidden">
              <img
                src={CURRENT_SEASON_DATA.url}
                alt={CURRENT_SEASON_DATA.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-black text-orange-600 uppercase tracking-widest">Est. {CURRENT_SEASON_DATA.year}</span>
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  {CURRENT_SEASON_DATA.highlight}
                </p>
              </div>
              <p className="text-muted-foreground">
                Step into our most vibrant world yet. Season 3 brings the community together in an ever-evolving landscape.
              </p>
              <Button
                size="lg"
                className="w-full h-14 text-lg font-black bg-orange-600 hover:bg-orange-700 text-white border-4 border-black shadow-hard active:translate-y-1 active:shadow-none transition-all"
                asChild
              >
                <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
                  Join Season 3 <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </RetroCard>
      </div>
    </section>
  );
}