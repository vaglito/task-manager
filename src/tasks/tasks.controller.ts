import { Controller, Get, Post, Put, Delete, Patch, Body, Query, Param } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {

    constructor(private tasksServices:TasksService) {}

    @Get()
    getAllTasks(@Query() query: any) {
        console.log(query)
        return this.tasksServices.getTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.tasksServices.getTaskById(parseInt(id));
    }

    @Post('')
    createTasks(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksServices.createTask(createTaskDto);
    }

    @Put()
    updateTasks() {
        return this.tasksServices.updateTask();
    }

    @Delete()
    deleteTasks() {
        return this.tasksServices.deleteTask();
    }

    @Patch()
    patchTasks() {
        return this.tasksServices.patchTask();
    }


}