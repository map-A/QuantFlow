import React from 'react';
import { Icons } from '../Icons';

const CorrelationAlert: React.FC = () => {
  return (
    <div className="p-3 bg-danger/5 border border-danger/20 rounded-xl flex items-start gap-3">
      <Icons.Alert className="w-4 h-4 text-danger shrink-0 mt-0.5" />
      <div className="space-y-1">
        <div className="text-[10px] font-bold text-danger">因子相关性过高警示</div>
        <p className="text-[9px] text-text-muted leading-snug">
          与库中 'Mom_60D' 相关性 0.82，建议进行正交化处理以去冗余。
        </p>
      </div>
    </div>
  );
};

export default CorrelationAlert;
