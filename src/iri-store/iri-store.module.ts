import { Module } from '@nestjs/common';
import { IriStoreService } from './iri-store.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { IriStoreController } from './iri-store.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ],
    providers: [IriStoreService],
    controllers: [IriStoreController]
})
export class IriStoreModule { }
