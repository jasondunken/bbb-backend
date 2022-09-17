import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/user-create.dto";
import { LoginDto } from "./dto/login.dto";

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
}
