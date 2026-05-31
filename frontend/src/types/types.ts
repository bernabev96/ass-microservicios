
/* LOGIN */
export type LoginRequest = {
    email: string;
    password: string;
}
export type LoginResponse = {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    }
}


/* REGISTRO */
export type RegistroRequest = {
    name: string;
    email: string;
    password: string;
}


/* CATALOGO */
export type Producto = {
    id: number,
    name: string,
    price: number
}


/* PEDIDO */
export type OrderRequest = {
    product: string;
    quantity: number;
    paymentData: PaymentDataType;
}
export type Order = {
    orderId: number;
    product: string;
    quantity: number;
    totalPrice: number;
    status: string;
    paymentStatus: string;
    supplier: string;
    supplierPrice: number;
    estimatedDeliveryDate: string;
    message: string;
}
export type PaymentDataType = {
    cardNumber: string,
    cvv: string,
    expiryMonth: number,
    expiryYear: number
}


/* NOTIFICACIONES */
export type Notificaciones = {
    id: number;
    user_id: number;
    order_id: number;
    type: string;
    message: string;
    status: string;
}
