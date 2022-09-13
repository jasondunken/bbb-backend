import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import * as argon from "argon2";

import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/user-create.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hash = await argon.hash(createUserDto.password);
        const createdUser = await this.userModel.create({
            userName: createUserDto.userName,
            email: createUserDto.email,
            password: hash,
        });
        return createdUser._id;
    }

    async getAll(): Promise<User[]> {
        return this.userModel.find().lean().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({ _id: id });
    }

    async delete(id: string) {
        const deletedUser = this.userModel.findByIdAndRemove({ _id: id }).exec();
        return deletedUser;
    }
}
