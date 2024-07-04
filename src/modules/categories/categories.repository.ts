import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import * as data from '../../utils/data.json'

@Injectable()
    export class CategoriesRepository {
        constructor(
            @InjectRepository(Categories)
            private readonly categoriesRepository: Repository<Categories>,
        ) {}

        async getCategories() {
            return await this.categoriesRepository.find();
        }


    async addCategories() { //seeder
        for (const element of data) {
            await this.categoriesRepository
                .createQueryBuilder()
                .insert()
                .into(Categories)
                .values({ name: element.category })
                .orIgnore()
                .execute(); 
        }
        return 'category added';
    }
} 
 