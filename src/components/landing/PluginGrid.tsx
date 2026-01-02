import React from 'react';
import { motion } from 'framer-motion';
import { PLUGIN_FEATURES } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
import { Sparkles, Coins, Shield, Info } from 'lucide-react';
const IconMap = {
  Sparkles: Sparkles,
  Coins: Coins,
  Shield: Shield,
};
export function PluginGrid() {
  return (
    <section id="plugins" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Built-in Awesomeness</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our custom plugin suite ensures every moment is packed with adventure. No mods required!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLUGIN_FEATURES.map((feature, idx) => {
          const IconComponent = IconMap[feature.icon as keyof typeof IconMap] || Info;
          return (
            <RetroCard 
              key={idx} 
              className="p-8 space-y-6 bg-white group hover:bg-minecraft-grass/5 transition-colors"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-minecraft-dirt border-4 border-black flex items-center justify-center text-white shadow-hard-sm"
                whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <IconComponent className="w-8 h-8 stroke-[3px]" />
              </motion.div>
              <div className="space-y-3 text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-minecraft-grass transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="pt-4 border-t-2 border-dashed border-black/10 flex items-center gap-2">
                <div className="p-1 bg-minecraft-sky/10 rounded-full">
                  <Info className="w-4 h-4 text-minecraft-sky" />
                </div>
                <span className="text-xs font-bold uppercase text-minecraft-sky italic">
                  {feature.lore}
                </span>
              </div>
            </RetroCard>
          );
        })}
      </div>
    </section>
  );
}