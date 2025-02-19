import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tasks } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private task: PrismaService) {}

  async getAllTasks(): Promise<Tasks[]> {
    return this.task.tasks.findMany();
  }

  async getTaskById(id: string): Promise<Tasks> {
    return this.task.tasks.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createTask(task: Tasks): Promise<Tasks> {
    return this.task.tasks.create({ data: task });
  }

  async updateTask(id: string, data: Tasks): Promise<Tasks> {
    return this.task.tasks.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deleteTask(id: string): Promise<Tasks> {
    return this.task.tasks.delete({
      where: {
        id: id,
      },
    });
  }

  patchTask() {
    return {
      message: 'Actualizando una tarea',
      status: 'success',
    };
  }
}
