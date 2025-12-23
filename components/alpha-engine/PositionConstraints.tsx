import React from 'react';
import { Icons } from '../Icons';
import Panel from './Panel';

const PositionConstraints: React.FC = () => {
  return (
    <Panel title="持仓限制与风控" icon={Icons.Briefcase}>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-text-muted">Top N 选择数量</span>
            <span className="text-white font-bold">50 Stocks</span>
          </div>
          <div className="h-1 bg-surface rounded-full overflow-hidden">
            <div className="bg-primary w-[50%] h-full"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-text-muted">交易税费估算</span>
            <span className="text-white font-bold">0.12%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="p-2 border border-border/50 rounded flex flex-col items-center">
            <span className="text-[9px] text-text-muted">换手率</span>
            <span className="text-xs font-bold">12.5%</span>
          </div>
          <div className="p-2 border border-border/50 rounded flex flex-col items-center">
            <span className="text-[9px] text-text-muted">策略容量</span>
            <span className="text-xs font-bold">¥2.5B</span>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default PositionConstraints;
