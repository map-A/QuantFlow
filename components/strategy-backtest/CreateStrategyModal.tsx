import React from 'react';
import { Icons } from '../Icons';

const STRATEGY_TEMPLATES = [
  { 
    name: '均线交叉策略 (MA Cross)', 
    code: 'def handle_data(context, data):\n    hist = data.history(context.security, "close", 20, "1d")\n    ma5 = hist[-5:].mean()\n    ma20 = hist.mean()\n    if ma5 > ma20: api.order_target_percent(context.security, 1.0)' 
  },
  { 
    name: 'RSI 超买超卖 (RSI Mean Reversion)', 
    code: 'def handle_data(context, data):\n    rsi = api.get_indicator(context.security, "RSI")\n    if rsi < 30: api.order_target_percent(context.security, 1.0)\n    elif rsi > 70: api.order_target(context.security, 0)' 
  }
];

interface CreateStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, code: string) => void;
}

const CreateStrategyModal: React.FC<CreateStrategyModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = React.useState('');
  const [code, setCode] = React.useState(STRATEGY_TEMPLATES[0].code);

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name, code);
    setName('');
    setCode(STRATEGY_TEMPLATES[0].code);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Icons.Zap className="text-primary w-6 h-6" />
            新建策略
          </h3>
          <button onClick={onClose} className="text-text-muted hover:text-white p-1">
            <Icons.XCircle className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Strategy Name */}
          <div className="space-y-2">
            <label className="text-sm text-text-muted">策略名称</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入策略名称，例如：双均线金叉策略 v1"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <label className="text-sm text-text-muted">选择模板</label>
            <div className="grid grid-cols-2 gap-3">
              {STRATEGY_TEMPLATES.map((tmpl, i) => (
                <button 
                  key={i}
                  onClick={() => setCode(tmpl.code)}
                  className={`p-3 text-left rounded-xl border transition-all text-xs
                    ${code === tmpl.code ? 'border-primary bg-primary/5 text-white' : 'border-border hover:border-white/20 text-text-muted'}
                  `}
                >
                  <div className="font-bold mb-1">{tmpl.name}</div>
                  <div className="opacity-60 truncate">基础量化模板代码</div>
                </button>
              ))}
            </div>
          </div>

          {/* Code Preview */}
          <div className="space-y-2">
            <label className="text-sm text-text-muted">代码预览</label>
            <div className="bg-[#0D1117] border border-border rounded-xl p-4 font-mono text-xs text-cyan h-48 overflow-y-auto">
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-surface border-t border-border flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-sm text-text-muted hover:text-white transition-colors"
          >
            取消
          </button>
          <button 
            onClick={handleCreate}
            className="px-8 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            创建策略
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStrategyModal;
