import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop()
  catName: string;

  @Prop()
  catAge: number;

  @Prop()
  catBreed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
