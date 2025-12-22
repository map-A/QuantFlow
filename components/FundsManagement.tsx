
import React, { useState } from 'react';
import { Icons } from './Icons';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const MOCK_ASSETS = [
  { name: '可用资金', value: 452000, color: '#2BC4A8' },
  { name: '持仓市值', value: 520000, color: '#1F6FEB' },
  { name: '冻结资金', value: 28000, color: '#F6465D' },
];

const MOCK_EQUITY_HISTORY = Array.from({ length: 30 }, (_, i) => ({
  date: `11-${i + 1}`,
  equity: 950000 + Math.sin(i * 0.5) * 20000 + i * 2000,
}));

const INITIAL_TRANSACTIONS = [
  { id: 'tx1', type: 'deposit', amount: 100000, status: 'success', time: '2023-11-20 10:30', method: '银行卡转入' },
  { id: 'tx2', type: 'withdraw', amount: 5000, status: 'processing', time: '2023-11-19 14:20', method: '提现至支付宝' },
  { id: 'tx3', type: 'dividend', amount: 1250.5, status: 'success', time: '2023-11-15 09:00', method: '现金分红' },
  { id: 'tx4', type: 'commission', amount: -25.4, status: 'success', time: '2023-11-14 15:00', method: '印花税扣除' },
];

const FundsManagement: React.FC = () => {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [showDeposit, setShowDeposit] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = () => {
    const amt = parseFloat(depositAmount);
    if (!amt || amt <= 0) return;
    
    const newTx = {
      id: `tx${Date.now()}`,
      type: 'deposit',
      amount: amt,
      status: 'success',
      time: new Date().toLocaleString(),
      method: '银行卡快速存入'
    };
    
    setTransactions([newTx, ...transactions]);
    setShowDeposit(false);
    setDepositAmount('');
    alert('资金已成功存入可用余额');
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Icons.Wallet className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">资金管理</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Assets Overview */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-border flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-sm text-text-muted">总资产 (CNY)</span>
              <div className="text-4xl font-mono font-bold text-white mt-1">¥ 1,000,000.00</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-success font-bold">+¥12,450.00 (今日盈亏)</span>
                <span className="text-[10px] text-text-muted">较昨日 +1.25%</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowDeposit(true)}
                className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-glow-blue hover:brightness-110 transition-all"
              >
                资金转入
              </button>
              <button className="px-6 py-2 bg-surface border border-border text-white rounded-xl text-sm font-bold hover:bg-white/5 transition-all">
                提现
              </button>
            </div>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_EQUITY_HISTORY}>
                <defs>
                  <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8B949E' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px', fontSize: '11px' }} />
                <Area type="monotone" dataKey="equity" stroke="#1F6FEB" fill="url(#equityGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Distribution */}
        <div className="glass-panel p-6 rounded-2xl border border-border flex flex-col">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">资产分布</h3>
          <div className="flex-1 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_ASSETS}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_ASSETS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {MOCK_ASSETS.map((asset) => (
              <div key={asset.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.color }} />
                  <span className="text-text-muted">{asset.name}</span>
                </div>
                <span className="font-mono text-white">¥ {asset.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Records */}
      <div className="glass-panel rounded-2xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-white/5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">最近资金变动</h3>
          <button className="text-xs text-primary hover:underline">查看全部明细</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] text-text-muted uppercase bg-surface/50 border-b border-border">
              <tr>
                <th className="px-6 py-4">时间</th>
                <th className="px-6 py-4">类型</th>
                <th className="px-6 py-4">金额</th>
                <th className="px-6 py-4">渠道/说明</th>
                <th className="px-6 py-4">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-text-muted">{tx.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.type === 'deposit' ? 'bg-success/10 text-success' : 
                      tx.type === 'withdraw' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'
                    }`}>
                      {tx.type === 'deposit' ? '资金存入' : tx.type === 'withdraw' ? '资金提取' : '股息/税费'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-mono font-bold ${tx.amount > 0 ? 'text-success' : 'text-danger'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-text-main">{tx.method}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-[10px] font-bold ${
                      tx.status === 'success' ? 'text-success' : 'text-yellow-500'
                    }`}>
                      {tx.status === 'success' ? <Icons.CheckCircle className="w-3 h-3" /> : <Icons.Clock className="w-3 h-3 animate-spin" />}
                      {tx.status === 'success' ? '已完成' : '处理中'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Dialog Simulation */}
      {showDeposit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icons.Wallet className="text-primary" /> 资金存入
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-text-muted uppercase">输入金额 (CNY)</label>
                <input 
                  type="number" 
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-lg font-mono focus:border-primary outline-none"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowDeposit(false)}
                  className="flex-1 py-2 text-text-muted hover:text-white transition-colors font-bold"
                >
                  取消
                </button>
                <button 
                  onClick={handleDeposit}
                  className="flex-2 py-2 bg-primary text-white rounded-xl shadow-glow-blue hover:brightness-110 transition-all font-bold"
                >
                  确认存入
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundsManagement;
