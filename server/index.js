const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { AppModule } = require('./dist/app.module');
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');
const express = require('express');

const server = express();
let cachedServer = null;

async function bootstrap() {
  if (cachedServer) {
    return cachedServer;
  }
  
  const adapter = new ExpressAdapter(server);
  const app = await NestFactory.create(AppModule, adapter);
  
  // 允许跨域
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle('AllSkills API')
    .setDescription('The AllSkills API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();
  cachedServer = server;
  return server;
}

// CloudBase 云函数入口
exports.main = async (event, context) => {
  await bootstrap();
  return server(event, context);
};

// 本地测试支持
if (require.main === module) {
  bootstrap().then(() => {
    server.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  });
}
