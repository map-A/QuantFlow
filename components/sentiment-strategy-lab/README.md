# Sentiment Strategy Lab - Modular Architecture

## Overview
情绪策略实验室已重构为模块化结构，便于扩展和维护。

## Directory Structure

```
sentiment-strategy-lab/
├── index.ts                  # 导出所有组件和类型
├── types.ts                  # TypeScript 类型定义
├── mockData.ts              # 模拟数据
├── Panel.tsx                # 通用面板容器组件
├── SentimentHeader.tsx      # 顶部情绪控制面板
├── FilterRules.tsx          # 过滤规则组件
├── StrategyGates.tsx        # 策略准入控制组件
├── WeightMatrix.tsx         # 因子权重矩阵组件
├── BacktestPreview.tsx      # 回测预览组件
├── StressTest.tsx           # 压力测试组件
└── StatusBar.tsx            # 底部状态栏组件
```

## Components

### 1. SentimentHeader
顶部情绪控制面板，显示实时情绪分数、趋势图和全局开关。

**Props:**
- `sentimentScore: number` - 情绪分数
- `activeRegime: string` - 当前情绪状态
- `trendData: BacktestDataPoint[]` - 趋势数据
- `globalEnable: boolean` - 全局开关状态
- `onToggleGlobal: () => void` - 切换全局开关回调
- `onApplySettings: () => void` - 应用设置回调

### 2. FilterRules
情绪过滤规则管理组件。

**Props:**
- `rules: Rule[]` - 规则列表
- `onAddRule?: () => void` - 添加规则回调
- `onToggleRule?: (id: string) => void` - 切换规则回调
- `onEditRule?: (id: string) => void` - 编辑规则回调

### 3. StrategyGates
策略准入控制组件，管理不同策略的启用状态。

**Props:**
- `gates: StrategyGate[]` - 策略门控列表
- `onToggleGate?: (id: string) => void` - 切换门控回调

### 4. WeightMatrix
因子权重动态调节矩阵，支持不同情绪状态下的权重配置。

**Props:**
- `factors: FactorWeight[]` - 因子权重列表
- `onWeightChange?: (id: string, regime: 'low' | 'neutral' | 'high', value: number) => void` - 权重变更回调
- `onAcceptAISuggestion?: () => void` - 接受AI建议回调

### 5. BacktestPreview
回测预览组件，展示不同情绪分区下的策略表现。

**Props:**
- `data: BacktestDataPoint[]` - 回测数据
- `performanceMetrics?: { lowSentiment: number; neutral: number; highSentiment: number }` - 分区表现指标
- `overfittingRisk?: number` - 过拟合风险

### 6. StressTest
压力测试模拟组件。

**Props:**
- `sampleSize?: number` - 样本量
- `progress?: number` - 进度百分比
- `onRunTest?: () => void` - 运行测试回调

### 7. StatusBar
底部状态栏，显示规则版本、运行状态和操作按钮。

**Props:**
- `ruleVersion?: string` - 规则版本
- `statusMessage?: string` - 状态信息
- `sampleSize?: number` - 样本数量
- `onDownloadReport?: () => void` - 下载报告回调

## Types

### Rule
```typescript
interface Rule {
  id: string;
  variable: string;
  operator: string;
  value: string;
  action: string;
  enabled: boolean;
}
```

### FactorWeight
```typescript
interface FactorWeight {
  id: string;
  name: string;
  base: number;
  low: number;
  neutral: number;
  high: number;
}
```

### StrategyGate
```typescript
interface StrategyGate {
  id: string;
  name: string;
  condition: string;
  status: 'ACTIVE' | 'INACTIVE';
}
```

### BacktestDataPoint
```typescript
interface BacktestDataPoint {
  date: string;
  strategy: number;
  benchmark: number;
  sentiment: number;
  regimeColor: string;
}
```

## Usage Example

```tsx
import {
  SentimentHeader,
  FilterRules,
  WeightMatrix,
  MOCK_RULES,
  MOCK_FACTOR_WEIGHTS,
} from './sentiment-strategy-lab';

function MyComponent() {
  const [rules, setRules] = useState(MOCK_RULES);
  
  return (
    <div>
      <SentimentHeader
        sentimentScore={72.4}
        activeRegime="活跃"
        onApplySettings={() => console.log('Applied')}
      />
      <FilterRules 
        rules={rules}
        onAddRule={() => console.log('Add rule')}
      />
    </div>
  );
}
```

## Extension Guide

### 添加新规则类型
1. 在 `types.ts` 中扩展 `Rule` 接口
2. 在 `FilterRules.tsx` 中添加相应的渲染逻辑
3. 更新 `mockData.ts` 中的示例数据

### 添加新因子
1. 在 `mockData.ts` 的 `MOCK_FACTOR_WEIGHTS` 中添加新因子
2. 权重矩阵会自动渲染新因子

### 自定义面板
使用 `Panel` 组件快速创建新的面板：

```tsx
import { Panel } from './sentiment-strategy-lab';
import { Icons } from '../Icons';

<Panel title="新功能" icon={Icons.Star}>
  {/* 自定义内容 */}
</Panel>
```

## Benefits

✅ **模块化** - 每个组件独立，易于维护  
✅ **可扩展** - 通过 Props 灵活配置  
✅ **类型安全** - TypeScript 完整类型定义  
✅ **可复用** - 组件可在其他页面复用  
✅ **易测试** - 组件独立，便于单元测试
