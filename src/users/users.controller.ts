import { Body, Controller, Get, Post, Put, Delete, Param } from "@nestjs/common";

import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.usersService.delete(id);
    }
}
