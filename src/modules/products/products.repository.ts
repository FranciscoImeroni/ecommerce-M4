import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Products } from "src/entities/products.entity";
import { Connection, Repository } from "typeorm";
import * as data from '../../utils/data.json';
import { ProductDto } from "./products.dto";
import { CategoriesService } from "../categories/categories.service";

@Injectable()
export class ProductsRepository implements OnModuleInit{
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async getProducts(page:number,limit:number): Promise<Products[]> {
    let products= await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) *limit;
    const end = start + limit;
    products = products.slice(start,end);

    return products;
  }

  async onModuleInit() {
    await this.categoriesService.addCategories();
    await this.addProducts();
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    for (const element of data) {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    }
    return 'Products added';
  }
  
  async addProduct(productDto: ProductDto): Promise<Partial<Products>> {
    const category = await this.categoriesRepository.findOne({ where: { id: productDto.category } });
    if (!category) {
      throw new Error(`Category with id ${productDto.category} not found`);
    }

    const existingProduct = await this.productsRepository.findOne({ where: { name: productDto.name } });
    if (existingProduct) {
      throw new Error(`Product with name ${productDto.name} already exists`);
    }

    const newProduct = this.productsRepository.create({
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
      stock: productDto.stock,
      imgUrl: productDto.imgUrl,
      category: category,
    });

    await this.productsRepository.save(newProduct);
    return newProduct;
  }


  async getProduct(id:string){
    const product = await this.productsRepository.findOneBy({id});
    if (!product) {
      return `Products with id ${id} not found`;
    }
    return product;
  }

  async updateProduct(id: string, productDto: ProductDto): Promise<Partial<Products>> {
    const category = await this.categoriesRepository.findOne({ where: { id: productDto.category } });
    if (!category) {
      throw new Error(`Category with id ${productDto.category} not found`);
    }

    const updatedProduct = await this.productsRepository.preload({
      id: id,
      ...productDto,
      category: category,
    });

    if (!updatedProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    await this.productsRepository.save(updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id:string) { 
    console.log("repo produc delet")
    const product = await this.productsRepository.findOneBy({id});
    if (!product) {
      return `Products with id ${id} not found`;
    }
    await this.productsRepository.remove(product);
    return 'Product deleted';
  }
}
