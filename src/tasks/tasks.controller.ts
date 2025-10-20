import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptors';

@Controller('tasks')

export class TasksController {

    constructor(private readonly taskService: TasksService) {}

    @Get()
    @UseInterceptors(LoggerInterceptor)
    findAll(@Query() paginationDto: PaginationDto) {        
        return this.taskService.findAll(paginationDto);
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id : number) {
        return this.taskService.findOne(id);
    }
    @Post()
    createTask(@Body() CreateTaskDto : CreateTaskDto) {
        return this.taskService.create(CreateTaskDto);
    }
    @Patch(':id')   
    updateTask(@Param('id', ParseIntPipe) id : number , @Body() UpdateTaskDto : UpdateTaskDto) {
        return this.taskService.update(id, UpdateTaskDto);
    }
    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id : number) {
        return this.taskService.delete(id);
    }
}
