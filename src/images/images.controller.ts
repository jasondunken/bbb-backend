import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";

import { ImagesService } from "./images.service";
import { ImageDto } from "./dto/image.dto";
import { Image } from "./schemas/image.schema";

import { JwtGuard, RolesGuard } from "src/auth/guards";
import { Roles } from "src/auth/roles/roles.decorator";
import { Role } from "src/auth/roles/role.enum";

@UseGuards(JwtGuard)
@Controller("images")
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post()
    async create(image: ImageDto): Promise<Image> {
        return this.imagesService.create(image);
    }

    @Get(":tag")
    async findOne(@Param("tag") id: string): Promise<Image> {
        return this.imagesService.findOne(id);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get()
    async getAll(): Promise<Image[]> {
        return this.imagesService.getAll();
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete(":id")
    async delete(@Param("id") id: string): Promise<Image> {
        return this.imagesService.delete(id);
    }
}
