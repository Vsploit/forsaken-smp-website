import React from 'react';
import { motion } from 'framer-motion';
import { HERO_DATA } from '@/data/server-data';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield } from 'lucide-react';
import { DiscordJoinModal } from './DiscordJoinModal';
export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 md:pt-32 lg:pt-24 overflow-hidden bg-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.08]"
        style={{ backgroundImage: `url('${HERO_DATA.backgroundImage}')` }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.1]" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-500/5 via-transparent to-white pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 md:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] order-first lg:order-last"
          >
            <div className="relative">
              <div className="absolute -inset-10 bg-orange-500 rounded-full blur-[100px] opacity-10 animate-pulse" />
              <div className="flex justify-center">
                <motion.img
                  src={HERO_DATA.logoUrl}
                  alt="Forsaken SMP Logo"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(249,115,22,0.3)]"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 0.5, -0.5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8"
          >
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-orange-500/10 border-2 border-orange-500 text-orange-600 font-bold text-xs sm:text-sm uppercase tracking-wider animate-bounce-slight whitespace-nowrap">
              <Shield className="w-4 h-4 mr-2" />
              {HERO_DATA.badgeText}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight uppercase tracking-tight break-words text-gradient-forsaken">
              {HERO_DATA.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              {HERO_DATA.subtitle}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <DiscordJoinModal>
                <Button
                  size="lg"
                  className="h-14 px-8 sm:px-10 text-base sm:text-lg font-bold bg-orange-600 hover:bg-orange-700 text-white border-4 border-black shadow-hard hover:shadow-hard-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  Join The Community <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </DiscordJoinModal>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}