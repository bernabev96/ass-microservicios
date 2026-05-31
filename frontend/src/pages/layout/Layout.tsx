import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";

const Layout = () => {

    return (
        <div className="h-svh w-svw flex flex-col">
            <Navbar />
            <main className="flex-1 bg-indigo-50 p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout