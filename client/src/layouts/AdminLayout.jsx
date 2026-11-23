import {
    LayoutDashboard,
    Users,
    Package,
    Menu,
    LogOut,
    Store,
} from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/useAuth";

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const initial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col bg-slate-900 text-white lg:flex">
                <div className="border-b border-slate-800 p-6 flex items-center justify-between">
                    <Link to="/admin" className="text-2xl font-black tracking-tight">
                        Admin<span className="text-indigo-400">Panel</span>
                    </Link>
                </div>

                <nav className="flex-1 space-y-1.5 p-4">
                    <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Management
                    </p>

                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <Users size={18} />
                        Users
                    </NavLink>

                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <Package size={18} />
                        Products
                    </NavLink>

                    <div className="my-4 border-t border-slate-800" />

                    <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Navigation
                    </p>

                    <Link
                        to="/"
                        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                        <Store size={18} />
                        Back to Store
                    </Link>
                </nav>

                {/* Current Admin User Info & Logout */}
                <div className="border-t border-slate-800 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white text-sm">
                                {initial}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-white">
                                    {user?.name || "Admin"}
                                </p>
                                <p className="truncate text-xs text-slate-400">
                                    {user?.email || "admin@store.com"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-red-400 transition"
                            title="Sign out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Section */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden" aria-label="Open menu">
                            <Menu size={22} />
                        </button>
                        <h2 className="text-lg font-bold text-gray-800">
                            Administrator Workspace
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-indigo-600 border border-gray-200 rounded-md px-3 py-1.5"
                        >
                            <Store size={14} />
                            View Storefront
                        </Link>

                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 text-xs">
                                {initial}
                            </div>
                            <span className="hidden md:inline text-xs font-medium text-gray-700">
                                {user?.name}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
