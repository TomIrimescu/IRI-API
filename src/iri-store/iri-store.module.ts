import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { IriStoreService } from './iri-store.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { IriStoreController } from './iri-store.controller';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ],
    providers: [IriStoreService],
    controllers: [IriStoreController]
})
export class IriStoreModule implements NestModule { 
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(AuthenticationMiddleware).forRoutes(
          { method: RequestMethod.POST, path: '/iri-store/product' },
          { method: RequestMethod.GET, path: '/iri-store/product/:productID' },
          { method: RequestMethod.GET, path: '/iri-store/products' },
          { method: RequestMethod.PUT, path: '/iri-store/edit' },
          { method: RequestMethod.DELETE, path: '/iri-store/delete' }
        )
      }
}
