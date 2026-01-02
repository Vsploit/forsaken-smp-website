import React from 'react';
import { motion } from 'framer-motion';
import { HERO_DATA, SOCIAL_LINKS } from '@/data/server-data';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';
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
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-minecraft-grass/10 border-2 border-minecraft-grass text-minecraft-grass font-bold text-sm uppercase tracking-wider animate-bounce-slight">
              <Sparkles className="w-4 h-4 mr-2" />
              Forsaken Season 3 Active
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight text-foreground uppercase tracking-tight">
              {HERO_DATA.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
              {HERO_DATA.subtitle}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Button size="lg" className="h-14 px-10 text-lg font-bold bg-minecraft-grass hover:bg-minecraft-grass/90 border-4 border-black shadow-hard hover:shadow-hard-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-none" asChild>
                <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
                  Join Discord <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-10 bg-minecraft-grass rounded-full blur-[100px] opacity-10 animate-pulse" />
              <div className="flex justify-center">
                <motion.img
                  src={HERO_DATA.logoUrl}
                  alt="Forsaken SMP Logo"
                  className="w-full max-w-[450px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}