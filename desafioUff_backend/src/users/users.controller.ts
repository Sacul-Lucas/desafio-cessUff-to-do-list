import { Controller, Get, Post, Put, Delete, Body, Param, UnauthorizedException, Req, Patch, UseGuards, NotFoundException } from '@nestjs/common';
import { SetUserTaskDto } from '../tasks/dto/setUserTask.dto';
import { JwtAuthGuard } from '../common/guards/jwtAuth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import type { Request } from 'express';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    if (!users) throw new UnauthorizedException('Não foi possível listar os usuários');

    return {
      success: true,
      message: users
    };
  }
  
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return {
      success: true,
      message: user
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateUserDto) {
    const createdUser = this.usersService.create(body);
    if (!createdUser) throw new UnauthorizedException('Não foi possível criar um novo usuário');

    if (!body.username) throw new UnauthorizedException('Insira um nome de usuário válido');
    if (!body.email) throw new UnauthorizedException('Insira um email válido');
    if (!body.password) throw new UnauthorizedException('Insira uma senha válida');

    const exists = await this.usersService.findByEmail(body.email);
    if (exists) throw new UnauthorizedException('Email já foi registrado');

    return {
      success: true,
      message: 'Novo usuário adicionado com sucesso!'
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const delUser = this.usersService.remove(id);
    if (!delUser) throw new UnauthorizedException('Não foi possível remover o usuário');

    return {
      success: true,
      message: 'Usuário removido com sucesso!'
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/task')
  updateMyTask(
    @Param('id')
    @Req() req: Request,
    @Body() dto: SetUserTaskDto,
    id: string,
  ) {
    if (!req.user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    return this.usersService.updateUserTask(
      id,
      dto.taskId,
    );
  }
}
