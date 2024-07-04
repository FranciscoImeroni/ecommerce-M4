import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';

@Entity('products')
export class Products {
  /**
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * @example "Laptop"
   */
  @Column({ 
    type: 'varchar', 
    length: 50, 
    unique: true,
    nullable: false 
  })
  name: string;

  /**
   * @example "High performance laptop with 16GB RAM and 512GB SSD."
   */
  @Column({ 
    type: 'text', 
    nullable: false 
  })
  description: string;

  /**
   * @example 999.99
   */
  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    nullable: false 
  })
  price: number;

  /**
   * @example 50
   */
  @Column({ 
    type: 'int', 
    nullable: false 
  }) 
  stock: number;

  /**
   * @example "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
   */
  @Column({ 
    type: 'varchar', 
    default: 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  })
  imgUrl: string;

  /**
   * @example { id: "550e8400-e29b-41d4-a716-446655440001", name: "Electronics" }
   */
  @ManyToOne(() => Categories, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  /**
   * @example [{ id: "550e8400-e29b-41d4-a716-446655440002", price: 999.99 }]
   */
  @ManyToMany(() => OrderDetails, orderDetails => orderDetails.products)
  orderDetails: OrderDetails[];
}
