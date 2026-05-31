export interface ApiRequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    body?: unknown;
    timeout?: number;
    skipUnauthorizedHandler?: boolean;
}