import React from 'react';
import { Icons } from '../Icons';

interface AccountHeaderProps {
  accountType: 'SIM' | 'LIVE';
  onAccountTypeToggle: () => void;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({ 
  accountType, 
  onAccountTypeToggle 
}) => {
  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
        <Icons.History className="text-primary w-6 h-6" />
        交易记录 / 执行日志
      </h1>
      <div className="flex items-center gap-3 mt-1.5">
        <button 
          onClick={onAccountTypeToggle}
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-all shadow-glow-blue
            ${accountType === 'SIM' ? 'bg-cyan/10 border-cyan/40 text-cyan' : 'bg-success/10 border-success/40 text-success'}
          `}
        >
          {accountType === 'SIM' ? 'SIMULATION #802' : 'LIVE PRODUCTION'}
        </button>
        <span className="text-[10px] text-text-muted font-mono flex items-center gap-1.5">
          <Icons.Refresh className="w-3 h-3 animate-spin-slow" />
          SYNCING WITH EXCHANGE
        </span>
      </div>
    </div>
  );
};

export default AccountHeader;
