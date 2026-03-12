import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../tasks/tasks.schema';
import { Model, Types } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const defaultTask = await this.taskModel.findOne({ status: 'pending' });

    if (!defaultTask) {
      throw new NotFoundException(
        'Sem tarefas criadas. Por favor, crie uma tarefa padrão',
      );
    }

    const createdUser = new this.userModel({
      ...createUserDto,
      task: defaultTask._id,
    });

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('task').exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).populate('task').exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).populate('task').exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updateUserTask(userId: string, taskId: string): Promise<User> {
    const taskExists = await this.taskModel.exists({
      _id: new Types.ObjectId(taskId)
    });
  
    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }
  
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { task: taskId },
        { returnDocument: 'after' },
      )
      .populate('task')
      .exec();
    
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
  
    return updatedUser;
  }
}
