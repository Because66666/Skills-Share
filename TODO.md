# 需求点清单 & TODO List

# 基础设施与架构 (Infrastructure)

## 静态化重构 (Static Export)
### 已完成
- [x] 创建数据生成脚本 (Python)
- [x] 移除前端后端 API 依赖
- [x] 重构 Service 层适配静态数据
- [x] 验证静态导出构建

## 后端开发 (Backend)
### 已完成
- [x] NestJS 基础框架搭建
- [x] Prisma ORM 集成 (SQLite)
- [x] JWT 认证模块实现
- [x] 统一异常处理与响应拦截
- [x] 跨域配置 (CORS) 与 前端代理 (Vite Proxy)

## 技术栈

### 已完成
- [x] 修复 Version 1.0.59 构建错误 (AnnotationProvider tag & Imports)
- [x] 修复 Version 1.0.54 构建错误 (Unused imports/variables)
- [x] React 19.2.0 (Latest)
- [x] Vite 7.2.4
- [x] Tailwind CSS 4.1.18
- [x] 路由库 (React Router DOM)
- [x] 状态管理 (Zustand + React Context)
- [x] 图表库 (Recharts)
- [x] UI组件库 (Radix UI + Custom Components)
- [x] 原型演示模式 (Annotation System)
  - [x] 解决边缘遮挡问题 (Inset Positioning)
  - [x] 状态持久化 (LocalStorage)
  - [x] 制定标注规范文档 (Prototype Annotation Guide)
  - [x] 导航增强 (上一个/下一个)

### 未完成
- [ ] 路由库迁移 (React Router DOM -> wouter) [可选]
- [ ] 单元测试环境搭建 (Vitest + React Testing Library)
- [ ] E2E测试环境搭建 (Playwright/Cypress)

# Skills 分享站 (Skills Share)

## 首页 (Home)
### 已完成
- [x] 首页布局 (Hero Section + Filter + Grid)
- [x] Skill 展示卡片 (SkillCard)
- [x] 模拟数据源 (Mock Data) -> **已升级为真实 API 数据**
- [x] 搜索与标签筛选功能
  - [x] 优化选中标签的可读性 (Light Orange Style)
- [x] 预览与下载交互 (Toast模拟)
- [x] 路由配置 (默认跳转 /home)
- [x] 丰富 Skills 内容库 (新增 Code Format, PDF Extractor, Sentiment Monitor, Security Scan)

## 详情页 (Detail)
### 已完成
- [x] 详情页布局 (Sidebar + Content)
- [x] Markdown 内容渲染
- [x] 路由参数解析与数据获取 -> **已升级为真实 API 数据**
- [x] 评论功能 (发布与列表展示)
- [x] 评分功能 (交互式打分与统计)

## 编辑与管理 (Editor & Management)
### 已完成
- [x] Skill 创建/编辑页面 (SkillEditor)
- [x] Markdown 实时预览
- [x] 标签/图标/颜色自定义
- [x] 权限控制 (JWT 认证)
- [x] Skill 归属权校验 (仅作者可编辑/删除)
- [x] 个人中心展示 "我发布的 Skills"
- [x] Skill 审核系统
  - [x] 状态管理 (Pending/Approved/Rejected)
  - [x] 管理员审核后台 (Admin Review Dashboard)
  - [x] 审核状态展示 (Status Banner/Badge)
  - [x] 列表过滤 (仅展示已发布 Skill)
  - [x] 个人中心 "我的 Skills" 状态展示与管理
- [x] Skill 附件上传与下载功能
  - [x] 后端 UploadModule 与 Static Serving
  - [x] Skill-Attachment 数据库关联
  - [x] 前端 FileUploader 组件
  - [x] 详情页附件下载
- [x] 附件管理优化 (v1.2.4)
  - [x] 限制单一附件上传
  - [x] Skill 软删除机制
  - [x] 管理员彻底删除功能
  - [x] 孤儿附件清理页面
- [x] 编辑器体验优化 (v1.2.5)
  - [x] 随机外观生成 (Random Icon/Color)
  - [x] 自动标签提取 (Auto Tagging)
  - [x] 布局重构 (Two Column Layout)
- [x] 细节体验优化 (v1.2.6)
  - [x] 表单 Grid 布局优化
  - [x] 外观开关位置调整
  - [x] 登录 401 问题修复
  - [x] 构建错误修复

## 页面扩展 (Pages)
### 已完成
- [x] 使用指南页面 (Guide) - Agent Skills 教程 (已重写优化)
- [x] 常见问题页面 (FAQ)
- [x] 关于我们页面 (About) - 视觉升级与内容扩充
- [x] 导航菜单优化 (Navbar)
  - [x] 移除顶部导航用户卡片区
  - [x] 功能实现 (Features Implementation)
    - [x] 主题切换 (Light/Dark/System Dropdown)
      - [x] 修复 v4 模式下切换失效问题 (Added @variant dark)
    - [x] 通知中心 (Popover + Mock Data)
    - [x] 全局命令面板 (Command Palette + cmdk)
- [x] 全局 UI 优化
  - [x] 滚动条样式优化 (Thinner & Lighter)
  - [x] About 页面联系方式优化 (Added Feishu, updated others)
  
# 认证授权模块

## 登录功能页面
### 已完成
- [x] 基础账号密码登录交互
- [x] 登录表单校验 (非空验证)
- [x] 记住密码功能 (Checkbox UI & Logic)
- [x] 模拟登录 API 集成 -> **已升级为真实 API 认证**
- [x] Token 持久化存储 (LocalStorage)
- [x] 密码安全哈希 (Bcrypt)
- [x] 登录页 UI 适配 (AuthLayout)

### 未完成
- [x] 验证码功能 (图形/短信)
- [x] 忘记密码/找回密码流程 -> **(Mock UI only)**
- [x] 注册功能流程 -> **已实现真实后端对接**
- [ ] 第三方登录集成 (微信/SSO)

# 系统管理模块 (SystemSettings)

## 用户管理 (Tenants/Users)
### 已完成
- [x] 用户列表展示 (头像、姓名、邮箱、角色、状态) -> **已升级为真实 API**
- [x] 用户搜索 (姓名/邮箱) -> **已升级为真实 API**
- [x] 角色筛选 -> **已升级为真实 API**
- [x] 批量导入按钮 (UI)
- [x] 操作按钮 (重置密码、编辑、删除)
- [x] 用户增删改查 (CRUD) 真实接口对接
- [x] 用户详情页 (Profile) -> **已升级为真实 API**

### 未完成
- [ ] 批量导入/导出功能实现

## 角色管理 (Tenants/Roles)
### 已完成
- [x] 角色列表展示 (名称、编码、描述、绑定人数)
- [x] 角色搜索 & 状态筛选
- [x] 操作按钮 (配置权限、编辑、删除)
- [x] 角色增删改查 (CRUD) 真实接口对接

### 未完成
- [ ] 角色权限配置 (权限树)

## 租户/组织管理 (Tenants/Orgs)
### 已完成
- [x] 组织列表展示
- [x] 租户列表展示
- [x] 租户增删改查 (CRUD) 真实接口对接


### 未完成
- [ ] 组织架构树形维护
- [ ] 租户隔离逻辑完善

# 核心业务模块 - 案件管理 (Cases)

## 案件看板 & 列表
### 已完成
- [x] 案件总览仪表盘 (CasesDashboard)
- [x] 案件台账列表 (CaseLedger) - 筛选、搜索、状态标签
- [x] 案件详情页 (CaseDetail) - 概览、文件、进度
- [x] 风险管理页 (RiskManagement)
- [x] 律所管理页 (LawFirmManagement)

### 未完成
- [ ] 案件导入/导出功能
- [ ] 案件全生命周期流程驱动
- [ ] 律所绩效评估模型

# 核心业务模块 - 债权管理 (Claims)

## 债权全流程
### 已完成
- [x] 债权申报台账操作列固定 (Fixed Right Column)
        - [x] 破产监控、债务人管理、公开公告页面操作列固定
- [x] 债权概览 (ClaimsOverview) - 3阶段KPI、趋势分析、排行榜
- [x] 债权申报台账 (Ledger) - 4步申报向导、OCR识别、利息计算
- [x] 资产监控 (Monitoring) - 自动匹配逻辑
- [x] 债权会议 (Meetings) - 会议卡片、投票表决模拟
- [x] 回款记录 (Recoveries) - 现金/实物回款
- [x] 债权人管理 (Debtors) - ERP对接模拟
- [x] 公告管理 (Notices) - 数据抓取调度配置
- [x] 债权自动计算器 (Interest Calculator)
- [x] 债权人会议投票系统 (Voting System)

### 未完成
- [ ] 资产拍卖对接

# 核心业务模块 - 合同管理 (Contracts)

## 合同全生命周期
### 已完成
- [x] 合同仪表盘 (Dashboard)
- [x] 合同列表 (List)
- [x] 合同起草 (Drafting)
- [x] 合同详情 (Detail)

## 合同模板 (ContractTemplates)
### 已完成
- [x] 模板仪表盘
- [x] 模板库列表
- [x] 模板编辑器 (Editor)
- [x] 模板分类管理
- [x] 模板预览 & 审核

### 未完成
- [ ] 合同在线签署集成 (电子签)
- [ ] 合同履约提醒自动化
- [ ] 模板变量自动填充引擎

# 法律工具模块

## 法规与案例
### 已完成
- [x] 法律法规库 (LawRegulations) - 搜索、详情、管理
- [x] 案例检索 (CaseSearch) - 搜索、详情、对比、数据库
- [x] 案例对比功能 (Compare)

## 法院日历 (CourtCalendar)
### 已完成
- [x] 日历视图 (Month View)
- [x] 列表视图 (List View)
- [x] 统计视图 (Stats View)

# AI 智能服务模块

## AI 应用
### 已完成
- [x] AI 智能问答 (AIQA) - 聊天界面
- [x] AI 合同审查 (AIReview) - 上传、概览、详情、配置

### 未完成
- [ ] AI 模型微调接口对接
- [ ] 审查报告导出 PDF/Word

# 物业费与行政处罚

## 物业费管理 (PropertyFees)
### 已完成
- [x] 物业费仪表盘
- [x] 欠费客户列表
- [x] 催收策略配置
- [x] 执行管理 (律师函、公函、诉讼、外包)
- [x] 结案管理

## 行政处罚 (AdministrativePenalty)
### 已完成
- [x] 处罚仪表盘
- [x] 案件列表 & 详情
- [x] 复议案件管理
- [x] 统计分析

# 知识产权模块 (IntellectualProperty)

## IP 管理
### 已完成
- [x] 资产列表 (Assets) & 详情
- [x] 检索功能 (Search)
- [x] 维权保护 (Protection)
- [x] 使用许可 (Usage)
- [x] 合规管理 (Compliance)
- [x] 统计分析 (Stats)

# 通用功能模块

## 帮助与文档
### 已完成
- [x] 帮助中心 (HelpCenter)
- [x] 文档中心 (DocumentCenter)
  - [x] 独立布局改造 (移除全局侧边栏)
  - [x] 文章详情页优化 (仿飞书设计)
    - [x] 右侧目录导航 (ToC)
    - [x] 底部反馈组件
    - [x] 标题锚点支持
  - [x] 侧边栏“需求文档”链接优化 (当前标签页打开)
  - [x] 移除“需求文档”相关页面 (v1.2.7)
  - [x] 新增项目文档展示 (README/TODO/CHANGELOG)
- [x] 个人中心 (Profile)
- [x] 全局设置 (Settings)

# 组件库 (Gallery)

## UI 组件展示
### 已完成
- [x] Atoms (Avatar, Button, Input, etc.)
- [x] Molecules (Form, Menu, Modal, etc.)
- [x] Organisms (Charts, Widgets, Sidebar)
- [x] Data Display (Table, Tree, etc.)
- [x] Charts (Recharts 封装)
