import React, { useState } from 'react';
import { Icons } from './Icons';
import {
  SentimentGauge,
  SentimentRadar,
  SentimentTimeline,
  AIStrategyAdvice,
  SectorSentimentHeat,
  RiskWarning,
  SentimentHeader,
  SentimentFooter,
  SpeculationStats
} from './sentiment-lab';

// --- Mock Data ---

const MOCK_SENTIMENT_SCORE = 72;
const MOCK_REGIME = "活跃 (Active)";

const MOCK_RADAR_DATA = [
  { subject: '投机情绪 (Speculation)', A: 120, fullMark: 150 },
  { subject: '风险偏好 (Risk Appetite)', A: 98, fullMark: 150 },
  { subject: '盈钱效应 (Profitability)', A: 85, fullMark: 150 },
  { subject: '连板高度 (Limit Up Height)', A: 110, fullMark: 150 },
  { subject: '资金活跃度 (Liquidity)', A: 130, fullMark: 150 },
];

const MOCK_TIMELINE_DATA = Array.from({ length: 30 }, (_, i) => ({
  date: `10-${i + 1}`,
  score: 40 + Math.sin(i * 0.4) * 30 + (Math.random() * 10),
  limitUps: 20 + Math.floor(Math.random() * 40),
}));

const MOCK_SECTOR_SENTIMENT = [
  { name: '计算机', value: 85, inflow: 12.5 },
  { name: '半导体', value: 78, inflow: 8.2 },
  { name: '食品饮料', value: 45, inflow: -2.1 },
  { name: '通信', value: 92, inflow: 15.4 },
  { name: '非银金融', value: 65, inflow: 3.5 },
];

const SentimentLab: React.FC = () => {
  const [activeRange, setActiveRange] = useState('1M');

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-6 gap-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <SentimentHeader 
        regime={MOCK_REGIME}
        activeRange={activeRange}
        onRangeChange={setActiveRange}
      />

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* CENTER: Core Sentiment (8 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Sentiment Meter */}
            <div className="glass-panel p-6 rounded-2xl border border-border flex flex-col items-center">
              <h3 className="w-full text-xs font-bold text-text-muted uppercase mb-4 flex items-center gap-2">
                <Icons.Gauge className="w-4 h-4 text-cyan" /> 情绪综合指数
              </h3>
              <SentimentGauge score={MOCK_SENTIMENT_SCORE} />
              <div className="mt-4 flex gap-6 text-[10px] font-mono">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-danger" /> 冰点 (0-20)</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-primary" /> 活跃 (60-80)</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-cyan" /> 亢奋 (80-100)</div>
              </div>
            </div>

            {/* Radar Analysis */}
            <SentimentRadar data={MOCK_RADAR_DATA} />
          </div>

          {/* Sentiment Timeline */}
          <SentimentTimeline data={MOCK_TIMELINE_DATA} />
        </div>

        {/* RIGHT: Components & Insights (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Speculation Stats */}
          <SpeculationStats />

          {/* AI Strategy Advice */}
          <AIStrategyAdvice 
            regime={MOCK_REGIME}
            description='当前市场处于 <span class="text-white font-bold">主升浪修复期</span>。成交量温和放大至万亿级别，情绪指标回暖至活跃区间。建议采取 <span class="text-cyan font-bold">趋势跟随</span> 与 <span class="text-cyan font-bold">龙回头</span> 策略。'
            tags={[
              { label: 'MOMENTUM ON', active: true },
              { label: 'BREAKOUT HIGH', active: true },
              { label: 'VOLATILITY MED', active: false }
            ]}
          />

          {/* Sector Sentiment Heatmap */}
          <SectorSentimentHeat sectors={MOCK_SECTOR_SENTIMENT} />

          {/* Risk Warnings */}
          <RiskWarning 
            title="尾盘跳水风险警示"
            description="监测到高位消费电子板块出现批量大单砸盘，警惕盘中「天地板」发生，建议对获利品种进行部分止盈。"
          />
        </div>

      </div>

      {/* Footer */}
      <SentimentFooter />
    </div>
  );
};

export default SentimentLab;
