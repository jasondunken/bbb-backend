import { UserDto } from "src/users/dto/user.dto";

export class JournalDto {
    name: string;
    description: string;
    entries: string[];
    createdAt: Date;
    lastUpdate: Date;
    owner: UserDto;
}
