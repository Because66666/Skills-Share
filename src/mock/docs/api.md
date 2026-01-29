# API调用文档

本系统提供标准的 RESTful API 接口供第三方系统集成。

## 认证方式

所有接口调用需在 Header 中携带 `Authorization` 字段：
`Authorization: Bearer <your_access_token>`

## 接口列表

### 1. 用户相关
*   `GET /api/v1/users/me` - 获取当前用户信息
*   `POST /api/v1/auth/login` - 用户登录

### 2. 案件相关
*   `GET /api/v1/cases` - 获取案件列表
    *   参数: `page`, `limit`, `status`
*   `GET /api/v1/cases/:id` - 获取案件详情
*   `POST /api/v1/cases` - 创建新案件

### 3. 合同相关
*   `POST /api/v1/contracts/review` - 提交合同审查
    *   Body: `{ fileId: string, templateId: string }`

## 错误码说明

*   `200`: 成功
*   `400`: 请求参数错误
*   `401`: 未授权
*   `403`: 禁止访问
*   `500`: 服务器内部错误
