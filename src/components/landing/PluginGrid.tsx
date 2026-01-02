import React from 'react';
import { PLUGIN_FEATURES } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
import { Map, Wand2, Skull, Trophy, Info } from 'lucide-react';
const IconMap = {
  Wand2: Wand2,
  Skull: Skull,
  Trophy: Trophy,
  Map: Map,
};
export function PluginGrid() {
  return (
    <section id="plugins" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Featured Modules</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Technical enhancements that power our community world.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLUGIN_FEATURES.map((feature, idx) => {
          const IconComponent = IconMap[feature.icon as keyof typeof IconMap] || Info;
          return (
            <RetroCard
              key={idx}
              className="group bg-white p-0 flex flex-col h-full"
            >
              <div className="aspect-[16/10] w-full overflow-hidden border-b-4 border-black">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-600 border-2 border-black flex items-center justify-center text-white shadow-hard-sm">
                    <IconComponent className="w-5 h-5 stroke-[3px]" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </RetroCard>
          );
        })}
      </div>
    </section>
  );
}