import { createBrowserRouter } from "react-router";

//LAYOUT
import Layout from "../pages/layout/Layout";

//PAGES
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Catalogo from "../pages/Catalogo";
import Compra from "../pages/Compra";
import Pedidos from "../pages/Pedidos";
import NotificacionesPage from "../pages/Notificaciones";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "registro",
        element: <Registro />
    },
    {
        path: "inicio",
        element: <Layout />,
        children: [
            { index: true, element: <Catalogo /> },
            { path: 'notificaciones', element: <NotificacionesPage /> },
            { path: 'pedidos', element: <Pedidos /> },
        ]
    },
    {
        path: "compra/:productoId",
        element: <Compra />
    },
    {
        path: "*",
        element: <h1>404 - Página no encontrada</h1>
    }
])
