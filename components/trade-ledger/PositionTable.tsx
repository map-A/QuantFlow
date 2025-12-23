import React from 'react';
import { Position } from '../../types';
import { Icons } from '../Icons';

interface PositionTableProps {
  positions: Position[];
}

const PositionTable: React.FC<PositionTableProps> = ({ positions }) => {
  return (
    <div className="col-span-12 lg:col-span-8 glass-panel rounded-2xl border border-border p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
          <Icons.Briefcase className="w-4 h-4 text-primary" /> 
          活跃持仓分布 (POSITIONS)
        </h3>
        <span className="text-[10px] text-text-muted font-mono">
          {positions.length} ACTIVE POSITIONS
        </span>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left text-xs">
          <thead className="text-text-muted border-b border-border/50 sticky top-0 bg-[#161B22]/50 backdrop-blur">
            <tr>
              <th className="pb-3 pl-2">Name</th>
              <th className="pb-3 text-right">Vol (Avail)</th>
              <th className="pb-3 text-right">Avg Cost</th>
              <th className="pb-3 text-right">P/L %</th>
              <th className="pb-3 text-right">Exposure</th>
              <th className="pb-3 text-right">Max DD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {positions.map(pos => (
              <tr key={pos.symbol} className="hover:bg-white/5 transition-colors">
                <td className="py-3 pl-2">
                  <div className="font-bold text-white">{pos.name}</div>
                  <div className="text-[10px] font-mono text-text-muted">{pos.symbol}</div>
                </td>
                <td className="py-3 text-right font-mono text-text-main">
                  {pos.volume} <span className="text-text-muted">({pos.availableVolume})</span>
                </td>
                <td className="py-3 text-right font-mono">¥{pos.avgCost.toFixed(2)}</td>
                <td className={`py-3 text-right font-mono font-bold ${pos.pnlPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                  {pos.pnlPercent > 0 ? '+' : ''}{pos.pnlPercent}%
                </td>
                <td className="py-3 text-right font-mono text-text-main">
                  ¥{pos.exposure.toLocaleString()}
                </td>
                <td className="py-3 text-right font-mono text-danger">{pos.maxDrawdown}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionTable;
