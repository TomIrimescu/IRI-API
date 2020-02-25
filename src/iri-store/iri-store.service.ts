import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class IriStoreService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const newProduct = await this.productModel(createProductDTO);
        console.log('add new product:\n' + newProduct);
        return newProduct.save();
    }

    async getProduct(productID): Promise<Product> {
        console.log('@Get Product ID: ' + productID);
        const product = await this.productModel
            .findById(productID)
            .exec();
            console.log('get single product:\n' + product);
        return product;
    }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        console.log('get all products:\n' + products);
        return products;
    }

    async editProduct(productID, createProductDTO: CreateProductDTO): Promise<Product> {
        console.log('@Put Product ID: ' + productID);
        const editedProduct = await this.productModel
            .findByIdAndUpdate(productID, createProductDTO, { new: true });
            console.log('show edited product:\n' + editedProduct);
        return editedProduct;
    }

    async deleteProduct(productID): Promise<any> {
        console.log('@Delete Product ID: ' + productID);
        const deletedProduct = await this.productModel
            .findByIdAndRemove(productID);
            console.log('show deleted product:\n' + deletedProduct);
        return deletedProduct;
    }
}