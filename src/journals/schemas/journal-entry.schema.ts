import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type JournalEntryDocument = JournalEntry & Document;

@Schema()
export class JournalEntry {
    @Prop()
    journalId: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    body: string;

    @Prop()
    images: string[];

    @Prop()
    createdAt: Date;

    @Prop()
    lastUpdate: Date;
}

export const JournalEntrySchema = SchemaFactory.createForClass(JournalEntry);
JournalEntrySchema.pre("save", function (next) {
    if (this.isNew) {
        this.createdAt = new Date();
    } else {
        this.lastUpdate = new Date();
    }
    next();
});
