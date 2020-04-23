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
    Delete,
    UseGuards
} from '@nestjs/common';
import {
    IriStoreService
} from './iri-store.service';
import {
    CreateProductDTO
} from './dto/create-product.dto';
import {
    ValidateObjectId
} from './shared/pipes/validate-object-id.pipes';
import { 
    AdminGuard 
} from 'src/auth/guards/admin.guard';
import { 
    AuthenticationGuard 
} from 'src/auth/guards/authentication.guard';

@Controller('api')
export class IriStoreController {

    constructor(private iriStoreService: IriStoreService) { }

    /**
     * Add a product
     * 
     * @param res 
     * @param createProductDTO 
     */
    @Post('/product')
    @UseGuards(AuthenticationGuard, AdminGuard)
    async addProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const newProduct = await this.iriStoreService.addProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
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
    @UseGuards(AuthenticationGuard, AdminGuard)
    async getProduct(@Res() res, @Param('productID', new ValidateObjectId()) productID) {
        const product = await this.iriStoreService.getProduct(productID);
        if (!product) {
            throw new NotFoundException('Product does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            product
        });
    }

    /**
     * Get all products
     * 
     */
    @Get('products')
    async getProducts() {
        const products = await this.iriStoreService.getProducts();
        return products
    }

    /**
     * Edit a particular product by ID
     * 
     * @param res 
     * @param productID 
     * @param createProductDTO 
     */
    @Put('/edit')
    @UseGuards(AuthenticationGuard, AdminGuard)
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
    @UseGuards(AuthenticationGuard, AdminGuard)
    async deleteProduct(@Res() res, @Query('productID', new ValidateObjectId()) productID) {
        const deletedProduct = await this.iriStoreService.deleteProduct(productID);
        if (!deletedProduct) {
            throw new NotFoundException('Product does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            product: deletedProduct,
        });
    }
}
