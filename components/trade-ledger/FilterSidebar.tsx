import React from 'react';
import { Icons } from '../Icons';

interface FilterSidebarProps {
  selectedAccount: string;
  onAccountChange: (account: string) => void;
  showAbnormalOnly: boolean;
  onAbnormalToggle: (checked: boolean) => void;
}

interface ComplianceRowProps {
  label: string;
  status: string;
}

const ComplianceRow: React.FC<ComplianceRowProps> = ({ label, status }) => (
  <div className="flex items-center justify-between text-[9px]">
    <span className="text-text-muted">{label}</span>
    <span className={`font-bold ${status === 'PASS' ? 'text-success' : 'text-yellow-500'}`}>
      {status}
    </span>
  </div>
);

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedAccount,
  onAccountChange,
  showAbnormalOnly,
  onAbnormalToggle
}) => {
  return (
    <aside className="w-80 shrink-0 border-r border-border bg-[#161B22]/30 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* Account Selection */}
      <div>
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
          策略 & 账户
        </h3>
        <div className="space-y-2">
          <label className="text-[9px] text-text-muted">选择子账户</label>
          <select 
            value={selectedAccount}
            onChange={(e) => onAccountChange(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-primary"
          >
            <option>All Accounts</option>
            <option>Multi-Factor Alpha</option>
            <option>T+0 Intraday</option>
          </select>
        </div>
      </div>

      {/* Strategy Filter */}
      <div>
        <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-3 block">
          执行逻辑
        </label>
        <div className="space-y-2.5">
          {['Multi-Factor', 'Sentiment', 'Event-Driven'].map(strategy => (
            <label key={strategy} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                defaultChecked 
                className="accent-primary w-3.5 h-3.5" 
              />
              <span className="text-xs text-text-main">{strategy}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Trade Filters */}
      <div>
        <label className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-3 block">
          交易属性
        </label>
        <input 
          type="text" 
          placeholder="搜索代码/名称..." 
          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-white placeholder-text-muted outline-none focus:border-primary"
        />
        <label className="flex items-center gap-2 mt-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={showAbnormalOnly}
            onChange={(e) => onAbnormalToggle(e.target.checked)}
            className="accent-danger w-3.5 h-3.5" 
          />
          <span className="text-xs text-danger">仅显示异常交易</span>
        </label>
      </div>

      {/* Compliance Panel */}
      <div className="mt-auto pt-6 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <Icons.CheckCircle className="w-4 h-4 text-cyan" />
          <h3 className="text-[9px] font-bold text-text-muted uppercase tracking-widest">
            算法合规自检
          </h3>
        </div>
        <div className="space-y-2">
          <ComplianceRow label="自成交校验" status="PASS" />
          <ComplianceRow label="价格笼子校验" status="PASS" />
          <ComplianceRow label="撤单率监控" status="WARNING" />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
