import React from 'react';
import { Icons } from '../Icons';
import { MetricCard } from './MetricCard';

export const SpeculationStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MetricCard 
        label="昨日涨停表现" 
        value="+3.52%" 
        subValue="溢价水平: 高" 
        icon={Icons.Up} 
        colorClass="text-success" 
      />
      <MetricCard 
        label="当前连板高度" 
        value="7板" 
        subValue="龙头: 天龙股份" 
        icon={Icons.Zap} 
        colorClass="text-danger" 
      />
      <MetricCard 
        label="涨跌比" 
        value="3200:1800" 
        subValue="多方占优" 
        icon={Icons.Layers} 
      />
      <MetricCard 
        label="炸板率" 
        value="18%" 
        subValue="较昨日: -5%" 
        icon={Icons.XCircle} 
        colorClass="text-success" 
      />
    </div>
  );
};
