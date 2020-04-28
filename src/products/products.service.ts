import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductType } from './dto/create-product.dto';
import { ProductInput } from './inputs/product.input';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(createProductDto: ProductInput): Promise<ProductType> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findAll(): Promise<ProductType[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductType> {
    return await this.productModel.find({ _id: id });
  }

  async update(id: string, product: Product): Promise<ProductType> {
    return await this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    return await this.productModel.findByIdAndRemove(id);
  }

}
