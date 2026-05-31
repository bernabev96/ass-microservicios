import type { Order, Producto } from "../types/types";
import type { OrderResponse, ProductResponse } from "./dtos";

export function mapProduct(product: ProductResponse): Producto {
    return {
        ...product,
        price: Number(product.price)
    };
}

export function mapOrder(order: OrderResponse): Order {
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
