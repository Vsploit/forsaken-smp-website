import React from 'react';
import { SOCIAL_LINKS, NAV_LINKS, HERO_DATA } from '@/data/server-data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose, SheetDescription } from '@/components/ui/sheet';
import { Menu, ChevronRight } from 'lucide-react';
export function Navbar() {
  return (
    <nav className="sticky top-0 z-[60] w-full bg-white/95 backdrop-blur-md border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img
              src={HERO_DATA.logoUrl}
              alt="Forsaken Logo"
              className="w-10 h-10 object-contain drop-shadow-sm transition-transform group-hover:rotate-12"
            />
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
            <Button
              className="bg-orange-600 hover:bg-orange-700 text-white border-2 border-black shadow-hard-sm hover:translate-y-[-2px] hover:shadow-hard active:translate-y-[0px] active:shadow-hard-sm transition-all"
              asChild
            >
              <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
                Join Discord <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="border-2 border-black hover:bg-orange-50">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l-4 border-black w-[300px]">
                <SheetHeader className="text-left border-b-4 border-black pb-6 mb-8">
                  <div className="flex items-center gap-2">
                    <img src={HERO_DATA.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
                    <SheetTitle className="text-2xl font-black uppercase tracking-tighter italic">
                      Forsaken <span className="text-orange-600">SMP</span>
                    </SheetTitle>
                  </div>
                  <SheetDescription className="sr-only">
                    Navigation menu for Forsaken SMP website.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="text-xl font-black uppercase tracking-widest hover:text-orange-600 border-b-2 border-black/5 pb-2 transition-colors"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                  <Button
                    className="w-full h-14 text-lg font-bold bg-orange-600 text-white border-2 border-black shadow-hard active:translate-y-1 active:shadow-none transition-all"
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