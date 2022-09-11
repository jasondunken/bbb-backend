import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type JournalEntryDocument = JournalEntry & Document;

@Schema()
export class JournalEntry {
    @Prop()
    title: String;

    @Prop()
    description: String;

    @Prop()
    body: String;

    @Prop()
    images: String[];

    @Prop()
    createdAt: Date;

    @Prop()
    lastUpdate: Date;
}

export const JournalEntrySchema = SchemaFactory.createForClass(JournalEntry);
