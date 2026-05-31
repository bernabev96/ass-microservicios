import type { Notificaciones } from "../types/types";

export const notificaciones: Notificaciones[] = [
    {
        id: 1,
        user_id: 1,
        order_id: 101,
        type: "Order Update",
        message: "Your order #101 has been shipped.",
        status: "unread"
    },
    {
        id: 2,
        user_id: 1,
        order_id: 102,
        type: "Payment Confirmation",
        message: "Your payment for order #102 has been received.",
        status: "unread"
    },
    {
        id: 3,
        user_id: 2,
        order_id: 103,
        type: "Delivery Update",
        message: "Your order #103 is out for delivery.",
        status: "read"
    }
]