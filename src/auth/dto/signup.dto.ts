import {
    IsDate,
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsString,
} from "class-validator";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    last_name: string;

    document: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsMobilePhone()
    phone: string;

    @IsDate()
    birth_date: Date;
}
