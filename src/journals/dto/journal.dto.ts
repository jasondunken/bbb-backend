import { UserDto } from 'src/users/dto/user.dto';

export class JournalDto {
  name: String;
  description: String;
  entries: String[];
  createdAt: Date;
  lastUpdate: Date;
  owner: UserDto;
}
