import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_DATA } from '@/data/server-data';
import { RetroCard } from '@/components/ui/retro-card';
import { Check } from 'lucide-react';
export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 w-full order-2 lg:order-1">
            <RetroCard className="p-0 h-[300px] md:h-[400px] lg:h-[500px]">
              <img
                src={ABOUT_DATA.imageUrl}
                alt="Community World"
                className="w-full h-full object-cover"
              />
            </RetroCard>
          </div>
          <div className="flex-1 space-y-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
                {ABOUT_DATA.title}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {ABOUT_DATA.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ABOUT_DATA.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-orange-50/50 border-2 border-black rounded-xl shadow-hard-sm">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-lg border-2 border-black flex items-center justify-center mt-0.5">
                      <Check className="w-5 h-5 text-white stroke-[3px]" />
                    </div>
                    <span className="font-bold text-foreground leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}