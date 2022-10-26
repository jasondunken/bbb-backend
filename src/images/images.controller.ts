import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Post,
    Res,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";

import { ImagesService } from "./images.service";
import { ImageDto } from "./dto/image.dto";
import { Image } from "./schemas/image.schema";

import { JwtGuard, RolesGuard } from "src/auth/guards";
import { Roles } from "src/auth/roles/roles.decorator";
import { Role } from "src/auth/roles/role.enum";

import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "../utils/file-upload.utils";
import { diskStorage } from "multer";

@Controller("images")
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @UseGuards(JwtGuard)
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() image: any) {
        return this.imagesService.create(image);
    }

    // return base64 string of image data
    @Get(":tag")
    @Header("content-type", "text/html")
    async findOne(@Param("tag") tag: string) {
        const foundImage = await this.imagesService.findOne(tag);
        return `data:image/png;base64, ${foundImage.imageData}`;
    }

    @UseGuards(JwtGuard)
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get()
    async getAll(): Promise<Image[]> {
        return this.imagesService.getAll();
    }

    @UseGuards(JwtGuard)
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.imagesService.delete(id);
    }

    @Post()
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "./files",
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        })
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    @Post("multiple")
    @UseInterceptors(
        FilesInterceptor("image", 20, {
            storage: diskStorage({
                destination: "./files",
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        })
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach((file) => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Get(":imgpath")
    seeUploadedFile(@Param("imgpath") image, @Res() res) {
        return res.sendFile(image, { root: "./files" });
    }
}
