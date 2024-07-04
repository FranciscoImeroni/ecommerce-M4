import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Products } from './products.entity';
import { Orders } from './orders.entity';

@Entity({ name: 'order_details' })
export class OrderDetails {
  /**
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * @example 99.99
   */
  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    nullable: false 
  })
  price: number;

  /**
   * @example { id: "550e8400-e29b-41d4-a716-446655440001", userId: "550e8400-e29b-41d4-a716-446655440002", date: "2024-06-07T19:17:44.000Z" }
   */
  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({name:'order_id'})
  order: Orders;

  /**
   * @example [{ id: "550e8400-e29b-41d4-a716-446655440003", name: "Laptop", price: 1000, categoryId: "550e8400-e29b-41d4-a716-446655440004" }, { id: "550e8400-e29b-41d4-a716-446655440005", name: "Smartphone", price: 700, categoryId: "550e8400-e29b-41d4-a716-446655440006" }]
   */
  @ManyToMany(() => Products)
  @JoinTable({
    name: 'orderdetails_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderDetails_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];
}
