import React from 'react';

interface SectorData {
  name: string;
  weight: number;
}

interface SectorExposureProps {
  sectors: SectorData[];
}

const SectorExposure: React.FC<SectorExposureProps> = ({ sectors }) => {
  return (
    <div className="glass-panel border border-border/50 rounded-xl p-4">
      <div className="text-[10px] font-bold text-text-muted uppercase mb-4">
        行业暴露 (Sector Exposure)
      </div>
      <div className="space-y-2">
        {sectors.map(s => (
          <div key={s.name} className="flex items-center gap-2">
            <span className="text-[9px] w-12 text-text-muted">{s.name}</span>
            <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden flex">
              <div 
                className={`h-full ${s.weight > 0 ? 'bg-success ml-auto' : 'bg-danger'}`} 
                style={{ width: `${Math.abs(s.weight)*100}%` }}
              ></div>
            </div>
            <span className={`text-[8px] font-mono w-8 text-right ${s.weight > 0 ? 'text-success' : 'text-danger'}`}>
              {s.weight > 0 ? '+' : ''}{s.weight.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorExposure;
