# 生产环境
FROM node:20-alpine

WORKDIR /app

# 复制所有文件
COPY . .

# 安装后端依赖
WORKDIR /app/server
RUN npm install

# 生成 Prisma Client
RUN npx prisma generate

# 构建后端
RUN npm run build

# 安装前端依赖
WORKDIR /app
RUN npm install

# 构建前端
RUN npm run build

# 暴露端口
EXPOSE 3000 5173

# 启动脚本
WORKDIR /app
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]
