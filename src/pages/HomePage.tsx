import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { SeasonHighlight } from '@/components/landing/SeasonHighlight';
import { GallerySection } from '@/components/landing/GallerySection';
import { PluginGrid } from '@/components/landing/PluginGrid';
import { Footer } from '@/components/landing/Footer';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]" />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <SeasonHighlight />
        <GallerySection />
        <PluginGrid />
      </main>
      <Footer />
      <Toaster richColors closeButton position="top-center" />
    </div>
  );
}