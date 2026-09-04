import { defineStore } from 'pinia';
import type { Task } from '~/types/task';

interface TasksResponse {
    data: Task[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface CreateTaskData {
    titulo: string;
    descripcion?: string;
    completado?: boolean;
}

interface UpdateTaskData {
    titulo?: string;
    descripcion?: string;
    completado?: boolean;
}

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[],
        loading: false,

        currentPage: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    }),

    actions: {
        async fetchTasks(page = 1) {
            this.loading = true;

            try {
                const api = useApi();

                const response = await api<TasksResponse>('/tasks', {
                    query: {
                        page,
                        limit: this.limit,
                    },
                });

                this.tasks = response.data;
                this.currentPage = response.page;
                this.total = response.total;
                this.totalPages = response.totalPages;

                return response;
            } finally {
                this.loading = false;
            }
        },

        async createTask(taskData: CreateTaskData) {
            const api = useApi();

            const task = await api<Task>('/tasks', {
                method: 'POST',
                body: taskData,
            });

            this.tasks.unshift(task);
            this.total += 1;

            return task;
        },

        async updateTask(id: number, taskData: UpdateTaskData) {
            const api = useApi();

            const updatedTask = await api<Task>(`/tasks/${id}`, {
                method: 'PATCH',
                body: taskData,
            });

            const index = this.tasks.findIndex(
                (task) => task.id === id,
            );

            if (index !== -1) {
                this.tasks[index] = updatedTask;
            }

            return updatedTask;
        },

        async deleteTask(id: number) {
            const api = useApi();

            await api(`/tasks/${id}`, {
                method: 'DELETE',
            });

            this.tasks = this.tasks.filter(
                (task) => task.id !== id,
            );

            this.total -= 1;
        },
    },
});