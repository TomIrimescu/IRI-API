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
  IriStoreController
} from './iri-store/iri-store.controller';
import {
  AppController
} from './app.controller';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
      ProductsModule,
      GraphQLModule.forRoot({
        autoSchemaFile: 'schema.gql',
      }),
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
