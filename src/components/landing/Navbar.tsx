import React from 'react';
import { SOCIAL_LINKS, NAV_LINKS, SERVER_NAME } from '@/data/server-data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, ChevronRight } from 'lucide-react';
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-minecraft-grass border-2 border-black rounded shadow-hard-sm" />
            <span className="text-2xl font-black uppercase tracking-tighter italic">
              {SERVER_NAME.split(' ')[0]}
              <span className="text-minecraft-grass">Adventure</span>
            </span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-black uppercase tracking-widest hover:text-minecraft-grass transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button 
              className="bg-minecraft-grass hover:bg-minecraft-grass/90 border-2 border-black shadow-hard-sm hover:translate-y-[-2px] hover:shadow-hard active:translate-y-[0px] active:shadow-hard-sm transition-all"
              asChild
            >
              <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
                Join Server <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="border-2 border-black">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l-4 border-black">
                <SheetTitle className="text-2xl font-black uppercase mb-8">Menu</SheetTitle>
                <div className="flex flex-col gap-6 pt-4">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-xl font-black uppercase tracking-widest hover:text-minecraft-grass border-b-2 border-black/5 pb-2"
                    >
                      {link.label}
                    </a>
                  ))}
                  <Button 
                    className="w-full h-14 text-lg bg-minecraft-grass border-2 border-black shadow-hard"
                    asChild
                  >
                    <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
                      Join Discord
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}