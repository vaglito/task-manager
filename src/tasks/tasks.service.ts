import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {
  private tasks = [];

  getTasks(): CreateTaskDto[] {
    return this.tasks;
  }

  getTaskById(id: number) {
    const taskfound = this.tasks.find((task) => task.id === id);
    if (!taskfound) {
      return new NotFoundException(`Tarea con la id ${id} no encontrada`);
    }
    return taskfound;
  }

  createTask(task: CreateTaskDto) {
    this.tasks.push({
      id: this.tasks.length + 1,
      ...task,
    });
    return {
      message: 'Tarea creada correctamente',
      status: 'success',
      task,
    };
  }

  updateTask() {
    return {
      message: 'Actualizando una tarea',
      status: 'success',
    };
  }

  deleteTask() {
    return {
      message: 'Eliminando una tarea',
      status: '404 not found',
    };
  }

  patchTask() {
    return {
      message: 'Actualizando una tarea',
      status: 'success',
    };
  }
}
