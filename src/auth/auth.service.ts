import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import * as argon from "argon2";

import { CreateUserDto } from "src/users/dto/user-create.dto";
import { User, UserDocument } from "src/users/schemas/user.schema";
import { LoginDto } from "./dto/login.dto";
import { Role } from "./roles/role.enum";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwt: JwtService) {}

    async register(createUserDto: CreateUserDto): Promise<User> {
        const hash = await argon.hash(createUserDto.password);
        const createdUser = await this.userModel.create({
            userName: createUserDto.userName,
            email: createUserDto.email,
            password: hash,
            roles: [Role.User],
        });
        return createdUser._id;
    }

    async login(loginDto: LoginDto): Promise<{ JWT: string }> {
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (!user) {
            throw new ForbiddenException("Credentials invalid");
        }
        const pwMatch = await argon.verify(user.password, loginDto.password);
        if (!pwMatch) {
            throw new ForbiddenException("Credentials invalid");
        }
        const jwt = await this.signToken(user._id, user.email);
        return { JWT: jwt };
    }

    async signToken(id: string, email: string): Promise<string> {
        const payload = {
            sub: id,
            email,
        };
        return this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: process.env.JWT_SECRET,
        });
    }
}
