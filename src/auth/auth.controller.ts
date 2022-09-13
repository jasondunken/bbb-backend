import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/user-create.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller()
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post("register")
    async register(@Body() createUserDto: CreateUserDto) {
        return this.auth.register(createUserDto);
    }

    @Post("login")
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return this.auth.login(loginDto);
    }
}
