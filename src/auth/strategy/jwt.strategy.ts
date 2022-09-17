import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";
import { User, UserDocument } from "src/users/schemas/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    // 'jwt' id the default name for this strategy, can be anything
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: { sub: string; email: string; iat: number; exp: number }) {
        const user = await this.userModel.findOne({ email: payload.email });
        if (!user) {
            throw new ForbiddenException("Credentials invalid");
        }
        return user;
    }
}
