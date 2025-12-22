
import React, { useState } from 'react';
import { Icons } from './Icons';

const NOTIF_HISTORY = [
  { id: 1, type: 'signal', title: '策略买入信号', description: '贵州茅台 (600519) 触发双均线金叉信号', time: '2023-11-20 14:40', unread: true },
  { id: 2, type: 'risk', title: '风控预警', description: '组合当前回撤 4.2%，接近 5% 警戒线', time: '2023-11-20 14:25', unread: true },
  { id: 3, type: 'news', title: '重大政策发布', description: '央行宣布下调存款准备金率 0.5%，释放长期资金约1万亿元', time: '2023-11-20 13:30', unread: false },
  { id: 4, type: 'limit', title: '涨停提醒', description: '科大讯飞 (002230) 封板成功，封单 12.5万手', time: '2023-11-20 12:45', unread: false },
  { id: 5, type: 'system', title: '系统维护通知', description: '服务器将于今晚 23:00 进行常规升级维护', time: '2023-11-20 10:00', unread: false },
  { id: 6, type: 'signal', title: '卖出止盈信号', description: '比亚迪 (002594) 达到预设止盈位 +15%', time: '2023-11-19 14:55', unread: false },
];

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? NOTIF_HISTORY : NOTIF_HISTORY.filter(n => n.type === filter);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Icons.Bell className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">通知中心</h1>
        </div>
        <button className="text-xs text-text-muted hover:text-white transition-colors">标记所有已读</button>
      </div>

      <div className="flex gap-2 bg-surface/30 p-1 rounded-xl border border-border/50 w-fit">
        {['all', 'signal', 'risk', 'news', 'system'].map(t => (
          <button 
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === t ? 'bg-primary text-white shadow-glow-blue' : 'text-text-muted hover:text-white'}`}
          >
            {t === 'all' ? '全部' : t === 'signal' ? '交易信号' : t === 'risk' ? '风险' : t === 'news' ? '快讯' : '系统'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(notif => (
          <div key={notif.id} className={`p-4 rounded-2xl border transition-all ${notif.unread ? 'bg-primary/5 border-primary/30' : 'bg-surface/30 border-border/50'} hover:border-primary/50 group`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  notif.type === 'risk' ? 'bg-danger/10 text-danger' : 
                  notif.type === 'signal' ? 'bg-cyan/10 text-cyan' : 'bg-primary/10 text-primary'
                }`}>
                  {notif.type === 'risk' ? <Icons.Alert className="w-4 h-4" /> : 
                   notif.type === 'signal' ? <Icons.Zap className="w-4 h-4" /> : <Icons.News className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{notif.title}</h4>
                  <span className="text-[10px] text-text-muted font-mono uppercase">{notif.type}</span>
                </div>
              </div>
              <span className="text-[10px] text-text-muted font-mono">{notif.time}</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed pl-11">
              {notif.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
