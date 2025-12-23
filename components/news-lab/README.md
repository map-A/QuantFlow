# News Lab - Modular Architecture

## Overview
新闻实验室已重构为模块化结构，便于扩展和维护。

## Directory Structure

```
news-lab/
├── index.ts                  # 导出所有组件和类型
├── types.ts                  # TypeScript 类型定义
├── mockData.ts              # 模拟数据
├── Section.tsx              # 通用Section容器组件
├── SentimentGauge.tsx       # 情绪仪表盘组件
├── NewsHeader.tsx           # 顶部导航和过滤器
├── NewsFeed.tsx             # 新闻流列表
├── SemanticAnalysis.tsx     # 语义与情绪分解
├── ImpactScope.tsx          # 影响半径与传导
├── MarketReaction.tsx       # 市场反应监控图表
├── QuantSignals.tsx         # 量化交易信号
├── AIInsight.tsx            # AI洞察卡片
└── NewsStatusBar.tsx        # 底部状态栏
```

## Components

### 1. NewsHeader
顶部新闻智能栏，包含过滤器和市场情绪指标。

**Props:**
- `marketMood: MarketMood` - 市场情绪对象
- `activeFilter: string` - 当前激活的过滤器
- `onFilterChange: (filter: string) => void` - 过滤器变更回调
- `onHistoryClick?: () => void` - 历史按钮点击回调

### 2. NewsFeed
新闻流列表组件，显示实时新闻。

**Props:**
- `news: NewsFeedItem[]` - 新闻列表
- `selectedNews: NewsFeedItem` - 当前选中的新闻
- `onSelectNews: (news: NewsFeedItem) => void` - 选择新闻回调

### 3. SemanticAnalysis
语义与情绪分解组件，分析新闻情绪强度和不确定性。

**Props:**
- `selectedNews: NewsFeedItem` - 选中的新闻项

### 4. ImpactScope
影响半径与传导组件，展示新闻影响范围。

**Props:**
- `selectedNews: NewsFeedItem` - 选中的新闻项
- `relatedStocks?: string[]` - 相关股票列表

### 5. MarketReaction
市场分钟级反应监控组件，包含价格和成交量图表。

**Props:**
- `data: ReactionDataPoint[]` - 反应数据点
- `metrics?: { responseTime, maxImpact, volumeRatio, arbitrageSpace }` - 指标对象

### 6. QuantSignals
量化交易信号组件。

**Props:**
- `signalStrength?: number` - 信号强度 (0-100)
- `confidence?: 'HIGH' | 'MEDIUM' | 'LOW'` - 置信度
- `signals?: QuantSignal[]` - 信号列表
- `strategies?: string[]` - 推荐策略列表

### 7. AIInsight
AI洞察决策中枢组件。

**Props:**
- `insight?: string` - AI洞察文本
- `warning?: string` - 风险警告
- `onSimulateTest?: () => void` - 模拟测试回调

### 8. NewsStatusBar
底部状态栏，显示处理延时、新闻处理量等信息。

**Props:**
- `processingDelay?: string` - 处理延时
- `newsRegime?: string` - 新闻态势
- `processedCount?: number` - 处理数量
- `engineStatus?: 'online' | 'offline'` - 引擎状态

### 9. SentimentGauge
环形情绪仪表盘组件（可复用）。

**Props:**
- `value: number` - 数值 (0-100)
- `label: string` - 标签文字
- `color: string` - 颜色

### 10. Section
通用Section容器组件（可复用）。

**Props:**
- `title: string` - 标题
- `children: React.ReactNode` - 子内容
- `className?: string` - 额外CSS类
- `icon?: React.ComponentType` - 图标组件
- `extra?: React.ReactNode` - 额外内容（右侧）
- `noPadding?: boolean` - 是否不要内边距

## Types

### NewsFeedItem
```typescript
interface NewsFeedItem {
  id: string;
  time: string;
  title: string;
  source: string;
  sourceLevel: 'A' | 'B' | 'C';
  sentiment: 'positive' | 'negative' | 'neutral';
  strength: number; // 0-100
  uncertainty: number; // 0-100
  tags: string[];
  isBreaking?: boolean;
}
```

### ReactionDataPoint
```typescript
interface ReactionDataPoint {
  time: number;
  price: number;
  volume: number;
}
```

### MarketMood
```typescript
interface MarketMood {
  mood: string;
  index: number;
  trend: 'up' | 'down' | 'neutral';
}
```

## Usage Example

```tsx
import {
  NewsHeader,
  NewsFeed,
  MOCK_NEWS_FEED,
  NewsFeedItem,
} from './news-lab';

function MyComponent() {
  const [selectedNews, setSelectedNews] = useState<NewsFeedItem>(MOCK_NEWS_FEED[0]);
  
  return (
    <div>
      <NewsHeader
        marketMood={{ mood: '亢奋', index: 72.4, trend: 'up' }}
        activeFilter="ALL"
        onFilterChange={(filter) => console.log(filter)}
      />
      <NewsFeed 
        news={MOCK_NEWS_FEED}
        selectedNews={selectedNews}
        onSelectNews={setSelectedNews}
      />
    </div>
  );
}
```

## Extension Guide

### 添加新的新闻源
1. 在 `mockData.ts` 的 `MOCK_NEWS_FEED` 中添加新闻项
2. 确保符合 `NewsFeedItem` 类型定义

### 添加新的量化信号
1. 在 `types.ts` 中扩展 `QuantSignal` 类型
2. 在 `QuantSignals.tsx` 中更新渲染逻辑
3. 在 `mockData.ts` 中添加测试数据

### 自定义Section
使用 `Section` 组件快速创建新的面板：

```tsx
import { Section } from './news-lab';
import { Icons } from '../Icons';

<Section title="新功能" icon={Icons.Star} extra={<button>操作</button>}>
  {/* 自定义内容 */}
</Section>
```

### 自定义情绪仪表盘
```tsx
import { SentimentGauge } from './news-lab';

<SentimentGauge value={75} label="Confidence" color="#2BC4A8" />
```

## Benefits

✅ **模块化** - 每个组件独立，职责单一  
✅ **可扩展** - 通过 Props 灵活配置  
✅ **类型安全** - TypeScript 完整类型定义  
✅ **可复用** - Section 和 SentimentGauge 可在其他页面复用  
✅ **易测试** - 组件独立，便于单元测试  
✅ **易维护** - 代码结构清晰，易于理解
