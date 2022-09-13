import { UserDto } from "src/users/dto/user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateJournalDto {
    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsNotEmpty()
    description: String;

    entries: String[];
    createdAt: Date;
    lastUpdate: Date;
    owner: UserDto;
}
