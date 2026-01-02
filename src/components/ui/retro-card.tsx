import React from 'react';
import { cn } from '@/lib/utils';
interface RetroCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export function RetroCard({ children, className, onClick }: RetroCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-card border-4 border-black rounded-xl shadow-hard transition-all duration-200 overflow-hidden",
        onClick && "cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none",
        "hover:-translate-y-1 hover:shadow-hard-lg",
        className
      )}
    >
      {children}
    </div>
  );
}