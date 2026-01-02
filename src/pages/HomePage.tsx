import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { GallerySection } from '@/components/landing/GallerySection';
import { PluginGrid } from '@/components/landing/PluginGrid';
import { Footer } from '@/components/landing/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-minecraft-grass selection:text-white">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]" />
      <Navbar />
      <ThemeToggle className="fixed bottom-6 right-6 top-auto bg-white border-2 border-black shadow-hard-sm" />
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />
        {/* Section 2: About */}
        <AboutSection />
        {/* Section 3: Seasons Gallery */}
        <GallerySection />
        {/* Section 4: Plugin Features */}
        <PluginGrid />
      </main>
      <Footer />
      <Toaster richColors closeButton position="top-center" />
    </div>
  );
}