import { IsMongoId } from 'class-validator';

export class SetUserTaskDto {
    @IsMongoId()
    taskId: string;
}
