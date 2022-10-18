import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/user-create.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtGuard } from "./guards";

@Controller()
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post("register")
    async register(@Body() createUserDto: CreateUserDto) {
        return this.auth.register(createUserDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return this.auth.login(loginDto);
    }

    @UseGuards(JwtGuard)
    @Get("roles")
    async getRoles(): Promise<any> {
        return { roles: ["admin", "user"] };
    }

    @Get("confirm/:token")
    async confirmUserEmail(@Param("token") token: string): Promise<any> {
        return this.auth.confirmUserEmail(token);
    }

    @Get("reset/:token")
    async resetPassword(@Param("token") token: string): Promise<any> {
        return this.auth.resetUserPassword(token);
    }

    @Post("reset")
    async requestPasswordReset(@Body() email: string): Promise<any> {
        return this.auth.requestPasswordReset(email).catch((err) => {
            throw new HttpException(
                {
                    message: "email not registered",
                },
                HttpStatus.BAD_REQUEST
            );
        });
    }
}
