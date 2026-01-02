import React from 'react';
import { PLUGIN_FEATURES } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
export function PluginGrid() {
  return (
    <section id="plugins" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Current Season Plugins</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          Technical enhancements powering our community world.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {PLUGIN_FEATURES.map((feature, idx) => (
          <RetroCard
            key={idx}
            className="group bg-card p-0 overflow-hidden border-4 border-foreground shadow-hard"
          >
            <div className="aspect-[4/5] w-full">
              <img
                src={feature.imageUrl}
                alt={`Plugin showcase ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </RetroCard>
        ))}
      </div>
    </section>
  );
}