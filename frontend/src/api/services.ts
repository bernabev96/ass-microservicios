import { ApiClient } from "./client";
import { apiConfig } from "./config";
import type {
    Producto,
    Order,
    OrderRequest,
    Notificaciones,
    RegistroRequest,
    LoginRequest,
    LoginResponse
} from '../types/types'

const authClient = new ApiClient(apiConfig.services.auth);
const catalogClient = new ApiClient(apiConfig.services.catalog);
const orderClient = new ApiClient(apiConfig.services.order);
const notificationClient = new ApiClient(apiConfig.services.notification);

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Debes iniciar sesión para realizar esta acción");
    }

    return {
        Authorization: `Bearer ${token}`
    };
}

type ProductResponse = Producto & {
    price: number | string;
};

type OrderResponse = {
    id?: number;
    orderId?: number;
    product_name?: string;
    product?: string;
    quantity: number;
    total_price?: number | string;
    totalPrice?: number | string;
    status: string;
    payment_status?: string | null;
    paymentStatus?: string | null;
    supplier?: string | null;
    supplier_price?: number | string | null;
    supplierPrice?: number | string | null;
    estimated_delivery_date?: string | null;
    estimatedDeliveryDate?: string | null;
    message?: string;
};

function mapProduct(product: ProductResponse): Producto {
    return {
        ...product,
        price: Number(product.price)
    };
}

function mapOrder(order: OrderResponse): Order {
    return {
        orderId: order.orderId ?? order.id ?? 0,
        product: order.product ?? order.product_name ?? "",
        quantity: order.quantity,
        totalPrice: Number(order.totalPrice ?? order.total_price ?? 0),
        status: order.status,
        paymentStatus: order.paymentStatus ?? order.payment_status ?? "",
        supplier: order.supplier ?? "",
        supplierPrice: Number(order.supplierPrice ?? order.supplier_price ?? 0),
        estimatedDeliveryDate: order.estimatedDeliveryDate ?? order.estimated_delivery_date ?? "",
        message: order.message ?? ""
    };
}

/* LOGIN */
export class AuthService {

    static async login(data: LoginRequest): Promise<LoginResponse> {

        const endpoint = apiConfig.endpoint.auth.login;
        const response = await authClient.post<LoginResponse>(endpoint, data);

        localStorage.setItem(
            "token",
            response.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );

        return response;
    }

    static logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
