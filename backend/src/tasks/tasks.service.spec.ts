import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Mocked, vi } from 'vitest';

import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Mocked<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            create: vi.fn(),
            save: vi.fn(),
            find: vi.fn(),
            findOne: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const dto = {
      titulo: 'Aprender NestJS',
      descripcion: 'Estudiar testing con Vitest',
      completado: false,
    };

    const task = {
      id: 1,
      ...dto,
      fechaCreacion: new Date(),
    } as Task;

    repository.create.mockReturnValue(task);
    repository.save.mockResolvedValue(task);

    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(task);
    expect(result).toEqual(task);
  });

  it('should return all tasks', async () => {
    const tasks = [
      {
        id: 1,
        titulo: 'Tarea 1',
        descripcion: 'Descripción 1',
        completado: false,
        fechaCreacion: new Date(),
      },
      {
        id: 2,
        titulo: 'Tarea 2',
        descripcion: 'Descripción 2',
        completado: true,
        fechaCreacion: new Date(),
      },
    ] as Task[];

    repository.find.mockResolvedValue(tasks);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalledWith({
      order: {
        fechaCreacion: 'DESC',
      },
    });

    expect(result).toEqual(tasks);
  });

  it('should return a task by id', async () => {
    const task = {
      id: 1,
      titulo: 'Aprender NestJS',
      descripcion: 'Testing',
      completado: false,
      fechaCreacion: new Date(),
    } as Task;

    repository.findOne.mockResolvedValue(task);

    const result = await service.findOne(1);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual(task);
  });

  it('should throw NotFoundException when task does not exist', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 99 },
    });
  });

  it('should update a task', async () => {
    const task = {
      id: 1,
      titulo: 'Título anterior',
      descripcion: 'Descripción',
      completado: false,
      fechaCreacion: new Date(),
    } as Task;

    const updateDto = {
      titulo: 'Título actualizado',
      completado: true,
    };

    repository.findOne.mockResolvedValue(task);
    repository.save.mockResolvedValue({
      ...task,
      ...updateDto,
    });

    const result = await service.update(1, updateDto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(repository.save).toHaveBeenCalledWith({
      ...task,
      ...updateDto,
    });

    expect(result).toEqual({
      ...task,
      ...updateDto,
    });
  });

  it('should remove a task', async () => {
    const task = {
      id: 1,
      titulo: 'Tarea a eliminar',
      descripcion: 'Descripción',
      completado: false,
      fechaCreacion: new Date(),
    } as Task;

    repository.findOne.mockResolvedValue(task);
    repository.remove.mockResolvedValue(task);

    const result = await service.remove(1);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(repository.remove).toHaveBeenCalledWith(task);

    expect(result).toEqual({
      message: 'Task deleted successfully',
      id: 1,
    });
  });
});