import { useState, useEffect } from 'react'
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router';
import { CatalogServices } from '../api/services';
import type { Producto } from '../types/types';
import { LoaderCircle } from 'lucide-react';

const Catalogo = () => {

    const navigate = useNavigate();
    const [productos, setProductos] = useState<Producto[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await CatalogServices.getListaProductos();
            setProductos(data);
        } catch (err) {
            setError('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductos();
    }, [])

    return (
        <div className='flex flex-col items-start gap-4'>
            <h1 className='w-full text-center text-2xl text-indigo-700 font-semibold'>Catálogo de Productos</h1>
            <div className='w-full flex flex-wrap justify-center gap-4'>
                {loading && (
                    <div className="flex flex-col items-center gap-2">
                        <LoaderCircle className="animate-spin text-indigo-500" size={32} />
                        <p className="text-indigo-500">Cargando productos...</p>
                    </div>
                )}
                {error && <p className='text-red-500'>{error}</p>}
                {!loading && !error && productos.length === 0 && <p className='text-gray-500'>No hay productos disponibles</p>}
                {!loading && !error && productos.length > 0 && (
                    productos.map(item => (
                        <Card key={item.id} className="flex gap-2">

                            <div className='w-24 h-24 bg-indigo-900 rounded-md'></div>
                            <div className='flex flex-col'>
                                <div className="flex-1">
                                    <h2 className='font-semibold text-indigo-500'>{item.name}</h2>
                                    <p>{item.price}€</p>
                                </div>

                                <Button
                                    type="button"
                                    estilo="primary"
                                    onClick={() => navigate(`/compra/${item.id}`)}
                                >
                                    Comprar
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

export default Catalogo;