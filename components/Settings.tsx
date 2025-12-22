import React, { useState } from 'react';
import { Icons } from './Icons';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState(process.env.API_KEY || '');
  const [riskLimit, setRiskLimit] = useState(20);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({
      trade: true,
      news: true,
      risk: true
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Icons.Settings className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">系统设置</h1>
      </div>

      {/* API Configuration */}
      <section className="glass-panel p-6 rounded-xl border border-border space-y-4">
        <div className="flex items-center gap-2 mb-2">
            <Icons.Zap className="w-5 h-5 text-violet" />
            <h2 className="text-lg font-semibold">API 配置</h2>
        </div>
        <div className="space-y-2">
            <label className="text-sm text-text-muted">Gemini API Key (用于 AI 分析)</label>
            <div className="flex gap-2">
                <input 
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm focus:border-violet focus:ring-1 focus:ring-violet outline-none transition-all"
                />
                <button className="px-4 py-2 bg-violet/10 text-violet border border-violet/20 rounded-lg text-sm hover:bg-violet/20">
                    保存
                </button>
            </div>
            <p className="text-xs text-text-muted">
                您的密钥仅存储在本地会话中，不会上传至服务器。
            </p>
        </div>
      </section>

      {/* Trading Preferences */}
      <section className="glass-panel p-6 rounded-xl border border-border space-y-4">
         <div className="flex items-center gap-2 mb-2">
            <Icons.Trade className="w-5 h-5 text-cyan" />
            <h2 className="text-lg font-semibold">交易偏好</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm text-text-muted">默认交易手数</label>
                <input type="number" defaultValue={100} className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm outline-none" />
            </div>
            <div className="space-y-2">
                <label className="text-sm text-text-muted">单笔最大回撤风控 (%)</label>
                 <div className="flex items-center gap-4">
                    <input 
                        type="range" 
                        min="1" max="50" 
                        value={riskLimit} 
                        onChange={(e) => setRiskLimit(Number(e.target.value))}
                        className="flex-1 accent-cyan"
                    />
                    <span className="text-cyan font-mono font-bold w-12 text-right">{riskLimit}%</span>
                 </div>
            </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="glass-panel p-6 rounded-xl border border-border space-y-4">
         <div className="flex items-center gap-2 mb-2">
            <Icons.Bell className="w-5 h-5 text-success" />
            <h2 className="text-lg font-semibold">通知中心</h2>
        </div>
        <div className="space-y-3">
            {[
                { id: 'trade', label: '成交回报通知' },
                { id: 'risk', label: '风险预警 (持仓回撤 > 5%)' },
                { id: 'news', label: '重大新闻推送' }
            ].map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-transparent hover:border-border transition-all">
                    <span className="text-sm">{item.label}</span>
                    <button 
                        onClick={() => setNotifications({...notifications, [item.id]: !notifications[item.id as keyof typeof notifications]})}
                        className={`w-10 h-5 rounded-full relative transition-colors ${notifications[item.id as keyof typeof notifications] ? 'bg-success' : 'bg-border'}`}
                    >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notifications[item.id as keyof typeof notifications] ? 'left-6' : 'left-1'}`} />
                    </button>
                </div>
            ))}
        </div>
      </section>

      {/* Account Info */}
      <section className="glass-panel p-6 rounded-xl border border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-lg font-bold border border-gray-600">
                JD
            </div>
            <div>
                <h3 className="font-bold text-white">John Doe</h3>
                <p className="text-xs text-text-muted">Pro 账户 | 有效期至 2024-12-31</p>
            </div>
        </div>
        <button className="text-sm text-danger border border-danger/30 px-4 py-2 rounded-lg hover:bg-danger/10 transition-colors">
            退出登录
        </button>
      </section>
    </div>
  );
};

export default Settings;