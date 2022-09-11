import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/user-create.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = await this.userModel.create(createUserDto);
        return createdUser;
    }

    async getAll(): Promise<User[]> {
        return this.userModel.find().lean().exec();
    }

    async findOne(id: String): Promise<User> {
        return this.userModel.findOne({ _id: id });
    }

    async delete(id: String) {
        const deletedUser = this.userModel.findByIdAndRemove({ _id: id }).exec();
        return deletedUser;
    }
}
