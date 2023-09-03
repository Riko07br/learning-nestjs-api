import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto, UpdateOrderDto } from "./dto";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";

@UseGuards(JwtGuard)
@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    findAll(@GetUser("id") userId: number) {
        return this.orderService.findAll(userId);
    }

    @Post()
    create(
        @GetUser("id") userId: number,
        @Body() createOrderDto: CreateOrderDto
    ) {
        return this.orderService.create(userId, createOrderDto);
    }

    @Get(":id")
    findOne(
        @GetUser("id") userId: number,
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.orderService.findOne(userId, id);
    }

    @Patch(":id")
    update(
        @GetUser("id") userId: number,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        return this.orderService.update(userId, id, updateOrderDto);
    }

    @Delete(":id")
    remove(
        @GetUser("id") userId: number,
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.orderService.remove(userId, id);
    }
}
