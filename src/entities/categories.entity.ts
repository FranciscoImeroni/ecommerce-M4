import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Products } from './products.entity';

@Entity('categories')
export class Categories {
  /**
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * @example "Electronics"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true, 
  })
  name: string;

  /**
   * @example [{ id: "550e8400-e29b-41d4-a716-446655440001", name: "Laptop", price: 1000, categoryId: "550e8400-e29b-41d4-a716-446655440000" }, { id: "550e8400-e29b-41d4-a716-446655440002", name: "Smartphone", price: 700, categoryId: "550e8400-e29b-41d4-a716-446655440000" }]
   */
  @OneToMany(() => Products, product => product.category)
  products: Products[];
}