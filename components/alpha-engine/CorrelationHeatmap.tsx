import React from 'react';
import { Icons } from '../Icons';
import Panel from './Panel';

interface HeatmapData {
  x: string;
  y: string;
  val: number;
}

interface FactorItem {
  id: string;
  name: string;
}

interface CorrelationHeatmapProps {
  data: HeatmapData[];
  factors: FactorItem[];
}

const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({ data, factors }) => {
  const getHeatmapColor = (val: number) => {
    if (val === 1) return 'bg-primary/40';
    if (val > 0.7) return 'bg-danger/60';
    if (val > 0.4) return 'bg-danger/30';
    if (val > 0.2) return 'bg-yellow-500/20';
    return 'bg-success/20';
  };

  return (
    <Panel title="相关性热力图" icon={Icons.Grid} className="col-span-1">
      <div className="p-4 h-full flex flex-col items-center justify-center">
        <div className="grid grid-cols-4 gap-1 w-full max-w-[200px]">
          {data.map((d, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-sm flex items-center justify-center text-[8px] transition-transform hover:scale-110 cursor-help ${getHeatmapColor(d.val)}`}
              title={`${d.x} vs ${d.y}: ${d.val}`}
            >
              {d.val > 0.5 ? d.val.toFixed(2) : ''}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4 text-[9px] text-text-muted font-mono">
          {factors.slice(0, 4).map(f => (
            <div key={f.id} className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary/20 rounded-full"></div>
              {f.name}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};

export default CorrelationHeatmap;
