import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { UserDto } from 'src/users/dto/user.dto';

export type JournalDocument = Journal & Document;

@Schema()
export class Journal {
  @Prop()
  name: String;

  @Prop()
  description: String;

  @Prop()
  entries: String[];

  @Prop()
  createdAt: Date;

  @Prop()
  lastUpdate: Date;

  @Prop()
  owner: UserDto;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
