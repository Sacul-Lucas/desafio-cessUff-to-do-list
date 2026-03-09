import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('api/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    create(@Body() dto: CreateTaskDto) {
      return this.tasksService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.tasksService.findAll();
    }
  
    @Get('pending')
    findPending() {
      return this.tasksService.findPending();
    }
  
    @Get('completed')
    findCompleted() {
      return this.tasksService.findPending();
    }
  
    @Get('archived')
    findArchived() {
      return this.tasksService.findPending();
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() dto: UpdateTaskDto,
    ) {
      return this.tasksService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.tasksService.remove(id);
    }
}
