import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JournalEntriesController } from "./journal-entries.controller";
import { JournalEntriesService } from "./journal-entries.service";
import { JournalsController } from "./journals.controller";
import { JournalsService } from "./journals.service";
import { JournalEntry, JournalEntrySchema } from "./schemas/journal-entry.schema";
import { Journal, JournalSchema } from "./schemas/journal.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Journal.name, schema: JournalSchema },
            { name: JournalEntry.name, schema: JournalEntrySchema },
        ]),
    ],
    controllers: [JournalsController, JournalEntriesController],
    providers: [JournalsService, JournalEntriesService],
})
export class JournalsModule {}
