import { NavLink, useNavigate } from "react-router";
import { AuthService } from "../api/services";

const Navbar = () => {
    const navigate = useNavigate();

    const menuButtons = [
        { name: "Inicio", path: "/inicio" },
        { name: "Notificaciones", path: "/inicio/notificaciones" },
        { name: "Pedidos", path: "/inicio/pedidos" }
    ];

    const handleLogout = () => {
        AuthService.logout();
        navigate("/");
    };

    return (
        <nav className="bg-indigo-800 px-4 py-2">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white text-lg font-bold">Mi Aplicacion</div>
                <div className="flex space-x-4 font-semibold">
                    {menuButtons.map((button) => (
                        <NavLink
                            key={button.path}
                            to={button.path}
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                                    : "text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            }
                        >
                            {button.name}
                        </NavLink>
                    ))}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
