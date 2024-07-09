import { Injectable, OnModuleInit } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDto } from "./products.dto";

@Injectable()
export class ProductsService{
    constructor(private readonly productsRepository: ProductsRepository) {}

    addProducts() {
        return this.productsRepository.addProducts();
    }

    getProducts(page:number, limit:number) {
        return this.productsRepository.getProducts(page, limit);
    }

    getProduct(id:string){
        return this.productsRepository.getProduct(id)
    }

    updateProduct(id:string, productDto: ProductDto){
        return this.productsRepository.updateProduct(id, productDto)
    } 

    addProduct(productDto: ProductDto) {
        return this.productsRepository.addProduct(productDto);
    }

    deleteProduct(id:string){
        return this.productsRepository.deleteProduct(id)
    }
}
