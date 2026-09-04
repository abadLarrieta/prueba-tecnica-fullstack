<template>
  <div class="container py-5">

    <!-- Encabezado -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="fw-bold mb-1">
          Mis tareas
        </h1>

        <p class="text-muted mb-0">
          Gestión de tareas - Prueba Técnica Full Stack
        </p>
      </div>

      <button
          class="btn btn-outline-secondary"
          @click="handleLogout"
      >
        <i class="bi bi-box-arrow-right me-1"></i>
        Cerrar sesión
      </button>
    </div>

    <!-- Formulario para crear tarea -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">

        <h2 class="h5 fw-bold mb-3">
          <i
              class="bi"
              :class="editingTaskId ? 'bi-pencil-square' : 'bi-plus-circle'"
          ></i>

          {{ editingTaskId ? 'Editar tarea' : 'Nueva tarea' }}
        </h2>

        <form
            @submit.prevent="
    editingTaskId
      ? handleUpdateTask()
      : handleCreateTask()
  "
        >

          <div class="mb-3">
            <label
                for="titulo"
                class="form-label"
            >
              Título
            </label>

            <input
                id="titulo"
                v-model="newTask.titulo"
                type="text"
                class="form-control"
                placeholder="Ej. Preparar documentación"
                maxlength="150"
                required
            />
          </div>

          <div class="mb-3">
            <label
                for="descripcion"
                class="form-label"
            >
              Descripción
            </label>

            <textarea
                id="descripcion"
                v-model="newTask.descripcion"
                class="form-control"
                rows="3"
                placeholder="Describe la tarea..."
            ></textarea>
          </div>

          <div class="form-check mb-3">
            <input
                id="completado"
                v-model="newTask.completado"
                class="form-check-input"
                type="checkbox"
            />

            <label
                class="form-check-label"
                for="completado"
            >
              Marcar como completada
            </label>
          </div>

          <!-- Error -->
          <div
              v-if="errorMessage"
              class="alert alert-danger"
              role="alert"
          >
            <i class="bi bi-exclamation-triangle me-2"></i>
            {{ errorMessage }}
          </div>

          <!-- Éxito -->
          <div
              v-if="successMessage"
              class="alert alert-success"
              role="alert"
          >
            <i class="bi bi-check-circle me-2"></i>
            {{ successMessage }}
          </div>

          <button
              type="submit"
              class="btn btn-primary"
              :disabled="creating"
          >

  <span
      v-if="creating"
      class="spinner-border spinner-border-sm me-2"
      role="status"
  ></span>

            <i
                v-else
                class="bi"
                :class="editingTaskId ? 'bi-save' : 'bi-plus-lg'"
            ></i>

            {{
              creating
                  ? (editingTaskId ? 'Guardando...' : 'Creando...')
                  : (editingTaskId ? 'Guardar cambios' : 'Crear tarea')
            }}
          </button>
          <button
              v-if="editingTaskId"
              type="button"
              class="btn btn-danger ms-2"
              :disabled="creating"
              @click="cancelEditing"
          >
            <i class="bi bi-x-lg me-1"></i>
            Cancelar
          </button>
        </form>
      </div>
    </div>

    <!-- Cargando tareas -->
    <div
        v-if="tasksStore.loading"
        class="text-center py-5"
    >
      <div
          class="spinner-border"
          role="status"
      >
        <span class="visually-hidden">
          Cargando...
        </span>
      </div>

      <p class="text-muted mt-3">
        Cargando tareas...
      </p>
    </div>

    <!-- Sin tareas -->
    <div
        v-else-if="tasksStore.tasks.length === 0"
        class="alert alert-info"
    >
      <i class="bi bi-info-circle me-2"></i>
      No hay tareas registradas.
    </div>

    <!-- Lista de tareas -->
    <div
        v-else
        class="row g-3"
    >
      <div
          v-for="task in tasksStore.tasks"
          :key="task.id"
          class="col-12"
      >
        <div
            v-if="deletingTaskId === task.id"
            class="alert alert-danger mb-3"
            role="alert"
        >
          <div class="d-flex justify-content-between align-items-center gap-3">

            <div>
              <strong>¿Eliminar esta tarea?</strong>

              <div class="small mt-1">
                Esta acción no se puede deshacer.
              </div>
            </div>

            <div class="d-flex gap-2 flex-shrink-0">

              <button
                  type="button"
                  class="btn btn-sm btn-secondary"
                  @click="deletingTaskId = null"
              >
                Cancelar
              </button>

              <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click="handleDeleteTask(task.id)"
              >
                <i class="bi bi-trash me-1"></i>
                Eliminar
              </button>

            </div>

          </div>
        </div>
        <div class="card shadow-sm">
          <div class="card-body">

            <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3"
            >

              <div>
                <h2 class="h5 fw-bold mb-2">
                  {{ task.titulo }}
                </h2>

                <p
                    v-if="task.descripcion"
                    class="text-muted mb-2"
                >
                  {{ task.descripcion }}
                </p>

                <small class="text-muted">
                  Creada: {{ formatDate(task.fechaCreacion) }}
                </small>
              </div>

              <div class="d-flex align-items-center gap-2 flex-wrap">

  <span
      class="badge"
      :class="
      task.completado
        ? 'text-bg-success'
        : 'text-bg-warning'
    "
  >
    {{ task.completado ? 'Completada' : 'Pendiente' }}
  </span>

                <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    @click="startEditing(task)"
                >
                  <i class="bi bi-pencil me-1"></i>
                  Editar
                </button>

                <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="deletingTaskId = task.id"
                >
                  <i class="bi bi-trash me-1"></i>
                  Eliminar
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- Paginación -->
    <!-- Paginación -->
    <div
        v-if="tasksStore.totalPages > 1"
        class="d-flex justify-content-center align-items-center flex-wrap gap-2 mt-4"
    >
      <button
          type="button"
          class="btn btn-outline-primary"
          :disabled="tasksStore.currentPage === 1 || tasksStore.loading"
          @click="goToPreviousPage"
      >
        <i class="bi bi-chevron-left me-1"></i>
        Anterior
      </button>

      <button
          v-for="page in tasksStore.totalPages"
          :key="page"
          type="button"
          class="btn"
          :class="
        page === tasksStore.currentPage
          ? 'btn-primary'
          : 'btn-outline-primary'
      "
          :disabled="tasksStore.loading"
          @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
          type="button"
          class="btn btn-outline-primary"
          :disabled="
        tasksStore.currentPage === tasksStore.totalPages ||
        tasksStore.loading
      "
          @click="goToNextPage"
      >
        Siguiente
        <i class="bi bi-chevron-right ms-1"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useTasksStore } from '~/stores/tasks';
import type { Task } from '~/types/task';
definePageMeta({
  middleware: 'auth',
});

const auth = useAuthStore();
const tasksStore = useTasksStore();
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
};
const newTask = reactive({
  titulo: '',
  descripcion: '',
  completado: false,
});

const creating = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const editingTaskId = ref<number | null>(null);
const deletingTaskId = ref<number | null>(null);
const handleCreateTask = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!newTask.titulo.trim()) {
    errorMessage.value = 'El título es obligatorio.';
    return;
  }

  creating.value = true;

  try {
    await tasksStore.createTask({
      titulo: newTask.titulo.trim(),
      descripcion: newTask.descripcion.trim() || undefined,
      completado: newTask.completado,
    });

    successMessage.value = 'Tarea creada correctamente.';

    newTask.titulo = '';
    newTask.descripcion = '';
    newTask.completado = false;

    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error(error);

    errorMessage.value =
        'No fue posible crear la tarea. Intenta nuevamente.';

    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  }finally {
    creating.value = false;
  }
};
const startEditing = (task: Task) => {
  editingTaskId.value = task.id;

  newTask.titulo = task.titulo;
  newTask.descripcion = task.descripcion ?? '';
  newTask.completado = task.completado;

  errorMessage.value = '';
  successMessage.value = '';
};

const handleUpdateTask = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!editingTaskId.value) {
    return;
  }

  if (!newTask.titulo.trim()) {
    errorMessage.value = 'El título es obligatorio.';
    return;
  }

  creating.value = true;

  try {
    await tasksStore.updateTask(editingTaskId.value, {
      titulo: newTask.titulo.trim(),
      descripcion: newTask.descripcion.trim() || undefined,
      completado: newTask.completado,
    });

    successMessage.value = 'Tarea actualizada correctamente.';

    editingTaskId.value = null;

    newTask.titulo = '';
    newTask.descripcion = '';
    newTask.completado = false;

    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error(error);

    errorMessage.value =
        'No fue posible actualizar la tarea. Intenta nuevamente.';

    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  } finally {
    creating.value = false;
  }
};
const handleLogout = async () => {
  auth.logout();

  await navigateTo('/login', {
    replace: true,
  });
};
const cancelEditing = () => {
  editingTaskId.value = null;

  newTask.titulo = '';
  newTask.descripcion = '';
  newTask.completado = false;

  errorMessage.value = '';
  successMessage.value = '';
};
const handleDeleteTask = async (id: number) => {
  errorMessage.value = '';
  successMessage.value = '';
  deletingTaskId.value = id;

  try {
    await tasksStore.deleteTask(id);

    successMessage.value = 'Tarea eliminada correctamente.';

    deletingTaskId.value = null;

    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error(error);

    deletingTaskId.value = null;

    errorMessage.value =
        'No fue posible eliminar la tarea. Intenta nuevamente.';

    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  }
};
const goToPreviousPage = async () => {
  if (tasksStore.currentPage <= 1) {
    return;
  }

  await tasksStore.fetchTasks(tasksStore.currentPage - 1);
};

const goToNextPage = async () => {
  if (tasksStore.currentPage >= tasksStore.totalPages) {
    return;
  }

  await tasksStore.fetchTasks(tasksStore.currentPage + 1);
};
const goToPage = async (page: number) => {
  if (
      page < 1 ||
      page > tasksStore.totalPages ||
      page === tasksStore.currentPage
  ) {
    return;
  }

  await tasksStore.fetchTasks(page);
};
onMounted(async () => {
  await tasksStore.fetchTasks();
});
</script>