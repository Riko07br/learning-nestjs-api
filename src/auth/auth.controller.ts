import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";
import {
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiCreatedResponse({
        description: "Sucessful user registration",
    })
    @ApiForbiddenResponse({
        description: "Credentials taken",
    })
    @Post("signup")
    signup(@Body() signUpDto: SignUpDto) {
        return this.authService.signup(signUpDto);
    }

    @ApiOkResponse({
        description: "Sucessful user login and retrieve access token",
    })
    @HttpCode(HttpStatus.OK)
    @Post("signin")
    signin(@Body() signInDto: SignInDto) {
        return this.authService.signin(signInDto);
    }
}
