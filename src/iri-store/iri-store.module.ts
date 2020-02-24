import { Module } from '@nestjs/common';
import { IriStoreService } from './iri-store.service';

@Module({
  providers: [IriStoreService]
})
export class IriStoreModule {}
