import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards } from "@nestjs/common";

import { JournalEntriesService } from "./journal-entries.service";
import { CreateJournalEntryDto } from "./dto/journal-entry-create.dto";
import { JournalEntry } from "./schemas/journal-entry.schema";

import { JwtGuard, RolesGuard } from "src/auth/guards";
import { Roles } from "src/auth/roles/roles.decorator";
import { Role } from "src/auth/roles/role.enum";

@Controller("journal/entries")
export class JournalEntriesController {
    constructor(private readonly entriesService: JournalEntriesService) {}

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    async createEntry(@Body() entry: CreateJournalEntryDto) {
        return this.entriesService.create(entry);
    }

    @Get()
    async getAll(): Promise<JournalEntry[]> {
        return this.entriesService.getAll();
    }

    // gets all entries for a journalId
    @Get(":id")
    async findAllJournalEntries(@Param("id") id: string) {
        return this.entriesService.findAllJournalEntries(id);
    }

    // @Roles(Role.Admin)
    // @UseGuards(JwtGuard, RolesGuard)
    //   @Put()
    //   async updateJournalEntry(@Body() id: String, @Body() entry: JournalEntryDto) {
    //     return this.entriesService.update(id, entry);
    //   }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.entriesService.delete(id);
    }
}
