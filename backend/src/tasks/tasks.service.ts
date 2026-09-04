import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ) {}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.tasksRepository.create(createTaskDto);

        return this.tasksRepository.save(task);
    }

    async findAll(
        page = 1,
        limit = 10,
    ): Promise<{
        data: Task[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }> {
        const [data, total] = await this.tasksRepository.findAndCount({
            order: {
                fechaCreacion: 'DESC',
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({
            where: { id },
        });

        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return task;
    }

    async update(
        id: number,
        updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        const task = await this.findOne(id);

        Object.assign(task, updateTaskDto);

        return this.tasksRepository.save(task);
    }
    async remove(id: number): Promise<{ message: string; id: number }> {
        const task = await this.findOne(id);

        await this.tasksRepository.remove(task);

        return {
            message: 'Task deleted successfully',
            id,
        };
    }
}