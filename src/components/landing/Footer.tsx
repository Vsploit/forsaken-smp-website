import React from 'react';
import { SOCIAL_LINKS, SERVER_NAME } from '@/data/server-data';
import { Button } from '@/components/ui/button';
import { MessageSquare, Twitter, Music } from 'lucide-react';
import { DiscordJoinModal } from './DiscordJoinModal';
export function Footer() {
  return (
    <footer className="bg-secondary text-foreground pt-20 pb-10 border-t-4 border-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 mb-16">
          <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-widest text-orange-500">
            Start Your Journey.
          </h3>
          <p className="text-muted-foreground max-w-md font-medium">
            The survival community awaits. Join the Forsaken community and explore the world today.
          </p>
          <div className="flex justify-center w-full">
            <DiscordJoinModal>
              <Button
                size="lg"
                className="h-16 px-12 text-xl font-bold bg-orange-600 hover:bg-orange-500 text-white border-4 border-foreground shadow-hard hover:shadow-hard-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:ring-offset-secondary"
              >
                Join Discord
              </Button>
            </DiscordJoinModal>
          </div>
        </div>
        <div className="h-1 bg-foreground/10 w-full mb-10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-2xl font-black uppercase tracking-tighter text-gradient-forsaken">
              {SERVER_NAME}
            </p>
            <p className="text-sm text-muted-foreground font-bold">
              © {new Date().getFullYear()} {SERVER_NAME}. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background rounded-xl hover:text-orange-500 transition-all border-2 border-foreground shadow-hard-sm active:translate-y-0.5 active:shadow-none"
              aria-label="Discord"
            >
              <MessageSquare className="w-6 h-6" />
            </a>
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background rounded-xl hover:text-orange-500 transition-all border-2 border-foreground shadow-hard-sm active:translate-y-0.5 active:shadow-none"
              aria-label="TikTok"
            >
              <Music className="w-6 h-6" />
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background rounded-xl hover:text-orange-500 transition-all border-2 border-foreground shadow-hard-sm active:translate-y-0.5 active:shadow-none"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">
            Not affiliated with Mojang AB or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}