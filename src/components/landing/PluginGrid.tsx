import React from 'react';
import { PLUGIN_FEATURES } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
import { Map, HeartPulse, Ghost, Info } from 'lucide-react';
const IconMap = {
  Map: Map,
  HeartPulse: HeartPulse,
  Ghost: Ghost,
};
export function PluginGrid() {
  return (
    <section id="plugins" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Bizarre Mechanics</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experimental gameplay systems designed to break the mold of traditional SMPs.
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
              {/* Feature Preview Image */}
              <div className="aspect-video w-full overflow-hidden border-b-4 border-black">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8 space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500 border-2 border-black flex items-center justify-center text-white shadow-hard-sm">
                    <IconComponent className="w-6 h-6 stroke-[3px]" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="pt-4 border-t-2 border-dashed border-black/10 flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold uppercase text-indigo-600 italic">
                    {feature.lore}
                  </span>
                </div>
              </div>
            </RetroCard>
          );
        })}
      </div>
    </section>
  );
}