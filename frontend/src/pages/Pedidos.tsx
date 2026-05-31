import { useState, useEffect } from "react";
import Card from "../components/Card";
import { OrderServices } from "../api/services";
import type { Order } from "../types/types";
import { LoaderCircle } from "lucide-react";

const Pedidos = () => {
    const [pedidos, setPedidos] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await OrderServices.getListaPedidos();
            setPedidos(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudieron cargar los pedidos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="flex flex-col w-svw h-svh bg-indigo-50 items-center justify-start">
            <h1 className="text-2xl text-indigo-700 font-semibold">
                Mis Pedidos
            </h1>

            <div className="flex flex-col gap-4 mt-4">
                {loading && (
                    <div className="flex flex-col items-center gap-2">
                        <LoaderCircle className="animate-spin text-indigo-500" size={32} />
                        <p className="text-indigo-500">Cargando pedidos...</p>
                    </div>
                )}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && pedidos.length === 0 && (
                    <p className="text-gray-500">No hay pedidos disponibles.</p>
                )}

                {!loading && !error && pedidos.length > 0 && (
                    pedidos.map((pedido) => (
                        <Card key={pedido.orderId} className="flex flex-col gap-2 p-4 w-md">
                            <h2 className="text-xl font-semibold text-indigo-500">Pedido #{pedido.orderId} - {pedido.product}</h2>

                            <div className="flex gap-2 items-center">
                                <div className="flex flex-1 gap-2 items-center">
                                    <p>Cantidad: <b>{pedido.quantity}</b></p>
                                    <p>Total: <b>{pedido.totalPrice} EUR</b></p>
                                </div>

                                <p><b>{pedido.status}</b></p>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Pedidos;
