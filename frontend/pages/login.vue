<template>
  <div class="container min-vh-100 d-flex align-items-center justify-content-center">
    <div class="card shadow-sm" style="max-width: 420px; width: 100%;">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <h1 class="h3 fw-bold">Iniciar sesión</h1>
          <p class="text-muted mb-0">
            Prueba Técnica Full Stack
          </p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">
              Correo electrónico
            </label>

            <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                placeholder="admin@example.com"
                required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">
              Contraseña
            </label>

            <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                placeholder="••••••••"
                required
                minlength="6"
            />
          </div>

          <div
              v-if="errorMessage"
              class="alert alert-danger"
              role="alert"
          >
            {{ errorMessage }}
          </div>

          <div
              v-if="successMessage"
              class="alert alert-success"
              role="alert"
          >
            {{ successMessage }}
          </div>

          <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="loading"
          >
            {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

const email = ref('');
const password = ref('');

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  loading.value = true;

  try {
    await auth.login(email.value, password.value);

    successMessage.value = 'Inicio de sesión exitoso.';

    console.log('JWT recibido:', auth.token);
  } catch (error) {
    console.error(error);

    errorMessage.value = 'Correo o contraseña incorrectos.';
  } finally {
    loading.value = false;
  }
};
</script>