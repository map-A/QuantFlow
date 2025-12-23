import React from 'react';

interface StatItemProps {
  label: string;
  value: string;
  color?: string;
  subValue?: string;
}

const StatItem: React.FC<StatItemProps> = ({ 
  label, 
  value, 
  color = "text-white", 
  subValue 
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">
      {label}
    </span>
    <span className={`text-lg font-mono font-bold leading-none ${color}`}>
      {value}
    </span>
    {subValue && (
      <span className="text-[9px] text-text-muted font-mono">{subValue}</span>
    )}
  </div>
);

interface AccountStatsProps {
  totalEquity: number;
  availableBalance: number;
  dailyPnl: number;
  dailyPnlPercent: number;
  riskStatus: string;
}

const AccountStats: React.FC<AccountStatsProps> = ({
  totalEquity,
  availableBalance,
  dailyPnl,
  dailyPnlPercent,
  riskStatus
}) => {
  return (
    <div className="flex items-center gap-8">
      <StatItem 
        label="总权益 (TOTAL EQUITY)" 
        value={`¥ ${totalEquity.toLocaleString()}.00`}
        subValue={`可用: ¥ ${availableBalance.toLocaleString()}`}
      />
      <div className="h-10 w-px bg-border/50" />
      <StatItem 
        label="今日盈亏 (P/L)" 
        value={`${dailyPnl >= 0 ? '+' : ''}¥ ${dailyPnl.toLocaleString()}.00`}
        color={dailyPnl >= 0 ? 'text-success' : 'text-danger'}
        subValue={`${dailyPnlPercent >= 0 ? '+' : ''}${dailyPnlPercent}% 跑赢基准`}
      />
      <div className="h-10 w-px bg-border/50" />
      <StatItem 
        label="风控状态" 
        value={riskStatus}
        color="text-success"
      />
    </div>
  );
};

export default AccountStats;
