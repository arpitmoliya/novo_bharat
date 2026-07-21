import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS allow-list. Exact origins come from FRONTEND_ORIGIN (comma-separated),
  // but we also allow any *.onrender.com subdomain and localhost so the demo
  // keeps working even when the Render service names differ from the URLs
  // hardcoded in render.yaml (e.g. the web app deployed as `novobharat-6dpd`).
  const allowList = (process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const isAllowedOrigin = (origin: string) =>
    allowList.includes(origin) ||
    /^https:\/\/[a-z0-9-]+\.onrender\.com$/i.test(origin) ||
    /^http:\/\/localhost(:\d+)?$/i.test(origin);
  app.enableCors({
    origin: (origin, callback) => {
      // No Origin header = same-origin, curl, or server-to-server — allow it.
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin not allowed by CORS: ${origin}`), false);
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('NovoBharat Admin API')
    .setDescription('API for managing products, categories and admin users')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3003;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API running on http://localhost:${port}/api (docs at /api/docs)`);
}

bootstrap();
