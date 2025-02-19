import { Controller, Get, Post, Put, Delete, Patch, Body, Query, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from '@prisma/client';

@Controller('/tasks')
export class TasksController {

    constructor(private tasksServices:TasksService) {}

    @Get()
    async getAllTasks() {
        return this.tasksServices.getAllTasks();
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        return this.tasksServices.getTaskById(id);
    }

    @Post('')
    async createTasks(@Body() data: Tasks) {
        return this.tasksServices.createTask(data);
    }

    @Put(':id')
    async updateTasks(@Param('id') id: string, @Body() data: Tasks) {
        return this.tasksServices.updateTask(id, data);
    }

    @Delete('id')
    async deleteTasks(@Param('id') id: string) {
        return this.tasksServices.deleteTask(id);
    }

    @Patch()
    patchTasks() {
        return this.tasksServices.patchTask();
    }


}