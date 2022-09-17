import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/auth/roles/role.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    roles: Role[];
}
