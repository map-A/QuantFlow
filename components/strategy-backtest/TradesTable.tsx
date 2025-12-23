import React from 'react';

interface Trade {
  id: string;
  time: string;
  name: string;
  side: 'buy' | 'sell';
  price: number;
  volume: number;
  pnl?: number;
}

interface TradesTableProps {
  trades: Trade[];
}

const TradesTable: React.FC<TradesTableProps> = ({ trades }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-text-muted border-b border-border">
          <tr>
            <th className="p-2">时间</th>
            <th className="p-2">代码</th>
            <th className="p-2">方向</th>
            <th className="p-2 text-right">成交价</th>
            <th className="p-2 text-right">数量</th>
            <th className="p-2 text-right">盈亏</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {trades.map(trade => (
            <tr key={trade.id} className="hover:bg-white/5 transition-colors">
              <td className="p-2 font-mono text-text-muted">{trade.time}</td>
              <td className="p-2 font-bold">{trade.name}</td>
              <td className={`p-2 font-bold ${trade.side === 'buy' ? 'text-success' : 'text-danger'}`}>
                {trade.side === 'buy' ? '买入' : '卖出'}
              </td>
              <td className="p-2 text-right font-mono">{trade.price.toFixed(2)}</td>
              <td className="p-2 text-right font-mono">{trade.volume}</td>
              <td className={`p-2 text-right font-mono font-bold ${trade.pnl && trade.pnl > 0 ? 'text-success' : 'text-danger'}`}>
                {trade.pnl ? (trade.pnl > 0 ? '+' : '') + trade.pnl.toFixed(2) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradesTable;
