import { JournalDto } from 'src/journals/dto/journal.dto';

export class UserDto {
  userName: String;
  journals: JournalDto[];
  games: String[];
}
