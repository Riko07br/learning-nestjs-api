import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator/get-user.decorator";
import { JwtGuard } from "src/auth/guard";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
    @Get()
    index(@GetUser() user: User, @GetUser("email") userEmail: string) {
        console.log(userEmail);
        return user;
    }
}
