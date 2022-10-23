import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ImageDto } from "./dto/image.dto";
import { Image, ImageDocument } from "./schemas/image.schema";

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}

    async create(image: ImageDto): Promise<Image> {
        return this.imageModel.create(image);
    }

    async findOne(id: string): Promise<Image> {
        return this.imageModel.findOne({ _id: id });
    }

    async getAll(): Promise<Image[]> {
        return this.imageModel.find().lean().exec();
    }

    async delete(id: string): Promise<Image> {
        return this.imageModel.findOneAndDelete({ _id: id });
    }
}
