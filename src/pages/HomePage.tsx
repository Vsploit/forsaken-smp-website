import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { Footer } from '@/components/landing/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
import { RetroCard } from '@/components/ui/retro-card';
import { PLUGIN_FEATURES } from '@/data/server-data';
export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-minecraft-grass selection:text-white">
      <ThemeToggle />
      <main>
        {/* Section 1: Hero */}
        <HeroSection />
        {/* Section 2: About */}
        <AboutSection />
        {/* Section 3: Feature Highlights (Placeholder Grid for Phase 1) */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Built-in Awesomeness</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our custom plugin suite ensures every moment is packed with adventure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLUGIN_FEATURES.map((feature, idx) => (
              <RetroCard key={idx} className="p-8 space-y-4 bg-white">
                <div className="w-14 h-14 rounded-2xl bg-minecraft-dirt border-4 border-black flex items-center justify-center text-white">
                  <span className="text-2xl font-black">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </RetroCard>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Toaster richColors closeButton />
    </div>
  );
}