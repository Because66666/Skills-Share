## 文件命名规范

### 前端开发文件命名规范
- 文件命名规则：
  - 组件文件：PascalCase（如：BankruptcyInfoCard.tsx）
  - 页面文件：PascalCase（如：ClaimDeclarationPage.tsx）
  - 工具函数文件：camelCase（如：apiService.ts）
  - 状态管理文件：kebab-case（如：claim-store.ts）
  - 路由配置文件：kebab-case（如：index.tsx）
- 使用ESLint和Prettier进行代码检查和格式化
- 组件设计遵循单一职责原则

### 后端开发文件命名规范
- 文件命名规则：
  - 控制器文件：kebab-case + .controller.ts（如：claim.controller.ts）
  - 服务文件：kebab-case + .service.ts（如：claim.service.ts）
  - 模块文件：kebab-case + .module.ts（如：claim.module.ts）
  - DTO文件：kebab-case + .dto.ts（如：create-claim.dto.ts）
  - 实体文件：在Prisma schema中定义
- 使用ESLint和Prettier进行代码检查和格式化