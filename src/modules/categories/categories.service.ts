import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";

@Injectable()
export class CategoriesService{
    constructor(private categoriesRepository: CategoriesRepository) {}

    async addCategories() {
        return this.categoriesRepository.addCategories();
    }

    async getCategories() {
        return this.categoriesRepository.getCategories();
    }

}
