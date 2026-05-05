import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'original';
}

/**
 * Logo Component
 * Handles the 'inversion' logic for dark backgrounds.
 * Variant 'light' is for dark backgrounds (turns blue/black to white).
 * Variant 'dark' or 'original' is for light backgrounds.
 */
export const Logo: React.FC<LogoProps> = ({ className, variant = 'original' }) => {
  return (
    <div className={cn("relative group", className)}>
      <img 
        src="/images/logo.png" 
        alt="AMEER CIVIL ENGINEERS" 
        className={cn(
          "h-full w-auto object-contain transition-all duration-300",
          // If variant is light, we use a filter to turn blue/black parts white.
          // This filter specifically boosts brightness and inverts enough to make dark parts light
          // while trying to preserve orange hues (not perfect but professional).
          variant === 'light' && "brightness-0 invert opacity-100 group-hover:opacity-80"
        )} 
      />
    </div>
  );
};
