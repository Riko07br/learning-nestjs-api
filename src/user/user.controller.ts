import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { UserService } from "./user.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { EditUserDto } from "./dto";

@ApiTags("User")
@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOkResponse({
        description: "Return all users",
    })
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiOkResponse({
        description: "Return current user",
    })
    @Get("me")
    getCurrentUser(@GetUser() user: User) {
        return user;
    }

    @ApiOkResponse({
        description: "Update current user",
    })
    @Patch("me")
    updateCurrentUser(@GetUser("id") userId: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto);
    }
}
