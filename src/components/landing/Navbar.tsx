import React from 'react';
import { NAV_LINKS, HERO_DATA } from '@/data/server-data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose, SheetDescription } from '@/components/ui/sheet';
import { Menu, ChevronRight } from 'lucide-react';
import { DiscordJoinModal } from './DiscordJoinModal';
export function Navbar() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '#');
  };
  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo / Home Trigger */}
          <a
            href="#"
            onClick={scrollToTop}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={HERO_DATA.logoUrl}
                alt="Forsaken Logo"
                className="w-full h-full object-contain drop-shadow-sm transition-transform group-hover:rotate-12 group-hover:scale-110"
              />
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter italic text-gradient-forsaken">
              Forsaken
              <span className="text-orange-600"> SMP</span>
            </span>
          </a>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-black uppercase tracking-widest hover:text-orange-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <DiscordJoinModal>
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white border-4 border-black shadow-hard-sm hover:translate-y-[-2px] hover:shadow-hard active:translate-y-[0px] active:shadow-hard-sm transition-all h-12 px-6 font-black"
              >
                Join Discord <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </DiscordJoinModal>
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border-2 border-black hover:bg-orange-50 focus-visible:ring-orange-500 active:scale-95 transition-all"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l-4 border-black w-[300px] p-0 flex flex-col z-[120]">
                <SheetHeader className="text-left border-b-4 border-black p-6 bg-orange-50/30">
                  <div className="flex items-center gap-3 mb-2">
                    <img 
                      src={HERO_DATA.logoUrl} 
                      alt="Logo" 
                      className="w-12 h-12 object-contain drop-shadow-md" 
                    />
                    <SheetTitle className="text-2xl font-black uppercase tracking-tighter italic">
                      Forsaken <span className="text-orange-600">SMP</span>
                    </SheetTitle>
                  </div>
                  <SheetDescription className="text-foreground/80 font-bold">
                    Navigate our world and join the survival community.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2 p-6 overflow-y-auto">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="text-xl font-black uppercase tracking-widest hover:text-orange-600 border-b-2 border-black/5 py-4 transition-colors flex items-center justify-between group"
                      >
                        {link.label}
                        <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-orange-600" />
                      </a>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-auto p-6 border-t-4 border-black bg-white">
                  <DiscordJoinModal>
                    <Button
                      className="w-full h-14 text-lg font-black bg-orange-600 text-white border-4 border-black shadow-hard active:translate-y-1 active:shadow-none transition-all"
                    >
                      Join Discord
                    </Button>
                  </DiscordJoinModal>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}