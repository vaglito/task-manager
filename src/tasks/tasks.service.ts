import { Injectable, NotFoundException } from '@nestjs/common';

export interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export interface ErrorResponse {
  message: string;
  status: string;
}

@Injectable()
export class TasksService {
  private tasks = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number) {
    const taskfound = this.tasks.find((task) => task.id === id);
    if (!taskfound) {
      return new NotFoundException(`Tarea con la id ${id} no encontrada`);
    }
    return taskfound;
  }

  createTask(task: Task) {
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
