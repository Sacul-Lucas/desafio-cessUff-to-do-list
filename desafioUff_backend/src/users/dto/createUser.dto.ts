import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  username: string;

  @IsEmail()
  @MinLength(12)
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
