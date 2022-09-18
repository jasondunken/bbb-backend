import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { ImageData } from "../dto/image-data.dto";

export type ImageDocument = Image & Document;

@Schema()
export class Image {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({})
    img: ImageData;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
