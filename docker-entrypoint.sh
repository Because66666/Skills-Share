#!/bin/sh

# 启动后端
cd /app/server
node dist/src/main &

# 等待后端启动
sleep 3

# 启动前端 (使用 serve 提供静态文件)
serve -s -l 5173 /app/dist

# 等待所有后台进程
wait
