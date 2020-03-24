import {
  Module
} from '@nestjs/common';
import {
  AppController
} from './app.controller';
import {
  AppService
} from './app.service';
import {
  MongooseModule
} from '@nestjs/mongoose';
import {
  IriStoreModule
} from './iri-store/iri-store.module';
import {
  MONGO_CONNECTION
} from './constants';
import {
  AuthModule
} from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }),
    IriStoreModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
