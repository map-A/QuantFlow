import React, { useState } from 'react';
import { Icons } from '../Icons';

interface CardMenuProps {
  onAction: (action: string) => void;
}

const CardMenu: React.FC<CardMenuProps> = ({ onAction }) => {
  const [open, setOpen] = useState(false);
  
  const menuItems = [
    { label: '全屏模式', icon: Icons.Maximize, act: 'fullscreen' },
    { label: '导出 CSV', icon: Icons.Download, act: 'export' },
    { label: '刷新数据', icon: Icons.Refresh, act: 'refresh' },
    { label: '因子设置', icon: Icons.Settings, act: 'settings' },
    { label: '重置卡片', icon: Icons.Refresh, act: 'reset' },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)} 
        className="p-1 hover:bg-white/10 rounded text-text-muted transition-colors"
      >
        <Icons.More className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-lg shadow-2xl z-40 py-1 animate-in fade-in zoom-in-95 duration-100">
            {menuItems.map(item => (
              <button 
                key={item.label} 
                onClick={() => { onAction(item.act); setOpen(false); }} 
                className="w-full flex items-center gap-3 px-4 py-2 text-xs text-text-muted hover:text-white hover:bg-primary/10 transition-all"
              >
                <item.icon className="w-3.5 h-3.5" /> {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardMenu;
