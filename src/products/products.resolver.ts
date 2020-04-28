import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductType } from './dto/create-product.dto';
import { ProductInput } from './inputs/product.input';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => String)
  async hello() {
    return 'hello tomcat';
  }

  @Query(() => [ProductType])
  async products(): Promise<ProductType[]> {
    return await this.productsService.findAll();
  }

  @Query(() => [ProductType])
  async product(@Args('id') id: string): Promise<ProductType> {
    return await this.productsService.findOne(id);
  }

  @Mutation(() => ProductType)
  async createProduct(@Args('input') input: ProductInput): Promise<ProductInput> {
    const createdProduct =  await this.productsService.create(input);
    return createdProduct;
  }

  @Mutation(() => ProductType)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: ProductInput,): Promise<ProductInput> {
      const updatedProduct =  await this.productsService.update(id, input);
      return updatedProduct;
  }

  @Mutation(() => ProductType)
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    return await this.productsService.delete(id);
  }

}
