import {
    IsDate,
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsOptional()
    last_name?: string;

    @IsString()
    @IsOptional()
    document?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsMobilePhone()
    @IsOptional()
    phone?: string;

    @IsDate()
    @IsOptional()
    birth_date?: Date;
}
