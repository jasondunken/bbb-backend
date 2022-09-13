import { JournalDto } from "src/journals/dto/journal.dto";

export class UserDto {
    userName: string;
    journals: JournalDto[];
    games: string[];
}
