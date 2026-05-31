import { useState, useEffect } from "react";
import Card from "../components/Card";
import { NotificationServices } from "../api/services";
import type { Notificaciones } from "../types/types";
import { LoaderCircle } from "lucide-react";

const NotificacionesPage = () => {
    const [notificaciones, setNotificaciones] = useState<Notificaciones[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotificaciones = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await NotificationServices.getNotificaciones();
            setNotificaciones(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar las notificaciones");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotificaciones();
    }, []);

    return (
        <div className="w-svw h-svw flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-semibold text-indigo-700">Notificaciones</h1>

            {loading && (
                <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    Cargando notificaciones...
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && notificaciones.length === 0 && (
                <p className="text-gray-500">No hay notificaciones disponibles.</p>
            )}

            {!loading && !error && notificaciones.length > 0 && (
                <ul className="flex flex-col gap-4">
                    {notificaciones.map((notificacion) => (
                        <li key={notificacion.id}>
                            <Card>
                                <strong>{notificacion.type}:</strong> {notificacion.message} - <em>{notificacion.status}</em>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificacionesPage;
