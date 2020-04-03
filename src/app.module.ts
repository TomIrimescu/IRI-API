import {
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';
import {
  IriStoreModule
} from './iri-store/iri-store.module';
import {
  AuthModule
} from './auth/auth.module';
import {
  MongooseModule
} from '@nestjs/mongoose';
import {
  GetUserMiddleware
} from './middleware/get-user.middleware';
import {
  AppService
} from './app.service';
import {
  AppController
} from './app.controller';
import {
  IriStoreController
} from './iri-store/iri-store.controller';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }),
    IriStoreModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): void {

    consumer
      .apply(GetUserMiddleware)
      .forRoutes(
        IriStoreController
      );

  }

}
