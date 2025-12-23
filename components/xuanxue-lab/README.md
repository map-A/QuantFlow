# Xuanxue Lab (国学视角实验室) - Modular Architecture

## Overview
国学视角实验室已重构为模块化结构，便于扩展和维护。该模块将传统国学概念（五行、八卦）与量化金融分析相结合，提供独特的文化视角。

## Directory Structure

```
xuanxue-lab/
├── index.ts                    # 导出所有组件和类型
├── types.ts                    # TypeScript 类型定义
├── mockData.ts                # 模拟数据
├── XuanxueHeader.tsx          # 顶部导航栏
├── FiveElementsRadar.tsx      # 五行雷达图
├── IndustryMappingTable.tsx   # 行业五行映射表
├── HexagramDisplay.tsx        # 卦象显示组件
├── DisclaimerCard.tsx         # 免责声明卡片
├── SentimentCompareChart.tsx  # 情绪对比图表
├── AICulturalReport.tsx       # AI文化诊断报告
└── XuanxueFooter.tsx          # 底部状态栏
```

## Components

### 1. XuanxueHeader
顶部导航栏，显示文化日期和透镜开关。

**Props:**
- `culturalDate: CulturalDate` - 文化日期对象（年月日节气）
- `referenceStrength?: 'LOW' | 'MEDIUM' | 'HIGH'` - 参考强度
- `lensEnabled: boolean` - 文化透镜是否启用
- `onToggleLens: () => void` - 切换透镜回调

### 2. FiveElementsRadar
五行平衡雷达图，显示不同属性的市场能量分布。

**Props:**
- `data: FiveElement[]` - 五行数据
- `season: string` - 当前节气
- `interpretation?: string` - 解读文本

### 3. IndustryMappingTable
行业五行映射表，展示行业与五行元素的对应关系。

**Props:**
- `mappings: IndustryMapping[]` - 映射列表

### 4. HexagramDisplay
卦象显示组件，以视觉化方式展示当前市场卦象。

**Props:**
- `hexagram: HexagramData` - 卦象数据（名称、符号、标签等）

### 5. DisclaimerCard
免责声明卡片，提醒用户文化视角的非预测性。

**Props:**
- `message?: string` - 免责声明文本

### 6. SentimentCompareChart
文化视角与量化情绪的对比图表。

**Props:**
- `data: SentimentCompareData[]` - 对比数据
- `alignment?: 'ALIGN' | 'DIVERGE' | 'NEUTRAL'` - 一致性状态
- `interpretation?: string` - 解读文本

### 7. AICulturalReport
AI跨界诊断报告，结合量化和文化视角的综合分析。

**Props:**
- `quantConclusion?: string` - 量化结论
- `culturalInterpretation?: string` - 文化解读
- `culturalAdvice?: string` - 文化建议
- `onGenerateReport?: () => void` - 生成报告回调

### 8. XuanxueFooter
底部状态栏，显示引擎名称和免责声明。

**Props:**
- `engineName?: string` - 引擎名称
- `disclaimerText?: string` - 免责文本

## Types

### FiveElement
```typescript
interface FiveElement {
  subject: string;       // 元素名称（如 "木 (Wood)"）
  A: number;            // 当前值 (0-100)
  fullMark: number;     // 满分值
  note: string;         // 说明文本
}
```

### HexagramData
```typescript
interface HexagramData {
  name: string;         // 卦名
  symbol: boolean[];    // 卦象符号（true=阳爻，false=阴爻）
  tags: string[];       // 标签
  energyLevel: number;  // 能量等级 (0-100)
  status: string;       // 状态描述
}
```

### CulturalDate
```typescript
interface CulturalDate {
  year: string;    // 年份（如 "甲辰年"）
  month: string;   // 月份（如 "丙寅月"）
  day: string;     // 日期（如 "壬申日"）
  season: string;  // 节气（如 "立春"）
}
```

### SentimentCompareData
```typescript
interface SentimentCompareData {
  time: string;      // 时间点
  quant: number;     // 量化情绪值
  cultural: number;  // 文化隐喻值
}
```

### IndustryMapping
```typescript
interface IndustryMapping {
  name: string;     // 行业名称
  element: string;  // 对应五行
  style: string;    // CSS样式类
}
```

## Usage Example

```tsx
import {
  XuanxueHeader,
  FiveElementsRadar,
  MOCK_FIVE_ELEMENTS,
  MOCK_CULTURAL_DATE,
} from './xuanxue-lab';

function MyComponent() {
  const [lensEnabled, setLensEnabled] = useState(true);
  
  return (
    <div>
      <XuanxueHeader
        culturalDate={MOCK_CULTURAL_DATE}
        referenceStrength="MEDIUM"
        lensEnabled={lensEnabled}
        onToggleLens={() => setLensEnabled(!lensEnabled)}
      />
      <FiveElementsRadar
        data={MOCK_FIVE_ELEMENTS}
        season="立春"
      />
    </div>
  );
}
```

## Extension Guide

### 添加新的五行元素
1. 在 `mockData.ts` 的 `MOCK_FIVE_ELEMENTS` 中添加新元素
2. 确保符合 `FiveElement` 类型定义

### 自定义卦象
1. 在 `mockData.ts` 中创建新的 `HexagramData` 对象
2. `symbol` 数组必须包含6个布尔值（从下到上）
3. 传递给 `HexagramDisplay` 组件

### 添加新的行业映射
```tsx
const customMappings: IndustryMapping[] = [
  { name: '新能源', element: '火', style: 'text-success' },
  { name: '生物医药', element: '木', style: 'text-cyan' },
];

<IndustryMappingTable mappings={customMappings} />
```

### 自定义文化解读
```tsx
<AICulturalReport
  quantConclusion="自定义量化结论..."
  culturalInterpretation="自定义文化解读..."
  culturalAdvice="自定义文化建议..."
  onGenerateReport={() => console.log('生成报告')}
/>
```

## Cultural Concepts

### 五行 (Five Elements)
- **木 (Wood)**: 科技、成长行业
- **火 (Fire)**: 能源、情绪相关
- **土 (Earth)**: 基建、稳健资产
- **金 (Metal)**: 金融、资源
- **水 (Water)**: 贸易、物流

### 八卦 (Bagua/Hexagram)
- 使用六爻卦象表示市场趋势
- 阳爻（true）：实线
- 阴爻（false）：断线
- 从下到上读取

### 天干地支 (Celestial Stems and Earthly Branches)
- 用于表示文化日期
- 结合节气（24 Solar Terms）分析市场周期

## Benefits

✅ **文化创新** - 将传统国学与现代金融结合  
✅ **模块化** - 每个组件独立，职责单一  
✅ **可扩展** - 通过 Props 灵活配置  
✅ **类型安全** - TypeScript 完整类型定义  
✅ **可视化** - 独特的卦象和五行雷达图展示  
✅ **易维护** - 代码结构清晰

## Disclaimer

⚠️ **重要提示**: 本模块纯属文化研究和创新实验，所有基于五行、八卦的分析仅供参考，不构成任何投资建议。投资有风险，入市需谨慎。
