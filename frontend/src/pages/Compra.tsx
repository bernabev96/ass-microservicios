import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "../components/Button";
import Card from "../components/Card";
import type { Producto, OrderRequest, Order } from "../types/types";
import { OrderServices, CatalogServices } from "../api/services";
import { LoaderCircle } from "lucide-react";

const Compra = () => {
    const navigate = useNavigate();
    const { productoId } = useParams<{ productoId: string }>();
    const formRef = useRef<HTMLFormElement>(null);
    const [cantidadProducto, setCantidadProducto] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [orderResponse, setOrderResponse] = useState<Order | null>(null);
    const [producto, setProducto] = useState<Producto | undefined>(undefined);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleCompra = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!producto) {
            setError("Producto no encontrado.");
            return;
        }

        const formData = new FormData(formRef.current!);
        const data = Object.fromEntries(formData.entries());

        const orderData: OrderRequest = {
            product: producto.name,
            quantity: cantidadProducto,
            paymentData: {
                cardNumber: data.cardNumber as string,
                cvv: String(data.cvv),
                expiryMonth: Number(data.expiryMonth),
                expiryYear: Number(data.expiryYear),
            },
        };

        setLoadingOrder(true);
        setError(null);

        try {
            const response = await OrderServices.createPedido(orderData);
            setOrderResponse(response);
            setIsOpenModal(true);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Error desconocido";
            setError(`No se ha podido realizar el pedido: ${message}.`);
        } finally {
            setLoadingOrder(false);
        }
    };

    const fetchProducto = async (id: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await CatalogServices.getListaProductos();
            setProducto(response.find((p) => p.id === id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ocurrio un error al cargar el producto.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productoId) {
            fetchProducto(Number(productoId));
        }
    }, [productoId]);

    return (
        <div className="flex flex-col w-svw h-svh bg-indigo-50 items-center justify-start py-6">
            <h1 className="text-2xl text-indigo-700 font-semibold">
                Compra de Productos
            </h1>

            {loading && (
                <div className="flex items-center justify-center mt-6">
                    <LoaderCircle className="animate-spin text-indigo-500" size={48} />
                    <span className="ml-2 text-indigo-500">Cargando producto...</span>
                </div>
            )}

            {!loading && producto === undefined && <p>Producto no encontrado</p>}

            {!loading && producto && (
                <div className="flex items-stretch gap-4 mt-6">
                    <Card className="flex flex-col gap-2 p-4">
                        <h2 className="text-xl font-semibold text-indigo-500">Detalles de la compra</h2>
                        <div className="flex-1 flex flex-col gap-2">
                            <p>Producto: <b>{producto.name}</b></p>
                            <p>Precio: <b>{producto.price} EUR</b></p>
                            <div className="flex gap-2 items-center">
                                <label htmlFor="cantidad">Cantidad:</label>
                                <input
                                    type="number"
                                    id="cantidad"
                                    name="cantidad"
                                    min="1"
                                    value={cantidadProducto}
                                    onChange={(e) => setCantidadProducto(Number(e.target.value))}
                                    className="border border-gray-300 rounded-md p-2 w-20"
                                />
                            </div>
                        </div>

                        <div className="w-full border-t border-gray-300 my-2"></div>

                        <div className="flex items-center justify-end gap-2">
                            <p>
                                Total: <b>{(producto.price * cantidadProducto).toFixed(2)} EUR</b>
                            </p>
                        </div>
                    </Card>

                    <Card className="flex flex-col gap-4 p-4">
                        <h2 className="text-xl font-semibold text-indigo-500">Informacion de Pago</h2>

                        <form
                            className="flex flex-col gap-4"
                            ref={formRef}
                            onSubmit={handleCompra}
                        >
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Numero de Tarjeta</label>
                                <input type="text" id="cardNumber" name="cardNumber" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                <input type="text" id="cvv" name="cvv" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700">Mes de Expiracion</label>
                                    <input type="number" id="expiryMonth" name="expiryMonth" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                                <div>
                                    <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700">Ano de Expiracion</label>
                                    <input type="number" id="expiryYear" name="expiryYear" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <Button
                                    type="submit"
                                    estilo="primary"
                                    disabled={loadingOrder}
                                >
                                    {loadingOrder ? "Procesando..." : "Realizar Compra"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            {error && (
                <Card className="mt-6 bg-red-100 text-red-700 p-4">
                    <p>{error}</p>
                </Card>
            )}

            {isOpenModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
                    <Card className="p-6 bg-white rounded-md shadow-md">
                        <h2 className="text-xl font-semibold text-green-500">Compra Exitosa</h2>
                        <p className="mt-4">Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
                        <div className="mt-4">
                            <p><b>Producto:</b> {orderResponse?.product}</p>
                            <p><b>Cantidad:</b> {orderResponse?.quantity}</p>
                            <p><b>Precio Total:</b> {orderResponse ? orderResponse.totalPrice.toFixed(2) : "0.00"} EUR</p>
                            <p><b>Estado del Pedido:</b> {orderResponse?.status}</p>
                            <p><b>Estado del Pago:</b> {orderResponse?.paymentStatus}</p>
                            <p><b>Proveedor:</b> {orderResponse?.supplier}</p>
                            <p><b>Precio del Proveedor:</b> {orderResponse ? orderResponse.supplierPrice.toFixed(2) : "0.00"} EUR</p>
                            <p><b>Fecha Estimada de Entrega:</b> {orderResponse?.estimatedDeliveryDate}</p>
                        </div>
                        <div className="w-full flex justify-end mt-4">
                            <Button
                                className="mt-6"
                                onClick={() => setIsOpenModal(false)}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            <Button
                className="absolute top-0 right-0 m-4"
                estilo="primary"
                onClick={() => navigate("/inicio")}
            >
                Volver al catalogo
            </Button>
        </div>
    );
};

export default Compra;
