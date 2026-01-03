import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { SeasonHighlight } from '@/components/landing/SeasonHighlight';
import { GallerySection } from '@/components/landing/GallerySection';
import { PluginGrid } from '@/components/landing/PluginGrid';
import { ApplicationSection } from '@/components/landing/ApplicationSection';
import { Footer } from '@/components/landing/Footer';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      {/* Global visual noise texture */}
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <div className="section-spacing">
          <AboutSection />
        </div>
        <div className="section-spacing">
          <SeasonHighlight />
        </div>
        <div className="section-spacing">
          <GallerySection />
        </div>
        <div className="section-spacing">
          <PluginGrid />
        </div>
        <div className="section-spacing">
          <ApplicationSection />
        </div>
      </main>
      <Footer />
      {/* Toaster placed at end of DOM for consistent z-index hierarchy */}
      <Toaster />
    </div>
  );
}