import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express'; //와 이거 없으면 Swagger 안나옴


/**
 * 기존 commonJS에서는 require() 식으로
 */
import passport from 'passport'; // commonjs 와 es module 차이 commonjs에는 default가 없음
import cookieParser from 'cookie-parser';
import session from 'express-session';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(passport.initialize());
  app.use(passport.session());
  
  const config = new DocumentBuilder()
    .setTitle('chat-app API')
    .setDescription('Sleact 개발을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();

  const port = 3095
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'mslee',
      cookie: {
        httpOnly: true,
      },
    }),
  );

  // passport 사용할거면 사용해줘야 하네 - 이거 없으면 passport에서 serializer할 수 없음
  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(port);
  console.log(`Listen on PORT ${port}`)

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

