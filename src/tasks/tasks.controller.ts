import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  NotFoundException,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from '@prisma/client';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  async getAllTasks() {
    return this.tasksServices.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.tasksServices.getTaskById(id);
    if (!taskFound) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return taskFound;
  }

  @Post('')
  async createTasks(@Body() data: Tasks) {
    try {
        return await this.tasksServices.createTask(data);
    }
    catch (error) {
      throw new BadRequestException('No se proporcionaron los datos necesarios');
    }
  }

  @Put(':id')
  async updateTasks(@Param('id') id: string, @Body() data: Tasks) {
    try {
        return await this.tasksServices.updateTask(id, data);
    } catch (error) {
      throw new NotFoundException('Tarea no encontrada');
    }
  }

  @Delete(':id')
  async deleteTasks(@Param('id') id: string) {
    try {
      return await this.tasksServices.deleteTask(id);
    } catch (error) {
      throw new NotFoundException('Tarea no encontrada');
    }
  }

  @Patch()
  patchTasks() {
    return this.tasksServices.patchTask();
  }
}
