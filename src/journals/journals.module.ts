import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JournalEntriesController } from "./journal-entries.controller";
import { JournalsController } from "./journals.controller";
import { JournalsService } from "./journals.service";
import { Journal, JournalSchema } from "./schemas/journal.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Journal.name, schema: JournalSchema }])],
    controllers: [JournalsController, JournalEntriesController],
    providers: [JournalsService],
})
export class JournalsModule {}
