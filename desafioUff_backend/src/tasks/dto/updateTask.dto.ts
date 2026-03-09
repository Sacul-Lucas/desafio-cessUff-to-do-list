import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    deadline?: Date;

    @IsOptional()
    @IsString()
    status?: 'pending' | 'completed' | 'archived';
}
