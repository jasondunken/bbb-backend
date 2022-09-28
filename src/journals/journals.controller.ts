import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards } from "@nestjs/common";

import { JournalsService } from "./journals.service";
import { CreateJournalDto } from "./dto/journal-create.dto";
import { Journal } from "./schemas/journal.schema";
import { JwtGuard, RolesGuard } from "src/auth/guards";
import { Roles } from "src/auth/roles/roles.decorator";
import { Role } from "src/auth/roles/role.enum";

@UseGuards(JwtGuard)
@Controller("journals")
export class JournalsController {
    constructor(private readonly journalService: JournalsService) {}

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post()
    async createJournal(@Body() journal: CreateJournalDto) {
        return this.journalService.create(journal);
    }

    @Get()
    async getAll(): Promise<Journal[]> {
        return this.journalService.getAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.journalService.findOne(id);
    }

    // @Roles(Role.Admin)
    // @UseGuards(RolesGuard)
    //   @Put()
    //   async updateJournal(@Param() id: String, @Body() journal: JournalDto) {
    //     return this.journalService.update(id, journal);
    //   }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.journalService.delete(id);
    }
}
