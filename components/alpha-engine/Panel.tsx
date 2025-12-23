import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ComponentType<any>;
  extra?: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, children, className = "", icon: Icon, extra }) => (
  <div className={`bg-[#161B22]/60 backdrop-blur-xl border border-border/50 rounded-xl flex flex-col overflow-hidden ${className}`}>
    <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between bg-white/5">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary shadow-glow-blue" />}
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{title}</span>
      </div>
      {extra && <div className="flex items-center gap-2">{extra}</div>}
    </div>
    <div className="flex-1 overflow-auto custom-scrollbar">
      {children}
    </div>
  </div>
);

export default Panel;
