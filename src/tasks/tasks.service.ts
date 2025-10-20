import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async findAll(paginationDto? : PaginationDto) {
         const limit = paginationDto?.limit ?? 10;
         const offset = paginationDto?.offset ?? 0;

         const allTasks = await this.prisma.task.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                createdAt: 'desc'
            }
         });
         return allTasks;
    }
    async findOne(id : number) {
        const task = await this.prisma.task.findFirst({
            where: { id: id },
        });
        if (task?.name) return task;        
        throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    async create(CreateTaskDto : CreateTaskDto) {
        const newTask = await this.prisma.task.create({
            data: {
                name: CreateTaskDto.name,
                description: CreateTaskDto.description,
                Completed: false
            }
    });
        return newTask;
    }

    async update(id : number , UpdateTaskDto : UpdateTaskDto) {
        const findTask = await this.prisma.task.findFirst({
            where: { id: id },
        });
        if (!findTask){
            throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const updatedTask = await this.prisma.task.update({
            where: { id: id },
            data: UpdateTaskDto
        });

        return updatedTask;
    }
    async delete(id : number) {
        const findTask = await this.prisma.task.findFirst({
                where: { id: id },
            });
            if (!findTask){
                throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
            }
        await this.prisma.task.delete({
            where: { id: id },
        });
        return { message: `Task with id ${id} deleted successfully` };
    }
}
