import type { Producto } from "../types/types";

export type ProductResponse = Producto & {
    price: number | string;
};

export type OrderResponse = {
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
