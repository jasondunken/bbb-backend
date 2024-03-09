import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAll(): Promise<User[]> {
        return this.userModel.find().lean().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<any> {
        const deletedUser = this.userModel.deleteOne({ _id: id }).exec();
        return deletedUser;
    }
}
