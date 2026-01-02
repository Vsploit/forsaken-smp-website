import React from 'react';
import { SOCIAL_LINKS, SERVER_NAME } from '@/data/server-data';
import { Button } from '@/components/ui/button';
import { MessageSquare, Twitter, Globe } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 mb-16">
          <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-widest text-orange-500">
            Start Your Journey.
          </h3>
          <p className="text-gray-400 max-w-md">
            The survival community awaits. Join the Forsaken community and explore the world today.
          </p>
          <div className="flex justify-center w-full">
            <Button
              size="lg"
              className="h-16 px-12 text-xl font-bold bg-orange-600 hover:bg-orange-500 text-white border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              asChild
            >
              <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </Button>
          </div>
        </div>
        <div className="h-px bg-white/10 w-full mb-10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-2xl font-black uppercase tracking-tighter text-gradient-forsaken">
              {SERVER_NAME}
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {SERVER_NAME}. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href={SOCIAL_LINKS.discord} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors" aria-label="Discord">
              <MessageSquare className="w-6 h-6" />
            </a>
            <a href={SOCIAL_LINKS.twitter} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors" aria-label="Website">
              <Globe className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-600 uppercase tracking-widest">
            Not affiliated with Mojang AB or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}