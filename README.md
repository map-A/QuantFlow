
# QuantFlow - 量化交易分析平台

一个专业的、超现代化的量化分析与交易平台，具备实时市场数据、AI智能分析和高级图表工具。

## 功能特性

- 📊 **实时市场数据** - 实时股票行情、指数和市场情绪分析
- 🤖 **AI 智能分析** - 基于 Gemini AI 的智能市场分析和推荐
- 📈 **高级图表工具** - 专业的K线图、技术指标和趋势分析
- 🔬 **Alpha 因子实验室** - 自定义量化因子研究和回测
- 💹 **策略回测引擎** - 完整的策略回测和绩效分析系统
- 😊 **情绪分析实验室** - 市场情绪和舆情监控
- 📰 **新闻实验室** - 实时新闻聚合和影响分析
- 📋 **交易账本** - 专业级交易记录和风控管理
- 🎯 **玄学实验室** - 传统文化与市场分析结合
- ⚡ **资金管理** - 完整的资金流向和持仓管理

## 本地运行

**前置要求：** Node.js (推荐 v18 或更高版本)

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置 API 密钥**
   
   在项目根目录创建 `.env.local` 文件，添加你的 Gemini API 密钥：
   ```
   GEMINI_API_KEY=你的_API_密钥
   ```
   
   获取 API 密钥：访问 [Google AI Studio](https://aistudio.google.com/app/apikey)

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   
   应用将在 http://localhost:5173 启动

## 构建部署

构建生产版本：
```bash
npm run build
```

预览生产构建：
```bash
npm run preview
```

## 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **AI 集成**: Google Gemini API
- **图表库**: Recharts
- **图标**: Lucide React
- **样式**: Tailwind CSS (通过配置)

## 项目结构

```
QuantFlow/
├── components/          # React 组件
│   ├── Dashboard.tsx   # 仪表板
│   ├── AILab.tsx       # AI 实验室
│   ├── AlphaLab.tsx    # Alpha 因子实验室
│   ├── StockDetail.tsx # 股票详情
│   └── ...
├── services/           # API 服务
├── App.tsx            # 主应用组件
├── types.ts           # TypeScript 类型定义
├── constants.ts       # 常量配置
└── vite.config.ts     # Vite 配置

```

## 使用说明

1. **仪表板** - 查看市场概览和关键指标
2. **市场** - 浏览实时股票列表和行情
3. **交易** - 查看股票详情和执行交易
4. **策略** - 创建和回测交易策略
5. **AI 实验室** - 使用 AI 进行市场分析
6. **Alpha 实验室** - 研发自定义量化因子
7. **情绪分析** - 监控市场情绪变化
8. **新闻实验室** - 追踪市场新闻和事件

## 注意事项

⚠️ **免责声明**: 本项目仅供学习和研究使用，不构成任何投资建议。实际交易有风险，投资需谨慎。

## 开源协议

本项目采用 MIT 协议开源。
