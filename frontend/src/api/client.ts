import { apiConfig } from "./config";
import type { ApiRequestConfig } from "./types"

export class ApiClient {

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get<T = unknown>(
        endpoint: string,
        config?: Partial<ApiRequestConfig>
    ): Promise<T> {
        return this.request<T>('GET', endpoint, config);
    }

    public async post<T = unknown>(
        endpoint: string,
        data?: unknown,
        config?: Partial<ApiRequestConfig>
    ): Promise<T> {
        return this.request<T>('POST', endpoint, { ...config, body: data });
    }

    public async put<T = unknown>(
        endpoint: string,
        data?: unknown,
        config?: Partial<ApiRequestConfig>
    ): Promise<T> {
        return this.request<T>('PUT', endpoint, { ...config, body: data });
    }

    public async patch<T = unknown>(
        endpoint: string,
        data?: unknown,
        config?: Partial<ApiRequestConfig>
    ): Promise<T> {
        return this.request<T>('PATCH', endpoint, { ...config, body: data });
    }

    public async delete<T = unknown>(
        endpoint: string,
        config?: Partial<ApiRequestConfig>
    ): Promise<T> {
        return this.request<T>('DELETE', endpoint, config);
    }

    private async request<T = unknown>(
        method: string,
        endpoint: string,
        config?: Partial<ApiRequestConfig>
    ): Promise<T> {

        const requestConfig: ApiRequestConfig = {
            headers: { ...apiConfig.headers, ...config?.headers },
            params: config?.params,
            body: config?.body,
            timeout: config?.timeout,
            skipUnauthorizedHandler: config?.skipUnauthorizedHandler ?? false,
        };

        try {
            const url = new URL(this.baseUrl + endpoint, window.location.origin);

            if (requestConfig.params) {
                Object.entries(requestConfig.params).forEach(([key, value]) => {
                    url.searchParams.append(key, String(value));
                });
            }

            const controller = new AbortController();
            const timeoutId = requestConfig.timeout
                ? window.setTimeout(() => controller.abort(), requestConfig.timeout)
                : undefined;

            const response = await fetch(url.toString(), {
                method,
                headers: requestConfig.headers,
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : undefined,
                signal: controller.signal,
            });

            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const message =
                    errorBody && typeof errorBody.error === "string"
                        ? errorBody.error
                        : `HTTP error! status: ${response.status}`;

                throw new Error(message);
            }

            return await response.json() as T;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Request failed: ${error.message}`);
            } else {
                console.error('Request failed with unknown error');
            }
            throw error;
        }

    }
}

//instacia singleton del cliente API para ser usado en toda la aplicación
//export const apiClient = new ApiClient();
