import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Role } from "src/modules/users/roles.enum";

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 128,
        nullable: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 128,
        nullable: false,
    })
    confirmPassword: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    phone: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    city: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    country: string;

    @Column({ 
        type: 'enum',
        enum: Role, 
        default: Role.User
    })
    role: Role;

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({ name: 'order_id' })
    orders: Orders[];
}
