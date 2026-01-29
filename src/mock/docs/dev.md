# 开发文档

本系统采用前后端分离架构，前端基于 React 技术栈，后端基于 NestJS。

## 技术栈

*   **前端框架**: React 18 + TypeScript
*   **构建工具**: Vite
*   **样式方案**: Tailwind CSS
*   **UI组件库**: Radix UI + 自研组件
*   **图标库**: Lucide React
*   **图表库**: Recharts

## 目录结构

```
src/
  ├── components/       # 通用组件
  ├── pages/            # 页面组件
  ├── layouts/          # 布局组件
  ├── mock/             # 模拟数据
  ├── utils/            # 工具函数
  └── App.tsx           # 根组件
```

## 组件开发规范

1.  **原子设计**：遵循 Atomic Design 原则，将组件分为 Atoms, Molecules, Organisms。
2.  **类型安全**：必须定义清晰的 TypeScript 接口。
3.  **样式隔离**：优先使用 Tailwind Utility Classes，复杂样式可抽取复用。
