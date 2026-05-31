import type { Order } from "../types/types";

export const pedidos: Order[] = [
    {
        orderId: 1,
        product: "Producto A",
        quantity: 2,
        totalPrice: 40,
        status: "En proceso",
        paymentStatus: "Pagado",
        supplier: "Proveedor X",
        supplierPrice: 15,
        estimatedDeliveryDate: "2024-07-10",
        message: "Entrega estimada en 5 días"
    },
    {
        orderId: 2,
        product: "Producto B",
        quantity: 1,
        totalPrice: 25,
        status: "Enviado",
        paymentStatus: "Pagado",
        supplier: "Proveedor Y",
        supplierPrice: 20,
        estimatedDeliveryDate: "2024-07-05",
        message: "En camino, entrega estimada en 3 días"
    },
    {
        orderId: 3,
        product: "Producto C",
        quantity: 3,
        totalPrice: 90,
        status: "Entregado",
        paymentStatus: "Pagado",
        supplier: "Proveedor Z",
        supplierPrice: 25,
        estimatedDeliveryDate: "2024-07-01",
        message: "Entregado el 2024-07-01"
    }
];
