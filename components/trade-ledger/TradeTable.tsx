import React from 'react';
import { TradeLog } from '../../types';
import { Icons } from '../Icons';

interface TradeTableProps {
  trades: TradeLog[];
  selectedTrade: TradeLog | null;
  onTradeSelect: (trade: TradeLog) => void;
}

const TradeTable: React.FC<TradeTableProps> = ({ 
  trades, 
  selectedTrade, 
  onTradeSelect 
}) => {
  return (
    <div className="flex-1 overflow-auto custom-scrollbar">
      <table className="w-full text-left border-collapse min-w-[1400px]">
        <thead className="sticky top-0 z-10 bg-surface/95 backdrop-blur-md shadow-sm">
          <tr className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
            <th className="p-4 border-b border-border">TIME (EXECUTED)</th>
            <th className="p-4 border-b border-border">SYMBOL</th>
            <th className="p-4 border-b border-border">SIDE/ACTION</th>
            <th className="p-4 border-b border-border text-right">QUANTITY</th>
            <th className="p-4 border-b border-border text-right">AVG FILL PRICE</th>
            <th className="p-4 border-b border-border">STRATEGY / STRENGTH</th>
            <th className="p-4 border-b border-border text-center">SENTIMENT</th>
            <th className="p-4 border-b border-border text-right">REALIZED P/L</th>
            <th className="p-4 border-b border-border text-center">STATUS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {trades.map(trade => (
            <tr 
              key={trade.id} 
              onClick={() => onTradeSelect(trade)}
              className={`group hover:bg-white/[0.03] cursor-pointer transition-colors relative ${selectedTrade?.id === trade.id ? 'bg-primary/5' : ''}`}
            >
              <td className="p-4 font-mono text-[11px] text-text-muted">{trade.time}</td>
              <td className="p-4">
                <div className="font-bold text-white group-hover:text-primary transition-colors">
                  {trade.name}
                </div>
                <div className="text-[10px] font-mono text-text-muted">{trade.symbol}.SH</div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${trade.side === 'buy' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {trade.side === 'buy' ? 'BUY' : 'SELL'}
                  </span>
                  <span className="text-[10px] font-bold text-text-muted bg-surface px-1.5 rounded">
                    {trade.action}
                  </span>
                  {trade.isManualOverride && (
                    <span title="Manual Intervention">
                      <Icons.Target className="w-3.5 h-3.5 text-violet animate-pulse" />
                    </span>
                  )}
                </div>
              </td>
              <td className="p-4 text-right font-mono text-text-main">
                {trade.volume.toLocaleString()}
              </td>
              <td className="p-4 text-right font-mono text-white">
                ¥{trade.price.toFixed(2)}
              </td>
              <td className="p-4">
                <div className="text-xs font-medium text-text-main">{trade.strategyName}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1 bg-surface rounded-full overflow-hidden max-w-[60px]">
                    <div 
                      className="h-full bg-cyan shadow-glow-cyan" 
                      style={{ width: `${trade.signalStrength}%` }} 
                    />
                  </div>
                  <span className="text-[9px] font-mono text-cyan">{trade.signalStrength}</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-mono text-[10px] font-bold
                    ${trade.executionSentiment > 60 ? 'border-success/30 bg-success/5 text-success' : 'border-danger/30 bg-danger/5 text-danger'}
                  `}>
                    {trade.executionSentiment}
                  </div>
                </div>
              </td>
              <td className={`p-4 text-right font-mono font-bold ${trade.pnl! >= 0 ? 'text-success' : 'text-danger'}`}>
                {trade.pnl! > 0 ? '+' : ''}{trade.pnl?.toLocaleString()}
              </td>
              <td className="p-4 text-center">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border 
                  ${trade.status === 'FILLED' ? 'border-success/40 text-success bg-success/5' : 
                    trade.status === 'PARTIAL' ? 'border-yellow-500/40 text-yellow-500 bg-yellow-500/5' : 
                    'border-border text-text-muted bg-surface'}
                `}>
                  {trade.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeTable;
