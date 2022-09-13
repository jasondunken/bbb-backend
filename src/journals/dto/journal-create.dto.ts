import { IsNotEmpty, IsString } from "class-validator";

import { JournalEntryDto } from "./journal-entry.dto";
import { UserDto } from "src/users/dto/user.dto";

export class CreateJournalDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    entries: JournalEntryDto[];
    createdAt: Date;
    lastUpdate: Date;
    owner: UserDto;
}
