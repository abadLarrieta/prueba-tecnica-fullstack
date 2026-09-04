export default defineNuxtRouteMiddleware(() => {
    const auth = useAuthStore();

    // Intentar recuperar la sesión guardada en la cookie
    auth.restoreSession();

    // Si no existe una sesión activa, enviar al login
    if (!auth.isAuthenticated) {
        return navigateTo('/login');
    }
});