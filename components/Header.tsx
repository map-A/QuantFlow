
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { Page } from '../types';

// --- Mock Notifications ---
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'signal', title: '策略买入信号', description: '贵州茅台 (600519) 触发双均线金叉信号', time: '2分钟前', unread: true },
  { id: 2, type: 'risk', title: '风控预警', description: '组合当前回撤 4.2%，接近 5% 警戒线', time: '15分钟前', unread: true },
  { id: 3, type: 'news', title: '重大政策发布', description: '央行宣布下调存款准备金率 0.5%', time: '1小时前', unread: false },
  { id: 4, type: 'limit', title: '涨停提醒', description: '科大讯飞 (002230) 封板成功，封单 12.5万手', time: '2小时前', unread: false },
];

interface HeaderProps {
  setPage?: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIgnoreAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleMenuAction = (action: string) => {
    if (!setPage) return;
    switch (action) {
      case 'settings':
        setPage(Page.SETTINGS);
        break;
      case 'funds':
        setPage(Page.FUNDS);
        break;
      case 'bills':
        setPage(Page.BILLING);
        break;
      case 'notifications':
        setPage(Page.NOTIFICATIONS);
        break;
      case 'logout':
        alert('正在安全退出...');
        window.location.reload();
        break;
      default:
        console.warn(`Action ${action} not implemented`);
    }
    setShowAccountMenu(false);
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 sticky top-0 z-[60] ml-20 lg:ml-64 transition-all duration-300">
      <div className="flex items-center w-full max-w-xl">
        <div className="relative w-full">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="搜索代码、策略或新闻..." 
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder-gray-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-full border border-border/50">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-mono text-success">已开盘</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg transition-all ${showNotifications ? 'bg-primary/20 text-primary shadow-glow-blue' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
          >
            <Icons.Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-background animate-bounce" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#161B22]/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl z-[70] animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <span className="text-sm font-bold text-white uppercase tracking-wider">实时提醒 ({unreadCount})</span>
                <button 
                  onClick={handleIgnoreAll}
                  className="text-[10px] text-primary hover:underline"
                >
                  全部忽略
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      onClick={() => handleNotificationClick(notif.id)}
                      className={`p-4 border-b border-border/30 hover:bg-white/5 transition-colors cursor-pointer group ${notif.unread ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-xs font-bold ${notif.type === 'risk' ? 'text-danger' : notif.type === 'signal' ? 'text-cyan' : 'text-primary'}`}>
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-text-muted font-mono">{notif.time}</span>
                      </div>
                      <p className="text-xs text-text-muted group-hover:text-text-main transition-colors leading-snug">
                        {notif.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-text-muted text-xs italic">
                    暂无新提醒
                  </div>
                )}
              </div>
              <div className="p-3 text-center border-t border-border bg-white/5 rounded-b-xl">
                <button 
                  onClick={() => handleMenuAction('notifications')}
                  className="text-xs text-text-muted hover:text-white transition-colors flex items-center justify-center gap-2 w-full"
                >
                  <Icons.Eye className="w-3.5 h-3.5" /> 查看历史通知
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Menu Dropdown */}
        <div className="relative" ref={accountRef}>
          <button 
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className={`w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border flex items-center justify-center text-xs font-bold text-white transition-all
              ${showAccountMenu ? 'border-primary ring-4 ring-primary/20 scale-105 shadow-glow-blue' : 'border-gray-600 hover:border-gray-400 hover:scale-105'}
            `}
          >
            JD
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-[#161B22]/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl z-[70] animate-in fade-in zoom-in-95 duration-200 p-2">
              <div className="p-3 mb-2 flex items-center gap-3 bg-white/5 rounded-lg border border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center font-bold text-white shadow-glow-cyan">
                  JD
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-white truncate">John Doe</span>
                  <span className="text-[10px] text-primary font-bold flex items-center gap-1">
                    <Icons.Trophy className="w-2.5 h-2.5" /> PRO 订阅用户
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <button 
                  onClick={() => handleMenuAction('settings')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <Icons.Settings className="w-4 h-4" />
                  <span>账户设置</span>
                </button>
                <button 
                  onClick={() => handleMenuAction('funds')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <Icons.Wallet className="w-4 h-4" />
                  <span>资金管理</span>
                </button>
                <button 
                  onClick={() => handleMenuAction('bills')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <Icons.History className="w-4 h-4" />
                  <span>交易账单</span>
                </button>
                <div className="h-px bg-border my-2 mx-2"></div>
                <button 
                  onClick={() => handleMenuAction('logout')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg transition-all"
                >
                   <Icons.XCircle className="w-4 h-4" />
                   <span>退出登录</span>
                </button>
              </div>

              <div className="mt-2 p-2 bg-violet/10 border border-violet/20 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] text-violet font-bold uppercase">算力配额 (Daily)</span>
                  <span className="text-[9px] text-violet font-mono">82%</span>
                </div>
                <div className="w-full h-1 bg-violet/20 rounded-full overflow-hidden">
                   <div className="h-full bg-violet w-[82%] shadow-glow-blue"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
