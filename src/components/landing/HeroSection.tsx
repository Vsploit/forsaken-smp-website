import React from 'react';
import { motion } from 'framer-motion';
import { HERO_DATA, SOCIAL_LINKS } from '@/data/server-data';
import { Button } from '@/components/ui/button';
import { RetroCard } from '@/components/ui/retro-card';
import { Gamepad2, ChevronRight } from 'lucide-react';
export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-8"
          >
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-minecraft-grass/10 border-2 border-minecraft-grass text-minecraft-grass font-bold text-sm uppercase tracking-wider animate-bounce-slight">
              Season 6 Now Live!
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-foreground uppercase tracking-tight">
              {HERO_DATA.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              {HERO_DATA.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-minecraft-grass hover:bg-minecraft-grass/90 border-4 border-black shadow-hard hover:shadow-hard-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-none" asChild>
                <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
                  Join Discord <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <RetroCard className="px-6 py-3 flex items-center gap-3 bg-white">
                <div className="p-2 bg-minecraft-sky/20 rounded-lg">
                  <Gamepad2 className="w-5 h-5 text-minecraft-sky" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Server IP</p>
                  <p className="text-sm font-black font-mono">{SOCIAL_LINKS.ip}</p>
                </div>
              </RetroCard>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-minecraft-dirt rounded-3xl blur-2xl opacity-20 animate-pulse" />
              <RetroCard className="aspect-square relative p-0 overflow-hidden group">
                <img 
                  src={HERO_DATA.backgroundImage} 
                  alt="Minecraft Scenic" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-2xl font-black uppercase tracking-widest italic">Est. 2021</p>
                </div>
              </RetroCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}