import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.services";
import { AuthGuard } from "../auth/guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ProductDto } from "./products.dto";

@ApiTags('products')
@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getProducts(@Query('page') page: string, @Query('limit') limit: string) {
        return this.productsService.getProducts(Number(page), Number(limit));
    }

    @Get('seeder')
    addProducts() {
        return this.productsService.addProducts();
    }

    @Get(':id')
    getProduct(@Param('id') id:string) {
        return this.productsService.getProduct(id) 
    }

    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateProduct(@Param('id') id: string, @Body() productDto: ProductDto) {
        return this.productsService.updateProduct(id, productDto);
    }

    @Post()
    addProduct( @Body() productDto: ProductDto) {
        return this.productsService.addProduct(productDto);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id:string){
        console.log("controller del")
        return this.productsService.deleteProduct(id)
    }
} 
