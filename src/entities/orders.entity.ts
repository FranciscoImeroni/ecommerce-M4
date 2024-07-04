import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { OrderDetails } from './orderDetails.entity';

@Entity({ name: 'orders' })
export class Orders {
  /**
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * @example "2024-06-07T19:17:44.000Z"
   */
  @Column({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP'
  })
  date: Date;

  /**
   * @example { id: "550e8400-e29b-41d4-a716-446655440001", price: 99.99, products: [{ id: "550e8400-e29b-41d4-a716-446655440003", name: "Laptop", price: 1000 }, { id: "550e8400-e29b-41d4-a716-446655440005", name: "Smartphone", price: 700 }] }
   */
  @OneToOne(() => OrderDetails, orderDetails => orderDetails.order)
  orderDetails: OrderDetails;

  /**
   * @example { id: "550e8400-e29b-41d4-a716-446655440002", name: "John Doe", email: "john.doe@example.com" }
   */
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
