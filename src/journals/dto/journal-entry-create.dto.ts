import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateJournalEntryDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsArray()
    images: [];
}
