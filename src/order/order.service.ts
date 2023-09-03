import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    findAll(userId: number) {
        return this.prisma.order.findMany({
            where: {
                user_id: userId,
            },
        });
    }

    async create(userId: number, createOrderDto: CreateOrderDto) {
        const order = await this.prisma.order.create({
            data: {
                user_id: userId,
                description: createOrderDto.description,
                quantity: createOrderDto.quantity,
                price: createOrderDto.price,
                ...createOrderDto,
            },
        });
        return order;
    }

    findOne(userId: number, id: number) {
        return this.prisma.order.findUnique({
            where: {
                id,
                user_id: userId,
            },
        });
    }

    update(userId: number, id: number, updateOrderDto: UpdateOrderDto) {
        return `This action updates a #${id} order`;
    }

    remove(userId: number, id: number) {
        return `This action removes a #${id} order`;
    }
}
