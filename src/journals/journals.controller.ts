import { Body, Controller, Get, Post, Put, Delete, Param } from "@nestjs/common";

import { JournalsService } from "./journals.service";
import { CreateJournalDto } from "./dto/journal-create.dto";
import { Journal } from "./schemas/journal.schema";

@Controller("journals")
export class JournalsController {
    constructor(private readonly journalService: JournalsService) {}

    @Post()
    async createJournal(@Body() journal: CreateJournalDto) {
        return this.journalService.create(journal);
    }

    @Get()
    async getAll(): Promise<Journal[]> {
        return this.journalService.getAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: String) {
        return this.journalService.findOne(id);
    }

    //   @Put()
    //   async updateJournal(@Param() id: String, @Body() journal: JournalDto) {
    //     return this.journalService.update(id, journal);
    //   }

    @Delete(":id")
    async delete(@Param("id") id: String) {
        return this.journalService.delete(id);
    }
}
