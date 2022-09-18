import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateImageDto } from "./dto/image-create.dto";
import { ImagesService } from "./images.service";
import { Image } from "./schemas/image.schema";

@Controller("images")
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    async create(image: CreateImageDto): Promise<Image> {
        return this.imagesService.create(image);
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<Image> {
        return this.imagesService.findOne(id);
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<Image> {
        return this.imagesService.delete(id);
    }
}
