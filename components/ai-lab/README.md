# AI Lab - Modular Architecture

## Overview
AI实验室已重构为模块化结构，提供智能量化投资分析功能。

## Directory Structure

```
ai-lab/
├── index.ts              # 导出所有组件和类型
├── types.ts              # TypeScript 类型定义
├── mockData.ts           # 模拟数据
├── GlassCard.tsx         # 玻璃卡片容器(可复用)
├── ConfidenceGauge.tsx   # 信心度仪表盘
├── MiniChart.tsx         # 迷你图表组件
├── SearchHero.tsx        # 搜索首页
├── AnalyzingLoader.tsx   # 分析加载动画
├── SummaryCard.tsx       # 总结卡片
├── AnalysisCard.tsx      # 分析卡片
├── StockList.tsx         # 股票推荐列表
└── AIChat.tsx            # AI对话组件
```

## Components

### 1. SearchHero
搜索首页，大搜索框和快捷模板。

**Props:**
- `query: string` - 查询文本
- `onQueryChange: (query: string) => void` - 查询变更回调
- `onSearch: (query: string) => void` - 搜索回调
- `templates: PromptTemplate[]` - 快捷模板列表

### 2. AnalyzingLoader
分析加载动画，酷炫的扫描效果。

**Props:**
- `query: string` - 正在分析的查询
- `progress?: number` - 进度百分比

### 3. SummaryCard
总结卡片，显示AI分析摘要和信心度。

**Props:**
- `sentiment?: 'bullish' | 'bearish' | 'neutral'` - 情绪判断
- `confidence?: number` - 信心度分数
- `summary?: string` - 摘要文本
- `details?: string` - 详细说明
- `support?: string` - 支撑位
- `resistance?: string` - 压力位

### 4. AnalysisCard
分析卡片，显示技术面、资金流等分析。

**Props:**
- `data: ChartDataPoint[]` - 图表数据
- `title: string` - 标题
- `icon: React.ComponentType` - 图标组件
- `color: string` - 主题颜色
- `chartType?: 'area' | 'bar'` - 图表类型
- `stats?: Array` - 统计数据
- `news?: NewsItem[]` - 新闻列表

### 5. StockList
股票推荐列表。

**Props:**
- `stocks: StockRecommendation[]` - 股票列表

### 6. AIChat
AI对话组件，支持多轮对话。

**Props:**
- `messages: ChatMessage[]` - 消息列表
- `input: string` - 输入内容
- `onInputChange: (value: string) => void` - 输入变更回调
- `onSend: () => void` - 发送回调
- `suggestions?: string[]` - 快捷建议

### 7. GlassCard (可复用)
玻璃态卡片容器。

**Props:**
- `children?: React.ReactNode` - 子内容
- `className?: string` - 额外CSS类
- `glow?: boolean` - 是否发光
- `noPadding?: boolean` - 是否无内边距

### 8. ConfidenceGauge (可复用)
环形信心度仪表盘。

**Props:**
- `score: number` - 分数 (0-100)

### 9. MiniChart (可复用)
迷你图表，支持面积图和柱状图。

**Props:**
- `data: ChartDataPoint[]` - 数据点
- `color: string` - 颜色
- `type?: 'area' | 'bar'` - 类型

## Usage Example

```tsx
import {
  SearchHero,
  SummaryCard,
  AIChat,
  PROMPT_TEMPLATES,
} from './ai-lab';

function MyComponent() {
  const [query, setQuery] = useState('');
  
  return (
    <div>
      <SearchHero
        query={query}
        onQueryChange={setQuery}
        onSearch={(q) => console.log(q)}
        templates={PROMPT_TEMPLATES}
      />
      <SummaryCard sentiment="bullish" confidence={88} />
    </div>
  );
}
```

## Extension Guide

### 添加新的快捷模板
```tsx
const customTemplates: PromptTemplate[] = [
  { icon: Icons.Star, label: "自定义", query: "自定义查询..." },
];
```

### 自定义图表样式
```tsx
<MiniChart 
  data={myData}
  color="#FF5733"
  type="bar"
/>
```

### 扩展对话功能
```tsx
<AIChat
  messages={messages}
  input={input}
  onInputChange={setInput}
  onSend={handleSend}
  suggestions={['自定义建议1', '自定义建议2']}
/>
```

## Benefits

✅ **模块化** - 每个组件独立，职责单一  
✅ **可扩展** - 通过 Props 灵活配置  
✅ **类型安全** - TypeScript 完整类型定义  
✅ **可复用** - GlassCard, ConfidenceGauge, MiniChart 可复用  
✅ **酷炫UI** - 玻璃态、渐变、动画效果  
✅ **易维护** - 代码结构清晰
