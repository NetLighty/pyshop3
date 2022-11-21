import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const port = process.env.PORT || 3000;
  const HOST = process.env.HOST || '127.0.0.1';
  const CLIENT_URL = process.env.CLIENT_URL;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      /* 'http://localhost:9000/',
      'http://192.168.1.102:9000/',
      CLIENT_URL, */
      '*',
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT || '3000', HOST, () =>
    console.log(`port: ${process.env.PORT}`),
  );
}

start();
