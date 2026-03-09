import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './tasks.schema';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name)
        private readonly taskModel: Model<TaskDocument>,
    ) {}

    create(dto: CreateTaskDto) {
        return this.taskModel.create(dto);
    }

    findAll() {
        return this.taskModel.find().sort({ title: 1 });
    }

    async findOne(id: string) {
        return this.taskModel.findById(id);
    }

    async findByObject(task: {title: string, description: string, deadline: Date}): Promise<Task | null> {
        return this.taskModel.findOne(task).exec();
    }

    findPending() {
        return this.taskModel.find({ status: 'pending' }).select('title description');
    }

    findCompleted() {
        return this.taskModel.find({ status: 'completed' }).select('title description');
    }

    findArchived() {
        return this.taskModel.find({ status: 'archived' }).select('title description');
    }

    async findById(id: string) {
        const task = await this.taskModel.findById(id);
        if (!task) {
          throw new NotFoundException('Task not found');
        }
        return task;
    }

    async update(id: string, dto: UpdateTaskDto) {
        const task = await this.taskModel.findByIdAndUpdate(id, dto, {
          new: true,
        });

        if (!task) {
          throw new NotFoundException('Task not found');
        }

        return task;
    }

    async remove(id: string) {
        const task = await this.taskModel.findByIdAndDelete(id);
        if (!task) {
          throw new NotFoundException('Task not found');
        }
        return task;
    }
}
