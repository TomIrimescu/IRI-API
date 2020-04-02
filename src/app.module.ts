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
  MONGO_CONNECTION
} from './constants';
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

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }),
    IriStoreModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(GetUserMiddleware).forRoutes(IriStoreController);
  }  
}
