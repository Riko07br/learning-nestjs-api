import {
    IsDate,
    IsEmail,
    IsMobilePhone,
    IsOptional,
    IsString,
} from "class-validator";

export class EditUserDto {
    @IsString()
    @IsOptional()
    first_name?: string;

    @IsString()
    @IsOptional()
    last_name?: string;

    @IsString()
    @IsOptional()
    document?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsMobilePhone()
    @IsOptional()
    phone?: string;

    @IsDate()
    @IsOptional()
    birth_date?: Date;
}
