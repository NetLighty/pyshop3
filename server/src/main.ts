import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const HOST = process.env.HOST || '0.0.0.0';
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:9000',
      'http://192.168.1.102:9000',
      'https://',
      /* CLIENT_URL, */
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000, HOST, () =>
    console.log(`port: ${process.env.PORT}`),
  );
}

start();
