import { Module } from '@nestjs/common'; 
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { CategoriesRepository } from './categories.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Categories])],
    providers: [CategoriesService, CategoriesRepository],
    controllers: [CategoriesController],
    exports: [CategoriesService]
})
export class CategoriesModule {} 