# 构建阶段
FROM node:20-slim AS builder

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci

# 复制源代码
COPY . .

# 生成 Prisma Client
RUN npx prisma generate

# 构建 NestJS 应用
RUN npm run build

# 生产阶段
FROM node:20-slim

WORKDIR /app

# 安装必要的系统依赖
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 复制生产依赖和构建产物
COPY package*.json ./
RUN npm ci --production

# 复制 Prisma schema 和生成的 Client
COPY prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# 复制构建产物
COPY --from=builder /app/dist ./dist

# 创建 uploads 目录
RUN mkdir -p uploads/skills

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "dist/main"]
