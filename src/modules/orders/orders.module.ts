import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Users } from "src/entities/users.entity";
import { Products } from "src/entities/products.entity";
import { OrdersRepository } from "./orders.repository";

 @Module({
    imports:[
      TypeOrmModule.forFeature([
         Orders,
         OrderDetails,
         Users,
         Products]),
    ],
    providers:[OrdersService, OrdersRepository],
    controllers:[OrdersController] 
 })

 export class OrdersModule {}