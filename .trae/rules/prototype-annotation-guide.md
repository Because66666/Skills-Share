---
alwaysApply: false
description: 编写页面的标注点和业务规则时
---
# 原型演示标注规范

## 1. 核心组件
使用 `BusinessRuleAnnotation` 包裹业务区域。

```tsx
import { BusinessRuleAnnotation } from '@/components/molecules/BusinessRuleAnnotation';
```

### 属性清单
| 属性 | 类型 | 说明 |
|:---|:---|:---|
| `step` | `string` | 序号 (如 "01")，系统自动补零 |
| `title` | `string` | 简练标题 |
| `content` | `Node` | 规则详情，推荐 `<ul>` 列表 |
| `inset` | `bool` | **关键**：边缘组件设为 `true` 防止溢出 |
| `position` | `enum` | 默认 `top-right`，可选 `top-left` 等 |

## 2. 定位策略
*   **常规**: 默认 `position="top-right"`，标注悬浮在组件**外侧**。
*   **边缘 (Inset)**: 对于全宽卡片、右侧搜索栏等贴边组件，必须设置 `inset={true}`，使标注显示在组件**内侧**，防止溢出屏幕。

## 3. 文案与编号
*   **业务规则**: 侧重数据来源、计算逻辑（客观专业）。
*   **交互规则**: 侧重操作反馈（动作 + 结果）。
*   **编号**: 遵循视觉流（上→下，左→右），从 "01" 开始。

## 4. 代码范例
```tsx
<BusinessRuleAnnotation
  step="01"
  title="说明"
  content={
    <ul className="list-disc pl-4 space-y-1">
      <li>来源：XXX</li>
      <li>更新：XXX</li>
    </ul>
  }
  inset={true} // 边缘组件开启内嵌模式
>
  <StatCard />
</BusinessRuleAnnotation>
```