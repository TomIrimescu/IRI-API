import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IriStoreModule } from './iri-store/iri-store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/iri-api', { useNewUrlParser: true, useUnifiedTopology: true }),
    IriStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
