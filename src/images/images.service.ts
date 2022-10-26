import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ImageDto } from "./dto/image.dto";
import { Image, ImageDocument } from "./schemas/image.schema";

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}

    async create(image: ImageDto): Promise<Image> {
        const createdImage = await this.imageModel.create(image);
        return createdImage;
    }

    async findOne(tag: string): Promise<Image> {
        return this.imageModel.findOne({ tag: tag }).exec();
    }

    async getAll(): Promise<Image[]> {
        return this.imageModel.find().lean().exec();
    }

    async delete(id: string): Promise<Image> {
        return this.imageModel.findOneAndDelete({ _id: id });
    }
}
