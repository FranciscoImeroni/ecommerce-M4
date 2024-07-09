import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Products } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private ordersDetailRepository: Repository<OrderDetails>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
    ) {}

    async addOrder(userId: string, products:any) {
        let total = 0;

        const user =await this.usersRepository.findOneBy({id:userId});

        if (!user) throw new NotFoundException(`User with Id ${userId} not found`);

        const order = new Orders();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        const productArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({
                    id: element.id,
                });

                if(!product) throw new NotFoundException(`Product with Id ${element.id} not found`)

                total += Number(product.price);

                await this.productsRepository.update(
                    {id: element.id},
                    {stock: product.stock - 1},
                );
                return product;
            }),
        );
        
        const orderDetail = new OrderDetails();

        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productArray;
        orderDetail.order = newOrder;

        await this.ordersDetailRepository.save(orderDetail);

        return await this.ordersRepository.find({
            where: {id:newOrder.id},
            relations: {
                orderDetails: true,
            },
        });
    }

    getOrder(id:string) {
        const order = this.ordersRepository.findOne({
            where: {id},
            relations: {
                orderDetails: {
                    products: true,
                },
            },
        });

        if (!order) {
            throw new NotFoundException(`Product with Id ${id} not found`) ;
        }

        return order;
    }
}