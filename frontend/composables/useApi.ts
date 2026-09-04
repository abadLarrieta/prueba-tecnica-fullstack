import {useAuthStore} from "~/stores/auth";

export const useApi = () => {
    const config = useRuntimeConfig();

    const apiFetch = $fetch.create({
        baseURL: config.public.apiBaseUrl,

        onRequest({ options }) {
            const auth = useAuthStore();

            if (auth.token) {
                options.headers = new Headers(options.headers);
                options.headers.set(
                    'Authorization',
                    `Bearer ${auth.token}`,
                );
            }
        },
    });

    return apiFetch;
};