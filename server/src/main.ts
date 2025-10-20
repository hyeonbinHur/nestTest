import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // API 전역 prefix 설정
  app.setGlobalPrefix('api');

  // CORS 설정 - 프론트엔드에서 접근 가능하도록
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Vite 개발 서버
    credentials: true,
  });

  // 정적 파일 서빙
  app.use(express.static(join(__dirname, 'client')));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // SPA 폴백 - 모든 API가 아닌 요청은 index.html로
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(join(__dirname, 'client', 'index.html'));
    } else {
      next();
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
