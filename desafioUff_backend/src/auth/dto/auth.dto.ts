import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthDto {
    @IsString()
    id: string;

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    username: string;

    @IsEmail()
    @MinLength(12)
    email: string;
}
