import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.services";
import { CreateOrderDto } from "./orders.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('orders')
@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService:OrdersService) {}

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto) {
        const {userId, products} = order;
        return this.ordersService.addOrder(userId,products);
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Query('id') id:string) {
        return this.ordersService.getOrder(id);
    }
}