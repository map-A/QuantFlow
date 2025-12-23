import React from 'react';

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  glow?: boolean;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  glow = false, 
  noPadding = false 
}) => (
  <div className={`
    bg-[#161B22]/60 backdrop-blur-xl border border-white/5 rounded-xl relative overflow-hidden transition-all duration-300 flex flex-col
    ${glow ? 'shadow-[0_0_20px_rgba(43,196,168,0.1)] border-cyan/30' : 'hover:border-white/20 hover:bg-[#161B22]/80'}
    ${noPadding ? '' : 'p-5'}
    ${className}
  `}>
    {/* Subtle gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
    <div className="relative z-10 flex flex-col h-full">{children}</div>
  </div>
);
