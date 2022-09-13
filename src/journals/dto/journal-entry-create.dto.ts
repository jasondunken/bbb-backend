import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateJournalEntryDto {
    @IsString()
    @IsNotEmpty()
    title: String;

    @IsString()
    @IsNotEmpty()
    description: String;

    @IsString()
    @IsNotEmpty()
    body: String;

    @IsArray()
    images: [];
}
