import { ApiClient } from "./client";
import { apiConfig } from "./config";
import type { OrderResponse, ProductResponse } from "./dtos";
import { clearAuthSession, getAuthHeaders, saveAuthSession } from "./authSession";
import { mapOrder, mapProduct } from "./mappers";
import type {
    Producto,
    Order,
    OrderRequest,
    Notificaciones,
    RegistroRequest,
    LoginRequest,
    LoginResponse
} from "../types/types";

const authClient = new ApiClient(apiConfig.services.auth);
const catalogClient = new ApiClient(apiConfig.services.catalog);
const orderClient = new ApiClient(apiConfig.services.order);
const notificationClient = new ApiClient(apiConfig.services.notification);

/* LOGIN */
export class AuthService {

    static async login(data: LoginRequest): Promise<LoginResponse> {

        const endpoint = apiConfig.endpoint.auth.login;
        const response = await authClient.post<LoginResponse>(endpoint, data);

        saveAuthSession(response);

        return response;
    }

    static logout() {

        clearAuthSession();
    }

}

/* REGISTRO */
export class RegisterServices {

    static async createRegistro(data: RegistroRequest) {
        const endpoint = apiConfig.endpoint.registro.create;
        return authClient.post(endpoint, data);
    };
}


/* CATALOGO */
export class CatalogServices {

    static async getListaProductos(): Promise<Producto[]> {
        const endpoint = apiConfig.endpoint.catalogo.list;
        const response = await catalogClient.get<ProductResponse[]>(endpoint);
        return response.map(mapProduct);

    }
}

/* PEDIDOS */
export class OrderServices {

    static async getListaPedidos(): Promise<Order[]> {
        const endpoint = apiConfig.endpoint.pedido.list
        const response = await orderClient.get<OrderResponse[]>(endpoint, { headers: getAuthHeaders() });
        return response.map(mapOrder);

    }

    static async createPedido(data: OrderRequest): Promise<Order> {
        const endpoint = apiConfig.endpoint.pedido.create;
        const response = await orderClient.post<OrderResponse>(endpoint, data, { headers: getAuthHeaders() });
        return mapOrder(response);
    }
}

/* NOTIFICACIONES */
export class NotificationServices {

    static async getNotificaciones(): Promise<Notificaciones[]> {
        const endpoint = apiConfig.endpoint.notificaciones.list;
        return notificationClient.get<Notificaciones[]>(endpoint, { headers: getAuthHeaders() });
    }

}
