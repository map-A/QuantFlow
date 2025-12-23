import React from 'react';
import { Icons } from '../Icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import Panel from './Panel';

interface FactorItem {
  id: string;
  name: string;
  weight: number;
}

interface WeightingPanelProps {
  selectedFactors: FactorItem[];
  weightMethod: string;
  onWeightMethodChange: (method: string) => void;
  onWeightChange: (id: string, value: number) => void;
}

const WeightingPanel: React.FC<WeightingPanelProps> = ({
  selectedFactors,
  weightMethod,
  onWeightMethodChange,
  onWeightChange
}) => {
  return (
    <Panel 
      title="权重分配与融合" 
      icon={Icons.Sliders}
      extra={
        <div className="flex bg-background border border-border rounded p-0.5 text-[10px]">
          {['Equal', 'IC-IR', 'PCA', 'Custom'].map(m => (
            <button 
              key={m} 
              onClick={() => onWeightMethodChange(m)}
              className={`px-3 py-1 rounded transition-all ${weightMethod === m ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}
            >
              {m}
            </button>
          ))}
        </div>
      }
    >
      <div className="p-6 flex flex-col gap-6 h-full">
        <div className="grid grid-cols-2 gap-8 flex-1">
          <div className="space-y-4">
            {selectedFactors.map(f => (
              <div key={f.id} className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-main font-bold">{f.name}</span>
                  <span className="text-primary font-mono">{f.weight}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={f.weight} 
                  onChange={(e) => onWeightChange(f.id, Number(e.target.value))}
                  className="w-full accent-primary bg-surface h-1 rounded-full outline-none"
                />
              </div>
            ))}
            {selectedFactors.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-40 italic">
                <Icons.Plus className="w-8 h-8 mb-2" />
                请从左侧选择因子
              </div>
            )}
          </div>

          <div className="flex flex-col bg-surface/20 border border-border/30 rounded-xl p-4 overflow-hidden">
            <div className="text-[10px] font-bold text-text-muted uppercase mb-4">因子贡献度</div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedFactors} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }} 
                    contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} 
                  />
                  <Bar dataKey="weight" fill="#1F6FEB" radius={[0, 4, 4, 0]}>
                    {selectedFactors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1F6FEB' : '#2BC4A8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="p-3 bg-background border border-border/50 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icons.Code className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-mono text-cyan truncate max-w-md">
              Composite_Alpha = {selectedFactors.map((f, i) => `${(f.weight/100).toFixed(2)}*${f.name}`).join(' + ')}
            </span>
          </div>
          <button className="p-1 hover:text-white transition-colors">
            <Icons.Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Panel>
  );
};

export default WeightingPanel;
