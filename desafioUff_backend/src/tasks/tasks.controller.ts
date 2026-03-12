import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    const taskCreation = await this.tasksService.create(dto);
    if (!taskCreation) throw new BadRequestException;

    return {
      success: true,
      message: 'Tarefa criada com sucesso!'
    };
  }

  @Get()
  async findAll() {
    const tasks = await this.tasksService.findAll();
    if (!tasks) throw new NotFoundException('Não foi possível listar as tarefas');

    return {
      success: true,
      message: tasks
    };
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
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    const updatedTask = await this.tasksService.update(id, dto);
    if (!updatedTask) throw new NotFoundException('Não foi possível encontrar a tarefa a ser atualizada');

    return {
      success: true,
      message: 'Tarefa atualizada com sucesso!'
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedTask = await this.tasksService.remove(id);
    if (!deletedTask) throw new NotFoundException('Não foi possível encontrar a tarefa a ser excluída');

    return {
      success: true,
      message: 'Tarefa removida com sucesso!'
    };
  }
}
