import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/auth/roles/role.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    userName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    roles: Role[];

    @Prop()
    activated: boolean;

    @Prop()
    banned: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
