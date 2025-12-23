import React from 'react';
import { Icons } from '../Icons';

interface DisclaimerCardProps {
  message?: string;
}

export const DisclaimerCard: React.FC<DisclaimerCardProps> = ({
  message = '本模块仅基于文化符号学对宏观数据进行感性重构，旨在提供多维思考视角。所有"五行"与"卦象"映射不构成任何直接的买卖依据。'
}) => {
  return (
    <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
      <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-2 flex items-center gap-2">
        <Icons.Alert className="w-3 h-3" /> 非预测声明
      </h4>
      <p className="text-[11px] text-text-muted leading-relaxed">
        {message}
      </p>
    </div>
  );
};
