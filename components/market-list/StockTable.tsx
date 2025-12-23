import React from 'react';
import { Stock } from '../../types';

interface StockTableProps {
  stocks: Stock[];
}

const StockTable: React.FC<StockTableProps> = ({ stocks }) => {
  return (
    <div className="flex-1 overflow-auto custom-scrollbar">
      <table className="w-full text-left border-collapse min-w-[1400px]">
        <thead className="sticky top-0 z-10 bg-surface/95 backdrop-blur shadow-sm">
          <tr className="text-xs text-text-muted uppercase">
            <th className="p-4 font-medium sticky left-0 bg-surface/95 z-20 w-[100px] border-r border-border/50">代码</th>
            <th className="p-4 font-medium sticky left-[100px] bg-surface/95 z-20 w-[100px] border-r border-border/50">名称</th>
            <th className="p-4 font-medium text-right">最新价</th>
            <th className="p-4 font-medium text-right">涨跌幅</th>
            <th className="p-4 font-medium text-right">主力净流入</th>
            <th className="p-4 font-medium text-right">北向净流入</th>
            <th className="p-4 font-medium text-right">换手率</th>
            <th className="p-4 font-medium text-right">市盈率(TTM)</th>
            <th className="p-4 font-medium text-right">ROE</th>
            <th className="p-4 font-medium text-center">均线形态</th>
            <th className="p-4 font-medium text-center">AI 评分</th>
            <th className="p-4 font-medium">所属概念</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50 text-sm">
          {stocks.map(stock => (
            <tr key={stock.symbol} className="hover:bg-white/5 transition-colors group">
              <td className="p-4 font-mono text-cyan sticky left-0 bg-[#161B22] group-hover:bg-[#1C2128] border-r border-border/50">
                {stock.symbol}
              </td>
              <td className="p-4 font-bold sticky left-[100px] bg-[#161B22] group-hover:bg-[#1C2128] border-r border-border/50 flex items-center gap-2">
                {stock.name}
                {stock.limitStatus === 'limitUp' && (
                  <span className="px-1 py-0.5 bg-success text-white text-[10px] rounded leading-none">涨停</span>
                )}
              </td>
              <td className={`p-4 text-right font-mono ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                ¥{stock.price.toFixed(2)}
              </td>
              <td className={`p-4 text-right font-mono font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
              </td>
              <td className={`p-4 text-right font-mono ${stock.mainNetInflow > 0 ? 'text-success' : 'text-danger'}`}>
                {stock.mainNetInflow > 0 ? '+' : ''}{(stock.mainNetInflow / 10000).toFixed(2)}亿
              </td>
              <td className={`p-4 text-right font-mono ${stock.northNetInflow > 0 ? 'text-success' : 'text-danger'}`}>
                {stock.northNetInflow > 0 ? '+' : ''}{(stock.northNetInflow / 10000).toFixed(2)}亿
              </td>
              <td className="p-4 text-right text-text-muted">
                {stock.turnoverRate}%
              </td>
              <td className="p-4 text-right text-text-muted font-mono">
                {stock.pe}
              </td>
              <td className="p-4 text-right font-mono text-success">
                {stock.roe}%
              </td>
              <td className="p-4 text-center">
                <span className={`px-2 py-0.5 rounded text-[10px] 
                  ${stock.maAlignment === 'long' ? 'bg-success/10 text-success' : 
                    stock.maAlignment === 'short' ? 'bg-danger/10 text-danger' : 
                    'bg-yellow-500/10 text-yellow-500'}
                `}>
                  {stock.maAlignment === 'long' ? '多头排列' : 
                   stock.maAlignment === 'short' ? '空头排列' : '纠缠震荡'}
                </span>
              </td>
              <td className="p-4 text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-violet/30 text-violet font-bold text-xs bg-violet/5">
                  {stock.aiScore}
                </div>
              </td>
              <td className="p-4">
                <div className="flex gap-1 flex-wrap w-[180px]">
                  {stock.concepts.map(c => (
                    <span 
                      key={c} 
                      className="px-1.5 py-0.5 bg-surface border border-border rounded text-[10px] text-text-muted whitespace-nowrap"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
