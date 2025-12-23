import React, { useState } from 'react';
import { Icons } from '../Icons';
import { Stock } from '../../types';

interface StockListCardProps {
  stocks: Stock[];
}

type StockListTab = 'gainers' | 'losers' | 'inflow' | 'north' | 'limitup';

const StockListCard: React.FC<StockListCardProps> = ({ stocks }) => {
  const [stockListTab, setStockListTab] = useState<StockListTab>('gainers');

  const getTrendingStocks = () => {
    let sorted = [...stocks];
    if (stockListTab === 'gainers') return sorted.sort((a, b) => b.changePercent - a.changePercent);
    if (stockListTab === 'losers') return sorted.sort((a, b) => a.changePercent - b.changePercent);
    if (stockListTab === 'inflow') return sorted.sort((a, b) => b.mainNetInflow - a.mainNetInflow);
    if (stockListTab === 'north') return sorted.sort((a, b) => b.northNetInflow - a.northNetInflow);
    if (stockListTab === 'limitup') return sorted.filter(s => s.limitStatus === 'limitUp');
    return sorted;
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h3 className="font-bold flex items-center gap-2">
          <Icons.Trophy className="w-5 h-5 text-yellow-500" />
          个股龙虎榜
        </h3>
        <div className="flex bg-surface rounded-lg p-0.5 border border-border overflow-x-auto">
          {[
            { id: 'gainers', label: '涨幅榜' }, 
            { id: 'losers', label: '跌幅榜' }, 
            { id: 'inflow', label: '主力流入' }, 
            { id: 'north', label: '北向买入' },
            { id: 'limitup', label: '🚀 连板池' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setStockListTab(tab.id as StockListTab)}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all whitespace-nowrap ${stockListTab === tab.id ? 'bg-background text-white shadow-sm' : 'text-text-muted hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-sm min-w-[800px]">
          <thead>
            <tr className="text-text-muted border-b border-border/50 text-[10px] uppercase font-bold tracking-wider">
              <th className="pb-3 pl-2">股票名称/代码</th>
              <th className="pb-3 text-right">最新价</th>
              <th className="pb-3 text-right">涨跌幅</th>
              <th className="pb-3 text-right">主力净流入</th>
              <th className="pb-3 text-right">北向净买入</th>
              <th className="pb-3 text-right">换手率</th>
              <th className="pb-3 text-right">所属板块</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {getTrendingStocks().map(stock => (
              <tr key={stock.symbol} className="group hover:bg-white/5 transition-colors">
                <td className="py-3 pl-2">
                  <div className="flex items-center gap-2">
                    {stock.limitStatus === 'limitUp' && 
                      <div className="w-1 h-8 rounded-full bg-success shadow-[0_0_8px_#F6465D]" />
                    }
                    {stock.limitStatus !== 'limitUp' && 
                      <div className={`w-1 h-8 rounded-full ${stock.change >= 0 ? 'bg-success' : 'bg-danger'}`} />
                    }
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        {stock.name}
                        {stock.limitStatus === 'limitUp' && 
                          <span className="bg-success text-white text-[9px] px-1 py-0.5 rounded leading-none font-bold uppercase">
                            涨停
                          </span>
                        }
                      </div>
                      <div className="text-[10px] text-text-muted font-mono">{stock.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className={`py-3 text-right font-mono font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  ¥{stock.price.toFixed(2)}
                </td>
                <td className={`py-3 text-right font-mono font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                </td>
                <td className={`py-3 text-right font-mono ${stock.mainNetInflow > 0 ? 'text-success' : 'text-danger'}`}>
                  {stock.mainNetInflow > 0 ? '+' : ''}{(stock.mainNetInflow / 10000).toFixed(2)}亿
                </td>
                <td className={`py-3 text-right font-mono ${stock.northNetInflow > 0 ? 'text-success' : 'text-danger'}`}>
                  {stock.northNetInflow > 0 ? '+' : ''}{(stock.northNetInflow / 10000).toFixed(2)}亿
                </td>
                <td className="py-3 text-right text-text-muted font-mono text-xs">
                  {stock.turnoverRate}%
                </td>
                <td className="py-3 text-right">
                  <span className="px-2 py-1 bg-surface border border-border rounded text-[9px] text-text-muted font-bold tracking-tighter uppercase">
                    {stock.sector}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockListCard;
