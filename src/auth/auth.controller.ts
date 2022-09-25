import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/user-create.dto";
import { LoginDto } from "./dto/login.dto";
import { Role } from "./roles/role.enum";

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

    @Get("roles")
    async getRoles(): Promise<any> {
        return { roles: ["admin", "user"] };
    }
    @Post("reset")
    async resetPassword(@Body() email: string): Promise<any> {
        return { message: "password reset not yet implemented" };
    }
}
