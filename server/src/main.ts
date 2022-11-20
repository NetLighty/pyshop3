import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:9000', 'http://192.168.1.102:9000/'],
    credentials: true,
  });
  await app.listen(PORT, () => console.log(`port: ${PORT}`));
}

start();
