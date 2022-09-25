import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateJournalEntryDto {
    @IsString()
    @IsNotEmpty()
    journalId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    // @IsArray()
    // images: [];
}
