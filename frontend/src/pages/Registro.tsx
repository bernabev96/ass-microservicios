import Card from "../components/Card"
import Button from "../components/Button"
import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { RegisterServices } from "../api/services"
import type { RegistroRequest } from "../types/types"


const Registro = () => {

    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(formRef.current!)
        const data = Object.fromEntries(formData.entries())

        const registroData: RegistroRequest = {
            name: data.username as string,
            email: data.email as string,
            password: data.password as string,
        }

        try {
            await RegisterServices.createRegistro(registroData)
            navigate("/")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ocurrió un error al registrarse.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex flex-col items-center justify-center h-svh w-svw bg-indigo-50">

            <Card className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-indigo-700">Registro</h1>
                <form
                    ref={formRef}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Nombre de usuario
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Ingrese su nombre de usuario"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Ingrese su correo electrónico"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            required
                        />
                    </div>
                    {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
                    <div className="flex items-center justify-between">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Registrando..." : "Registrarse"}
                        </Button>
                    </div>
                </form>
            </Card>
        </main>
    )
}

export default Registro
