# 前端通用组件项目

基于 React 18 + TypeScript + Vite + Tailwind CSS 的前端通用组件项目，提供基础平台功能和文档中心功能。

## 🚀 在线访问

**CloudBase 部署地址**: https://ai-native-6gjx1a8d8074b047-1252095952.tcloudbaseapp.com/

**Tencent Lighthouse 部署地址**: http://49.232.127.105

**部署信息**:
- **CloudBase 部署**:
  - 部署平台: 腾讯云 CloudBase 静态托管
  - 环境ID: ai-native-6gjx1a8d8074b047
  - 地域: 华东 (上海)
  - 部署时间: 2026-01-26

- **Tencent Lighthouse 部署**:
  - 服务器 IP: 49.232.127.105
  - 实例 ID: lhins-6d2mx3e6
  - 实例名称: Ubuntu22.04-Docker26-59qi
  - 地域: 华北 (北京)
  - 部署时间: 2026-01-29
  - Docker 镜像: allskills_20260129085550-app
  - 状态: ✅ 前后端服务均正常运行
  - 前端: http://49.232.127.105 (端口 80)
  - 后端 API: http://49.232.127.105:3000 (端口 3000)
  - 修复记录:
    - SkillReview 页面添加数据类型检查
    - 修复后端 uuid ESM 兼容性问题（改用 Node.js 内置 crypto.randomUUID）

- **项目文档**:
  - [项目规则](./.trae/rules/project_rules.md)
  - [文件命名规范](./.trae/rules/file-naming-convention.md)
  - [技术栈说明](./.trae/rules/tech-stack.md)
  - [原型演示标注规范](./.trae/rules/prototype-annotation-guide.md)

## 项目架构

### 技术栈
#### 前端
- **核心框架**: React 18+
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **路由管理**: React Router v6
- **状态管理**: React Context API
- **图标库**: Lucide React
- **图表库**: Recharts

#### 后端
- **核心框架**: NestJS
- **ORM**: Prisma
- **数据库**: SQLite (支持平滑迁移至 PostgreSQL/MySQL)
- **文件服务**: Multer + 静态资源托管
- **文档**: Swagger (集成中)

## 功能特性

- **全栈架构**: 采用 NestJS + Prisma + SQLite 构建稳健的后端服务，提供 RESTful API 支持。
- **现代化前端**: 采用 React 18, TypeScript, Vite, Tailwind CSS 等最新技术构建。
- **组件化架构**: 基于原子设计理论 (Atomic Design) 构建的通用组件库。
- **响应式布局**: 完美适配桌面端和移动端设备。
- **主题系统**: 支持 **浅色/深色/跟随系统** 三种外观模式，自动持久化用户偏好。
- **原型演示系统**: 内置交互式业务规则标注功能，可在侧边栏用户卡片中开启“演示模式”，方便进行产品原型展示与业务逻辑讲解。
- **丰富的图表**: 集成 Recharts 实现多种数据可视化图表。
- **数据持久化**: Skills 核心数据已完全迁移至数据库，支持真实的增删改查与搜索过滤。
- **智能编辑**: Skill 编辑器支持 **随机外观生成** 与 **内容自动打标**，大幅提升创作效率。
- **审核机制**: 完善的 Skill 内容审核流程，确保平台内容的质量与安全。
- **安全认证**: 完整的 JWT 认证流程，支持密码哈希存储 (Bcrypt) 与 Token 持久化。
- **完善的模拟数据**: 提供丰富的用户、角色、组织架构等模拟数据（逐步迁移中），以及 **高质量的 Skill 示例**，便于开发和测试。
- **业务模块**: 包含仪表盘、系统设置、文档中心、Skills 分享站等核心业务功能。

## 核心业务模块详情

### 1. 文档与帮助中心
- **文档中心**: 提供系统操作指南、开发文档、API文档等全方位文档支持。
- **帮助中心**: 全新升级的自助服务中心，采用搜索优先设计，提供角色化指引、视频教程、热门问题解答及文档快捷导航。

## 静态数据生成

项目使用 Python 脚本从本地 Markdown 文件生成静态 JSON 数据供前端使用。

**使用方法**:
```bash
# 在项目根目录下运行
python scripts/generate_skills_json.py
```
该脚本会扫描 `skills` 目录下的所有子目录，读取 `SKILL.md` 的 Frontmatter 信息，并生成 `public/skills.json` 文件。

## 目录结构

```
前端通用项目/
├── .trae/                # Trae IDE配置
├── dist/                 # 构建输出目录
├── docs/                 # 项目文档
├── server/               # 后端服务目录 (NestJS)
│   ├── prisma/           # Prisma 数据库模型与配置
│   ├── src/              # 后端源代码
│   │   ├── modules/      # 业务模块 (Auth, Users, Roles, Tenants)
│   │   ├── app.module.ts # 根模块
│   │   └── main.ts       # 入口文件
│   └── test/             # 测试文件
├── src/                  # 前端源代码目录

│   ├── components/       # 通用UI组件
│   │   ├── atoms/        # 原子组件 (Card)
│   │   └── organisms/    # 业务组件 (Sidebar, Widgets...)
│   ├── layouts/          # 页面布局组件 (DashboardLayout)
│   ├── mock/             # 模拟数据
│   ├── pages/            # 页面视图
│   ├── utils/            # 工具函数
│   ├── App.tsx           # 根组件
│   ├── main.tsx          # 入口文件
│   └── vite-env.d.ts     # Vite环境类型声明
├── CHANGELOG.md          # 项目变更日志
├── README.md             # 项目说明文档
├── package.json          # 项目配置和依赖
├── tailwind.config.js    # Tailwind CSS配置
├── tsconfig.json         # TypeScript配置
└── vite.config.ts        # Vite构建配置
```

## 开发规范

### 前端开发规范
- 使用TypeScript
- 组件命名使用PascalCase
- 文件命名规则：
  - 组件文件：PascalCase（如：BankruptcyInfoCard.tsx）
  - 页面文件：PascalCase（如：ClaimDeclarationPage.tsx）
  - 工具函数文件：camelCase（如：apiService.ts）
  - 状态管理文件：kebab-case（如：claim-store.ts）
  - 路由配置文件：kebab-case（如：index.tsx）
- 使用ESLint和Prettier进行代码检查和格式化
- 组件设计遵循单一职责原则

### 后端开发规范
- 使用TypeScript
- 遵循NestJS最佳实践
- 控制器使用RESTful API设计
- 服务层封装业务逻辑
- 文件命名规则：
  - 控制器文件：kebab-case + .controller.ts（如：claim.controller.ts）
  - 服务文件：kebab-case + .service.ts（如：claim.service.ts）
  - 模块文件：kebab-case + .module.ts（如：claim.module.ts）
  - DTO文件：kebab-case + .dto.ts（如：create-claim.dto.ts）
  - 实体文件：在Prisma schema中定义
- 使用ESLint和Prettier进行代码检查和格式化


## 已实现组件清单

### 1. 原子层 (Atoms)
- `Button`: 通用按钮
- `Input`: 输入框
- `InputNumber`: 数字输入框
- `TextArea`: 文本域
- `Checkbox / Radio / Switch`: 表单控件
- `Typography`: 文本排版
- `Avatar`: 头像
- `Badge`: 徽标
- `Tag`: 标签
- `Spin`: 加载中
- `Divider`: 分割线
- `Skeleton`: 骨架屏
- `Card`: 基础卡片容器
- `Icon`: 图标封装

### 2. 分子层 (Molecules)
- `Modal`: 对话框
- `Drawer`: 抽屉
- `Select`: 下拉选择器 (支持多选)
- `Cascader`: 级联选择器
- `TreeSelect`: 树形选择器
- `Transfer`: 穿梭框
- `Tabs`: 标签页
- `Breadcrumb`: 面包屑
- `Pagination`: 分页
- `Alert`: 提示信息
- `Menu`: 导航菜单
- `Dropdown`: 下拉菜单
- `Steps`: 步骤条
- `DatePicker`: 日期选择器
- `DateRangePicker`: 日期范围选择器
- `Form`: 表单容器
- `Upload`: 文件上传
- `Result`: 结果页
- `Progress`: 进度条
- `Slider`: 滑动输入条
- `Rate`: 评分
- `Notification`: 通知提醒
- `Popconfirm`: 气泡确认框

### 3. 布局层 (Layouts)
- `Grid`: 栅格系统 (Row, Col)
- `Space`: 间距组件
- `Layout`: 通用布局容器
- `DashboardLayout`: Dashboard 专用布局
- `PageContainer`: 页面容器
- `Collapse`: 折叠面板

### 4. 数据展示层 (Data Display)
- `Table`: 基础表格
- `Statistic`: 统计数值
- `Descriptions`: 描述列表
- `Tooltip`: 文字提示
- `Popover`: 气泡卡片
- `Empty`: 空状态
- `Timeline`: 时间轴
- `Tree`: 树形控件
- `Image`: 图片预览
- `Carousel`: 走马灯
- `Tour`: 漫游引导
- `Watermark`: 水印

### 5. 组织层 (Organisms)
- `Sidebar`: 全局侧边菜单
- `SmartTable`: 智能表格 (集成搜索、分页、数据请求)
- `SmartForm`: 智能表单
- `KeyMetricCard`: 关键指标卡片 (通用)
- `LegalMetricCard`: 法务关键指标卡片 (新)
- `RiskWarningBanner`: 风险预警 Banner
- `ModuleOverviewCard`: 业务模块概览
- `TodoListWidget`: 待办事项部件
- `Charts`: 业务图表组件 (CaseTrend, RiskRadar, TypeDistribution, ContractStatus)

### 7. 页面 (Pages)
- `Dashboard`: 仪表盘主页 (`src/pages/Dashboard/index.tsx`)
- `Tenants`: 系统设置模块
  - `TenantList`: 租户列表 (`src/pages/Tenants/TenantList.tsx`)
  - `Users`: 用户管理 (`src/pages/Tenants/Users/index.tsx`)
  - `Roles`: 角色管理 (`src/pages/Tenants/Roles/index.tsx`)
  - `Orgs`: 组织管理 (`src/pages/Tenants/Orgs/index.tsx`)
- `Claims`: 债权申报模块
  - `Overview`: 申报概览 (`src/pages/Claims/Overview/index.tsx`)
  - `Debtors`: 债务人管理 (`src/pages/Claims/Debtors/index.tsx`)
  - `Notices`: 公开公告 (`src/pages/Claims/Notices/index.tsx`)
  - `Monitoring`: 破产监控 (`src/pages/Claims/Monitoring/index.tsx`)
  - `Ledger`: 申报台账 (`src/pages/Claims/Ledger/index.tsx`)
  - `Recoveries`: 回收记录 (`src/pages/Claims/Recoveries/index.tsx`)
- `ContractTemplates`: 合同模板模块
  - `Dashboard`: 模板概览 (`src/pages/ContractTemplates/Dashboard/index.tsx`)
  - `TemplateList`: 模板列表 (`src/pages/ContractTemplates/TemplateList/index.tsx`)
  - `CategoryManager`: 分类管理 (`src/pages/ContractTemplates/CategoryManager/index.tsx`)
  - `Editor`: 模板编辑器 (`src/pages/ContractTemplates/Editor/index.tsx`)
  - `Preview`: 模板预览 (`src/pages/ContractTemplates/Preview/index.tsx`)
  - `Reviews`: 模板审核 (`src/pages/ContractTemplates/Reviews/index.tsx`)

## 示例页面

- **Skills Home**: `/home` (默认路由) - Skills 分享站首页。
- **Skills Detail**: `/skill/:id` - Skill 详情页。
- **Skills Guide**: `/guide` - Skills 使用指南。
- **Skills FAQ**: `/faq` - 常见问题解答。
- **Dashboard**: `/dashboard` - OrangeFarm Dashboard 复刻页面。
- **Component Gallery**: `/gallery` - 通用组件展示与开发调试中心。

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 开发规范

- **组件开发**: 遵循原子设计原则，放置于 `src/components`。
- **样式开发**: 优先使用 Tailwind Utility Classes。
- **文件命名**: 组件文件使用 PascalCase。

## 相关文档

- [组件建设方案](./docs/组件建设方案.md)
- [组件示例页面建设方案](./docs/组件示例页面建设方案.md)
- [案件纠纷管理功能清单](./docs/案件纠纷管理/功能清单.md)
- [物业费催收功能清单](./docs/物业费催收/功能清单.md)
- [债权申报模块功能清单](./docs/债权申报模块/功能清单.md)
- [开发日志](./CHANGELOG.md)
