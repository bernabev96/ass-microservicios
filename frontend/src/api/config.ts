export const apiConfig = {
    services: {
        auth:
            import.meta.env.VITE_AUTH_API_URL,

        catalog:
            import.meta.env.VITE_CATALOG_API_URL,

        order:
            import.meta.env.VITE_ORDER_API_URL,

        notification:
            import.meta.env.VITE_NOTIFICATION_API_URL,
    },
    headers: {
        'Content-Type': 'application/json',
    },
    endpoint: {
        registro: {
            create: "/auth/register"
        },
        auth: {
            login: "/auth/login"
        },
        catalogo: {
            list: "/products"
        },
        pedido: {
            create: "/orders",
            list: "/orders"
        },
        notificaciones: {
            list: "/notifications/me"
        }
    },
};