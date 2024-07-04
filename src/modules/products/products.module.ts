import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.services";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { Categories } from "src/entities/categories.entity";
import { CategoriesModule } from "../categories/categories.module";

@Module({
    imports: [TypeOrmModule.forFeature([Products,Categories]), CategoriesModule],
    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController],
})

export class ProductsModule {}