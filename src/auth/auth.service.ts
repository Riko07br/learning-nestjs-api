import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInDto, SignUpDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(@Body() signUpDto: SignUpDto) {
        const hash = await argon.hash(signUpDto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: signUpDto.email,
                    hash,
                },
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw new ForbiddenException("Credentials taken");
            }
            throw error;
        }
    }

    async signin(@Body() signInDto: SignInDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: signInDto.email,
            },
        });

        if (!user) throw new ForbiddenException("Invalid credentials");

        const pwMatch = await argon.verify(user.hash, signInDto.password);

        if (!pwMatch) throw new ForbiddenException("Invalid credentials");

        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };

        const secret = this.config.get("JWT_SECRET");

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: secret,
        });

        return {
            access_token: token,
        };
    }
}
