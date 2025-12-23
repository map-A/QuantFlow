import React, { useState } from 'react';
import {
  XuanxueHeader,
  FiveElementsRadar,
  IndustryMappingTable,
  HexagramDisplay,
  DisclaimerCard,
  SentimentCompareChart,
  AICulturalReport,
  XuanxueFooter,
  MOCK_FIVE_ELEMENTS,
  MOCK_SENTIMENT_COMPARE,
  MOCK_INDUSTRY_MAPPINGS,
  MOCK_HEXAGRAM,
  MOCK_CULTURAL_DATE,
} from './xuanxue-lab';

const XuanxueLab: React.FC = () => {
  const [lensEnabled, setLensEnabled] = useState(true);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] overflow-hidden text-text-main relative">
      {/* Background Subtle Ink Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: 'radial-gradient(#2BC4A8 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} 
      />

      {/* Header */}
      <XuanxueHeader
        culturalDate={MOCK_CULTURAL_DATE}
        referenceStrength="LOW"
        lensEnabled={lensEnabled}
        onToggleLens={() => setLensEnabled(!lensEnabled)}
      />

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-6 min-h-0 relative z-10 overflow-y-auto custom-scrollbar">
        
        {/* LEFT: Market Tian-Shi & Elements */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <FiveElementsRadar
            data={MOCK_FIVE_ELEMENTS}
            season={MOCK_CULTURAL_DATE.season}
          />
          <IndustryMappingTable mappings={MOCK_INDUSTRY_MAPPINGS} />
        </div>

        {/* CENTER: Market Symbolism */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <HexagramDisplay hexagram={MOCK_HEXAGRAM} />
          <DisclaimerCard />
        </div>

        {/* RIGHT: Sentiment Compare & AI Audit */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <SentimentCompareChart
            data={MOCK_SENTIMENT_COMPARE}
            alignment="ALIGN"
          />
          <AICulturalReport />
        </div>
      </div>

      {/* Footer */}
      <XuanxueFooter />
    </div>
  );
};

export default XuanxueLab;
