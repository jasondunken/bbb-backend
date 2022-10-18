import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { MongooseModule } from "@nestjs/mongoose";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { User, UserSchema } from "src/users/schemas/user.schema";
import { UsersModule } from "src/users/users.module";
import { JwtStrategy } from "./strategy";
import { RolesGuard } from "./guards";
import { MailService } from "src/mail/mail.service";

@Module({
    imports: [
        JwtModule.register({}),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RolesGuard, MailService],
})
export class AuthModule {}
