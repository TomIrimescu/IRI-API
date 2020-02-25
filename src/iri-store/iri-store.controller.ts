import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Post,
    Body,
    Put,
    Query,
    Delete
} from '@nestjs/common';
import { IriStoreService } from './iri-store.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('iri-store')
export class IriStoreController {

    constructor(private iriStoreService: IriStoreService) { }

    /**
     * Add a product
     * 
     * @param res 
     * @param createProductDTO 
     */
    @Post('/product')
    async addProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const newProduct = await this.iriStoreService.addProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product has been added successfully!',
            product: newProduct,
        });
    }

    /**
     * Get a product by id
     * 
     * @param res 
     * @param productID 
     */
    @Get('product/:productID')
    async getProduct(@Res() res, @Param('productID', new ValidateObjectId()) productID) {
        const product = await this.iriStoreService.getProduct(productID);
        if (!product) {
            throw new NotFoundException('Product does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'A single product has been retrieved',
            product
        });
    }

    /**
     * Get all products
     * 
     * @param res 
     */
    @Get('products')
    async getProducts(@Res() res) {
        const products = await this.iriStoreService.getProducts();
        return res.status(HttpStatus.OK).json({
            message: 'All products have been retrieved',
            products
        });
    }

    /**
     * Edit a particular product by ID
     * 
     * @param res 
     * @param productID 
     * @param createProductDTO 
     */
    @Put('/edit')
    async editProduct(
        @Res() res,
        @Query('productID', new ValidateObjectId()) productID,
        @Body() createProductDTO: CreateProductDTO,
    ) {
        const editedProduct = await this.iriStoreService.editProduct(productID, createProductDTO);
        if (!editedProduct) {
            throw new NotFoundException('Product does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Product has been successfully updated!',
            product: editedProduct,
        });
    }

    /**
     * Delete a particular product by ID
     * 
     * @param res 
     * @param productID 
     */
    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID', new ValidateObjectId()) productID) {
        const deletedProduct = await this.iriStoreService.deleteProduct(productID);
        if (!deletedProduct) {
            throw new NotFoundException('Product does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Product has been deleted!',
            product: deletedProduct,
        });
    }
}
