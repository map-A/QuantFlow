import React from 'react';
import { Icons } from '../Icons';

const PreprocessingPanel: React.FC = () => {
  const settings = [
    { label: '缺失值填充', opt: '行业中值' },
    { label: 'Winsor化 (3σ)', act: true },
    { label: '标准正态化', act: true }
  ];

  return (
    <div className="h-44 glass-panel rounded-xl border border-border/50 p-4">
      <div className="text-[10px] font-bold text-text-muted uppercase mb-4 flex items-center gap-2">
        <Icons.Sliders className="w-3 h-3" /> 数据预处理
      </div>
      <div className="space-y-3">
        {settings.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-[11px]">
            <span className="text-text-muted">{item.label}</span>
            {item.opt ? (
              <span className="px-2 py-0.5 bg-background border border-border rounded text-[9px]">
                {item.opt}
              </span>
            ) : (
              <Icons.CheckCircle className="w-3.5 h-3.5 text-success" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreprocessingPanel;
