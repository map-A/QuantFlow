import React from 'react';
import { Icons } from '../Icons';

interface AdvancedSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedSettingsDrawer: React.FC<AdvancedSettingsDrawerProps> = ({ isOpen, onClose }) => {
  const neutralizationOptions = [
    { label: '行业中性 (Industry)', active: true },
    { label: '市值中性 (Market Cap)', active: true },
    { label: '波动率中性 (Volatility)', active: false },
    { label: '风格中性 (Style Factors)', active: false },
  ];

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-[#0D1117] border-l border-border/50 z-[60] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between bg-white/5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Icons.Sliders className="w-5 h-5 text-primary" />
          组合高级限制 (Optimization)
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-text-muted">
          <Icons.XCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* 1. Weight Constraints */}
        <section className="space-y-4">
          <div className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
            权重边界 (Weight Bounds)
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-text-muted">单票上限 (%)</label>
              <input 
                type="number" 
                defaultValue={5} 
                className="w-full bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-primary" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-text-muted">单票下限 (%)</label>
              <input 
                type="number" 
                defaultValue={0} 
                className="w-full bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-primary" 
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <span className="text-[11px] text-text-muted">总仓位控制</span>
            <span className="text-xs font-mono font-bold text-white">90% - 100%</span>
          </div>
        </section>

        {/* 2. Neutralization Options */}
        <section className="space-y-4">
          <div className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
            多维中性化 (Neutralization)
          </div>
          <div className="space-y-3">
            {neutralizationOptions.map(item => (
              <div 
                key={item.label} 
                className="flex items-center justify-between p-3 bg-surface/50 border border-border/50 rounded-xl group hover:border-primary/40 transition-all"
              >
                <span className="text-xs text-text-main font-medium">{item.label}</span>
                <button className={`w-10 h-5 rounded-full relative transition-all ${item.active ? 'bg-primary' : 'bg-border'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.active ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Turnover & Risk */}
        <section className="space-y-4">
          <div className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
            交易与风险 (Risk & Costs)
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-text-muted">最大单次换手限制 (Max Turnover)</span>
                <span className="text-primary font-mono">15%</span>
              </div>
              <input type="range" className="w-full accent-primary h-1 bg-surface rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-text-muted">跟踪误差限制 (Tracking Error)</span>
                <span className="text-primary font-mono">4.5%</span>
              </div>
              <input type="range" className="w-full accent-primary h-1 bg-surface rounded-full" />
            </div>
          </div>
        </section>

        {/* 4. Feasibility Check */}
        <div className="p-4 bg-violet/5 border border-violet/20 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-violet font-bold text-xs">
            <Icons.CheckCircle className="w-4 h-4" /> 优化可行性检测
          </div>
          <p className="text-[10px] text-text-muted leading-relaxed">
            根据当前限制，组合将剔除约 <span className="text-white">12%</span> 的备选股票。预期 <span className="text-success">夏普比率</span> 将提升约 0.15。
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border bg-white/5 flex gap-3">
        <button 
          onClick={onClose} 
          className="flex-1 py-2.5 bg-surface border border-border rounded-lg text-xs font-bold text-text-muted hover:text-white transition-all"
        >
          取消
        </button>
        <button className="flex-2 py-2.5 bg-primary text-white rounded-lg text-xs font-bold shadow-glow-blue hover:brightness-110 transition-all">
          保存并重新运行
        </button>
      </div>
    </div>
  );
};

export default AdvancedSettingsDrawer;
