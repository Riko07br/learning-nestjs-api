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
    HttpCode,
    HttpStatus,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto, UpdateOrderDto } from "./dto";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import {
    ApiBody,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags("Order")
@UseGuards(JwtGuard)
@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiOkResponse({
        description: "Return all orders from current user",
    })
    @Get()
    findAll(@GetUser("id") userId: number) {
        return this.orderService.findAll(userId);
    }

    @ApiOkResponse({
        description: "Create new order for current user",
    })
    @Post()
    create(
        @GetUser("id") userId: number,
        @Body() createOrderDto: CreateOrderDto
    ) {
        return this.orderService.create(userId, createOrderDto);
    }

    @ApiOkResponse({
        description: "Find specific order from current user by order id",
    })
    @Get(":id")
    findOne(
        @GetUser("id") userId: number,
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.orderService.findOne(userId, id);
    }

    @ApiOkResponse({
        description: "Update specific order from current user by order id",
    })
    @Patch(":id")
    update(
        @GetUser("id") userId: number,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        return this.orderService.update(userId, id, updateOrderDto);
    }

    @ApiNoContentResponse({
        description: "Delete specific order from current user by order id",
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    remove(
        @GetUser("id") userId: number,
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.orderService.remove(userId, id);
    }
}
