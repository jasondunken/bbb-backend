import { Body, Controller, Get, Post, Put, Delete, Param } from "@nestjs/common";

import { JournalEntriesService } from "./journal-entries.service";
import { CreateJournalEntryDto } from "./dto/journal-entry-create.dto";
import { JournalEntry } from "./schemas/journal-entry.schema";

@Controller("journal/entries")
export class JournalEntriesController {
    constructor(private readonly entriesService: JournalEntriesService) {}

    @Post()
    async createEntry(@Body() entry: CreateJournalEntryDto) {
        return this.entriesService.create(entry);
    }

    @Get()
    async getAll(): Promise<JournalEntry[]> {
        return this.entriesService.getAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: String) {
        return this.entriesService.findOne(id);
    }

    //   @Put()
    //   async updateJournalEntry(@Body() id: String, @Body() entry: JournalEntryDto) {
    //     return this.entriesService.update(id, entry);
    //   }

    @Delete(":id")
    async delete(@Param("id") id: String) {
        return this.entriesService.delete(id);
    }
}
