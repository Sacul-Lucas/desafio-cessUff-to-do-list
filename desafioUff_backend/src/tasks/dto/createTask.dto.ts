import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsDate()
    deadline?: Date;

    @IsOptional()
    @IsString()
    status?: 'pending' | 'completed' | 'archived';
}
