import React, { useState } from 'react';
import { Icons } from './Icons';
import {
  PageHeader,
  MarketStateRadar,
  ElementCard,
  BaguaMapping,
  ChangeLogic,
  ObservationWindow,
  RiskDisclaimer,
  PageFooter
} from './cultural-projection';

const ELEMENT_CARDS = [
  { id: 'fire', name: '火 (Fire)', icon: Icons.Flame, keywords: '情绪 / 活跃', desc: '火元素占比偏高，代表市场情绪与短期交易活跃，注意力集中但易波动。', color: '#F6465D', weight: 92 },
  { id: 'water', name: '水 (Water)', icon: Icons.Activity, keywords: '流动 / 扩散', desc: '水元素充盈，象征资金流动性充裕，但缺乏明确的汇聚方向。', color: '#1F6FEB', weight: 85 },
  { id: 'earth', name: '土 (Earth)', icon: Icons.Grid, keywords: '承接 / 修复', desc: '土元素偏弱，意味着底部承接力仍在修复，稳定回升需时间。', color: '#D6B36A', weight: 60 },
];

const CulturalProjection: React.FC = () => {
  const [lensEnabled, setLensEnabled] = useState(true);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] overflow-hidden text-text-main relative select-none">
      {/* Background Subtle Ink Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#2BC4A8 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />

      <PageHeader lensEnabled={lensEnabled} onToggleLens={() => setLensEnabled(!lensEnabled)} />

      {/* 2. Main Content Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 z-10 relative">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6">
          
          {/* Section 1: Current State (8 cols top) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <MarketStateRadar />

            {/* Section 2: Five Elements Cards */}
            <div className="grid grid-cols-3 gap-6">
              {ELEMENT_CARDS.map(card => (
                <ElementCard key={card.id} {...card} />
              ))}
            </div>
          </div>

          {/* Section 3 & 4 (4 cols side) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <BaguaMapping />
            <ChangeLogic />
          </div>

          {/* Section 5: Next Observation Window (Core Feature - 12 cols) */}
          <div className="col-span-12">
            <ObservationWindow />
          </div>

          {/* Section 6: Risk Context */}
          <div className="col-span-12">
            <RiskDisclaimer />
          </div>

        </div>
      </div>

      <PageFooter />
    </div>
  );
};

export default CulturalProjection;
