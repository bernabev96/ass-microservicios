import Card from "../components/Card";
import Button from "../components/Button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AuthService } from "../api/services";
import type { LoginRequest } from "../types/types";

const Login = () => {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(formRef.current!);
        const data = Object.fromEntries(formData.entries());

        const loginData: LoginRequest = {
            email: data.email as string,
            password: data.password as string,
        };

        try {
            await AuthService.login(loginData);
            navigate("/inicio");
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="w-svw h-svh flex items-center justify-center bg-indigo-50">
            <Card className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-indigo-700">Login</h1>
                <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="flex items-center justify-center mt-6">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Entrando..." : "Login"}
                        </Button>
                    </div>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        No tienes una cuenta?
                        <a href="/registro" className="text-indigo-500 hover:text-indigo-700">registrate</a>
                    </p>
                </form>
            </Card>
        </main>
    );
}

export default Login;
