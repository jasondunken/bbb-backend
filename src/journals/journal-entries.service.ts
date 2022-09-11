import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { CreateJournalEntryDto } from "./dto/journal-entry-create.dto";
import { JournalEntry, JournalEntryDocument } from "./schemas/journal-entry.schema";

@Injectable()
export class JournalEntriesService {
    constructor(@InjectModel(JournalEntry.name) private journalEntryModel: Model<JournalEntryDocument>) {}
    // Journal Entries
    async create(createJournalEntryDto: CreateJournalEntryDto): Promise<JournalEntry> {
        const createdJournalEntry = await this.journalEntryModel.create(createJournalEntryDto);
        return createdJournalEntry;
    }

    async getAll(): Promise<JournalEntry[]> {
        return this.journalEntryModel.find().lean().exec();
    }

    async findOne(id: String) {
        return this.journalEntryModel.findOne({ _id: id }).exec();
    }

    //   async update(id: String, journalEntryDto: JournalEntryDto): Promise<JournalEntry> {
    //     return this.journalModel.replaceOne({ _id: id }, journalDto);
    //   }

    async delete(id: String) {
        const deletedJournal = await this.journalEntryModel.findByIdAndDelete({
            _id: id,
        });
        return deletedJournal;
    }
}
