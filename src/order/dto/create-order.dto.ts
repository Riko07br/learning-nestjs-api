import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    quantity: number;

    @IsNumber()
    price: number;
}
