import type { LoginResponse } from "../types/types";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function saveAuthSession(session: LoginResponse) {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function clearAuthSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function getAuthHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
        throw new Error("Debes iniciar sesión para realizar esta acción");
    }

    return {
        Authorization: `Bearer ${token}`
    };
}
