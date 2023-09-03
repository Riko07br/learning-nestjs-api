import { ForbiddenException, Injectable } from "@nestjs/common";
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

    async findOne(userId: number, id: number) {
        const order = await this.prisma.order.findUnique({
            where: {
                id,
                user_id: userId,
            },
        });

        return order;
    }

    async update(userId: number, id: number, updateOrderDto: UpdateOrderDto) {
        const order = await this.prisma.order.findUnique({
            where: {
                id,
            },
        });

        if (!order || order.user_id != userId)
            throw new ForbiddenException("Access to resource denied");

        return this.prisma.order.update({
            where: {
                id,
            },
            data: {
                ...updateOrderDto,
            },
        });
    }

    async remove(userId: number, id: number) {
        const order = await this.prisma.order.findUnique({
            where: {
                id,
            },
        });

        if (!order || order.user_id != userId)
            throw new ForbiddenException("Access to resource denied");

        await this.prisma.order.delete({
            where: {
                id,
            },
        });
    }
}
