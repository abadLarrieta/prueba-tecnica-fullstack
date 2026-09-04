import { defineStore } from 'pinia';

interface LoginResponse {
    access_token: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        setToken(token: string) {
            this.token = token;

            const authCookie = useCookie<string | null>('auth_token', {
                maxAge: 60 * 60 * 8,
                sameSite: 'lax',
            });

            authCookie.value = token;
        },

        restoreSession() {
            const authCookie = useCookie<string | null>('auth_token', {
                maxAge: 60 * 60 * 8,
                sameSite: 'lax',
            });

            if (authCookie.value) {
                this.token = authCookie.value;
            }
        },

        clearToken() {
            this.token = null;

            const authCookie = useCookie<string | null>('auth_token');
            authCookie.value = null;
        },

        async login(email: string, password: string) {
            const config = useRuntimeConfig();

            const response = await $fetch<LoginResponse>(
                '/auth/login',
                {
                    baseURL: config.public.apiBaseUrl,
                    method: 'POST',
                    body: {
                        email,
                        password,
                    },
                },
            );

            this.setToken(response.access_token);

            return response;
        },

        logout() {
            this.clearToken();
        },
    },
});